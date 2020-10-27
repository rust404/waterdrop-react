import React, {CSSProperties, FC, ReactElement} from "react";
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

interface RadioGroupProps {
  value: string
  block?: boolean
  onChange: (value: string) => void
  className?: string
  style?: CSSProperties
}

const RadioGroup:FC<RadioGroupProps> = (props) => {
  const {value, onChange, children, block, className, ...restProps} = props
  const wrapperClass = classNames(className, {
    'is-block': block
  })
  return (<Wrapper className={wrapperClass} {...restProps}>{
    React.Children.map(children, (child) => {
      return React.cloneElement(child as ReactElement, {
        value,
        onChange
      })
    })
  }</Wrapper>)
}

export default RadioGroup
