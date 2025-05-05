// DashboardCards.jsx
export const DashboardCards = ({ total, monthly, today, avg }) => (
    <div className="grid grid-cols-4 gap-4">
      {[{ title: 'Total Sales', value: `$${total}` }, { title: 'Monthly Sales', value: `$${monthly}` }, { title: "Today's Sales", value: `$${today}` }, { title: 'Average Sale Value', value: `$${avg}` }].map((item, i) => (
        <div key={i} className="bg-gray-800 p-4 rounded-xl shadow-md">
          <p className="text-sm text-gray-400">{item.title}</p>
          <h2 className="text-xl font-semibold mt-2">{item.value}</h2>
        </div>
      ))}
    </div>
  );