import {index, layout, route, type RouteConfig} from "@react-router/dev/routes";

export const routePaths = {
  home: '/',
  exercises: '/exercises',
  programs: '/programs',
  history: 'history'
}

export default [
  layout("./layout/layout.tsx", [
    index("routes/home.tsx"),
    route(routePaths.exercises, "./routes/exercises.tsx"),
  ]),

] satisfies RouteConfig;
