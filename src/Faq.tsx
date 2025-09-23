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
        "Bookmypartys is a web application and mobile app for booking event services, including catering, venues, decor, tents, lights, photography, DJs and more, catering to all categories of people.",
    },
    {
      question: "WHO RUNS BOOKMYPARTYS?",
      answer:
        "Bookmypartys is run by a team of technology and event industry experts, with a focus on user-friendly, transparent, and satisfactory features.",
    },
    {
      question:
        "HOW CAN I BOOK EVENT CATERING?",
      answer:
        "All event catering vendors are registered in bookmypartys portal along with pre-approved menu's with cost of the 'pax' in different subscription types Each and every Menu will consist of different food item names which can be derived for different occasions. Based on subscription type customer can book the service without a doubt.",
    },
    {
      question:
        "WHO IS RESPONSIBLE FOR EXECUTION OF EVENT SERVICES?",
      answer:
        "Bookmypartys will take care of all event booking services and execution will be done by bookmypartys expertise event planners, event organisers and Event Mangers along with delivery Team.",
    },
    {
      question: "WHAT IS PACKAGES?",
      answer:
        "Combined services like catering, decors, venues, photography, dj and others can be made as a package or combo pack for a particular event.Packages are defined combo pack, limited, unlimited.",
    },
    
    {
        question: "HOW CAN I TRUST BOOKMYPARTYS TO BOOK MY EVENT?",
        answer:
          "When Customer booking Individual Event services and Event package Services from bookmypartys, BMP Team of experts will take care of complete end to end monitoring and follow up on vendors quality services, Guest safety, Food vendors quality like hygiene environment, Fresh & Natural Ingredients, Fresh Groceries, Food TQQ(Taste, Quality and Quantity) all will be taken care of by BMPQC Team and same will be executed by the delivery Team.",
      },
      {
        question: "HOW IS THE CANCELATION POLICY?",
        answer:
          "All individual services can be cancelled before one day (24 hours) to the event date. Cancellation cannot be done in 24 hours to the event date.Package services can be cancelled before 48 hours to the event date. Cancellation cannot be done in 48 hours to the event date.",
      },
      {
        question: "HOW IS THE REFUND POLICY?",
        answer:
          "All individual services can be cancelled before one day (24 hours) to the event date. Cancellation done in 24 hours to the event date then 50% refund.Package services can be cancelled before 48 hours to the event date. Cancellation done in 48 hours to the event date then 50% refund",
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
