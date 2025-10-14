import React from "react";
import "./assets/css/CareerPage.css";

const CareerPage: React.FC = () => {
  return (
    <div className="career-page-container">
      <h1 className="career-title">Career Opportunity</h1>

      <section className="career-section">
        <h2 className="job-title">Business Manager (Head Operations)</h2>

        <h3 className="section-title">Roles & Responsibilities</h3>

        <div className="responsibility">
          <h4>Time Management:</h4>
          <ul>
            <li>
              Control how long it takes to complete tasks or events — crucial for
              successful event management.
            </li>
            <li>
              Keep the team energetic from start to closing of events,
              including overnight sessions.
            </li>
            <li>
              Manage delivery team services efficiently through pre-planning and
              timely coordination.
            </li>
          </ul>
        </div>

        <div className="responsibility">
          <h4>Organizational Skills:</h4>
          <ul>
            <li>
              Track multiple tasks simultaneously and delegate effectively to
              delivery teams and supervisors.
            </li>
            <li>
              Maintain proper organizational systems and report timely updates
              to higher authorities.
            </li>
            <li>
              Handle vendor infrastructure issues, delays, or permission
              problems with client coordination and clear explanations.
            </li>
            <li>
              Be prepared for unexpected situations like rain, power issues, or
              urgent requirements — always have a backup plan.
            </li>
          </ul>
        </div>

        <div className="responsibility">
          <h4>Leadership:</h4>
          <ul>
            <li>
              Lead teams, manage vendors, and coordinate with clients to ensure
              event success.
            </li>
            <li>
              Train delivery teams for event-specific roles and ensure
              consistent service quality.
            </li>
            <li>
              Motivate and drive the team toward end-to-end event completion.
            </li>
          </ul>
        </div>

        <div className="responsibility">
          <h4>Problem Solving & Creativity:</h4>
          <ul>
            <li>
              Develop unique ideas and solutions that align with the client’s
              vision while staying within budget.
            </li>
            <li>
              Troubleshoot problems that arise during events efficiently.
            </li>
            <li>
              Think imaginatively and innovatively to make each event memorable.
            </li>
          </ul>
        </div>

        <div className="responsibility">
          <h4>Communication Skills:</h4>
          <ul>
            <li>
              Communicate proactively with clients, vendors, and team members to
              ensure alignment and accountability.
            </li>
          </ul>
        </div>

        <div className="responsibility">
          <h4>Attention to Detail:</h4>
          <ul>
            <li>
              Manage multiple tasks, service providers, and suppliers while
              maintaining client satisfaction.
            </li>
          </ul>
        </div>

        <div className="responsibility">
          <h4>Vendor Negotiation:</h4>
          <ul>
            <li>
              Negotiate custom vendor services and pricing based on event
              requirements.
            </li>
          </ul>
        </div>

        <div className="responsibility">
          <h4>Budget Management:</h4>
          <ul>
            <li>
              Manage event finances effectively to ensure budget compliance and
              successful delivery.
            </li>
          </ul>
        </div>

        <div className="responsibility">
          <h4>Client Interaction:</h4>
          <ul>
            <li>
              Engage positively with clients and manage sudden requirements with
              flexibility and clear communication.
            </li>
            <li>
              Handle billing discussions and clearances politely and
              professionally.
            </li>
          </ul>
        </div>
      </section>

      <div className="apply-section">
        <h3>Interested in this role?</h3>
        <p>
          Send your updated resume to{" "}
          <a href="mailto:careers@bookmypartys.com">careers@bookmypartys.com</a>{" "}
          with the subject line{" "}
          <strong>“Application - Business Manager (Head Operations)”</strong>.
        </p>
        <button className="apply-button" onClick={() => window.location.href = "mailto:careers@bookmypartys.com"}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default CareerPage;
