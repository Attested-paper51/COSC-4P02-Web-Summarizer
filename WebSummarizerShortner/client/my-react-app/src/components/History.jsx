import React, { useState, useEffect } from 'react';
import "./css/HistoryStyle.css";
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

  const [data, setData] = useState([]);// number of rows is 10
  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = localStorage.getItem('email');
  //let user = localStorage.getItem('user_id');
  const [username, setUsername] = useState('');
  //console.log("username on History.js is: " + username);
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
    fetchShortenedURLHistory();
  };

   useEffect(() => {
        console.log(email);
        const fetchUsername = async () => {
            try {
              //const response = await fetch('http://4p02shortify.com:5001/getusername', { //Server use only
                const response = await fetch('http://localhost:5001/getusername', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
    
                if (response.ok) {
                    const result = await response.json();
                    setUsername(result.message);
                    console.log(username);
                } else {
                    console.error('Failed to fetch username');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        if (email) {
            fetchUsername();
        }
    }, [email]);


  // Function to fetch history data from the Flask backend
  const fetchHistoryData = async () => {
    try {
      //const response = await fetch('http://4p02shortify.com:5005/history', { //Server use only
      const response = await fetch('http://localhost:5005/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
      });
      if (response.ok) {
        const data = await response.json();
        setHistoryData(data.history);
        //console.log(data.history);
      } else {
        console.error('Failed to fetch history data');
      }
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };


  const fetchShortenedURLHistory = async () => {
    try {
      //const response = await fetch('http://4p02shortify.com:5005/shortenedHistory', { //Server use only
        const response = await fetch('http://localhost:5005/shortenedHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }),
        });
        if (response.ok) {
            const data = await response.json();
            setData(data.shortenedURLs); // Assuming your backend returns an array of objects
            //console.log(data.shortenedURLs);
        } else {
            console.error('Failed to fetch shortened URL history');
        }
    } catch (error) {
        console.error('Error fetching shortened URL history:', error);
    }
};


 
  const handleCheckboxChange = (id) => {
    setSelectedRows(prevSelectedRows => ({
      ...prevSelectedRows,
      [id]: !prevSelectedRows[id] // Toggle selection status
    }));
  };

 
  const handleSelectAll = () => {
  if (!selectAll) {
    const allSelected = historyData.reduce((acc, item) => {
      acc[item[0]] = true;
      return acc;
    }, {});
    console.log("Selecting All:", allSelected);
    setSelectedRows(allSelected);
    setSelectAll(true);
  } else {
    console.log("Clearing Selection");
    setSelectedRows({});
    setSelectAll(false);
  }
};


const handleSelectAllShortened = () => {
  if (!selectAll) {
    const allSelected = data.reduce((acc, item) => {
      acc[item[0]] = true;
      return acc;
    }, {});
    console.log("Selecting All:", allSelected);
    setSelectedRows(allSelected);
    setSelectAll(true);
  } else {
    console.log("Clearing Selection");
    setSelectedRows({});
    setSelectAll(false);
  }
};

const handleDelete = async () => {
  const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
  for (const historyID of selectedIds) {
    try {
      const response = await fetch('http://localhost:5005/deleteHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          historyID,
        }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error deleting history entry:', error);
    }
  }
  fetchHistoryData();
  setSelectedRows({});
  setCopied(false);
  setSelectAll(false); // Reset select all
};

const handleDeleteShortenedURL = async () => {
  const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
  for (const urlID of selectedIds) {
    try {
      const response = await fetch('http://localhost:5005/deleteURL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          urlID,
        }),
      });
      const data = await response.json();
      console.error(`Failed to delete URL with ID ${urlID}: ${data.message}`);
    } catch (error) {
      console.error(`Error deleting URL with ID ${urlID}:`, error);
    }
  }
  fetchShortenedURLHistory();
  setSelectedRows({});
  setCopied(false);
  setSelectAll(false); // Reset select all
};

const handleCopy = () => {
  const activeData = showSumSection ? historyData : data;
  const outputValues = Object.keys(selectedRows)
    .filter(id => selectedRows[id])
    .map(id => {
      const intId = parseInt(id, 10);
      const foundItem = activeData.find(item => item && item[0] === intId);
      return foundItem ? foundItem[1] + ' - ' + foundItem[2] : 'No data';
    })
    .filter(output => output !== 'No data');

  if (outputValues.length === 0) {
    console.log('No items selected or valid items not found in data.');
    return;
  }

  const outputText = outputValues.join('\n\n');
  navigator.clipboard.writeText(outputText).then(() => {
    setCopied(true);
    setSelectedRows({});
    setSelectAll(false); // Reset select all
    setTimeout(() => setCopied(false), 3000);
  }).catch(err => {
    console.error('Error copying text:', err);
  });
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
              <button className='control-btn' onClick={handleSelectAll}>{selectAll ? <MdCheckBox className='checkbox-icon' /> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}</button>
              {Object.keys(selectedRows).length > 0 && (
                <>
                  <button className='control-btn' onClick={handleDelete}><MdDeleteOutline className='delete-icon' /></button>
                  <button className='control-btn' onClick={handleCopy}> {copied ? <FaCopy className='copy-icon' /> : <FaRegCopy className='copy-icon' />}</button>
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
                {
                historyData.map((item) => (
                  <tr key={item[0]}>
                    <td>
                      <label className='custom-checkbox'>
                        <input type="checkbox" checked={!!selectedRows[item[0]]} onChange={() => handleCheckboxChange(item[0])} />
                        {selectedRows[item[0]] ? <MdCheckBox className='checkbox-icon'/> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}
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
              <button className='control-btn' onClick={handleSelectAllShortened}>{selectAll ? <MdCheckBox className='checkbox-icon' /> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon'/>}</button>
              {Object.keys(selectedRows).length > 0 && (
                <>
                  <button className='control-btn' onClick={handleDeleteShortenedURL}><MdDeleteOutline className='delete-icon' /></button>
                  <button className='control-btn' onClick={handleCopy}> {copied ? <FaCopy className='copy-icon' /> : <FaRegCopy className='copy-icon' />}</button>
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
                  <tr key={item[0]}>
                    <td>
                      <label className='custom-checkbox'>
                        <input type="checkbox" checked={!!selectedRows[item[0]]} onChange={() => handleCheckboxChange(item[0])} />
                        {selectedRows[item[0]] ? <MdCheckBox className='checkbox-icon' /> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}
                      </label>
                    </td>
                    <td className='scrollable'>{item[1]}</td>
                    <td className='scrollable'>{item[2]}</td>
                    <td>{item[3]}</td>
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