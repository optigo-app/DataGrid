import { Button, Menu } from '@mui/material';
import './App.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React,{ useCallback, useEffect, useState } from 'react';
import ImageCell from './ImageCell';
let demoData = require('./WIPReport.json')
let masterDemoData = require('./mastergridtable.json')

function App() {

  const [columns, setColumns] = useState([]);
  const [master, setMaster] = useState([]);

  let demoFun = () => (
    demoData.map(element => {
      return Object.keys(element);
    })
  )

  const removeDuplicates = (array, key) => {
    return array.filter((item, index, self) => {
      return index === self.findIndex(obj => (
        obj[key] === item[key]
      ));
    });
  };
  let uniqueArray = removeDuplicates(demoFun(), 'Priority');

  useEffect(() => {
    if (uniqueArray?.length) {
      const updatedColumns = uniqueArray[0].map((field) => ({
        field: field,
        headerName: field,
        width: 150,
        renderCell: (params) => {
          if (field === 'Default Image for Job') {
            return <ImageCell imageUrl={params.value} />; // Pass image URL to ImageCell component
          } else {
            return params.value; // Render other cell values normally
          }
        },
      }));
      setColumns(updatedColumns)
    }
  }, []);

  demoData = demoData.map((item, index) => {
    return {
      id: index + 1,
      ...item,
    };
  });

  let newMaster = useCallback(() => {
    return masterDemoData.map((data) => data.Column3)
  }, [masterDemoData])

  console.log('newmas', newMaster()?.map((data) => data));

  const [currentCal, setCuurentcCal] = useState(columns);
  const handleCallOrdr = (newColum) => {
    setCuurentcCal(newColum);
  }


      return (
        <div className='selected-row'>
          {params.value}
        </div>
      )
    }
    return <div>{params.value}</div>
  }
  console.log('demooo', demoData);
  return (
    <div>

      <div style={{
        height: '100vh'
      }}>
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
          rows={demoData}
          columns={columns}
          onColumnOrderChange={handleCallOrdr}
          components={{
            Toolbar: CustomButton,
            // Cell: handleCell,
          }}
        />
      </div>
    </div>
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