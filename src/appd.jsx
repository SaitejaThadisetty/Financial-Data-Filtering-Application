// // import { useState } from 'react'
// import React, { useState, useEffect } from 'react';
// import './App.css'


// const BASE_URL = 'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual';


// function App() {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [error, setError] = useState(null); 
//   const [filters, setFilters] = useState({
//       startDate: '',
//       endDate: '',
//       minRevenue: '',
//       maxRevenue: '',
//       minNetIncome: '',
//       maxNetIncome: ''
//   });
//   const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

//   useEffect(() => {
//       const fetchFinancialData = async () => {
//           try {
//               const apiUrl = `${BASE_URL}&apikey=${import.meta.env.REACT_APP_API_KEY}`;
//               const response = await fetch(apiUrl);
//               const text = await response.text(); 

//               if (!response.ok) {
//                   throw new Error('Failed to fetch data');
//               }

//               try {
//                   const result = JSON.parse(text); // Attempt to parse as JSON
//                   setData(result); // Set the fetched data in the state
//                   setFilteredData(result); // Initialize filtered data
//               } catch (error) {
//                   console.error('Invalid JSON:', error);
//                   setError('The response is not valid JSON.');
//               }
//           } catch (error) {
//               console.error('Error:', error);
//               setError(error.message); // Set error message to state
//           }
//       };

//       fetchFinancialData();
//   }, []);

//   const handleFilterChange = (e) => {
//       const { name, value } = e.target;
//       setFilters({ ...filters, [name]: value });
//   };

//   const applyFilters = () => {
//       let filtered = data;

//       if (filters.startDate) {
//           filtered = filtered.filter(item => new Date(item.date) >= new Date(filters.startDate));
//       }

//       if (filters.endDate) {
//           filtered = filtered.filter(item => new Date(item.date) <= new Date(filters.endDate));
//       }

//       if (filters.minRevenue) {
//           filtered = filtered.filter(item => item.revenue >= parseFloat(filters.minRevenue));
//       }

//       if (filters.maxRevenue) {
//           filtered = filtered.filter(item => item.revenue <= parseFloat(filters.maxRevenue));
//       }

//       if (filters.minNetIncome) {
//           filtered = filtered.filter(item => item.netIncome >= parseFloat(filters.minNetIncome));
//       }

//       if (filters.maxNetIncome) {
//           filtered = filtered.filter(item => item.netIncome <= parseFloat(filters.maxNetIncome));
//       }

//       setFilteredData(filtered);
//   };

//   const handleSort = (key) => {
//       let direction = 'ascending';
//       if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//           direction = 'descending';
//       }
//       setSortConfig({ key, direction });
//   };

//   const sortedData = [...filteredData].sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//   });

//   const getSortIndicator = (key) => {
//       if (sortConfig.key === key) {
//           return sortConfig.direction === 'ascending' ? '▲' : '▼';
//       }
//       return '';
//   };

//   return (
//       <div className="container">
//           <h1 className="text-blue-600 dark:text-blue-500">Financial Data Filtering App</h1>

//           {error && (
//               <div className="error">
//                   <strong>Error:</strong> {error}
//               </div>
//           )}

//           <div className="filters">
//               <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} placeholder="Start Date" />
//               <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} placeholder="End Date" />
//               <input type="number" name="minRevenue" value={filters.minRevenue} onChange={handleFilterChange} placeholder="Min Revenue" />
//               <input type="number" name="maxRevenue" value={filters.maxRevenue} onChange={handleFilterChange} placeholder="Max Revenue" />
//               <input type="number" name="minNetIncome" value={filters.minNetIncome} onChange={handleFilterChange} placeholder="Min Net Income" />
//               <input type="number" name="maxNetIncome" value={filters.maxNetIncome} onChange={handleFilterChange} placeholder="Max Net Income" />
//               <button onClick={applyFilters}>Apply Filters</button>
//           </div>

//           <table className="table">
//               <thead>
//                   <tr>
//                       <th onClick={() => handleSort('date')}>
//                           Date <span className="sort-indicator">{getSortIndicator('date')}</span>
//                       </th>
//                       <th onClick={() => handleSort('revenue')}>
//                           Revenue <span className="sort-indicator">{getSortIndicator('revenue')}</span>
//                       </th>
//                       <th onClick={() => handleSort('netIncome')}>
//                           Net Income <span className="sort-indicator">{getSortIndicator('netIncome')}</span>
//                       </th>
//                       <th>Gross Profit</th>
//                       <th>EPS</th>
//                       <th>Operating Income</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   {sortedData.map((item) => (
//                       <tr key={item.date}>
//                           <td>{item.date}</td>
//                           <td>{item.revenue}</td>
//                           <td>{item.netIncome}</td>
//                           <td>{item.grossProfit}</td>
//                           <td>{item.eps}</td>
//                           <td>{item.operatingIncome}</td>
//                       </tr>
//                   ))}
//               </tbody>
//           </table>
//       </div>
//   )
// }

// export default App
