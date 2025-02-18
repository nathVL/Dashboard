import formatBytes from "../../utils/formatBytes.js";
import PieChartWrapper from "../Chart/PieChartWrapper.jsx";
import MetricItem from "../Item/MetricItem.jsx";
import PropTypes from "prop-types";


function MemoryCard({ memoryData }) {
  const memoryUsage = memoryData?.usage || 0;

  const chartData = [
    { name: 'Used', value: memoryUsage },
    { name: 'Free', value: 100 - memoryUsage }
  ];

  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <h2 className="text-xl font-semibold mb-2 col-span-2">Mémoire stats</h2>

        {/* Case 1: Graph */}
        <div className="bg-white p-4 rounded-lg shadow-md relative">
          <PieChartWrapper data={chartData} percent={memoryUsage}/>
        </div>

        {/* Case 2: Total */}
        <MetricItem
          title='RAM total'
          value={memoryData.total ? formatBytes(memoryData.total) : '--'}
        />

        {/* Case 3: Use */}
        <MetricItem
          title='RAM utilisé'
          value={memoryData.total ? formatBytes(memoryData.used) : '--'}
        />

        {/* Case 4: Free */}
        <MetricItem
          title='RAM utilisé'
          value={memoryData.total ? formatBytes(memoryData.total - memoryData.used) : '--'}
        />
      </div>
    </div>
  );
}

MemoryCard.propTypes = {
  memoryData: PropTypes.arrayOf(
    PropTypes.shape({
      usage: PropTypes.number.isRequired,
      total: PropTypes.number,
      used: PropTypes.number
    })
  ).isRequired
};

export default MemoryCard;