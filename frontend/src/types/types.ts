export type VehicleType = "car" | "moto" | "auto";

export interface FareTypes {
  car: number;
  moto: number;
  auto: number;
}

export type Status =
  | "pending"
  | "accepted"
  | "ongoing"
  | "completed"
  | "cancelled";

export interface RideUser {
  _id: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
}
export interface Ride {
  user: RideUser;
  pickup: string;
  destination: string;
  fare: number;
  status: Status;
  otp: string;
  _id: string;
  __v: number;
}

export type ActiveField = "pickup" | "destination" | null | undefined;
