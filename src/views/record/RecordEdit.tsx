import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  FC, MouseEvent,
} from "react";
import styled from "styled-components";
import NumberPad from "./common/NumberPad";
import {getCategoryById} from "store/categoryReducer";
import TopBar from "components/TopBar";
import { ValueOf } from "util/index";
import {  getRecordById } from "store/moneyRecordReducer";
import { useHistory, useParams } from "react-router-dom";
import RadioGroup from "../../components/Radio/RadioGroup";
import RadioButton from "../../components/Radio/RadioButton";
import InfoBar from "./common/InfoBar";
import CategoryList from "./common/CategoryList";
import {message} from "../../components/Message";
import {danger} from "../../style/variables";
import {MoneyRecordContext} from "../../store/moneyRecordStore";
import {CategoryContext} from "../../store/categoryStore";

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
const DeleteBtn = styled.span`
  color: ${danger}
`
type RecordData = Pick<MoneyRecord, "categoryId" | "time" | "moneyType" | "amount" | "remarks">;

interface IndexedRecordDataType extends RecordData {
  [index: string]: number | MoneyType | string | undefined;
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
    MoneyRecordContext
  );
  const [calcStr, setCalcStr] = useState('0')
  const { state: category } = useContext(CategoryContext);
  const { id } = useParams();

  const [recordData, setRecordData] = useState<RecordData>({
    categoryId: -1,
    moneyType: 'expenditure',
    amount: 0,
    time: new Date().toISOString(),
    remarks: ''
  });
  const { categoryId, moneyType, time, amount, remarks } = recordData;
  const filteredCategory = category.filter(item => item.moneyType === moneyType)

  const onRemarksChange = useCallback((remarks: string) => {
    setRecordData((state) => {
      return {
        ...state,
        remarks
      }
    })
  }, [])
  useEffect(() => {
    const record = getRecordById(records, parseInt(id));
    if (!record) {
      history.push("/record/detail");
    } else {
      const { categoryId, moneyType, amount, time, remarks } = record;
      setRecordData({
        categoryId,
        moneyType,
        amount,
        time,
        remarks: remarks || ''
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
        const categoryItem = getCategoryById(category, data.categoryId);
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
          message.danger(alertData[i]);
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
      message.success('编辑记录成功')
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
  const handleDelete = () => {
    dispatchRecords({
      type: "deleteRecord",
      payload: {
        id: +id
      }
    })
    message.success('删除成功')
  }
  return (
    <Wrapper>
      <TopBar showBack right={<DeleteBtn onClick={handleDelete}>删除</DeleteBtn>}>
        <RadioGroup value={recordData.moneyType} onChange={onChange('moneyType')}>
          <RadioButton label={'income'}>收入</RadioButton>
          <RadioButton label={'expenditure'}>支出</RadioButton>
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
