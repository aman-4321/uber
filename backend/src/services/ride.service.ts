import { rideModel } from "../models/ride.model";
import { randomInt } from "node:crypto";
import { getdistancetimeresult } from "./maps.service";
import { IUser } from "../models/user.model";

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
    .lean();

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride as unknown as PopulatedRide;
};
