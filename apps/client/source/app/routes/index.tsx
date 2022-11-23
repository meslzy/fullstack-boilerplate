import {createReactRouter, createRouteConfig} from "@tanstack/react-router";

import Home from "@app/routes/home";

let routeConfig = createRouteConfig();

const homeRoute = routeConfig.createRoute({
  path: "/",
  component: Home
});

// @ts-ignore
routeConfig = routeConfig.addChildren([
  homeRoute,
]);

export default createReactRouter({
  routeConfig,
});