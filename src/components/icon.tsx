import React from 'react'
// require('icons/tags.svg')
// require('icons/money.svg')

// require('icons/statistics.svg')

function importAll(r: any) {
  r.keys().forEach(r);
}

importAll(require.context('icons', true, /\.svg$/))

type Props = {
  id: string,
  size?: number,
  fill?: string
}
const Icon = (props: Props) => {
  const {id, size = 24, fill = '#000'} = props
  return (
    <svg width={size + 'px'} height={size + 'px'} fill={fill}>
      <use xlinkHref={'#' + id} />
    </svg >
  )
}

export default Icon
