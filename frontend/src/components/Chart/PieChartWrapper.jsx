import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from "prop-types";

const DEFAULT_COLORS = ['#2563eb', '#e2e8f0'];

function PieChartWrapper({data, percent = 0, colors = DEFAULT_COLORS}) {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="70%"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-xl font-bold text-gray-700 block">
                {percent.toFixed(1)}%
            </span>
      </div>
    </div>
  );
}

PieChartWrapper.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  percent: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string)
};

export default PieChartWrapper;