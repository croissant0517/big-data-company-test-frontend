import { useEffect, useState } from 'react';

import DropDown from './component/dropdown/dropdown';
import Histogram from './component/histogram/histogram';

import logo from './taipeilogo.png';
import { ReactComponent as Spinner } from "./Ellipsis-1s-200px.svg";
import './App.css';

const API_URL = "https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/110"

let keys = []

for (let i = 1; i < 13; i++) {
  if(i < 10) {
    keys.push("0"+i)
  } else {
    keys.push(i.toString())
  }
}

let splittedData = [];

for (let i = 0; i < keys.length; i++) {
  splittedData[i] = {
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
    let taipeiData = []
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      // 將台北市資料篩選出來
      data.responseData.forEach(eachData => {
        if (eachData.district_code[0] + eachData.district_code[1] === "63") {
          taipeiData.push(eachData)
        }
      })
      // 將資料依據行政區分為12個區
      taipeiData.forEach(data => {
        for (let i = 0; i < keys.length; i++) {
          if(data.district_code[5] + data.district_code[6] === keys[i]) {
            splittedData[i].items.push(data);
          }
        }
      })
      setData(splittedData)
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
