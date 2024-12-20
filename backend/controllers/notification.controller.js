import Notification from "../models/notification.model.js";

export const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "from", select: "username profileImg" });

    await Notification.updateMany({ to: userId }, { $set: { read: true } });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error on getAllNotifications: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.error("Error on deleteAllNotifications: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
