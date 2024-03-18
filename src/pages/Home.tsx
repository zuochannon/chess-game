import { NavigationBar } from '../components/NavigationBar'
import Mahjong_game from "../assets/Mahjong_game.jpg"

export function Home() {
  return (
    <main className='h-screen bg-black'>
      <NavigationBar />
      <div>
        <img src={Mahjong_game} alt="Mahjong_Home" className='w-full object-cover' />
      </div>
      <footer className='text-center bg-black'>
        A CS160 Project
      </footer>
    </main>
  )
}
