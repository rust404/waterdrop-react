import React, {FC, ReactElement} from "react";
import styled from "styled-components";
import classNames from "classnames";

const Wrapper = styled.div`
  > :nth-child(n+2) {
    margin-left: -1px;
  }
  &.is-block {
    display: flex;
    > * {
      flex: 1;
      text-align: center;
    }
  }
`

interface RadioGroupProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
  value: string
  block?: boolean
  onChange: (value: string) => void
}

const RadioGroup:FC<RadioGroupProps> = (props) => {
  const {value, onChange, children, block} = props
  const wrapperClass = classNames({
    'is-block': block
  })
  return (<Wrapper className={wrapperClass}>{
    React.Children.map(children, (child) => {
      return React.cloneElement(child as ReactElement, {
        value,
        onChange
      })
    })
  }</Wrapper>)
}

export default RadioGroup
