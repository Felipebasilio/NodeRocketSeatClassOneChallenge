import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select("tasks", search ? {
        title: search,
        description: search,
      } : null);

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const currentDate = Date.now();

      if (!title || !description) {
        return res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({
          error: "Os campos 'title' e 'description' são obrigatórios."
        }));
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: currentDate,
        updated_at: currentDate,
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const task = database.selectById("tasks", id);

      if (!task) {
        return res.writeHead(404, { 'Content-Type': 'application/json' }).end(JSON.stringify({
          error: "Task não encontrada."
        }));
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const task = database.selectById("tasks", id);

      if (!task) {
        return res.writeHead(404, { 'Content-Type': 'application/json' }).end(JSON.stringify({
          error: "Task não encontrada."
        }));
      }

      if (!title && !description) {
        return res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({
          error: "É necessário fornecer pelo menos um dos campos: 'title' ou 'description'."
        }));
      }

      const updatedData = { updated_at: Date.now() };
      if (title) updatedData.title = title;
      if (description) updatedData.description = description;

      database.update("tasks", id, updatedData);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const task = database.selectById("tasks", id);

      if (!task) {
        return res.writeHead(404, { 'Content-Type': 'application/json' }).end(JSON.stringify({
          error: "Task não encontrada."
        }));
      }

      const completed_at = task.completed_at || Date.now();
      database.update("tasks", id, { completed_at });

      return res.writeHead(204).end();
    },
  },
];
