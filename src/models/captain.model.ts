import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface ICaptain extends Document {
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
    lat?: number;
    lng?: number;
  };

  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

interface ICaptainModel extends Model<ICaptain> {
  hashPassword(password: string): Promise<string>;
}

const captainSchema = new Schema<ICaptain>({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },

    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },

    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: "24h" });
  return token;
};

captainSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

export const captainModel = mongoose.model<ICaptain, ICaptainModel>(
  "captain",
  captainSchema,
);