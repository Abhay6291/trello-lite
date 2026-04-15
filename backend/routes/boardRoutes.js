// routes/boardRoutes.js
const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { createBoard, getBoards, deleteBoard } = require("../controllers/boardController");

router.use(protect);

router.post("/", createBoard);
router.get("/", getBoards);
router.delete("/:id", deleteBoard);

module.exports = router;