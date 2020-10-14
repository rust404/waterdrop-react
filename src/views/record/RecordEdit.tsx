import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  FC, MouseEvent,
} from "react";
import styled from "styled-components";
import Remarks from "./common/Remarks";
import NumberPad from "./common/NumberPad";
import { MoneyType, findCategory } from "store/categoryReducer";
import TopBar from "components/TopBar";
import { ValueOf } from "util/index";
import { IRecord, findRecord } from "store/moneyRecordReducer";
import { RecordContext, CategoryContext } from "store";
import { useHistory, useParams } from "react-router-dom";
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
    flex: 1;
    overflow: auto;
    align-content: flex-start;
  }
  .pad {
    margin-top: auto;
  }
`;
type RecordData = Pick<IRecord, "categoryId" | "time" | "moneyType" | "amount">;

interface IndexedRecordDataType extends RecordData {
  [index: string]: number | MoneyType | string;
}

interface alertDataType {
  categoryId: string;
  moneyType?: string;
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
    moneyType: MoneyType.EXPENDITURE,
    amount: 0,
    time: new Date().toISOString(),
  });
  const { categoryId, moneyType, time, amount } = recordData;
  const filteredCategory = category.filter(item => item.moneyType === moneyType)

  useEffect(() => {
    const record = findRecord(records, parseInt(id));
    if (!record) {
      history.push("/record/detail");
    } else {
      const { categoryId, moneyType, amount, time } = record;
      setRecordData({
        categoryId,
        moneyType,
        amount,
        time,
      });
      setCalcStr(''+amount)
    }
  }, [id, history, records]);

  const handleManageClick = (e: MouseEvent) => {
    history.push(`/category/manage?moneyType=${moneyType}`)
    e.stopPropagation()
  }

  const onChange = useCallback(
    (key: keyof RecordData) => (value: ValueOf<RecordData>) => {
      setRecordData((state) => {
        const data = {
          ...state,
          [key]: value,
        };
        if (data.moneyType === MoneyType.INCOME) {
          data.amount = Math.abs(data.amount);
        } else {
          data.amount = -Math.abs(data.amount);
        }
        const categoryItem = findCategory(category, data.categoryId);
        if (categoryItem && categoryItem.moneyType !== data.moneyType) {
          data.categoryId = -1;
        }
        return data;
      });
    },
    [category]
  );
  const submit = useCallback(
    () => {
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
    },
    [history, recordData, dispatchRecords, id]
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
  const onAmountChange = useCallback((amount: number) => {
    setRecordData((state) => {
      return {
        ...state,
        amount
      }
    })
  }, [])
  return (
    <Wrapper>
      <TopBar showBack>
        <RadioGroup value={recordData.moneyType} onChange={onChange('moneyType')}>
          <RadioButton label={MoneyType.INCOME}>收入</RadioButton>
          <RadioButton label={MoneyType.EXPENDITURE}>支出</RadioButton>
        </RadioGroup>
      </TopBar>
      <CategoryList
        className="category"
        selectedId={categoryId}
        listData={filteredCategory}
        type="manage"
        onChange={onChange("categoryId")}
        onManageClick={handleManageClick}
      />
      <Remarks/>
      <CalcStrBar calcStr={calcStr}/>
      <NumberPad
        date={new Date(time)}
        amount={amount}
        onAmountChange={onAmountChange}
        onDateChange={onDateChange}
        onCalcStrChange={onCalcStrChange}
        className="pad"
        onSubmit={submit}
      />
    </Wrapper>
  );
};
export default React.memo(RecordEdit);
