import Contact from '../components/Contact'
import './ContactPage.css'

const ContactPage = () => {
    return (
        <div className="contact-page">
            <div className="page-header">
                <div className="container">
                    <h1>Get in Touch</h1>
                    <p>We'd love to hear from you</p>
                </div>
            </div>
            <Contact />
        </div>
    )
}

export default ContactPage
