# Http-Proxy-Middleware and dot env setup tutorial in Vite (React)

- Setting up an HTTP proxy middleware in a React application is often necessary to handle situations where the React app (running on a development server) needs to communicate with a backend server. This middleware acts as a bridge to solve several common challenges:

---

### Avoiding CORS Issues

**What is CORS?**:

- Cross-Origin Resource Sharing (CORS) is a security mechanism enforced by browsers to restrict how resources are shared across different domains.
- Problem: During development, your React app typically runs on http://localhost:3000, while your API backend might run on http://localhost:5000. This triggers CORS errors since the origins are different.
- Solution: An HTTP proxy middleware forwards requests from your React app to the backend server without triggering CORS restrictions because the browser sees the request as originating from the same domain.

**Simplifying API Calls**

- Without a proxy, you need to include the full URL of the API, including the domain and port (e.g., http://localhost:5000/api/resource) in your fetch or axios calls.
- With a proxy, you can simplify the API path (e.g., /api/resource), as the middleware takes care of routing it to the correct server.

**Handling Path and Routing Complexity**

- If your backend has specific route handling or needs certain headers for requests (like authentication or custom tokens), the middleware can modify the requests before forwarding them to the backend.

**Isolating Configuration**

- During development, the proxy helps mimic a production-like setup where your frontend and backend communicate seamlessly, without changing the React app's code for different environments.

- Multiple backend API url setup.

---

### Install

`http-proxy-middleware`: First, you need to install the http-proxy-middleware package.

```sh
npm install http-proxy-middleware --save
```

**Configure** Proxy in Vite: You can configure the proxy in the `vite.config.js` file.

```sh
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/development": {
        target: "https://jsonplaceholder.typicode.com", // Replace with your backend API URL
        changeOrigin: true, // Adjust the `Origin` header to match the target URL
        secure: false, // Optional: Set to false if using an HTTPS target with self-signed certificate
        rewrite: (path) => path.replace(/^\/development/, ""), // Optional: Removes `/api-v1` prefix if needed
      },
      "/production": {
        target: "https://dummyjson.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/production/, ""),
      },
      "/qa": {
        target: "https://qa-api.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/qa/, ""),
      },
    },
  },
});
```

- If your react project create by **CRA** command. Create and Configure the setupProxy.js File in root.

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

- Example Request in `React`

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

# Vite Environment Variable System

Vite provides a robust system for managing environment variables. Here's how it works:

## Installation

```sh
npm i dotenv --save
```

## **Environment Variable Files**

Vite automatically loads environment variable files based on the following rules:

### **Base Files**

- `.env`  
  Loaded in **all environments**.

- `.env.local`  
  Loaded in **all environments**, but is **ignored by version control** (useful for secrets).

### **Environment-Specific Files**

- `.env.[mode]`  
  Loaded for a **specific mode** (e.g., `development`, `production`).

- `.env.[mode].local`  
  Loaded for a **specific mode**, but is **ignored by version control**.

---

## **Loading Priority**

Vite loads environment files in the following order, with the **highest priority first**:

1. `.env.[mode].local`
2. `.env.[mode]`
3. `.env.local`
4. `.env`

Variables defined in higher-priority files will override those in lower-priority files.

---

## **Usage in Vite**

Environment variables must be prefixed with `VITE_` to be accessible in your application. For example:

`.env`

```sh
VITE_API_URL:https://localhost:3000
```

## Create Environment Files

To manage environment variables effectively, create the following files in the root of your project:

`.env.development.local`

```sh
VITE_DEVELOPMENT_SECRET=dev-secret-local
```

`.env.development`

```sh
VITE_API_URL=http://localhost:3000
VITE_DEVELOPMENT_FEATURE=true
```

`.env.local`

```sh
VITE_LOCAL_SECRET_KEY=local-secret-value
```

`.env`

```sh
VITE_APP_NAME=MyApp
VITE_API_URL=https://api.example.com
```

## Access Environment Variables in Code

Vite requires environment variables to start with `VITE_` in order to be accessible in the client-side code. Here's how you can access them:

---

### **Example: `src/main.jsx`**

```sh
console.log("App Name:", import.meta.env.VITE_APP_NAME);
console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("Development Feature:", import.meta.env.VITE_DEVELOPMENT_FEATURE);
```

## Ignoring `.env.local` Files

To prevent `.env.local` files from being version-controlled, add them to your `.gitignore` file. This ensures that sensitive information or local configurations are not accidentally shared.

---

### **Update `.gitignore`**

Add the following lines to your `.gitignore` file:

```gitignore
# Local env files
.env.local
.env.*.local
```

## Example Use Case

Suppose you have the following environment variables defined:

- A feature toggle `VITE_DEVELOPMENT_FEATURE` in `.env.development`
- A secret key `VITE_DEVELOPMENT_SECRET` in `.env.development.local`

---

### **Example: `src/App.jsx`**

```sh
function App() {
  const isDevelopmentFeatureEnabled = import.meta.env.VITE_DEVELOPMENT_FEATURE;
  const secretKey = import.meta.env.VITE_DEVELOPMENT_SECRET;

  return (
    <div>
      <h1>{import.meta.env.VITE_APP_NAME}</h1>
      <p>API URL: {import.meta.env.VITE_API_URL}</p>
      <p>Feature Enabled: {isDevelopmentFeatureEnabled ? "Yes" : "No"}</p>
      <p>Secret Key: {secretKey}</p>
    </div>
  );
}

export default App;
```

## Running the App in Different Modes

You can run your Vite app in different modes using the **--mode** flag.

For **development** (default mode):

```sh
npm run dev
```

This will load the following files (in order of priority):

1. `.env.development.local`
2. `.env.development`
3. `.env.local`
4. `.env`

For **Production**

```sh
npm run build
```

or using mode

```sh
npm run build --mode production
```

This will load the following files (in order of priority):

1. `.env.production.local`
2. `.env.production`
3. `.env.local`
4. `.env`

## Example `package.json` Scripts

Ensure your `package.json` has the following scripts to run and build your Vite app:

---

### **Example `package.json`**

For three files in **package.json** script is using `mode`

`.env.development.local`
`.env.producttion.local`
`.env.qa.local`

```sh
{
  "scripts": {
  "lint": "eslint .",
  "dev": "vite",
  "build:dev": "vite build --mode development",
  "preview:dev": "vite preview --mode development",
  "prod": "vite --mode production",
  "build:prod": "vite build --mode production",
  "preview:prod": "vite preview --mode production",
  "qa": "vite --mode qa",
  "build:qa": "vite build --mode qa",
  "preview:qa": "vite preview --mode qa"
  }
}
```
