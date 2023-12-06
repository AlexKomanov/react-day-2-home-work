import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import { AnimalList } from './pages/animalsList/AnimalList'
import Home from './pages/home/Home'
import SeasonClock from './pages/seasonClock/SeasonClock'
import Countdown from './pages/countdown/Countdown'
import Watcher from './pages/watchers/Watcher'



function App() {


  const animalInfos = [
    { type: 'Malayan Tiger', count: 787 }, { type: 'Mountain Gorilla', count: 212 }, { type: 'Fin Whale', count: 28 },
  ]

  const handleCountdownDone = () => {
    console.log('Done!');
  
    // Play audio file here using native Audio element
    const audio = new Audio('pages/countdown/sample-3s.mp3'); // replace with the path to your audio file
    audio.volume = 0.5; // adjust volume as needed
    audio.play();
  };
  
  return (
    <BrowserRouter>
    <header>
      <nav>
        <h1>React Home Work</h1>
        <NavLink to={'/react-day-2-home-work/'}>Home</NavLink>
        <NavLink to={'/react-day-2-home-work/animals-list'}>Animals List</NavLink>
        <NavLink to={'/react-day-2-home-work/season-clock'}>Season Clock</NavLink>
        <NavLink to={'/react-day-2-home-work/countdown'}>Countdown</NavLink>
        <NavLink to={'/react-day-2-home-work/watchers'}>Watchers</NavLink>
      </nav>
    </header>
      <main>
        <Routes>
          <Route path='/react-day-2-home-work'index element={<Home/>} />
          <Route path="/react-day-2-home-work/animals-list" element={<AnimalList animalsInfos={animalInfos}/>} />
          <Route path="/react-day-2-home-work/season-clock" element={<SeasonClock/>} />
          <Route path="/react-day-2-home-work/countdown" element={<Countdown startFrom={10} onDone={true} toTime={30}/>} />
          <Route path="/react-day-2-home-work/watchers" element={<Watcher/>} />

        </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App
