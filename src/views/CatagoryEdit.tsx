import React, {useContext, useState, useRef, useEffect} from "react";
import Context from "store";
import TopBar from "components/TopBar";
import {useParams, useHistory} from "react-router-dom";
import {MoneyDirection} from "store/useCatagoryReducer";
import styled from "styled-components";
import Icon from "components/Icon";

const Wrapper = styled.div``;
const Left = styled.span`
  display: flex;
  align-items: center;
`;
const Right = styled.span`
  font-size: 14px;
`;
const CatagoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 25px;
  .icon-wrapper {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffd947;
  }
  .catagory-name {
    border: none;
    text-align: right;
    line-height: 42px;
    &:focus {
      outline: none;
    }
  }
`;
const IconList = styled.ul`
  margin: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 42px;
    height: 42px;
    background-color: #000;
    border-radius: 50%;
    margin-top: 10px;
    padding-right: 30px;
    &:last-child {
      margin-right: auto;
    }
  }
`;
const CatagoryEdit = () => {
  const {state: catagory, dispatch} = useContext(Context);
  const {id} = useParams();
  const history = useHistory();
  const iconNames = ["canyin", "custom", "dushu", "shejiao", "yundong"];
  const map = {
    [MoneyDirection.INCOME]: "收入",
    [MoneyDirection.EXPENDITURE]: "支出"
  };
  const item = catagory.filter(value => {
    return parseInt(id) === value.id;
  })[0];
  const refInput = useRef<HTMLInputElement>(null);
  const [catagoryName, setCatagoryName] = useState(item ? item.name : "");
  const submit = () => {
    console.log({
      name: catagoryName,
      icon: item.icon
    });
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setCatagoryName(e.currentTarget.value);
  };
  useEffect(() => {
    let element = refInput.current;
    if (element !== null) {
      element.focus();
    }
  }, []);
  return (
    <Wrapper>
      <TopBar
        left={
          <Left onClick={() => history.goBack()}>
            <Icon id="left" />
            返回
          </Left>
        }
        right={<Right onClick={submit}>完成</Right>}
      >
        编辑类别
      </TopBar>
      {!item ? (
        "没有这个分类"
      ) : (
          <>
            <CatagoryBox>
              <div className="icon-wrapper">
                <Icon id={item.icon} />
              </div>
              <input
                ref={refInput}
                className="catagory-name"
                type="text"
                value={catagoryName}
                onChange={handleInput}
              />
            </CatagoryBox>
            <IconList>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </IconList>
          </>
        )}
    </Wrapper>
  );
};

export default CatagoryEdit;
