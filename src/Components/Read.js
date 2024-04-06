import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Read() {

  let [data,setData] = useState([])

  async function getData(){
    let res = await axios.get("http://localhost:3580/products")
      console.log(res)
      setData(res.data)
  }
  

  async function handleDelete(id){

      await axios.delete(`http://localhost:3580/products/${id}`)
      getData()

  }


  // function handleDelete(data){
  //   axios.delete(`http://localhost:3508/products/${id}`)
  //   .then(()=>{
  //     getData()
  //   })

  // }

  



  // function getData(){
  //   axios.get("http://localhost:3508/products")
  //   .then((res)=>{
  //     console.log(res)
  //     setData(res.data)
  //   })
    
  // }


  const setLocalStorage =(id,name,email)=>{
      localStorage.setItem('id',id)
      localStorage.setItem('name',name)
      localStorage.setItem('email',email)
  }
 


  useEffect(()=>{
    getData();
  },[])


  return (
    <>
    <div className="d-flex justify-content-between m-2">
      <h2>Read Operation</h2>
      <Link to="/">
        <button className="btn btn-secondary">Create</button>
      </Link>
    </div>
    <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
            </tr>
        </thead>
        {
          data.map((eachData)=>(
            <tbody key={eachData.id}>
              <tr>
              <th scope="row">{eachData.id}</th>
              <td>{eachData.name}</td>
              <td>{eachData.email}</td>
              <td>
                  <Link to="/update">
                    <button className='btn btn-success'
                    onClick={()=>setLocalStorage(eachData.id,eachData.name,eachData.email)}
                    >Edit</button>
                  </Link>
               </td>
              <td><button className='btn btn-danger' onClick={()=>handleDelete(eachData.id)}>Delete</button></td>
              </tr>
            </tbody>
          ))
        }

    </table>
    </>
  )
}

export default Read

