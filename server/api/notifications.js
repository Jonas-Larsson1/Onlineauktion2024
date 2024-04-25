import Notification from "../model/Notification.js";

export default function (server, db) {
  server.get("/api/notifications", async (req, res) => {
    try {
      const userId = req.session.user;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const notifications = await Notification.find({
        userId: userId,
      });

      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  server.delete("/api/notifications/:id", async (req, res) => {  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
    if (deletedNotification) {
      res.status(200).json({ message: "Notification deleted successfully" });
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting Notification", error: error });
  }
  })
}