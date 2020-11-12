import React, { useEffect } from 'react'
import {Card} from 'react-bootstrap'


const createTimeString = (start, end) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  const startDate = start.toLocaleDateString('en-gb', options)
  const endDate = end.toLocaleDateString('en-gb', options)

  const startTime = start.getHours() + ':' + (start.getMinutes() < 10 ? '0' + start.getMinutes() : start.getMinutes())
  const endTime = end.getHours() + ':' + (end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes())
  const duration = startTime + ' – ' + endTime

  if (start.getDay() !== end.getDay() || start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear()) {
    return <p>{startTime + ' ' + startDate}<br/>{endTime + ' ' + endDate}</p>
  }

  return duration + ' ' + startDate
}


export const EventInfo = ({title, start, end, info}) => {

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{
          createTimeString(start, end)
        }</Card.Subtitle>
        <Card.Text>
          {info}
        </Card.Text>
      </Card.Body>
    </Card>
    
)}
