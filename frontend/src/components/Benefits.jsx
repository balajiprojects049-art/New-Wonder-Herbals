import { GiPlantSeed, GiHealing, GiHealthNormal, GiLotus } from 'react-icons/gi'
import { IoLeafOutline, IoShieldCheckmarkOutline } from 'react-icons/io5'
import './Benefits.css'

const Benefits = () => {
    const benefits = [
        {
            icon: <IoLeafOutline />,
            title: '100% Natural',
            description: 'Pure organic ingredients from nature'
        },
        {
            icon: <GiHealthNormal />,
            title: 'No Side Effects',
            description: 'Safe, gentle and chemical-free'
        },
        {
            icon: <IoShieldCheckmarkOutline />,
            title: 'Boosts Immunity',
            description: 'Strengthens your natural defenses'
        },
        {
            icon: <GiLotus />,
            title: 'Total Wellness',
            description: 'Comprehensive health solutions for everyone'
        },
        {
            icon: <GiHealing />,
            title: 'Healing Properties',
            description: 'Traditional Ayurvedic benefits'
        },
        {
            icon: <GiPlantSeed />,
            title: 'Rich in Nutrients',
            description: 'Packed with vitamins and minerals'
        }
    ]

    return (
        <section className="benefits section bg-light">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">Why Choose New Wonder Herbals?</h2>
                    <p className="fade-in">Experience the power of nature's finest ingredients</p>
                </div>

                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="benefit-card card fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="benefit-icon">
                                {benefit.icon}
                            </div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Benefits
