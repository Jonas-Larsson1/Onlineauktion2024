import Notification from "../model/Notification.js"

export default function (server, db) {

  server.get('/api/notifications', async(req, res) => {
    try {
      const userId = req.session.user
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const notifications = await Notification.find({
        userId: userId
      })

      res.json(notifications)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
}