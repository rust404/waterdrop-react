import React, {useState, useEffect} from "react";
import Layout from "components/layout";
import styled from "styled-components";
import MoneyDirection, {directionType} from "./moneydirection";
import Catagory from "./catagory";
import Remarks from "./remarks";
import NumberPad from "./numberpad";

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
type recordDataType = {
  catagoryName: string;
  direction: directionType;
  amount: number;
  [index: string]: any
};
type alertDataType = {
  catagoryName: string;
  direction: string;
  amount: string;
  [index: string]: string;
};
export type recordDataFieldType = Partial<recordDataType>;

const Record: React.FC = () => {
  const [recordData, setRecordData] = useState<recordDataType>({
    catagoryName: "",
    direction: "-",
    amount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {catagoryName, direction} = recordData;
  const onChange = (field: recordDataFieldType) => {
    setRecordData({
      ...recordData,
      ...field,
    });
  };
  const submit = (field: recordDataFieldType) => {
    const data = {
      ...recordData,
      ...field
    }
    if (data.direction === '+') {
      data.amount = Math.abs(data.amount)
    } else {
      data.amount = -Math.abs(data.amount)
    }
    setRecordData(data)
    setIsSubmitting(true)
  }
  useEffect(() => {
    if (!isSubmitting) return

    const alertData: alertDataType = {
      catagoryName: '请选择分类',
      direction: '请选择钱的流动方向(收入或支出)',
      amount: '钱不能为0'
    }
    // 不能为空
    for (let i of Object.keys(recordData)) {
      if (!recordData[i]) {
        alert(alertData[i])
        setIsSubmitting(false)
        return
      }
    }
    console.log(recordData)
    setIsSubmitting(false)
  }, [recordData, isSubmitting])
  return (
    <Layout>
      <Wrapper>
        <MoneyDirection
          direction={direction}
          onChange={onChange}
        ></MoneyDirection>
        <Catagory
          catagoryName={catagoryName}
          onChange={onChange}
          className="catagory"
        ></Catagory>
        <Remarks></Remarks>
        <NumberPad
          className="pad"
          onChange={submit}
        ></NumberPad>
      </Wrapper>
    </Layout>
  );
};
export default Record;
