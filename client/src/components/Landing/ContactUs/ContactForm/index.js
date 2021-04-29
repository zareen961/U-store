import React from 'react'

import './ContactForm.css'

const ContactForm = () => {
    return (
        <div className="contactForm">
            <h3>Reach Us</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quasi in
                nesciunt placeat sint.
            </p>
            <form className="contactForm__form">
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        autoComplete="new-password"
                        spellCheck="false"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete="new-password"
                        spellCheck="false"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Subject"
                    autoComplete="new-password"
                    spellCheck="false"
                />
                <textarea
                    rows="7"
                    placeholder="Type your message...."
                    spellCheck="false"
                ></textarea>
                <button>Send Message</button>
            </form>
        </div>
    )
}

export default ContactForm
