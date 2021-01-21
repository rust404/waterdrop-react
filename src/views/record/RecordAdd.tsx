import React, {
  useState,
  useCallback,
  FC,
  MouseEvent, ChangeEvent
} from "react";
import Layout from "components/Layout";
import styled from "styled-components";
import NumberPad from "./common/NumberPad";
import TopBar from "components/TopBar";
import {moneyRecordValidator} from "util/index";
import {useHistory} from "react-router-dom";
import RadioGroup from "../../components/Radio/RadioGroup";
import RadioButton from "../../components/Radio/RadioButton";
import InfoBar from "./common/InfoBar";
import CategoryList from "./common/CategoryList";
import {message} from "../../components/Message";
import {ErrorList} from "async-validator";
import useMoneyRecord from "../../hooks/useMoneyRecord";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryState} from "../../reduxStore/selectors/category";
import {addRecord} from "../../reduxStore/actions/moneyRecord";

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


const RecordAdd: FC = () => {
  const categories = useSelector(getCategoryState)
  const [recordData, dispatchRecordData] = useMoneyRecord({
    categoryId: '',
    moneyType: 'expenditure',
    amount: 0,
    time: new Date().toISOString(),
    remarks: ''
  })
  const [calcStr, setCalcStr] = useState('0')
  const history = useHistory();
  const dispatch = useDispatch()
  const {categoryId, moneyType, time, remarks} = recordData;

  const filteredCategory = categories.filter(item => item.moneyType === moneyType)
  const handleManageClick = (e: MouseEvent) => {
    history.push(`/category/manage?moneyType=${moneyType}`)
    e.stopPropagation()
  }
  const onCategoryChange = useCallback((id: string) => {
    dispatchRecordData({
      type: 'categoryId',
      payload: id
    })
  }, [dispatchRecordData])
  const onMoneyTypeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as MoneyType
    dispatchRecordData({
      type: 'moneyType',
      payload: value
    })
    dispatchRecordData({
      type: 'categoryId',
      payload: ''
    })
  }, [dispatchRecordData])
  const onDateChange = useCallback((date: Date) => {
    dispatchRecordData({
      type: 'time',
      payload: date
    })
  }, [dispatchRecordData])
  const onAmountChange = useCallback((amount: number) => {
    dispatchRecordData({
      type: 'amount',
      payload: amount
    })
  }, [dispatchRecordData])
  const onRemarksChange = useCallback((remarks: string) => {
    dispatchRecordData({
      type: 'remarks',
      payload: remarks
    })
  }, [dispatchRecordData])
  const onCalcStrChange = useCallback((str: string) => {
    setCalcStr(str)
  }, [])
  const submit = useCallback(() => {
      moneyRecordValidator.validate(recordData).then(() => {
        dispatch(addRecord(recordData as RecordData))
        message.success('添加记录成功')
        history.push("/record/detail");
      }).catch(({errors}: { errors: ErrorList }) => {
        errors.forEach(error => {
          message.danger(error.message)
        })
      })
    },
    [recordData, history, dispatch]
  );
  return (
    <Layout>
      <Wrapper>
        <TopBar>
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
export default RecordAdd;
