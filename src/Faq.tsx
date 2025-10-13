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
        "Bookmypartys is web application and mobile app which is useful for any kind of event services booking like catering, venues, decors, Tents Lights, Photography, DJ and others like entire requirements of event Industry for all categories people.",
    },
    {
      question: "WHO RUNS BOOKMYPARTYS?",
      answer:
        "Bookmypartys is run by Team of Technology Experts  and Event Industry Experts with customer centric features like user friendly, stress free, Transparent and satisfactory.",
    },
    {
      question:
        "HOW CAN I BOOK EVENT CATERING?",
      answer:
        "All event catering vendors are registered in bookmypartys portal along with pre-approved menus with cost of the ‘PAX’ in different subscription types (Basic, Standard, VIP and PRO). Each and every Menu will consist of all necessary food Item as per the party requirements.ll event catering vendors are registered in bookmypartys portal along with pre-approved menu's with cost of the 'pax' in different subscription types Each and every Menu will consist of different food item names which can be derived for different occasions. Based on subscription type customer can book the service without a doubt.",
    },
    {
      question:
        "WHO IS RESPONSIBLE FOR EXECUTION OF EVENT SERVICES?",
      answer:
        "BookmypBookmypartys Team will take care of all event booking services and execution will be done by bookmypartys expertise event planners, event organisers and Event Mangers along with delivery Team.artys will take care of all event booking services and execution will be done by bookmypartys expertise event planners, event organisers and Event Mangers along with delivery Team.",
    },
    {
      question: "WHAT IS PACKAGES?",
      answer:
        "CombiAll the multiple event services are combined like catering, decors, venues, photography, dj and others can be made as a package or combo pack for a particular event requirements. Packages are defined combo pack, limited, unlimited.ned services like catering, decors, venues, photography, dj and others can be made as a package or combo pack for a particular event.Packages are defined combo pack, limited, unlimited.",
    },
    
    {
        question: "HOW CAN I TRUST BOOKMYPARTYS TO BOOK MY EVENT?",
        answer:
          "When CustomeWhen Customer booking Individual Event services and Event package Services from bookmypartys, BMP Team of experts will take care of all event services and complete E2E monitoring and follow up from vendor side QC and make sure to execute in timely manner. Specially for Food vendors QC like hygiene environment,  Fresh & Natural Ingredients, Fresh Groceries, Food TQQ(Taste, Quality and Quantity) all will be taken care of by Bookmypartys QC Team and same will be executed by the delivery Team.r booking Individual Event services and Event package Services from bookmypartys, BMP Team of experts will take care of complete end to end monitoring and follow up on vendors quality services, Guest safety, Food vendors quality like hygiene environment, Fresh & Natural Ingredients, Fresh Groceries, Food TQQ(Taste, Quality and Quantity) all will be taken care of by BMPQC Team and same will be executed by the delivery Team.",
      },
      {
        question: "HOW IS THE CANCELATION POLICY?",
        answer:
          "All individual seIn Event Industry, All Event Service Vendors are asked for Advance Payments because, they need to purchase all necessary food arrangements and given advances to cooks as well. So, Considering all the safety from vendor side as well customer side we work on Cancellation Policy for all Events and Packages can be shown as below.rvices can be cancelled before one day (24 hours) to the event date. Cancellation cannot be done in 24 hours to the event date.Package services can be cancelled before 48 hours to the event date. Cancellation cannot be done in 48 hours to the event date.",
      },
      {
        question: "HOW IS THE REFUND POLICY?",
        answer:
          "We have a Money Back Guarantee Policy if we are unable to deliver products or services as committed to you. You can write to us at info@bookmypartys.com. Our refund department will investigate the matter, and if it finds non-catering of services on the part of bookmypartys, we'll gladly refund your payment within 7-10 working days of your refund request.All individual services can be cancelled before one day (24 hours) to the event date. Cancellation done in 24 hours to the event date then 50% refund.Package services can be cancelled before 48 hours to the event date. Cancellation done in 48 hours to the event date then 50% refund",
      },
  ];

  return (
    <div className="faq">
      <h1>Frequently Asked Questions(FAQ)</h1>
      <h2>Discover answers related to  BOOKMYPARTYS and how it can help you.</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span className="faq-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
              <h3>{faq.question}</h3>
            </div>
            <div className={`faq-answer`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
