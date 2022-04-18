import React from "react";

function LabelNotes({ noteObj }) {
  const { _id, title, colorPref, content, isPinned, stylePref } = noteObj;
  return (
    <div class="notes-wrapper" style={{ backgroundColor: colorPref }}>
      <h3 className="fs-mdm">{title}</h3>
      <p className={stylePref.toString().replaceAll(",", " ")}>{content}</p>
      <div className="flex-f-end"></div>
      <button
        className="notes-pos-abs-top-right"
        style={{ color: isPinned ? "green" : "blue" }}
      >
        <i className="fas fa-thumbtack"></i>
      </button>
    </div>
  );
}

export default LabelNotes;
