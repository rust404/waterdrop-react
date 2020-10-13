import React, {FC, ReactElement} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  > :nth-child(n+2) {
    margin-left: -1px;
  }
`

interface RadioGroupProps {
  value: string,
  onChange: (value: string) => void
}

const RadioGroup:FC<RadioGroupProps> = (props) => {
  const {value, onChange, children} = props
  return (<Wrapper>{
    React.Children.map(children, (child) => {
      return React.cloneElement(child as ReactElement, {
        value,
        onChange
      })
    })
  }</Wrapper>)
}

export default RadioGroup
