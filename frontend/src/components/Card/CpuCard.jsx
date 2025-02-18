import secondsToReadable from '../../utils/formatDate.js'
import PieChartWrapper from "../Chart/PieChartWrapper.jsx";
import MetricItem from "../Item/MetricItem.jsx";
import PropTypes from "prop-types";

function CpuCard({ cpuData, uptime }) {
  const cpuUsage = cpuData?.usage || 0;

  const chartData = [
    { name: 'Used', value: cpuUsage },
    { name: 'Free', value: 100 - cpuUsage }
  ];

  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <h2 className="text-xl font-semibold mb-2 col-span-2">Processeur stats</h2>

        {/* Case 1: Graph */}
        <div className="bg-white p-4 rounded-lg shadow-md relative">
          <PieChartWrapper data={chartData} percent={cpuUsage}/>
        </div>

        {/* Case 2: Temperature */}
        <MetricItem
          title='Température'
          value={cpuData?.temperature}
          unit='°C'
        />

        {/* Case 3: Frequence */}
        <MetricItem
          title='Fréquence du CPU'
          value={cpuData?.frequency}
          unit='MHz'
        />

        {/* Case 4: Uptime */}
        <MetricItem
          title='Durée de fonctionnement'
          value={uptime ? secondsToReadable(uptime) : '--'}
        />
      </div>
    </div>
  );
}

CpuCard.propTypes = {
  cpuData: PropTypes.arrayOf(
    PropTypes.shape({
      usage: PropTypes.number.isRequired,
      temperature: PropTypes.number,
      frequency: PropTypes.number
    })
  ).isRequired,
  uptime: PropTypes.number.isRequired
}

export default CpuCard;