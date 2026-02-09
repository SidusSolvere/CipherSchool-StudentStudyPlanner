import {
  getSubjects,
  getTasks
} from "../storage.js";


function renderSubjectPriority() {
  const container = document.getElementById("subject-priority-bars");
  if (!container) return;

  const subjects = getSubjects();
  const counts = { low: 0, medium: 0, high: 0 };

  subjects.forEach(s => counts[s.priority]++);

  const max = Math.max(1, ...Object.values(counts));
  container.innerHTML = "";

  Object.entries(counts).forEach(([key, value]) => {
    const bar = document.createElement("div");
    bar.className = "bar";

    bar.innerHTML = `
      <span class="bar-label">${key}</span>
      <div class="bar-track">
        <div class="bar-fill" style="
          width: ${(value / max) * 100}%;
          background: ${key === "high" ? "#ef4444" : key === "medium" ? "#facc15" : "#38bdf8"};
        "></div>
      </div>
      <span>${value}</span>
    `;

    container.appendChild(bar);
  });
}


function renderTaskCompletion() {
  const container = document.getElementById("task-completion-bars");
  if (!container) return;

  const tasks = getTasks();
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;
  const max = Math.max(1, completed, pending);

  container.innerHTML = "";

  [
    { label: "Completed", value: completed, color: "#22c55e" },
    { label: "Pending", value: pending, color: "#ef4444" }
  ].forEach(item => {
    const bar = document.createElement("div");
    bar.className = "bar";

    bar.innerHTML = `
      <span class="bar-label">${item.label}</span>
      <div class="bar-track">
        <div class="bar-fill" style="
          width: ${(item.value / max) * 100}%;
          background: ${item.color};
        "></div>
      </div>
      <span>${item.value}</span>
    `;

    container.appendChild(bar);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  renderSubjectPriority();
  renderTaskCompletion();
});
