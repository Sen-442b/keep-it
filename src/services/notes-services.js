import axios from "axios";

export const editNotesService = async (encToken, noteId, note) => {
  try {
    const resp = await axios.post(
      `/api/notes/${noteId}`,
      { note },
      {
        headers: { authorization: encToken },
      }
    );

    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const transferToTrashService = async (encToken, noteId, note) => {
  try {
    const response = await axios.post(
      `/api/notes/transfer/${noteId}`,
      { note },
      { headers: { authorization: encToken } }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
