import React from 'react'

function Sidebar({ historyList, onHistoryClick }) {
  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <h3>Search History</h3>
      </div>
      <ul className="list-unstyled components" >
        {historyList.map(item => (
          <li key={item} onClick={() => onHistoryClick({ item })}><a href="!#" className="nav-link">{item}</a></li>
        ))}
      </ul>
    </nav>

  )
}

export default Sidebar
