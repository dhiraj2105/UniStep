import Habits from "../models/HabitModel.js";

// create a new habit
export const createNewHabit =
  ("/",
  async (req, res) => {
    const { userId, name, description, color, schedule, repeatingDays, icon } =
      req.body;

    try {
      const newHabit = new Habits({
        userId,
        name,
        description,
        color,
        schedule,
        repeatingDays,
        icon,
      });

      const habit = await newHabit.save();

      // return status 201 with habit and habitId
      res.status(201).json({
        habit,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get all Habits
export const getAllHabits = async (req, res) => {
  try {
    const habits = await Habits.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Habit by Id
export const getHabitByUserId = async (req, res) => {
  try {
    const habit = await Habits.find({ userId: req.params.UserId });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update habit
export const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHabit = await Habits.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete habit
export const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    await Habits.findByIdAndDelete(id);
    res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update habit's daily completion status
export const updateHabitDailyCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const { day, status } = req.body;

    if (!day || typeof status !== "boolean") {
      return res.status(400).json({ message: "Invalid day or status" });
    }

    const habit = await Habits.findById(id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.dailyCompletion.set(day, status);

    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
