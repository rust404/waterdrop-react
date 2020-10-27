import React, {CSSProperties, FC} from "react";
import {brandColor} from "../../style/variables";
import styled from "styled-components";
import classNames from "classnames";


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
  value?: string
  onChange?: (value: string) => void
  className?: string
  style?: CSSProperties
}

const RadioButton: FC<RadioButtonProps> = (props) => {
  const {label, value, onChange, children, className, ...restProps} = props
  const radioButtonClassName = classNames(className, {
    'is-active': label === value
  })
  const onClick = () => {
    onChange && onChange(label)
  }
  return (
    <Wrapper className={radioButtonClassName} onClick={onClick} {...restProps}>
      <input
        className="radio-button-input"
        type="radio"
        value={label}
      />
      <span className="radio-button-text">
        {children}
      </span>
    </Wrapper>
  )
}

export default RadioButton
