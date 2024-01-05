import {useCookies} from 'react-cookie'
import { useState } from "react";

const Modal=({mode,setShowModal,getData,task})=>{
  const [cookies,setCookies,removeCookies] =useCookies(null);
  const edit= mode=="edit"?true:false;
  const [data,setData]=useState({
    user_email: edit?task.user_email:cookies.Email,
    title:edit?task.title : null,
    progress:edit?task.progress : 50,
    date:edit? "":new Date()
  });

  const postData = async(par)=> {
    par.preventDefault();
    try {
      const response= await fetch(`${process.env.REACT_APP_SERVER_URL}/todos` , {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status===200) {
        console.log("Data sent!!!");
        setShowModal(false);
        getData();
      }
    }catch(err) {
      console.log(err);
    }
  }

  const editData = async(param) => {
    param.preventDefault();
    try {
      const response=await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,{
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      });

      if(response.status===200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handle= (err)=> {
    const {name,value}=err.target;
    setData(data => ({
      ...data,
      [name]:value
  }));
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={ () => setShowModal(false) }>X</button>
        </div>

        <form>
          <input required maxLength={30} placeholder="Your task goes here." name="title" value={data.title} onChange={handle}/>
          <br />
          <label>Drag to select your current progress.</label>
          <input type="range" required min={"0"} max={"100"} name="progress" value={data.progress} onChange={handle} id="range"/>
          <input type="submit" className={mode} onClick={edit?editData:postData}/> 
        </form>

      </div>
    </div>
  );
}

export default Modal;
