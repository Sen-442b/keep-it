import React, { useEffect, useState } from "react";
import NoteCard from "../Notes/NoteCard";
import { getArchivesService } from "../../../services/archive-services";
import { useArchiveContext } from "../../../global-context/archive-context";
import { useGlobalVarContext } from "../../../global-context/global-variables";
import ArchiveNotes from "./ArchiveNotes";
import ArchiveNoteInput from "./ArchiveNoteInput";

export default function Archive() {
  const { state, dispatch } = useArchiveContext();

  const [editObj, setEditObj] = useState({
    isEditing: false,
    noteId: "",
    note: {},
  });
  const { isEditing } = editObj;
  const { archives } = state;
  const { token } = useGlobalVarContext();
  const getArchivesHandler = async (encToken) => {
    const response = await getArchivesService(encToken);
    dispatch({ type: "ADD_ARCHIVE", payload: response.data.archives });
  };
  useEffect(() => getArchivesHandler(token), [token]);

  return (
    <div>
      {isEditing && (
        <ArchiveNoteInput editObj={editObj} setEditObj={setEditObj} />
      )}
      <div>
        {archives.length != 0 &&
          archives.map((archiveObj) => (
            <ArchiveNotes
              key={archiveObj._id}
              archiveObj={archiveObj}
              setEditObj={setEditObj}
            />
          ))}
      </div>
    </div>
  );
}
