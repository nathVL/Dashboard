import formatBytes from "../../utils/formatBytes.js";
import PieChartWrapper from "../Chart/PieChartWrapper.jsx";
import MetricItem from "../Item/MetricItem.jsx";
import PropTypes from "prop-types";

function DiskCard({ diskData }) {
  const diskUsage = diskData?.usage || 0;

  const chartData = [
    { name: 'Used', value: diskUsage },
    { name: 'Free', value: 100 - diskUsage }
  ];

  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <h2 className="text-xl font-semibold mb-2 col-span-2">Mémoire stats</h2>

        {/* Case 1: Graph */}
        <div className="bg-white p-4 rounded-lg shadow-md relative">
          <PieChartWrapper data={chartData} percent={diskUsage}/>
        </div>

        {/* Case 2: Total */}
        <MetricItem
          title='Espace total'
          value={diskData?.total ? formatBytes(diskData.total) : '--'}
        />

        {/* Case 3: Use */}
        <MetricItem
          title='Espace utilisé'
          value={diskData?.total ? formatBytes(diskData.used) : '--'}
        />

        {/* Case 4: Free */}
        <MetricItem
          title='Espace libre'
          value={diskData.total ? formatBytes(diskData.total - diskData.used) : '--'}
        />
      </div>
    </div>
  );
}

DiskCard.propTypes = {
  diskData: PropTypes.shape({
    usage: PropTypes.number.isRequired,
    total: PropTypes.number,
    used: PropTypes.number
  }).isRequired
};

export default DiskCard;