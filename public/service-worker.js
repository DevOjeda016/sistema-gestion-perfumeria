const CACHE_NAME = "aroma-gestion-pwa-v1";
const RECURSOS = [
  "/manifest.webmanifest",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
  "/icons/icon-maskable.svg",
];

async function guardarEnCache(cache, rutas) {
  await Promise.all(
    rutas.map(async (ruta) => {
      try {
        const respuesta = await fetch(ruta);
        if (respuesta.ok) await cache.put(ruta, respuesta);
      } catch (error) {}
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const respuesta = await fetch("/");
        const html = await respuesta.text();
        const respuestaLimpia = new Response(html, {
          status: 200,
          headers: { "Content-Type": "text/html" },
        });
        await cache.put("/", respuestaLimpia);

        const rutasAssets = Array.from(
          html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g),
        ).map((coincidencia) => coincidencia[1]);

        await guardarEnCache(cache, [...RECURSOS, ...rutasAssets]);
      } catch (error) {}
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((nombres) =>
        Promise.all(
          nombres
            .filter((nombre) => nombre !== CACHE_NAME)
            .map((nombre) => caches.delete(nombre)),
        ),
      ),
  );
  self.clients.claim();
});

const esRecursoEstatico = (url) =>
  url.pathname.startsWith("/assets/") || url.pathname.startsWith("/icons/");

const guardarRespuesta = (request, respuestaRed) => {
  if (respuestaRed.ok) {
    const copia = respuestaRed.clone();
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.put(request, copia))
      .catch(() => {});
  }
  return respuestaRed;
};

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.match("/", { ignoreVary: true });
      }),
    );
    return;
  }

  if (esRecursoEstatico(url)) {
    event.respondWith(
      caches.match(event.request, { ignoreVary: true }).then((respuestaCache) => {
        if (respuestaCache) return respuestaCache;
        return fetch(event.request)
          .then((respuestaRed) => guardarRespuesta(event.request, respuestaRed))
          .catch(() => Response.error());
      }),
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((respuestaRed) => guardarRespuesta(event.request, respuestaRed))
      .catch(async () => {
        const respuestaCache = await caches.match(event.request, { ignoreVary: true });
        return respuestaCache || Response.error();
      }),
  );
});
