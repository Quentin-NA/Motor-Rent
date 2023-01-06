import logo from '../../img/logo.webp'
import '../../CSS/navbar.css'
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    // Switch,
    // Route,
    // Routes,
    Link
} from "react-router-dom";


const Navbar = () => {
    
    const { userId } = useSelector((state) => state);
    const dispatch = useDispatch();

    const deconnection = () =>  {
        dispatch({
            type: "DECONNEXION",
            userId: null
        })
    }


    return (
            <nav>
                {userId == null || userId === undefined ? (
                <>
                    <Link to="/"><img src={logo} alt="logo"/></Link>
                    <div className='search-container'>
                        <input type="text" placeholder="Search.." />
                    </div>
                    <div className='register'>
                        <Link to="/register" className='register-links'>S'inscrire</Link>
                        <Link to="/login" className='register-links'>Se connecter</Link>                        
                    </div> 
                </>
            ) : (
                <>
                    <Link to="/"><img src={logo} alt="logo"/></Link>
                    <Link to={`/rent/${userId}`} className='rent'>Louer ma moto</Link>
                    <div className='search-container'>
                        <input type="text" placeholder="Search.." />
                    </div>
                    <div className='register'>
                        <Link to="/" className='register-links' onClick={deconnection}>Se déconnecter</Link>
                        <Link to={`/account/${userId}`} className='register-links'>Mon compte</Link>
                        <Link to={`/cart/${userId}`} className='register-links'><i className="fa-solid fa-cart-shopping"></i></Link>
                    </div>
                </>)}
            </nav>
    )
}


export default Navbar;