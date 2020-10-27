import React, {ChangeEvent, CSSProperties, FC, useContext} from "react";
import {brandColor} from "../../style/variables";
import styled from "styled-components";
import classNames from "classnames";
import {RadioGroupContext} from "./context";


const Wrapper = styled.label`
  display: inline-block;
  padding: 5px 15px;
  line-height: 16px;
  border: 1px solid ${brandColor};
  color: ${brandColor};
  .radio-button-input {
    display: none;
  }
  .radio-button-text {
    font-size: 14px;
  }
  &.is-active {
    color: #fff;
    background: ${brandColor};
  }
`

interface RadioButtonProps {
  label: string
  className?: string
  style?: CSSProperties
}

const RadioButton: FC<RadioButtonProps> = (props) => {
  const {label, children, className, ...restProps} = props
  const context = useContext(RadioGroupContext)
  const radioButtonClassName = classNames(className, {
    'is-active': label === context?.value
  })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== label) return
    if (context?.onChange) {
      context.onChange(e)
    }
  }
  return (
    <Wrapper className={radioButtonClassName}  {...restProps}>
      <input
        className="radio-button-input"
        type="radio"
        value={label}
        checked={label === context?.value}
        onChange={onChange}
      />
      <span className="radio-button-text">
        {children}
      </span>
    </Wrapper>
  )
}

export default RadioButton
