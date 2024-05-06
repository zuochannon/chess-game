import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import chessLogo from "/chess.svg";
import { navItems } from "@/data/constants/NavItems";
import { NavLink } from "react-router-dom";

const activeState = ({ isActive }: { isActive: boolean }) => {
  return {
    opacity: isActive ? 1 : 0.5,
    // color: isActive ? "rgb(253 230 138)" : "",
    fontWeight: isActive ? "bold" : "",
  };
};

const NavigationBar = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-white border-gray-400 border-b-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <a href="/" className="flex gap-6 px-4 py-1 mr-4 ">
              <img src={chessLogo} className="h-14 w-14" />
              <h1 className="font-bold text-3xl flex flex-col items-center justify-center italic">
                Chess
              </h1>
            </a>
          </NavigationMenuItem>

          {navItems.map((item) => (
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <NavLink to={item.url} style={activeState}>{item.text}</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavigationBar;