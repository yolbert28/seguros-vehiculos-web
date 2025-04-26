import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("profile","./routes/profile.tsx"),
  route("policy","./routes/policy.tsx"),
  route("vehicle","./routes/vehicle.tsx"),
  route("sinister","./routes/sinister.tsx"),
  route("report","./routes/report.tsx"),
] satisfies RouteConfig;
