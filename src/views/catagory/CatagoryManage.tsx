import React, {useState, useContext, FC} from "react";
import {MoneyDirection} from "store/catagoryReducer";
import styled from "styled-components";
import Icon from "components/Icon";
import TopBar from "components/TopBar";
import Tab from "components/Tab";
import useQuery from "hooks/useQuery";
import {CatagoryContext} from "store";
import {useHistory} from "react-router-dom";
import {findParent} from "util/index";

const Left = styled.span`
  display: flex;
  align-items: center;
`;
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
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

interface ICatagoryManageProps extends React.HTMLProps<HTMLElement> {}

const CatagoryManage: FC<ICatagoryManageProps> = props => {
  const query = useQuery();
  const history = useHistory();
  const {state: catagory} = useContext(CatagoryContext);
  const [direction, setDirection] = useState(
    query.get("direction") || MoneyDirection.EXPENDITURE
  );
  console.log("h");

  const handleClick = (e: React.MouseEvent<Element>) => {
    if (!(e.target instanceof Element)) return;
    let target = e.target;
    let li = findParent(target, (e: Element) => {
      return e.nodeName.toLowerCase() === "li";
    }) as HTMLElement;
    if (!li || !li.dataset["id"]) return;
    let id = parseInt(li.dataset["id"]);
    history.push(`/catagory/edit/${id}`);
  };

  const onAddClick = (e: React.MouseEvent<HTMLLIElement>) => {
    history.push(`/catagory/add?direction=${direction}`);
    e.stopPropagation();
  };
  const onTabClick = (direction: string) => {
    setDirection(direction);
  };
  return (
    <Wrapper className={props.className}>
      <TopBar
        left={
          <Left
            onClick={() => history.goBack()}
          >
            <Icon id="left" />
            返回
          </Left>
        }
      >
        <Tab
          onChange={onTabClick}
          value={direction}
          map={{
            支出: MoneyDirection.EXPENDITURE,
            收入: MoneyDirection.INCOME
          }}
        />
      </TopBar>
      <ul onClick={handleClick}>
        {catagory
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
export default CatagoryManage;
