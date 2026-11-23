
import { useState } from "react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="contact-grid">
        {/* LEFT CONTENT */}
        <div className="contact-copy">
          <span className="contact-copy__eyebrow">
            <span className="contact-copy__eyebrow-line" />
            LET'S TALK
          </span>

          <h2 id="contact-title" className="contact-copy__title">
            Have a requirement?
            <br />
            Let's make it simple.
          </h2>

          <p className="contact-copy__description">
            Share your requirement and our team will get back to
            you with the right next step.
          </p>

          {/* CONTACT DETAILS */}
          <div className="contact-details">
            <a href="mailto:hello@gstsite.in">
              <span className="contact-details__icon">
                <Mail size={17} />
              </span>
              <span>hello@gstsite.in</span>
            </a>

            <a href="tel:+919800012345">
              <span className="contact-details__icon">
                <Phone size={17} />
              </span>
              <span>+91 98000 12345</span>
            </a>

            <div className="contact-details__location">
              <span className="contact-details__icon">
                <MapPin size={17} />
              </span>
              <span>Bengaluru · Mumbai · Delhi NCR</span>
            </div>
          </div>

          {/* PRIVACY NOTE */}
          <div className="contact-note">
            <CheckCircle2 size={18} />

            <span>
              Your details are used only to respond to your enquiry.
            </span>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          className="contact-form"
          onSubmit={submit}
          onChange={() => setSent(false)}
        >
          <div className="contact-form__header">
            <span className="contact-form__eyebrow">
              GET IN TOUCH
            </span>

            <h3>Send us your enquiry</h3>

            <p>
              Fill in your details and our team will connect with you.
            </p>
          </div>

          {/* NAME + EMAIL */}
          <div className="contact-form__row">
            <label>
              Name <span>*</span>

              <input
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email <span>*</span>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>
          </div>

          {/* PHONE + SERVICE */}
          <div className="contact-form__row">
            <label>
              Phone <span>*</span>

              <input
                type="tel"
                name="phone"
                placeholder="+91 98XXXXXXXX"
                autoComplete="tel"
                pattern="[+]?[0-9\s()-]{10,16}"
                required
              />
            </label>

            <label>
              Service Required <span>*</span>

              <select name="service" defaultValue="" required>
                <option value="" disabled>
                  Select a service
                </option>

                <option>GST Registration</option>
                <option>Private Limited Company</option>
                <option>LLP Registration</option>
                <option>Trademark Registration</option>
                <option>MSME Registration</option>
                <option>NGO Registration</option>
                <option>ISO Certification</option>
                <option>CSR Registration</option>
                <option>Import Export Code</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          {/* MESSAGE */}
          <label className="contact-form__message">
            Message <span>*</span>

            <textarea
              name="message"
              rows="5"
              placeholder="Tell us what you need help with..."
              required
            />
          </label>

          {/* SUBMIT BUTTON */}
          <button
            className="contact-form__submit"
            type="submit"
            disabled={sent}
          >
            <span>
              {sent ? "Request Submitted" : "Send Enquiry"}
            </span>

            {sent ? (
              <CheckCircle2 size={18} />
            ) : (
              <Send size={17} />
            )}
          </button>

          {/* SUCCESS MESSAGE */}
          {sent && (
            <p
              className="contact-form__success"
              role="status"
              aria-live="polite"
            >
              Thank you! Your enquiry has been captured for follow-up.
            </p>
          )}

          <p className="contact-form__footer">
            <span>*</span> Required fields
          </p>
        </form>
      </div>
    </section>
  );
}
