import React from 'react'
import Navbar from './NavBarDashboard'
import Footer from './footerDashboard';
import { Outlet, useLocation } from 'react-router';
const LayoutDash = () => {
  let location=useLocation()

  return (
    <>
<section className="mainer">
  <main className="main">
    <Navbar />
    <Outlet/>
   
  </main>
</section>

    </>
   
  )
}

export default LayoutDash