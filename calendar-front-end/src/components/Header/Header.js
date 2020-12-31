import React, { useState, useEffect } from 'react'
import { Navbar, Button, Form, Container, Nav, FormControl } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'


export const Header = ({ isLoggedIn, logOut }) => {
  
  const [searchText, setSearchText] = useState('')
  const history = useHistory()
  


  return (
    <Container>
      <Navbar variant="light">
        <Nav className="mr-auto">
          {isLoggedIn && <Link to="/edit"><Button variant="outline-info">+ Create Event</Button></Link>}
        </Nav>
        { isLoggedIn &&
          (
            <Form inline className="mr-auto" onSubmit={(e) => {
              e.preventDefault()
              history.push(`/search?q=${searchText}`)
              }}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchText} onChange={e => setSearchText(e.target.value)} />
              <Button variant="outline-info" type="submit">Search</Button>
            </Form>
          )
        }
        
        <Nav >
        { !isLoggedIn ? (
          <Link to="/login"><Button variant="outline-info">Log In</Button></Link>
        ) : (
          <Button variant="outline-info" onClick={logOut}>Log Out</Button>
        )
        }
        </Nav>
      </Navbar>
    </Container>
  )
}