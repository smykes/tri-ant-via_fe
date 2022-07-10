import { Outlet } from "react-router";
import ResponsiveHeader from "../Components/ResponsiveHeader/ResponsiveHeader";
export const Home = () => {
  return (
    <div>
      <ResponsiveHeader />

      {/* This element will render either <DashboardMessages> when the URL is
      "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
  */}
      <Outlet />
    </div>
  );
};
