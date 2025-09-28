import Task from "../models/Task.js";

// @desc Get all tasks
export const getTasks = async (req, res) => {
  try {
    // populate category field (all fields)
    const tasks = await Task.find().populate("category");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, completed, category } = req.body;

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      completed,
      category
    });

    // populate category before sending back
    const populatedTask = await newTask.populate("category");
    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Update task (including category)
export const updateTask = async (req, res) => {
  try {
    // Whatever comes in req.body (title, description, completed, dueDate, category)
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate("category"); // make sure to populate category after update

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// @desc Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id).populate("category");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted", deletedTask: task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
