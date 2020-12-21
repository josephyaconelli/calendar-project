import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Container, Button, Form, FormGroup, FormControl, FormLabel, Alert} from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'
import { getCookie } from '../../utils/utils'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export const CreateEvent = () => {

  let query = useQuery()

  let id = query.get("id")
  let oldTitle = query.get("title")
  let oldDescription = query.get("description")
  let oldStart = query.get("start") && new Date(query.get("start"))
  let oldEnd = query.get("end") && new Date(query.get("end"))
  let oldBusy = query.get("busy") === 'true'
  let oldPublic = query.get("public") === 'public'

  const [title, setTitle] = useState(oldTitle || '')
  const [description, setDescription] = useState(oldDescription || '')
  const [start, setStart] = useState(oldStart || new Date(Date.now()))
  const [end, setEnd] = useState(oldEnd || new Date(Date.now() + 60*60*1000))
  const [busy, setBusy] = useState(oldBusy || true)
  const [publiclyAvailable, setPubliclyAvailable] = useState(oldPublic || false)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  const tryAddEvent = () => {
    const authToken = getCookie('auth-token')

    axios.post('http://localhost:5000/events/add', {
      title: title,
      description: description,
      start: start,
      end: end,
      busy: busy,
      public: publiclyAvailable
    }, {
      headers: {
        "auth-token": authToken 
      }
    })
    .then((res) => {

      if(res.status === 299) {
        const conflicts = res.data.events.map(e => e.title)
        setErrorMessage(`${res.data.error}. Events: ${conflicts}`)
      } else {
        history.push('/')
      }
    })
    .catch((error) => {
      console.log('error: ', error)
      console.log('status: ', error.status)
    })

  }

  const tryEditEvent = () => {
    const authToken = getCookie('auth-token')

    axios.post('http://localhost:5000/events/edit', {
      id: id,
      toUpdate: {
        title: title,
        description: description,
        start: start,
        end: end,
        busy: busy,
        public: publiclyAvailable
      }
    }, {
      headers: {
        "auth-token": authToken 
      }
    })
    .then((res) => {

      if(res.status === 299) {
        const conflicts = res.data.events.map(e => e.title)
        setErrorMessage(`${res.data.error}. Events: ${conflicts}`)
      } else {
        history.push('/')
      }
    })
    .catch((error) => {
      console.log('status: ', error)
    })
  }

  return (
    <Container>
      <Form className="mr-auto">
        <FormGroup controlId="formTitle">
          <FormLabel>Title</FormLabel>
          <FormControl type="text" placeholder="" className="mr-sm-2" value={title} onChange={e => setTitle(e.target.value)}  />
        </FormGroup>
        <FormGroup controlId="formDescription">
          <FormLabel>Description</FormLabel>
          <FormControl type="text" placeholder="" className="mr-sm-2" value={description} onChange={e => setDescription(e.target.value)}  />
        </FormGroup>
        <DateTimePicker value={start} onChange={setStart} />
        <DateTimePicker value={end} onChange={setEnd} />
        <br/><br/>
        <Button onClick={() => id ? tryEditEvent() : tryAddEvent()} variant="info">{id ? 'Save' : 'Create'}</Button>
      </Form>
      <br/>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Container>
  )
}