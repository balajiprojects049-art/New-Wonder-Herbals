import About from '../components/About'
import './AboutPage.css'

const AboutPage = () => {
    return (
        <div className="about-page">
            <div className="page-header">
                <div className="container">
                    <h1>About New Wonder Herbals</h1>
                    <p>Your trusted partner in natural wellness</p>
                </div>
            </div>
            <About />
        </div>
    )
}

export default AboutPage
