import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuContent,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu";
import NavbarItem from "./NavbarItem";

const NavbarList = ({ title, items }) => {
  return (
    <NavigationMenu>
    <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{title}</NavigationMenuTrigger>

          <NavigationMenuContent className="px-4 py-2 bg-gradient-to-b from-white to-blue-200 border-gray-100 border-1 shadow-2xl">
            {items.map((item) => (
              <NavbarItem
                className="w-max"
                key={item.id}
                href={item.url}
                title={item.text}
              >
                {item.desc}
              </NavbarItem>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        </NavigationMenuList></NavigationMenu>
  )
}

export default NavbarList