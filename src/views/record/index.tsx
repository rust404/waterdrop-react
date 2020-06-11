import React from 'react'
import Layout from 'components/layout'
import styled from 'styled-components'
import MoneyType from './moneytype'
import Catagory from './catagory'
import Remarks from './remarks'
import NumberPad from './numberpad'

const RecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  .catagory {
    flex: 1;
    overflow: auto;
  }
  .pad {
    height: 500px;
    margin-top: auto;
  }
`

const Record = () => {
  return (
    <Layout>
      <RecordWrapper>
        <MoneyType></MoneyType>
        <Catagory className='catagory'></Catagory>
        <Remarks></Remarks>
        <NumberPad className="pad"></NumberPad>
      </RecordWrapper>
    </Layout>
  )
}
export default Record
