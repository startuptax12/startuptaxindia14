import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pause,
  Play,
} from "lucide-react";

import { pricing } from "../../data/siteData";
import SectionHeading from "../SectionHeading";
import "./Pricing.css";

const AUTOPLAY_DELAY = 5000;
const ENQUIRY_PATH = "/enquiry";

export default function Pricing() {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  const totalPlans = pricing.length;

  // Automatic carousel rotation
  useEffect(() => {
    if (isPaused || prefersReducedMotion || totalPlans <= 3) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setStartIndex((current) => (current + 1) % totalPlans);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion, totalPlans]);

  if (!totalPlans) {
    return null;
  }

  // Display only three pricing cards at a time
  const visiblePlans = Array.from(
    { length: Math.min(3, totalPlans) },
    (_, position) => pricing[(startIndex + position) % totalPlans]
  );

  // Navigation
  const goToNext = () => {
    setStartIndex((current) => (current + 1) % totalPlans);
  };

  const goToPrevious = () => {
    setStartIndex(
      (current) => (current - 1 + totalPlans) % totalPlans
    );
  };

  const handleFocus = () => {
    setIsPaused(true);
  };

  return (
    <section
      id="pricing"
      className="gst-pricing"
      aria-labelledby="gst-pricing__title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={handleFocus}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="gst-pricing__container">

        {/* SECTION HEADING */}
        <div className="gst-pricing__heading">
          <SectionHeading
            eyebrow="Clear, Transparent Pricing"
            title="The right support for your next stage of growth."
            description="Explore our registration and compliance services with clear starting prices. Select a service to discuss your requirements."
          />
        </div>

        {/* TOP INFORMATION */}
        <div className="gst-pricing__topbar">
          <div className="gst-pricing__topbar-copy">
            <span className="gst-pricing__eyebrow">
              SERVICE PACKAGES
            </span>

            <p>
              Professional support. No unnecessary complexity.
            </p>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="gst-pricing__viewport">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={startIndex}
              className="gst-pricing__grid"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, y: -8 }
              }
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {visiblePlans.map((plan, index) => {
                const isFeatured =
                  index === 1 && visiblePlans.length === 3;

                return (
                  <motion.article
                    key={plan.name}
                    className={`gst-pricing__card ${
                      isFeatured
                        ? "gst-pricing__card--featured"
                        : ""
                    }`}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 18 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion
                        ? 0
                        : index * 0.07,
                    }}
                  >
                    {/* POPULAR BADGE */}
                    {isFeatured && (
                      <span className="gst-pricing__popular">
                        Most Popular
                      </span>
                    )}

                    {/* CARD HEADING */}
                    <div className="gst-pricing__card-heading">
                      <span className="gst-pricing__plan-label">
                        {isFeatured
                          ? "RECOMMENDED SERVICE"
                          : index === 0
                            ? "GET STARTED"
                            : "BUSINESS COMPLIANCE"}
                      </span>

                      <h3 className="gst-pricing__plan-name">
                        {plan.name}
                      </h3>

                      <p className="gst-pricing__description">
                        {plan.description}
                      </p>
                    </div>

                    {/* PRICE */}
                    <div className="gst-pricing__price-area">
                      <span className="gst-pricing__price">
                        {plan.price}
                      </span>

                      <span className="gst-pricing__price-caption">
                        Starting price
                      </span>
                    </div>

                    <div className="gst-pricing__divider" />

                    {/* FEATURES */}
                    <ul className="gst-pricing__features">
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <span className="gst-pricing__check">
                            <Check
                              size={14}
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                          </span>

                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ENQUIRY BUTTON */}
                    <a
                      href={`${ENQUIRY_PATH}?service=${encodeURIComponent(
                        plan.name
                      )}`}
                      className={`gst-pricing__button ${
                        isFeatured
                          ? "gst-pricing__button--featured"
                          : ""
                      }`}
                    >
                      {isFeatured
                        ? "Choose This Service"
                        : "Make an Enquiry"}
                    </a>

                    <p className="gst-pricing__note">
                      Final quote confirmed after requirement review.
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM FOOTER AND CAROUSEL CONTROLS */}
        <div className="gst-pricing__footer">

          {/* PROGRESS */}
          <div className="gst-pricing__footer-info">
            <div
              className="gst-pricing__progress"
              aria-hidden="true"
            >
              <motion.span
                animate={{
                  width: `${((startIndex + 1) / totalPlans) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <p>
              Showing {visiblePlans.length} of {totalPlans} services
            </p>
          </div>

          {/* CAROUSEL CONTROLS */}
          <div className="gst-pricing__footer-actions">

            <span
              className="gst-pricing__counter"
              aria-live="polite"
            >
              {String(startIndex + 1).padStart(2, "0")} /{" "}
              {String(totalPlans).padStart(2, "0")}
            </span>

            <button
              type="button"
              className="gst-pricing__control"
              onClick={goToPrevious}
              aria-label="Previous pricing services"
              disabled={totalPlans <= 3}
            >
              <ArrowLeft size={17} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="gst-pricing__control"
              onClick={goToNext}
              aria-label="Next pricing services"
              disabled={totalPlans <= 3}
            >
              <ArrowRight size={17} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="gst-pricing__control gst-pricing__play"
              onClick={() => setIsPaused((current) => !current)}
              aria-label={
                isPaused
                  ? "Resume automatic rotation"
                  : "Pause automatic rotation"
              }
              aria-pressed={isPaused}
              disabled={prefersReducedMotion || totalPlans <= 3}
            >
              {isPaused ? (
                <Play size={15} aria-hidden="true" />
              ) : (
                <Pause size={15} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* ENQUIRY LINK */}
          <a
            href={ENQUIRY_PATH}
            className="gst-pricing__all-services"
          >
            Discuss your requirements
          </a>

        </div>
      </div>
    </section>
  );
}