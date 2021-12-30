import React, { useState, useEffect } from "react";
import ContactDataService from "../services/ContactService";
import { useParams, useNavigate } from "react-router-dom";

const Contact: React.FC = () => {
    const params: Readonly<any> = useParams();
    const navigate = useNavigate();

    const initialContactState = {
        id: null,
        name: "",
        email: "",
        phone: "",
        message: ""
    };

    const [contact, setContact] = useState<any>(initialContactState);
    const [message, setMessage] = useState("");

    const getContact = (id: number) => {
        ContactDataService.getUserById(id)
            .then(res => {
                setContact(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getContact(params.id);
    }, [params.id]);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setContact({ ...contact, [e.currentTarget.name]: e.currentTarget.value });
    };

    const updateContact = () => {
        ContactDataService.updateUser(contact.id, contact)
            .then(res => {
                console.log(res.data);
                setMessage("Contact Updated");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteContact = () => {
        ContactDataService.deleteUser(contact.id)
            .then(res => {
                console.log(res.data);
                navigate('/users');
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {contact ? (
                <div className="edit-form">
                    <h4>Contact</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={contact.name}
                                onChange={handleInputChange}
                                name="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={contact.email}
                                onChange={handleInputChange}
                                name="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                required
                                value={contact.phone}
                                onChange={handleInputChange}
                                name="phone"/>
                        </div>
                    </form>
                    <br />
                    <button
                        className="btn btn-danger"
                        onClick={deleteContact}
                        >
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={updateContact}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Click on a Contact</p>
                </div>
            )}
        </div>
    );
}

export default Contact;
