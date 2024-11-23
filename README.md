# Http-proxy-middleware and dot env Tutorial

- Setting up an HTTP proxy middleware in a React application is often necessary to handle situations where the React app (running on a development server) needs to communicate with a backend server. This middleware acts as a bridge to solve several common challenges:

### Avoiding CORS Issues

- What is CORS?: Cross-Origin Resource Sharing (CORS) is a security mechanism enforced by browsers to restrict how resources are shared across different domains.
- Problem: During development, your React app typically runs on http://localhost:3000, while your API backend might run on http://localhost:5000. This triggers CORS errors since the origins are different.
- Solution: An HTTP proxy middleware forwards requests from your React app to the backend server without triggering CORS restrictions because the browser sees the request as originating from the same domain.

- Simplifying API Calls
- Without a proxy, you need to include the full URL of the API, including the domain and port (e.g., http://localhost:5000/api/resource) in your fetch or axios calls.
- With a proxy, you can simplify the API path (e.g., /api/resource), as the middleware takes care of routing it to the correct server.

- Handling Path and Routing Complexity
- If your backend has specific route handling or needs certain headers for requests (like authentication or custom tokens), the middleware can modify the requests before forwarding them to the backend.

- Isolating Configuration
- During development, the proxy helps mimic a production-like setup where your frontend and backend communicate seamlessly, without changing the React app's code for different environments.

- Multiple backend API url setup.

### How to Set It Up http-proxy-middleware?

```sh
npm install http-proxy-middleware --save
```

- If your react project create by CRA command. Create and Configure the setupProxy.js File in root.

```sh
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', // Route to be proxied
        createProxyMiddleware({
            target: 'http://localhost:5000', // Backend server
            changeOrigin: true,
        })
    );
};
```

- If your react project create by vite

```sh
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy `/api` to `http://localhost:5000`
      '/api': {
        target: 'http://localhost:5000', // Replace with your target server
        changeOrigin: true,             // Adjust the `Origin` header to match the target URL
        secure: false,                  // Set to false if using an HTTPS target with self-signed certificate
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` prefix if needed
      },
    },
  },
});
```

- Example Request in React

```sh
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/example') // Proxy will forward this to http://localhost:5000/example
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}

export default App;
```

# .env setup

check variable from files

#### development

- npm run dev = first check .env > if not found then .env.development.local > if not found then .env.development > lastly then .env.local

#### production

- npm run build = first check .env > if not found then .env.production.local > if not found then .env.production > lastly then .env.local

#### 1. Installation [env-cmd](https://www.npmjs.com/package/env-cmd)

- Install env-cmd npm package.

```sh
npm i env-cmd
```

- Create .env files in the root of your application.

```sh
 .env.development
 .env.staging
 .env.production
```

- .env.development

```sh
REACT_APP_API_ENDPOINT=http://localhost:3001
```

- .env.staging

```sh
REACT_APP_API_ENDPOINT=http://localhost:8001
```

- .env.production

```sh
REACT_APP_API_ENDPOINT=http://localhost:9000
```

- Note:- CRA Project - you need to prefix all environment variables with REACT*APP*
- Note:- Vite - you need to prefix all environment variables with VITE\_

- Update package.json scripts.

```sh
"scripts": {
    "start": "env-cmd -f .env.development react-scripts start",
    "start:staging": "env-cmd -f .env.staging react-scripts start",
    "start:production": "env-cmd -f .env.production react-scripts start",
    "build": "env-cmd -f .env.development react-scripts build",
    "build:staging": "env-cmd -f .env.staging react-scripts build",
    "build:production": "env-cmd -f .env.production react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
},
```

- To use env-cmd for environment files, you can modify the commands like this:

```sh
"scripts": {
  "dev": "env-cmd -f .env.development vite",
  "dev:staging": "env-cmd -f .env.staging vite --mode staging",
  "dev:production": "env-cmd -f .env.production vite --mode production",
  "build": "env-cmd -f .env.development vite build",
  "build:staging": "env-cmd -f .env.staging vite build --mode staging",
  "build:production": "env-cmd -f .env.production vite build --mode production",
  "preview": "vite preview",
  "test": "vitest",
  "eject": "echo 'Vite does not support ejecting.'"
}

```
