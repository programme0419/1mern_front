import React from "react";
import contact from "../assets/about2.jpg";
import { useState } from "react";
const Contact = () => {
  const [msg, setMsg] = useState({
    username: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMsg({ ...msg, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, message } = msg;
    
    // Validate inputs
    if (!username || !email || !message) {
      window.alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          message,
        }),
      });
      if (res.status===201 || res.status===200){
        window.alert("Message Sent Successfully");
        setMsg({ username: "", email: "", message: "" });
      } else{
        window.alert("Message Not Sent");
      }
    } catch (error) {
      window.alert("Message Not Sent"); 
    }
  };
  return (
    <div>
      <section id="contact">
        <div className="container mt-5 p-5">
          <div className="row">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Contact US</h3>
              <h1 className="display-6 text-center mb-4">
                U <b>Have </b> Questions?
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6">
              <img src={contact} alt="contact" className="w-75 mt-5" />
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit} method="POST">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={msg.username}
                    onChange={handleChange}
                    name="username"
                    id="username"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={msg.email}
                    onChange={handleChange}
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    value={msg.message}
                    onChange={handleChange}
                    name="message"
                    id="message"
                    placeholder="Enter your message"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-paper-plane ms-2"></i> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Contact;
