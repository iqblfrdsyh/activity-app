import React from "react";
import NavigationBar from "../components/layouts/navigationBar/navigation";
import Cards from "../components/cards/cards";

const Activity = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="ms-[50px] me-[50px] mt-[40px]">
        <div>
          <h1 className="text-[30px] border-s-4 ps-5">Your Activity</h1>
        </div>
        <div className="flex">
          <Cards />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Activity;
