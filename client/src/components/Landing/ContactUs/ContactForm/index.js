import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SendIcon from '@material-ui/icons/Send'

import { useForm } from '../../../../hooks/useForm'
import { contactMailSend } from '../../../../store/actions/contact'
import { alertAdd } from '../../../../store/actions/ui'
import { REACH_HEADING } from '../../../../constants/contactUsData'
import './ContactForm.scss'

const initialInputVals = {
    name: '',
    email: '',
    subject: '',
    message: '',
}

const ContactForm = () => {
    const dispatch = useDispatch()
    const { loading, success } = useSelector((state) => state.contactMail)

    const { inputVals, handleOnChange, handleReset } = useForm(initialInputVals)

    useEffect(() => {
        if (success) {
            handleReset()
        }
    }, [success, handleReset])

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (inputVals.name && inputVals.email && inputVals.subject && inputVals.message) {
            dispatch(contactMailSend(inputVals))
        } else {
            dispatch(
                alertAdd(
                    "You can't send an incomplete contact message! Please fill all the fields.",
                    'error'
                )
            )
        }
    }

    return (
        <div className="contactForm">
            <h3 className="contactForm__heading">Reach Us</h3>
            <p className="contactForm__description">{REACH_HEADING}</p>
            <form className="contactForm__form" onSubmit={handleOnSubmit}>
                <div className="contactForm__inputGroup">
                    <input
                        type="text"
                        placeholder="What's your name?"
                        name="name"
                        value={inputVals.name}
                        autoComplete="new-password"
                        spellCheck="false"
                        onChange={handleOnChange}
                    />
                    <input
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
                    type="text"
                    placeholder="Why do you want to contact us?"
                    name="subject"
                    value={inputVals.subject}
                    autoComplete="new-password"
                    spellCheck="false"
                    onChange={handleOnChange}
                    className="contactForm__subjectInput"
                />
                <textarea
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
