import React from 'react'
import styled from 'styled-components'

import { ALERT_TYPE, TemperatureListItem } from '../../types'

type Props = {
  item: TemperatureListItem
}

const AlertColor: { [key: string]: string } = {
  [ALERT_TYPE.FREEZING]: '#80aaf4',
  [ALERT_TYPE.UNFREEZING]: '#2f9d4c',
  [ALERT_TYPE.BOILING]: '#ff7866',
  [ALERT_TYPE.UNBOILING]: '#f5af27',
}

export const ListItem = (props: Props) => {
  const { item } = props
  return (
    <Container>
      <span>{item.temperature}</span>
      {item.alert && <Alert color={AlertColor[item.alert]}>{item.alert}</Alert>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`

const Alert = styled.strong<{
  color: string
}>`
  color: ${({ color }) => color};
`
