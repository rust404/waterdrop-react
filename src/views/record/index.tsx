import React, {useState, useEffect} from "react";
import Layout from "components/layout";
import styled from "styled-components";
import MoneyDirection from "./moneydirection";
import Catagory from "./catagory";
import Remarks from "./remarks";
import NumberPad from "./numberpad";
import {moneyDirectionType} from "./useCatagory";

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
  catagoryId: number;
  direction: moneyDirectionType;
  amount: number;
  [index: string]: any;
};
type alertDataType = {
  catagoryId: string;
  direction?: string;
  amount: string;
  [index: string]: any;
};
export type recordDataFieldType = Partial<recordDataType>;

const Record: React.FC = () => {
  const [recordData, setRecordData] = useState<recordDataType>({
    catagoryId: -1,
    direction: "-",
    amount: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {catagoryId, direction} = recordData;
  const onChange = (field: recordDataFieldType) => {
    setRecordData({
      ...recordData,
      ...field
    });
  };
  const submit = (field: recordDataFieldType) => {
    const data = {
      ...recordData,
      ...field
    };
    if (data.direction === "+") {
      data.amount = Math.abs(data.amount);
    } else {
      data.amount = -Math.abs(data.amount);
    }
    setRecordData(data);
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (!isSubmitting) return;

    const alertData: alertDataType = {
      catagoryId: "请选择分类",
      amount: "钱不能为0"
    };
    // 不能为空
    for (let i of Object.keys(recordData)) {
      if (!recordData[i] || (i === "catagoryId" && recordData[i] === -1)) {
        alert(alertData[i]);
        setIsSubmitting(false);
        return;
      }
    }
    console.log(recordData);
    setIsSubmitting(false);
  }, [recordData, isSubmitting]);
  return (
    <Layout>
      <Wrapper>
        <MoneyDirection
          direction={direction}
          onChange={onChange}
        ></MoneyDirection>
        <Catagory
          direction={direction}
          catagoryId={catagoryId}
          onChange={onChange}
          className="catagory"
        ></Catagory>
        <Remarks></Remarks>
        <NumberPad className="pad" onChange={submit}></NumberPad>
      </Wrapper>
    </Layout>
  );
};
export default Record;
