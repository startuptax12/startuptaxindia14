
import { motion, useReducedMotion } from "framer-motion";
import { comparisons } from "../../data/siteData";
import SectionHeading from "../SectionHeading";
import "./CompareStructures.css";

const columns = [
  "Feature",
  "Private Limited",
  "LLP",
  "One Person Company",
];

export default function CompareStructures() {
  const reduceMotion = useReducedMotion();

  const getCellClassNames = (columnIndex, isFeature) => {
    const classNames = ["gst-compare__cell"];

    if (columnIndex === 1) {
      classNames.push("gst-compare__cell--featured");
    }

    if (isFeature) {
      classNames.push("gst-compare__cell--feature");
    }

    return classNames.join(" ");
  };

  const getStatusDotClassNames = (isLastRow) =>
    [
      "gst-compare__dot",
      isLastRow ? "gst-compare__dot--neutral" : "gst-compare__dot--success",
    ].join(" ");

  return (
    <section
      id="compare-structures"
      className="gst-compare"
      aria-labelledby="gst-compare__title"
    >
      <div className="gst-compare__container">
        <motion.div
          className="gst-compare__heading"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeading
            id="gst-compare__title"
            eyebrow="COMPARE BUSINESS STRUCTURES"
            title="Choose the right structure for your business."
            description="Compare key factors to understand which business structure may suit your goals."
          />
        </motion.div>

        <motion.div
          className="gst-compare__table-wrap"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          role="region"
          aria-label="Business structure comparison table"
          tabIndex={0}
        >
          <table className="gst-compare__table">
            <caption className="gst-compare__caption">
              Business structure comparison overview
            </caption>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={
                      index === 1
                        ? "gst-compare__header gst-compare__header--featured"
                        : "gst-compare__header"
                    }
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisons.map((row, rowIndex) => {
                const isLastRow = rowIndex === comparisons.length - 1;

                return (
                  <tr key={row[0]}>
                    {row.map((value, columnIndex) => {
                      const isFeature = columnIndex === 0;

                      return (
                        <td
                          key={`${row[0]}-${columnIndex}`}
                          className={getCellClassNames(columnIndex, isFeature)}
                        >
                          {isFeature ? (
                            value
                          ) : (
                            <span className="gst-compare__value">
                              <span
                                className={getStatusDotClassNames(isLastRow)}
                                aria-hidden="true"
                              />
                              <span>{value}</span>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
