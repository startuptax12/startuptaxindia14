
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { faqs } from "../../data/siteData";
import SectionHeading from "../SectionHeading";
import "./FAQ.css";

export default function FAQ() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const toggleFAQ = (index) => {
    setActive((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      className="gst-section gst-section--white faq-section"
      aria-labelledby="faq-title"
    >
      <div className="gst-container faq-container">

        {/* Section Heading */}
        <motion.div
          className="faq-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered clearly."
            description="Still unsure? Talk to an expert and we will help you choose the right service."
          />
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="faq-list"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          {faqs.map(([question, answer], index) => {
            const isActive = active === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article
                className={`faq-item ${
                  isActive ? "faq-item--active" : ""
                }`}
                key={question}
              >
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isActive}
                  aria-controls={answerId}
                >
                  <span className="faq-item__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="faq-item__question-text">
                    {question}
                  </span>

                  <span className="faq-item__icon">
                    <ChevronDown
                      size={19}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={answerId}
                      className="faq-item__answer"
                      initial={
                        reduceMotion
                          ? false
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        reduceMotion
                          ? undefined
                          : { height: 0, opacity: 0 }
                      }
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="faq-item__answer-inner">
                        <p>{answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </motion.div>

        {/* Bottom Contact CTA */}
        <motion.div
          className="faq-bottom"
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="faq-bottom__content">
            <span className="faq-bottom__eyebrow">
              STILL HAVE QUESTIONS?
            </span>

            <h3>Let's make compliance simpler.</h3>

            <p>
              Our team is ready to help you find the right solution
              for your business.
            </p>
          </div>

          <a href="/enquiry" className="faq-bottom__button">
            Talk to an Expert
            <span aria-hidden="true">↗</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
