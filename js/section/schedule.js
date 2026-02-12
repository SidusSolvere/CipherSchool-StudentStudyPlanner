import {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  getSubjects
} from "../storage.js";

const form = document.getElementById("schedule-form");

const dayInput = document.getElementById("schedule-day");
const startInput = document.getElementById("start-time");
const endInput = document.getElementById("end-time");

const typeSelect = document.getElementById("schedule-type");
const subjectSelect = document.getElementById("schedule-subject");
const activityInput = document.getElementById("schedule-activity");

let editingId = null;


typeSelect.addEventListener("change", () => {
  const type = typeSelect.value;

  subjectSelect.hidden = type !== "subject";
  activityInput.hidden = type !== "activity";

  subjectSelect.required = type === "subject";
  activityInput.required = type === "activity";
});


function populateSubjectDropdown() {
  const subjects = getSubjects();
  subjectSelect.innerHTML = `<option value="">Select Subject</option>`;

  subjects.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name;
    subjectSelect.appendChild(opt);
  });
}


form.addEventListener("submit", e => {
  e.preventDefault();

  const day = dayInput.value;
  const startTime = startInput.value;
  const endTime = endInput.value;
  const type = typeSelect.value;

  if (startTime >= endTime) {
    alert("Invalid time range");
    return;
  }

  const schedule = {
    id: editingId ?? crypto.randomUUID(),
    day,
    startTime,
    endTime,
    type,
    subjectId: type === "subject" ? subjectSelect.value : null,
    activity: type === "activity" ? activityInput.value.trim() : null
  };

  editingId ? updateSchedule(schedule) : addSchedule(schedule);

  editingId = null;
  form.reset();
  subjectSelect.hidden = true;
  activityInput.hidden = true;

  renderScheduleTable();
});


export function renderScheduleTable() {
  const tbody = document.getElementById("schedule-table-body");
  if (!tbody) return;

  const schedules = getSchedules();
  const subjects = getSubjects();

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  tbody.innerHTML = "";

  const maxRows = Math.max(
    1,
    ...days.map(d => schedules.filter(s => s.day === d).length)
  );

  for (let i = 0; i < maxRows; i++) {
    const tr = document.createElement("tr");
    tr.appendChild(document.createElement("td"));

    days.forEach(day => {
      const td = document.createElement("td");

      const slots = schedules
        .filter(s => s.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      const slot = slots[i];

      if (slot) {
        const label =
          slot.type === "subject"
            ? subjects.find(s => s.id === slot.subjectId)?.name ?? "Unknown Subject"
            : slot.activity;

        td.innerHTML = `
          <div class="table-slot">
            <strong>${slot.startTime}–${slot.endTime}</strong><br>
            ${label}
            <div class="slot-actions">
              <button data-edit="${slot.id}">Edit</button>
              <button data-delete="${slot.id}">Delete</button>
            </div>
          </div>
        `;
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }

  attachSlotActions();
}


function attachSlotActions() {
  document.querySelectorAll("[data-edit]").forEach(btn => {
    btn.onclick = () => {
      const slot = getSchedules().find(s => s.id === btn.dataset.edit);
      if (!slot) return;

      dayInput.value = slot.day;
      startInput.value = slot.startTime;
      endInput.value = slot.endTime;

      typeSelect.value = slot.type;
      typeSelect.dispatchEvent(new Event("change"));

      subjectSelect.value = slot.subjectId ?? "";
      activityInput.value = slot.activity ?? "";

      editingId = slot.id;
    };
  });

  document.querySelectorAll("[data-delete]").forEach(btn => {
    btn.onclick = () => {
      deleteSchedule(btn.dataset.delete);
      renderScheduleTable();
    };
  });
}

function getCurrentWeekDays() {
  return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
}
export function renderWeeklyScheduleCount() {
  const el = document.getElementById("week-schedule-count");
  if (!el) return;

  const schedules = getSchedules();
  const weekDays = getCurrentWeekDays();

  const count = schedules.filter(s =>
    weekDays.includes(s.day)
  ).length;

  el.textContent = count;
}


document.addEventListener("DOMContentLoaded", () => {
  populateSubjectDropdown();
  renderScheduleTable();
  renderWeeklyScheduleCount();
});
