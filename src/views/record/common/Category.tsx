import React, {useContext, FC} from "react";
import styled from "styled-components";
import Icon from "components/Icon";
import {MoneyType} from 'store/categoryReducer'
import {useHistory} from "react-router-dom";
import {CategoryContext} from "store";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  > ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    li {
      margin-top: 20px;
      position: relative;
      width: 20vw;
      font-size: 4vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-wrapper {
        position: relative;
        width: 14vw;
        height: 14vw;
        margin-bottom: 4px;
        border-radius: 12px;
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
        &.selected {
          background-color: #ffd947;
        }
      }
    }
  }
`;

interface ICategoryProps {
  categoryId: number;
  moneyType: MoneyType;
  className?: string;
  onChange: (value: number) => void;
}
const Category: FC<ICategoryProps> = props => {
  const {state} = useContext(CategoryContext);
  const history = useHistory();
  const {moneyType, categoryId} = props
  const handleClick = (e: React.MouseEvent<Element>) => {
    if (!(e.target instanceof Element)) return;
    let target = e.target;
    let li = null;
    // find li
    while (target !== e.currentTarget) {
      if (target.nodeName.toLowerCase() === "li") {
        li = target as HTMLLIElement;
      }
      target = target.parentNode as Element;
    }
    if (!li || !li.dataset["id"]) return;
    let id = parseInt(li.dataset["id"]);
    if (id === categoryId) return
    // add category
    props.onChange(id);
  };

  const onSettingClick = (e: React.MouseEvent<HTMLLIElement>) => {
    history.push(`/category/manage?moneyType=${moneyType}`)
    e.stopPropagation()
  }
  return (
    <Wrapper className={props.className}>
      <ul onClick={handleClick}>
        {state.filter(item => item.moneyType === moneyType).map((item) => (
          <li key={item.id} data-id={item.id}>
            <div
              className={`icon-wrapper ${
                item.id === props.categoryId ? "selected" : ""
                }`}
            >
              <Icon className="icon" id={item.icon} size="60%" />
            </div>
            <p className={props.categoryId === item.id ? "selected" : ""}>
              {item.name}
            </p>
          </li>
        ))}
        <li onClick={onSettingClick}>
          <div className="icon-wrapper">
            <Icon className="icon" id="settings" size="60%" />
          </div>
          <p>设置</p>
        </li>
      </ul>
    </Wrapper>
  );
};

export default React.memo(Category);
