
import React from 'react'
import styled from "styled-components"

const NumberPadWrapper = styled.section`
  border: 1px solid black;
  height: 100px;
`
const NumberPad = (props: any) => {
  return (
    <NumberPadWrapper {...props}>
      <input type="date" />
    </NumberPadWrapper>
  )
}

export default NumberPad
