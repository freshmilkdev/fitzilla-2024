import {index, layout, route, type RouteConfig} from "@react-router/dev/routes";

export const routePaths = {
  home: '/',
  exercises: '/exercises',
  exercise: '/exercises/:id',
  programs: '/programs',
  program: '/programs/:id',
  history: 'history',
  workout: '/workout'
}

export default [
  layout("./layout/layout.tsx", [
    index("routes/home.tsx"),
    route(routePaths.exercises, "./routes/exercises.tsx"),
    route(routePaths.workout, "./routes/workout.tsx"),
    route(routePaths.exercise, "./routes/exercise.tsx"),
    route(routePaths.programs, "./routes/programs.tsx"),
    route(routePaths.program, "./routes/program.tsx"),
  ]),

] satisfies RouteConfig;
