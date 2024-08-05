import { useLocation } from "react-router-dom";

export const GetActiveRoute = () => {
  const { pathname } = useLocation();
  return pathname;
};
