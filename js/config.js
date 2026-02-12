export const APP_CONFIG = {
  name: "Smart Study Planner",
  version: "1.0.0"
};

export const STORAGE_KEYS = {
  SUBJECTS: "sp_subjects",
  TASKS: "sp_tasks",
  SCHEDULES: "sp_schedules",
  SETTINGS: "sp_settings"
};

export const DEFAULT_DATA = {
  subjects: [],
  tasks: [],
  schedules: [],
  settings: {
    theme: "light",
    weekStartsOn: "monday"
  }
};

export const DATE_CONFIG = {
  DATE_FORMAT: "YYYY-MM-DD",
  TIME_FORMAT: "HH:mm"
};

export const UI_CONFIG = {
  MAX_SUBJECTS: 20,
  MAX_TASKS: 100
};
