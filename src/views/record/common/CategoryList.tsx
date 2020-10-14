import {ICategoryItem} from "../../../store/categoryReducer";
import React, {FC, MouseEvent} from "react";
import styled from "styled-components";
import {brandColor, grey2} from "../../../style/variables";
import classNames from "classnames";
import Icon from "../../../components/Icon";

const gap = '20px'
const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: ${parseInt(gap) / 2}px;
  align-items: flex-start;
`
const CategoryItem = styled.li`
  width: 20%;
  margin: ${parseInt(gap)/2}px 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${grey2};
  margin-bottom: 6px;
  &.is-active {
    background-color: ${brandColor};
    > .icon {
      fill: #fff;
    }
  }
`
interface CategoryListProps {
  selectedId?: number,
  listData: ICategoryItem[],
  type: 'manage' | 'add'
  onChange?: (id: number) => void
  onItemClick?: (id: number) => void
  onManageClick?: (e: MouseEvent) => void
  onAddClick?: (e: MouseEvent) => void
  className?: string
}
const CategoryList:FC<CategoryListProps> = (props) => {
  const {selectedId, listData, type, onChange, onItemClick, onManageClick, onAddClick, className} = props
  return (
    <Wrapper className={className}>
      {listData.map(category => {
        const iconClassName = classNames({
          'is-active': selectedId === category.id
        })
        const handleClick = () => {
          onChange && onChange(category.id)
          onItemClick && onItemClick(category.id)
        }
        return (
          <CategoryItem key={category.id} onClick={handleClick}>
            <IconWrapper className={iconClassName}>
              <Icon className="icon" id={category.icon} size="24px" />
            </IconWrapper>
            {category.name}
          </CategoryItem>
        )
      })}
      {type === 'manage' && (
        <CategoryItem onClick={onManageClick}>
          <IconWrapper>
            <Icon className="icon" id="settings" size="24px" />
          </IconWrapper>
          设置
        </CategoryItem>
      )}
      {type === 'add' && (
        <CategoryItem onClick={onAddClick}>
          <IconWrapper>
            <Icon className="icon" id="tianjia" size="24px" />
          </IconWrapper>
          添加
        </CategoryItem>
      )}
    </Wrapper>
  )
}

export default CategoryList
