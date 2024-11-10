import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Routes } from "./routes";
import { useSelector } from "../store/store";

export default function AuthorizedRoute() {
  const status = useSelector((state) => state.auth.status);
  if (status !== "fulfilled") {
    console.log("status: ", status);
    return <RedirectToRoute route={Routes.SIGN_IN} />;
  }
  return <Outlet />;
}

interface Props {
  route: Routes;
}

export function RedirectToRoute({ route }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(route);
  }, [navigate, route]);

  return null;
}
