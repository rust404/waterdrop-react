import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
  FC
} from "react";
import styled from "styled-components";
import Catagory from "./common/Catagory";
import Remarks from "./common/Remarks";
import NumberPad from "./common/Numberpad";
import {MoneyDirection, findCatagory} from "store/catagoryReducer";
import TopBar from "components/TopBar";
import Tab from "components/Tab";
import {ValueOf} from "util/index";
import {IRecord, findRecord} from "store/moneyRecordReducer";
import {RecordContext, CatagoryContext} from "store";
import {useHistory, useParams} from "react-router-dom";
import Icon from "components/Icon";

const Left = styled.span`
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  flex: 1;
  .catagory {
    flex: 1;
    overflow: auto;
  }
  .pad {
    margin-top: auto;
  }
`;
type RecordData = Pick<IRecord, "catagoryId" | "time" | "direction" | "amount">;

interface IndexedRecordDataType extends RecordData {
  [index: string]: number | MoneyDirection | string;
}

interface alertDataType {
  catagoryId: string;
  direction?: string;
  amount: string;
  [index: string]: string | undefined;
}

export type recordDataFieldType = Partial<RecordData>;

const RecordEdit: FC = () => {
  const history = useHistory();
  const {state: records, dispatch: dispatchRecords} = useContext(
    RecordContext
  );
  const {state: catagory} = useContext(CatagoryContext)
  const {id} = useParams();

  const [recordData, setRecordData] = useState<RecordData>({
    catagoryId: -1,
    direction: MoneyDirection.EXPENDITURE,
    amount: 0,
    time: new Date().toISOString()
  });
  const isSubmitting = useRef(false);
  const {catagoryId, direction, time, amount} = recordData;

  useEffect(() => {
    const record = findRecord(records, parseInt(id));
    if (!record) {
      alert("记录不存在");
      history.push("/record/detail");
    } else {
      const {catagoryId, direction, amount, time} = record;
      setRecordData({
        catagoryId,
        direction,
        amount,
        time
      });
    }
  }, [id, history, records]);

  const onChange = useCallback(
    (key: keyof RecordData) => (value: ValueOf<RecordData>) => {
      setRecordData(state => {
        const data = {
          ...state,
          [key]: value
        };
        if (data.direction === MoneyDirection.INCOME) {
          data.amount = Math.abs(data.amount);
        } else {
          data.amount = -Math.abs(data.amount);
        }
        const catagoryItem = findCatagory(catagory, data.catagoryId)
        if (catagoryItem && catagoryItem.direction !== data.direction) {
          data.catagoryId = -1
        }
        return data;
      });
    },
    [catagory]
  );
  const submit = useCallback((amount: number, time: string) => {
    onChange("amount")(amount);
    onChange("time")(time);
    isSubmitting.current = true;
  }, [onChange]);
  // validate
  useEffect(() => {
    if (!isSubmitting.current) return;

    const alertData: alertDataType = {
      catagoryId: "请选择分类",
      amount: "钱不能为0"
    };
    // 不能为空
    for (let i of Object.keys(recordData)) {
      if (
        (recordData as IndexedRecordDataType)[i] === undefined ||
        (i === "catagoryId" && recordData[i] === -1)
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
        ...recordData
      }
    });
    history.push("/record/detail");
    isSubmitting.current = false;
  }, [recordData, dispatchRecords, history, id]);
  const MTab = useMemo(() => {
    return (
      <Tab
        onChange={onChange("direction")}
        value={direction}
        map={{
          支出: MoneyDirection.EXPENDITURE,
          收入: MoneyDirection.INCOME
        }}
      />
    );
  }, [direction, onChange]);
  return (
    <Wrapper>
      <TopBar
        left={
          <Left onClick={() => history.goBack()}>
            <Icon id="left" />
            返回
          </Left>
        }
        right={
          <div onClick={() => {
            if (window.confirm('确定删除此记录？')) {
              dispatchRecords({
                type: 'deleteRecord',
                payload: {
                  id: parseInt(id)
                }
              })
              history.push('/record/detail')
            }
          }}>删除</div>
        }
      >
        {MTab}
      </TopBar>
      <Catagory
        direction={direction}
        catagoryId={catagoryId}
        onChange={onChange("catagoryId")}
        className="catagory"
      ></Catagory>
      <Remarks></Remarks>
      <NumberPad
        amount={amount}
        time={time}
        className="pad"
        onChange={submit}
      ></NumberPad>
    </Wrapper>
  );
};
export default React.memo(RecordEdit);
