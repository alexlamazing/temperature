import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { TemperatureList } from './components/TemperatureList'
import CONST from './const'
import { GlobalStyle } from './theme/global'
import { withAlert } from './utils'

function App() {
  const [temperature, setTemperature] = useState<string>('')
  const [temperatures, setTemperatures] = useState<number[]>([])

  const tempWithAlerts = withAlert(temperatures)

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTemperature(event.target.value)
    },
    []
  )

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const parsedValue = parseFloat(temperature)
      if (isNaN(parsedValue)) {
        return
      }
      setTemperatures((temp) => [...temp, parsedValue])
      setTemperature('')
    },
    [temperature]
  )

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <FormContainer>
          <Row>
            <Col>Freezing threshold</Col>
            <Col>{CONST.THRESHOLD_FREEZING}</Col>
          </Row>
          <Row>
            <Col>Boiling threshold</Col>
            <Col>{CONST.THRESHOLD_BOILING}</Col>
          </Row>
          <Row>
            <Col>Fluctuation</Col>
            <Col>{CONST.FLUCTUATION}</Col>
          </Row>
        </FormContainer>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <label htmlFor='temperature'>Temperature</label>
              </Col>
              <Col>
                <input
                  id='temperature'
                  value={temperature}
                  onChange={handleOnChange}
                />
              </Col>
            </Row>
            <Row>
              <button type='submit'>Enter</button>
            </Row>
          </form>
        </FormContainer>

        <ResultContainer>
          <TemperatureList items={tempWithAlerts} />
        </ResultContainer>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  margin: 24px;
`

const Row = styled.div`
  display: flex;
  > * {
    flex: 1 0 auto;
  }
  margin-bottom: 24px;
`

const Col = styled.div`
  width: 50%;
`

const FormContainer = styled.div``

const ResultContainer = styled.div``

export default App
