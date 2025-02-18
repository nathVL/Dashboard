import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import PropTypes from "prop-types";

function HistoryGraph({ data }) {
  const transformedData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    usage: item.cpu_usage
  }));

  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-semibold mb-4">Utilisation du processeur les 24 dernières heures</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              interval={Math.floor(transformedData.length / 5)}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => [`${value}%`, 'Utilisation']}
            />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

HistoryGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      cpu_usage: PropTypes.number.isRequired
    })
  ).isRequired
};

export default HistoryGraph;