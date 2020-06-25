import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext
} from "react";
import Layout from "components/Layout";
import styled from "styled-components";
import Catagory from "./common/Catagory";
import Remarks from "./common/Remarks";
import NumberPad from "./common/Numberpad";
import {MoneyDirection} from "store/catagoryReducer";
import TopBar from "components/TopBar";
import Tab from "components/Tab";
import {ValueOf} from "util/index";
import {IRecord} from 'store/moneyRecordReducer'
import {RecordContext} from "store";
import {useHistory} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  flex: 1;
  .top {
    flex-shrink: 0;
  }
  .catagory {
    flex: 1;
    overflow: auto;
  }
  .pad {
    margin-top: auto;
  }
`;
type RecordData = Pick<IRecord, "catagoryId" | "time" | "direction" | "amount">;

interface IndexedRecordDataType extends RecordData {
  [index: string]: number | MoneyDirection | string;
}

interface alertDataType {
  catagoryId: string;
  direction?: string;
  amount: string;
  [index: string]: string | undefined;
}

export type recordDataFieldType = Partial<RecordData>;

const RecordAdd: React.FC = () => {
  const [recordData, setRecordData] = useState<RecordData>({
    catagoryId: -1,
    direction: MoneyDirection.EXPENDITURE,
    amount: 0,
    time: (new Date()).toISOString()
  });
  const history = useHistory()
  const {dispatch} = useContext(RecordContext)
  const isSubmitting = useRef(false);
  const {catagoryId, direction, time} = recordData;

  const onChange = useCallback(
    (key: keyof RecordData) => (value: ValueOf<RecordData>) => {
      setRecordData(state => {
        const data = {
          ...state,
          [key]: value
        };
        if (data.direction === MoneyDirection.INCOME) {
          data.amount = Math.abs(data.amount);
        } else {
          data.amount = -Math.abs(data.amount);
        }
        return data;
      });
    },
    []
  );
  const submit = useCallback((amount: number, time: string) => {
    onChange("amount")(amount);
    onChange("time")(time);
    isSubmitting.current = true;
  }, []);
  // validate
  useEffect(() => {
    if (!isSubmitting.current) return;

    const alertData: alertDataType = {
      catagoryId: "请选择分类",
      amount: "钱不能为0"
    };
    // 不能为空
    for (let i of Object.keys(recordData)) {
      if (
        !(recordData as IndexedRecordDataType)[i] ||
        (i === "catagoryId" && recordData[i] === -1)
      ) {
        alert(alertData[i]);
        isSubmitting.current = false;
        return;
      }
    }
    dispatch({
      type: 'addRecord',
      payload: {
        ...recordData
      }
    })
    history.push('/record/detail')
    isSubmitting.current = false;
  }, [recordData]);
  const MTab = useMemo(() => {
    return (
      <Tab
        onChange={onChange("direction")}
        value={direction}
        map={{
          支出: MoneyDirection.EXPENDITURE,
          收入: MoneyDirection.INCOME
        }}
      />
    );
  }, [direction]);
  return (
    <Layout>
      <Wrapper>
        <TopBar className="top">{MTab}</TopBar>
        <Catagory
          direction={direction}
          catagoryId={catagoryId}
          onChange={onChange("catagoryId")}
          className="catagory"
        ></Catagory>
        <Remarks></Remarks>
        <NumberPad time={time} className="pad" onChange={submit}></NumberPad>
      </Wrapper>
    </Layout>
  );
};
export default React.memo(RecordAdd);
