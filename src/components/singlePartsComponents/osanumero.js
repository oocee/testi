import React, {useState} from "react";
import {CSVLink} from 'react-csv'

const PartNumber = () => {

    const [osanumero, setOsanumero] = useState()
    const [svh, setSvh] = useState()
    const [kuvaus, setKuvaus] = useState()
    const [oem, setOem] = useState()

    const [parts, setParts] = useState([])
  
    const addPart = () => {
        let obj = {}
        obj.Nro = osanumero
        obj.Kuvaus = kuvaus
        obj.KuvausOem = oem
        obj.Yksikköhinta = svh

        console.log(obj)
        setParts([...parts, obj])
        console.log(parts)

        clearData()
    }

    
    const headers = [        
        {label: "PartNumber", key: "Nro"},
        {label: "OemDescription", key:"KuvausOem"},
        {label: "CustomerNumber", key:""},
        {label: "Description", key:"Kuvaus"},
        {label: "SellPrice", key:"Yksikköhinta"},
        {label: "CoreCharge", key:""},
        {label: "Cost", key:""}
      ]

    const clearData = () => {
        setOsanumero('')
        setKuvaus('')
        setOem('')
        setSvh('')
    }


    const partList = parts.map((part) => {
        return(
        <div id="part">
          <div id='partList'> 
            <p >{part.Nro}   {part.Kuvaus}    {part.KuvausOem}  {part.Yksikköhinta}  </p> 
          </div> 
          <button onClick={() => deleteByValue(part.Nro)}>poista</button> 
        </div> 
        )
    })

    const deleteByValue = (value) => {
      setParts(oldValues => {
        return oldValues.filter(part => part.Nro !== value)
      }) }

    return (
        <div id='singlePart'>
        <p id="partsHeader">Yksittäisten osien hinnoittelu</p>
        <p id="infoTxt">Älä käytä " tai ; merkkejä. Käytä hinnassa pistettä, älä pilkkua.</p>

        <div id="addParts">
          <div class="inputField">
            <text>Osanumero: </text>
            <input type='text' value={osanumero} placeholder={'Pakollinen*'} onChange={e => setOsanumero(e.target.value)} ></input>
          </div>
          <div class="inputField">
            <text>Kuvaus: </text>
            <input type='text' value={kuvaus} placeholder={'pakollinen*'} onChange={e => setKuvaus(e.target.value)} ></input>
          </div>
          <div class="inputField">
            <text>OEM Kuvaus: </text>
            <input type='text' value={oem} placeholder={'Vain Custom osaan'} onChange={e => setOem(e.target.value)} ></input>
          </div>
          <div class="inputField">
            <text>SVH: </text>
            <input type='text' value={svh} placeholder={77.77 + " Pakollinen*"} onChange={e => setSvh(e.target.value)} ></input>
          </div>
          <div class="inputField">
              <button onClick={addPart}>Lisää osa</button>
            </div>
        </div>
            

        <div>
            {partList}
        </div>
        

        <div id='loadCSV'>
            <CSVLink
                data={parts}
                headers={headers}
                separator={";"}
                filename={"my-file.csv"}
                enclosingCharacter={`"`}>
                    Lataa CSV
            </CSVLink>
        </div>        
      </div>


    )

}

export default PartNumber