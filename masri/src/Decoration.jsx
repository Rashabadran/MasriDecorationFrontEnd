import React, { useEffect,useState } from 'react';
import Image1 from './images/a1.png';
import Image2 from './images/a11.jpg';
import Image3 from './images/a11.jpg';
import Image4 from './images/a11.jpg';
import Image5 from './images/a11.jpg';
import './Decoration.css'
import axios from 'axios';
import swal from 'sweetalert';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Gallery } from "react-grid-gallery";

const Decoration = () => {

const [threeimages, setthreeimages] = useState([]);
  const [getimages,setImagess]=useState([])
  const [allImages,setAllImages]=useState([])
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [phone_number, setPhone_nb] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [tools, setTools] = useState([]);

  const [date, setDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addReservation = async () => {
    const reservationData = {
      name: name,
      phone_number: phone_number,
      email: email,
      date: date,
      address: address,
      message: message,
      tools: tools,
    };

    try {
      const response = await axios.post(
        "https://masrishop.onrender.com/reservation/",
        reservationData
       
      );
         
      if (response.status === 200 || response.status === 201) {
        swal({
          title: "Reservation added successfully!",
          icon: "success",
        });
        setName("");
        setEmail("");
        setPhone_nb("");
        setAddress("");
        setDate(new Date());
        setMessage("");
        setTools([]);
      }
    } catch (error) {
      console.error(error);
      swal({
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
     
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addReservation();
  };

  const openFormPopup = () => {
    setShowForm(true);
  };

  const closeFormPopup = () => {
    setShowForm(false);
  };

  const handleToolChange = (value) => {
    if (tools.includes(value)) {
      setTools(tools.filter((tool) => tool !== value));
    } else {
      setTools([...tools, value]);
    }
  };

const getallitems = async () => {
    try {
      const response = await axios.get(
        "https://masrishop.onrender.com/decorationCat/"
      );
     setAllImages(response.data)
      setImagess(response.data.map((item) => item.image));
      
    } catch (error) {
      console.error(error);
    }
    
  }
  useEffect(() => {
    getallitems();
  }, []);

  return (
    <div>
      <div className="photo-grid">
        
        <div>
          <div className="gallery">
          
            <button
              type="submit"
              className="daily-button addDecoration"
              onClick={openFormPopup}
            >
              Reserve Now
            </button>
            {allImages.map((photo, index) => (
              <div key={index} className="gallery-item2">
                <img src={getimages[index].url} alt={photo.alt} />
              </div>
            ))}
          </div>
        </div>

        {showForm && (
          <div className="res-popupRes">
            <div className="res-popup-contentRes">
              <form className="res-form1">
                <div>
                  <label htmlFor="name" className="res-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="res-input"
                  />
                </div>
                <div>
                  <label htmlFor="phone_numberb" className="res-label">
                    Phone Number (xxxxxxxx):
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    value={phone_number}
                    onChange={(e) => setPhone_nb(e.target.value)}
                    className="res-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="res-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="res-input"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="res-label">
                    Date:
                  </label>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="yyyy-MM-dd"
                    id="date"
                    name="date"
                    className="res-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="res-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="res-input-address"
                    required
                  />
                </div>
                <br />

                <div className="tools">
                  <label className="res-label-tool">Reserve to:</label>

                  <div className="tools-check">
                    <div>
                      <label htmlFor="tool1">
                        <input
                          type="checkbox"
                          id="tool1"
                          name="tool1"
                          value="Birthday Party"
                          checked={tools.includes("Birthday Party")}
                          onChange={(e) => handleToolChange(e.target.value)}
                        />
                        &nbsp; Birthday Party
                      </label>
                    </div>
                    <div>
                      <label htmlFor="tool2">
                        <input
                          type="checkbox"
                          id="tool2"
                          name="tool2"
                          value="Wedding  Party "
                          checked={tools.includes("Wedding party ")}
                          onChange={(e) => handleToolChange(e.target.value)}
                        />
                        &nbsp; Wedding Party
                      </label>
                    </div>
                    <div>
                      <label htmlFor="tool3">
                        <input
                          type="checkbox"
                          id="tool3"
                          name="tool3"
                          value="Graduation Ceremonies"
                          checked={tools.includes("Graduation Ceremonies")}
                          onChange={(e) => handleToolChange(e.target.value)}
                        />
                        &nbsp; Graduation Ceremonies
                      </label>
                    </div>
                    <div>
                      <label htmlFor="tool4">
                        <input
                          type="checkbox"
                          id="tool4"
                          name="tool4"
                          value="Anniversaries"
                          checked={tools.includes("Anniversaries")}
                          onChange={(e) => handleToolChange(e.target.value)}
                        />
                        &nbsp; Anniversaries
                      </label>
                    </div>
                    <div>
                      <label htmlFor="tool7">
                        <input
                          type="checkbox"
                          id="tool6"
                          name="tool6"
                          value=" Bride Showers"
                          checked={tools.includes(" Bride Showers")}
                          onChange={(e) => handleToolChange(e.target.value)}
                        />
                        &nbsp; Bride Showers
                      </label>
                    </div>
                    <div>
                      <label htmlFor="tool5">
                        <input
                          type="checkbox"
                          id="tool5"
                          name="tool5"
                          value="Proposal"
                          checked={tools.includes("Proposal")}
                          onChange={(e) => handleToolChange(e.target.value)}
                        />
                        &nbsp; Proposal
                      </label>
                    </div>
                    <div>
                      <label htmlFor="tool6">
                        <input
                          type="checkbox"
                          id="tool6"
                          name="tool6"
                          value=" Baby Showers"
                          checked={tools.includes(" Baby Showers")}
                          onChange={(e) => handleToolChange(e.target.value)}
                        />
                        &nbsp; Baby Showers
                      </label>
                    </div>
                  </div>
                </div>
                <br></br>

                <div>
                  <label htmlFor="message" className="details">
                    Additional Info: <br></br>
                  </label>
                  <br></br>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className=" res-input-details"
                  ></textarea>
                </div>

                <br></br>
              </form>
              <button
                type="submit"
                className=" daily-button res-submit-btn"
                onClick={submitHandler}
              >
                Submit
              </button>
              <button
                className="daily-button res-close-btn"
                onClick={closeFormPopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Decoration;
 