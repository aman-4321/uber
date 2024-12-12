//Captain
import mongoose, { Document, Model } from "mongoose";

export interface ICaptain extends Document {
  fullname: {
    firstname: string;
    lastname?: string;
  };
  email: string;
  password: string;
  socketId?: string;
  status: "active" | "inactive";
  vehicle: {
    color: string;
    plate: string;
    capacity: number;
    vehicleType: "car" | "motorcycle" | "auto";
  };
  location?: {
    ltd?: number;
    lng?: number;
  };

  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

export interface ICaptainModel extends Model<ICaptain> {
  hashPassword(password: string): Promise<string>;
}

//User
export interface IUser extends Document {
  fullname: {
    firstname: string;
    lastname?: string;
  };
  email: string;
  password: string;
  socketId?: string;

  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): Promise<string>;
}

//Ride
export type VehicleType = "auto" | "car" | "moto";

export interface createRideProps {
  user: string;
  pickup: string;
  destination: string;
  vehicleType: VehicleType;
}

export interface Captain {
  _id: string;
}

export interface PopulatedRide {
  _id: string;
  user: IUser;
  captain: string;
  status: string;
}

export interface PopulatedEndRide {
  _id: mongoose.Types.ObjectId;
  user: IUser;
  captain: any;
  status: string;
}

export interface PopulatedRideWithUser {
  _id: mongoose.Types.ObjectId;
  user: IUser;
  captain: any;
  status: string;
  otp: string;
}
