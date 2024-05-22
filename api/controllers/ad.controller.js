import { query } from "express";
import Ad from "../models/ad.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create an ad"));
  }
  if (!req.body.title || !req.body.content || !req.body.adid) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const newAd = new Ad(req.body);
  try {
    const savedAd = await newAd.save();
    res.status(201).json({
      savedAd,
    });
  } catch (error) {
    next(error);
  }
};

export const getads = async (req, res, next) => {
  try {
    const startIndex = parseInt(req, query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const ads = await Ad.find({
      ...(req.query.adid && req.query.adid !== '' && { adid: req.query.adid }),
      ...(req.query.category && req.query.category !== '' && {
        $or: [
          { title: { $regex: req.query.category, $options: "i" } },
          { content: { $regex: req.query.category, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: 1 })
      .skip(startIndex)
      .limit(limit);
    const totalAds = await Ad.countDocuments();
    res.status(201).json({
      ads,
      totalAds,
    });
  } catch (error) {
    next(error);
  }
};

export const deletead = async (req, res, next)=> {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete this ad "));
  }
  try {
    await Ad.findByIdAndDelete(req.params.adId);
    res.status(200).json("The ad has been deleted");
  } catch (error) {
    next(error);
  }
}