import React, { useEffect, useState } from "react";

const TDLManagement = () => {
  const [tdlList, setTdlList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTdlList = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://gullibackend.onrender.com/api/tdls");  // Backend API call
        const data = await response.json();
        setTdlList(data);
      } catch (error) {
        console.error("Error fetching TDL List: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTdlList();
  }, []);

  const handleDownload = async (filePath) => {
    try {
      const response = await fetch(`https://gullibackend.onrender.com/${filePath}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',  // Ensure the content is recognized as a binary stream
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch the file');
      }
  
      const blob = await response.blob();  // Create a Blob from the response
      const url = window.URL.createObjectURL(blob);  // Create an object URL for the file
  
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePath);  // Set the file name to download
      document.body.appendChild(link);
      link.click();  // Programmatically click the link to start the download
  
      // Clean up by revoking the object URL after the download starts
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  

  return (
    <div className="mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-4xl font-bold text-center text-blue-600 mb-6">
        List of TDLs
      </h2>
      {loading ? (
  <div className="w-full sm:w-[90%] mx-auto border border-gray-400 shadow-lg bg-white p-4 rounded-lg">
    {[...Array(5)].map((_, idx) => (
      <div
        key={idx}
        className="grid sm:grid-cols-[1fr_2fr_5fr_2fr_1fr] grid-cols-1 gap-2 sm:gap-0 p-3 border border-gray-200 items-center animate-pulse"
      >
        <div className="h-4 bg-gray-300 rounded w-10"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-8 bg-gray-300 rounded w-20 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-12 mx-auto"></div>
      </div>
    ))}
  </div>
) : (

        <div className="w-full sm:w-[90%] mx-auto border border-gray-400 shadow-lg bg-white p-4 rounded-lg">
          <div className="hidden sm:grid grid-cols-[1fr_2fr_5fr_2fr_1fr] bg-blue-500 text-white font-bold p-3 border border-gray-400 items-center">
            <div className="text-left">Sr. No</div>
            <div className="text-left">Name</div>
            <div className="text-left">Objective</div>
            <div className="text-center">Download</div>
            <div className="text-center">Details</div>
          </div>
          {tdlList.map((item) => (
            <div
              key={item.id}
              className="grid sm:grid-cols-[1fr_2fr_5fr_2fr_1fr] grid-cols-1 gap-2 sm:gap-0 p-3 border border-gray-400 hover:bg-gray-100 items-center text-sm sm:text-base"
            >
              <div className="text-left font-semibold sm:font-normal">{item.index}</div>
              <div className="text-left font-semibold sm:font-normal">{item.name}</div>
              <div className="text-left font-semibold sm:font-normal">{item.objective}</div>
              <div className="flex justify-center">
                <button
                  onClick={() => handleDownload(item.filePath)}  // Call the download function
                  className="text-center bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Download
                </button>
              </div>
              <div className="flex justify-center">
                <button className="text-blue-500 hover:text-blue-700 font-medium">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TDLManagement;
