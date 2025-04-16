import React, { useState, useEffect } from 'react';


import Spinner from './Spinner';
import AdminHeader from './AdminHeader';



const StatisticsPanel = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalRef, setTotalRef] = useState(0);
  const [activeUsersLast24Hours, setActiveUsersLast24Hours] = useState(0);
  // eslint-disable-next-line

  const [activeUsersLast1Minute, setActiveUsersLast1Minute] = useState(0); // New state for last 1 minute
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);


  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://zudobot.coinfine.in/api/api/admin/statistics");
      const data = await response.json();
  
      if (data.success) {
        setTotalUsers(data.totalUsers);
        
        setTotalBalance(data.totalBalance);
        setTotalRef(data.totalRef);
        setActiveUsersLast24Hours(data.activeUsersLast24Hours);
        setActiveUsersLast1Minute(data.activeUsersLast1Minute);
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
    if (typeof num !== "number") {
      return "Invalid number";
    }
    
    // If the number is less than 1 and has more than 3 decimal places
    if (num < 1 && num.toString().split('.')[1]?.length > 3) {
      return num.toFixed(6).replace(/0+$/, ''); // Trims trailing zeroes
    }
    
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };


  const statista = [
    {
        title: 'Total Products',
        count: totalUsers,
    },
    {
        title: 'Total Tdls',
        count: (formatNumber(totalBalance)),
    },
    {
        title: 'Total Traning/Admission',
        count: (formatNumber(totalRef)),
    },
    {
        title: 'Total Sales',
        count: activeUsersLast24Hours,
    },
    {
      title: 'Approved Sales',
      count: activeUsersLast1Minute, // New entry for last 1 minute
    },
    {
      title: 'Pending Sales',
      count: activeUsersLast1Minute, // New entry for last 1 minute
    },
    {
        title: 'Total Enquiry',
        count: activeUsersLast24Hours,
    },
    {
      title: 'Completed Enquiry',
      count: activeUsersLast1Minute, // New entry for last 1 minute
    },
    {
      title: 'Pending Enquiry',
      count: activeUsersLast1Minute, // New entry for last 1 minute
    },
  ]





  return (
    <>
        {loading ? (
       
       <Spinner/>
      
   ) : (
    <div className="w-full flex flex-col space-y-4 h-[100vh] scroller pt-4 overflow-y-auto pb-[150px]">
    <div className="w-full flex justify-start items-start flex-wrap gap-4">
     
     {statista.map((stats, index) => (
              <div key={index} className={`bg-cards p-4 rounded-[10px] w-[47%] sm:w-[32%] h-[120px] flex flex-col justify-center space-y-3 ${statista.length === 5 ? 'last:w-full sm:last:w-[64%]' : '' }`}>
              <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#bdbdbd]">
                {stats.title}
                </h2>
              <span className='text-[20px] sm:text-[24px] text-[#fff] font-bold'>
                {stats.count}
                
                </span>
            </div>
     ))}

    </div>
    <h2 className='font-semibold text-white text-[17px] pt-3'>
        Admin Control Items
    </h2>

   {/* <AdminHeader/> */}
    </div>
  )}
    </>
  );
};

export default StatisticsPanel;
