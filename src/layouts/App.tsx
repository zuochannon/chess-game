import './App.css'
import NavigationBar from '../components/NavigationBar'
import Mahjong_game from "../assets/Mahjong_game.jpg"

function App() {
  return (
    <main className='h-screen'>
      <NavigationBar />
      <div>
        <img src={Mahjong_game} alt="Mahjong_Home" className='w-full object-cover' />
      </div>
    </main>
  )
}

export default App