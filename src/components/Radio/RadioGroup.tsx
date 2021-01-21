import React, {ChangeEvent, CSSProperties, FC, ReactNode} from "react";
import styled from "styled-components";
import classNames from "classnames";
import {RadioGroupContext} from "./context";

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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const {value, onChange, children, block, className, ...restProps} = props

  const wrapperClass = classNames(className, {
    'is-block': block
  })

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        onChange
      }}
    >
      <Wrapper className={wrapperClass} {...restProps}>
        {children}
      </Wrapper>
    </RadioGroupContext.Provider>

  )
}

export default React.memo(RadioGroup)
