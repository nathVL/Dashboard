import PropTypes from "prop-types";

function MetricItem({ title, value, unit}) {
  return (
    <div className={`bg-gray-100 rounded-lg p-4`}>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-lg font-semibold mt-1">
        {value || '--'} {unit}
      </p>
    </div>
  );
}

MetricItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  unit: PropTypes.string
};

export default MetricItem;