import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
// import MenuDrawer from "../../components/DrawerTest";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "mt_user",
    headerName: "Mikrotik name",
    width: 150,
    // editable: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    // editable: true,
  },
  {
    field: "reference_number",
    headerName: "Reference Number",
    // type: "number",
    width: 110,
    // editable: true,
  },
  {
    field: "connectiontype",
    headerName: "Type",
    // description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "mobileno",
    headerName: "Mobile",
    width: 150,
    // editable: true,
  },
  {
    field: "ipaddress",
    headerName: "IP",
    width: 150,
    // editable: true,
  },
  {
    field: "name",
    headerName: "Router Name",
    width: 150,
    // editable: true,
  },
  {
    field: "maxdownloadspeed",
    headerName: "Package",
    width: 150,
    // editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    // editable: true,
  },
  {
    field: "expirydate",
    headerName: "Expiry Date",
    width: 150,
    // editable: true,
  },
  {
    field: "expirydate",
    headerName: "Remaining Days",
    width: 150,
    // editable: true,
  },
];

const usersLink = "http://localhost:4000/api/all-users";

const ViewAllUsers = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
      .get(usersLink)
      .then(function (res) {
        console.log(res.data.data);
        setRows(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="flex min-w-screen min-h-screen overflow-auto gap-2">
        <SideBar />
        <div className="flex-grow flex">
          <Box sx={{ height: "100%", width: "100%" }} className="">
            <DataGrid
              // getRowId={(row) => row.id}
              key={"id"}
              // keyExtractor={(row) => row.id}
              // getRowId={getRowId}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 15,
                  },
                },
              }}
              pageSizeOptions={[15]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>
      {/* <MenuDrawer /> */}
    </>
  );
};

export default ViewAllUsers;
