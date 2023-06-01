import "./OrderDashboard.css";


import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import del from './images/trash2.png';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orderdashbord() {
  // useEffect(() => {
  //   console.clear();
  // }, []);

  const [data, setData] = useState([]);
  const [cartStuff, setCartStuff] = useState([]);
  const [imagee,setImage]=useState([])
  const getcategories = async () => {
    try {
      const response = await axios.get("https://masrishop.onrender.com/orders");
      setData(response.data);
      
      setImage(response.data.map((item) => item.cart[item._id].image[0]));
      
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getcategories();
    
  }, []);
  
  
  const handleProductClick = async (id) => {
    
    const response = await axios.delete(
      `https://masrishop.onrender.com/orders/${id}`
    );
    
    toast.success("Deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,

      onClose: () => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
    });
  };





  const navigate = useNavigate();

  function checkUserRole() {
    const userRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    // Get the user's role from session storage
    if (!token || userRole === "user") {
      // User has the 'user' role, so navigate to the desired page

      navigate("/Login", { replace: true });
    }
  }

  return (
    <>
      <div className="navbar-container">
        <ToastContainer />
        {checkUserRole()}
        <p className="Ordersdash-page">Orders</p>

        <div className="ordersdash-div">
          <div className="orderdash-style">
            {data.map((item) => (
              <div className="orderdash-det" key={item._id}>
                <div className="orderdash-writing">
                  <div className="orderdash-title desOrder">
                    <h2>Order: {item._id}</h2>
                  </div>
                  <div className="cartit">
                    <h3>Cart:</h3>
                    <ul>
                      {item.cart.map((cartItem) => (
                        <li key={cartItem._id}>
                        {console.log(cartItem)}
                          <p>Title: {cartItem.productID.title}</p>
                          <p>Color: {cartItem.color}</p>
                          <p>Quantity: {cartItem.quantity}</p>
                          
                            <p className="imgOrder">Image:</p>
                            <img className="sizeIm" src={cartItem.productID.image[0]?.url} />
                          
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="desOrderdash">
                    Payment type: {item.payment_type}
                  </p>
                  <p className="desOrderdash">
                    Total price: {item.total_price}$
                  </p>
                  <p className="desOrderdash">
                    Phone_number: {item.phone_number}
                  </p>
                  <p className="desOrderdash">Address: {item.address}</p>
                  <p className="desOrderdash">Created at: {item.created_at}</p>
                </div>
                <div className="deldash">
                  <img
                    onClick={() => handleProductClick(item._id)}
                    src={del}
                    alt="trash"
                    className="trashOrder"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orderdashbord;
