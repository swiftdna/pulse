import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { emailValidation, register } from '../utils';
import { setAlert } from '../actions/app-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../CSS/landing.css"
import { incompleteFields } from '../utils';

export default function Register() {

	const re = /^\S+@\S+\.\S+$/;

	const [regForm, setRegForm] = useState({
		email: '',
		password: '',
		username: ''
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onInputChange = (e) => {
		const tmpForm = {...regForm};
		const name = e.target.getAttribute('id');
		tmpForm[name] = e.target.value;
		setRegForm(tmpForm);
	}

	const submitRegister = () => {
		console.log('regForm => ', regForm);
		if (!regForm.email || !regForm.password || !regForm.username) {
            incompleteFields(dispatch)
            return;
        }
		if (!regForm.email.match(re)) {
			// console.log('regex null');
            emailValidation(dispatch)
            return;
        }
		register(dispatch, regForm, (err, successFlag) => {
			if (successFlag) {
				dispatch(setAlert({
					type: 'success',
					message: 'Registration successful. Please login now'
				}));
				navigate('/login');
			}
		});
	};

	const reset = () => {
		setRegForm({
			email: '',
			password: '',
			username: ''
		});
	}

	const login = () => {
        navigate('/login');
    }

	return (
		<div className="container dc-default">
			<div className="video-background">
              <div className="video-foreground">
                <iframe src="https://player.vimeo.com/video/724732130?background=1" frameborder="0"></iframe>
              </div>
            </div>
			<div className="login-form dc-login">
				<div className="main-div">
					<h3><span class="register">DroneCloud</span> | Registration Form</h3>
					<br></br>
					<Form>
						<Form.Group className="mb-3" controlId="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								value={regForm.username}
								onChange={onInputChange}
								aria-describedby="username"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="email">
							<Form.Label>email</Form.Label>
							<Form.Control
								type="text"
								value={regForm.email}
								onChange={onInputChange}
								aria-describedby="email"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								value={regForm.password}
								onChange={onInputChange}
								aria-describedby="password"
							/>
						</Form.Group>
					</Form>
					<br></br>
					<div className="login-panel">
						<button onClick={() => submitRegister()} className="btn_panel">Submit</button>
						&nbsp;&nbsp;&nbsp;
						<button onClick={() => reset()} className="btn_panel btn-secondary">Reset</button>
					</div>
					<div className='login-panel'>
						<br></br>  
						{/* <span class="registerspan">Already a member?</span>        
						<button type='button' onClick={() => login()} className='registerbtn'>
							<h5>Login</h5>
						</button> */}
                    </div>
				</div>
			</div>
		</div>
	)
}