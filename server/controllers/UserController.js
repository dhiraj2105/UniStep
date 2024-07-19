import User from "../models/UserModel.js";

// fetch user by id
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      const { password, ...otherDetials } = user._doc;
      res.status(200).json(otherDetials);
    } else {
      res.status(404).json({ message: "No User found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
