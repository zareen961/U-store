import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

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
                        dolores placeat eligendi voluptate officiis!
                    </p>
                </div>

                <div className="footer__contact">
                    <h3>Visit us</h3>
                    <p>252C Nankari, IIT Kanpur 208001 </p>
                    <p>or call us : 8127297708</p>
                </div>

                <div className="footer__developers">
                    <h3>Developers</h3>
                    <div className="footer__developerCard">
                        {/* <img src={ifaImage} alt="Developer 1" /> */}
                        <span>Shubham Singh</span>
                        <GitHubIcon />
                        <LinkedInIcon />
                    </div>
                    <div className="footer__developerCard">
                        {/* <img src={ifaImage} alt="Developer 2" /> */}
                        <span>Ifa Zareen</span>
                        <GitHubIcon />
                        <LinkedInIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
