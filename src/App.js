import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import Quiz from "./components/Quiz";

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<StartPage />} ></Route>
      <Route path='/quiz' element={<Quiz /> } ></Route>
      </Routes>
    </Router>
  );
}

export default App;
