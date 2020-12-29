import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link, useHistory} from 'react-router-dom'





const createTimeString = (start, end) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  const startDate = new Date(start)
  const endDate = new Date(end)
  const startDateFormatted = (new Date(start)).toLocaleDateString('en-gb', options)
  const endDateFormatted = (new Date(end)).toLocaleDateString('en-gb', options)

  const startTime = startDate.getHours() + ':' + (startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes())
  const endTime = endDate.getHours() + ':' + (endDate.getMinutes() < 10 ? '0' + endDate.getMinutes() : endDate.getMinutes())
  const duration = startTime + ' – ' + endTime

  if (startDate.getDay() !== endDate.getDay() || startDate.getMonth() !== endDate.getMonth() || startDate.getFullYear() !== endDate.getFullYear()) {
    return <p>{startTime + ' ' + startDateFormatted}<br/>{endTime + ' ' + endDateFormatted}</p>
  }

  return duration + ' ' + startDateFormatted
}



export const EventInfo = ({
  title,
  start,
  end,
  description,
  _id,
  busy,
  removeEvent,
  shareEvent,
  unshareEvent,
  ...restOfIt}) => {
  
  let history = useHistory()

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{
          createTimeString(start, end)
        }</Card.Subtitle>
          {description}
          {restOfIt["public"] && (
            <>
              <hr/>
              <a href={`http://localhost:5000/share/${_id}`} target="_blank">{`http://localhost:5000/share/${_id}`}</a>
            </>
          )}
          
      </Card.Body>
      <Card.Footer>
        <Link to={`/edit?id=${_id}&title=${title}&description=${description}&start=${start}&end=${end}&busy=${busy}`}><Button variant="info">Edit</Button></Link>
        &nbsp;<Button variant="info"  onClick={() => restOfIt["public"] ? unshareEvent(_id) : shareEvent(_id)}>{restOfIt["public"] ? 'Unshare' : 'Share'}</Button>
        &nbsp;<Button variant="warning"  onClick={() => removeEvent(_id)}>Delete</Button>
      </Card.Footer>
    </Card>
    
)}
