import React, { useState } from "react";
import "./assets/css/Faq.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "WHAT IS BOOKMYPARTYS?",
      answer:
        "Bookmypartys is a web application and mobile app useful for any kind of event services booking like catering, venues, decors, tents, lights, photography, DJ, and other requirements of the event industry for all categories of people.",
    },
    {
      question: "WHO RUNS BOOKMYPARTYS?",
      answer:
        "Bookmypartys is run by a team of technology and event industry experts with customer-centric features that are user-friendly, stress-free, transparent, and satisfactory.",
    },
    {
      question: "HOW CAN I BOOK EVENT CATERING?",
      answer:
        "All event catering vendors are registered on the Bookmypartys portal with pre-approved menus and PAX-based pricing under different subscription types (Basic, Standard, VIP, and PRO). Each menu includes all necessary food items for various party requirements.",
    },
    {
      question: "WHO IS RESPONSIBLE FOR EXECUTION OF EVENT SERVICES?",
      answer:
        "Bookmypartys takes care of all event booking services. Execution is managed by our team of event planners, organizers, and managers along with the delivery team.",
    },
    {
      question: "WHAT IS PACKAGES?",
      answer:
        "Multiple event services such as catering, decors, venues, photography, DJ, and others can be bundled into packages or combo packs based on event needs. Packages are defined as Combo Pack, Limited, or Unlimited.",
    },
    {
      question: "HOW CAN I TRUST BOOKMYPARTYS TO BOOK MY EVENT?",
      answer:
        "When customers book individual event services or event packages through Bookmypartys, our expert team manages end-to-end monitoring and quality checks. Especially for food vendors, hygiene, freshness, ingredients, and taste-quality-quantity (TQQ) are carefully verified by our QC team before delivery.",
    },
    
      {
  question: "HOW IS THE REFUND POLICY?",
  answer: (
    <>
      We have a Money Back Guarantee Policy if we are unable to deliver products or
      services as committed. You can write to us at{" "}
      <a
        href="mailto:info@bookmypartys.com"
        
      >
        info@bookmypartys.com
      </a>
      . Our refund department will investigate, and if non-delivery is confirmed,
      we’ll refund your payment within 7–10 working days of your request.
    </>
  ),
},
    {
      question: "HOW IS THE RETURN POLICY?",
      answer:
        "There is no Return Policy for all Event Related Services and Staffing Services, especially food orders. For shop products, especially foods, returns are not accepted. However, all other non-food products can be returned within 24 hours of delivery with a valid reason. Return charges may apply depending on the product type and quantity.",
    },
  ];

 const cancellationPolicyHTML = `
  <h2>Cancellation Policy</h2>
  <p>
    In the event industry, vendors require advance payments to make necessary arrangements such as food preparation, rentals, and staffing. To protect both vendors and customers, BookMyPartys follows a transparent cancellation policy as detailed below:
  </p>

  <table class="cancellation-table">
    <thead>
      <tr>
        <th>Event Service</th>
        <th>Cancellation Time</th>
        <th>Cancellation Fee</th>
      </tr>
    </thead>
    <tbody>
      <!-- All Packages -->
      <tr>
        <td rowspan="3">All Packages</td>
        <td>Cancellation done before 7 days of the booking delivery date</td>
        <td>0%</td>
      </tr>
      <tr>
        <td>Cancellation done between 7–3 days before the booking delivery date</td>
        <td>60%</td>
      </tr>
      <tr>
        <td>Cancellation done less than 3 days before the booking delivery date</td>
        <td>100%</td>
      </tr>

      <!-- All Food Related Services -->
      <tr>
        <td rowspan="4">All Food Related Services</td>
        <td>Cancellation done within 12 hours of booking delivery</td>
        <td>100%</td>
      </tr>
      <tr>
        <td>Cancellation done before 12 hours</td>
        <td>80%</td>
      </tr>
      <tr>
        <td>Cancellation done before 24 hours</td>
        <td>60%</td>
      </tr>
      <tr>
        <td>Cancellation done before 48 hours</td>
        <td>0%</td>
      </tr>

      <!-- Other Event Related Services -->
      <tr>
        <td rowspan="4">Other Event Related Services</td>
        <td>Cancellation done within 12 hours of booking delivery</td>
        <td>80%</td>
      </tr>
      <tr>
        <td>Cancellation done before 12 hours</td>
        <td>60%</td>
      </tr>
      <tr>
        <td>Cancellation done before 24 hours</td>
        <td>40%</td>
      </tr>
      <tr>
        <td>Cancellation done before 48 hours</td>
        <td>0%</td>
      </tr>

      <!-- Rental Services -->
      <tr>
        <td rowspan="4">Rental Services</td>
        <td>Cancellation done within 12 hours of booking delivery</td>
        <td>80%</td>
      </tr>
      <tr>
        <td>Cancellation done before 12 hours</td>
        <td>60%</td>
      </tr>
      <tr>
        <td>Cancellation done before 24 hours</td>
        <td>40%</td>
      </tr>
      <tr>
        <td>Cancellation done before 48 hours</td>
        <td>0%</td>
      </tr>

      <!-- Shop Products -->
      <tr>
        <td rowspan="2">Shop Products</td>
        <td>Cancellation done before shipping</td>
        <td>0%</td>
      </tr>
      <tr>
        <td>Cancellation done after shipping</td>
        <td>50%</td>
      </tr>

      <!-- Platform/Delivery Partner Fault -->
      <tr>
        <td>Platform or Delivery Partner Fault</td>
        <td>If cancellation is due to platform or delivery partner issue (e.g., item unavailable)</td>
        <td>0%</td>
      </tr>
    </tbody>
  </table>
`;

  return (
    <div className="faq">
      <h1>Frequently Asked Questions (FAQ)</h1>
      <h2>Discover answers related to BOOKMYPARTYS and how it can help you.</h2>

      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span className="faq-icon">{activeIndex === index ? "-" : "+"}</span>
              <h3>{faq.question}</h3>
            </div>
            <div className={`faq-answer`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cancellation Policy Section */}
      <div
        className="cancellation-policy-section"
        dangerouslySetInnerHTML={{ __html: cancellationPolicyHTML }}
      />
    </div>
  );
};

export default FAQ;
