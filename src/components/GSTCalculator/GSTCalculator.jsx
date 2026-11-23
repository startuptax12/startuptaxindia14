
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Calculator,
  ReceiptText,
  Percent,
  Landmark,
  ShieldCheck,
  Zap,
  LockKeyhole,
  Headset,
  Info,
} from "lucide-react";
import "./GSTCalculator.css";

/*
 * Keep supported GST rates in one place so they can be updated
 * without changing the calculator logic.
 */
const GST_RATES = [0, 3, 5, 12, 18, 28];

const MAX_AMOUNT = 999999999999.99;

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const formatRate = (rate) => `${rate}%`;

function calculateGST(amount, rate, includesGST, transactionType) {
  const multiplier = 1 + rate / 100;

  const taxableAmount = includesGST
    ? amount / multiplier
    : amount;

  const gstAmount = includesGST
    ? amount - taxableAmount
    : amount * (rate / 100);

  const totalAmount = includesGST
    ? amount
    : amount + gstAmount;

  const isInterState = transactionType === "interstate";

  return {
    taxableAmount,
    gstAmount,
    totalAmount,
    cgst: isInterState ? 0 : gstAmount / 2,
    sgst: isInterState ? 0 : gstAmount / 2,
    igst: isInterState ? gstAmount : 0,
  };
}

