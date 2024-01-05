import { Button, Checkbox, Menu,MenuItem, Typography} from "@mui/material";
import "./App.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import ImageCell from "./ImageCell";

let demoData = require("./WIPReport.json");
let masterDemoData = require("./mastergridtable.json");

function App() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(demoData);
  const [masterFlag, setMasterFlag] = useState([]);
  const [checkboxes, setCheckboxes] = useState({})
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let demoFun = () =>
    demoData.map((element) => {
      return Object.keys(element);
    });

  const removeDuplicates = (array, key) => {
    return array.filter((item, index, self) => {
      return index === self.findIndex((obj) => obj[key] === item[key]);
    });
  };
  let uniqueArray = removeDuplicates(demoFun(), "Priority");


  useEffect(() => {
    if (uniqueArray?.length) {
      const updatedColumns = uniqueArray[0].map((field) => ({
        field: field,
        headerName: field,
        width: 150,
        
        renderCell: (params) => {
          if (field === "Default Image for Job") {
            return <ImageCell imageUrl={params.value} />; // Pass image URL to ImageCell component
          } 
          else {
            return params.value; // Render other cell values normally
          }
        },
      }));
      setColumns(updatedColumns);
    }
  }, []);

  demoData = demoData.map((item, index) => {
    return {
      id: index + 1,
      ...item,
    };
  });

  let newMaster = () => {
    return masterDemoData.map((data) => data.Column3);
  };

  useEffect(() => {
    if(!checkboxes.length){
      newMaster();
    }
  }, [checkboxes])

  const addValue = (newValue) => {
    setMasterFlag((prev)=>[...prev,newValue]);
  };

  // const filterData = () =>{
  //   const filterValue = demoData.filter(data => masterFlag.includes(data.Category));
  //   return filterValue;
  // }
  
  const handleCheckboxChange = (e)=>{
    // debugger
    const { name, checked ,value } = e.target;
    addValue(value)

    // const filterData = demoData.filter(data => value.some(value => data.Category === value));
    // console.log("filterData",filterData);

    setCheckboxes((prev) => ({
      ...prev,
      [name]: {checked,value}
    }));
  }

  console.log("filterData",);

  // useEffect(()=>{
  //   let finalData = filterData().length>0 ? filterData() : demoData
  //  setRows(finalData)
  // },[masterFlag])


  const handelApplyFilter = () =>{
    const filterValue = demoData.filter(data => masterFlag.includes(data.Category));
    let finalData = filterValue.length>0 ? filterValue : demoData
    setRows(finalData)
    setAnchorEl(null);
  }

  const handelClearFilter  = () =>{
    setRows(demoData);
    setCheckboxes({});
    setMasterFlag([]);
    setAnchorEl(null);
  }

  console.log("checkboxes",checkboxes)
  
  // console.log("checkboxes", demoData);                                                     
  return (
    <>
      <div>
        <div style={{ backgroundColor: "#797979" }}>
          <div style={{marginLeft:'8px'}}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
              style={{ color: "white", borderColor: "white", margin: "5px" }}
            >
              <Typography sx={{ fontSize: "14px" }}>Category Filter</Typography>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              style={{height:'90%',marginTop:'2px'}}
            >
              <div style={{ position: "fixed",backgroundColor:'white',zIndex:111111,padding:'12px',marginTop:'-8px',width:'287px',borderBottom:'1px solid #f1f1f1'}}>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                <Button variant="contained" style={{backgroundColor:'#797979',color:'white'}} onClick={handelApplyFilter}>Apply</Button>
                <Button variant="contained" style={{backgroundColor:'#797979',color:'white'}} onClick={handelClearFilter}>clear</Button>
                </div>
              </div>
              <div 
              style={{ marginTop: "45px" }}
              >
                {newMaster()?.map((data, i) => (
                  <>
                    <MenuItem key={i} disableRipple>
                      <Checkbox
                        defaultChecked={false}
                        value={data}
                        disableRipple
                        checked={checkboxes[`checkbox${i + 1}`]?.checked}
                        onClick={(e) => handleCheckboxChange(e)}
                        name={`checkbox${i + 1}`}
                      />
                      {data}
                    </MenuItem>
                  </>
                ))}
              </div>
            </Menu>
          </div>
        </div>
      </div>
      <div
        style={{
          height: `calc(100vh - 43.5px)`,
        }}
      >
        <DataGrid
          checkboxSelection={true}
          pageSizeOptions={[20, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          rows={rows}
          columns={columns.map((column) => ({
            ...column,
            headerClassName: "customHeaderCell",
          }))}
          density="compact"
          onColumnOrderChange={""}
          components={{
            Toolbar: GridToolbar,
            // Cell: handleCell,
          }}
        />
      </div>
    </>
  );
}

export default App;

//  {
//   "Category_3\/1\/2024_14:34:27": "srno",
//   "Column2": "Category Code(Short Name)",
//   "Column3": "Category Name",
//   "Column4": "Description",
//   "Column5": "Display Order"
//  },
