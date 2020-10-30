import React, {useContext, useState, FC} from "react";
import {CategoriesContext} from "store/categoriesStore";
import TopBar from "components/TopBar";
import {useParams, useHistory} from "react-router-dom";
import styled from "styled-components";
import CategoryInfo from "./CategoryInfo";
import IconList from "./IconList";
import {message} from "../../components/Message";
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
const ContentWrapper = styled.div`
  flex: 1;
  overflow: auto;
`;
const CategoryEdit: FC = () => {
  const {categories, modifyCategory} = useContext(CategoriesContext);
  const {id} = useParams();
  const history = useHistory();
  const curCategory = categories.filter(value => id === value.id)[0];
  const [categoryName, setCategoryName] = useState(curCategory ? curCategory.name : "");
  const [iconName, setIconName] = useState(curCategory ? curCategory.icon : "");
  const submit = () => {
    const newCategory = {
      ...curCategory,
      icon: iconName,
      name: categoryName,
    }
    categoryValidator.validate(newCategory).then(() => {
      modifyCategory(newCategory)
      message.success('编辑分类成功')
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
        编辑类别
      </TopBar>
      {!curCategory ? (
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
