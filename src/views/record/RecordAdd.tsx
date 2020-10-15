import React, {
  useState,
  useCallback,
  useContext,
  FC,
  MouseEvent
} from "react";
import Layout from "components/Layout";
import styled from "styled-components";
import NumberPad from "./common/NumberPad";
import { MoneyType } from "store/categoryReducer";
import TopBar from "components/TopBar";
import { ValueOf } from "util/index";
import { MoneyRecord } from "store/moneyRecordReducer";
import {CategoryContext, RecordContext} from "store";
import { useHistory } from "react-router-dom";
import RadioGroup from "../../components/Radio/RadioGroup";
import RadioButton from "../../components/Radio/RadioButton";
import InfoBar from "./common/InfoBar";
import CategoryList from "./common/CategoryList";
import {message} from "../../components/Message";

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
type RecordData = Pick<MoneyRecord, "categoryId" | "time" | "moneyType" | "amount" | "remarks">;

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

const RecordAdd: FC = () => {
  const {state: category} = useContext(CategoryContext);
  const [recordData, setRecordData] = useState<RecordData>({
    categoryId: -1,
    moneyType: MoneyType.EXPENDITURE,
    amount: 0,
    time: new Date().toISOString(),
    remarks: ''
  });
  const [calcStr, setCalcStr] = useState('0')
  const history = useHistory();
  const { dispatch } = useContext(RecordContext);
  const { categoryId, moneyType, time, remarks } = recordData;

  const filteredCategory = category.filter(item => item.moneyType === moneyType)
  const handleManageClick = (e: MouseEvent) => {
    history.push(`/category/manage?moneyType=${moneyType}`)
    e.stopPropagation()
  }
  const onChange = useCallback(
    (key: keyof RecordData) => (value: ValueOf<RecordData>) => {
      setRecordData((state) => {
        return {
          ...state,
          [key]: value,
        };
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
  const onAmountChange = useCallback((amount: number) => {
    setRecordData((state) => {
      return {
        ...state,
        amount
      }
    })
  }, [])
  const onRemarksChange = useCallback((remarks: string) => {
    setRecordData((state) => {
      return {
        ...state,
        remarks
      }
    })
  }, [])
  const onCalcStrChange = useCallback((str: string) => {
    setCalcStr(str)
  }, [])
  const submit = useCallback(
    () => {
      // validate
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
          message.danger(alertData[i]);
          return;
        }
      }
      dispatch({
        type: "addRecord",
        payload: {
          ...recordData,
        },
      });
      message.success('添加记录成功')
      history.push("/record/detail");
    },
    [recordData, history, dispatch]
  );
  return (
    <Layout>
      <Wrapper>
        <TopBar>
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
        <InfoBar calcStr={calcStr} remarks={remarks} onRemarksChange={onRemarksChange}/>
        <NumberPad
          date={new Date(time)}
          onDateChange={onDateChange}
          onCalcStrChange={onCalcStrChange}
          onAmountChange={onAmountChange}
          className="pad"
          onSubmit={submit}
        />
      </Wrapper>
    </Layout>
  );
};
export default React.memo(RecordAdd);
