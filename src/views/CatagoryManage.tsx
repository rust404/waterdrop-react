import React, {useState, useContext} from "react";
import {MoneyDirection} from "store/catagoryReducer";
import styled from "styled-components";
import Icon from "components/Icon";
import Layout from "components/Layout";
import TopBar from "components/TopBar";
import Tab from "components/Tab";
import useQuery from "hooks/useQuery";
import Context from "store";
import {useHistory} from "react-router-dom";
import {findParent} from "util/index";

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
        border-radius: 50%;
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

const CatagoryManage: React.FC<ICatagoryManageProps> = props => {
  const query = useQuery();
  const history = useHistory()
  const {state: catagory} = useContext(Context);
  const [direction, setDirection] = useState(
    query.get("direction") || MoneyDirection.EXPENDITURE
  );

  const handleClick = (e: React.MouseEvent<Element>) => {
    if (!(e.target instanceof Element)) return;
    let target = e.target;
    let li = findParent(target, (e: Element) => {
      return e.nodeName.toLowerCase() === 'li'
    }) as HTMLElement
    if (!li || !li.dataset["id"]) return;
    let id = parseInt(li.dataset["id"]);
    history.push(`/catagoryedit/${id}`)
  };

  const onAddClick = (e: React.MouseEvent<HTMLLIElement>) => {
    history.push(`/catagoryadd?direction=${direction}`)
    e.stopPropagation();
  };
  const onTabClick = (direction: string) => {
    setDirection(direction);
  };
  return (
    <Layout>
      <TopBar>
        <Tab
          onChange={onTabClick}
          value={direction}
          map={{
            支出: MoneyDirection.EXPENDITURE,
            收入: MoneyDirection.INCOME
          }}
        />
      </TopBar>
      <Wrapper className={props.className}>
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
    </Layout>
  );
};
export default CatagoryManage;
