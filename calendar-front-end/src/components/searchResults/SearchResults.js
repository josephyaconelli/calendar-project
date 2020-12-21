import React, { useState, useEffect } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../../utils/utils'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export const SearchResults = () => {
  let history = useHistory()
  const [results, setResults] = useState([])
  let query = useQuery()

  let q = query.get("q")
  const getSearchResults = () => {
    const authKey = getCookie('auth-token')

    axios.post("http://localhost:5000/events/search", {
      searchString: q
    }, {
      headers: {
        "auth-token": authKey
      }
    }).then(res => {
      const events = res.data.data.events
      console.log('results: ', events)
      setResults(events)
    }).catch(err => console.log(err))
  }

  useEffect(() => getSearchResults(), [])

  return (
    <Container>
      <Link to="/">Back to Calendar</Link>
      <ListGroup>
        {
          results.map(({title, description, start, end, _id}) => (
            <ListGroup.Item key={_id}>
              <h3>{title}</h3>
              {description}<br/>
              {start}<br/>
              {end}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Container>
  )
}