import React from 'react'
import React, { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual';
const API_KEY = 'e3oWr4RAjvp1QuEF0gvT21qCJlGrckuD'; // Directly declare the API key
export const try1 = () => {
  
    const [data, setData] = useState([]);
        const [filteredData, setFilteredData] = useState([]);
        const [error, setError] = useState(null);
        const [filters, setFilters] = useState({
            startDate: '',
            endDate: '',
            minRevenue: '',
            maxRevenue: '',
            minNetIncome: '',
            maxNetIncome: ''
        });
        const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
    
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
    
        const handleFilterChange = (e) => {
            const { name, value } = e.target;
            setFilters({ ...filters, [name]: value });
        };
    
        const applyFilters = () => {
            let filtered = data;
    
            if (filters.startDate) {
                filtered = filtered.filter(item => new Date(item.date) >= new Date(filters.startDate));
            }
    
            if (filters.endDate) {
                filtered = filtered.filter(item => new Date(item.date) <= new Date(filters.endDate));
            }
    
            if (filters.minRevenue) {
                filtered = filtered.filter(item => item.revenue >= parseFloat(filters.minRevenue));
            }
    
            if (filters.maxRevenue) {
                filtered = filtered.filter(item => item.revenue <= parseFloat(filters.maxRevenue));
            }
    
            if (filters.minNetIncome) {
                filtered = filtered.filter(item => item.netIncome >= parseFloat(filters.minNetIncome));
            }
    
            if (filters.maxNetIncome) {
                filtered = filtered.filter(item => item.netIncome <= parseFloat(filters.maxNetIncome));
            }
    
            setFilteredData(filtered);
        };
    
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
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Financial Data Filtering App</h1>
    
                {error && (
                    <div className="bg-red-100 text-red-800 border border-red-400 px-4 py-2 rounded mb-4">
                        <strong>Error:</strong> {error}
                    </div>
                )}
    
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                        placeholder="Start Date"
                        className="p-2 border rounded"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                        placeholder="End Date"
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="minRevenue"
                        value={filters.minRevenue}
                        onChange={handleFilterChange}
                        placeholder="Min Revenue"
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="maxRevenue"
                        value={filters.maxRevenue}
                        onChange={handleFilterChange}
                        placeholder="Max Revenue"
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="minNetIncome"
                        value={filters.minNetIncome}
                        onChange={handleFilterChange}
                        placeholder="Min Net Income"
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="maxNetIncome"
                        value={filters.maxNetIncome}
                        onChange={handleFilterChange}
                        placeholder="Max Net Income"
                        className="p-2 border rounded"
                    />
                    <button
                        onClick={applyFilters}
                        className="col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Apply Filters
                    </button>
                </div>
    
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('date')}>
                        Date <span>{getSortIndicator('date')}</span>
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('revenue')}>
                        Revenue <span>{getSortIndicator('revenue')}</span>
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('netIncome')}>
                        Net Income <span>{getSortIndicator('netIncome')}</span>
                    </th>
                    <th scope="col" className="px-6 py-3">Gross Profit</th>
                    <th scope="col" className="px-6 py-3">EPS</th>
                    <th scope="col" className="px-6 py-3">Operating Income</th>
                </tr>
            </thead>
            <tbody>
                {sortedData.map((item) => (
                    <tr key={item.date} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.date}
                        </th>
                        <td className="px-6 py-4">{item.revenue}</td>
                        <td className="px-6 py-4">{item.netIncome}</td>
                        <td className="px-6 py-4">{item.grossProfit}</td>
                        <td className="px-6 py-4">{item.eps}</td>
                        <td className="px-6 py-4">{item.operatingIncome}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
            </div>)
}
