import React from "react";
import { Outlet } from "react-router";
import ResponsiveHeader from "../Components/ResponsiveHeader/ResponsiveHeader";
export const Home = () => {
  return (
    <div>
      <ResponsiveHeader />
      <Outlet />
    </div>
  );
};
