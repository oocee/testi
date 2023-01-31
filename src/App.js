import React, {useState} from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import {CSVLink} from 'react-csv'
import PartNumber from './components/singlePartsComponents/osanumero'
import ETCSV from './components/ExcelToCSV/ExcelToCSV';

function App() {



  return (
    <div id='container' >

      <div  id='header'>
        <h1>Parts Store CSV</h1>
      </div>

      <ETCSV/>

      <hr/>

      <PartNumber/>
      

    </div>
  );
}

export default App;
