const router = require("express").Router();
const protect = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.use(protect);

router.post("/", createTask);
router.get("/:boardId", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask); // 🔥 add this

module.exports = router;