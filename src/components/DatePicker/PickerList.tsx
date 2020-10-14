import React, {FC, useState, TouchEvent, useEffect} from "react";
import styled from "styled-components";
import {brandColor} from "../../style/variables";

const itemHeight = 30
const Wrapper = styled.div`
  position: relative;
  margin: 0 6px;
  display: flex;
  align-items: center;
  height: ${itemHeight * 5}px;
`
const Wheel = styled.div`
  position: relative;
  width: 100%;
  height: ${itemHeight}px;
  border-top: 1px solid ${brandColor};
  border-bottom: 1px solid ${brandColor};
  > ul {
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    > li {
      font-size: 20px;
      text-align: center;
      line-height: ${itemHeight}px;
      height: ${itemHeight}px;
    }
  }
`

interface PickerListProps {
  listData: Array<string>
  value: string
  onChange: (val: string) => void
}

const PickerList: FC<PickerListProps> = (props) => {
  const {listData, onChange, value} = props
  const [startY, setStartY] = useState(0)
  const [startTop, setStartTop] = useState(0)
  const [style, setStyle] = useState({
    top: '0px',
    transition: 'none'
  })
  useEffect(() => {
    let index = -1
    for (let i = 0; i < listData.length; i++) {
      if (listData[i].toString() === value.toString()) {
        index = i
        break
      }
    }
    setStyle(state => {
      return {
        ...state,
        top: -index * itemHeight + 'px'
      }
    })
  }, [value, listData])
  const onTouchStart = (e: TouchEvent<HTMLUListElement>) => {
    setStartY(e.touches[0].clientY)
    setStartTop(parseInt(style.top))
    setStyle(state => {
      return {
        ...state,
        transition: 'none'
      }
    })
  }
  const onTouchMove = (e: TouchEvent<HTMLUListElement>) => {
    const limitRange = 50
    const maxTop = limitRange
    const minTop = -(listData.length - 1) * itemHeight - limitRange
    let top = startTop + e.touches[0].clientY - startY
    top = top > maxTop ? maxTop : top
    top = top < minTop ? minTop : top
    setStyle(state => {
      return {
        ...state,
        top: top + 'px'
      }
    })
  }
  const onTouchEnd = (e: TouchEvent) => {
    let top = parseInt(style.top)
    top > 0 && (top = 0)
    let index = -Math.round(top / itemHeight)
    index >= listData.length && (index = listData.length - 1)
    setStyle(() => {
      return {
        top: -index * itemHeight + 'px',
        transition: 'top 200ms ease-in'
      }
    })
    onChange(listData[index])
    e.preventDefault()
  }

  return (<Wrapper>
    <Wheel>
      <ul
        className="picker-list"
        style={style}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {listData.map(item => (
          <li className="picker-list-item" key={item}>{item}</li>
        ))}
      </ul>
    </Wheel>
  </Wrapper>)
}

export default PickerList
