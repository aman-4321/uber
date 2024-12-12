import { Request, Response } from "express";
import { getFareValidation, rideValidation } from "../zod/rideValidation";
import {
  confirmRide,
  createRide,
  endRide,
  getfare,
  startRide,
  VehicleType,
} from "../services/ride.service";
import {
  getAddressCoordinate,
  getCaptainsInTheRadius,
} from "../services/maps.service";
import { sendMessageToSocketId } from "../socket";
import { rideModel } from "../models/ride.model";

export const CreateRide = async (req: Request, res: Response) => {
  const { data, error, success } = rideValidation.safeParse(req.body);

  if (!success) {
    res.status(404).json({
      message: "Invalid Inputs",
      error: error.errors,
    });
    return;
  }

  const { vehicleType, destination, pickup } = data;

  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType: vehicleType as VehicleType,
    });
    res.status(201).json(ride);

    const pickupCoordinates = await getAddressCoordinate(pickup);

    const captainInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2,
    );

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainInRadius.map((captain) => {
      if (captain && captain.socketId) {
        sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: rideWithUser,
        });
      }
    });
  } catch (err) {
    console.error("Error creating ride: ", err);
    res.status(500).json({
      message: "Error Creating Ride",
      error: err,
    });
  }
};

export const getFare = async (req: Request, res: Response) => {
  const { data, error, success } = getFareValidation.safeParse(req.query);

  if (!success) {
    res.status(404).json({
      message: "Invalid Inputs",
      error: error.errors,
    });
    return;
  }

  const { pickup, destination } = data;

  try {
    const fare = await getfare(pickup, destination);
    res.status(200).json(fare);
    return;
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

export const ConfirmRide = async (req: Request, res: Response) => {
  const { rideId } = req.body;

  if (!rideId) {
    res.status(404).json({
      message: "Invalid Inputs",
    });
    return;
  }

  try {
    const ride = await confirmRide({ rideId, captain: req.captain });

    if (ride.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-confirmed",
        data: ride,
      });
    }

    res.status(200).json({
      message: "Ride Confirmed",
      ride,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

export const StartRide = async (req: Request, res: Response) => {
  const { rideId, otp } = req.query;

  if (!rideId || !otp) {
    res.status(404).json({
      message: "Invalid Inputs",
    });
    return;
  }

  try {
    const ride = await startRide({
      rideId: rideId as string,
      otp: otp as unknown as number,
      captain: req.captain,
    });

    if (ride?.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-started",
        data: ride,
      });
    }

    res.status(200).json(ride);
    return;
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

export const EndRide = async (req: Request, res: Response) => {
  const { rideId } = req.body;

  if (!rideId) {
    res.status(404).json({
      message: "Invalid Inputs",
    });
    return;
  }

  try {
    const ride = await endRide({
      rideId,
      captain: req.captain,
    });

    if (ride.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-ended",
        data: ride,
      });
    }

    res.status(200).json(ride);
    return;
  } catch (err) {
    console.error("Error ending ride: ", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};
