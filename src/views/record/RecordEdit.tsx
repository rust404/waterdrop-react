import React, {
  useState,
  useCallback,
  useContext,
  FC, MouseEvent, ChangeEvent,
} from "react";
import styled from "styled-components";
import NumberPad from "./common/NumberPad";
import TopBar from "components/TopBar";
import {moneyRecordValidator} from "util/index";
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
import {ErrorList} from "async-validator";
import useMoneyRecord from "../../hooks/useMoneyRecord";

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

const RecordEdit: FC = () => {
  const history = useHistory();
  const {moneyRecords, dispatchMoneyRecords} = useContext(MoneyRecordsContext);
  const [calcStr, setCalcStr] = useState('0')
  const {categories} = useContext(CategoriesContext);
  const {id} = useParams();

  const initialRecordData = getRecordById(moneyRecords, id);
  const [recordData, dispatchRecordData] = useMoneyRecord(initialRecordData || {
    time: new Date().toISOString(),
    amount: 0,
    moneyType: 'expenditure',
  })
  const {categoryId, moneyType, time, amount, remarks} = recordData;
  const filteredCategory = categories.filter(item => item.moneyType === moneyType)

  if (!initialRecordData) {
    history.replace('record/add')
  }

  const onRemarksChange = useCallback((remarks: string) => {
    dispatchRecordData({
      type: 'remarks',
      payload: remarks
    })
  }, [dispatchRecordData])

  const handleManageClick = (e: MouseEvent) => {
    history.push(`/category/manage?moneyType=${moneyType}`)
    e.stopPropagation()
  }

  const submit = useCallback(
    () => {
      moneyRecordValidator.validate(recordData).then(() => {
        dispatchMoneyRecords(modifyRecord({
          id,
          ...recordData,
        }));
        message.success('编辑记录成功')
        history.goBack();
      }).catch(({errors}: { errors: ErrorList }) => {
        errors.forEach(error => {
          message.danger(error.message)
        })
      })
    },
    [history, recordData, dispatchMoneyRecords, id]
  );
  const onDateChange = useCallback((date: Date) => {
    dispatchRecordData({
      type: 'time',
      payload: date
    })
  }, [dispatchRecordData])
  const onCalcStrChange = useCallback((str: string) => {
    setCalcStr(str)
  }, [])
  const onAmountChange = useCallback((amount: number) => {
    dispatchRecordData({
      type: 'amount',
      payload: amount
    })
  }, [dispatchRecordData])
  const handleDelete = () => {
    dispatchMoneyRecords(deleteRecord({
      id
    }))
    message.success('删除成功')
  }
  const onMoneyTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value !== 'income' && value !== 'expenditure') return
    dispatchRecordData({
      type: 'moneyType',
      payload: value
    })
    dispatchRecordData({
      type: 'categoryId',
      payload: ''
    })
  }
  const onCategoryChange = useCallback((id: string) => {
    dispatchRecordData({
      type: 'categoryId',
      payload: id
    })
  }, [dispatchRecordData])
  return (
    <Wrapper>
      <TopBar showBack right={<DeleteBtn onClick={handleDelete}>删除</DeleteBtn>}>
        <RadioGroup value={recordData.moneyType as MoneyType} onChange={onMoneyTypeChange}>
          <RadioButton label="income">收入</RadioButton>
          <RadioButton label="expenditure">支出</RadioButton>
        </RadioGroup>
      </TopBar>
      <CategoryList
        className="category"
        selectedId={categoryId}
        listData={filteredCategory}
        type="manage"
        onChange={onCategoryChange}
        onManageClick={handleManageClick}
      />
      <InfoBar calcStr={calcStr} remarks={remarks} onRemarksChange={onRemarksChange}/>
      <NumberPad
        date={new Date(time as string)}
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
