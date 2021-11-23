import React from 'react'

import { TemperatureListItem } from '../../types'

type Props = {
  item: TemperatureListItem
}

export const ListItem = (props: Props) => {
  const { item } = props
  return (
    <div>
      <span>{item.temperature}</span>
      {item.alert && <span>{item.alert}</span>}
    </div>
  )
}
