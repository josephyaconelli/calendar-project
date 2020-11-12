import React, { useState, useRef } from 'react'
import { Container, Row, Col, Button, Navbar, Form, FormControl, Nav } from 'react-bootstrap'
import Calendar from 'react-calendar'
import './Calendar.css'
import { EventInfo } from '../eventInfo/EventInfo'


const getCurrentEvents = (date, events) => {
  return events.filter(e => {
    const currDate = new Date(e.start.getTime())
    currDate.setHours(0,0,0,0)
    return (e.start <= date && e.end >= date) || currDate.getTime() === date.getTime()
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

export const Main = ({events}) => {
  const [value, onChange] = useState(new Date())
  const [displayedEvents, setDisplayedEvents] = useState([])



  return (
    <Container>
      <Navbar variant="light">
        <Nav className="mr-auto">
          <Button variant="outline-info">+ Create Event</Button>
        </Nav>
        <Form inline className="mr-auto">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        <Nav >
        <Button variant="outline-info">Sign In</Button>
        </Nav>

      </Navbar>
      <Row>
        <Col md={12}>
          <Calendar
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
        [...displayedEvents].sort((a,b) => (a.start.getTime() - b.start.getTime())).map((event) => (
          <Row>
            <Col>
              <EventInfo {...event} />
            </Col>
          </Row>
        ))
      }
    </Container>
  )
}
