import SideBar from "../../components/SideBar";
import MiniDrawer from "../../components/Drawer";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

const urlMikronode = "http://localhost:4000/api/print-ppp-profile";
const staticMikronode = "http://localhost:4000/api/print-ppp-profile";
const postStaticUser = "http://localhost:4000/api/add-static-user";
const ppoeMikronode = "http://localhost:4000/api/add-ppoe-user";

const AddNewUser = () => {
  const [router, setRouter] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [profiles, setProfiles] = useState([]);
  const [pickedProfile, setPickedProfile] = useState([]);
  const [pickedService, setPickedService] = useState([]);
  const [selecetedRadio, setSelecetedRadio] = useState("Static");
  const [routerIsConnected, setRouterIsConnected] = useState(false);
  const [userType, setUserType] = useState({
    isStatic: false,
    isPpoe: false,
    isHotspot: false,
  });
  const [staticDetails, setStaticDetails] = useState({
    name: "",
    offName: "",
    email: "",
    house: "",
    ip: "",
    maxLimit: "6M/6M",
    status: "Enable",
    mpesaRef: "",
    monBill: "",
    mobile: "",
    expiry: "",
  });
  const [pppoeDetails, setPppoeDetails] = useState({
    offName: "",
    name: "",
    email: "",
    house: "",
    password: "",
    ip: "",
    maxLimit: "6M/6M",
    status: "Enable",
    mpesaRef: "",
    monBill: "",
    mobile: "",
    expiry: "",
  });

  const checkRouter = () => {
    if (selecetedRadio === "Static" || selecetedRadio === "PPPoE") {
      axios
        .get(urlMikronode)
        .then(function (response) {
          if (response.status >= 200 && response.status <= 299) {
            setLoading(false);
            setRouterIsConnected(true);
            setProfiles(response.data.data);
            console.log(response.data.data);
            return "Connected";
          } else {
            setIsError(true);
            setLoading(false);
            // console.log("Sth wrong has occurred");
            throw new Error(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // console.log("Hello");
        });
    }
    if (selecetedRadio === "Hotspot") {
      console.log("Hotspot is selected");
    }
  };

  const handleChange = (event) => {
    const value1 = event.target.value;
    setRouter(value1);
    if (value1.length > 0) {
      setLoading(true);
    }
  };
  const handleProfileChange = (e) => {
    setPickedProfile(e.target.value);
  };

  React.useEffect(() => {
    if (router.length > 0) {
      checkRouter();
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selecetedRadio === "Static") {
      setUserType({
        isStatic: true,
      });
    }
    if (selecetedRadio === "PPPoE") {
      setUserType({
        isHotspot: false,
        isStatic: false,
        isPpoe: true,
      });
    }
    if (selecetedRadio === "Hotspot") {
      setUserType({
        isHotspot: true,
      });
    }
  };
  const handleStaticForm = (event) => {
    event.preventDefault();

    axios
      .post(postStaticUser, {
        name: staticDetails.name,
        officialname: staticDetails.offName,
        mikrotikid: "16",
        password: staticDetails.mobile,
        email: staticDetails.email,
        target: staticDetails.ip,
        "max-limit": staticDetails.maxLimit,
        // "limit-at": staticDetails.maxLimit,
        monthlybill: staticDetails.monBill,
        ipaddress: staticDetails.ip,
        maxdownloadspeed: staticDetails.maxLimit,
        mobile: staticDetails.mobile,
        type: "STATIC",
        status: "ACTIVE",
        expiry: staticDetails.expiry,
        house: staticDetails.house,
        reference_number: staticDetails.mpesaRef,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handlePpoeForm = (event) => {
    event.preventDefault();
    axios
      .post(ppoeMikronode, {
        name: pppoeDetails.name,
        officialname: pppoeDetails.offName,
        mikrotikid: "16",
        password: pppoeDetails.mobile,
        email: pppoeDetails.email,
        type: "PPP",
        profile: pickedProfile,
        status: "ACTIVE",
        service: pickedService,
        monthlybill: pppoeDetails.monBill,
        mobile: pppoeDetails.mobile,
        house: pppoeDetails.house,
        reference_number: pppoeDetails.mpesaRef,
        expiry: pppoeDetails.expiry,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRadioChange = (event) => {
    setSelecetedRadio(event.target.value);
  };

  if (isError) {
    return <ToastContainer />;
  }

  return (
    <>
      <div className="flex flex-row min-h-screen h-auto">
        {/* <MiniDrawer /> */}
        <SideBar />
        <div className="flex flex-col items-center flex-1">
          <h2 className="text-3xl font-semibold text-gray-600 mt-5 mb-10">
            Add User
          </h2>
          <div>
            {/* Radio Section + Router Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 items-center first-letter md:space-x-24">
              {/* Select Router Section */}
              <FormControl sx={{ m: 0, minWidth: 300 }}>
                <InputLabel id="router-type">Select Mikrotik Router</InputLabel>
                <Select
                  labelId="router-type"
                  id="demo-simple-select-autowidth"
                  value={router}
                  onChange={handleChange}
                  fullWidth
                  label="router"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Heey">Twenty</MenuItem>
                  <MenuItem value="45">Twenty one</MenuItem>
                  <MenuItem value="22">Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
              {/* User Type Section */}
              <FormControl className="items-center">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  User Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Static"
                    checked={selecetedRadio === "Static"}
                    control={<Radio />}
                    label="Static"
                    onChange={handleRadioChange}
                  />
                  <FormControlLabel
                    value="PPPoE"
                    checked={selecetedRadio === "PPPoE"}
                    control={<Radio />}
                    label="PPPoE"
                    onChange={handleRadioChange}
                  />
                  <FormControlLabel
                    value="Hotspot"
                    checked={selecetedRadio === "Hotspot"}
                    control={<Radio />}
                    label="Hotspot"
                    onChange={handleRadioChange}
                  />
                </RadioGroup>
              </FormControl>
              <LoadingButton
                loading={loading}
                variant="outlined"
                onClick={handleSubmit}
              >
                Submit
              </LoadingButton>
            </div>
          </div>
          {/* Static Form */}
          {routerIsConnected && userType.isStatic && (
            <div className="flex lg:flex-row flex-col mx-auto p-4 items-center lg:space-x-5">
              <form className="mb-4 flex flex-col">
                <h1 className="text-xl bg-blue-500">Connection Information</h1>
                <label htmlFor="staticMikrotikName">Mikrotik Name</label>
                <input
                  id="staticMikrotikName"
                  value={staticDetails.name}
                  onChange={(e) =>
                    setStaticDetails({ ...staticDetails, name: e.target.value })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Input Mikrotik Name"
                />
                <label htmlFor="staticOfficialname">Official Name</label>
                <input
                  id="staticOfficialname"
                  value={staticDetails.offName}
                  onChange={(e) =>
                    setStaticDetails({
                      ...staticDetails,
                      offName: e.target.value,
                    })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Input Official Name"
                />
                <label htmlFor="staticEmail">Email Address</label>
                <input
                  type="staticEmail"
                  value={staticDetails.email}
                  onChange={(e) =>
                    setStaticDetails({
                      ...staticDetails,
                      email: e.target.value,
                    })
                  }
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Email Address"
                />
                <label htmlFor="staticApartment">Apartment/House No# *</label>
                <input
                  id="staticApartment"
                  value={staticDetails.house}
                  onChange={(e) =>
                    setStaticDetails({
                      ...staticDetails,
                      house: e.target.value,
                    })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Apartment/House No# *"
                />
              </form>
              <form className="mb-4 flex flex-col">
                <h1 className="text-xl bg-green-400">Server Information</h1>
                <label htmlFor="staticIp">Ip</label>
                <input
                  id="staticIp"
                  value={staticDetails.ip}
                  onChange={(e) =>
                    setStaticDetails({ ...staticDetails, ip: e.target.value })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Ip Address"
                />
                <label htmlFor="staticMaxlimit">Max-Limit</label>
                <input
                  id="staticMaxlimit"
                  value={staticDetails.maxLimit}
                  onChange={(e) =>
                    setStaticDetails({
                      ...staticDetails,
                      maxLimit: e.target.value,
                    })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="6M/6M"
                />
                <label htmlFor="staticStatus">Status</label>
                <input
                  id="staticStatus"
                  value={staticDetails.status}
                  onChange={(e) =>
                    setStaticDetails({
                      ...staticDetails,
                      status: e.target.value,
                    })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Enable"
                />
              </form>
              <form className="mb-4 flex flex-col border border-gray-200 p-2">
                <h1 className="text-xl bg-violet-600 px-2">
                  Personal Information
                </h1>
                <label htmlFor="staticMpesarefno">M-pesa Ref No# *</label>
                <input
                  id="staticMpesarefno"
                  value={staticDetails.mpesaRef}
                  onChange={(e) =>
                    setStaticDetails({
                      ...staticDetails,
                      mpesaRef: e.target.value,
                    })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="M-pesa Ref No# *"
                />
                <label htmlFor="staticMonthlybill">Monthly Bill *</label>
                <input
                  id="staticMonthlybill"
                  value={staticDetails.monBill}
                  onChange={(e) =>
                    setStaticDetails({
                      ...staticDetails,
                      monBill: e.target.value,
                    })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Monthly Bill"
                />
                <label htmlFor="staticMobile">Mobile Number# *</label>
                <input
                  id="staticMobile"
                  value={staticDetails.mobile}
                  onChange={(e) =>
                    setStaticDetails({
                      ...staticDetails,
                      mobile: e.target.value,
                    })
                  }
                  type="number"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="07..."
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Expiry Date"
                      value={staticDetails.expiry}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </form>
              <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={handleStaticForm}
              >
                Submit
              </button>
            </div>
          )}
          {/* PPoE Form  */}
          {routerIsConnected && userType.isPpoe && (
            <div className="flex lg:flex-row flex-col mx-auto p-4 items-center lg:space-x-5">
              <form className="mb-4 flex flex-col">
                <h1 className="text-xl bg-blue-500">Connection Information</h1>
                <label htmlFor="mikrotikname">Mikrotik Name</label>
                <input
                  id="mikrotikname"
                  value={pppoeDetails.name}
                  onChange={(e) =>
                    setPppoeDetails({ ...pppoeDetails, name: e.target.value })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Input Mikrotik Name"
                />
                <label htmlFor="officialname">Official Name</label>
                <input
                  id="officialname"
                  value={pppoeDetails.offName}
                  onChange={(e) =>
                    setPppoeDetails({
                      ...pppoeDetails,
                      offName: e.target.value,
                    })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Input Official Name"
                />
                <label htmlFor="apartment">Password</label>
                <input
                  id="pppoePassword"
                  value={pppoeDetails.password}
                  onChange={(e) =>
                    setPppoeDetails({
                      ...pppoeDetails,
                      password: e.target.value,
                    })
                  }
                  type="password"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="PPoE Password"
                />
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  value={pppoeDetails.email}
                  onChange={(e) =>
                    setPppoeDetails({ ...pppoeDetails, email: e.target.value })
                  }
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Email Address"
                />
                <label htmlFor="apartment">Apartment/House No# *</label>
                <input
                  id="apartment"
                  value={pppoeDetails.house}
                  onChange={(e) =>
                    setPppoeDetails({ ...pppoeDetails, house: e.target.value })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Apartment/House No# *"
                />
              </form>
              <form className="min-h-[450px] gap-2 drop-shadow-lg border rounded-sm flex flex-col">
                <h1 className="text-xl bg-green-400">Server Information</h1>
                <div className="mx-2 gap-5 flex flex-col">
                  <FormControl sx={{ m: 0, minWidth: 200 }}>
                    <InputLabel id="router-type">Select Profile</InputLabel>
                    <Select
                      labelId="profile-type"
                      id="demo-simple-select-autowidth"
                      value={pickedProfile}
                      onChange={handleProfileChange}
                      fullWidth
                      label="profile"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {profiles.map((profile, index) => (
                        <MenuItem key={index} value={profile.name}>
                          {profile.name}
                        </MenuItem>
                      ))}
                      {/* <MenuItem value="Heey">Twenty</MenuItem>
                    <MenuItem value="45">Twenty one</MenuItem>
                    <MenuItem value="22">Twenty one and a half</MenuItem> */}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ m: 0, minWidth: 200 }}>
                    <InputLabel id="router-type">Select Service</InputLabel>
                    <Select
                      labelId="profile-type"
                      id="demo-simple-select-autowidth"
                      value={pickedService}
                      onChange={(e) => setPickedService(e.target.value)}
                      fullWidth
                      label="profile"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="any">any</MenuItem>
                      <MenuItem value="async">async</MenuItem>
                      <MenuItem value="l2tp">l2tp</MenuItem>
                      <MenuItem value="ovpn">ovpn</MenuItem>
                      <MenuItem value="pppoe">pppoe</MenuItem>
                      <MenuItem value="pptp">pptp</MenuItem>
                      <MenuItem value="sstp">sstp</MenuItem>
                    </Select>
                  </FormControl>

                  <div className="flex flex-col">
                    <label htmlFor="status">Status</label>
                    <input
                      id="status"
                      value={pppoeDetails.status}
                      onChange={(e) =>
                        setPppoeDetails({
                          ...pppoeDetails,
                          status: e.target.value,
                        })
                      }
                      type="text"
                      className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                      placeholder="Enable"
                    />
                  </div>
                </div>
              </form>
              <form className="mb-4 flex flex-col border border-gray-200 p-2">
                <h1 className="text-xl bg-violet-600 px-2">
                  Personal Information
                </h1>
                <label htmlFor="mpesarefno">M-pesa Ref No# *</label>
                <input
                  id="mpesarefno"
                  value={pppoeDetails.mpesaRef}
                  onChange={(e) =>
                    setPppoeDetails({
                      ...pppoeDetails,
                      mpesaRef: e.target.value,
                    })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="M-pesa Ref No# *"
                />
                <label htmlFor="monthlybill">Monthly Bill *</label>
                <input
                  id="monthlybill"
                  value={pppoeDetails.monBill}
                  onChange={(e) =>
                    setPppoeDetails({
                      ...pppoeDetails,
                      monBill: e.target.value,
                    })
                  }
                  type="text"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Monthly Bill"
                />
                <label htmlFor="mobile">Mobile Number# *</label>
                <input
                  id="mobile"
                  value={pppoeDetails.mobile}
                  onChange={(e) =>
                    setPppoeDetails({ ...pppoeDetails, mobile: e.target.value })
                  }
                  type="number"
                  className="mb-2 md:mr-2 p-2 border border-gray-300 rounded"
                  placeholder="07..."
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Expiry Date"
                      value={pppoeDetails.expiry}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </form>
              <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={handlePpoeForm}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddNewUser;
