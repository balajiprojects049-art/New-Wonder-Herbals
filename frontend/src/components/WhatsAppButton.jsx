import { FaWhatsapp } from 'react-icons/fa'
import './WhatsAppButton.css'

const WhatsAppButton = () => {
    const handleClick = () => {
        const message = encodeURIComponent('Hello! I have a question about your products.')
        window.open(`https://wa.me/916301208219?text=${message}`, '_blank')
    }

    return (
        <button className="whatsapp-float" onClick={handleClick} aria-label="Chat on WhatsApp">
            <FaWhatsapp size={32} />
        </button>
    )
}

export default WhatsAppButton
