import React from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
  line-height: 48px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  li {
    position: relative;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
  }
  li:last-child {
    margin-left: 10px;
  }
  li.selected:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000;
  }
`;

interface ITabProps extends React.Props<HTMLElement> {
  map: {
    [text: string]: any;
  };
  onChange: (value: any) => void;
  value: any;
}

const Tab: React.FC<ITabProps> = props => {
  const {map, onChange, value} = props;
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const key = e.currentTarget.innerText;
    onChange(map[key]);
  };
  return (
    <Wrapper>
      {Object.keys(map).map(text => {
        return (
          <li key={text} onClick={handleClick} className={map[text] === value ? 'selected' : ''}>
            {text}
          </li>
        );
      })}
    </Wrapper>
  );
};

export default Tab;
