import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import Layout from "components/Layout";
import styled from "styled-components";
import Catagory from "./Catagory";
import Remarks from "./Remarks";
import NumberPad from "./Numberpad";
import {MoneyDirection} from "store/catagoryReducer";
import TopBar from "components/TopBar";
import Tab from "components/Tab";
import {ValueOf} from "util/index";

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
interface RecordDataType {
  catagoryId: number;
  direction: MoneyDirection;
  amount: number;
}

interface IndexedRecordDataType extends RecordDataType {
  [index: string]: number | MoneyDirection;
}

interface alertDataType {
  catagoryId: string;
  direction?: string;
  amount: string;
  [index: string]: string | undefined;
}

export type recordDataFieldType = Partial<RecordDataType>;

const Record: React.FC = () => {
  const [recordData, setRecordData] = useState<RecordDataType>({
    catagoryId: -1,
    direction: MoneyDirection.EXPENDITURE,
    amount: 0
  });
  const isSubmitting = useRef(false);
  const {catagoryId, direction} = recordData;

  const onChange = useCallback(
    (key: keyof RecordDataType) => (value: ValueOf<RecordDataType>) => {
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
  const submit = useCallback((amount: number) => {
    onChange('amount')(amount)
    isSubmitting.current = true;
  }, []);
  // validate
  const validate = () => {

  }
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
        <NumberPad className="pad" onChange={submit}></NumberPad>
      </Wrapper>
    </Layout>
  );
};
export default React.memo(Record);
