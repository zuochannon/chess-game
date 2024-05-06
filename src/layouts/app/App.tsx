import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { CreateRoom } from "../../pages/CreateRoom";
import Home from "../../pages/Home";
import { JoinRoom } from "../../pages/JoinRoom";
import { Login } from "../../pages/Login";
import { Play } from "../../pages/Play";
import { Profile } from "../../pages/Profile";
import { RulesAndTutorial } from "../../pages/RulesAndTutorial";
import { SignUp } from "../../pages/SignUp";
import "./App.css";
import MainLayout from "../main/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/rulesandtutorial" element={<RulesAndTutorial />} />
          <Route path="/createroom" element={<CreateRoom />} />
          <Route path="/joinroom" element={<JoinRoom />} />
          <Route path="/play" element={<Play />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
