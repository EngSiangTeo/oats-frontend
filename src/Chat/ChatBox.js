import React from "react";
import './ChatBox.css';
export default ({ text, username, handleTextChange }) => (
  <div className="chatBox">
    <input
      type="text"
      value={text}
      placeholder="chat here..."
      className="form-control"
      onChange={handleTextChange}
      onKeyDown={handleTextChange}
    />
  </div>

);