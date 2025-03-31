import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import GameDetails from './pages/GameDetails';
import PlayerStats from './pages/PlayerStats';
import TeamStats from './pages/TeamStats';
import NotFound from './pages/NotFound.jsx';


function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark'>
        <Routes>
          <Route path= '/' element= {<Dashboard/>}/>
          <Route path= '/game/:gameId' element= {<GameDetails/>}/>
          <Route path= '/player/:playerId' element= {<PlayerStats/>}/>
          <Route path= '/team/:teamId' element= {<TeamStats/>}/>
          <Route path= '*' element= {<NotFound/>}/>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
