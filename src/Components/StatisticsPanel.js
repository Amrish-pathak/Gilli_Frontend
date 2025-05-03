import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, Users, FileText, HelpCircle, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatisticsPanel = () => {
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalTdl, setTotalTdl] = useState(0);
  const [totalTranning, setTotalTranning] = useState(0);
  const [totalEnquary, setTotalEnquary] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchStatistics();
    // const interval = setInterval(fetchStatistics, 60000); // auto-refresh every 60 seconds
    // return () => clearInterval(interval);
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://gullibackend.onrender.com/admin/statistics");
      const data = await response.json();

      if (data.success) {
        setTotalProduct(data.totalProduct);
        setTotalTdl(data.totalTdl);
        setTotalSales(data.totalSales);
        setTotalTranning(data.totalTranning);
        setTotalEnquary(data.totalEnquary);
      } else {
        console.error("Failed to fetch statistics:", data.error);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (typeof num !== "number") return "Invalid number";
    if (num < 1 && num.toString().split('.')[1]?.length > 3) {
      return num.toFixed(6).replace(/0+$/, '');
    }
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const statista = [
    { title: 'Total Products', count: totalProduct, icon: <Package />, link: '/dashboardAdx/productmanager' },
    { title: 'Total Tdls', count: totalTdl, icon: <FileText />, link: '/dashboardAdx/tdl' },
    { title: 'Total Training/Admission', count: totalTranning, icon: <Users />, link: '/dashboardAdx/admission-tranning' },
    { title: 'Total Sales', count: formatNumber(totalSales), icon: <DollarSign />, link: '/admin/sales' },
    { title: 'Total Enquiry', count: totalEnquary, icon: <HelpCircle />, link: '/dashboardAdx/enquary-manager' },
  ];

  const chartData = statista.map(stat => ({ name: stat.title, value: Number(stat.count) }));

  return (
    <>
      {loading ? (
        <div className="w-full h-[100vh] flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full flex flex-col space-y-6 p-4 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-xl font-semibold">Dashboard Overview</h2>
            <button onClick={fetchStatistics} className="flex items-center gap-1 text-sm text-white bg-[#333] hover:bg-[#444] px-3 py-1 rounded-full">
              <RefreshCcw size={16} /> Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {statista.map((stats, index) => (
              <a onClick={() => navigate(stats.link)} key={index} className="bg-[#1c1c1e] hover:shadow-xl transition-shadow rounded-2xl p-5 flex flex-col gap-2 cursor-pointer">
                <div className="flex items-center gap-3 text-[#aaa]">
                  {stats.icon}
                  <h2 className="text-base md:text-lg font-medium">{stats.title}</h2>
                </div>
                <span className="text-white text-2xl md:text-3xl font-bold">{stats.count}</span>
              </a>
            ))}
          </div>

          <div className="pt-8">
            <h3 className="text-white text-lg font-semibold mb-4">Insights Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="value" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default StatisticsPanel;
