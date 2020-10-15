import React, {useContext, useState} from "react";
import {CategoryContext} from "store";
import TopBar from "components/TopBar";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import useQuery from "hooks/useQuery";
import {isMoneyType, MoneyType} from "store/categoryReducer";
import CategoryInfo from "./CategoryInfo";
import IconList from "./IconList";
import {message} from "../../components/Message";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Right = styled.span`
  font-size: 14px;
`;
const CategoryAdd = () => {
  const {dispatch} = useContext(CategoryContext);
  const query = useQuery();
  const history = useHistory();
  const [categoryName, setCategoryName] = useState("");
  const [iconName, setIconName] = useState("canyin");
  const moneyType = query.get("moneyType");
  if (!isMoneyType(moneyType || "")) {
    history.replace("/category/manage");
  }
  const MoneyTypeMap = {
    [MoneyType.INCOME]: "收入",
    [MoneyType.EXPENDITURE]: "支出"
  };
  const submit = () => {
    if (!categoryName || !iconName) {
      message.warning('请填写分类名，选择分类图标')
      return;
    }
    dispatch({
      type: "addCategory",
      payload: {
        moneyType: moneyType as MoneyType,
        icon: iconName,
        name: categoryName
      }
    });
    message.success('添加分类成功')
    history.goBack();
  };
  const handleInput = (name: string) => {
    setCategoryName(name);
  };
  const handleIconChange = (name: string) => {
    setIconName(name);
  };
  return (
    <Wrapper>
      <TopBar
        showBack
        right={<Right onClick={submit}>完成</Right>}
      >
        增加{MoneyTypeMap[moneyType as MoneyType]}类别
      </TopBar>
      <CategoryInfo name={categoryName} icon={iconName} onChange={handleInput}/>
      <IconList icon={iconName} onChange={handleIconChange}/>
    </Wrapper>
  );
};

export default CategoryAdd;
