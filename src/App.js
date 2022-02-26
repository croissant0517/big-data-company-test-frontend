import { useEffect, useState } from 'react';

import DropDown from './component/dropdown/dropdown';
import Histogram from './component/histogram/histogram';

import logo from './taipeilogo.png';
import { ReactComponent as Spinner } from "./Ellipsis-1s-200px.svg";
import './App.css';

const API_URL = (process.env.NODE_ENV === "development") ? 
"http://localhost:8001"
:
"https://morning-tundra-22660.herokuapp.com"

let keys = []

for (let i = 1; i < 13; i++) {
  if(i < 10) {
    keys.push("0"+i)
  } else {
    keys.push(i.toString())
  }
}

let taipeiData = [];

for (let i = 0; i < keys.length; i++) {
  taipeiData[i] = {
    id: i,
    items: []
  };
}

function App() {
  const [ data, setData ] = useState([]);
  const [ dropDownValue, setDropDownValue ] = useState(0);
  const [ isFetching, setIsFetching ] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetch(`${API_URL}/taipei-data`)
    .then(res => res.json())
    .then(datas => {
      // 將資料依據行政區分為12個區
      datas.forEach(data => {
        for (let i = 0; i < keys.length; i++) {
          if(data.district_code[5] + data.district_code[6] === keys[i]) {
            taipeiData[i].items.push(data);
          }
        }
      })
      setData(taipeiData)
      setIsFetching(false);
    })
  }, [])

  return (
    <div className="App">
      <img src={logo} className="logo" alt="logo" />
      {
        isFetching ? <Spinner className='spinner'/>
        :
        <div className='dropdown-histogram'>
          <DropDown data = {data}  setDropDownValue = {setDropDownValue} dropDownValue = {dropDownValue}/>
          <Histogram dropDownValue = {data[dropDownValue]} /> 
        </div>
      }
    </div>
  )
}

export default App;
