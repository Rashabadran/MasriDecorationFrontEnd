import logo from './logo.svg';
import './App.css';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import BalloonsCategory from './BalloonCategory'
import Layout from './layout';
import singleBalloons from './singleBalloons'
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
       <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>} />
       <Route path="/Balloons" element={<BalloonsCategory/>} />
       <Route path="/singleballoon" element={<singleBalloons/>}/>
       </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
