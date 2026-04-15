const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, boardId } = req.body;

    if (!title || !boardId) {
      return res.status(400).json({ msg: "Title & Board required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      boardId,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
};

// GET TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      boardId: req.params.boardId,
    }).sort({ createdAt: -1 }); // 🔥 newest first

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

// UPDATE TASK (Drag & Drop)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error updating task" });
  }
};

// DELETE TASK (extra but useful)
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch {
    res.status(500).json({ msg: "Error deleting task" });
  }
};