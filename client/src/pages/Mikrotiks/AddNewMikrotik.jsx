import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import axios from "axios";

const AddNewMikrotik = () => {
  const [username, setUsername] = useState("admin@ispkenya.co.ke");
  const [ipAdd, setIpAdd] = useState("");
  const [pass, setPass] = useState("jkl");
  const [apiPort, setApiPort] = useState("");
  const [mikName, setMikName] = useState("");
  const [location, setLocation] = useState("");
  const [postError, setPostError] = useState("");

  const url = "http://localhost:4000/api/add-new-mik";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && ipAdd && pass && apiPort) {
      axios
        .post(url, {
          mt_user: username,
          mt_ip: ipAdd,
          mt_pass: pass,
          api_port: apiPort,
          reseller_id: "",
          debug: false,
          attempts: "",
          timeout: "",
          mt_name: mikName,
          mt_location: location,
          mt_mail: "",
          mt_tel: "",
          mt_gps: "",
          isdefault: "No",
          status: "Active",
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          console.log(postError);
          setPostError(error.response.data.message);
        });
    } else {
      console.log("Fill all the fields");
      return <h2>Fill the required inputs first</h2>;
    }
  };
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-10 ">
          <h1 className="lg:text-4xl text-xl font-medium py-10">
            Add New Mikrotik
          </h1>
          <div className="flex flex-col items-center w-full h-auto ">
            <form
              className="w-full h-full rounded-lg drop-shadow-sm  border border-gray-200"
              onSubmit={handleSubmit}
            >
              <div className="bg-sky-600 w-full min-h-[60px]">
                <h2 className="text-2xl font-bold  text-center">
                  New Mikrotik Router Details
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 my-10 mx-5">
                <label className="flex flex-col space-y-2">
                  <h5 className=" text-lg font-semibold">IP Address</h5>
                  <input
                    className="border border-black rounded-md focus:border-sky-300 focus:outline-none p-1"
                    type="text"
                    value={ipAdd}
                    onChange={(e) => setIpAdd(e.target.value)}
                  />
                </label>
                <label className="flex flex-col space-y-2">
                  <h5 className=" text-lg font-semibold">Username</h5>
                  <input
                    className="border border-black rounded-md focus:border-sky-300 focus:outline-none p-1"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <label className="flex flex-col space-y-2 ">
                  <h5 className=" text-lg font-semibold">Password</h5>
                  <input
                    className="border border-black rounded-md focus:border-sky-300 focus:outline-none p-1"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </label>
                <label className="flex flex-col space-y-2 ">
                  <h5 className=" text-lg font-semibold">Api Port</h5>
                  <input
                    className="border border-black rounded-md focus:border-sky-300 focus:outline-none p-1"
                    type="number"
                    value={apiPort}
                    onChange={(e) => setApiPort(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <h2 className="text-2xl font-medium text-center">
                  ISP Site Details
                </h2>
                <hr className="text-gray-400 mx-2" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-5 mt-3 mb-10 ">
                <label className="flex flex-col space-y-2  ">
                  <h5 className=" text-lg font-semibold">Mikrotik Name</h5>
                  <input
                    className="border border-black rounded-md focus:border-sky-300 focus:outline-none p-1"
                    type="text"
                    value={mikName}
                    onChange={(e) => setMikName(e.target.value)}
                  />
                </label>
                <label className="flex flex-col space-y-2 ">
                  <h5 className=" text-lg font-semibold">Location</h5>
                  <input
                    className="border border-black rounded-md focus:border-sky-300 focus:outline-none p-1"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex justify-center my-2">
                <button
                  type="submit"
                  className="bg-sky-600 px-3 py-1 rounded-lg "
                >
                  Add Mikrotik
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewMikrotik;
