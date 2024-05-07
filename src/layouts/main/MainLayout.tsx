import NavigationBar from "@/components/navbar/NavigationBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <NavigationBar />

      <div className="h-full w-full bg-gradient-to-br from-blue-100  to-blue-50">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
