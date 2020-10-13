import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  FC,
} from "react";
import styled from "styled-components";
import Category from "./common/Category";
import Remarks from "./common/Remarks";
import NumberPad from "./common/NumberPad";
import { MoneyDirection, findCategory } from "store/categoryReducer";
import TopBar from "components/TopBar";
import { ValueOf } from "util/index";
import { IRecord, findRecord } from "store/moneyRecordReducer";
import { RecordContext, CategoryContext } from "store";
import { useHistory, useParams } from "react-router-dom";
import RadioGroup from "../../components/Radio/RadioGroup";
import RadioButton from "../../components/Radio/RadioButton";
import CalcStrBar from "./common/CalcStrBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  flex: 1;
  .category {
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

const RecordEdit: FC = () => {
  const history = useHistory();
  const { state: records, dispatch: dispatchRecords } = useContext(
    RecordContext
  );
  const [calcStr, setCalcStr] = useState('0')
  const { state: category } = useContext(CategoryContext);
  const { id } = useParams();

  const [recordData, setRecordData] = useState<RecordData>({
    categoryId: -1,
    direction: MoneyDirection.EXPENDITURE,
    amount: 0,
    time: new Date().toISOString(),
  });
  const isSubmitting = useRef(false);
  const { categoryId, direction, time, amount } = recordData;

  useEffect(() => {
    const record = findRecord(records, parseInt(id));
    if (!record) {
      history.push("/record/detail");
    } else {
      const { categoryId, direction, amount, time } = record;
      setRecordData({
        categoryId,
        direction,
        amount,
        time,
      });
      setCalcStr(''+amount)
    }
  }, [id, history, records]);

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
        const categoryItem = findCategory(category, data.categoryId);
        if (categoryItem && categoryItem.direction !== data.direction) {
          data.categoryId = -1;
        }
        return data;
      });
    },
    [category]
  );
  const submit = useCallback(
    (amount: number, time: string) => {
      onChange("amount")(amount);
      onChange("time")(time);
      isSubmitting.current = true;
    },
    [onChange]
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
    console.log('change', str)
    setCalcStr(str)
  }, [])
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
    dispatchRecords({
      type: "modifyRecord",
      payload: {
        id: parseInt(id),
        ...recordData,
      },
    });
    history.goBack();
    isSubmitting.current = false;
  }, [recordData, dispatchRecords, history, id]);
  return (
    <Wrapper>
      <TopBar showBack>
        <RadioGroup value={recordData.direction} onChange={onChange('direction')}>
          <RadioButton label={MoneyDirection.INCOME}>收入</RadioButton>
          <RadioButton label={MoneyDirection.EXPENDITURE}>支出</RadioButton>
        </RadioGroup>
      </TopBar>
      <Category
        direction={direction}
        categoryId={categoryId}
        onChange={onChange("categoryId")}
        className="category"
      />
      <Remarks/>
      <CalcStrBar calcStr={calcStr}/>
      <NumberPad
        date={new Date(time)}
        amount={amount}
        onDateChange={onDateChange}
        onCalcStrChange={onCalcStrChange}
        className="pad"
        onSubmit={submit}
      />
    </Wrapper>
  );
};
export default React.memo(RecordEdit);
