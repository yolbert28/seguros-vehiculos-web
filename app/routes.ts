import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("profile","./routes/profile.tsx"),
  route("policy","./routes/policy.tsx"),
  route("vehicle/:matricula","./routes/vehicle.tsx"),
  route("sinister/:id","./routes/sinister.tsx"),
  route("report/:document","./routes/report.tsx"),
  route("maintenance/:id","./routes/maintenance.jsx"),
  route("accidentInspection/:id","./routes/accidentInspection.jsx"),
  route("evidence/:id","./routes/evidence.jsx"),
  route("indemnity/:id","./routes/indemnity.jsx"),
  route("repair/:id","./routes/repair.jsx"),
] satisfies RouteConfig;
