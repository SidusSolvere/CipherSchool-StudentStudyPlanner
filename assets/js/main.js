import { initializeStorage } from "./storage.js";

import "./section/dashboard.js";
import "./section/subject.js";
import "./section/schedule.js";
import "./section/todo.js";
import "./section/analytics.js";
import "./section/settings.js";



document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
});
