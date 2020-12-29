import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import Calendar from 'react-calendar'
import './Calendar.css'
import EventInfoContainer from '../eventInfo/EventInfoContainer'
import { useHistory } from 'react-router-dom'
import { random } from 'lodash'


const getCurrentEvents = (date, events) => {
  return events.filter(e => {
    const currDate = new Date(e.start)
    currDate.setHours(0,0,0,0)
    return (currDate <= date && new Date(e.end) >= date) || currDate.getTime() === date.getTime()
  })
}

const renderEvents = (setCurrentEvent, currentEvent, events) => ({ activeStartDate, date, view }) => {
  const currentEvents = getCurrentEvents(date, events)
  return view === 'month' && currentEvents.map((event, i) => (
      <Button id={`button-${event._id}`} variant="info" style={{width: 'calc(100% + 1em)', marginLeft: '-0.5em', borderRadius: 0, marginTop: 2}} color="#FF0000" onClick={(e) => {
        e.stopPropagation()
        setCurrentEvent([event._id])
      }} active={currentEvent === event}>{event.title}</Button>
  ))
}

export const Main = ({ getEventsByMonth, isLoggedIn, events }) => {
  const [value, onChange] = useState(new Date())
  const [displayedEvents, setDisplayedEvents] = useState([])
  const [clickedMonth, onClickedMonth] = useState()

  const history = useHistory()

  useEffect(() => {
    const month = value.getMonth()
    const year = value.getFullYear()
    getEventsByMonth(month, year)
  }, [clickedMonth, isLoggedIn, getEventsByMonth, value])

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login')
    }
  }, [isLoggedIn])

  if (!events) {
    return (
      <Spinner animation="border" role="status" variant="info" className="loading-spinner">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Calendar
            onActiveStartDateChange={onClickedMonth}
            onChange={onChange}
            value={value}
            tileContent={renderEvents(setDisplayedEvents, displayedEvents, events)}
            onClickDay={
              (value, event) => {
                setDisplayedEvents(getCurrentEvents(value, events).map(({_id}) => _id))
              }
            }
          />
        </Col>
      </Row>
      {
        events.filter(({_id}) => displayedEvents.includes(_id)).sort((a,b) => (new Date(a.start).getTime() - new Date(b.start).getTime())).map((event) => (
          <Row key={`row-${event._id}-${event.public}-${random(0,99999)}`}>
            <Col>
              <EventInfoContainer {...event} public={event.public} key={`${event._id}-${event.public}`} />
            </Col>
          </Row>
        ))
      }
    </Container>
  )
}
