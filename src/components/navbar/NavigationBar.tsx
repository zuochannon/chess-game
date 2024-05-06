import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import chessLogo from "/chess.svg";
import { navItems, navUserItems } from "@/data/constants/NavItems";
import { NavLink } from "react-router-dom";

import { Button } from "../ui/button";
// import { FiSettings } from "react-icons/fi";
import { useWhoAmIContext } from "@/context/WhoAmIContext";
import { NavigationMenuContent } from "@radix-ui/react-navigation-menu";
import NavbarItem from "./NavbarItem";
import { useNavigate } from 'react-router-dom';

const activeState = ({ isActive }: { isActive: boolean }) => {
  return {
    opacity: isActive ? 1 : 0.5,
    // color: isActive ? "rgb(253 230 138)" : "",
    fontWeight: isActive ? "bold" : "",
  };
};

const NavigationBar = () => {
  const navigate = useNavigate();

  const { whoAmI, clearWhoAmI } = useWhoAmIContext();

  const signOut = () => {
    clearWhoAmI();
  };

  return (
    <div className="bg-gradient-to-br from-blue-300 to-90% via-blue-200 to-white border-gray-400 border-b-2 flex flex-row justify-between">
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

          <div className="flex flex-row gap-4">
            {navItems.map((item) => (
              <NavigationMenuItem>
                <NavLink to={item.url} style={activeState}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.text}
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
            ))}
          </div>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          {whoAmI ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Hello, &nbsp; <b> {whoAmI.username} </b>{" "}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-fit px-4 py-2 bg-gradient-to-b from-white to-blue-200 border-gray-400 border-2 border-r-4 border-b-4">
                {navUserItems.map((item) => (
                  <NavbarItem href={item.url} title={item.text} />
                ))}

                <div className="border-gray-500  border-t-2 my-1"></div>

                <NavbarItem href="/" title="Sign out" onClick={signOut} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem className="mr-4">
              <Button onClick={ () => navigate("/login") }>Login</Button>
            </NavigationMenuItem>
          )}

          {/* <NavigationMenuItem>
              <FiSettings className="w-7 h-7 mr-4" />
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavigationBar;
