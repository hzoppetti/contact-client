import React, { useState, useEffect } from "react";
import ContactDataService from "../services/ContactService";
import { Link } from "react-router-dom";
import { Table } from "./Table";

const ContactList: React.FC = () => {
    const columns: Array<any> = [
        {accessor: 'name', label: "Name"},
        {accessor: 'email', label: "Email"},
        {accessor: 'phone', label: "Phone"}
    ];
    const [rows, setRows] = useState<any[]>([]);
    const [currentContact, setCurrentContact] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = () => {
        ContactDataService.getUsers()
            .then(res => {
                setRows(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e)
            });
    };

    const refreshList = () => {
        getContacts();
        setCurrentContact(null);
        setCurrentIndex(-1);
    };

    const deleteAllContacts = () => {
        ContactDataService.deleteAllUsers()
            .then(res => {
                console.log(res.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setActiveContact = (contact: any, index: number) => {
        console.log(contact);
        setCurrentContact(contact);
        setCurrentIndex(index);
    }

    return(
        <div className="list row">
            <div className="col-md-8">
                <h4>Contact List</h4>
                <Table rows={rows} columns={columns} currentIndex={currentIndex} setActiveContact={setActiveContact} />
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={deleteAllContacts}>
                    Delete All
                </button>
            </div>
            <div className="col-md-4">
                {currentContact ? (
                    <div>
                        <h4>Contact</h4>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentContact.name}
                        </div>
                        <div>
                            <label>
                                <strong>Email:</strong>
                            </label>{" "}
                            {currentContact.email}
                        </div>
                        <div>
                            <label>
                                <strong>Phone:</strong>
                            </label>{" "}
                            {currentContact.phone}
                        </div>

                        <Link
                            to={"/users/" + currentContact.id}
                            className="badge badge-warning"
                            >
                                <button className="btn btn-success">
                                    Edit
                                </button>
                            </Link>
                    </div>
                ) : (
                    <div>
                        <p>Click on a contact to view or edit</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactList;
