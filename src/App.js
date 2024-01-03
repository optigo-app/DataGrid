import './App.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { SiPowerpages } from "react-icons/si";
import { IoMdHome } from "react-icons/io";

let demoData = require('./WIPReport.json')


function App() {

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenPages, setIsOpenPages] = useState(false);
  const [isOpenUser, setIsOpenUseer] = useState(false);
  const [columns, setColumns] = useState([]);

  // const columns = [
  //   { field: 'col1', headerName: 'Column 1', width: 150 },
  //   { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];
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
  console.log('Unique Array:', uniqueArray);
  console.log('Unique colum:', columns);


  useEffect(() => {
    if (uniqueArray?.length) {
      for (let i = 0; i < uniqueArray?.length; i++) {
        setColumns({
          field: uniqueArray[i],
          headerName: uniqueArray[i],
          width: 150,
        })
      }
    }
  }, [])
  // const columns = [uniqueArray];


  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },

  ];


  // console.log('demoDatademoData',Object.keys(demoData));
  const toggleDeatilList = () => {
    setIsOpenDetail(!isOpenDetail);
    setIsOpenPages(false)
    setIsOpenUseer(false)
  };


  const togglePagesList = () => {
    setIsOpenPages(!isOpenPages);
    setIsOpenDetail(false)
    setIsOpenUseer(false)
  };


  const toggleUserList = () => {
    setIsOpenUseer(!isOpenUser);
    setIsOpenPages(false)
    setIsOpenDetail(false)

  };

  const [currentCal, setCuurentcCal] = useState(columns);

  const handleCallOrdr = (newColum) => {
    setCuurentcCal(newColum);
  }

  return (
    <div>
      <div className='header'>

      </div>
      <div style={{ display: 'flex' }}>
        <div className='siderBar'>
          <div onClick={toggleUserList} className='menu'>
            <IoMdHome className='menuIcone' />
            <p className='menuTitle'>WelCome User</p>
          </div>
          <ul className={`my-DetailList ${isOpenUser ? 'open' : ''}`} style={{ border: isOpenUser ? '1px solid lightgray' : ' ' }}>
            <li>
              <div className='dropSize'>
                <p className='dropDetailTitle'>Clarity</p>
              </div>
            </li>
            <li>
              <div className='dropSize'>
                <p className='dropDetailTitle'>Color</p>
              </div>
            </li>
            <li>
              <div className='dropSize'>
                <p className='dropDetailTitle'>Setting Type	</p>
              </div>
            </li>
          </ul>

          <div onClick={toggleDeatilList} className='menu'>
            <FaUser className='menuIcone' />
            <p className='menuTitle'>User</p>
          </div>
          <ul className={`my-DetailList ${isOpenDetail ? 'open' : ''}`} style={{ border: isOpenDetail ? '1px solid lightgray' : ' ' }}>
            <li>
              <div className='dropSize'>
                <p className='dropDetailTitle'>Clarity</p>
              </div>
            </li>
            <li>
              <div className='dropSize'>
                <p className='dropDetailTitle'>Color</p>
              </div>
            </li>
            <li>
              <div className='dropSize'>
                <p className='dropDetailTitle'>Setting Type	</p>
              </div>
            </li>
          </ul>

          <div onClick={togglePagesList} className='menu'>
            <SiPowerpages className='menuIcone' />
            <p className='menuTitle'>Pages</p>
          </div>
          <ul className={`my-DetailList ${isOpenPages ? 'open' : ''}`} style={{ border: isOpenPages ? '1px solid lightgray' : ' ' }}>
            <li>
              <div className='dropSize'>
                <p className='dropDetailTitle'>Clarity</p>
              </div>
            </li>
            <li>
              <div className='dropSize'>
                <p className='dropDetailTitle'>Color</p>
              </div>
            </li>
            <li>
              <div className='dropSize'>
                <p className='dropDetailTitle'>Setting Type	</p>
              </div>
            </li>
          </ul>
        </div>
        <div style={{ width: '100%' }}>
          <div style={{
            height: '5vh',
            backgroundColor: '#cdcec9',
            borderBottom: '1px solid #888888',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <p>ONE</p>
            </div>
            <button style={{
              border: 'none',
              height: '30px',
              width: '70px',
              color: 'white',
              backgroundColor: '#800000',
              fontSize: '15px',
              cursor: 'pointer'
            }}>Logout</button>
          </div>
          <div style={{
            height: '86vh'
          }}>
            <DataGrid
              checkboxSelection={true}
              pageSizeOptions={[5, 10, 15]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              rows={rows}
              columns={columns}
              onColumnOrderChange={handleCallOrdr}
              components={{
                Toolbar: GridToolbar
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
