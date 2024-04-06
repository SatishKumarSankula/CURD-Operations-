import React, { useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'


function Create() {

    let [name,setName] = useState("")
    let [email,setemail] = useState("")
    const history = useNavigate();
   


    const [errors, setErrors] = useState({
      name : "",
      email : ""
    })



    
    // const header = {"Access-Control-Allow-Orign":"*" }

    // let url = "https://62a59821b9b74f766a3c09a4.mockapi.io/crud-youtube"

    // const handleSubmit = (e)=>{
    //     e.preventDefault()
    //     console.log("Clicked")
    //     axios.post(url,{
    //         name : name ,
    //         email : email,
    //         header ,
    //     })


        

    // }    

    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    

    const url = "http://localhost:3580/products"

    async function handleSubmit(e){
  
        e.preventDefault()

        if (name.trim()==="" && email.trim()===""){
          setErrors((errors)=>({...errors,name:"Enter Name",email:"Enter Email"}))
        }
     
        else if (name.trim()===""){
          setErrors((errors)=>({...errors,name:"Enter Name"}))
        }
        else if (email.trim()===""){
          setErrors((errors)=>({...errors,email:"Enter Email"}))
        }

        else if (!emailpattern.test(email)){
          setErrors((errors)=>({...errors,email:"Enter Valid Email"}))
        }
           
        
        else {
         
          console.log("Clicked")
           await axios.post(url,{name:name,email:email},{
              headers : {
                  "Content-Type" : "application/json"
              }
          });
     
          history("/read");

        }

    }


  
  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <h2>Create</h2>
        <Link to="/read">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
    
    <form>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
        {
          errors.name &&  <span className="text-danger">{errors.name}</span>
        }
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={(e)=>setemail(e.target.value)}/>
        {
          errors.email && <span className="text-danger">{errors.email}</span>
        }
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
    </>
  )
}

export default Create
