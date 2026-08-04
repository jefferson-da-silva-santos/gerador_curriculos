const CACHE_NAME = 'editor-curriculo-cache-v1';
const PAYMENT_API_ORIGIN = 'https://resume-generation-payment.vercel.app';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.webp',
  '/logo.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache aberto e arquivos armazenados!');
      return cache.addAll(urlsToCache);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Nunca cachear chamadas à API de pagamento/config — sempre precisam
  // bater na rede, senão a publicKey e outras respostas ficam stale
  // (foi exatamente isso que causava o erro "Não foi possível carregar
  // o pagamento": o SW servia uma resposta antiga do /config em cache).
  const isPaymentApi = url.origin === PAYMENT_API_ORIGIN;

  // Só métodos GET fazem sentido para cache; POST/PUT etc. nunca devem
  // ser interceptados (ex: /gerar-curriculo, /upload-imagem).
  const isCacheableMethod = request.method === 'GET';

  // Só cacheamos requests same-origin — cross-origin (analytics, fonts,
  // qualquer outra API) passam direto pra rede.
  const isSameOrigin = url.origin === self.location.origin;

  if (isPaymentApi || !isCacheableMethod || !isSameOrigin) {
    return; // deixa passar sem interceptar — vai direto pra rede
  }

  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request);
    })
  );
});