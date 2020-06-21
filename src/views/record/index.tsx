import React, {useState, useEffect, useRef, useCallback} from "react";
import Layout from "components/Layout";
import styled from "styled-components";
import Catagory from "./Catagory";
import Remarks from "./Remarks";
import NumberPad from "./Numberpad";
import {MoneyDirectionType} from "store/useCatagoryReducer";
import TopBar from "components/TopBar";
import Tab from "components/Tab";
import {ValueOf} from "util/index";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
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
  direction: MoneyDirectionType;
  amount: number;
};

interface IndexedRecordDataType extends RecordDataType {
  [index: string]: number | MoneyDirectionType;
}


interface alertDataType {
  catagoryId: string;
  direction?: string;
  amount: string;
  [index: string]: string | undefined;
};

export type recordDataFieldType = Partial<RecordDataType>;

const Record: React.FC = () => {
  const [recordData, setRecordData] = useState<RecordDataType>({
    catagoryId: -1,
    direction: MoneyDirectionType.EXPENDITURE,
    amount: 0
  });
  const isSubmitting = useRef(false);
  const {catagoryId, direction} = recordData;
  console.log(recordData)
  const onChange = useCallback((key: keyof RecordDataType) => (value: ValueOf<RecordDataType>) => {
    setRecordData({
      ...recordData,
      [key]: value
    })
  }, []);
  const submit = useCallback((amount: number) => {
    const data = {
      ...recordData,
      amount
    };
    if (data.direction === MoneyDirectionType.INCOME) {
      data.amount = Math.abs(data.amount);
    } else {
      data.amount = -Math.abs(data.amount);
    }
    setRecordData(data);
    isSubmitting.current = true
  }, []);
  useEffect(() => {
    if (!isSubmitting.current) return;

    const alertData: alertDataType = {
      catagoryId: "请选择分类",
      amount: "钱不能为0"
    };
    // 不能为空
    for (let i of Object.keys(recordData)) {
      if (!(recordData as IndexedRecordDataType)[i] || (i === "catagoryId" && recordData[i] === -1)) {
        alert(alertData[i]);
        isSubmitting.current = false
        return;
      }
    }
    isSubmitting.current = false
  }, [recordData]);
  return (
    <Layout>
      <Wrapper>
        <TopBar>
          <Tab
            onChange={onChange('direction')}
            value={direction}
            map={{
              支出: MoneyDirectionType.EXPENDITURE,
              收入: MoneyDirectionType.INCOME
            }}
          />
        </TopBar>
        <Catagory
          direction={direction}
          catagoryId={catagoryId}
          onChange={onChange('catagoryId')}
          className="catagory"
        ></Catagory>
        <Remarks></Remarks>
        <NumberPad className="pad" onChange={submit}></NumberPad>
      </Wrapper>
    </Layout>
  );
};
export default React.memo(Record);
