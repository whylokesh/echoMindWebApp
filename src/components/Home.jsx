import React from 'react'
import '../style.css';
import Navbar from './Navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            <section className="section hero" id="home" aria-label="hero">
                <div className="container">

                    <div className="hero-content">

                        <p className="hero-subtitle">EchoMind</p>

                        <h1 className="h1 hero-title">Simplify. Remind. Thrive.</h1>

                        <p className="hero-text">
                            Experience the power of automated task reminders with EchoMind. Say goodbye to forgotten tasks and hello to increased productivity.
                        </p>

                        <a href="https://wa.me/+919772747999?text=I%20want%20to%20test%20your%20whastapp%20chat%20Bot" className="btn btn-primary">Request Beta Access</a>

                    </div>

                    <figure className="hero-banner">
                        <img src="https://img.freepik.com/free-vector/appointment-booking-with-woman-checking-smartphone_23-2148558795.jpg?size=626&ext=jpg&ga=GA1.2.378971825.1690805022&semt=ais" width="720" height="673" alt="hero banner" className="w-100" />
                    </figure>

                </div>
            </section>

            <section className="section service" id="service" aria-label="service">
                <div className="container">

                    <h2 className="h2 section-title">Services We Provided</h2>

                    <p className="section-text">
                        Here are some suggested services that we provide with our Echomind WhatsApp task reminder chatbot
                    </p>

                    <ul className="grid-list">

                        <li>
                            <div className="service-card">

                                <div className="card-icon" style={{ backgroundColor: "#13c4a1"}}>
                                    <ion-icon name="chatbox"></ion-icon>
                                </div>

                                <h3 className="h3">
                                    <a href="#" className="card-title">Automated Task Reminders</a>
                                </h3>

                                <p className="card-text">
                                    Our chatbot allows you to send voice notes to set reminders for tasks. It will send you timely notifications.
                                </p>

                            </div>
                        </li>

                        <li>
                            <div className="service-card">

                                <div className="card-icon" style={{ backgroundColor: "#6610f2" }}>
                                    <ion-icon name="desktop"></ion-icon>
                                </div>

                                <h3 className="h3">
                                    <a href="#" className="card-title">Personalized Notifications</a>
                                </h3>

                                <p className="card-text">
                                    Receive task reminders at the exact time you specify. Our chatbot understands your preferences and ensures you stay organized
                                </p>

                            </div>
                        </li>

                        <li>
                            <div className="service-card">

                                <div className="card-icon" style={{ backgroundColor: "#ffb700" }}>
                                    <ion-icon name="bulb"></ion-icon>
                                </div>

                                <h3 className="h3">
                                    <a href="#" className="card-title">Voice-Based Interaction</a>
                                </h3>

                                <p className="card-text">
                                    Interact with the chatbot using voice notes, making setting reminders a breeze. No need to type out tasks; simply speak and let EchoMind handle the rest
                                </p>

                            </div>
                        </li>

                        <li>
                            <div className="service-card">

                                <div className="card-icon" style={{ backgroundColor: "#fc3549" }}>
                                    <ion-icon name="phone-portrait"></ion-icon>
                                </div>

                                <h3 className="h3">
                                    <a href="#" className="card-title">Multiple Reminders</a>
                                </h3>

                                <p className="card-text">
                                    Set multiple reminders for various tasks throughout the day. EchoMind ensures you never miss a deadline.
                                </p>

                            </div>
                        </li>

                        <li>
                            <div className="service-card">

                                <div className="card-icon" style={{ backgroundColor: "#00d280" }}>
                                    <ion-icon name="archive"></ion-icon>
                                </div>

                                <h3 className="h3">
                                    <a href="#" className="card-title">24/7 Availability</a>
                                </h3>

                                <p className="card-text">
                                    Our chatbot is available round the clock to help you set reminders whenever you need. No need to wait for office hours.
                                </p>

                            </div>
                        </li>

                        <li>
                            <div className="service-card">

                                <div className="card-icon" style={{ backgroundColor: "#ff612f" }}>
                                    <ion-icon name="build"></ion-icon>
                                </div>

                                <h3 className="h3">
                                    <a href="#" className="card-title">Enhanced Productivity</a>
                                </h3>

                                <p className="card-text">
                                    Stay organized and boost productivity by having a reliable assistant that keeps you on track with your tasks
                                </p>

                            </div>
                        </li>

                    </ul>

                </div>
            </section>

            <section className="section about" id="about" aria-label="about">
                <div className="container">

                    {/* <div className="about-banner img-holder" style="--width: 720; --height: 960;">
                        <img src="https://cdn.pixabay.com/photo/2023/05/09/20/36/ai-generated-7982425_640.jpg" width="720" height="960" loading="lazy" alt="about banner"
                            className="img-cover" />

                        <button className="play-btn" aria-label="Play video">

                            <ion-icon name="play" aria-hidden="true"></ion-icon>
                        </button>
                    </div> */}
                    <div className="about-banner img-holder" style={{ "--width": 720, "--height": 960 }}>
                        <img
                            src="https://cdn.pixabay.com/photo/2023/05/09/20/36/ai-generated-7982425_640.jpg"
                            width="720"
                            height="960"
                            loading="lazy"
                            alt="about banner"
                            className="img-cover"
                        />
                        <button className="play-btn" aria-label="Play video">
                            <ion-icon name="play" aria-hidden="true"></ion-icon>
                        </button>
                    </div>

                    <div className="about-content">

                        <h2 className="h2 section-title">About Us</h2>

                        <p className="section-text">
                            EchoMind: Transforming task management. Our WhatsApp chatbot empowers you with voice reminders, ensuring you never miss a beat. Stay organized effortlessly and boost your productivity with EchoMind.
                        </p>

                        <h3 className="h3">What We Do</h3>

                        <p className="section-text">
                            We provide automated task reminders via WhatsApp voice notes, ensuring you stay on top of your schedule. EchoMind simplifies your tasks, making productivity effortless.
                        </p>

                        <h3 className="h3">Our Success</h3>

                        <ul className="about-list">

                            <li className="about-item">
                                <ion-icon name="checkmark-circle" aria-hidden="true"></ion-icon>

                                <p className="section-text">
                                    <strong>User Engagement:</strong> Our users have experienced higher task completion rates and improved time management, resulting in increased overall productivity.
                                </p>
                            </li>

                            <li className="about-item">
                                <ion-icon name="checkmark-circle" aria-hidden="true"></ion-icon>

                                <p className="section-text">
                                    <strong> Positive Feedback: </strong>EchoMind has received rave reviews for its intuitive interface and seamless integration with WhatsApp, making task management a breeze.
                                </p>
                            </li>

                            <li className="about-item">
                                <ion-icon name="checkmark-circle" aria-hidden="true"></ion-icon>

                                <p className="section-text">
                                    <strong> Growing Community: </strong>Our user base continues to expand, with satisfied individuals and businesses relying on EchoMind to keep them organized and efficient.
                                </p>
                            </li>

                        </ul>

                        <h3 className="h3">Our Mission</h3>

                        <p className="section-text">
                            At EchoMind, our mission is to revolutionize task management by leveraging cutting-edge technology to provide effortless and personalized solutions. We are dedicated to helping individuals and businesses enhance their productivity, reduce stress, and achieve their goals by simplifying their daily routines through our innovative WhatsApp task reminder chatbot
                        </p>

                    </div>

                </div>
            </section>

            {/* <section className="section cta" aria-label="cta" style="background-image: url('./assets/images/cta-bg.jpg')">
                <div className="container">

                    <p className="cta-subtitle">App is in Testing</p>

                    <h2 className="h2 section-title">Experience the Power of EchoMind Beta Version</h2>

                    <a href="https://wa.me/+919772747999?text=I%20want%20to%20test%20your%20whastapp%20chat%20Bot" className="btn btn-secondary">Try The Beta Version</a>


                </div>
            </section> */}

            <section className="section cta" aria-label="cta" style={{ backgroundImage: `url('./assets/images/cta-bg.jpg')` }}>
                <div className="container">
                    <p className="cta-subtitle">App is in Testing</p>
                    <h2 className="h2 section-title">Experience the Power of EchoMind Beta Version</h2>
                    {/* <a href="https://wa.me/+919772747999?text=I%20want%20to%20test%20your%20whastapp%20chat%20Bot" className="btn btn-secondary">Try The Beta Version</a> */}
                    <a href="/login" className="btn btn-secondary">Try The Beta Version</a>
                </div>
            </section>


            <section className="how-it-works-section">
                <div className="how-it-works-content">
                    <h2 className="section-title">How It Works</h2>
                    <div className="step">
                        <div className="step-number">Step 1</div>
                        <div className="step-description">
                            <h3>Initiate Contact</h3>
                            <p>Start by sending a "hi" message to our dedicated EchoMind WhatsApp number</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">Step 2</div>
                        <div className="step-description">
                            <h3>Receive Registration Link</h3>
                            <p>In response, EchoMind promptly sends you a WhatsApp message with a personalized registration link.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">Step 3</div>
                        <div className="step-description">
                            <h3>Click and Register</h3>
                            <p>Click the provided registration link within the WhatsApp conversation.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">Step 4</div>
                        <div className="step-description">
                            <h3>Create an Event</h3>
                            <p>After registration, use EchoMind's voice commands to create an event by recording a voice message on WhatsApp, specifying event details.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">Step 5</div>
                        <div className="step-description">
                            <h3>Voice Command Processing</h3>
                            <p>Send the voice message containing event details to EchoMind on WhatsApp. Our advanced voice recognition system processes your message and extracts relevant event information.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">Step 6</div>
                        <div className="step-description">
                            <h3>Event Creation and Confirmation</h3>
                            <p>EchoMind accurately interprets your voice command and creates the event on your Google Calendar. Receive a WhatsApp message confirming the successful creation of the event.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">Step 7</div>
                        <div className="step-description">
                            <h3> Event Update</h3>
                            <p>To update the event, reply to the confirmation message for the created event with a new voice message containing the updated details.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">Step 8</div>
                        <div className="step-description">
                            <h3>Voice Command Processing for Update</h3>
                            <p>EchoMind processes your updated voice message and extracts the new event information.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">Step 9</div>
                        <div className="step-description">
                            <h3>Event Modification</h3>
                            <p>EchoMind intelligently updates the existing event on your Google Calendar with the new details you provided.</p>
                        </div>
                    </div>
                </div>
            </section>



            <ul className="contact-list">

                <li className="contact-item">
                    <div className="contact-card">

                        <div className="card-icon">
                            <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                        </div>

                        <div className="card-content">

                            <h3 className="h3 card-title">Mail Here</h3>


                            <a href="mailto:info@luaz.com" className="card-link">info@skylinebiz.in</a>

                        </div>

                    </div>
                </li>

                <li className="contact-item">
                    <div className="contact-card">

                        <div className="card-icon">
                            <ion-icon name="map-outline" aria-hidden="true"></ion-icon>
                        </div>

                        <div className="card-content">

                            <h3 className="h3 card-title">Visit Here</h3>

                            <address className="card-address">
                                H-1/101B, RIICO, Mansarovar,<br /> Jaipur, Rajasthan, INDIA
                            </address>

                        </div>

                    </div>
                </li>

                <li className="contact-item">
                    <div className="contact-card">

                        <div className="card-icon">
                            <ion-icon name="headset-outline" aria-hidden="true"></ion-icon>
                        </div>

                        <div className="card-content">

                            <h3 className="h3 card-title">Call Here</h3>

                            <a href="https://wa.me/+919772747999" className="card-link">+91 9772747999</a>

                        </div>

                    </div>
                </li>

            </ul>
        </>
    )
}

export default Home