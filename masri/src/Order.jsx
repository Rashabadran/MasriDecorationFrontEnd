import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Order.css'
import trash from './images/trash2.png'
function Order() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [quantity, setQuantity] = useState(1);
  const [totallPrice, setTotalPrice] = useState();

  function deleteProductFromLocalStorage(id) {
    const updatedProducts = cartItems.filter((product) => product._id !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
  }
  const [canorder, setcanorder] = useState(true);
  const [address,setAddress]=useState("");
  const [phone_number, setPhonenumber] = useState("");
  const [productImage,setProductImage]=useState("")


  function checkUserRole() {
    const userRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    // Get the user's role from session storage
    if (!token || !userRole) {
      // User has the 'user' role, so navigate to the desired page
localStorage.clear();
      setcanorder(false);
      
      
    } else {
      setcanorder(true);
    }
    


  }


  const totalcalculator = () => {
    // Calculate the total price
    const cartquan = cartItems.map((item) => item.quantity);
    const cartprice = cartItems.map((item) => item.priceAfterDiscount);
    var total = 0;
    const carttwo = [];
    for (let i = 0; i < cartquan.length; i++) {
      const item = {};

      item.quantity = cartquan[i];
      item.price = cartprice[i];
      item.totalprice = cartquan[i] * cartprice[i];
      carttwo.push(item);
      total += item.totalprice;
    }
   
    setTotalPrice(total);
  };

  useEffect(() => {
    checkUserRole();
    totalcalculator();
  }, [cartItems]);

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (canorder) {
     
      const cartitemid = cartItems.map((item) => item._id);
      const cartquan = cartItems.map((item) => item.quantity);
      const carttitle = cartItems.map((item) => item.title);
      const cartcolor = cartItems.map((item) => item.color);
      const cartprice = cartItems.map((item) => item.priceAfterDiscount);
      var total = 0;
      const cart = [];
      for (let i = 0; i < cartquan.length; i++) {
        const item = {};
        item.productID = cartitemid[i];
        item.color = cartcolor[i];
        item.image = productImage;
        item.title = carttitle[i];
        item.quantity = cartquan[i];
        item.price = cartprice[i];
        item.totalprice = cartquan[i] * cartprice[i];
        cart.push(item);
        total += item.totalprice;
      }
      

      const body_data = JSON.stringify({
          cart,
          payment_type: "Cash on Delivery",
          total_price: total,
          phone_number,
          address,

        });
      // event.preventDefault();
      const response = await fetch("http://localhost:3030/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body_data,
      });

      console.log("body_data ", body_data);
      console.log("response ", response.data);
      toast.success("your order is sent ", {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.clear();
    //   delayedRefresh();
    } else {
      toast.error("please sign in to continue this order", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  
  

  const delayedRefresh = () => {
    setTimeout(function () {
      window.location.reload();
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  function clearLocalStorage() {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear();
        window.location.reload();
        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your Order is safe!");
      }
    });
  }
function handleProductClick(id) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteProductFromLocalStorage(id);
        const updatedCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCartItems);

        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your Order is safe!");
      }
    });
  }
    useEffect(() => { }, [totallPrice]);

  return (
    <>
      <ToastContainer />
      <p className="Orders-page">Orders</p>

      <div className="orders-div">
        <div className="order-style">
          {cartItems.map((item) => (
            <div className="order-det" key={item._id}>
              <div className="order-writing">
                <div className="trashhOrder">
                  <img
                    className="delete-icon"
                    onClick={() => handleProductClick(item._id)}
                    src={trash}
                    alt=""
                  />
                </div>
                <img
                  src={item.image}
                  // Access the image URL from local storage
                  alt="Product Image"
                  className="product-image"
                />
                
                <div className="order-title desOrder">
                  <h2>{item.title}</h2>
                </div>
                <p className="desOrder">Color: {item.color}</p>
                <p className="desOrder">Quantity: {item.quantity}</p>
                <div className="orderPrice desOrder">
                  Price:{" "}
                  {item.price == item.priceAfterDiscount ? (
                    <h4 className="childPrice">{item.price}$</h4>
                  ) : (
                    <h4 className="childPrice,desOrder">
                      {item.priceAfterDiscount}
                    </h4>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-total">
          <div>
            <p>Total:</p>
          </div>
          <div>
            <p>{totallPrice} $</p>
          </div>
        </div>
        <div className="order-pay">{/* ... */}</div>
        <button
          className="order-check"
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          Place Order
        </button>
        <button className="orderalldelete" onClick={() => clearLocalStorage()}>
          Delete Order
        </button>
        <form className="res-form">
          <div>
            <label htmlFor="name" className="res-label">
              Name:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="res-input"
            />
          </div>
          <div>
            <label htmlFor="phone_nb" className="res-label">
              Phone Number (xxxxxxxx):
            </label>
            <input
              type="text"
              id="phone_nb"
              name="phone_nb"
              value={phone_number}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="res-input"
              required
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Order;
