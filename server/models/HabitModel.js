import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    schedule: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "daily",
      required: true,
    },
    repeatingDays: {
      type: [String],
    },
    icon: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    dailyCompletion: {
      type: Map,
      of: Boolean,
      default: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Habits = mongoose.model("Habits", HabitSchema);

export default Habits;
