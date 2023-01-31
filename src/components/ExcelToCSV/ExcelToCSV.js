import React, {useState} from 'react';
import * as XLSX from 'xlsx';
import {CSVLink} from 'react-csv'



const ETCSV = () => {

    
    const [value, setValue] = useState("mle")
    const [data, setData] = useState([])


    const [headers, setHeaders] = useState([        
      {label: "PartNumber", key: "Nro"},
      {label: "OemDescription", key:""},
      {label: "CustomerNumber", key:""},
      {label: "Description", key:"Kuvaus"},
      {label: "SellPrice", key:"Yksikköhinta"},
      {label: "CoreCharge", key:""},
      {label: "Cost", key:""}
    ])
  
  
    
  
    //When value of the <select> changes, this update 
    const valueChange = (e) => {
      if (e.target.value === "mle") {
        setValue(e.target.value)
        setHeaders([
          {label: "PartNumber", key: "Nro"},
          {label: "OemDescription", key:""},
          {label: "CustomerNumber", key:""},
          {label: "Description", key:"Kuvaus"},
          {label: "SellPrice", key:"Yksikköhinta"},
          {label: "CoreCharge", key:""},
          {label: "Cost", key:""}
        ])
      }
      else {
        setHeaders([
          {label: "PartNumber", key: "Nro"},
          {label: "OemDescription", key:"Kuvaus"},
          {label: "CustomerNumber", key:""},
          {label: "Description", key:"Kuvaus"},
          {label: "SellPrice", key:"Yksikköhinta"},
          {label: "CoreCharge", key:""},
          {label: "Cost", key:""}
        ])
      }
    }
  
    const excelToJson = (file) => {
  
        const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
  
        // Get data from excel file
        fileReader.onload= (e) => {
          const exArray = e.target.result
          const workBook = XLSX.read(exArray,{type:'buffer'})
          const tableName = workBook.SheetNames[0]
          const workSheet = workBook.Sheets[tableName]
          const excelData = XLSX.utils.sheet_to_json(workSheet)
          resolve(excelData)
        }
        fileReader.onError = ((error) => {
          reject(error)
          console.log(error)
        })
      
      })
  
      promise.then((data) => {
        jsonToCSV(data)
      })
  
    }
  
    const jsonToCSV = (data) => {
      console.log(data)
      setData(data.map((dataA) => {
        let obj = {}
        obj.Nro = dataA.Nro
        obj.Kuvaus = dataA.Kuvaus.replace(/"/g, '')
        obj.Yksikköhinta = dataA.Yksikköhinta

        return obj;
      }))
    }
  

    return(
    
       <>
        <div id='excelFile'>
        <p>Valitse Excel tiedosto</p>
        <input type="file" onChange={(e) => {
          const file = e.target.files[0]
          excelToJson(file)
        }}/>
      </div>

      <div id='selectVal'>
        <text>Valitse haluatko päivittää MLE:n- vai Custom osien hinnat </text>
        <select 
          defaultValue={value}
          onChange={valueChange}>
          <option value="mle">MLE</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      <div id='loadCSV'>
        <CSVLink
          data={data}
          headers={headers}
          separator={";"}
          filename={"my-file.csv"}
          enclosingCharacter={`"`}>
            Lataa CSV
        </CSVLink>
      </div>
      </> 
    )

}

export default ETCSV