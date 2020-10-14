import React, {FC} from "react";
import Overlay from "./Overlay";
import styled from "styled-components";
import classNames from "classnames";
import {CSSTransition} from "react-transition-group";

const Wrapper = styled.div`
  position: absolute;
  background-color: #fff;
  &.top { top: 0; left: 0; width: 100%; }
  &.left { top: 0; left: 0; height: 100%; }
  &.right { top: 0; right: 0; height: 100%; }
  &.bottom { bottom: 0; left: 0; width: 100%; }
  &.center { top: 50%; left: 50%; transform: translate(-50%, -50%); }
`

type PopUpPosition = 'top' | 'left' | 'right' | 'bottom' | 'center';

interface PopUpProps {
  show: boolean
  position?: PopUpPosition
  duration?: number
  height?: string
  onCancel?: () => void
}
const PopUp:FC<PopUpProps> = (props) => {
  const {show, onCancel, position = 'center', duration = 250, children} = props
  const popupClass = classNames({
    [position]: position
  })
  let animateName:string
  if (position !== 'center') {
    animateName = `slide-from-${position}`
  } else {
    animateName = 'fade'
  }
  return (
    <Overlay
      show={show}
      onClick={onCancel}
    >
      <CSSTransition in={show} classNames={animateName} timeout={duration} appear>
        <Wrapper className={popupClass}>{children}</Wrapper>
      </CSSTransition>
    </Overlay>
  )
}

export default PopUp

