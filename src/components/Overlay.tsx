import React, {FC, MouseEvent} from 'react'
import {createPortal} from "react-dom";
import styled from "styled-components";
import {CSSTransition} from "react-transition-group";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  transform: translateZ(0);
`

interface OverlayProps {
  show: boolean
  duration?: number
  container?: string
  animation?: string
  onClick?: () => void
}
const Overlay:FC<OverlayProps> = (props) => {
  const {
    container = 'body',
    duration = 250,
    animation = 'fade',
    show = false,
    onClick,
    children
  } = props
  const containerElm = document.querySelector(container) || document.body
  const handleClick = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return
    onClick && onClick()
  }
  return (
    createPortal(
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={show}
        classNames={animation}
        timeout={duration}
      >
        <Wrapper onClick={handleClick}>
          {children}
        </Wrapper>
      </CSSTransition>,
      containerElm
    )
  )
}


export default Overlay
