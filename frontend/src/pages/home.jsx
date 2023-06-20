import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/layouts/navigationBar/navigation";
import axios from "axios";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const instance = axios.create({
    withCredentials: true,
  });

  const token = async () => {
    try {
      const response = await instance.get("http://localhost:8000/v1/user/me");
      const data = response.data.data.username;
      console.log(data);
      setUsername(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    token();
  }, []);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="ms-[50px] me-[50px]">
        <div>home</div>
      </div>
    </React.Fragment>
  );
};

export default Home;
