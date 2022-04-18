import React from "react";

function Labels({ tag, note, setNote }) {
  console.log(note);
  const lowerCaseTag = tag.toLowerCase().trim();
  return (
    <div>
      <input
        type="checkbox"
        name=""
        id={lowerCaseTag}
        value={lowerCaseTag}
        onChange={(e) =>
          setNote((prevObj) => ({
            ...prevObj,
            labelOnNote: prevObj.labelOnNote.includes(e.target.value)
              ? prevObj.labelOnNote.filter((lbl) => lbl !== e.target.value)
              : [...prevObj.labelOnNote, e.target.value],
          }))
        }
        checked={note.labelOnNote.includes(lowerCaseTag)}
      />
      <label htmlFor={lowerCaseTag}>{tag}</label>
    </div>
  );
}

export default Labels;
