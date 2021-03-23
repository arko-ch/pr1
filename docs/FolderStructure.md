

## folder structure

* app/config
* app/services
* app/router
* app/ui
* app/layout
* app/components
* app/{module}

## app/config

Put all application or global configurations here. Sidebar items, toolbar are initial configured here. But Sidebar and toolbar can be re-configured at runtime through their context/state.

## app/services

Common reusable api, utilities, or dont-repeat-yourself (DRY) should be placed here.

## app/router

All routes are configured at build time using json config files. Modules must registered their routes here

## app/ui

UI module contains components for display, sidebar, toolbar, modals, notifications, searchbars. Their context/store can be modified and accessed at ```app/ui/store```

## app/layout

This module contains the responsive split pane layout of the app. The the sidebar, toolbar, panels can be switched on or through the exposed context/store.

## app/components

All re-usable functional components must be defined here.

## app/{module}

All modules are defined in their own directory. Each module must provide its own context/store, routes - if necessary. Components that are tight to the module must reside in the ```app/{module}/components``` directory.



