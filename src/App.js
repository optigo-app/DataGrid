import { Button, Menu } from '@mui/material';
import './App.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React,{ useEffect, useState } from 'react';

let demoData = require('./WIPReport.json')
function App() {
  const [columns, setColumns] = useState([]);

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
        width: 150
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

  const [currentCal, setCuurentcCal] = useState(columns);

  const handleCallOrdr = (newColum) => {
    setCuurentcCal(newColum);
  }

  const getRowClassName = (params) => {

    // console.log('params.PCs',params.row.PCs)
    // if (params.row.PCs===5) {
    //   return 'selected-row'; 
    // }
    // return ''; 


    if (
      params.row.PCs === 5
    ) {
      return 'selected-row'; // CSS class name for the specific selected cell
    }
    return '';
  };

  const handleCell = (params) =>{
    if(params.row?.PCs === '5'){

      return (
        <div className='selected-row'>
          {params.value}
        </div>
      )
    }
    return <div>{params.value}</div>
  }
  console.log('demooo', demoData);

  const CustomButton = () => {

    const handleButtonClick = () => {
      // Add functionality for the button click here
      console.log('Button clicked!');
    };

    return (
      <div style={{display:'flex'}}>
        <GridToolbar /> {/* Render the default toolbar */}
        <Button  onClick={handleButtonClick}>progress filter</Button>
        <Menu>
          <div style={{display:'grid',gridTemplatecolumns:'auto auto'}}>
          
          </div>
        </Menu>
        {/* You can add more components here based on your requirements */}
      </div>
    );
  };
  
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
          // getRowClassName={getRowClassName}
        />
      </div>
    </div>
  );
}

export default App;
