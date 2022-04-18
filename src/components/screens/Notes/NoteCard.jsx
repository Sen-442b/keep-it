import axios from "axios";
import React from "react";
import { useState } from "react/cjs/react.production.min";

import { useGlobalVarContext } from "../../../global-context/global-variables";
import { useNotesContext } from "../../../global-context/notes-context";
import { postArchivesService } from "../../../services/archive-services";
import { useArchiveContext } from "../../../global-context/archive-context";
import {
  editNotesService,
  transferToTrashService,
} from "../../../services/notes-services";

const NoteCard = ({ initObj, noteObj, editObj, setEditObj, setNote }) => {
  const { dispatch: archiveDispatch } = useArchiveContext();

  const { dispatch } = useNotesContext();
  const { token } = useGlobalVarContext();

  const { _id, title, content, isPinned, colorPref, stylePref, priority } =
    noteObj;
  const { noteId } = editObj;

  const deleteFromNotesService = async (encToken, noteId) => {
    try {
      const response = axios.delete(`/api/notes/${noteId}`, {
        headers: { authorization: encToken },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const postToArchiveNotesHandler = async (encToken, noteId, note) => {
    const resp = await postArchivesService(encToken, noteId, note);
    dispatch({ type: "ADD_NOTES", payload: resp.data.notes });
  };

  const togglePinState = async (encToken, noteId, noteObj) => {
    const note = {
      ...noteObj,
      isPinned: !noteObj.isPinned,
    };

    const response = await editNotesService(encToken, noteId, note);
    console.log(response);
    dispatch({ type: "ADD_NOTES", payload: response.data.notes });
  };
  const deleteFromNotesHandler = async (encToken, noteId) => {
    const resp = await deleteFromNotesService(encToken, noteId);

    dispatch({ type: "ADD_NOTES", payload: resp.data.notes });
    archiveDispatch({ type: "ADD_ARCHIVE", payload: resp.data.archives });
  };
  const transferToTrashHandler = async (encToken, noteId, note) => {
    console.log(encToken, noteId, note);
    const resp = await transferToTrashService(encToken, noteId, note);
    console.log(resp);
    dispatch({ type: "ADD_NOTES", payload: resp.data.notes });
  };

  const updateNotePriority = async (
    encToken,
    noteId,
    noteObj,
    priorityPref
  ) => {
    console.log(priorityPref);
    const note = { ...noteObj, priority: priorityPref };
    const response = await editNotesService(encToken, noteId, note);
    dispatch({ type: "ADD_NOTES", payload: response.data.notes });
  };

  return (
    <div className="notes-wrapper" style={{ backgroundColor: colorPref }}>
      <h3 className="fs-mdm">{title}</h3>
      <p className={stylePref.toString().replaceAll(",", " ")}>{content}</p>
      <div className="flex-f-end">
        <div>
          <label htmlFor="priority">Priority: </label>
          <select
            id="priority"
            onChange={(e) =>
              updateNotePriority(token, _id, noteObj, e.target.value)
            }
            value={priority}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          className="btn cursor-pointer"
          onClick={
            noteId === _id
              ? () => {
                  setEditObj((prevObj) => ({
                    ...prevObj,
                    isEditing: false,
                    noteId: "",
                  }));

                  setNote(initObj);
                }
              : () => {
                  setEditObj((prevObj) => ({
                    ...prevObj,
                    isEditing: true,
                    noteId: _id,
                  }));

                  setNote(noteObj);
                }
          }
        >
          {noteId === _id ? "Cancel" : "Edit"}
        </button>

        <button
          onClick={() => {
            if (noteId === _id) {
              setNote(initObj);
              setEditObj((prevObj) => ({
                ...prevObj,
                isEditing: false,
                noteId: "",
              }));
            }
            transferToTrashHandler(token, _id, noteObj);
          }}
          className="btn btn-outlined"
        >
          Delete
        </button>
        <button onClick={() => postToArchiveNotesHandler(token, _id, noteObj)}>
          Archive
        </button>
      </div>

      <button
        className="notes-pos-abs-top-right"
        style={{ color: isPinned ? "green" : "blue" }}
        title={isPinned ? "Pinned Note" : "Pin Note"}
        onClick={() => togglePinState(token, _id, noteObj)}
      >
        <i className="fas fa-thumbtack"></i>
      </button>
    </div>
  );
};

export default NoteCard;

/*
Cancel Edit Feature
 <button
          className="btn cursor-pointer"
          onClick={
            isEditing
              ? () => {
                  setEditObj((prevObj) => ({
                    ...prevObj,
                    isEditing: false,
                    noteId: "",
                  }));

                  setNote(initObj);
                }
              : () => {
                  setEditObj((prevObj) => ({
                    ...prevObj,
                    isEditing: true,
                    noteId: _id,
                  }));

                  setNote(noteObj);
                }
          }
        >
          {isEditing ? "Cancel" : "Edit"}
        </button> */
