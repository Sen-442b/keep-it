import axios from "axios";

export const getArchivesService = async (encodedToken) => {
  try {
    const response = await axios.get("/api/archives", {
      headers: { authorization: encodedToken },
    });

    console.log(response, "here");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postArchivesService = async (encodedToken, noteId, note) => {
  try {
    const response = await axios.post(
      `/api/notes/archives/${noteId}`,
      { note },
      {
        headers: { authorization: encodedToken },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const transferFromArchiveToTrashService = async (
  encodedToken,
  noteId,
  note
) => {
  try {
    const response = await axios.post(
      `api/notes/archive-transfer/${noteId}`,
      { note },
      {
        headers: { authorization: encodedToken },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
