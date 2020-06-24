import React, {useContext, useState, useRef, useEffect} from "react";
import {CatagoryContext} from "store";
import TopBar from "components/TopBar";
import {useParams, useHistory} from "react-router-dom";
import styled from "styled-components";
import Icon from "components/Icon";
import {findParent} from "util/index";

const Wrapper = styled.div``;
const Left = styled.span`
  display: flex;
  align-items: center;
`;
const Right = styled.span`
  font-size: 14px;
`;
interface IconWrapperProps {
  backgroundColor?: string;
}
const ContentWrapper = styled.div`
  margin: 25px;
`;
const IconWrapper = styled.div<IconWrapperProps>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "#ffd947"};
`;

const CatagoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 10px 0 10px 0;
  *:first-child {
    flex-shrink: 0;
  }
  .catagory-name {
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
  margin-top: 10px;
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
const CatagoryEdit = () => {
  const {state: catagory, dispatch} = useContext(CatagoryContext);
  const {id} = useParams();
  const history = useHistory();
  const iconNames = ["canyin", "custom", "dushu", "shejiao", "yundong"];
  const item = catagory.filter(value => {
    return parseInt(id) === value.id;
  })[0];
  const refInput = useRef<HTMLInputElement>(null);
  const [catagoryName, setCatagoryName] = useState(item ? item.name : "");
  const [iconName, setIconName] = useState(item ? item.icon : "");
  const submit = () => {
    dispatch({
      type: "modifyCatagory",
      payload: {
        id: parseInt(id),
        name: catagoryName,
        icon: iconName
      }
    });
    history.push("/catagory/manage");
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCatagoryName(e.currentTarget.value);
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
          <ContentWrapper>
            <CatagoryBox>
              <IconWrapper>
                <Icon id={iconName} />
              </IconWrapper>
              <input
                ref={refInput}
                className="catagory-name"
                type="text"
                value={catagoryName}
                onChange={handleInput}
              />
            </CatagoryBox>
            <IconList>
              <ul onClick={handleIconListClick}>
                {iconNames.map((name, index) => {
                  return (
                    <li key={index} data-name={name}>
                      <IconWrapper
                        backgroundColor={
                          iconName === name ? "#ffd947" : "#f5f5f5"
                        }
                      >
                        <Icon id={name} />
                      </IconWrapper>
                    </li>
                  );
                })}
              </ul>
            </IconList>
          </ContentWrapper>
        )}
    </Wrapper>
  );
};

export default CatagoryEdit;
