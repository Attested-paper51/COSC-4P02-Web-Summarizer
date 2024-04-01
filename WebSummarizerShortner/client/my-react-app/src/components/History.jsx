import React, { useState, useEffect } from 'react';
import "./css/DashboardStyle.css";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const History = () => {

  const [showSumSection, setShowSumSection] = useState(false); // State for Web Summarizer section
  const [showShortSection, setShowShortSection] = useState(false); // State for URL Shortener section
  const [activeButton, setActiveButton] = useState(null); // State for active button
  const [historyData, setHistoryData] = useState([]); // State to store history data


  const handleSumButtonClick = () => {
    setShowSumSection(true);
    setShowShortSection(false);
    setActiveButton('sum');
    fetchHistoryData();
  };

  const handleShortButtonClick = () => {
    setShowShortSection(true);
    setShowSumSection(false);
    setActiveButton('short');
  };

  // Function to fetch history data from the Flask backend
  const fetchHistoryData = async () => {
    try {
      const response = await fetch('http://localhost:5001/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: '42c546' }),
      });
      if (response.ok) {
        const data = await response.json();
        setHistoryData(data.history);
        console.log(data.history);
      } else {
        console.error('Failed to fetch history data');
      }
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };



  // Function to generate dummy data
  function generateData(numRows) {
    const newData = [];
    for (let i = 1; i <= numRows; i++) {
      newData.push({
        id: i,
        input: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        output: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        original: 'https://www.youtube.com/watch?v=bqOYm-q3ank&ab_channel=hola%EC%98%AC%EB%9D%BC',
        shortened: 'https://rb.gy/tii8gw'
      });
    }
    return newData;
  }
  // Initialize dummy table data
  const [data, setData] = useState(generateData(10));// number of rows is 10


  // State to track if all entries are selected
  const [selectedRows, setSelectedRows] = useState({});
  // Track whether all entries are currently selected or not
  const [selectAll, setSelectAll] = useState(false);
  // Track whether entries are copied or not
  const [copied, setCopied] = useState(false);


  const handleCheckboxChange = (id) => {
    setSelectedRows(prevSelectedRows => ({
      ...prevSelectedRows,
      [id]: !prevSelectedRows[id] // Toggle selection status
    }));
  };

  
  const handleSelectAll = () => {
    if (!selectAll) {
      const allSelected = data.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {});
      setSelectedRows(allSelected);
    } else {
      setSelectedRows({});
    }
    setSelectAll(prevSelectAll => !prevSelectAll);
    setCopied(false);
  };

  const handleDelete = () => {
    const newData = data.filter(item => !selectedRows[item.id]);
    setData(newData);
    setSelectedRows({});
    setCopied(false);
  };

  const handleCopy = () => {
    const outputValues = Object.keys(selectedRows).map(id => data.find(item => item.id === parseInt(id)).output);
    const outputText = outputValues.join('\n\n');
    navigator.clipboard.writeText(outputText);
    setCopied(true);
  };

  return (

    <div className="history-wrapper">
        
        <h1>History</h1>
        <div className='hist-section'>
          <button className={`sum-btn ${activeButton === 'sum' ? 'active' : ''}`} onClick={handleSumButtonClick}>Web Summarizer History</button>
          <button className={`short-btn ${activeButton === 'short' ? 'active' : ''}`} onClick={handleShortButtonClick}>URL Shortener History</button>
        </div>
      
        {showSumSection && (
          <div className='sum-section'>

            {/* Content for Web Summarizer section */}
            <div className='btn-section'>
              <button className='control-btn' onClick={handleSelectAll}>{selectAll ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}</button>
              {Object.keys(selectedRows).length > 0 && (
                <>
                  <button className='control-btn' onClick={handleDelete}><MdDeleteOutline /></button>
                  <button className='control-btn' onClick={handleCopy}> {copied ? <FaCopy size={15} /> : <FaRegCopy size={15} />}</button>
                </>
              )}
            </div>
            
            <table id="summary-table">
              <thead>
              <tr>
                <th>Select</th>
                <th>Prompt Given</th>
                <th>Summarized Prompt</th>
              </tr>
              </thead>
              <tbody>
                {/* {data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <label className='custom-checkbox'>
                        <input type="checkbox" checked={!!selectedRows[item.id]} onChange={() => handleCheckboxChange(item.id)} />
                        {selectedRows[item.id] ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                      </label>
                    </td>
                    <td className='scrollable'>{item.input}</td>
                    <td className='scrollable'>{item.output}</td>
                  </tr>
                )) */}
                {
                historyData.map((item) => (
                  <tr key={item[0]}>
                    <td>
                      <label className='custom-checkbox'>
                        <input type="checkbox" checked={!!selectedRows[item.id]} onChange={() => handleCheckboxChange(item.id)} />
                        {selectedRows[item.id] ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                      </label>
                    </td>
                    <td className='scrollable'>{item[1]}</td>
                    <td className='scrollable'>{item[2]}</td>
                  </tr>
                ))
                }
              </tbody>
            </table>

          </div>
        )}

        {showShortSection && (
          <div className='short-section'>
            {/* Content for URL Shortener section */}
            <div className='btn-section'>
              <button className='control-btn' onClick={handleSelectAll}>{selectAll ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}</button>
              {Object.keys(selectedRows).length > 0 && (
                <>
                  <button className='control-btn' onClick={handleDelete}><MdDeleteOutline /></button>
                  <button className='control-btn' onClick={handleCopy}> {copied ? <FaCopy size={15} /> : <FaRegCopy size={15} />}</button>
                </>
              )}
            </div>

            <table id="shortener-table">
              <thead>
              <tr>
                <th>Select</th>
                <th>Original Link Given</th>
                <th>Shortened Link</th>
                <th>Click counts</th>
              </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <label className='custom-checkbox'>
                        <input type="checkbox" checked={!!selectedRows[item.id]} onChange={() => handleCheckboxChange(item.id)} />
                        {selectedRows[item.id] ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                      </label>
                    </td>
                    <td className='scrollable'>{item.original}</td>
                    <td className='scrollable'>{item.shortened}</td>
                    <td>click counts</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

    </div>

  );
}

export default History;