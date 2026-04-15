// controllers/boardController.js
const Board = require("../models/Board");

exports.createBoard = async (req, res) => {
  const board = await Board.create({
    title: req.body.title,
    userId: req.user.id,
  });
  res.json(board);
};

exports.getBoards = async (req, res) => {
  const boards = await Board.find({ userId: req.user.id });
  res.json(boards);
};

exports.deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};