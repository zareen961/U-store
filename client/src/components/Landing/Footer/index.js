import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import MailIcon from '@material-ui/icons/Mail'
import PhoneIcon from '@material-ui/icons/Phone'

import developerImage1 from '../../../assets/images/developer1.png'
import developerImage2 from '../../../assets/images/developer2.png'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__shape"></div>
            <div className="footer__contentWrapper">
                <div className="footer__about">
                    <h3>About</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Molestias culpa id aspernatur. Laudantium illum cum, vero odit
                        beatae et id suscipit voluptatibus? Ratione expedita odit, quis
                        dolores.
                    </p>
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
                    <div className="footer__developerCard card1">
                        <img src={developerImage1} alt="Developer 1" />
                        <div>
                            <span>Shubham Kumar Singh</span>
                            <p>
                                <a
                                    href="https://github.com/kumarsks619"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="footer__developerIcon github"
                                >
                                    <GitHubIcon />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/kumarsks619"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="footer__developerIcon linkedIn"
                                >
                                    <LinkedInIcon />
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="footer__developerCard">
                        <img src={developerImage2} alt="Developer 2" />
                        <div>
                            <span>Ifa Zareen</span>
                            <p>
                                <a
                                    href="https://github.com/zareen961"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="footer__developerIcon github"
                                >
                                    <GitHubIcon />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ifa-zareen"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="footer__developerIcon linkedIn"
                                >
                                    <LinkedInIcon />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="footer__copyright">
                Copyright &copy; 2021 | Made <a href="#">U-store</a> with{' '}
                <span className="footer__heart">❤</span>
            </p>
        </div>
    )
}

export default Footer
