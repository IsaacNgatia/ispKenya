import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
// import MenuDrawer from "../components/DrawerTest";

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [add, setAdd] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/isp/")
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res);
          setAuth(true);
          setName(res.data.name);
          setAdd(res.data.add);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleLogout = () => {
  //   axios
  //     .get("http://localhost:4000/api/v1/isp/logout")
  //     .then((response) => {
  //       console.log(response.data.message);
  //       location.reload(true);
  //     })
  //     .catch((err) => {
  //       return console.log(err);
  //     });
  // };

  return (
    // <div className="flex bg-slate-300 min-h-screen h-auto">
    <div className="flex">
      <SideBar />
      <div>
        {console.log(add)}
        <h2>{name}</h2>
        {add && (
          <button type="button" className="bg-gray-400 p-2">
            Add
          </button>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
