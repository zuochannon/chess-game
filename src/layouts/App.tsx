import './App.css'
import NavigationBar from '../components/NavigationBar'
import Mahjong_game from "../assets/Mahjong_game.jpg"
import Hand from '../components/hand/Hand'

function App() {
  return (
      <>
      <Hand />
    <main className='h-screen'>
      <NavigationBar />
      <div>
        <img src={Mahjong_game} alt="Mahjong_Home" className='w-full object-cover' />
      </div>
      <footer className='h-screen text-center bottom-2 bg-black'>
        A CS160 Project
      </footer>
    </main>
      </>
  )
}

export default App