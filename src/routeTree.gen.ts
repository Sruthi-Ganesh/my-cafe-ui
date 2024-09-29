/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const CafeLazyImport = createFileRoute('/cafe')()

// Create/Update Routes

const CafeLazyRoute = CafeLazyImport.update({
  path: '/cafe',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/cafe.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/cafe': {
      id: '/cafe'
      path: '/cafe'
      fullPath: '/cafe'
      preLoaderRoute: typeof CafeLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/cafe': typeof CafeLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/cafe': typeof CafeLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/cafe': typeof CafeLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/cafe'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/cafe'
  id: '__root__' | '/' | '/cafe'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CafeLazyRoute: typeof CafeLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CafeLazyRoute: CafeLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/cafe"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/cafe": {
      "filePath": "cafe.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
