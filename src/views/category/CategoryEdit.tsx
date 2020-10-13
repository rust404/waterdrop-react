import React, {useContext, useState, useRef, useEffect, FC} from "react";
import {CategoryContext} from "store";
import TopBar from "components/TopBar";
import {useParams, useHistory} from "react-router-dom";
import styled from "styled-components";
import Icon from "components/Icon";
import {findParent} from "util/index";
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
const ContentWrapper = styled.div`
  margin: 25px;
  flex: 1;
  overflow: auto;
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
  padding: 10px 0 10px 0;
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
const CategoryEdit: FC = () => {
  const {state: category, dispatch} = useContext(CategoryContext);
  const {id} = useParams();
  const history = useHistory();
  const item = category.filter(value => {
    return parseInt(id) === value.id;
  })[0];
  const refInput = useRef<HTMLInputElement>(null);
  const [categoryName, setCategoryName] = useState(item ? item.name : "");
  const [iconName, setIconName] = useState(item ? item.icon : "");
  const submit = () => {
    dispatch({
      type: "modifyCategory",
      payload: {
        id: parseInt(id),
        name: categoryName,
        icon: iconName
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
        编辑类别
      </TopBar>
      {!item ? (
        "没有这个分类"
      ) : (
          <ContentWrapper>
            <CategoryBox>
              <IconWrapper>
                <Icon id={iconName} />
              </IconWrapper>
              <input
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

export default CategoryEdit;
