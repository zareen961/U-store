import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import MailIcon from '@material-ui/icons/Mail'
import PhoneIcon from '@material-ui/icons/Phone'

import { WEBSITE_URL } from '../../../constants/urls'
import { ABOUT, DEVELOPERS } from '../../../constants/footerData'
import './Footer.scss'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__shape"></div>
            <div className="footer__contentWrapper">
                <div className="footer__about">
                    <h3>About</h3>
                    <p>{ABOUT}</p>
                </div>

                <div className="footer__contact">
                    <h3>Visit us</h3>
                    <p>No Address,</p>
                    <p>We're online only for now.</p>
                    <div className="footer__emailWrapper">
                        <MailIcon className="icon" /> <p>ustore.sks@gmail.com</p>
                    </div>
                    <div>
                        <PhoneIcon className="icon" /> <p>+91-8127297708</p>
                    </div>
                </div>

                <div className="footer__developers">
                    <h3>Developers</h3>
                    {DEVELOPERS.map((developer) => (
                        <div className="footer__developerCard" key={developer.name}>
                            <img src={developer.image} alt={developer.name} />
                            <div>
                                <span>{developer.name}</span>
                                <p>
                                    <a
                                        href={developer.github}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="footer__developerIcon github"
                                        title={`${developer.name}'s Github`}
                                    >
                                        <GitHubIcon />
                                    </a>
                                    <a
                                        href={developer.linkedin}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="footer__developerIcon linkedIn"
                                        title={`${developer.name}'s Linkedin`}
                                    >
                                        <LinkedInIcon />
                                    </a>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="footer__copyright">
                <span className="sentence">Copyright &copy; 2021</span>{' '}
                <span className="stick">|</span>{' '}
                <span className="sentence">
                    Made{' '}
                    <a
                        href={WEBSITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="U-store"
                    >
                        U-store
                    </a>{' '}
                    with <span className="footer__heart">❤</span>
                </span>
            </p>
        </div>
    )
}

export default Footer
