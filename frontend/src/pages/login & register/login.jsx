import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const instance = axios.create({
    withCredentials: true,
  });

  const login = async (e) => {
    e.preventDefault();
    try {
      await instance.post(`${import.meta.env.VITE_API}/login`, {
        username: username,
        password: password,
      });

      // document.cookie = `token=${tokenLogin}`;

      navigate("/", { replace: true });
    } catch (error) {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    let timeout;
    if (message) {
      timeout = setTimeout(() => {
        setMessage("");
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <>
      {message && (
        <div className="flex justify-center">
          <Alert
            className="absolute z-50 top-5 w-[95%]"
            color="red"
            icon={
              <InformationCircleIcon strokeWidth={2} className="h-6 w-6 " />
            }
          >
            {message}
          </Alert>
        </div>
      )}
      <div className="flex justify-center mt-16">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="white">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Login to tour account
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={login}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Username"
                className="text-white"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                className="text-white"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="mt-6" type="submit" fullWidth>
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              No have an account?
              <Link
                to="/register"
                className="ms-2 font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign Up
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
