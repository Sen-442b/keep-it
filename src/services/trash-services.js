import axios from "axios";

export const getTrashService = async (encToken) => {
  try {
    const response = await axios.get("/api/trash", {
      headers: { authorization: encToken },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const restoreTrashService = async (encToken, noteId) => {
  try {
    const response = await axios.post(
      `api/trash/restore/${noteId}`,
      {},
      { headers: { authorization: encToken } }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTrashService = async (encToken, noteId) => {
  try {
    const response = await axios.delete(`/api/trash/${noteId}`, {
      headers: { authorization: encToken },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
