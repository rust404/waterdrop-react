import React, {FC, HTMLProps, ReactNode} from 'react'
import styled from "styled-components";
import {theme} from "../../style/variables";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {getStyle} from "../../util";

export interface MessageItem {
  type: MessageType;
  content: ReactNode;
  id: number;
  duration?: number;
}

export type MessageType = "primary" | "warning" | "danger" | "info" | "success";

interface MessageProps extends HTMLProps<HTMLDivElement> {
  messages: MessageItem[]
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

const Item = styled.div`
  text-align: center;
  overflow: hidden;
  color: #fff;
  padding: 6px 0;
  background-color: ${props => theme[props.theme.type as string]}
`

const Message:FC<MessageProps> = (props) => {
  const {messages} = props
  return (
    <Wrapper>
      <TransitionGroup>
        {messages.map(msg => {
          const {id, type, content, duration} = msg
          const onEnter = (el: HTMLElement) => {
            const height = getStyle(el, 'height')
            const paddingTop = getStyle(el, 'padding-top')
            const paddingBottom = getStyle(el, 'padding-bottom')
            el.style.height = '0px'
            el.style.paddingTop = '0px'
            el.style.paddingBottom = '0px'
            setTimeout(() => {
              el.style.transition = `all 250ms`
              el.style.height = height
              el.style.paddingTop = paddingTop
              el.style.paddingBottom = paddingBottom
            }, 0)
          }
          const onExit = (el: HTMLElement) => {
            el.style.height = '0px'
            el.style.paddingTop = '0px'
            el.style.paddingBottom = '0px'
          }
          return (
            <CSSTransition
              key={id}
              timeout={duration as number}
              onEnter={onEnter}
              onExit={onExit}
            >
              <Item theme={{type}}>
                {content}
              </Item>
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </Wrapper>
  )
}

export default Message
