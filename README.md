# Location Polyfill

A [`Location`](https://developer.mozilla.org/docs/Web/API/Window/location) polyfill for Cloudflare Workers.

## Usage

Import the polyfill in your application code. 
Make sure it's included at the top, before any other dependencies that register `fetch` event listeners.

```ts
import '@worker-tools/location-polyfill';
```

This will populate the global `location` field with the `url` field from incoming requests. 
In CF Workers, this will typically be your script's `workers.dev` address.

*Note that the `location` field will be overwritten with each request!* This is because I haven't been able to find a way to access the worker's URL outside a `fetch` event context. Let me know if there's a better way!

To avoid sniffing the url from every request, you can provide the location via a global variable called `WORKER_LOCATION`.
In CF Workers, add the following to your `wrangler.toml` to define this variable.

```toml
[vars]
  WORKER_LOCATION = 'http://localhost:8787'
```
