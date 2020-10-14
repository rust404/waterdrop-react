import React, {useContext, useState, useRef, useEffect} from "react";
import {CategoryContext} from "store";
import TopBar from "components/TopBar";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import Icon from "components/Icon";
import {findParent} from "util/index";
import useQuery from "hooks/useQuery";
import {isMoneyType, MoneyType} from "store/categoryReducer";
import {CATAGORY_ICON_NAMES} from "icons";

interface IconWrapperProps {
  backgroundColor?: string;
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Right = styled.span`
  font-size: 14px;
`;
const IconWrapper = styled.div<IconWrapperProps>`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "#ffd947"};
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 10px 25px 10px 25px;
  *:first-child {
    flex-shrink: 0;
  }
  .category-name {
    width: 0;
    flex: 1;
    border: none;
    text-align: right;
    line-height: 42px;
    font-size: 20px;
    &:focus {
      outline: none;
    }
  }
`;
const IconList = styled.div`
  margin: 10px 25px 0 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-right: calc(-1 * (100vw - 52px * 5 - 25px * 2) / 4);
    li {
      margin-top: 10px;
      margin-right: calc((100vw - 52px * 5 - 25px * 2) / 4);
    }
    &::after {
      content: "";
      flex: 1;
    }
  }
`;
const CategoryAdd = () => {
  const {dispatch} = useContext(CategoryContext);
  const query = useQuery();
  const history = useHistory();
  const refInput = useRef<HTMLInputElement>(null);
  const [categoryName, setCategoryName] = useState("");
  const [iconName, setIconName] = useState("canyin");
  const moneyType = query.get("moneyType");
  if (!isMoneyType(moneyType || "")) {
    history.push("/category/manage");
  }
  const MoneyTypeMap = {
    [MoneyType.INCOME]: "收入",
    [MoneyType.EXPENDITURE]: "支出"
  };
  const submit = () => {
    if (!categoryName || !iconName) {
      alert("未填写完整");
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
    history.goBack();
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.currentTarget.value);
  };
  useEffect(() => {
    let element = refInput.current;
    if (element !== null) {
      element.focus();
    }
  }, []);
  const handleIconListClick = (e: React.MouseEvent<Element>) => {
    const li = findParent(e.target as Element, (element: Element) => {
      return element.nodeName.toLowerCase() === "li";
    }) as HTMLElement;
    if (!li) return;
    const name = li.dataset["name"];
    if (!name) return;
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
      <CategoryBox>
        <IconWrapper>
          <Icon id={iconName} />
        </IconWrapper>
        <input
          placeholder="分类名称"
          ref={refInput}
          className="category-name"
          type="text"
          value={categoryName}
          onChange={handleInput}
        />
      </CategoryBox>
      <IconList>
        <ul onClick={handleIconListClick}>
          {CATAGORY_ICON_NAMES.map((name, index) => {
            return (
              <li key={index} data-name={name}>
                <IconWrapper
                  backgroundColor={iconName === name ? "#ffd947" : "#f5f5f5"}
                >
                  <Icon id={name} />
                </IconWrapper>
              </li>
            );
          })}
        </ul>
      </IconList>
    </Wrapper>
  );
};

export default CategoryAdd;
