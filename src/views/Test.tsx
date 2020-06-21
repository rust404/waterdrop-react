import React, {useContext} from "react";
import Context from "store";
const Test = () => {
  const {state, dispatch} = useContext(Context);
  return (
    <div>
      {JSON.stringify(state)}
      <button
        onClick={() =>
          dispatch({
            type: "addCatagory",
            option: {
              name: Math.random().toString(),
              direction: "-"
            }
          })
        }
      >
        dispatch
      </button>
    </div>
  );
};

export default Test;
