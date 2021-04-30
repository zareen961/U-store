import React from 'react'
import SendIcon from '@material-ui/icons/Send'

import './ContactForm.css'

const ContactForm = () => {
    const handleOnSubmit = (e) => {
        e.preventDefault()

        const iconElement = document.getElementsByClassName('contactForm__sendIcon')[0]
        iconElement.style.cssText =
            'transition: all 0.5s ease-in; transform: translate(60px);'
    }

    return (
        <div className="contactForm">
            <h3>Reach Us</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quasi in
                nesciunt placeat sint.
            </p>
            <form className="contactForm__form" onSubmit={handleOnSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="What's your name?"
                        autoComplete="new-password"
                        spellCheck="false"
                    />
                    <input
                        type="email"
                        placeholder="Tell us your email address."
                        autoComplete="new-password"
                        spellCheck="false"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Why do you want to contact us?"
                    autoComplete="new-password"
                    spellCheck="false"
                />
                <textarea
                    rows="7"
                    placeholder="You can write your message here."
                    spellCheck="false"
                ></textarea>

                <button type="submit" className="contactForm__sendButton">
                    <span>Send</span>
                    <SendIcon className="contactForm__sendIcon" />
                </button>
            </form>
        </div>
    )
}

export default ContactForm
