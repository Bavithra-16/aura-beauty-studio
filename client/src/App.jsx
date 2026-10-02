import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import OwnerDashboard from "./OwnerDashboard";
import OwnerLogin from "./OwnerLogin";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const [services, setServices] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/services")

      .then((response) => response.json())

      .then((data) => {

        setServices(data);

      })

      .catch((error) => {

        console.error("Error fetching services:", error);

      });

  }, []);

  const [formData, setFormData] = useState({

    name: "",

    phone: "",

    service: "",

    date: "",

    time: "",

    message: ""

  });

  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({

      ...formData,

      [name]: value

    });

    setErrors({

      ...errors,

      [name]: ""

    });

    setSubmitted(false);

  };

  const handleSubmit = (event) => {

    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {

      newErrors.name = "Please enter your name";

    }

    if (!formData.phone.trim()) {

      newErrors.phone = "Please enter your phone number";

    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone.trim())) {

      newErrors.phone = "Please enter a valid phone number";

    }

    if (!formData.service) {

      newErrors.service = "Please select a service";

    }

    if (!formData.date) {

      newErrors.date = "Please select a date";

    }

    if (!formData.time) {

      newErrors.time = "Please select a time";

    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      fetch("http://localhost:5000/api/appointments", {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(formData)

      })

        .then((response) => response.json())

        .then((data) => {

          console.log("Backend response:", data);

          setSubmitted(true);

          setFormData({

            name: "",

            phone: "",

            service: "",

            date: "",

            time: "",

            message: ""

          });

        })

        .catch((error) => {

          console.error("Error submitting appointment:", error);

        });

    }

  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">

            {/* Navbar */}

            <header className="navbar">

              <a href="#home" className="logo">

                Aura Beauty Studio

              </a>

              <nav className="nav-links">

                <a href="#home">Home</a>

                <a href="#services">Services</a>

                <a href="#about">About</a>

                <a href="#gallery">Gallery</a>

                <a href="#reviews">Reviews</a>

                <a href="#contact">Contact</a>

                <a href="#appointment" className="nav-book">

                  Book Now

                </a>

              </nav>

            </header>

            <main>

              {/* Hero Section */}

              <section className="hero" id="home">

                <div className="hero-overlay"></div>

                <div className="hero-content">

                  <p className="hero-label">

                    BEAUTY • CARE • CONFIDENCE

                  </p>

                  <h1>

                    Your Beauty,

                    <br />

                    Our Passion

                  </h1>

                  <p className="hero-description">

                    Discover professional beauty and personal care services

                    designed to help you look and feel your best.

                  </p>

                  <div className="hero-actions">

                    <a href="#appointment" className="hero-button">

                      Book an Appointment

                    </a>

                    <a href="#services" className="hero-secondary-button">

                      Explore Services

                    </a>

                  </div>

                </div>

              </section>

              {/* Services Section */}

              <section className="services" id="services">

                <div className="section-heading">

                  <p className="section-label">OUR SERVICES</p>

                  <h2>Beauty Services Designed for You</h2>

                  <p>

                    From everyday beauty care to special occasions,

                    our services are designed around your needs.

                  </p>

                </div>

                <div className="service-container">

                  {services.map((service, index) => (

                    <article className="service-card" key={service}>

                      <div className="service-number">

                        {String(index + 1).padStart(2, "0")}

                      </div>

                      <h3>{service}</h3>

                      <p>

                        Professional beauty care designed around

                        your style, needs and preferences.

                      </p>

                      <span>Learn More</span>

                    </article>

                  ))}

                </div>

              </section>

              {/* About Section */}

              <section className="about" id="about">

                <div className="about-content">

                  <div className="about-text">

                    <p className="section-label">ABOUT US</p>

                    <h2>A Calm Space for Your Beauty Routine</h2>

                    <p>

                      Aura Beauty Studio is a welcoming beauty studio

                      focused on professional service and personal care.

                    </p>

                    <p>

                      We believe beauty services should be comfortable,

                      simple and tailored to each customer's preferences.

                    </p>

                    <a href="#appointment" className="about-button">

                      Book Your Visit

                    </a>

                  </div>

                  <div className="about-box">

                    <h3>Why Choose Aura?</h3>

                    <div className="about-feature">

                      <strong>01</strong>

                      <div>

                        <h4>Professional Care</h4>

                        <p>

                          Services delivered with attention to detail.

                        </p>

                      </div>

                    </div>

                    <div className="about-feature">

                      <strong>02</strong>

                      <div>

                        <h4>Comfortable Experience</h4>

                        <p>

                          A relaxed environment where you can feel comfortable.

                        </p>

                      </div>

                    </div>

                    <div className="about-feature">

                      <strong>03</strong>

                      <div>

                        <h4>Personal Attention</h4>

                        <p>

                          We understand that every customer has different needs.

                        </p>

                      </div>

                    </div>

                    <div className="about-feature">

                      <strong>04</strong>

                      <div>

                        <h4>Quality Service</h4>

                        <p>

                          We focus on providing a consistent customer experience.

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </section>

              {/* Gallery Section */}

              <section className="gallery" id="gallery">

                <div className="section-heading">

                  <p className="section-label">OUR GALLERY</p>

                  <h2>A Glimpse of Our Studio</h2>

                  <p>

                    Take a look at our beauty space and the experience

                    we aim to create for every customer.

                  </p>

                </div>

                <div className="gallery-container">

                  <div className="gallery-item">

                    <img

                      src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80"

                      alt="Beauty salon interior"

                    />

                  </div>

                  <div className="gallery-item">

                    <img

                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80"

                      alt="Beauty and hair care"

                    />

                  </div>

                  <div className="gallery-item">

                    <img

                      src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80"

                      alt="Hair styling service"

                    />

                  </div>

                  <div className="gallery-item">

                    <img

                      src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80"

                      alt="Beauty makeup service"

                    />

                  </div>

                  <div className="gallery-item">

                    <img

                      src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80"

                      alt="Manicure service"

                    />

                  </div>

                  <div className="gallery-item">

                    <img

                      src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=80"

                      alt="Beauty studio service"

                    />

                  </div>

                </div>

              </section>

              {/* Reviews Section */}

              <section className="reviews" id="reviews">

                <div className="section-heading">

                  <p className="section-label">CLIENT REVIEWS</p>

                  <h2>What Our Clients Say</h2>

                  <p>

                    A few words from customers who visited Aura Beauty Studio.

                  </p>

                </div>

                <div className="review-container">

                  <article className="review-card">

                    <div className="review-quote">“</div>

                    <p className="review-text">

                      The service was comfortable and professional.

                      I really enjoyed the overall experience.

                    </p>

                    <h3>Priya</h3>

                    <p className="review-service">

                      Hair Styling

                    </p>

                  </article>

                  <article className="review-card">

                    <div className="review-quote">“</div>

                    <p className="review-text">

                      The studio has a lovely atmosphere and the

                      staff were very attentive throughout my visit.

                    </p>

                    <h3>Ananya</h3>

                    <p className="review-service">

                      Facial

                    </p>

                  </article>

                  <article className="review-card">

                    <div className="review-quote">“</div>

                    <p className="review-text">

                      I booked an appointment for a special occasion

                      and was happy with the service and experience.

                    </p>

                    <h3>Meera</h3>

                    <p className="review-service">

                      Bridal Makeup

                    </p>

                  </article>

                </div>

              </section>

              {/* Contact Section */}

              <section className="contact" id="contact">

                <div className="section-heading">

                  <p className="section-label">GET IN TOUCH</p>

                  <h2>Visit Aura Beauty Studio</h2>

                  <p>

                    Have a question or want to schedule a visit?

                    Get in touch with us.

                  </p>

                </div>

                <div className="contact-container">

                  <div className="contact-info">

                    <div className="contact-item">

                      <h3>Address</h3>

                      <p>

                        Chennai, Tamil Nadu

                      </p>

                    </div>

                    <div className="contact-item">

                      <h3>Phone</h3>

                      <p>

                        +91 98765 43210

                      </p>

                    </div>

                    <div className="contact-item">

                      <h3>Opening Hours</h3>

                      <p>

                        Monday – Sunday

                        <br />

                        10:00 AM – 8:00 PM

                      </p>

                    </div>

                  </div>

                  <div className="contact-box">

                    <p className="contact-box-label">

                      READY FOR YOUR NEXT VISIT?

                    </p>

                    <h3>

                      Let us take care of the details.

                    </h3>

                    <p>

                      Choose your preferred service and time.

                      We'll contact you to confirm your appointment.

                    </p>

                    <a href="#appointment" className="contact-button">

                      Book an Appointment

                    </a>

                  </div>

                </div>

              </section>

              {/* Appointment Section */}

              <section className="appointment" id="appointment">

                <div className="appointment-container">

                  <div className="section-heading">

                    <p className="section-label">APPOINTMENT</p>

                    <h2>Book Your Appointment</h2>

                    <p>

                      Fill in your details and preferred appointment time.

                    </p>

                  </div>

                  <form

                    className="appointment-form"

                    onSubmit={handleSubmit}

                    noValidate

                  >

                    <div className="form-group">

                      <label htmlFor="name">

                        Full Name

                      </label>

                      <input

                        id="name"

                        type="text"

                        name="name"

                        placeholder="Enter your name"

                        value={formData.name}

                        onChange={handleChange}

                      />

                      {errors.name && (

                        <p className="error-message">

                          {errors.name}

                        </p>

                      )}

                    </div>

                    <div className="form-group">

                      <label htmlFor="phone">

                        Phone Number

                      </label>

                      <input

                        id="phone"

                        type="tel"

                        name="phone"

                        placeholder="Enter your phone number"

                        value={formData.phone}

                        onChange={handleChange}

                      />

                      {errors.phone && (

                        <p className="error-message">

                          {errors.phone}

                        </p>

                      )}

                    </div>

                    <div className="form-group">

                      <label htmlFor="service">

                        Select Service

                      </label>

                      <select

                        id="service"

                        name="service"

                        value={formData.service}

                        onChange={handleChange}

                      >

                        <option value="">

                          Choose a service

                        </option>

                        <option value="Haircut">

                          Haircut

                        </option>

                        <option value="Hair Styling">

                          Hair Styling

                        </option>

                        <option value="Facial">

                          Facial

                        </option>

                        <option value="Bridal Makeup">

                          Bridal Makeup

                        </option>

                        <option value="Manicure">

                          Manicure

                        </option>

                        <option value="Pedicure">

                          Pedicure

                        </option>

                      </select>

                      {errors.service && (

                        <p className="error-message">

                          {errors.service}

                        </p>

                      )}

                    </div>

                    <div className="form-row">

                      <div className="form-group">

                        <label htmlFor="date">

                          Preferred Date

                        </label>

                        <input

                          id="date"

                          type="date"

                          name="date"

                          value={formData.date}

                          onChange={handleChange}

                        />

                        {errors.date && (

                          <p className="error-message">

                            {errors.date}

                          </p>

                        )}

                      </div>

                      <div className="form-group">

                        <label htmlFor="time">

                          Preferred Time

                        </label>

                        <input

                          id="time"

                          type="time"

                          name="time"

                          value={formData.time}

                          onChange={handleChange}

                        />

                        {errors.time && (

                          <p className="error-message">

                            {errors.time}

                          </p>

                        )}

                      </div>

                    </div>

                    <div className="form-group">

                      <label htmlFor="message">

                        Additional Message

                        <span className="optional">

                          Optional

                        </span>

                      </label>

                      <textarea

                        id="message"

                        name="message"

                        rows="5"

                        placeholder="Tell us anything you'd like us to know..."

                        value={formData.message}

                        onChange={handleChange}

                      ></textarea>

                    </div>

                    <button

                      type="submit"

                      className="appointment-button"

                    >

                      Submit Appointment Request

                    </button>

                    {submitted && (

                      <div className="success-message">

                        <strong>

                          Appointment request received.

                        </strong>

                        <p>

                          Thank you. We will contact you soon to confirm

                          your appointment.

                        </p>

                      </div>

                    )}

                  </form>

                </div>

              </section>

            </main>

            {/* Footer */}

            <footer className="footer">

              <div className="footer-content">

                <div className="footer-brand">

                  <a href="#home" className="footer-logo">

                    Aura Beauty Studio

                  </a>

                  <p>

                    Beauty, care and confidence — all in one place.

                  </p>

                </div>

                <div className="footer-links">

                  <h3>Quick Links</h3>

                  <a href="#home">Home</a>

                  <a href="#services">Services</a>

                  <a href="#about">About</a>

                  <a href="#gallery">Gallery</a>

                  <a href="#reviews">Reviews</a>

                  <a href="#appointment">Appointment</a>

                </div>

                <div className="footer-contact">

                  <h3>Contact</h3>

                  <p>Chennai, Tamil Nadu</p>

                  <p>+91 98765 43210</p>

                  <p>Open: 10 AM – 8 PM</p>

                </div>

              </div>

              <div className="footer-bottom">

                <p>

                  © 2026 Aura Beauty Studio. All rights reserved.

                </p>

              </div>

            </footer>

          </div>
        }
      />

      <Route
        path="/admin"
        element={<OwnerLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );

}

export default App;