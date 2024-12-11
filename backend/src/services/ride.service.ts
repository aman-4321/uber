import { rideModel } from "../models/ride.model";
import { randomInt } from "node:crypto";
import { getdistancetimeresult } from "./maps.service";
import { IUser } from "../models/user.model";
import { sendMessageToSocketId } from "../socket";
import mongoose, { mongo } from "mongoose";

export const getfare = async (pickup: string, destination: string) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination is required");
  }

  const distanceTime = await getdistancetimeresult({
    origin: pickup,
    destination,
  });

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  return fare;
};

const getOtp = (num: number) => {
  const digits = Math.abs(Math.floor(num));

  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits);

  const otp = randomInt(min, max).toString();
  return otp;
};

export type VehicleType = "auto" | "car" | "moto";

interface createRideProps {
  user: string;
  pickup: string;
  destination: string;
  vehicleType: VehicleType;
}

export const createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}: createRideProps) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getfare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType as keyof typeof fare],
  });

  return ride;
};

interface Captain {
  _id: string;
}

interface PopulatedRide {
  _id: string;
  user: IUser;
  captain: string;
  status: string;
}

export const confirmRide = async ({
  rideId,
  captain,
}: {
  rideId: string;
  captain: Captain;
}): Promise<PopulatedRide> => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate<{ user: IUser }>("user")
    .populate("captain")
    .select("+otp")
    .lean();

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride as unknown as PopulatedRide;
};

interface PopulatedRideWithUser {
  _id: mongoose.Types.ObjectId;
  user: IUser;
  captain: any;
  status: string;
  otp: string;
}

export const startRide = async ({
  rideId,
  otp,
  captain,
}: {
  rideId: string;
  otp: number;
  captain: any;
}): Promise<PopulatedRideWithUser> => {
  if (!rideId || !otp) {
    throw new Error("Ride id and otp is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate<{ user: IUser }>("user")
    .populate("captain")
    .select("+otp")
    .lean();

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (Number(ride.otp) !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  if (ride.user?.socketId) {
    sendMessageToSocketId(ride.user?.socketId, {
      event: "ride-started",
      data: ride,
    });
  }

  return ride as unknown as PopulatedRideWithUser;
};

interface PopulatedEndRide {
  _id: mongoose.Types.ObjectId;
  user: IUser;
  captain: any;
  status: string;
}

export const endRide = async ({
  rideId,
  captain,
}: {
  rideId: string;
  captain: any;
}): Promise<PopulatedEndRide> => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate<{ user: IUser }>("user")
    .populate("captain")
    .select("+otp")
    .lean();

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride as unknown as PopulatedEndRide;
};
