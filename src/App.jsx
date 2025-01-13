import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaFilter } from 'react-icons/fa';

import './App.css';

const BASE_URL = 'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual';
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;


const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const [darkMode, setDarkMode] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const apiUrl = `${BASE_URL}&apikey=${API_KEY}`;
        const response = await fetch(apiUrl);
        const text = await response.text();

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        try {
          const result = JSON.parse(text);
          setData(result);
          setFilteredData(result);
        } catch (error) {
          console.error('Invalid JSON:', error);
          setError('The response is not valid JSON.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchFinancialData();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  // Handle filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = data;

    if (filters.startDate) {
      filtered = filtered.filter((item) => new Date(item.date) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filtered = filtered.filter((item) => new Date(item.date) <= new Date(filters.endDate));
    }

    if (filters.minRevenue) {
      filtered = filtered.filter((item) => item.revenue >= parseFloat(filters.minRevenue));
    }

    if (filters.maxRevenue) {
      filtered = filtered.filter((item) => item.revenue <= parseFloat(filters.maxRevenue));
    }

    if (filters.minNetIncome) {
      filtered = filtered.filter((item) => item.netIncome >= parseFloat(filters.minNetIncome));
    }

    if (filters.maxNetIncome) {
      filtered = filtered.filter((item) => item.netIncome <= parseFloat(filters.maxNetIncome));
    }

    setFilteredData(filtered);
  };

  // Handle table sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '';
  };

  return (
<div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4">
        <h1
          className={`bg-clip-text text-center text-transparent bg-gradient-to-r from-indigo-500 to-teal-500 text-5xl font-black py-4`}
        >
          Financial Data Filtering App
        </h1>
  
        {/* Dark Mode Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleDarkMode}
            className="bg-gray-600 text-white p-2 rounded hover:bg-gray-800"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
  
        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 text-red-800 border border-red-400 px-4 py-2 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
  
    {/* Filters Section */}
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
    <input
        type="date"
        name="startDate"
        placeholder="Start Date"
        value={filters.startDate}
        onChange={handleFilterChange}
        className={`border border-gray-300 p-2 rounded ${
        darkMode
            ? 'bg-gray-700 text-gray-300 placeholder-gray-500'
            : 'bg-gray-50 text-gray-900 placeholder-gray-600'
        }`}
    />
    <input
        type="date"
        name="endDate"
        placeholder="End Date"
        value={filters.endDate}
        onChange={handleFilterChange}
        className={`border border-gray-300 p-2 rounded ${
        darkMode
            ? 'bg-gray-700 text-gray-300 placeholder-gray-500'
            : 'bg-gray-50 text-gray-900 placeholder-gray-600'
        }`}
    />
    <input
        type="number"
        name="minRevenue"
        placeholder="Min Revenue"
        value={filters.minRevenue}
        onChange={handleFilterChange}
        className={`border border-gray-300 p-2 rounded ${
        darkMode
            ? 'bg-gray-700 text-white-300 placeholder-gray-500'
            : 'bg-gray-50 text-black-900 placeholder-gray-600'
        }`}
    />
    <input
        type="number"
        name="maxRevenue"
        placeholder="Max Revenue"
        value={filters.maxRevenue}
        onChange={handleFilterChange}
        className={`border border-gray-300 p-2 rounded ${
        darkMode
            ? 'bg-gray-700 text-gray-300 placeholder-gray-500'
            : 'bg-gray-50 text-gray-900 placeholder-gray-600'
        }`}
    />
    <input
        type="number"
        name="minNetIncome"
        placeholder="Min Net Income"
        value={filters.minNetIncome}
        onChange={handleFilterChange}
        className={`border border-gray-300 p-2 rounded ${
        darkMode
            ? 'bg-gray-700 text-gray-300 placeholder-gray-500'
            : 'bg-gray-50 text-gray-900 placeholder-gray-600'
        }`}
    />
    <input
        type="number"
        name="maxNetIncome"
        placeholder="Max Net Income"
        value={filters.maxNetIncome}
        onChange={handleFilterChange}
        className={`border border-gray-300 p-2 rounded ${
        darkMode
            ? 'bg-gray-700 text-gray-300 placeholder-gray-500'
            : 'bg-gray-50 text-gray-900 placeholder-gray-600'
        }`}
    />
    <button
        onClick={applyFilters}
        className="col-span-full md:col-span-1 w-auto bg-gradient-to-r from-indigo-500 to-teal-500 text-white p-2 rounded inline-flex items-center justify-center hover:bg-blue-800"
    >
        Apply Filters <FaFilter className="ml-2" />
    </button>
    </div>  
        {/* Data Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead
                className={`text-xs uppercase ${
                    darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-700'
                }`}
                >
                <tr>
                    <th
                    className="cursor-pointer px-4 py-3"
                    onClick={() => handleSort('date')}
                    >
                    Date {getSortIndicator('date')}
                    </th>
                    <th
                    className="cursor-pointer px-4 py-3"
                    onClick={() => handleSort('revenue')}
                    >
                    Revenue {getSortIndicator('revenue')}
                    </th>
                    <th
                    className="cursor-pointer px-4 py-3"
                    onClick={() => handleSort('netIncome')}
                    >
                    Net Income {getSortIndicator('netIncome')}
                    </th>
                    <th
                    className="cursor-pointer px-4 py-3"
                    >
                    Gross Profit
                    </th>
                    <th
                    className="cursor-pointer px-4 py-3"
                    >
                    EPS
                    </th>
                    <th
                    className="cursor-pointer px-4 py-3"
                    >
                    Operating Income 
                    </th>
                </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr
                        key={index}
                        className={`${
                            darkMode
                            ? 'bg-gray-800 text-white hover:bg-gray-600 hover:text-gray-200'
                            : 'bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-900' 
                        }`}
                        >
                        <td className="px-4 py-2 font-medium whitespace-nowrap">
                            {item.date}
                        </td>
                        <td className="px-4 py-2 font-medium whitespace-nowrap">
                            {item.revenue}
                        </td>
                        <td className="px-4 py-2 font-medium whitespace-nowrap">
                            {item.netIncome}
                        </td>
                        <td className="px-4 py-2 font-medium whitespace-nowrap">
                            {item.grossProfit}
                        </td>
                        <td className="px-4 py-2 font-medium whitespace-nowrap">
                            {item.eps}
                        </td>
                        <td className="px-4 py-2 font-medium whitespace-nowrap">
                            {item.operatingIncome}
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
      </div>
</div>
  );
};

export default App;




