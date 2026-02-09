import {
  getTasks,
  setTasks
} from "../storage.js";

const form = document.getElementById("task-form");
const list = document.getElementById("task-list");

const titleInput = document.getElementById("task-title");
const typeInput = document.getElementById("task-type");
const dateInput = document.getElementById("task-deadline");

let currentFilter = "all";


form.addEventListener("submit", e => {
  e.preventDefault();

  const task = {
    id: crypto.randomUUID(),
    title: titleInput.value.trim(),
    type: typeInput.value,
    deadline: dateInput.value,
    completed: false,
    completedAt: null
  };

  const tasks = getTasks();
  tasks.push(task);
  setTasks(tasks);

  form.reset();
  renderTasks();
});


function renderTasks() {
  const tasks = getTasks();
  list.innerHTML = "";

  tasks
    .filter(task =>
      currentFilter === "all" ? true : task.type === currentFilter
    )
    .forEach(task => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;

      checkbox.onchange = () => toggleTask(task.id);

      const span = document.createElement("span");
      span.textContent = `${task.title} (${task.type}) — ${task.deadline}`;

      if (task.completed) {
        span.style.textDecoration = "line-through";
        span.style.opacity = "0.6";
      }

      const del = document.createElement("button");
      del.textContent = "✕";
      del.onclick = () => deleteTask(task.id);

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(del);

      list.appendChild(li);
    });
}


function toggleTask(id) {
  const tasks = getTasks().map(t => {
    if (t.id === id) {
      return {
        ...t,
        completed: !t.completed,
        completedAt: !t.completed ? Date.now() : null
      };
    }
    return t;
  });

  setTasks(tasks);
  renderTasks();
}


function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  setTasks(tasks);
  renderTasks();
}


document.querySelectorAll(".task-filters button").forEach(btn => {
  btn.onclick = () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  };
});


document.addEventListener("DOMContentLoaded", renderTasks);
