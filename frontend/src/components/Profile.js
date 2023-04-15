import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchProfile, updateProfile, uploadImageToCloud, getCountries } from '../utils';
import { selectIsLoggedIn, selectUser, selectCountries } from '../selectors/appSelector';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfileData } from '../selectors/profileSelector';
import { FaPencilAlt, FaSave } from 'react-icons/fa';
import { setToast } from '../actions/app-actions';
import { Form, Button, Row, Col, Image, FormGroup } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

export default function Profile() {
	const dispatch = useDispatch();
    const userObj = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userProfile = useSelector(selectProfileData);
    const countries = useSelector(selectCountries);
    const [editMode, setEditMode] = useState(false);
    const [userProfileForm, setUserProfileForm] = useState(userProfile);
    const [userImage, setUserImage] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			// console.log('profile - ', userObj);
        	fetchProfile(dispatch, userObj);
		}
    }, [isLoggedIn]);

    useEffect(() => {
    	if (userProfile) {
    		setUserProfileForm(userProfile);
    	}
    }, [userProfile]);

	const isUserFarmer = () => {
        return userObj.role === 'farmer';
    }

    const onUserProfileChange = (e) => {
    	const fieldName = e.target.getAttribute('id');
        const tempForm = {...userProfileForm};
        tempForm[fieldName] = e.target.value;
        setUserProfileForm(tempForm);
    };

    const reset = () => {
    	setUserProfileForm(userProfile);
    };
	const farmLand = () => {
    	console.log('Farmland profile');
		navigate('/FarmLand');
    };

    const getCountryName = (code) => {
    	if (!countries || !countries.length) {
    		return code;
    	}
    	const filteredCountryArr = countries.filter(cntry => cntry.code === code);
    	return filteredCountryArr && filteredCountryArr.length && filteredCountryArr[0].name;
    }

    const uploadImage = async (e) => {
		e.preventDefault();
		const res = await uploadImageToCloud(e.target.files[0]);
		  // console.log(res.data.secure_url);
		const {data: {secure_url}} = res;
		if (secure_url) {
			dispatch(setToast({
				type: 'success',
                message: 'User image uploaded successfully!'
			}));
			setUserImage(secure_url);
		}
		const tempForm = {...userProfileForm};
		tempForm.imageurl = secure_url;
		setUserProfileForm(tempForm);
    }
    const submitProfile = () => {
    	// console.log('userProfileForm -> ' , userProfileForm);
    	// const {id: userID} = userProfile;
		updateProfile(dispatch, userProfileForm, (err, successFlag) => {
			if (successFlag) {
				setEditMode(false);
			}
		});
    };

	return (
        <div className="container pull-down fill-page">
			<h5>{userProfile.name ? userProfile.name : 'User'}'s profile {!editMode ? 
				<FaPencilAlt className="edit_icon" size="1em" onClick={() => setEditMode(!editMode) } /> :
				<FaSave className="edit_icon" size="1em" onClick={() => submitProfile() } />}
			</h5>
			
			{
		isUserFarmer() ? <Button variant="primary" className='dc-default btn btn-primary m20'
		style={{float:"right",margin:"20px",}} onClick={() => farmLand()}>
					Farmland
				</Button> : ''
	}
								
		
			<div className="user_details">
				<Row>
					<Col xs="3">
						<Image src={userProfileForm.imageurl} roundedCircle={true} style={{objectFit: 'cover', width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto', display: 'block'}} />
					</Col>
					<Col>
						<Form.Group className="UserDetails">
							{editMode ?
								<>
								<Form.Label className="form_label" htmlFor="image">User Image</Form.Label>
								<Form.Control
									type="file"
									id="image"
									aria-describedby="image"
									onChange={uploadImage}
								/>
								</> : ''}
						</Form.Group>
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="name">Name</Form.Label>
							{!editMode ? <p>{userProfileForm.name}</p> : 
								<Form.Control
									type="text"
									id="name"
									aria-describedby="name"
									value={userProfileForm.name}
									onChange={onUserProfileChange}
								/>
							}
						</Form.Group>
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="phone">Phone</Form.Label>
							{!editMode ? <p>{userProfileForm.phone}</p> : 
								<Form.Control
									type="text"
									id="phone"
									aria-describedby="phone"
									value={userProfileForm.phone}
									onChange={onUserProfileChange}
								/>
							}
						</Form.Group>
									
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="address">Address Line 1</Form.Label>
							{!editMode ? <p>{userProfileForm.address}</p> : 
								<Form.Control
									type="text"
									id="address"
									aria-describedby="address"
									value={userProfileForm.address}
									onChange={onUserProfileChange}
								/>
							}
						</Form.Group>					
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="name">City</Form.Label>
							{!editMode ? <p>{userProfileForm.city}</p> : 
								<Form.Control
									type="text"
									id="city"
									aria-describedby="city"
									value={userProfileForm.city}
									onChange={onUserProfileChange}
								/>
							}
						</Form.Group>	
										
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="state">State</Form.Label>
							{!editMode ? <p>{userProfileForm.state}</p> : 
								<Form.Control
									type="text"
									id="state"
									aria-describedby="state"
									value={userProfileForm.state}
									onChange={onUserProfileChange}
								/>
							}
						</Form.Group>
						<Form.Group className="UserDetails">
							<Form.Label htmlFor="country" className="form_label">Country</Form.Label>
							{!editMode ? <p>{getCountryName(userProfileForm.country)}</p> : 
								<Form.Select className="form_label" id="country" value={userProfileForm.country} onChange={onUserProfileChange}>
								<option>Choose</option>
								<option value="India">India</option>
								<option value="United States">United States</option>
								<option value="United Kingdom">United Kingdom</option>
								<option value="South Africa">South Africa</option>
								{countries && countries.map(country => <option value={country.code}>{country.name}</option>)}
								</Form.Select>
							}
						</Form.Group>
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="email">Email</Form.Label>
							{!editMode ? <p>{userProfileForm.email}</p> : 
								<Form.Control
									type="text"
									id="email"
									aria-describedby="email"
									value={userProfileForm.email}
									onChange={onUserProfileChange}
								/>
							}
						</Form.Group>
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="driverlicense">Driving license ID</Form.Label>
							{!editMode ? <p>{userProfileForm.driverlicense}</p> : 
								<Form.Control
									type="driverlicense"
									id="driverlicense"
									aria-describedby="driverlicense"
									value={userProfileForm.driverlicense}
									onChange={onUserProfileChange}
								/>
							}
						</Form.Group>
						<Form.Group className="UserDetails">
						{editMode ? <div className="btn_panel">
							<Button variant="secondary" onClick={() => reset()}>
								Reset
							</Button>
							<Button variant="primary" onClick={() => submitProfile()}>
								Save Changes
							</Button>
						</div> : ''}
						</Form.Group>
					
					</Col>
				</Row>
			</div>
        </div>
	);
}