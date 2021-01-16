import React, {useContext, useState, FC, useEffect} from "react";
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
const WithQueryCategory = () => {
  const {categories} = useContext(CategoriesContext);
  const {id} = useParams();
  const history = useHistory();
  const category = categories.filter(value => id === value.id)[0];
  const delay = 3000

  useEffect(() => {
    if (!category) {
      setTimeout(() => {
        history.push('/record/add')
      }, delay)
    }
  }, [category, history])

  if(!category) {
    return <div>当前分类不存在，将会在3秒后跳转到首页</div>
  } else {
    return <CategoryEdit category={category}/>
  }
}

interface CategoryEditProps {
  category: Category
}
const CategoryEdit: FC<CategoryEditProps> = ({category}) => {
  const {categories, modifyCategory} = useContext(CategoriesContext);
  const {id} = useParams();
  const history = useHistory();
  const curCategory = categories.filter(value => id === value.id)[0];
  const [categoryName, setCategoryName] = useState(category.name);
  const [iconName, setIconName] = useState(category.icon);
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

export default WithQueryCategory;
