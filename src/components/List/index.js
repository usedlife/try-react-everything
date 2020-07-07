import React, { forwardRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Scroll } from '@/components'
import { useRequest } from '@/hooks'

const INIT_PAGE = 1

const List = forwardRef((props, ref) => {
  const {
    requestMethod,
    renderItem,
    getSource,
    rowKey,
  } = props
  
  const [page, setPage] = useState(INIT_PAGE)
  const [list, setList] = useState([])

  let [source, isLoading, isError] = useRequest(() => {
    return requestMethod({ page })
  }, [page], null) 
  
  useEffect(() => {
    if (!source) return
    if (getSource(source).page === INIT_PAGE) {
      setList(getSource(source).list)
    } else {
      setList([...list, getSource(source).list])
    }
  }, [source]) 

  if (isLoading || isError) {
    return <span>loading...</span>
  }

  return (
    <Scroll>
      {list && Array.isArray(list) ? (
        <ul>
          {list.map((item, index) => (
            <li key={item[rowKey]}>
              {renderItem(item, index)}
            </li>
          ))}
        </ul>
      ) : null}
    </Scroll>
  )
})

List.propTypes = {
  requestMethod: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  getSource: PropTypes.func,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

List.defaultProps = {
}

export default List