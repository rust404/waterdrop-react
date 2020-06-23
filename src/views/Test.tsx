import React, {useContext} from "react";
import Context, {RecordContext} from "store";
const Test = () => {
  const {state, dispatch} = useContext(Context);
  const {state: records, dispatch: dispatchRecord} = useContext(RecordContext)
  return (
    <div>
      {/* {JSON.stringify(state)} */}
      {/* <button */}
      {/*   onClick={() => */}
      {/*     dispatch({ */}
      {/*       type: "addCatagory", */}
      {/*       option: { */}
      {/*         name: Math.random().toString(), */}
      {/*         direction: "-" */}
      {/*       } */}
      {/*     }) */}
      {/*   } */}
      {/* > */}
      {/*   dispatch */}
      {/* </button> */}
      <div>{JSON.stringify(records)}</div>
      <button
        onClick={() =>
          dispatchRecord({
            type: 'addRecord',
            payload: {
              catagoryId: 1
            }
          })
        }
      >dispatch</button>
      <button onClick={() => {
        dispatchRecord({
          type: 'deleteRecord',
          payload: {
            id: 0
          }
        })
      }}>delete</button>
      <button onClick={() => {
        dispatchRecord({
          type: 'modifyRecord',
          payload: {
            id: 2,
            catagoryId: 10,
            amount: Math.random()
          }
        })
      }}>modify</button>
    </div>
  );
};

export default Test;
