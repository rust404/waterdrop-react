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
  size?: string,
  fill?: string,
  className?: string
}
const Icon = (props: Props) => {
  const {id, size = '24px', fill = '#000', className = ''} = props
  return (
    <svg className={className} width={size} height={size} fill={fill}>
      <use xlinkHref={'#' + id} />
    </svg >
  )
}

export default Icon
