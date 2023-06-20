import {
  HomeIcon,
  InformationCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { MenuItem, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    path: "/",
  },
  {
    label: "About",
    icon: InformationCircleIcon,
    path: "/about",
  },
  {
    label: "Make Activity",
    icon: PencilSquareIcon,
    path: "/activity",
  },
];

const NavList = () => {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, path }, key) => (
        <Link to={path}>
          <Typography
            key={label}
            as="a"
            href="#"
            variant="small"
            color="white"
            className="font-normal"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        </Link>
      ))}
    </ul>
  );
};

export default NavList;
