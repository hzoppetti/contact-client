import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AddContact from "./components/AddContact";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";

function App () {
    return(
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a href="/" className="navbar-brand">
              Lynford Contacts
            </a>
            <div className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Contact List
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add-users"} className="nav-link">
                  Add New Contact
                </Link>
              </li>
            </div>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
              <Route path="/" element={<ContactList/>}></Route>
              <Route path="/users" element={<ContactList/>}></Route>
              <Route path="/add-users" element={<AddContact/>}></Route>
              <Route path="/users/:id" element={<Contact/>}></Route>
          </Routes>
        </div>
      </>
    );
  }
export default App;