function ResultRow({ label, value, emphasis = false }) {
  return (
    <div
      className={`gst-calculator__result-row ${
        emphasis ? "gst-calculator__result-row--emphasis" : ""
      }`}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function GSTCalculator() {
  const reduceMotion = useReducedMotion();

  const [amountInput, setAmountInput] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [includesGST, setIncludesGST] = useState(false);
  const [transactionType, setTransactionType] = useState("intrastate");
  const [validationMessage, setValidationMessage] = useState("");

  const amount = Number(amountInput);
  const rate = Number(gstRate);

  const isAmountValid =
    amountInput.trim() !== "" &&
    Number.isFinite(amount) &&
    amount > 0 &&
    amount <= MAX_AMOUNT;

  const isRateValid =
    gstRate !== "" &&
    Number.isFinite(rate) &&
    GST_RATES.includes(rate);

  const results = useMemo(() => {
    if (!isAmountValid || !isRateValid) {
      return null;
    }

    return calculateGST(
      amount,
      rate,
      includesGST,
      transactionType
    );
  }, [
    amount,
    rate,
    includesGST,
    transactionType,
    isAmountValid,
    isRateValid,
  ]);

  const handleAmountChange = (event) => {
    const nextValue = event.target.value;

    if (nextValue === "") {
      setAmountInput("");
      setValidationMessage("");
      return;
    }

    // Allow only a non-negative decimal number with up to two decimals.
    if (!/^\d*\.?\d{0,2}$/.test(nextValue)) {
      return;
    }

    const nextAmount = Number(nextValue);

    if (nextAmount > MAX_AMOUNT) {
      setValidationMessage("Please enter an amount within the supported limit.");
      return;
    }

    setAmountInput(nextValue);
    setValidationMessage("");
  };

  const handleCalculate = (event) => {
    event.preventDefault();

    if (!amountInput.trim()) {
      setValidationMessage("Please enter an amount.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setValidationMessage("Enter an amount greater than zero.");
      return;
    }

    if (amount > MAX_AMOUNT) {
      setValidationMessage("The amount exceeds the supported limit.");
      return;
    }

    if (!isRateValid) {
      setValidationMessage("Please select a valid GST rate.");
      return;
    }

    setValidationMessage("");
  };

  const animationProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.45, ease: "easeOut" },
      };

  return (
    <section
      id="gst-calculator"
      className="gst-calculator"
      aria-labelledby="gst-calculator__title"
    >
      <div className="gst-calculator__container">
        <motion.div
          className="gst-calculator__intro"
          {...animationProps}
        >
          <span className="gst-calculator__eyebrow">
            <Calculator size={15} aria-hidden="true" />
            GST CALCULATOR
          </span>

          <h2 id="gst-calculator__title">
            Calculate your GST
            <span> in seconds.</span>
          </h2>

          <p>
            Enter your amount, choose a GST rate and get an
            instant breakdown of your tax.
          </p>
        </motion.div>

        <motion.div
          className="gst-calculator__panel"
          {...animationProps}
          transition={
            reduceMotion
              ? undefined
              : { duration: 0.5, delay: 0.08, ease: "easeOut" }
          }
        >
          {/* Input panel */}
          <form
            className="gst-calculator__form"
            onSubmit={handleCalculate}
            noValidate
          >
            <div className="gst-calculator__form-heading">
              <span className="gst-calculator__heading-icon">
                <Calculator size={23} aria-hidden="true" />
              </span>

              <div>
                <h3>GST Calculator</h3>
                <p>Enter your amount and tax rate.</p>
              </div>
            </div>

            <div className="gst-calculator__field">
              <label htmlFor="gst-calculator-amount">
                Amount (₹)
              </label>

              <div className="gst-calculator__input-wrap">
                <span aria-hidden="true">₹</span>
                <input
                  id="gst-calculator-amount"
                  name="amount"
                  type="number"
                  min="0.01"
                  max={MAX_AMOUNT}
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Enter amount"
                  value={amountInput}
                  onChange={handleAmountChange}
                  aria-describedby="gst-calculator-amount-help"
                  required
                />
              </div>

              <small id="gst-calculator-amount-help">
                Enter the amount in Indian rupees.
              </small>
            </div>

            <div className="gst-calculator__field">
              <label htmlFor="gst-calculator-rate">
                GST Rate
              </label>

              <select
                id="gst-calculator-rate"
                name="gstRate"
                value={gstRate}
                onChange={(event) => {
                  setGstRate(event.target.value);
                  setValidationMessage("");
                }}
                required
              >
                {GST_RATES.map((gst) => (
                  <option key={gst} value={gst}>
                    {formatRate(gst)}
                  </option>
                ))}
              </select>
            </div>

            <div className="gst-calculator__field">
              <label htmlFor="gst-calculator-transaction">
                Transaction type
              </label>

              <select
                id="gst-calculator-transaction"
                name="transactionType"
                value={transactionType}
                onChange={(event) =>
                  setTransactionType(event.target.value)
                }
              >
                <option value="intrastate">
                  Intra-state (CGST + SGST)
                </option>
                <option value="interstate">
                  Inter-state (IGST)
                </option>
              </select>
            </div>

            <label
              className="gst-calculator__toggle-row"
              htmlFor="gst-calculator-inclusive"
            >
              <input
                id="gst-calculator-inclusive"
                type="checkbox"
                checked={includesGST}
                onChange={(event) =>
                  setIncludesGST(event.target.checked)
                }
              />

              <span className="gst-calculator__toggle" aria-hidden="true" />

              <span>Amount includes GST</span>

              <span className="gst-calculator__info">
                <Info size={15} aria-hidden="true" />
              </span>
            </label>

            <p className="gst-calculator__hint">
              {includesGST
                ? "We'll extract the GST included in your entered amount."
                : "GST will be added to your entered amount."}
            </p>

            {validationMessage && (
              <p
                className="gst-calculator__error"
                role="alert"
              >
                {validationMessage}
              </p>
            )}

            <button
              type="submit"
              className="gst-calculator__submit"
            >
              <Calculator size={18} aria-hidden="true" />
              Calculate GST
            </button>

            <p className="gst-calculator__disclaimer">
              This is an estimate. Confirm the applicable rate
              and tax treatment for your transaction.
            </p>
          </form>

          {/* Live results panel */}
          <div
            className="gst-calculator__results"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="gst-calculator__results-heading">
              <span className="gst-calculator__results-icon">
                <ReceiptText size={22} aria-hidden="true" />
              </span>

              <div>
                <span className="gst-calculator__results-kicker">
                  YOUR BREAKDOWN
                </span>
                <h3>Estimated Result</h3>
                <p>Calculated from your entered details.</p>
              </div>
            </div>

            <div className="gst-calculator__total-card">
              <span>Total Amount</span>
              <strong>
                {results ? formatINR(results.totalAmount) : "—"}
              </strong>
              {!results && (
                <small>Enter an amount to see your results.</small>
              )}
            </div>

            <div className="gst-calculator__result-list">
              <ResultRow
                label="Taxable Amount"
                value={
                  results ? formatINR(results.taxableAmount) : "—"
                }
              />

              <ResultRow
                label={`GST Amount (${formatRate(
                  isRateValid ? rate : 0
                )})`}
                value={results ? formatINR(results.gstAmount) : "—"}
                emphasis
              />

              {transactionType === "intrastate" ? (
                <>
                  <ResultRow
                    label={`CGST (${formatRate(
                      isRateValid ? rate / 2 : 0
                    )})`}
                    value={results ? formatINR(results.cgst) : "—"}
                  />

                  <ResultRow
                    label={`SGST (${formatRate(
                      isRateValid ? rate / 2 : 0
                    )})`}
                    value={results ? formatINR(results.sgst) : "—"}
                  />
                </>
              ) : (
                <ResultRow
                  label={`IGST (${formatRate(
                    isRateValid ? rate : 0
                  )})`}
                  value={results ? formatINR(results.igst) : "—"}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <div className="gst-calculator__trust">
          <div className="gst-calculator__trust-item">
            <span className="gst-calculator__trust-icon gst-calculator__trust-icon--blue">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>Transparent Results</strong>
              <span>See each tax component</span>
            </div>
          </div>

          <div className="gst-calculator__trust-item">
            <span className="gst-calculator__trust-icon gst-calculator__trust-icon--green">
              <Zap size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>Instant Calculation</strong>
              <span>Updates as you edit</span>
            </div>
          </div>

          <div className="gst-calculator__trust-item">
            <span className="gst-calculator__trust-icon gst-calculator__trust-icon--purple">
              <LockKeyhole size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>Privacy Conscious</strong>
              <span>Calculated in your browser</span>
            </div>
          </div>

          <a
            href="#contact"
            className="gst-calculator__trust-item gst-calculator__trust-link"
          >
            <span className="gst-calculator__trust-icon gst-calculator__trust-icon--orange">
              <Headset size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>Need Expert Help?</strong>
              <span>Contact our team</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
