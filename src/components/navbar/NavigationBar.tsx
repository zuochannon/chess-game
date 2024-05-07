import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import chessLogo from "/chess.svg";
import {
  navCommunityItems,
  navItems,
  navPlayItems,
  navTutorialItems,
  navUserItems,
} from "@/data/constants/NavItems";
import { Link, NavLink } from "react-router-dom";

import { Button } from "../ui/button";
// import { FiSettings } from "react-icons/fi";
import { useWhoAmIContext } from "@/context/WhoAmIContext";
import NavbarItem from "./NavbarItem";
import { useNavigate } from "react-router-dom";
import NavbarLogo from "./NavbarLogo";
import NavbarList from "./NavbarList";

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
    fetch(`${import.meta.env.VITE_SERVER}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((_response) => {
        clearWhoAmI();
        navigate("/");
      })
      .catch((err) => console.warn("Sign out procedure failed", err));
  };

  return (
    <div className="bg-gradient-to-br from-blue-300 to-90% via-blue-200 to-white border-gray-400 border-b-2 flex flex-row justify-between">
<NavigationMenu>
          <NavbarLogo />

<NavigationMenuList className="gap-4">

<NavbarList title="PLAY" items={navPlayItems}/>
<NavbarList title="LEARN" items={navTutorialItems}/>
<NavbarList title="COMMUNITY" items={navCommunityItems}/>
</NavigationMenuList>
</NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          {whoAmI ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Hello, &nbsp; <b> {whoAmI.username} </b>{" "}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-fit px-4 py-2 bg-gradient-to-b from-white to-blue-200 border-gray-100 border-1 shadow-2xl">
                {navUserItems.map((item) => (
                  <NavbarItem key={item.id} href={item.url} title={item.text} />
                ))}

                <div className="border-gray-500  border-t-2 my-1"></div>

                <Button
                  onClick={signOut}
                  className="bg-blue-100"
                  variant="link"
                >
                  Sign Out
                </Button>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <div className="flex flex-row gap-2 py-4">
            <NavigationMenuItem className="mr-4">
              <Button className="underline font-bold" variant="ghost" onClick={() => navigate("/login")}>Login</Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-4">
              <Button onClick={() => navigate("/signup")}>Register</Button>
            </NavigationMenuItem>
            </div>
            
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
