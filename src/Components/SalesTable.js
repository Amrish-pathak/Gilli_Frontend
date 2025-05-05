import React from "react";

export const SalesTable = ({ sales }) => {
  return (
    <div className="bg-gray-800 w-full p-4 rounded-xl">
      <h2 className="text-white text-lg mb-4">Sales Table</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-white">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">Buyer Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Payment Method</th>
              <th className="px-4 py-2">Submitted At</th>
              <th className="px-4 py-2">Product</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{sale.buyerName}</td>
                <td className="px-4 py-2">{sale.email}</td>
                <td className="px-4 py-2">{sale.mobile}</td>
                <td className="px-4 py-2">₹{sale.amount}</td>
                <td className="px-4 py-2 capitalize">{sale.paymentMethod}</td>
                <td className="px-4 py-2">
                  {new Date(sale.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="font-semibold">{sale.product?.productName}</div>
                  <div className="text-xs">{sale.product?.userEdition}</div>
                  <div className="text-xs">₹{sale.product?.total}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
