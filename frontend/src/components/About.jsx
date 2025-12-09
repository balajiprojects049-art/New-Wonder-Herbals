import { GiPlantRoots, GiChemicalDrop, GiLeafSwirl, GiRoundBottomFlask } from 'react-icons/gi'
import { IoRibbonOutline, IoFlaskOutline, IoLeafOutline } from 'react-icons/io5'
import './About.css'

const About = () => {
    const values = [
        {
            icon: <GiPlantRoots />,
            title: 'Natural Sourcing',
            description: 'We source only the finest organic ingredients from trusted farms'
        },
        {
            icon: <GiChemicalDrop />,
            title: 'No Chemicals',
            description: 'Completely free from artificial additives and preservatives'
        },
        {
            icon: <GiLeafSwirl />,
            title: 'Traditional Methods',
            description: 'Processed using time-tested Ayurvedic techniques'
        }
    ]

    return (
        <section id="about" className="about section bg-light">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">About New Wonder Herbals</h2>
                    <p className="fade-in">Your trusted partner in natural wellness</p>
                </div>

                <div className="about-content">
                    <div className="about-text">
                        <h3>Our Story</h3>
                        <p>
                            New Wonder Herbals was born from a passion for natural wellness and a deep respect
                            for traditional Ayurvedic practices. We believe that nature provides everything we
                            need to lead healthy, vibrant lives.
                        </p>
                        <p>
                            Our mission is to make premium organic herbal products accessible to everyone. Each
                            product is carefully crafted from the finest organic ingredients, processed using
                            traditional methods to preserve maximum nutritional value.
                        </p>
                        <p>
                            We work directly with certified organic farmers and use sustainable practices throughout
                            our supply chain. Every batch is tested for purity and quality to ensure you receive
                            only the best nature has to offer.
                        </p>
                    </div>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card card">
                                <div className="value-icon">{value.icon}</div>
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="certifications">
                    <h3 className="text-center">Quality Certifications</h3>
                    <div className="cert-badges">
                        <div className="cert-badge">
                            <div className="cert-icon"><IoLeafOutline size={32} /></div>
                            <p>100% Organic</p>
                        </div>
                        <div className="cert-badge">
                            <div className="cert-icon"><IoRibbonOutline size={32} /></div>
                            <p>Premium Quality</p>
                        </div>
                        <div className="cert-badge">
                            <div className="cert-icon"><GiRoundBottomFlask size={32} /></div>
                            <p>Lab Tested</p>
                        </div>
                        <div className="cert-badge">
                            <div className="cert-icon"><IoFlaskOutline size={32} /></div>
                            <p>Non-Toxic</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
