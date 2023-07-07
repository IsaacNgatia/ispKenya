import React, { useState } from "react";
import { menu } from "../menu";
import SubMenuId from "./SubMenuId";
import downArrow from "/down-arrow.png";
import menuIcon from "/menu.png";
import logo from "/logo_transparent.png";

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
  };
  return (
    <div className="w-1/5 flex-initial bg-gray-200">
      {menu.map((menuItem, index) => (
        <div key={index} className="w-[100%] ">
          <a href={menuItem.url}>
            <div
              className="cursor-pointer p-4 pr-8 font-semibold border-t border-gray-300 flex justify-between w-[100%] hover:bg-slate-400 transition duration-100"
              onClick={() => handleMenuClick(index)}
            >
              <div className="flex items-start justify-start gap-3 w-[100px] ">
                <img src={menuItem.icon} className="w-7 h-7" />
                {menuItem.name}
              </div>
              {menuItem.subMenu && (
                <img src={downArrow} alt="more" className="w-3 h-3" />
              )}
            </div>
          </a>
          {activeMenu === index && menuItem.subMenu && (
            <div className="pl-8 space-y-3">
              {menuItem.subMenu.map((submenu, subIndex) => (
                <a href={submenu.url}>
                  <div
                    key={subIndex}
                    className="cursor-pointer py-2 pl-4 hover:bg-gray-300 flex gap-3 rounded-l-lg"
                  >
                    <img src={submenu.icon} alt="ico" className="w-6 h-6" />
                    {submenu.name}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
