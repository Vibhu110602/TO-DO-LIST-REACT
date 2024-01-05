import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName ,getData}) => {

  const [showModal,setShowModal] = useState(false);
  const [cookies,setCookie,removeCookie] =useCookies(null);

  const signOut = () => {
    console.log('Signed Out');
    removeCookie('Email');
    removeCookie('AuthToken');
    window.location.reload();
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(0, 0, 0, 0.5)'
    }} className='list-header'>
      <h1>{listName}</h1>
      <div className="button-container">
        <button className='create' onClick={()=>setShowModal(true)}>ADD</button>
        <button className='signout' onClick={signOut}>SIGN OUT</button>
      </div>

      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>}

    </div>
  );
}

export default ListHeader;
