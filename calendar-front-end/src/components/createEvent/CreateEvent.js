import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Container, Button, Form, FormGroup, FormControl, FormLabel, Alert } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export const CreateEvent = ({
  isLoggedIn,
  isError,
  wasSuccessful,
  error,
  addEvent,
  editEvent,
  events
}) => {

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
  const history = useHistory()

  useEffect(() => {
    const currEvent = (events || []).filter(({_id}) => _id === id)[0]
    let changed = false
    if (currEvent) {
      changed = (
        oldTitle !== currEvent.title
        || oldDescription !== currEvent.description
        || oldStart.getSeconds() !== new Date(currEvent.start).getSeconds()
        || oldEnd.getSeconds() !== new Date(currEvent.end).getSeconds()
        || oldBusy !== currEvent.busy
        || oldPublic !== currEvent.public
      )
    }
    
    if(wasSuccessful || (changed && events.length >= 1)) {
      history.push('/')
    }
  }, [wasSuccessful, events])

  return (
    <Container>

      <Form className="mr-auto">
      <hr />
      <Button onClick={() => history.push('/')} variant="outline-info">{'<'} Back</Button>
      <br/>
      <br/>
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
        <Button onClick={() => id ? editEvent(
          id,
          {title,
          description,
          start,
          end,
          busy,
          public: publiclyAvailable}
        ) : addEvent(
          title,
          description,
          start,
          end,
          busy,
          publiclyAvailable
        )} variant="info">{id ? 'Save' : 'Create'}</Button>
      </Form>
      <br/>
      {isError && <Alert variant="danger">{error}</Alert>}
    </Container>
  )
}