import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SideBar from "../../components/SideBar";
import NewMessageCards from "../../components/NewMessageCards";

const ComposeNewSms = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="m-10">
          <h1 className="text-xl text-gray-900 pb-5 font-semibold">New SMS</h1>
          <BasicTabs />
        </div>
      </div>
    </>
  );
};

export default ComposeNewSms;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Send to Users" {...a11yProps(0)} />
          <Tab label="Send to Mikrotiks" {...a11yProps(1)} />
          <Tab label="Send to Unregistered User" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <NewMessageCards />
        Send to Users
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewMessageCards />
        Send to Mikrotiks
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NewMessageCards />
        Send to Unregistered User
      </TabPanel>
    </Box>
  );
}
