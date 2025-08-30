import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  const steps = [
    {
      icon: <LuUserPlus />,
      title: "Create an Account",
      description: "Sign up for a free account as a job seeker or employer. Set up your profile in minutes to start posting jobs or applying for jobs. Customize your profile to highlight your skills or requirements."
    },
    {
      icon: <VscTasklist />,
      title: "Post or Browse Jobs",
      description: "Employers can post detailed job descriptions, and job seekers can browse a comprehensive list of available positions. Utilize filters to find jobs that match your skills and preferences."
    },
    {
      icon: <BiSolidLike />,
      title: "Hire or Get Hired",
      description: "Employers can shortlist candidates and extend job offers. Job seekers can review job offers and accept positions that align with their career goals."
    }
  ];

  return (
    <section className="howItWorks">
      <div className="container">
        <div className="section-header">
          <h2>How does it work?</h2>
          <p>Simple steps to find your next opportunity or the perfect candidate</p>
        </div>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <div className="step-number">0{index + 1}</div>
              <div className="step-icon">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;