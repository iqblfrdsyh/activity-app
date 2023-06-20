import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const [data, setData] = useState("");

  const instance = axios.create({
    withCredentials: true,
  });

  const token = async () => {
    try {
      const response = await instance.get(
        `${import.meta.env.VITE_API}/user/me`
      );
      const data = response.data.data;
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    token();
  }, []);

  const navigate = useNavigate(); // Memindahkan useNavigate ke dalam fungsi komponen utama

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      path: "/profile",
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      path: "/editProfile",
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
      path: "/inbox",
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
      path: "/help",
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      onClick: async () => {
        try {
          await instance.delete(`${import.meta.env.VITE_API}/logout`);
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      },
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src={
              data.image
                ? data.image
                : data.gender == "Male"
                ? "./assets/profile-user/male.jpg"
                : "./assets/profile-user/female.jpg"
            }
          />
          <div className="ms-1 me-2 text-white">
            <h2>{data.username ? data.username : "Guest"}</h2>
          </div>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                onClick && onClick();
                closeMenu();
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Link to={path}>
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
