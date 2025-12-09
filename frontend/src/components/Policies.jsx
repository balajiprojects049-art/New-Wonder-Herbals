import './Policies.css'

const Policies = () => {
    return (
        <section id="policies" className="policies section bg-light">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Privacy Policy & Terms</h2>
                </div>

                <div className="policies-content">
                    <div className="policy-section">
                        <h3>Privacy Policy</h3>
                        <p>
                            New Wonder Herbals is committed to protecting your privacy. This privacy policy explains
                            how we collect, use, and protect your personal information.
                        </p>
                        <ul>
                            <li><strong>Information Collection:</strong> We collect information you provide when placing orders, including name, address, phone number, and email.</li>
                            <li><strong>Information Use:</strong> Your information is used solely for order processing, delivery, and customer service.</li>
                            <li><strong>Data Protection:</strong> We implement security measures to protect your personal information.</li>
                            <li><strong>No Sharing:</strong> We do not sell, trade, or share your personal information with third parties.</li>
                            <li><strong>Cookies:</strong> We may use cookies to enhance your browsing experience.</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h3>Terms & Conditions</h3>
                        <p>
                            By using our website and services, you agree to the following terms and conditions:
                        </p>
                        <ul>
                            <li><strong>Product Quality:</strong> All products are 100% organic and tested for quality.</li>
                            <li><strong>Orders:</strong> Orders are processed within 24-48 hours of confirmation.</li>
                            <li><strong>Payment:</strong> We accept various payment methods including COD, UPI, and online banking.</li>
                            <li><strong>Shipping:</strong> Delivery typically takes 3-7 business days depending on location.</li>
                            <li><strong>Returns:</strong> Products can be returned within 7 days if unopened and in original packaging.</li>
                            <li><strong>Refunds:</strong> Refunds are processed within 7-10 business days after return approval.</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h3>Shipping Policy</h3>
                        <ul>
                            <li><strong>Processing Time:</strong> Orders are processed within 1-2 business days.</li>
                            <li><strong>Delivery Time:</strong> Standard delivery takes 3-7 business days.</li>
                            <li><strong>Delivery Charges:</strong>
                                <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                                    <li>Within Andhra Pradesh: ₹100</li>
                                    <li>Outside Andhra Pradesh: ₹150</li>
                                </ul>
                            </li>
                            <li><strong>Tracking:</strong> Tracking information will be provided via email/SMS.</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h3>Return & Refund Policy</h3>
                        <ul>
                            <li><strong>Return Period:</strong> 7 days from delivery date.</li>
                            <li><strong>Condition:</strong> Products must be unopened and in original packaging.</li>
                            <li><strong>Process:</strong> Contact us via phone or email to initiate a return.</li>
                            <li><strong>Refund Method:</strong> Refunds will be issued to the original payment method.</li>
                        </ul>
                    </div>
                </div>

                <div className="policy-footer">
                    <p>
                        For any questions regarding our policies, please contact us at{' '}
                        <a href="mailto:newwonderherbals@gmail.com">newwonderherbals@gmail.com</a>
                    </p>
                    <p className="last-updated">Last Updated: December 2025</p>
                </div>
            </div>
        </section>
    )
}

export default Policies
