import axios from "axios";
import { distanceTimeInput } from "../zod/mapsValidation";
import { captainModel } from "../models/captain.model";

export const getAddressCoordinate = async (address: string) => {
  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.google.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      console.error("Google Maps API Error Response:", response.data);
      throw new Error("Unable to fetch coordinates error in service");
    }
  } catch (error) {
    console.error("Error fetching coordinates", error);
    throw error;
  }
};

export const getdistancetimeresult = async ({
  origin,
  destination,
}: distanceTimeInput) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements?.[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }
      return response.data.rows[0].elements[0];
    } else {
      console.log(response.data);
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAutoCompleteSuggestions = async (input: string) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCaptainsInTheRadius = async (
  ltd: number,
  lng: number,
  radius: number
) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });
  return captains;
};
