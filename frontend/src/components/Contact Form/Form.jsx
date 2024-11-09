import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import "./Contact.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function ContactForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    phoneno: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    phoneno: "",
  });

  const [success, setSuccess] = useState("");
  const [country, setCountry] = useState("us");

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const countryCode = response.data.country_code.toLowerCase();
        setCountry(countryCode);
        console.log(countryCode);
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setValues({ ...values, phoneno: value });
  };

  const validatePhoneNumber = (phoneNumber, countryCode) => {
    const phoneNumberObj = parsePhoneNumberFromString(
      phoneNumber,
      countryCode.toUpperCase()
    );
    console.log(phoneNumberObj);
    return phoneNumberObj ? phoneNumberObj.isValid() : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number before sending
    if (!validatePhoneNumber(values.phoneno, country)) {
      setErrors({ ...errors, phoneno: "Invalid phone number" });
      setTimeout(() => {
        setErrors({ ...errors, phoneno: "" });
      }, 3000);
      return;
    }

    try {
      const response = await fetch("http://localhost:7000/interior/sendmail/", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Email sent and contact saved successfully");
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
          phoneno: "",
        });
        setErrors({});
        setTimeout(() => {
          setSuccess("");
        }, 3000); // Clear success message after 3 seconds
      } else {
        if (data.errors) {
          setErrors(data.errors);
          setTimeout(() => {
            setErrors({});
          }, 3000); // Clear errors after 3 seconds
        } else {
          setErrors({ general: data.message || "An error occurred" });
          setTimeout(() => {
            setErrors({});
          }, 3000); // Clear errors after 3 seconds
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrors({ general: error.message });
      setTimeout(() => {
        setErrors({});
      }, 3000); // Clear errors after 3 seconds
    }
  };

  return (
    <div id="contact-us">
      <div className="c-container">
        <span className="orangeText">Contact Form</span>
        <br />
        <span className="primaryText">Easy to Contact us</span>
        <br />
        <span className="secondaryText">
          We always ready to help by providing the best services for you. We
          believe a good place to live can make your life better
        </span>
        <br />
        <br />
      </div>
      <div className="main">
        <div className="main-body">
          <form className="main-form" onSubmit={handleSubmit}>
            {success && <div className="success-message">{success}</div>}
            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}
            <div className="form-element">
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <div className="error-message">{errors.firstName}</div>
                )}
              </label>
            </div>
            <div className="form-element">
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <div className="error-message">{errors.lastName}</div>
                )}
              </label>
            </div>
            <div className="form-element">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </label>
            </div>
            <div className="form-element">
              <label>
                Subject:
                <input
                  type="text"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                />
                {errors.subject && (
                  <div className="error-message">{errors.subject}</div>
                )}
              </label>
            </div>
            <div className="form-element">
              <label>
                Message:
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <div className="error-message">{errors.message}</div>
                )}
              </label>
            </div>
            <div className="form-element">
              <label>
                Phone Number:
                <PhoneInput
                  country={country}
                  value={values.phoneno}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "phoneno",
                    required: true,
                    autoFocus: true,
                  }}
                />
                {errors.phoneno && (
                  <div className="error-message">{errors.phoneno}</div>
                )}
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
