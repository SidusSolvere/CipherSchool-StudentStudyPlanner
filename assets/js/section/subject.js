import {
  addSubject,
  updateSubject,
  deleteSubject,
  getSubjects
} from "../storage.js";

let editingSubjectId = null;
let form, nameInput, priorityInput, list;

document.addEventListener("DOMContentLoaded", () => {
  form = document.getElementById("subject-form");
  nameInput = document.getElementById("subject-name");
  priorityInput = document.getElementById("subject-priority");
  list = document.getElementById("subject-list-sub");

  if (!form || !list) return;

  form.addEventListener("submit", onSubmit);
  list.addEventListener("click", onListClick);

  renderSubjects();
});

function onSubmit(e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const priority = priorityInput.value;

  if (!name) return;

  if (editingSubjectId) {
    updateSubject({
      id: editingSubjectId,
      name,
      priority
    });
  } else {
    addSubject({
      id: crypto.randomUUID(),
      name,
      priority
    });
  }

  editingSubjectId = null;
  form.reset();
  priorityInput.value = "low";

  renderSubjects();
  document.dispatchEvent(new Event("subjects:updated"));
}

function onListClick(e) {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("delete-subject")) {
    deleteSubject(id);
    renderSubjects();
    document.dispatchEvent(new Event("subjects:updated"));
  }

  if (e.target.classList.contains("edit-subject")) {
    const subject = getSubjects().find(s => s.id === id);
    if (subject) loadSubjectForEdit(subject);
  }
}

export function loadSubjectForEdit(subject) {
  editingSubjectId = subject.id;
  nameInput.value = subject.name;
  priorityInput.value = subject.priority;
}

function renderSubjects() {
  list.innerHTML = "";

  getSubjects().forEach(subject => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${subject.name} (${subject.priority})`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-subject";
    editBtn.dataset.id = subject.id;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.className = "delete-subject";
    deleteBtn.dataset.id = subject.id;

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}
