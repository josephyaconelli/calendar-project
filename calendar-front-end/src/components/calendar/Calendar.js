import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import Calendar from 'react-calendar'
import './Calendar.css'
import { EventInfo } from '../eventInfo/EventInfo'
import axios from 'axios'
import { getCookie, setCookie } from '../../utils/utils'


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
      <Button variant="info" style={{width: 'calc(100% + 1em)', marginLeft: '-0.5em', borderRadius: 0, marginTop: 2}} color="#FF0000" onClick={(e) => {
        e.stopPropagation()
        setCurrentEvent([event])
      }} active={currentEvent === event}>{event.title}</Button>
  ))
}

export const Main = () => {
  const [value, onChange] = useState(new Date())
  const [displayedEvents, setDisplayedEvents] = useState([])
  const [events, setEvents] = useState([])
  const [eventsLoaded, setEventsLoaded] = useState(false)
  const [clickedMonth, onClickedMonth] = useState()

  useEffect(() => {
    console.log(value.getMonth())
    const authToken = getCookie('auth-token')
    const month = value.getMonth()
    const year = value.getFullYear()
    axios.post('http://localhost:5000/events/getByMonth', {
      month,
      year
    }, {
      headers: {
        'auth-token': authToken
      }
    })
    .then((res) => {
      console.log(res)
      setEventsLoaded(true)
      setEvents(res.data.data.events)
    })
    .catch(error => console.log(error))
  }, [clickedMonth])

  if (!eventsLoaded) {
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
                setDisplayedEvents(getCurrentEvents(value, events))
              }
            }
          />
        </Col>
      </Row>
      {
        [...displayedEvents].sort((a,b) => (new Date(a.start).getTime() - new Date(b.start).getTime())).map((event) => (
          <Row>
            <Col>
              <EventInfo {...event} key={event._id} />
            </Col>
          </Row>
        ))
      }
    </Container>
  )
}
