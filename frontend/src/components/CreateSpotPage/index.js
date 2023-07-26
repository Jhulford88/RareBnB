import React, { useState, useEffect } from "react";
import "./CreateSpotPage.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSpot } from "../../store/spotsReducer";
// import { createSpotImage } from '../../store/spotsReducer';

function CreateSpotPage() {
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errors, setErrors] = useState({});
  const [type, setType] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const form = {
    country,
    address,
    city,
    state,
    description,
    name,
    price,
    type,
  };

  //conditionally add all photos to an array
  const imageArr = [];
  if (previewImage) imageArr.push({ url: previewImage, preview: true });
  if (image1) imageArr.push({ url: image1, preview: false });
  if (image2) imageArr.push({ url: image2, preview: false });
  if (image3) imageArr.push({ url: image3, preview: false });
  if (image4) imageArr.push({ url: image4, preview: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (type.length < 1)
      newErrors["type"] = "Please select a type for your spot";
    if (country.length < 1) newErrors["country"] = "Country is required";
    if (address.length < 1) newErrors["address"] = "Address is required";
    if (city.length < 1) newErrors["city"] = "City is required";
    if (state.length < 1) newErrors["state"] = "State is required";
    if (description.length < 30)
      newErrors["description"] = "Description needs a minimum of 30 characters";
    if (name.length < 1) newErrors["name"] = "Name is required";
    if (price.length < 1) newErrors["price"] = "Price is required";
    if (previewImage.length < 1)
      newErrors["previewImage"] = "Preview image is required";
    if (
      !previewImage.includes(".png") &&
      !previewImage.includes(".jpg") &&
      !previewImage.includes(".jpeg")
    )
      newErrors["previewImage"] = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      image1 &&
      !image1.includes(".png") &&
      !image1.includes(".jpg") &&
      !image1.includes(".jpeg")
    )
      newErrors["image1"] = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      image2 &&
      !image2.includes(".png") &&
      !image2.includes(".jpg") &&
      !image2.includes(".jpeg")
    )
      newErrors["image2"] = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      image3 &&
      !image3.includes(".png") &&
      !image3.includes(".jpg") &&
      !image3.includes(".jpeg")
    )
      newErrors["image3"] = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      image4 &&
      !image4.includes(".png") &&
      !image4.includes(".jpg") &&
      !image4.includes(".jpeg")
    )
      newErrors["image4"] = "Image URL must end in .png, .jpg, or .jpeg";

    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      const newSpot = await dispatch(createSpot(form, imageArr, sessionUser));

      setType("");
      setCountry("");
      setAddress("");
      setCity("");
      setState("");
      setDescription("");
      setName("");
      setPrice("");
      setPreviewImage("");
      setImage1("");
      setImage2("");
      setImage3("");
      setImage4("");

      history.push(`/spots/${newSpot.id}`);
    }
  };

  //Handles setting state for radio buttons
  const handleChange = (event) => {
    setType(event.target.value);
  };
  // console.log("this is the type..........", type);

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-section-1">
          <h2>Create a new Spot</h2>
          <h3>Where's your place located?</h3>
          <p>
            Guests will only get your exact address once they booked a
            reservation
          </p>
          <label>
            Country <span className="errors">{errors.country}</span>
            <input
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <label>
            Street Address <span className="errors">{errors.address}</span>
            <input
              type="text"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            City <span className="errors">{errors.city}</span>
            <input
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            State <span className="errors">{errors.state}</span>
            <input
              type="text"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
        <div className="form-section-2">
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            value={description}
            placeholder="Please type at least 30 characters"
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="errors">{errors.description}</span>

          <div className="radio-button-section">
            <h3>Please select one which best describes your place</h3>

            <div className="radio-input">
              <label for="house">
                House
                <input
                  type="radio"
                  id="house"
                  name="poperty-type"
                  value="house"
                  checked={type === "house"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="apartment">
                Apartment
                <input
                  type="radio"
                  id="apartment"
                  name="poperty-type"
                  value="house"
                  checked={type === "apartment"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="barn">
                Barn
                <input
                  type="radio"
                  id="barn"
                  name="poperty-type"
                  value="barn"
                  checked={type === "barn"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="boat">
                Boat
                <input
                  type="radio"
                  id="boat"
                  name="poperty-type"
                  value="boat"
                  checked={type === "boat"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="earthship">
                Earthship
                <input
                  type="radio"
                  id="earthship"
                  name="poperty-type"
                  value="earthship"
                  checked={type === "earthship"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="tinyhouse">
                Tiny House
                <input
                  type="radio"
                  id="tinyhouse"
                  name="poperty-type"
                  value="tinyhouse"
                  checked={type === "tinyhouse"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="treehouse">
                Treehouse
                <input
                  type="radio"
                  id="treehouse"
                  name="poperty-type"
                  value="treehouse"
                  checked={type === "treehouse"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="cabin">
                Cabin
                <input
                  type="radio"
                  id="cabin"
                  name="poperty-type"
                  value="cabin"
                  checked={type === "cabin"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="a-frame">
                A-Frame
                <input
                  type="radio"
                  id="a-frame"
                  name="poperty-type"
                  value="a-frame"
                  checked={type === "a-frame"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="container">
                Container
                <input
                  type="radio"
                  id="container"
                  name="poperty-type"
                  value="container"
                  checked={type === "container"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="dome">
                Dome
                <input
                  type="radio"
                  id="dome"
                  name="poperty-type"
                  value="dome"
                  checked={type === "dome"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="yurt">
                Yurt
                <input
                  type="radio"
                  id="yurt"
                  name="poperty-type"
                  value="yurt"
                  checked={type === "yurt"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="radio-input">
              <label for="other">
                Other
                <input
                  type="radio"
                  id="other"
                  name="poperty-type"
                  value="other"
                  checked={type === "other"}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <span className="errors">{errors.type}</span>
        </div>
        <div className="form-section-3">
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special
          </p>
          <input
            type="text"
            value={name}
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
          />
          <span className="errors">{errors.name}</span>
        </div>
        <div>
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results
          </p>
          $
          <input
            type="number"
            value={price}
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
          />
          <span className="errors">{errors.price}</span>
        </div>
        <div className="form-section-4">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input
            type="text"
            value={previewImage}
            placeholder="Preview image url"
            onChange={(e) => setPreviewImage(e.target.value)}
          />
          <span className="errors">{errors.previewImage}</span>
          <input
            type="text"
            value={image1}
            placeholder="Image url"
            onChange={(e) => setImage1(e.target.value)}
          />
          <span className="errors">{errors.image1}</span>
          <input
            type="text"
            value={image2}
            placeholder="Image url"
            onChange={(e) => setImage2(e.target.value)}
          />
          <span className="errors">{errors.image2}</span>
          <input
            type="text"
            value={image3}
            placeholder="Image url"
            onChange={(e) => setImage3(e.target.value)}
          />
          <span className="errors">{errors.image3}</span>
          <input
            type="text"
            value={image4}
            placeholder="Image url"
            onChange={(e) => setImage4(e.target.value)}
          />
          <span className="errors">{errors.image4}</span>
        </div>
        <div className="create-spot-submit-button-container">
          <button
            className="create-spot-submit-button"
            type="submit" /*disabled={isDisabled}*/
          >
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSpotPage;
