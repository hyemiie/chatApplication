import React from "react";
import "./features2.css";
import { CheckCircle, Shield, Zap, Layers, Users, Clock } from "lucide-react";

const features = [
  {
    icon: <CheckCircle />,
    title: "Easy Validation",
    description: "Built-in rules and error handling so forms behave like magic.",
  },
  {
    icon: <Shield />,
    title: "Secure by Default",
    description: "Your data is protected with end-to-end encryption and best practices.",
  },
  {
    icon: <Zap />,
    title: "Fast Integration",
    description: "Spin up a company chat room instantly — no setup, no config, just start chatting",
  },
  {
    icon: <Layers />,
    title: "Composable",
    description: "Works with your favorite frameworks and UI libraries.",
  },
  {
    icon: <Users />,
    title: "Collaboration Ready",
    description: "Team-based Rooms and history out of the box.",
  },
  {
    icon: <Clock />,
    title: "Real-time Sync",
    description: "Instant Responses and live updates with minimal setup.",
  },
];

export default function FeaturedSection() {
  return (
    <section className="featured-section">
      {/* <div className="featured-header">
        <h2>Built for developers who care about speed, security, and sanity</h2>
        <p>Everything you need to handle forms — without the friction.</p>
      </div> */}

      <div className="featured-grid">
        {features.map((feat, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feat.icon}</div>
            <h3>{feat.title}</h3>
            <p>{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
