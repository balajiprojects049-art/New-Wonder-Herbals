import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
    const contactInfo = [
        {
            icon: <FiPhone />,
            title: 'Phone',
            value: '+91 63012 08219',
            link: 'tel:+916301208219'
        },
        {
            icon: <FiMail />,
            title: 'Email',
            value: 'newwonderherbals@gmail.com',
            link: 'mailto:newwonderherbals@gmail.com'
        },
        {
            icon: <FiMapPin />,
            title: 'Address',
            value: '5/120, Jamulamma Temple Street, Dorasaniplli, Proddatur - 516360',
            link: null
        },
        {
            icon: <FiClock />,
            title: 'Business Hours',
            value: 'Mon - Sat: 9:00 AM - 6:00 PM',
            link: null
        }
    ]

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent('Hello! I\'m interested in your herbal products.')
        window.open(`https://wa.me/916301208219?text=${message}`, '_blank')
    }

    return (
        <section id="contact" className="contact section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">Get in Touch</h2>
                    <p className="fade-in">We'd love to hear from you</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Contact Information</h3>
                        <p className="contact-subtitle">
                            Have questions about our products? We're here to help!
                        </p>

                        <div className="contact-items">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="contact-item">
                                    <div className="contact-icon">{item.icon}</div>
                                    <div className="contact-details">
                                        <h4>{item.title}</h4>
                                        {item.link ? (
                                            <a href={item.link}>{item.value}</a>
                                        ) : (
                                            <p>{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn btn-primary whatsapp-btn" onClick={handleWhatsAppClick}>
                            <FaWhatsapp size={24} />
                            Chat on WhatsApp
                        </button>
                    </div>

                    <div className="contact-map">
                        <div className="map-placeholder">
                            <FiMapPin size={48} />
                            <h3>Visit Our Store</h3>
                            <p>Come visit us at our physical location</p>
                            <div className="map-image">
                                <div className="placeholder-content">
                                    <span>📍</span>
                                    <p>5/120, Jamulamma Temple Street<br />Dorasaniplli, Proddatur - 516360</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
