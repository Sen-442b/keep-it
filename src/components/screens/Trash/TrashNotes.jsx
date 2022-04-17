import React from "react";
import { useGlobalVarContext } from "../../../global-context/global-variables";
import { useNotesContext } from "../../../global-context/notes-context";
import { useTrashContext } from "../../../global-context/trash-context";
import { restoreTrashService } from "../../../services/trash-services";

function TrashNotes({ noteItem }) {
  const { token } = useGlobalVarContext();
  const { dispatch: trashDispatch } = useTrashContext();
  const { state: notesState, dispatch: notesDispatch } = useNotesContext();
  const { _id, title, content, colorPref, isPinned, stylePref } = noteItem;
  const restoreTrashHandler = async (encToken, noteId) => {
    const resp = await restoreTrashService(encToken, noteId);

    trashDispatch({ type: "ADD_TRASH", payload: resp.data.trash });
    notesDispatch({ type: "ADD_NOTES", payload: resp.data.notes });
  };
  return (
    <div class="notes-wrapper" style={{ backgroundColor: colorPref }}>
      <h3 className="fs-mdm">{title}</h3>
      <p className={stylePref.toString().replaceAll(",", " ")}>{content}</p>
      <div className="flex-f-end">
        <button onClick={() => restoreTrashHandler(token, _id)}>Restore</button>
        <button>Delete</button>
      </div>
      <button
        className="notes-pos-abs-top-right"
        style={{ color: isPinned ? "green" : "blue" }}
      >
        <i className="fas fa-thumbtack"></i>
      </button>
    </div>
  );
}

export default TrashNotes;
