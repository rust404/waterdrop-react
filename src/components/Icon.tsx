import React, {CSSProperties, FC} from 'react'
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
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void
  className?: string
  style?: CSSProperties
}
const Icon: FC<IProps> = (props) => {
  const {id, size = '1em', ...restProps} = props
  return (
    <svg {...restProps} width={size} height={size}>
      <use xlinkHref={'#' + id} />
    </svg >
  )
}
Icon.defaultProps = {
  size: '1em',
  fill: '#000',
  className: '',
  onClick: () => {}
}

export default React.memo(Icon)
