import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Login from './components/Login';
import Table from './components/Table';

// PRIME REACT 

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
//core
import "primereact/resources/primereact.min.css"; 
//icons
import "primeicons/primeicons.css";        

function App() {
  return (
    <>
    <Router>

      
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/table' element={<Table/>}></Route>
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
