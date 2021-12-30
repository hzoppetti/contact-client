import React, { useState } from "react";
import ContactDataService from "../services/ContactService";

const AddContact: React.FC = () => {
    const initialContactState = {
        id: null,
        name: "",
        email: "",
        phone: "",
        submitted: false
    };

    const [contact, setContact] = useState<any>(initialContactState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        //const { name, value } = event.target;
        setContact({ ...contact, [e.currentTarget.name]: e.currentTarget.value });
    };

    const saveContact = () => {
        var data = {
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        };

        ContactDataService.createUser(data)
            .then(res => {
                setContact(initialContactState);
                setSubmitted(true);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newContact = () => {
        setContact(initialContactState);
        setSubmitted(false);
    }

    return(
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Contact Added!</h4>
                    <button className="btn btn-success" onClick={newContact}>
                        Add a New Contact
                    </button>
                </div>
            ) : (
                <div>
                    <h4>Add a Contact</h4>
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
                    <br/>
                    <button onClick={saveContact} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddContact;
