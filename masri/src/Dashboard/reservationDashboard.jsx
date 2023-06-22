import React, { useState, useEffect, useCallback, useReducer } from "react";
import axios from "axios";
import "./reservationDashboard.css";
import swal from "sweetalert";
import trash2 from '../images/trash2.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Reservations() {
  const [reservation, setReservation] = useState([]);

  const getreservations = async () => {
    try {
      const response = await axios.get(
        "https://masrishop.onrender.com/reservation"
      );
      setReservation(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getreservations();
  }, []);

  //delete item
  const deleteRes = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this reservation!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Delete",
          value: true,
          className: "btn-danger",
          visible: true,
          closeModal: true,
        },
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`https://masrishop.onrender.com/reservation/${id}`);
        getreservations();
        swal("Poof! The reservation has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The item is safe!");
      }
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
    <div className="tbl-wrper-res">
      <div className="table-res">
      {checkUserRole()}
       <h1 className="titleRes">Reservation</h1>
        <div className="single">
          {Array.isArray(reservation) &&
            reservation.map((res, index) => {
              return (
                <div className="divss" key={index}>
                  <div className="res-name"> Full Name: {res.name} </div>
                  <div className="res-name">
                    Phone Number:
                    <Link
                      to={`https://wa.me/${res.phone_number}`}
                      target="_blank"
                    >
                      {res.phone_number}
                    </Link>
                  </div>

                  <div className="res-name">Email: {res.email} </div>
                  <div className="res-name">Date:{res.date} </div>
                  <div className="res-name">Address {res.address} </div>
                  <div className="res-name">Other Info: {res.message} </div>

                  <div className="tools-list">
                    {res.tools.map((tool, i) => (
                      <div key={i}>Event:{tool}</div>
                    ))}
                  </div>

                  <button
                    alt=""
                    className="button-delete-res"
                    onClick={() => deleteRes(res._id)}
                  >
                    <img className="trashReservation" src={trash2} alt="delete"/>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Reservations;
