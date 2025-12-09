import Policies from '../components/Policies'
import './PoliciesPage.css'

const PoliciesPage = () => {
    return (
        <div className="policies-page">
            <div className="page-header">
                <div className="container">
                    <h1>Privacy Policy & Terms</h1>
                    <p>Our policies and terms of service</p>
                </div>
            </div>
            <Policies />
        </div>
    )
}

export default PoliciesPage
