import React, {useState, FC} from "react";
import styled from "styled-components";
import TopBar from "components/TopBar";
import useQuery from "hooks/useQuery";
import {useHistory} from "react-router-dom";
import RadioGroup from "../../components/Radio/RadioGroup";
import RadioButton from "../../components/Radio/RadioButton";
import CategoryList from "../record/common/CategoryList";
import {useSelector} from "react-redux";
import {getCategoryState} from "../../reduxStore/selectors/category";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

interface ICategoryManageProps extends React.HTMLProps<HTMLElement> {
}

const CategoryManage: FC<ICategoryManageProps> = props => {
  const query = useQuery();
  const history = useHistory();
  const categories = useSelector(getCategoryState)
  const [moneyType, setMoneyType] = useState(
    query.get("moneyType") || 'expenditure'
  );
  const filteredCategory = categories.filter(item => item.moneyType === moneyType)

  const handleClick = (id: string) => {
    history.push(`/category/edit/${id}`);
  };

  const onAddClick = (e: React.MouseEvent) => {
    history.push(`/category/add?moneyType=${moneyType}`);
    e.stopPropagation();
  };
  return (
    <Wrapper className={props.className}>
      <TopBar showBack>
        <RadioGroup value={moneyType} onChange={(e) => setMoneyType(e.target.value as MoneyType)}>
          <RadioButton label="income">收入</RadioButton>
          <RadioButton label="expenditure">支出</RadioButton>
        </RadioGroup>
      </TopBar>
      <CategoryList
        listData={filteredCategory}
        type="add"
        onItemClick={handleClick}
        onAddClick={onAddClick}
      />
    </Wrapper>
  );
};
export default CategoryManage;
