import React, {useContext, useState} from "react";
import TopBar from "components/TopBar";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import useQuery from "hooks/useQuery";
import {isMoneyType} from "store/categoriesReducer";
import CategoryInfo from "./CategoryInfo";
import IconList from "./IconList";
import {message} from "../../components/Message";
import {CategoriesContext} from "../../store/categoriesStore";
import {addCategory} from "../../store/actions/category";
import {categoryValidator} from "../../util";
import {ErrorList} from "async-validator";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Right = styled.span`
  font-size: 14px;
`;
const CategoryAdd = () => {
  const {dispatchCategories} = useContext(CategoriesContext);
  const query = useQuery();
  const history = useHistory();
  const [categoryName, setCategoryName] = useState("");
  const [iconName, setIconName] = useState("canyin");
  const moneyType = query.get("moneyType");
  if (!isMoneyType(moneyType || "")) {
    history.replace("/category/manage");
  }
  const MoneyTypeMap = {
    income: "收入",
    expenditure: "支出"
  };
  const submit = () => {
    const newCategory = {
      moneyType: moneyType as MoneyType,
      icon: iconName,
      name: categoryName
    }
    categoryValidator.validate(newCategory).then(() => {
      dispatchCategories(addCategory({
        moneyType: moneyType as MoneyType,
        icon: iconName,
        name: categoryName
      }))
      message.success('添加分类成功')
      history.goBack();
    }).catch(({errors}: {errors: ErrorList}) => {
      errors.forEach(error => {
        message.danger(error.message)
      })
    })
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
