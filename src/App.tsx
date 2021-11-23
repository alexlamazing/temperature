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
      <div>
        <Container>
          <Title>Temperature Alert App</Title>

          <SectionContainer>
            <Row>
              <Col>
                <strong>Freezing threshold</strong>
              </Col>
              <Col>{CONST.THRESHOLD_FREEZING}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Boiling threshold</strong>
              </Col>
              <Col>{CONST.THRESHOLD_BOILING}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Fluctuation</strong>
              </Col>
              <Col>{CONST.FLUCTUATION}</Col>
            </Row>
          </SectionContainer>

          {!!tempWithAlerts.length && (
            <SectionContainer>
              <TemperatureList items={tempWithAlerts} />
            </SectionContainer>
          )}
        </Container>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <Flex>
              <FlexBox>
                <Textbox
                  id='temperature'
                  value={temperature}
                  onChange={handleOnChange}
                  placeholder='Please input temperature'
                />
              </FlexBox>
              <FlexBox>
                <SubmitButton type='submit'>Enter</SubmitButton>
              </FlexBox>
            </Flex>
          </form>
        </FormContainer>
      </div>
    </React.Fragment>
  )
}

const Container = styled.div`
  margin: 24px;
`

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin: 24px 0;
`

const SectionContainer = styled.div`
  border: 1px solid #5f6368;
  border-radius: 10px;
  padding: 16px;
  max-width: 400px;
  margin: 0 auto 24px; ;
`

const Row = styled.div`
  display: flex;
  > * {
    flex: 1 0 auto;
  }
  padding: 12px 0;
`

const Col = styled.div`
  width: 50%;
`

const FormContainer = styled.div`
  background-color: #303134;
  padding: 16px 24px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`

const Textbox = styled.input.attrs({
  type: 'text',
})`
  height: 40px;
  width: 200px;
  border: none;
  border-radius: 4px;
`

const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  background-color: #28a745;
  border: 1px solid #28a745;
  border-radius: 4px;
  color: #eee;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  width: 150px;
  height: 40px;
`

export default App
