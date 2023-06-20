import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API}/user/register`, {
        username: username,
        fullname: fullname,
        gender: gender,
        email: email,
        password: password,
        confirmPassword: confirmPass,
      });
      navigate("/login");
    } catch (error) {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred while registering.");
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

  const handleChangeGender = (value) => {
    setGender(value);
  };

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
      <div className="flex justify-center mt-9 z-40">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="white">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={register}
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
                size="lg"
                label="Fullname"
                className="text-white"
                required
                onChange={(e) => setFullname(e.target.value)}
              />
              <Input
                size="lg"
                label="Email"
                className="text-white"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                className="text-white"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                label="Confirm Password"
                className="text-white"
                required
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <Select
                label="gender"
                value={gender}
                required
                onChange={handleChangeGender}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </div>
            <Checkbox
              required
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-blue-500"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" fullWidth type="submit">
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?
              <Link
                to="/login"
                className="ms-2 font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Register;
