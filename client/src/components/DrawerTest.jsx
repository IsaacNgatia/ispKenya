import React, { useState } from "react";
import { menu } from "../menu";

const MenuDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (itemId) => {
    const newMenuData = menu.map((item) => {
      if (item.id === itemId) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });

    menu = newMenuData;
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.subMenu) {
        return (
          <div key={item.id} className="relative">
            <button
              className="flex items-center justify-between w-full px-4 py-2 text-left bg-transparent hover:bg-gray-200"
              onClick={() => toggleSubMenu(item.id)}
            >
              <span>{item.name}</span>
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-200 transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 8a1 1 0 01.707-.293L10 9.414l3.293-3.293A1 1 0 1114.293 7.707l-4 4a1 1 0 01-1.414 0l-4-4A1 1 0 016 8zm0 4a1 1 0 01.707-.293L10 13.414l3.293-3.293A1 1 0 1114.293 9.707l-4 4a1 1 0 01-1.414 0l-4-4A1 1 0 016 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {isOpen && (
              <div className="pl-8">{renderMenuItems(item.subMenu)}</div>
            )}
          </div>
        );
      } else {
        return (
          <a
            key={item.id}
            href={item.url}
            className="block px-4 py-2 text-left hover:bg-gray-200"
          >
            {item.name}
          </a>
        );
      }
    });
  };

  return (
    <div className="relative">
      <button
        className="fixed top-0 right-0 z-50 p-4 bg-blue-500 text-white"
        onClick={toggleDrawer}
      >
        Menu
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50">
          <div className="fixed top-0 left-0 w-64 h-full p-4 bg-white">
            <div className="overflow-y-auto">{renderMenuItems(menu)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDrawer;
