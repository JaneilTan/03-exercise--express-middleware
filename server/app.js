require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
// TODO: Import the error handler middleware

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "./apispec.yaml"), "utf8")
);

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
app.use("/api/spec", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//create a todo

app.post("/api/todos", async (req, res, next) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    // TODO: Call the next middleware in the stack
  }
});

//get all todos

app.get("/api/todos", async (req, res, next) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    return res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    // TODO: Call the next middleware in the stack
  }
});

//get a todo

app.get("/api/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    // TODO: Call the next middleware in the stack
  }
});

//update a todo

app.put("/api/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
    // TODO: Call the next middleware in the stack
  }
});

//delete a todo

app.delete("/api/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
    // TODO: Call the next middleware in the stack
  }
});

// error handling middleware
// TODO: Use the error handler middleware

module.exports = app;
