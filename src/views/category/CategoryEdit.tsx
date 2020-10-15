import React, {useContext, useState, FC} from "react";
import {CategoryContext} from "store";
import TopBar from "components/TopBar";
import {useParams, useHistory} from "react-router-dom";
import styled from "styled-components";
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
const ContentWrapper = styled.div`
  flex: 1;
  overflow: auto;
`;
const CategoryEdit: FC = () => {
  const {state: category, dispatch} = useContext(CategoryContext);
  const {id} = useParams();
  const history = useHistory();
  const item = category.filter(value => {
    return parseInt(id) === value.id;
  })[0];
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
    message.success('编辑分类成功')
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
        编辑类别
      </TopBar>
      {!item ? (
        "没有这个分类"
      ) : (
        <ContentWrapper>
          <CategoryInfo name={categoryName} icon={iconName} onChange={handleInput}/>
          <IconList icon={iconName} onChange={handleIconChange}/>
        </ContentWrapper>
      )}
    </Wrapper>
  );
};

export default CategoryEdit;
