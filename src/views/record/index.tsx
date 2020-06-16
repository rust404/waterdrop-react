import React, {useState} from "react";
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
};
export type recordDataFieldType = Partial<recordDataType>;

const Record: React.FC = () => {
  const [recordData, setRecordData] = useState<recordDataType>({
    catagoryName: "",
    direction: "-",
    amount: 0,
  });
  const {catagoryName, direction, amount} = recordData;
  const onChange = (field: recordDataFieldType) => {
    setRecordData({
      ...recordData,
      ...field,
    });
  };
  return (
    <Layout>
      <Wrapper>
        <div>{amount}</div>
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
          onChange={onChange}
        ></NumberPad>
      </Wrapper>
    </Layout>
  );
};
export default Record;
