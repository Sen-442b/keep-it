import React from "react";
import { NavLink } from "react-router-dom";
import { useNotesContext } from "../../global-context/notes-context";

function Aside() {
  const { state, dispatch } = useNotesContext();

  const { sortByTime, filterByPriority } = state;

  return (
    <nav>
      <div>
        <NavLink to="/"> Notes</NavLink>
      </div>
      <div>
        <NavLink to="/archive">Archive</NavLink>
      </div>
      <div>
        <NavLink to="/trash">Trash</NavLink>
      </div>
      <div>
        <h4>Filters</h4>
        <div>
          <h5>Sort By Time </h5>
          <div>
            <input
              type="radio"
              id="new-to-old"
              name="sort-by-time"
              value="new-to-old"
              checked={sortByTime === "new-to-old"}
              onChange={(e) =>
                dispatch({ type: "SORT", payload: e.target.value })
              }
            />
            <label htmlFor="new-to-old">New to Old</label>
          </div>

          <div>
            <input
              type="radio"
              id="old-to-new"
              name="sort-by-time"
              value="old-to-new"
              checked={sortByTime === "old-to-new"}
              onChange={(e) =>
                dispatch({ type: "SORT", payload: e.target.value })
              }
            />
            <label htmlFor="old-to-new">Old to New</label>
          </div>
        </div>
        <div>
          <h5>Priority</h5>
          <div>
            <input
              type="checkbox"
              name="low"
              id="low"
              value="low"
              checked={filterByPriority.includes("low")}
              onChange={(e) =>
                dispatch({ type: "PRIORITY", payload: e.target.value })
              }
            />
            <label htmlFor="low">Low</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="medium"
              id="medium"
              value="medium"
              checked={filterByPriority.includes("medium")}
              onChange={(e) =>
                dispatch({ type: "PRIORITY", payload: e.target.value })
              }
            />
            <label htmlFor="medium">Medium</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="high"
              id="high"
              value="high"
              checked={filterByPriority.includes("high")}
              onChange={(e) =>
                dispatch({ type: "PRIORITY", payload: e.target.value })
              }
            />
            <label htmlFor="high">High</label>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </nav>
  );
}

export default Aside;

function DefaultRoutes({ children }) {
  return;
}
