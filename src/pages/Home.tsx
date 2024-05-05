import chess from "../assets/chess.jpg"
import { NavigationBar } from '../components/NavigationBar'

const Home = () => {
  return (
    <main className='h-screen bg-black'>
      <NavigationBar />
      <div>
        <img src={chess} alt="Chess_Home" className='w-full object-cover' />
      </div>
      <footer className='text-center bg-black'>
        <p>
          A CS160 Project
        </p>
        <p>
          "
          <a href="https://opengameart.org/content/chess-pieces-and-board-squares">
            JohnPablok's improved Cburnett chess set
          </a>
          " by JohnPablok is licensed under CC-BY-SA 3.0.
        </p>
      </footer>
    </main>
  )
}

export default Home
