import React, {CSSProperties, FC} from 'react'
import styled from 'styled-components'
import Icon from "./Icon";
import {useHistory} from "react-router-dom";

const xSpace = '20px'
const ySpace = '8px'
const Wrapper = styled.header`
  display: flex;
  position: relative;
  padding: ${ySpace} 0px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  box-shadow: 0 2px 8px #e0e0e0;
  line-height: 28px;
  flex-shrink: 0;
  .left, .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .left {
    left: ${xSpace};
  }
  .right {
    right: ${xSpace};
  }
`
const Back = styled.span`
  display: flex;
  align-items: center;
`;

interface ITopBarProps {
  left?: React.ReactNode
  right?: React.ReactNode
  showBack?: boolean
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
}
const TopBar: FC<ITopBarProps> = (props) => {
  const history = useHistory();
  const {left, children, right, showBack, ...restProps} = props

  return (
    <Wrapper {...restProps}>
      <div className="left">
        {left}
        {
          showBack && <Back
            onClick={() => history.goBack()}
          >
            <Icon id="left" />
            返回
          </Back>
        }
      </div>
      <div className="center">{children}</div>
      <div className="right">{right}</div>
    </Wrapper>
  )
}

export default React.memo(TopBar)
