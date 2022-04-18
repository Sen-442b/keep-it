import React, { useEffect } from "react";
import { useGlobalVarContext } from "../../../global-context/global-variables";
import { useTrashContext } from "../../../global-context/trash-context";
import { getTrashService } from "../../../services/trash-services";
import TrashNotes from "./TrashNotes";

function Trash() {
  const { token } = useGlobalVarContext();
  const { state: trashState, dispatch: trashDispatch } = useTrashContext();
  console.log(trashState);
  const { trash } = trashState;
  const getTrashNotes = async (encToken) => {
    const resp = await getTrashService(encToken);

    trashDispatch({ type: "ADD_TRASH", payload: resp.data.trash });
  };
  useEffect(() => getTrashNotes(token), []);

  return (
    <div>
      {trash.length !== 0 &&
        trash.map((noteItem) => (
          <TrashNotes noteItem={noteItem} key={noteItem._id} />
        ))}
    </div>
  );
}

export default Trash;
//The quic
