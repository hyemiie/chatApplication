import React from "react";
import "./features.css";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alice Johnson",
      quote: "Team Chat has transformed how we communicate — it's fast and reliable!"
    },
    {
      name: "Mark Bassey",
      quote: "An essential tool for our remote team. The threaded chats keep us sane."
    },
    {
      name: "Sophie Lee",
      quote: "We love the file sharing and mentions. Super helpful during our sprints."
    }
    ,
      {
      name: "John Kim",
      quote: "We love the file sharing and mentions. Super helpful during our sprints."
    },
     {
      name: "John Kim",
      quote: "We love the file sharing and mentions. Super helpful during our sprints."
    }
  ];

  return (
   <section className="testimonials-section">
  <h2 className="testimonials-title">What Our Users Say</h2>
  <div className="testimonials-scroll-wrapper">
    <div className="testimonials-grid">
      {testimonials.map((t, i) => (
        <div key={i} className="testimonial-card">
          <p className="quote">{t.quote}</p>
          <p className="user">- {t.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}
