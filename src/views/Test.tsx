import React, {useContext} from "react";
import {RecordContext} from "store";
import {MoneyDirection} from "store/catagoryReducer";
const Test = () => {
  const {state: records, dispatch: dispatchRecord} = useContext(RecordContext)
  return (
    <div>
      <div>{JSON.stringify(records)}</div>
      <button
        onClick={() =>
          dispatchRecord({
            type: 'addRecord',
            payload: {
              catagoryId: 1,
              time: (new Date()).toISOString(),
              direction: MoneyDirection.INCOME,
              amount: 100
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
            amount: Math.random(),
            time: (new Date()).toISOString()
          }
        })
      }}>modify</button>
    </div>
  );
};

export default Test;
