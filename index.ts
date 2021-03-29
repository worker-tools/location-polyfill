class WorkerLocationPolyfill implements WorkerLocation {
  #url: URL;
  constructor(href: string) { this.#url = new URL(href) }
  get hash(): string { return '' };
  get host(): string { return this.#url.host };
  get hostname(): string { return this.#url.hostname };
  get href(): string { return this.#url.href };
  get origin(): string { return this.#url.origin };
  get pathname(): string { return '' };
  get port(): string { return this.#url.port };
  get protocol(): string { return this.#url.protocol };
  get search(): string { return '' };
  toString(): string { return this.href }
}

function defineProperty(url: string, writable = false) {
  Object.defineProperty(self, 'location', {
    configurable: false,
    enumerable: true,
    writable,
    value: new WorkerLocationPolyfill(url),
  });
}

function polyfillLocation(event: FetchEvent): void {
  defineProperty(event.request.url, true);
}

const getProcessEnv = (k: string) => Reflect.get(Reflect.get(Reflect.get(self, 'process') || {}, 'env') || {}, k);

const WORKER_LOCATION = 'WORKER_LOCATION';
if (!('location' in self)) {
  if (Reflect.has(self, WORKER_LOCATION) || getProcessEnv(WORKER_LOCATION) != null) {
    defineProperty(Reflect.get(self, WORKER_LOCATION) || getProcessEnv(WORKER_LOCATION));
  } else {
    self.addEventListener('fetch', polyfillLocation);
  }
}
