import React from 'react'
import styled from 'styled-components'

import { TemperatureListItem } from '../../types'
import { ListItem } from './ListItem'

type Props = {
  items: TemperatureListItem[]
}

export const TemperatureList = (props: Props) => {
  const { items } = props
  return (
    <StyledUl>
      {items.map((item, index) => (
        <ListItem key={`${index}${item.temperature}`} item={item} />
      ))}
    </StyledUl>
  )
}

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`
