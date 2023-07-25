import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const data = [
  {
    name: "Setting",
    path: "/setting",
  },
];

const SubNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const resetData = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <div>
        {data.map((val, i) => {
          return (
            <Link to={val.path} key={i}>
              <div
                className={`text-black ${
                  location.pathname === val.path
                } && hover:bg-black hover:text-white hover:border-3 hover:rounded-sm hover:p-1 my-1`}
              >
                {val.name}
              </div>
            </Link>
          );
        })}
      </div>
      <div
        onClick={() => resetData()}
        className=" hover:bg-black hover:text-white hover:border-3 hover:rounded-sm hover:p-1 my-1"
      >
        logout
      </div>
    </div>
  );
};

export default SubNav;
