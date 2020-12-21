import React, { useState, useEffect } from 'react'
import { Navbar, Button, Form, Container, Nav, FormControl } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { deleteCookie, setCookie } from '../../utils/utils'


export const Header = ({ loggedIn, setLoggedIn }) => {
  
  const [searchText, setSearchText] = useState('')
  const history = useHistory()

  const logOut = () => {
    deleteCookie('refresh-token')
    deleteCookie('auth-token')
    setLoggedIn(false)
    history.push('/login')
  }


  return (
    <Container>
      <Navbar variant="light">
        <Nav className="mr-auto">
          <Link to="/edit"><Button variant="outline-info">+ Create Event</Button></Link>
        </Nav>
        <Form inline className="mr-auto">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchText} onChange={e => setSearchText(e.target.value)} />
          <Button variant="outline-info" href={`/search?q=${searchText}`}>Search</Button>
        </Form>
        <Nav >
        { !loggedIn ? (
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