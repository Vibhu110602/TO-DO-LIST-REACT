import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import {useEffect,useState} from 'react'
import Auth from './components/Auth'
import { useCookies } from 'react-cookie'

const App=()=>{
  const [tasks,setTasks]=useState(null);
  const [cookies,setCookie,removeCookie] =useCookies(null);
  const mail = cookies.Email;
  const AuthToken = cookies.AuthToken;

  const getData= async () => {
    try {
      const response=await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${mail}`)
      const json=await response.json();
      console.log(json);
      setTasks(json);
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(AuthToken){
      getData();
    }
  }
  ,[]);

  //Sort by date
  const sortedTasks=tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date));

  return (
    <div className='app'>
      {!AuthToken && <Auth />}
      {AuthToken &&
      <>
        <ListHeader listName={'🙋 THINGS TO DO'} getData={getData}/>
        <p className='user'>Welcome back  {mail}</p>
        {sortedTasks?.map( (task) => <ListItem key={task.id} getData={getData} task={task}/>)}
      </> 
      }
      <p className='copy'>©️ Vaibhav Chachra 102056019</p>
    </div>
  );
}

export default App;
