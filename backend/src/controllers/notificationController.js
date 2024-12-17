exports.getAllNotifications = (req, res) => res.send("Get all notifications");
exports.getNotification = (req, res) => res.send("Get a single notification");
exports.createNotification = (req, res) =>
  res.send("Create a new notification");
exports.updateNotification = (req, res) => res.send("Update notification");
exports.deleteNotification = (req, res) => res.send("Delete notification");
