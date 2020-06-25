import React from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
  line-height: 30px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  li {
    position: relative;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 6px;
    border: 2px solid black;
    margin-left: -2px
  }
  li:first-child {
    border-radius: 6px 0 0 6px;
    margin-left: 0px;
  }
  li:last-child {
    border-radius: 0 6px 6px 0;
  }
  li.selected {
    background-color: #000;
    color: #ffd947;
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
          <li
            key={text}
            onClick={handleClick}
            className={map[text] === value ? "selected" : ""}
          >
            {text}
          </li>
        );
      })}
    </Wrapper>
  );
};

export default React.memo(Tab);
