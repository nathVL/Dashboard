import useLiveData from "../hooks/useLiveData.jsx";
import CpuCard from "./Card/CpuCard.jsx";
import DiskCard from "./Card/DiskCard.jsx";
import MemoryCard from "./Card/MemoryCard.jsx";
import HistoryGraph from "./HistoryGraph.jsx";
import useHistoryData from "../hooks/useHistoryData.jsx";

function Dashboard() {
    const { data: liveData, loading: liveLoading, error: liveError } = useLiveData(500);
    const { data: historyData, loading: historyLoading, error: historyError } = useHistoryData();

    if (liveLoading || historyLoading) return <p>Chargement...</p>;
    if (liveError) return <p>Erreur temps réel: {liveError.message}</p>;
    if (historyError) return <p>Erreur historique: {historyError.message}</p>;

  return (
  <div className="container mx-auto px-4 py-8">
    <div className="flex space-x-4">
      <CpuCard cpuData={liveData.CPU} uptime={liveData.SYSTEM.uptime}/>
      <MemoryCard memoryData={liveData.RAM}/>
      <DiskCard diskData={liveData.DISK}/>
    </div>
    <div className="flex space-x-2">
      <HistoryGraph data={historyData}/>
    </div>
  </div>
  );
}

export default Dashboard;