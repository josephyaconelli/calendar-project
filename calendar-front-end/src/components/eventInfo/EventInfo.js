import React, { useEffect } from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../../utils/utils'





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



export const EventInfo = ({title, start, end, description, _id, busy, ...restOfIt}) => {
  
  let history = useHistory()

  const deleteEvent = (id) => {
    const authToken = getCookie('auth-token')
    console.log('auth:', authToken)
    axios.post('http://localhost:5000/events/remove', {
      id: id
    }, {
      headers: {
        "auth-token": authToken
      }
    }).then(res => {
      history.go(0)
    })
    .catch(err => console.log(err))
  }

  const shareEvent = (id, setShare) => {
    const authToken = getCookie('auth-token')
    console.log(restOfIt)
    console.log('id:', id)
    axios.post('http://localhost:5000/events/edit', {
      id: id,
      toUpdate: {
        public: setShare
      }
    }, {
      headers: {
        "auth-token": authToken
      }
    }).then(res => {
      history.go(0)
    })
    .catch(err => console.log(err))
  }
  

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{
          createTimeString(start, end)
        }</Card.Subtitle>
        <Card.Text>
          {description}
          {restOfIt["public"] && (
            <>
              <hr/>
              <a href={`http://localhost:5000/share/${_id}`} target="_blank">{`http://localhost:5000/share/${_id}`}</a>
            </>
          )}
          
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={`/edit?id=${_id}&title=${title}&description=${description}&start=${start}&end=${end}&busy=${busy}`}><Button variant="info">Edit</Button></Link>
        &nbsp;<Button variant="info"  onClick={() => shareEvent(_id, !restOfIt["public"])}>{restOfIt["public"] ? 'Unshare' : 'Share'}</Button>
        &nbsp;<Button variant="warning"  onClick={() => deleteEvent(_id)}>Delete</Button>
      </Card.Footer>
    </Card>
    
)}
