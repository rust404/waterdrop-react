import React, {FC} from 'react'
// require('icons/tags.svg')
// require('icons/money.svg')

// require('icons/statistics.svg')

function importAll(r: any) {
  r.keys().forEach(r);
}

importAll(require.context('icons', true, /\.svg$/))

interface IProps {
  id: string,
  size?: string,
  fill?: string,
  className?: string,
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void
}
const Icon: FC<IProps> = (props) => {
  const {id, size = '24px', ...rest} = props
  return (
    <svg {...rest} width={size} height={size}>
      <use xlinkHref={'#' + id} />
    </svg >
  )
}
Icon.defaultProps = {
  size: '24px',
  fill: '#000',
  className: '',
  onClick: () => {}
}

export default Icon
