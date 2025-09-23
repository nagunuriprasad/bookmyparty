import React from 'react';
import './assets/css/Confidentiality.css';

const Confidentiality = () => {
  return (
    <div className="confidentiality-container">
      <h2>Confidentiality</h2>
      <p>
        We <a href="https://www.bookmypartys.com">www.bookmypartys.com</a> (A product of IBTC EVENTS & ENTERTAINMENTS PVT LTD) always considers the protection of customer information as a crucial part of our data protection policy.
        We are committed to maintaining the confidentiality of the information and documents shared by our prospective companies and customers with us.
      </p>
      <h3>We Do Not</h3>
      <ul>
        <li>Never ever disclose any information pertaining to our Clients to any third parties except in cases where it is necessary to serve our services to customers & government authorities.</li>
        <li>Never ever disclose our Client list or Client Information to third parties without their consent.</li>
        <li>Never ever sell client information to third parties.</li>
      </ul>
    </div>
  );
};

export default Confidentiality;
