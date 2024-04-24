import React, { useState, useEffect } from 'react';
import "./css/HistoryStyle.css";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
/**
 *  History defines the history page of the user dashboard where a user can see their summarization and URL shortener history
 * @returns History page
 */
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
  const [username, setUsername] = useState('');
  //If the user clicks Summarizer
  const handleSumButtonClick = () => {
    setShowSumSection(true);
    setShowShortSection(false);
    setActiveButton('sum');
    fetchHistoryData();
  };
  //If the user clicks shortener
  const handleShortButtonClick = () => {
    setShowShortSection(true);
    setShowSumSection(false);
    setActiveButton('short');
    fetchShortenedURLHistory();
  };

  //Once the page is loaded, fetch the username
  useEffect(() => {
        
        const fetchUsername = async () => {
          //Flask call to the backend
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


  // Function to fetch history data from the Flask backend (summarizer history)
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
        
      } else {
        console.error('Failed to fetch history data');
      }
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

  // Function to fetch shortener history
  const fetchShortenedURLHistory = async () => {
    try {
      //Flask fetch call to the backend
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


  //Handling the changing of the checkbox selected
  const handleCheckboxChange = (id) => {
    setSelectedRows(prevSelectedRows => ({
      ...prevSelectedRows,
      [id]: !prevSelectedRows[id] // Toggle selection status
    }));
  };

  //Selecting all of the history rows
  const handleSelectAll = () => {
  if (!selectAll) {
    const allSelected = historyData.reduce((acc, item) => {
      acc[item[0]] = true;
      return acc;
    }, {});
    //console.log("Selecting All:", allSelected);
    setSelectedRows(allSelected);
    setSelectAll(true);
  } else {
    //console.log("Clearing Selection");
    setSelectedRows({});
    setSelectAll(false);
  }
};

//Selecting all of the shortener history rows
const handleSelectAllShortened = () => {
  if (!selectAll) {
    const allSelected = data.reduce((acc, item) => {
      acc[item[0]] = true;
      return acc;
    }, {});
    //console.log("Selecting All:", allSelected);
    setSelectedRows(allSelected);
    setSelectAll(true);
  } else {
    //console.log("Clearing Selection");
    setSelectedRows({});
    setSelectAll(false);
  }
};

// handling the deletion of selected history rows for summarizer history
const handleDelete = async () => {
  const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
  for (const historyID of selectedIds) {
    try {
      //const response = await fetch('http://4p02shortify.com:5005/deleteHistory', { //Server use only
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

//Handling the deletion of selected rows for the shortener history
const handleDeleteShortenedURL = async () => {
  const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
  for (const urlID of selectedIds) {
    try {
      //const response = await fetch('http://4p02shortify.com:5005/deleteURL', { //Server use only
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

function isURL(str) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;  
  }
}


const hasSelectedRows = () => {
  return Object.keys(selectedRows).some(key => selectedRows[key]);
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
        <div className='btn-section'>
          <button className='control-btn' onClick={handleSelectAll}>
            {selectAll ? <MdCheckBox className='checkbox-icon' /> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}
          </button>
          {hasSelectedRows() && (
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
        {historyData.map((item) => (
          <tr key={item[0]}>
            <td>
              <label className='custom-checkbox'>
                <input type="checkbox" checked={!!selectedRows[item[0]]} onChange={() => handleCheckboxChange(item[0])} />
                {selectedRows[item[0]] ? <MdCheckBox className='checkbox-icon'/> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}
              </label>
            </td>
            <td className='scrollable'>
              {isURL(item[1]) ? (
                <a href={item[1]} target="_blank" rel="noopener noreferrer" className="link-style">{item[1]}</a>
              ) : item[1]}
            </td>
            <td className='scrollable'>{item[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      {showShortSection && (
      <div className='short-section'>
        <div className='btn-section'>
          <button className='control-btn' onClick={handleSelectAllShortened}>
            {selectAll ? <MdCheckBox className='checkbox-icon' /> : <MdOutlineCheckBoxOutlineBlank className='checkbox-icon' />}
          </button>
          {hasSelectedRows() && (
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
                  <td className='scrollable'>
                    <a href={item[1]} target="_blank" rel="noopener noreferrer" className="link-style">{item[1]}</a>
                  </td>
                  <td className='scrollable'>
                    <a href={item[2]} target="_blank" rel="noopener noreferrer" className="link-style">{item[2]}</a>
                  </td>
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