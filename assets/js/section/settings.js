import { STORAGE_KEYS } from "../config.js";

const themeSelect = document.getElementById("theme-select");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

themeSelect.value = localStorage.getItem("theme") || "light";
applyTheme(themeSelect.value);

themeSelect.addEventListener("change", e => {
  applyTheme(e.target.value);
});



function updateStorageUsage() {
  let total = 0;

  for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) continue;
    total += localStorage[key].length + key.length;
  }

  const usedKB = (total / 1024).toFixed(2);
  const maxKB = 5120; 
  const percent = Math.min((usedKB / maxKB) * 100, 100);

  document.getElementById("storage-fill").style.width = `${percent}%`;
  document.getElementById("storage-text").textContent =
    `${usedKB} KB used of ~${maxKB} KB`;
}

updateStorageUsage();

document.addEventListener("DOMContentLoaded", () => {
  const exportBtn = document.getElementById("export-btn");
  if (!exportBtn) return;

  exportBtn.onclick = () => {
    const data = {
      subjects: JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS)) || [],
      tasks: JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS)) || [],
      schedules: JSON.parse(localStorage.getItem(STORAGE_KEYS.SCHEDULES)) || [],
      settings: JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || {}
    };


    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "student-study-planner-backup.json";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
});
document.getElementById("reset-btn").onclick = () => {
  if (!confirm("This will delete all your data. Continue?")) return;
  localStorage.clear();
  location.reload();
};
