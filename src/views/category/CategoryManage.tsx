import React, {useState, useContext, FC} from "react";
import {MoneyDirection} from "store/categoryReducer";
import styled from "styled-components";
import Icon from "components/Icon";
import TopBar from "components/TopBar";
import useQuery from "hooks/useQuery";
import {CategoryContext} from "store";
import {useHistory} from "react-router-dom";
import {findParent} from "util/index";
import RadioGroup from "../../components/Radio/RadioGroup";
import RadioButton from "../../components/Radio/RadioButton";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  > ul {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    flex: 1;
    overflow: auto;
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

interface ICategoryManageProps extends React.HTMLProps<HTMLElement> {}

const CategoryManage: FC<ICategoryManageProps> = props => {
  const query = useQuery();
  const history = useHistory();
  const {state: category} = useContext(CategoryContext);
  const [direction, setDirection] = useState(
    query.get("direction") || MoneyDirection.EXPENDITURE
  );

  const handleClick = (e: React.MouseEvent<Element>) => {
    if (!(e.target instanceof Element)) return;
    let target = e.target;
    let li = findParent(target, (e: Element) => {
      return e.nodeName.toLowerCase() === "li";
    }) as HTMLElement;
    if (!li || !li.dataset["id"]) return;
    let id = parseInt(li.dataset["id"]);
    history.push(`/category/edit/${id}`);
  };

  const onAddClick = (e: React.MouseEvent<HTMLLIElement>) => {
    history.push(`/category/add?direction=${direction}`);
    e.stopPropagation();
  };
  return (
    <Wrapper className={props.className}>
      <TopBar showBack>
        <RadioGroup value={direction} onChange={(d) => setDirection(d as MoneyDirection)}>
          <RadioButton label={MoneyDirection.INCOME}>收入</RadioButton>
          <RadioButton label={MoneyDirection.EXPENDITURE}>支出</RadioButton>
        </RadioGroup>
      </TopBar>
      <ul onClick={handleClick}>
        {category
          .filter(item => item.direction === direction)
          .map(item => (
            <li key={item.id} data-id={item.id}>
              <div className="icon-wrapper">
                <Icon className="icon" id={item.icon} size="60%" />
              </div>
              <p>{item.name}</p>
            </li>
          ))}
        <li onClick={onAddClick}>
          <div className="icon-wrapper">
            <Icon className="icon" id="tianjia" size="60%" />
          </div>
          <p>添加</p>
        </li>
      </ul>
    </Wrapper>
  );
};
export default CategoryManage;
