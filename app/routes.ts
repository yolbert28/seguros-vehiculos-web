import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("profile","./routes/profile.jsx"),
  route("policy/:id","./routes/policy.jsx"),
  route("vehicle/:matricula","./routes/vehicle.jsx"),
  route("sinister/:id","./routes/sinister.jsx"),
  route("report","./routes/report.jsx"),
  route("maintenance/:id","./routes/maintenance.jsx"),
  route("accidentInspection/:id","./routes/accidentInspection.jsx"),
  route("evidence/:id","./routes/evidence.jsx"),
  route("indemnity/:id","./routes/indemnity.jsx"),
  route("repair/:id","./routes/repair.jsx"),
  route("login","./routes/login.jsx"),
  route("accidentReport/:id","./routes/accidentReport.jsx"),
] satisfies RouteConfig;
