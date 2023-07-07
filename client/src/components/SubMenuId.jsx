import React from "react";

const SubMenuId = ({ name, icon, url }) => {
  return (
    <>
      <ul>
        <a href={url}>
          <li>
            <div className="flex flex-row pl-3 space-x-3 space-y-10 items-center hover:gray-300 hover:text-white">
              <img src={icon} className="h-10 w-10" />
              <h1>{name}</h1>
            </div>
          </li>
        </a>
      </ul>
    </>
  );
};

export default SubMenuId;
