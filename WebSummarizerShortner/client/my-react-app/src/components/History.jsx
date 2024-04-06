import React, { useState } from 'react';
import "./css/HistoryStyle.css";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { useTheme } from './ThemeContext.js'
import Tooltip from '@mui/material/Tooltip';

const History = () => {

  const { darkMode } = useTheme();

  const [showSumSection, setShowSumSection] = useState(true); // State for Web Summarizer section
  const [showShortSection, setShowShortSection] = useState(false); // State for URL Shortener section
  const [activeButton, setActiveButton] = useState('sum'); // State for active button

  const handleSumButtonClick = () => {
    setShowSumSection(true);
    setShowShortSection(false);
    setActiveButton('sum');
  };

  const handleShortButtonClick = () => {
    setShowShortSection(true);
    setShowSumSection(false);
    setActiveButton('short');
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
  const [data, setData] = useState(generateData(5));// number of rows is 10


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
            <Tooltip title="Select All" arrow>
              <button className='control-btn' onClick={handleSelectAll}>{selectAll ? <MdCheckBox className='checkbox-icon' /> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}</button>
              </Tooltip>
              {Object.keys(selectedRows).length > 0 && (
                <>
                  <Tooltip title="Delete" arrow>
                    <button className='control-btn' onClick={handleDelete}><MdDeleteOutline className='delete-icon' /></button>
                  </Tooltip>
                  <Tooltip title="Copy" arrow>
                    <button className='control-btn' onClick={handleCopy}> {copied ? <FaCopy className='copy-icon' /> : <FaRegCopy className='copy-icon' />}</button>
                  </Tooltip>
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
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <label className='custom-checkbox'>
                        <input type="checkbox" checked={!!selectedRows[item.id]} onChange={() => handleCheckboxChange(item.id)} />
                        {selectedRows[item.id] ? <MdCheckBox className='checkbox-icon' /> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}
                      </label>
                    </td>
                    <td className='scrollable'>{item.input}</td>
                    <td className='scrollable'>{item.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

        {showShortSection && (
          <div className='short-section'>
            {/* Content for URL Shortener section */}
            <div className='btn-section'>
              <Tooltip title="Select All" arrow>
              <button className='control-btn' onClick={handleSelectAll}>{selectAll ? <MdCheckBox className='checkbox-icon' /> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}</button>
              </Tooltip>
              {Object.keys(selectedRows).length > 0 && (
                <>
                  <Tooltip title="Delete" arrow>
                    <button className='control-btn' onClick={handleDelete}><MdDeleteOutline className='delete-icon' /></button>
                  </Tooltip>
                  <Tooltip title="Copy" arrow>
                    <button className='control-btn' onClick={handleCopy}> {copied ? <FaCopy className='copy-icon' /> : <FaRegCopy className='copy-icon' />}</button>
                  </Tooltip>
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
                        {selectedRows[item.id] ? <MdCheckBox className='checkbox-icon' /> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}
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