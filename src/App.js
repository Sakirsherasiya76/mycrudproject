import './App.css';
import Table from './Components/Table';
import Model from './Components/Model';
import { useState } from 'react';
function App() {
  const [modelOpen, setMoelOpen] = useState(false);
  const [rows, setRows]= useState ([
     {page:'page 1',description:'This is a first page',status:'live'},
     {page:'page 2',description:'This is a second page',status:'draft'},
     {page:'page 3',description:'This is a third page',status:'error'},

  ]);

  const [rowToEdit,setRowToEdit]=useState(null);

  const handleDeleteRow = (targetIndex) =>{
    setRows(rows.filter((_,idx)=> idx !== targetIndex));
  }

  const handleEditRow = (idx) =>{
    setRowToEdit(idx);   

    setMoelOpen(true);
  } 
  const handleSubmit = (newRow) =>{
    rowToEdit === null ?
    setRows([...rows,newRow]):
    setRows(rows.map((currRow,idx)=>{
      if(idx !== rowToEdit)return currRow;

      return newRow;
    }))
  }
  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow}/>
      <button className='btn' onClick={() => setMoelOpen(true)}>Add</button>
      {modelOpen && <Model closeModel={() => {
        setMoelOpen(false);
        
        setRowToEdit(null);
      }}             
      onSubmit={handleSubmit} 
      defaultValue={rowToEdit !== null && rows[rowToEdit]} 
      />}
    </div>
  );
}

export default App;
