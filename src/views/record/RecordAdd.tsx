import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  FC,
  MouseEvent
} from "react";
import Layout from "components/Layout";
import styled from "styled-components";
import Category from "./common/Category";
import Remarks from "./common/Remarks";
import NumberPad from "./common/NumberPad";
import { MoneyDirection } from "store/categoryReducer";
import TopBar from "components/TopBar";
import { ValueOf } from "util/index";
import { IRecord } from "store/moneyRecordReducer";
import {CategoryContext, RecordContext} from "store";
import { useHistory } from "react-router-dom";
import RadioGroup from "../../components/Radio/RadioGroup";
import RadioButton from "../../components/Radio/RadioButton";
import CalcStrBar from "./common/CalcStrBar";
import CategoryList from "./common/CategoryList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  flex: 1;
  .category {
    align-content: flex-start;
    flex: 1;
    overflow: auto;
  }
  .pad {
    margin-top: auto;
  }
`;
type RecordData = Pick<IRecord, "categoryId" | "time" | "direction" | "amount">;

interface IndexedRecordDataType extends RecordData {
  [index: string]: number | MoneyDirection | string;
}

interface alertDataType {
  categoryId: string;
  direction?: string;
  amount: string;
  [index: string]: string | undefined;
}

export type recordDataFieldType = Partial<RecordData>;

const RecordAdd: FC = () => {
  const {state: category} = useContext(CategoryContext);
  const [recordData, setRecordData] = useState<RecordData>({
    categoryId: -1,
    direction: MoneyDirection.EXPENDITURE,
    amount: 0,
    time: new Date().toISOString(),
  });
  const [calcStr, setCalcStr] = useState('0')
  const history = useHistory();
  const { dispatch } = useContext(RecordContext);
  const isSubmitting = useRef(false);
  const { categoryId, direction, time } = recordData;

  const filterdCategory = category.filter(item => item.direction === direction)
  const handleManageClick = (e: MouseEvent) => {
    history.push(`/category/manage?direction=${direction}`)
    e.stopPropagation()
  }
  const onChange = useCallback(
    (key: keyof RecordData) => (value: ValueOf<RecordData>) => {
      setRecordData((state) => {
        const data = {
          ...state,
          [key]: value,
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
  const onDateChange = useCallback((date: Date) => {
    setRecordData((state) => {
      return {
        ...state,
        time: date.toISOString()
      }
    })
  }, [])
  const onCalcStrChange = useCallback((str: string) => {
    setCalcStr(str)
  }, [])
  const submit = useCallback(
    (amount: number, time: string) => {
      onChange("amount")(amount);
      onChange("time")(time);
      isSubmitting.current = true;
    },
    [onChange]
  );
  // validate
  useEffect(() => {
    if (!isSubmitting.current) return;

    const alertData: alertDataType = {
      categoryId: "请选择分类",
      amount: "钱不能为0",
    };
    // 不能为空
    for (let i of Object.keys(recordData)) {
      if (
        (i === "categoryId" && recordData[i] === -1) ||
        (i === "amount" && recordData[i] === 0) ||
        (recordData as IndexedRecordDataType)[i] === undefined
      ) {
        alert(alertData[i]);
        isSubmitting.current = false;
        return;
      }
    }
    dispatch({
      type: "addRecord",
      payload: {
        ...recordData,
      },
    });
    history.push("/record/detail");
    isSubmitting.current = false;
  }, [recordData, history, dispatch]);
  return (
    <Layout>
      <Wrapper>
        <TopBar>
          <RadioGroup value={recordData.direction} onChange={onChange('direction')}>
            <RadioButton label={MoneyDirection.INCOME}>收入</RadioButton>
            <RadioButton label={MoneyDirection.EXPENDITURE}>支出</RadioButton>
          </RadioGroup>
        </TopBar>
        {/*<Category*/}
        {/*  direction={direction}*/}
        {/*  categoryId={categoryId}*/}
        {/*  onChange={onChange("categoryId")}*/}
        {/*  className="category"*/}
        {/*/>*/}
        <CategoryList
          className="category"
          selectedId={categoryId}
          listData={filterdCategory}
          type="manage"
          onChange={onChange("categoryId")}
          onManageClick={handleManageClick}
        />
        <Remarks/>
        <CalcStrBar calcStr={calcStr}/>
        <NumberPad
          date={new Date(time)}
          onDateChange={onDateChange}
          onCalcStrChange={onCalcStrChange}
          className="pad"
          onSubmit={submit}
        />
      </Wrapper>
    </Layout>
  );
};
export default React.memo(RecordAdd);
