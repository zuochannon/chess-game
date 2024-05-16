import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  navCommunityItems,
  navPlayItems,
  navTutorialItems,
  navUserItems,
} from "@/data/constants/NavItems";

import { Button } from "../ui/button";
import { useWhoAmIContext } from "@/context/WhoAmIContext";
import NavbarItem from "./NavbarItem";
import { useNavigate } from "react-router-dom";
import NavbarLogo from "./NavbarLogo";
import NavbarList from "./NavbarList";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MdOutlineChat } from "react-icons/md";
import Chat from "../chat/Chat";

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
                <div className="flex flex-row gap-2 pr-4">
                <Sheet>
      <SheetTrigger>
        <Button variant="outline" className="rounded-full h-3/5"><MdOutlineChat /></Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Public Chat</SheetTitle>
          <SheetDescription>
            {whoAmI?.username ? `You are currently signed in as ${whoAmI.username}.` : "You are currently not signed in."}
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 h-full w-full">
          <Chat styles="overflow-y-auto h-[98%] w-full bg-opacity-50" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
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
              <Button className="underline font-bold" variant="ghost" onClick={() => navigate("/signup")}>Sign up</Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="mr-4">
              <Button onClick={() => navigate("/login")}>Login</Button>
            </NavigationMenuItem>
            </div>
            
          )}

          {/* <NavigationMenuItem>
              <FiSettings className="w-7 h-7 mr-4" />
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
      </div>
  );
};

export default NavigationBar;
