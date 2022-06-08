// deno-lint-ignore-file no-explicit-any no-explicit-any

// @ts-ignore: Deno doesn't know about WorkerLocation
class WorkerLocationPolyfill implements WorkerLocation {
  #url: URL;
  constructor(href: string) { this.#url = new URL(href) }
  get hash(): string { return '' }
  get host(): string { return this.#url.host }
  get hostname(): string { return this.#url.hostname }
  get href(): string { return this.#url.href }
  get origin(): string { return this.#url.origin }
  get pathname(): string { return '/' }
  get port(): string { return this.#url.port }
  get protocol(): string { return this.#url.protocol }
  get search(): string { return '' }
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

function polyfillLocation(event: Event): void {
  // @ts-ignore: Deno doesn't know about FetchEvent
  const _event = event as FetchEvent;
  defineProperty(_event.request.url, true);
}

if (!('location' in self)) {
  const envLoc = ((<any>self).WORKER_LOCATION) ?? ((<any>self).process?.env?.WORKER_LOCATION)
  if (envLoc) {
    defineProperty(envLoc);
  } else {
    self.addEventListener('fetch', polyfillLocation);
  }
}
