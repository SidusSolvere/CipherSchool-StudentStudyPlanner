import {
  getSubjects,
  getTasks,
  getSchedules
} from "../storage.js";

document.addEventListener("DOMContentLoaded", renderDashboard);
document.addEventListener("subjects:updated", renderDashboard);
document.addEventListener("tasks:updated", renderDashboard);
document.addEventListener("schedule:updated", renderDashboard);

function renderDashboard() {
  renderSubjects();
  renderTasks();
  renderSchedule();
  renderTotalSubjects();
  renderPendingTasksCount()
}
function renderPendingTasksCount() {
  const el = document.getElementById("pending-tasks");
  if (!el) return;

  const tasks = getTasks();
  const pendingCount = tasks.filter(t => !t.completed).length;

  el.textContent = pendingCount;
}

function renderSubjects() {
  const list = document.getElementById("subject-list");
  if (!list) return;

  const subjects = getSubjects();
  list.innerHTML = "";

  subjects.forEach(subject => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${subject.name} (${subject.priority})`;

   

    li.appendChild(span);
  
    list.appendChild(li);
  });
}
function renderTotalSubjects() {
  const el = document.getElementById("total-subjects");
  if (!el) return;

  el.textContent = getSubjects().length;
}
function renderTasks() {
  const list = document.getElementById("task-list-recent");
  if (!list) return;

  const tasks = getTasks()
  .filter(task => !task.completed)
  .slice(-10)
  .reverse();

  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    

    const span = document.createElement("span");
    span.textContent = `${task.title} - ${task.deadline}`;

   

    li.appendChild(span);

    list.appendChild(li);
  });
}

function renderSchedule() {
  const container = document.getElementById("schedule-list");
  if (!container) return;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const schedules = getSchedules().filter(s => s.day === today);
  schedules.sort((a, b) => a.startTime.localeCompare(b.startTime));

  container.innerHTML = "";

  if (schedules.length === 0) {
    container.textContent = "No schedule for today";
    return;
  }

  schedules.forEach(slot => {
    const div = document.createElement("div");
    div.textContent = `${slot.startTime} - ${slot.endTime} | ${slot.title}`;
    container.appendChild(div);
  });
}
