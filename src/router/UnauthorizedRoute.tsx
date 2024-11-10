import { Outlet } from "react-router-dom";
import { useSelector } from "../store/store";
import { RedirectToRoute } from "./AuthorizedRoute";
import { Routes } from "./routes";

export default function UnauthorizedRoute() {
  const status = useSelector((state) => state.auth.status);

  if (status === "fulfilled") {
    console.log("status: ", status);
    // redirect to dashboard
    return <RedirectToRoute route={Routes.SUBSTRING} />;
  }
  return <Outlet />;
}
