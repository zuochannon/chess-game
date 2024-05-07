import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import chessLogo from "/chess.svg";
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="flex gap-6 px-4 py-1 mr-4 ">
            <img src={chessLogo} className="h-14 w-14" />
            <h1 className="font-bold text-3xl flex flex-col items-center justify-center italic">
              Chess
            </h1>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarLogo;
