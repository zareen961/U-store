import React from 'react'
import NumberFormat from 'react-number-format'

import './ContactShape.scss'

const ContactShape = ({ label, content, children, isPrice = false, isImage = false }) => {
    return (
        <div className="contactShape">
            {isImage && (
                <div className="contactShape__imageWrapper">
                    <div className="contactShape__imageCover"></div>
                    <img src={content} alt="product" />
                </div>
            )}

            <div className="contactShape__centerWrapper">
                <span className="contactShape__icon">{children}</span>
                <h3
                    className={
                        isImage ? 'contactShape__label image' : 'contactShape__label'
                    }
                >
                    {label}
                </h3>
                {!isImage && (
                    <h1 className="contactShape__content">
                        {isPrice ? (
                            Number(content) === 0 &&
                            !label.toLowerCase().includes('bid') ? (
                                'Free'
                            ) : (
                                <NumberFormat
                                    value={content}
                                    prefix={'Rs '}
                                    thousandSeparator={true}
                                    displayType={'text'}
                                />
                            )
                        ) : content.length > 11 ? (
                            `${content.substring(0, 11)}...`
                        ) : (
                            content
                        )}
                    </h1>
                )}
            </div>
        </div>
    )
}

export default ContactShape
