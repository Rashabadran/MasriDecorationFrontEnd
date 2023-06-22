import React from 'react'
import Navbar from './Dashboard/NavBarDashboard'
import Footer from './Dashboard/footerDashboard';
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