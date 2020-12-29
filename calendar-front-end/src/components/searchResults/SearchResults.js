import React, { useState, useEffect } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getCookie } from '../../utils/utils'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export const SearchResults = ({ searchEvents, events }) => {
  let history = useHistory()
  let query = useQuery()

  let q = query.get("q")
  

  useEffect(() => searchEvents(q), [q])

  return (
    <Container>
      <Link to="/">Back to Calendar</Link>
      <ListGroup>
        {
          events.map(({title, description, start, end, _id}) => (
            <ListGroup.Item key={_id}>
              <h3>{title}</h3>
              {description}
              <hr/>
              Start: {(new Date(start)).toString()}<br/>
              End: {(new Date(end)).toString()}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Container>
  )
}