import React, {useState} from "react";
import useCatagory, {MoneyDirectionType} from "hooks/useCatagory";
import styled from "styled-components";
import Icon from "components/Icon";
import Layout from "components/Layout";
import TopBar from "components/TopBar";
import Tab from "components/Tab";
import useQuery from "hooks/useQuery";

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
      width: 25vw;
      font-size: 4vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-wrapper {
        position: relative;
        width: 18vw;
        height: 18vw;
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

interface ICatagoryManageProps extends React.HTMLProps<HTMLElement> {

}

const CatagoryManage: React.FC<ICatagoryManageProps> = (props) => {
  const query = useQuery()
  const {catagory, addCatagory} = useCatagory();
  console.log(query.get('direction'))
  const [direction, setDirection] = useState(query.get('direction') || MoneyDirectionType.EXPENDITURE)

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
    console.log(id)
  };

  const onAddClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const newType = window.prompt("请输入分类");
    if (!newType) return;
    // addCatagory(newType, direction);
    e.stopPropagation()
  }
  const onTabClick = (direction: string) => {
    setDirection(direction)
  }
  return (
    <Layout>
      <TopBar><Tab onChange={onTabClick} value={direction} map={{'支出': MoneyDirectionType.EXPENDITURE, '收入': MoneyDirectionType.INCOME}} /></TopBar>
      <Wrapper className={props.className}>
        <ul onClick={handleClick}>
          {catagory.filter(item => item.direction === direction).map((item) => (
            <li key={item.id} data-id={item.id}>
              <div
                className="icon-wrapper"
              >
                <Icon className="icon" id={item.icon} size="60%" />
              </div>
              <p>
                {item.name}
              </p>
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
  )
}
export default CatagoryManage
