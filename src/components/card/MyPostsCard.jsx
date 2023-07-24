import React from "react";
import { NavLink } from "react-router-dom";

const MyPostsCard = ({ category, title, description, user }) => {
  return (
    <NavLink>
      <div className="box">
        <div className="box-left">
          {/* <img src="images/blog/box-1.svg" alt="page" /> */}
        </div>
        <div className="box-right">
          <p className="p-4">{category.name}</p>
          <h1>{title}</h1>
          <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
            <h3>{user.first_name}</h3>
            <h3>{user.last_name}</h3>
          </div>
          <p className="p-5">{description}</p>
          <p className="p-5"><b>Created at: </b>{user.createdAt.split("T")[0]}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default MyPostsCard;
