import express from "express";
import {
  createNewHabit,
  deleteHabit,
  getAllHabits,
  getHabitByUserId,
  updateHabit,
  updateHabitDailyCompletion,
} from "../controllers/HabitController.js";

const router = express.Router();

router.post("/newHabit", createNewHabit);
router.get("/", getAllHabits);
router.get(`/:UserId`, getHabitByUserId);
router.put("/updateHabit/:id", updateHabit);
router.delete("/deleteHabit/:id", deleteHabit);
router.put("/dailyCompletion/:id", updateHabitDailyCompletion);

export default router;
