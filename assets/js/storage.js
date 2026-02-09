import { STORAGE_KEYS, DEFAULT_DATA } from "./config.js";

function read(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function initializeStorage() {
  if (!read(STORAGE_KEYS.SUBJECTS)) {
    write(STORAGE_KEYS.SUBJECTS, DEFAULT_DATA.subjects);
  }
  if (!read(STORAGE_KEYS.TASKS)) {
    write(STORAGE_KEYS.TASKS, DEFAULT_DATA.tasks);
  }
  if (!read(STORAGE_KEYS.SCHEDULES)) {
    write(STORAGE_KEYS.SCHEDULES, DEFAULT_DATA.schedules);
  }
  if (!read(STORAGE_KEYS.SETTINGS)) {
    write(STORAGE_KEYS.SETTINGS, DEFAULT_DATA.settings);
  }
}

export function getSubjects() {
  return read(STORAGE_KEYS.SUBJECTS);
}

export function setSubjects(subjects) {
  write(STORAGE_KEYS.SUBJECTS, subjects);
}

export function getTasks() {
  return read(STORAGE_KEYS.TASKS);
}

export function setTasks(tasks) {
  write(STORAGE_KEYS.TASKS, tasks);
}

export function getSchedules() {
  return read(STORAGE_KEYS.SCHEDULES);
}

export function setSchedules(schedules) {
  write(STORAGE_KEYS.SCHEDULES, schedules);
}

export function getSettings() {
  return read(STORAGE_KEYS.SETTINGS);
}

export function setSettings(settings) {
  write(STORAGE_KEYS.SETTINGS, settings);
}

export function addSubject(subject) {
  const subjects = getSubjects();
  subjects.push(subject);
  setSubjects(subjects);
}

export function deleteSubject(id) {
  const subjects = getSubjects().filter(s => s.id !== id);
  setSubjects(subjects);
}

export function updateSubject(updatedSubject) {
  const subjects = getSubjects().map(subject =>
    subject.id === updatedSubject.id
      ? { ...subject, ...updatedSubject }
      : subject
  );

  setSubjects(subjects);
}

export function addSchedule(schedule) {
  const schedules = getSchedules();
  schedules.push(schedule);
  setSchedules(schedules);
}

export function updateSchedule(updated) {
  const schedules = getSchedules().map(s =>
    s.id === updated.id ? updated : s
  );
  setSchedules(schedules);
}

export function deleteSchedule(id) {
  const schedules = getSchedules().filter(s => s.id !== id);
  setSchedules(schedules);
}
