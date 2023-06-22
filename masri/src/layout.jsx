import React from 'react'
import Navbar from './User/NavBar'
import Footer from './User/footer';
import { Outlet, useLocation } from 'react-router';
const Layout = () => {
  let location=useLocation()

  return (
    <>
<section className="mainer">
  <main className="main">
    <Navbar />
    <Outlet/>
    {location.pathname === "/login" || location.pathname === "/register" ? null : <Footer/>}
  </main>
</section>

    </>
   
  )
}

export default Layout