import "./App.css";
import { Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Feedback from "./components/Feedback";
import EditPost from "./components/EditPost";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ResetPassword from "./components/ResetPassword";

function App() {

  return (
    <>     
        <Routes>
          <Route path="/"  element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/About" element={<About />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          
        </Routes>
        
    </>
  );
}

export default App;
