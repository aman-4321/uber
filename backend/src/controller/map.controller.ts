import { NextFunction, Request, Response } from "express";
import {
  getAddressCoordinate,
  getAutoCompleteSuggestions,
  getdistancetimeresult,
} from "../services/maps.service";
import { distanceTimeValidation, mapValidation } from "../zod/mapsValidation";
import { z } from "zod";

export const getCoordinates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data, error, success } = mapValidation.safeParse(req.query);

  if (!success) {
    res.status(404).json({
      message: "Invalid Inputs",
      error: error.errors,
    });
    return;
  }

  const { address } = data;

  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json({
      coordinates,
    });
  } catch (error) {
    res.status(404).json({
      message: "Coordinate not found",
    });
  }
};

export const getDistanceTime = async (req: Request, res: Response) => {
  try {
    const { data, error, success } = distanceTimeValidation.safeParse(
      req.query,
    );

    if (!success) {
      res.status(404).json({
        message: "Invalid Inputs",
        error: error.errors,
      });
      return;
    }

    const { origin, destination } = data;

    const distanceTime = await getdistancetimeresult({ origin, destination });

    res.status(200).json({
      distanceTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const autoCompleteValidation = z.object({
  input: z.string().min(1),
});

export const getAutoCompleteSuggestion = async (
  req: Request,
  res: Response,
) => {
  try {
    const { data, success, error } = autoCompleteValidation.safeParse(
      req.query,
    );

    if (!success) {
      return res.status(400).json({
        message: "Invalid input",
        error: error.errors,
      });
    }

    const { input } = data;

    const suggestions = await getAutoCompleteSuggestions(input);

    return res.status(200).json({
      suggestions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

