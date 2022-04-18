import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useRef } from "react";
import { useNotesContext } from "../../../global-context/notes-context";
import { useGlobalVarContext } from "../../../global-context/global-variables";
import { editNotesService } from "../../../services/notes-services";

import axios from "axios";
import NoteCard from "./NoteCard";
import { useLabelContext } from "../../../global-context/label-context";
import Labels from "./Labels";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const initObj = {
  title: "",
  content: "",
  stylePref: [],
  isPinned: false,
  colorPref: "#93c5fd",
  priority: "low",
  timeCreated: "",
  dateAdded: "",
  labelOnNote: [],
};
const Notes = () => {
  const [note, setNote] = useState(initObj);
  const { title, content, stylePref, colorPref, isPinned, priority } = note;
  const [inputLbl, setInputLbl] = useState("");
  const { state, dispatch } = useNotesContext();
  const { notes, sortByTime, filterByPriority, filterByLabel } = state;
  const [editObj, setEditObj] = useState({
    isEditing: false,
    noteId: "",
  });

  const { isEditing, noteId } = editObj;
  const { token } = useGlobalVarContext();
  const { state: labelState, dispatch: labelDispatch } = useLabelContext();

  const changeStylePref = (pref) => {
    setNote((prevObj) => {
      const { stylePref } = prevObj;
      if (/text-align/.test(pref)) {
        return stylePref.includes(pref)
          ? { ...prevObj, stylePref: stylePref.filter((item) => item !== pref) }
          : {
              ...prevObj,
              stylePref: [
                ...stylePref.filter((item) => !/text-align/.test(item)),
                pref,
              ],
            };
      } else if (/case-text/.test(pref) || /capitalize-text/.test(pref)) {
        return stylePref.includes(pref)
          ? { ...prevObj, stylePref: stylePref.filter((item) => item !== pref) }
          : {
              ...prevObj,
              stylePref: [
                ...stylePref.filter(
                  (item) =>
                    !/case-text/.test(item) && !/capitalize-text/.test(item)
                ),
                pref,
              ],
            };
      }
      return stylePref.includes(pref)
        ? { ...prevObj, stylePref: stylePref.filter((item) => item !== pref) }
        : { ...prevObj, stylePref: [...stylePref, pref] };
    });
  };

  const postToNotesService = async (encToken, note) => {
    try {
      const response = await axios.post(
        "/api/notes/",
        { note },
        {
          headers: { authorization: encToken },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const addToNotesListHandler = async (encToken, note) => {
    try {
      const response = await postToNotesService(encToken, note);

      dispatch({ type: "ADD_NOTES", payload: response.data.notes });
    } catch (error) {
      console.log(error);
    }
  };

  const editNoteObj = async (encToken, noteId, note) => {
    if (notes.find(({ _id }) => _id === noteId)) {
      const response = await editNotesService(encToken, noteId, note);
      dispatch({ type: "ADD_NOTES", payload: response.data.notes });
    }
    setEditObj((prevObj) => ({ ...prevObj, isEditing: false, noteId: "" }));
    setNote(() => ({ ...initObj }));
  };

  const timeToNum = (timeStr) => parseInt(timeStr.split(":").join(""), 10);

  const getSortedNotes = (notesArr) => {
    if (sortByTime === "new-to-old") {
      return [...notesArr].sort(
        (noteA, noteB) =>
          Date.parse(noteB.timeCreated) - Date.parse(noteA.timeCreated)
      );
    } else if (sortByTime === "old-to-new") {
      return [...notesArr].sort(
        (noteA, noteB) =>
          Date.parse(noteA.timeCreated) - Date.parse(noteB.timeCreated)
      );
    }
    return notesArr;
  };

  const getFilteredPriorityData = (sortedArr, filterByPriority) =>
    filterByPriority.length !== 0
      ? sortedArr.filter((item) => filterByPriority.includes(item.priority))
      : sortedArr;

  const getFilteredLabelData = (sortedArr, filterByLabel) => {
    console.log(filterByLabel, "by label");
    console.log(sortedArr, "array here");

    return filterByLabel.length !== 0
      ? sortedArr.filter((item) =>
          item.labelOnNote.find((tag) => filterByLabel.includes(tag))
        )
      : sortedArr;
  };
  const sortedNotesArr = getSortedNotes(notes);

  const filteredSortedNotes = getFilteredLabelData(
    getFilteredPriorityData(sortedNotesArr, filterByPriority),
    filterByLabel
  );

  return (
    <div>
      <div className={`${isEditing ? "modal-container" : ""} flex-center`}>
        <div
          className="flex-center notes-wrapper modal-content"
          style={{ backgroundColor: colorPref }}
        >
          <div>
            <div className="flex-column notes-editable">
              <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) =>
                  setNote((prevObj) => ({
                    ...prevObj,
                    title: e.target.value,
                  }))
                }
                className="notes-title"
              />
              <textarea
                placeholder="Take a note...."
                className={`${stylePref
                  .toString()
                  .replaceAll(",", " ")} notes-content`}
                value={content}
                onChange={(e) =>
                  setNote((prevObj) => ({
                    ...prevObj,
                    content: e.target.value,
                    timeCreated: new Date(),
                    dateAdded: new Date(),
                  }))
                }
                custom-placeholder="Add Note..."
              ></textarea>
            </div>
            <div className="flex-spc-btwn text-align-center">
              <button
                className="btn"
                onClick={() => changeStylePref("bold-text")}
              >
                Bold
              </button>
              <button
                className="btn"
                onClick={() => changeStylePref("italic-text")}
              >
                Italic
              </button>
              <button
                className="btn"
                onClick={() => changeStylePref("strike-text")}
              >
                Strike
              </button>
            </div>
            <div className="flex-spc-btwn text-align-center">
              <button
                className="btn"
                onClick={() => changeStylePref("text-align-left")}
              >
                Align Left
              </button>
              <button
                className="btn"
                onClick={() => changeStylePref("text-align-center")}
              >
                Align Center
              </button>
              <button
                className="btn"
                onClick={() => changeStylePref("text-align-right")}
              >
                Align Right
              </button>
            </div>
            <div className="flex-spc-btwn text-align-center">
              <button
                className="btn"
                onClick={() => changeStylePref("uppercase-text")}
              >
                Uppercase
              </button>
              <button
                className="btn"
                onClick={() => changeStylePref("lowercase-text")}
              >
                Lowercase
              </button>
              <button
                className="btn"
                onClick={() => changeStylePref("capitalize-text")}
              >
                Capitalize
              </button>
            </div>

            <button
              className="notes-pos-abs-top-right btn-icon"
              onClick={() =>
                setNote((prevObj) => ({
                  ...prevObj,
                  isPinned: !prevObj.isPinned,
                }))
              }
              style={{ color: isPinned ? "green" : "blue" }}
            >
              <i className="fas fa-thumbtack"></i>
            </button>
            <div className="flex-spc-btwn">
              <input
                type="color"
                onChange={(e) =>
                  setNote((prevObj) => ({
                    ...prevObj,

                    colorPref: e.target.value,
                  }))
                }
                value={colorPref}
                title="Choose a Color"
              />
              <div>
                <div>
                  <label htmlFor="label">Label</label>
                  <input
                    type="text"
                    id="label"
                    value={inputLbl}
                    onChange={(e) => setInputLbl(e.target.value)}
                    onKeyUp={(e) => {
                      if (
                        e.target.value &&
                        e.key === "Enter" &&
                        !labelState.label.includes(e.target.value.toLowerCase())
                      ) {
                        labelDispatch({
                          type: "ADD_LABEL",
                          payload: inputLbl.toLowerCase().trim(),
                        });
                        setInputLbl("");
                      }
                    }}
                  />
                </div>
                {labelState.label.length !== 0 && (
                  <div className="flex-column">
                    {labelState.label.length !== 0 &&
                      labelState.label.map((tag, index) => {
                        return (
                          <Labels
                            tag={tag}
                            key={index}
                            note={note}
                            setNote={setNote}
                          />
                        );
                      })}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="priority">Priority: </label>
                <select
                  id="priority"
                  onChange={(e) =>
                    setNote((prevObj) => ({
                      ...prevObj,
                      priority: e.target.value,
                    }))
                  }
                  value={priority}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              {isEditing ? (
                <div className="flex-spc-btwn gap-sml">
                  <button
                    className="btn alert-secondary"
                    onClick={() => {
                      editNoteObj(token, noteId, note);
                    }}
                  >
                    Edit Note
                  </button>
                  <button
                    className="btn btn-outlined"
                    onClick={() => {
                      setEditObj((prevObj) => ({
                        ...prevObj,
                        isEditing: false,
                        noteId: "",
                      }));
                      setNote(() => ({ ...initObj }));
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="btn alert-primary"
                  onClick={() => {
                    addToNotesListHandler(token, note);

                    setNote(() => ({ ...initObj }));
                  }}
                >
                  Add Note
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="margin-sml flex-column gap-sml">
        <div className="flex-wrap gap-sml">
          {filteredSortedNotes.find((item) => item.isPinned) &&
            notes.find((item) => !item.isPinned) && <h5>Others</h5>}
          {filteredSortedNotes
            .filter((item) => !item.isPinned)
            .map((item) => {
              const { _id } = item;
              return (
                <NoteCard
                  initObj={initObj}
                  noteObj={item}
                  editObj={editObj}
                  setEditObj={setEditObj}
                  setNote={setNote}
                  key={_id}
                />
              );
            })}
        </div>
        {filteredSortedNotes.find((item) => item.isPinned) && (
          <div className="flex-wrap gap-sml">
            <h5>Pinned</h5>
            {filteredSortedNotes
              .filter((item) => item.isPinned)
              .map((item) => {
                const { _id } = item;

                return (
                  <NoteCard
                    initObj={initObj}
                    noteObj={item}
                    editObj={editObj}
                    setEditObj={setEditObj}
                    setNote={setNote}
                    key={_id}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;

function RichTextEditor() {
  return <div></div>;
}

//  <ReactQuill
//           modules={modules}
//           formats={formats}
//           className="custom-quill"
//           value={notes}
//           onChange={(e)=>setNotes(e.target.value)}
//         >
//           <div>
//             <span className="fs">Title</span>

//             <p onInput={(e) => setNotes(e.target.value)}>Take a note...</p>
//           </div>
//         </ReactQuill>
