import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  FC, MouseEvent, ChangeEvent,
} from "react";
import styled from "styled-components";
import NumberPad from "./common/NumberPad";
import {getCategoryById} from "store/selectors/category";
import TopBar from "components/TopBar";
import {ValueOf} from "util/index";
import {getRecordById} from "store/selectors/moneyRecord";
import {useHistory, useParams} from "react-router-dom";
import RadioGroup from "../../components/Radio/RadioGroup";
import RadioButton from "../../components/Radio/RadioButton";
import InfoBar from "./common/InfoBar";
import CategoryList from "./common/CategoryList";
import {message} from "../../components/Message";
import {danger} from "../../style/variables";
import {MoneyRecordsContext} from "../../store/moneyRecordsStore";
import {CategoriesContext} from "../../store/categoriesStore";
import {deleteRecord, modifyRecord} from "../../store/actions/moneyRecord";

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
  const {moneyRecords, dispatchMoneyRecords} = useContext(MoneyRecordsContext);
  const [calcStr, setCalcStr] = useState('0')
  const {categories} = useContext(CategoriesContext);
  const {id} = useParams();

  const [recordData, setRecordData] = useState<RecordData>({
    categoryId: '',
    moneyType: 'expenditure',
    amount: 0,
    time: new Date().toISOString(),
    remarks: ''
  });
  const {categoryId, moneyType, time, amount, remarks} = recordData;
  const filteredCategory = categories.filter(item => item.moneyType === moneyType)

  const onRemarksChange = useCallback((remarks: string) => {
    setRecordData((state) => {
      return {
        ...state,
        remarks
      }
    })
  }, [])
  useEffect(() => {
    const record = getRecordById(moneyRecords, id);
    if (!record) {
      history.push("/record/detail");
    } else {
      const {categoryId, moneyType, amount, time, remarks} = record;
      setRecordData({
        categoryId,
        moneyType,
        amount,
        time,
        remarks: remarks || ''
      });
      setCalcStr('' + amount)
    }
  }, [id, history, moneyRecords]);

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
        const categoryItem = getCategoryById(categories, data.categoryId);
        if (categoryItem && categoryItem.moneyType !== data.moneyType) {
          data.categoryId = '';
        }
        return data;
      });
    },
    [categories]
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
          (i === "categoryId" && recordData[i] === '') ||
          (i === "amount" && recordData[i] === 0) ||
          (recordData as IndexedRecordDataType)[i] === undefined
        ) {
          message.danger(alertData[i]);
          return;
        }
      }
      dispatchMoneyRecords(modifyRecord({
        id,
        ...recordData,
      }));
      message.success('编辑记录成功')
      history.goBack();
    },
    [history, recordData, dispatchMoneyRecords, id]
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
    dispatchMoneyRecords(deleteRecord({
      id
    }))
    message.success('删除成功')
  }
  const onMoneyTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as MoneyType
    setRecordData((state) => ({
      ...state,
      moneyType: value,
    }))
  }
  return (
    <Wrapper>
      <TopBar showBack right={<DeleteBtn onClick={handleDelete}>删除</DeleteBtn>}>
        <RadioGroup value={recordData.moneyType} onChange={onMoneyTypeChange}>
          <RadioButton label="income">收入</RadioButton>
          <RadioButton label="expenditure">支出</RadioButton>
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
