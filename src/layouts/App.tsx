import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { RulesAndTutorial } from '../pages/RulesAndTutorial'
import { CreateRoom } from '../pages/CreateRoom'
import { JoinRoom } from '../pages/JoinRoom'
import { Play } from '../pages/Play'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/Signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rulesandtutorial" element={<RulesAndTutorial/>}/>
        <Route path="/createroom" element={<CreateRoom />}/>
        <Route path="/joinroom" element ={<JoinRoom />}/>
        <Route path="/play" element ={<Play />}/>
        <Route path="/login" element = {<Login />}/>
        <Route path="/signup" element = {<SignUp />}/>
      </Routes>
    </Router>
  )
}

export default App