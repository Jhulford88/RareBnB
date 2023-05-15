import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleSpot, updateExistingSpot } from '../../store/spotsReducer';

//share css with createSpotPage????


function UpdateSpotPage(){


    const dispatch = useDispatch();
    const {id} = useParams();


    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
        const [country, setCountry] = useState('');
        const [address, setAddress] = useState('');
        const [city, setCity] = useState('');
        const [state, setState] = useState('');
        const [description, setDescription] = useState('');
        const [name, setName] = useState('');
        const [price, setPrice] = useState('');
        const [errors, setErrors] = useState({});
        const form = {country, address, city, state, description, name, price};


        useEffect(() => {
            dispatch(fetchSingleSpot(id))
            .then(data => {
                setCountry(data.country)
                setAddress(data.address)
                setCity(data.city)
                setState(data.state)
                setDescription(data.description)
                setName(data.name)
                setPrice(data.price)
            })
        }, [dispatch, id]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if(country.length < 1) newErrors['country'] = 'Country is required'
        if(address.length < 1) newErrors['address'] = 'Address is required'
        if(city.length < 1) newErrors['city'] = 'City is required'
        if(state.length < 1) newErrors['state'] = 'State is required'
        if(description.length < 30) newErrors['description'] = 'Description needs a minimum of 30 characters'
        if(name.length < 1) newErrors['name'] = 'Name is required'
        if(price.length < 1) newErrors['price'] = 'Price is required'

        setErrors(newErrors);

         if(!Object.keys(newErrors).length) {

             await dispatch(updateExistingSpot(form, sessionUser, id))
            // console.log('newSpot returned on updateSpotPage.....',newSpot)
             history.push(`/spots/${id}`);
         };

    };


  return (
    <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
            <div className='form-section-1'>
                <h2>Update your Spot</h2>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation</p>
                <label>
                    Country <span className='errors'>{errors.country}</span>
                    <input
                        type="text"
                        value={country}
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Street Address <span className='errors'>{errors.address}</span>
                    <input
                        type="text"
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    City <span className='errors'>{errors.city}</span>
                    <input
                        type="text"
                        value={city}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    State <span className='errors'>{errors.state}</span>
                    <input
                        type="text"
                        value={state}
                        placeholder="State"
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
            </div>
            <div className='form-section-2'>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    value={description}
                    placeholder="Please type at least 30 characters"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <span className='errors'>{errors.description}</span>
            </div>
            <div className='form-section-3'>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                <input
                    type="text"
                    value={name}
                    placeholder="Name of your spot"
                    onChange={(e) => setName(e.target.value)}
                />
                <span className='errors'>{errors.name}</span>
            </div>
            <div>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                $
                <input
                    type="number"
                    value={price}
                    placeholder="Price per night (USD)"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <span className='errors'>{errors.price}</span>
            </div>
            <button className='create-spot-submit-button' type='submit' >Create Spot</button>
        </form>
    </div>
  );
}

export default UpdateSpotPage;
