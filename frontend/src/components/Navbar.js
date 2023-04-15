import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectIsLoggedIn } from '../selectors/appSelector';
import { handleLogoutResponse } from '../actions/app-actions';
import { FaList, FaShoppingCart, FaUserAlt, FaHeart, FaStore } from 'react-icons/fa';

//create the Navbar Component
function Navbar() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();


    const getActiveClass = (currPath) => {
        return currPath === location.pathname ? "btn btn-light nav-buttons active" : "btn btn-light nav-buttons";
    }

    const home = () => {
        navigate('/');
    }
     const contact = () => {
        navigate('/contact');
    }

    const profile = () => {
        navigate('/profile');
    }

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }


    const logout = () => {
        axios.post('/logout')
            .then(response => {
                navigate('/');
                dispatch(handleLogoutResponse(response));
            });
    }

    return(
        <nav className="navbar justify-content-between dc-default">
            <div className="container">
                <div className="col-3">
                    <a className="navbar-brand" onClick={() => home()}>Pulse</a>
                </div>
                <div className="col-6 text-center">
                    {
                        isAuthenticated && (
                            <>
                                {/* <FaList className="nav-buttons" title="Purchases" size="3em" onClick={() => purchases()}/> 
                                    <FaUserAlt className="nav-buttons" title="Profile" size="3em" onClick={() => profile()}/> 
                                    <button type="button" className={getActiveClass('/')} title="Home" onClick={() => home()}>Home</button>
                                    <button type="button" className={getActiveClass('/contact')} title="Contact" onClick={() => contact()}>Contact</button>
                                    <button type="button" className={getActiveClass('/profile')} title="Profile" onClick={() => profile()}>Profile</button>*/}
                            </>)
                    }
                </div>
                <div className="col-3 right-contents">
                    {
                        isAuthenticated ? 
                        <button type="button" className="btn btn-light nav-buttons" title="Log out" onClick={() => logout()}>Logout</button> : 
                        ''
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
