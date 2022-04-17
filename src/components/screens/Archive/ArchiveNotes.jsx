import axios from "axios";
import React from "react";
import { useArchiveContext } from "../../../global-context/archive-context";
import { useGlobalVarContext } from "../../../global-context/global-variables";
import { useNotesContext } from "../../../global-context/notes-context";
import { useTrashContext } from "../../../global-context/trash-context";
import {
  postArchivesService,
  transferFromArchiveToTrashService,
} from "../../../services/archive-services";

const ArchiveNotes = ({ archiveObj, setEditObj }) => {
  const { _id, title, content, isPinned, colorPref, stylePref } = archiveObj;
  const { token } = useGlobalVarContext();
  const { dispatch: archiveDispatch } = useArchiveContext();
  const { dispatch: notesDispatch } = useNotesContext();
  const { dispatch: trashDispatch } = useTrashContext();
  const restoreArchiveHandler = async (encToken, noteId) => {
    const response = await axios.post(
      `/api/archives/restore/${noteId}`,
      {},
      { headers: { authorization: encToken } }
    );
    console.log(response);
    archiveDispatch({ type: "ADD_ARCHIVE", payload: response.data.archives });
    trashDispatch({ type: "ADD_TRASH", payload: response.data.trash });
  };

  const transferArchiveToTrashHandler = async (
    encodedToken,
    noteId,
    noteObj
  ) => {
    const resp = await transferFromArchiveToTrashService(
      encodedToken,
      noteId,
      noteObj
    );
    archiveDispatch({ type: "ADD_ARCHIVE", payload: resp.data.archives });
    notesDispatch({ type: "ADD_NOTES", payload: resp.data.notes });
  };
  return (
    <div class="notes-wrapper" style={{ backgroundColor: colorPref }}>
      <h3 className="fs-mdm">{title}</h3>
      <p className={stylePref.toString().replaceAll(",", " ")}>{content}</p>
      <div className="flex-f-end">
        <button onClick={() => restoreArchiveHandler(token, _id)}>
          Restore
        </button>
        <button
          onClick={() => transferArchiveToTrashHandler(token, _id, archiveObj)}
        >
          Delete
        </button>
      </div>
      <button
        className="notes-pos-abs-top-right"
        style={{ color: isPinned ? "green" : "blue" }}
      >
        <i className="fas fa-thumbtack"></i>
      </button>
    </div>
  );
};

export default ArchiveNotes;
