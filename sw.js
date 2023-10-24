const STATIC = "static-v1";
const DYNAMIC = "dynamic-v1";
const INMUTABLE = "inmutable-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/assets/css/style.css",
  "/assets/img/img-404.png",
  "/assets/img/report.ico",
  "/assets/img/reports.png",
  "/assets/img/not-found.svg",
  "/assets/js/auth/signin.js",
  "/assets/js/admin/admin.home.controller.js",
  "/assets/js/admin/admin.users.controller.js",
  "/assets/js/axios/axios-instance.js",
  "/assets/js/toast/toast.js",
  "/assets/js/main.js",
];

const APP_SHELL_INMUTABLE = [
  "/assets/js/jquery-3.7.1.min.js",
  "/assets/vendor/bootstrap/css/bootstrap.css",
  "/assets/vendor/bootstrap/js/bootstrap.js",
  "/assets/vendor/bootstrap-icons/bootstrap-icons.css",
  "/assets/vendor/bootstrap-icons/bootstrap-icons.woff",
  "/assets/vendor/bootstrap-icons/bootstrap-icons.woff2",
  "/assets/vendor/boxicons/css/boxicons.css",
  "/assets/vendor/boxicons/fonts/boxicons.css",
  "/assets/vendor/boxicons/css/boxicons.eot",
  "/assets/vendor/boxicons/css/boxicons.svg",
  "/assets/vendor/boxicons/css/boxicons.woff",
  "/assets/vendor/boxicons/css/boxicons.ttf",
  "/assets/vendor/boxicons/css/boxicons.woff2",
  "/assets/vendor/simple-datatables/simple-datatables.js",
  "/assets/vendor/simple-datatables/style.css",
];

const clear = (cacheName, items = 50) => {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > items) {
        cache.delete(keys[0]).then(clear(cacheName, items));
      }
    });
  });
};

self.addEventListener("install", (e) => {
  const static = caches.open(STATIC).then((cache) => cache.addAll(APP_SHELL));
  const inmutable = caches
    .open(INMUTABLE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));
  e.waitUntil(Promise.all([static, inmutable]));
});
self.addEventListener("activate", (e) => {
    const response = caches.keys().then((keys)=>{
      keys.forEach((keys)=>{
        if(key !== STATIC && key.include('static'))
        return caches.delete(key);
        if(key !== DYNAMIC && key.include('dynamic'))
        return caches.delete(key);
      });
    });
    e.waitUntil(response)
});
