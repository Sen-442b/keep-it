import React from "react";
import { useParams } from "react-router-dom";
import { useNotesContext } from "../../../global-context/notes-context";
import LabelNotes from "./LabelNotes";
function LabelTags() {
  const { state } = useNotesContext();
  const { labelId } = useParams();

  return (
    <div>
      {state.notes
        .filter((note) => note.labelOnNote.includes(labelId))
        .map((noteObj) => {
          return <LabelNotes noteObj={noteObj} key={noteObj._id} />;
        })}
    </div>
  );
}

export default LabelTags;
