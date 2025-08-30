import axios from "axios";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

const ML_URL = process.env.ML_SERVICE_URL || "http://localhost:8001";

export const recommendJobs = catchAsyncErrors(async (req, res, next) => {
  const { resume, topN } = req.body;
  if (!resume) {
    return next(new ErrorHandler("Resume text is required", 400));
  }
  const { data } = await axios.post(`${ML_URL}/recommend`, { resume, top_n: topN });
  res.status(200).json({ success: true, recommendations: data.recommendations });
});

export const suggestSkills = catchAsyncErrors(async (req, res, next) => {
  const { resume, category } = req.body;
  if (!resume || !category) {
    return next(new ErrorHandler("Resume text and category are required", 400));
  }
  const { data } = await axios.post(`${ML_URL}/suggestSkills`, { resume, category });
  res
    .status(200)
    .json({ success: true, missingSkills: data.missing_skills });
});
