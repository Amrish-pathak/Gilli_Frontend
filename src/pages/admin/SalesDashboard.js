import React, { useEffect, useState } from "react";
import axios from "axios";
import { DashboardCards } from "../../Components/DashboardCards";
import { SalesChart } from "../../Components/SalesChart";
import { SalesPie } from "../../Components/SalesPie";
import { SalesBar } from "../../Components/SalesBar";
import { SalesTable } from "../../Components/SalesTable";

export default function SalesDashboard() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios
      .get("https://gullibackend.onrender.com/api/admin/sales")
      .then((res) => setSales(res.data))
      .catch((err) => console.error("Failed to fetch sales:", err));
  }, []);

  // Convert all submittedAt fields to Date objects once
  const parsedSales = sales.map((s) => ({
    ...s,
    date: new Date(s.submittedAt),
  }));

  const total = parsedSales.reduce((sum, s) => sum + Number(s.amount), 0);
  const todaySales = parsedSales.filter(
    (s) => s.date.toDateString() === new Date().toDateString()
  );
  const monthlySales = parsedSales.filter(
    (s) =>
      s.date.getMonth() === new Date().getMonth() &&
      s.date.getFullYear() === new Date().getFullYear()
  );
  const avgSale = parsedSales.length
    ? (total / parsedSales.length).toFixed(2)
    : 0;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <DashboardCards
        total={total}
        monthly={(monthlySales.length * avgSale).toFixed(2)}
        today={(todaySales.length * avgSale).toFixed(2)}
        avg={avgSale}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <SalesChart sales={parsedSales} />
        <SalesPie sales={parsedSales} />
        <SalesBar sales={parsedSales} />
      </div>

      <div className="mt-8">
        <SalesTable sales={parsedSales} />
      </div>
    </div>
  );
}
