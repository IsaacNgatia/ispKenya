import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "mt_id", headerName: "ID", width: 90 },
  {
    field: "mt_user",
    headerName: "Mikrotik name",
    width: 150,
    // editable: true,
  },
  {
    field: "mt_ip",
    headerName: "Mikro IP",
    width: 150,
    // editable: true,
  },
  {
    field: "api_port",
    headerName: "Port",
    type: "number",
    width: 110,
    // editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

const usersLink = "http://localhost:4000/api/v1/isp/mks";

export default function DataGridDemo() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(usersLink)
      .then(function (res) {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.mt_id}
        rows={users}
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
  );
}
