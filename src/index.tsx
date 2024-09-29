// Theme
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
import "./index.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AnyRouter, RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router: AnyRouter = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render GridExample
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App router={router}/>
  </StrictMode>,
);
