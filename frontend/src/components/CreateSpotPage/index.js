import React from 'react';
import "./CreateSpotPage.css"


function CreateSpotPage(){

  return (
    <div className='form-container'>
        <form className='form'>
            <div className='form-section-1'>
                <h2>Create a new Spot</h2>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation</p>
                <label>
                    Country
                    <input
                        type="text"
                        value="Country"
                    />
                </label>
                <label>
                    Street Address
                    <input
                        type="text"
                        value="Address"
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value="City"
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value="STATE"
                    />
                </label>
            </div>
            <div className='form-section-2'>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    value="Please write at least 30 characters"
                />
            </div>
            <div className='form-section-3'>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
            </div>
            <div>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                $
                <input
                    type="number"
                    value="Price per night (USD)"
                />
            </div>
            <div className='form-section-4'>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot</p>
                <input type="url" value="Preview Image URL"/>
                <input type="url" value="Image URL"/>
                <input type="url" value="Image URL"/>
                <input type="url" value="Image URL"/>
                <input type="url" value="Image URL"/>
            </div>
            <button type='submit'>Create Spot</button>
        </form>
    </div>
  );
}

export default CreateSpotPage;
