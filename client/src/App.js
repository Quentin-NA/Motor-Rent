import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Rent from './components/Rent';
import {Routes, Route} from "react-router-dom";
import Showmoto from './components/Showmoto';
import Account from './components/Account';
import ShowReservation from './components/ShowReservation';
import Cart from './components/Cart';
import Register from './components/Admin/Register';
import Login from './components/Admin/Login';



function App() {
  

  return (
    <>
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/account/:id' element={<Account/>} />
          <Route path='/' className="home-container" element={<Home />} />
          <Route path='/rent/:id' element={<Rent />} />
          <Route path='/moto/:id' element={<Showmoto />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/reservation/:id' element={<ShowReservation />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
