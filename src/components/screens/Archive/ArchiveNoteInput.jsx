import React, { useState } from "react";
import { useArchiveContext } from "../../../global-context/archive-context";
import { useGlobalVarContext } from "../../../global-context/global-variables";
import { postArchivesService } from "../../../services/archive-services";

// WORK IN PROGRESS
const ArchiveNoteInput = ({ editObj, setEditObj }) => {
  const { token } = useGlobalVarContext();
  const [note, setNote] = useState(editObj.note);
  const { isEditing, noteId } = editObj;
  const { dispatch } = useArchiveContext();

  const { title, content, stylePref, colorPref, isPinned } = note;
  const editArchiveHandler = async (encToken, noteId, note) => {
    console.log({ encToken, noteId, note });
    const response = await postArchivesService(encToken, noteId, note);
    console.log(response);
    dispatch({ type: "ADD_ARCHIVE", payload: response.data.archives });
  };

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

  return (
    <div
      className="flex-center notes-wrapper modal-container"
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
                timeCreated: `${new Date().getHours()} : ${new Date().getMinutes()}`,
                dateAdded: new Date().toLocaleDateString(),
              }))
            }
            custom-placeholder="Add Note..."
          ></textarea>
        </div>
        <div className="flex-spc-btwn text-align-center">
          <button className="btn" onClick={() => changeStylePref("bold-text")}>
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
          />

          <div className="flex-spc-btwn gap-sml">
            <button
              className="btn alert-secondary"
              onClick={() => {
                editArchiveHandler(token, noteId, note);
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
        </div>
      </div>
    </div>
  );
};

export default ArchiveNoteInput;
