import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./User/Home";
import Login from "./User/Login";
import Register from "./User/Register";
import BalloonsCategory from "./User/BalloonCategory";
import SingleBalloons from "./User/singleBalloons";
import Layout from "./layout";
import Decoration from "./User/Decoration";
import ProductDashboard from "./Dashboard/productDashboard";
import DecorationDashboard from "./Dashboard/DecorationDashboard";
import Order from "./User/Order";
import ContactUs from "./User/ContactUs";
import Orderdashbord from "./Dashboard/OrdersDashboard.jsx";
import Reservations from "./Dashboard/reservationDashboard";
import LayoutDash from "./layoutDash";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Balloons" element={<BalloonsCategory />} />
          <Route
            path="/singleproduct/:productId"
            element={<SingleBalloons />}
          />
          
          <Route path="/decoration" element={<Decoration />} />
          
          <Route path="/order" element={<Order />} />
          <Route path="/contactUs" element={<ContactUs />} />
          
        </Route>
      </Routes>

      <Routes>
        <Route  element={<LayoutDash />}>
          <Route path="/productDashboard" element={<ProductDashboard />} />
          <Route path="/decorationDashboard"element={<DecorationDashboard />}/>
          <Route path="/OrderDashboard" element={<Orderdashbord />} />
          <Route path="/reservationDashboard" element={<Reservations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
