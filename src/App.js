import { BrowserRouter, Routes ,Route} from "react-router-dom";
// import AppLogo from "./Components/AppLogo";
import Welcome from "./Components/Welcome";
import {Login} from "./pages/login/Login";
import Register from "./pages/login/Register";
import Homepage from "./pages/Homepage";
import Chatbox from "./pages/Chatbox";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<AppLogo/>}/> */}
      <Route path="/" element={<Welcome/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Homepage/>}/>
      <Route path='/chat/:user' element={<Chatbox/>}/>
    </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
