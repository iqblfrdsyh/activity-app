import { useEffect, useState } from "react";
import {
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import ProfileMenu from "./profileMenu";
import NavList from "./navList";
import { Bars2Icon } from "@heroicons/react/24/outline";

const NavigationBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
  return (
    <Navbar className="m-5 mx-auto w-[95%] p-2 lg:rounded-full lg:pl-6 bg-gray-900">
      <div className="relative mx-auto flex items-center text-white">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Activity Apps
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
};

export default NavigationBar;
