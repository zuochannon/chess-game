import { NavigationBar } from "@/components/NavigationBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <NavigationBar />

      <div className="h-screen w-screen bg-gradient-to-br from-blue-100  to-blue-50">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
