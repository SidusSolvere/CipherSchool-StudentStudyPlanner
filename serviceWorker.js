const subjectTracker = "studentStudy1";
const assets = [
  "/",
  "/index.html",
   "/css/base.css",
   "/css/components.css",
   "/css/layout.css",
   "/js/config.js",
   "/js/main.js",
   "/js/storage.js",
   "/js/section/analytics.js",
   "/js/section/dashboard.js",
   "/js/section/schedule.js",
   "/js/section/settings.js",
   "/js/section/subject.js",
   "/js/section/todo.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(subjectTracker).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
