import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import BalloonsCategory from "./BalloonCategory";
import SingleBalloons from "./singleBalloons";
import Layout from "./layout";
import Decoration from "./Decoration";
import ProductDashboard from "./productDashboard";
import DecorationDashboard from "./DecorationDashboard";
import Order from "./Order";
import ContactUs from "./ContactUs";
import Orderdashbord from "./OrdersDashboard";
import Reservations from "./reservationDashboard";
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
