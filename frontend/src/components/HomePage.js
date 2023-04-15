import React from 'react';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/LandingPageHome.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import {Button} from 'react-bootstrap';

function HomePage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);

    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }
    
    return(
        <div className="landing-page">
          <div className="container dc-default">
          <div className="video-background">
              <div className="video-foreground">
                <iframe src="https://player.vimeo.com/video/724732130?background=1" frameBorder="0"></iframe>
              </div>
            </div>
            <div className="info">
              <h1>Drone Cloud for your agriculture!</h1>
              <p>Precision Agriculture Throughout the Year</p>
              <div className="home_btns" style={{marginTop: '30px'}}>
              <Button variant="primary" onClick={() => login()}>
                Login
              </Button> 
              <Button variant="primary" style={{marginLeft: '12px'}} onClick={() => register()}>
                Register
              </Button> 
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
    )
}

export default HomePage;