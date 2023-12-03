import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {StreamChat} from "stream-chat";
import Cookies from "universal-cookie";


function App() {
  const api_key="7ktp6quxgpx4";
  const cookies=new Cookies();
  const token=cookies.get("token");
  const client=StreamChat.getInstance(api_key);

  if(token){
    client.connectUser({
      id:cookies.get("userId"),
      name:cookies.get("username"),
      firstName:cookies.get("fristname"),
      lastName:cookies.get("lastname"),
      hashedPassword:cookies.get("hashedPassword")
    },
    token
    ).then((user)=>{
      console.log(user);
    });
  }

  return (
    <div className="App">
      <SignUp/>
      <Login/>
    </div>
  );
}

export default App;
