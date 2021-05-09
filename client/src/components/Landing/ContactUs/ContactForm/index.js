import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SendIcon from '@material-ui/icons/Send'

import { useForm } from '../../../../utils/hooks/useForm'
import { contactMailSend } from '../../../../store/actions/contact'
import './ContactForm.css'

const ContactForm = () => {
    const dispatch = useDispatch()
    const { loading, success } = useSelector((state) => state.contactMail)

    const initialInputVals = {
        name: '',
        email: '',
        subject: '',
        message: '',
    }
    const { inputVals, handleOnChange, handleReset } = useForm(initialInputVals)

    useEffect(() => {
        if (success) {
            handleReset()
        }
    }, [success])

    const handleOnSubmit = (e) => {
        e.preventDefault()

        dispatch(contactMailSend(inputVals))
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
                        required
                        type="text"
                        placeholder="What's your name?"
                        name="name"
                        value={inputVals.name}
                        autoComplete="new-password"
                        spellCheck="false"
                        onChange={handleOnChange}
                    />
                    <input
                        required
                        type="email"
                        placeholder="Tell us your email address."
                        name="email"
                        value={inputVals.email}
                        autoComplete="new-password"
                        spellCheck="false"
                        onChange={handleOnChange}
                    />
                </div>
                <input
                    required
                    type="text"
                    placeholder="Why do you want to contact us?"
                    name="subject"
                    value={inputVals.subject}
                    autoComplete="new-password"
                    spellCheck="false"
                    onChange={handleOnChange}
                />
                <textarea
                    required
                    rows="7"
                    placeholder="You can write your message here."
                    name="message"
                    value={inputVals.message}
                    spellCheck="false"
                    onChange={handleOnChange}
                ></textarea>

                <button
                    type="submit"
                    className={
                        loading
                            ? 'contactForm__sendButton animate'
                            : 'contactForm__sendButton'
                    }
                    disabled={loading}
                >
                    {loading ? <span>Wait</span> : <span>Send</span>}
                    <SendIcon className="contactForm__sendIcon" />
                </button>
            </form>
        </div>
    )
}

export default ContactForm
