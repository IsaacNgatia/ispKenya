// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const url = "http://localhost:4000/api/v1/isp/mks";
// const git = "https://api.github.com/users";

// const ViewAllMikrotiks = () => {
//   const [data1, setData1] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const getData = async () => {
//     axios
//       .get(url)
//       .then(function (response) {
//         console.log(response.data);

//         setData1(response.data.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   if (isLoading) {
//     <h2>Loading ...</h2>;
//   }

//   return (
//     <>
//       <div>
//         <div>
//           {data1.map((item) => {
//             return (
//               <div key={item.mt_id}>
//                 <p>{item.mt_user}</p>
//                 <p>{item.name}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewAllMikrotiks;
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import SideBar from "../../components/SideBar";
import { Button } from "@mui/material";
import { useState } from "react";

const usersLink = "http://localhost:4000/api/all-miks";

// const EditForm = ({ selectedItem }) => {
//   // Handle form submission logic
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Send selectedItem to the URL or handle the logic as needed
//     console.log(selectedItem);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-lg max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Edit Form</h2>
//         <form onSubmit={handleFormSubmit}>
//           {/* Form fields go here */}
//           {/* ... */}
//           <div className="flex justify-end mt-6">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
//             >
//               Save
//             </button>
//             {/* Close button or cancel logic */}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

const EditForm = ({ selectedItem, onClose, onEdit }) => {
  // Form state and logic go here

  const [mtId, setMtId] = useState("");
  const [formData, setFormData] = useState({
    id: selectedItem.mt_id,
    ipAddress: selectedItem.mt_ip,
    username: selectedItem.mt_user,
    password: selectedItem.mt_pass,
    apiPort: selectedItem.api_port,
    mikrotikName: selectedItem.mt_name,
    location: selectedItem.mt_location,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMtId(selectedItem.mt_id);
    console.log(selectedItem);

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/update-mik/${mtId}`,
        formData
      );
      console.log(response); // handle successful response
    } catch (error) {
      console.error(error); // handle error
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="p-8 rounded-lg max-w-md bg-white shadow-md lg:min-w-[700px]">
        <h2 className="text-2xl font-bold mb-4">Edit Form</h2>
        <div className="max-w-md mx-auto">
          <form
            className=" rounded px-8 pt-6 pb-8 mb-4 w-[100%]"
            onSubmit={handleFormSubmit}
          >
            <h2 className="text-lg font-semibold mb-2">Section 1</h2>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 justify-between lg:gap-12">
              <label className="block text-gray-700 text-md font-bold mb-2 ">
                IP Address
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="text"
                  name="ipAddress"
                  value={formData.ipAddress}
                  onChange={handleChange}
                />
              </label>
              <label className="block text-gray-700 text-md font-bold mb-2 ">
                Username
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <label className="block text-gray-700 text-md font-bold mb-2 ">
                Password
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              <label className="block text-gray-700 text-md font-bold mb-2 ">
                API Port
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="text"
                  name="apiPort"
                  value={formData.apiPort}
                  onChange={handleChange}
                />
              </label>
            </div>
            <h2 className="text-lg font-semibold mb-2">ISP Details</h2>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 justify-between lg:gap-12">
              <label className="block text-gray-700 text-md font-bold mb-2 ">
                Mikrotik Name
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="text"
                  name="mikrotikName"
                  value={formData.mikrotikName}
                  onChange={handleChange}
                />
              </label>
              <label className="block text-gray-700 text-md font-bold mb-2 ">
                Location
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>

              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function DataGridDemo() {
  const [mikros, setMikros] = React.useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditButtonClick = (params) => {
    console.log(params);
    setIsFormOpen(true);
    setSelectedItem(params.row);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  const handleSaveEdit = () => {
    // Send the selected item to the desired URL
    // ...
    handleCloseForm();
  };

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
      headerName: "Mikrotik IP",
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
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <>
          <div className="flex items-center justify-between w-[100%]">
            <button onClick={() => handleEditButtonClick(params)}>Edit</button>
            <button>Delete</button>
            <button>Backup</button>
          </div>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    axios
      .get(usersLink)
      .then(function (res) {
        setMikros(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="flex bg-gray-50">
        <SideBar />
        <div className="flex flex-col items-center flex-1 mt-10 mb-auto">
          <h2 className="text-4xl font-semibold text-gray-600">
            List of all Mikrotiks
          </h2>
          <Box sx={{ height: "100%", width: "100%" }} className="px-10 py-20">
            <DataGrid
              getRowId={(row) => row.mt_id}
              // getRowId={getRowId}
              rows={mikros}
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

            {isFormOpen && (
              <div className="overlay">
                <div className="form-container">
                  <EditForm
                    selectedItem={selectedItem}
                    onClose={handleCloseForm}
                    onEdit={handleSaveEdit}
                  />
                </div>
              </div>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
