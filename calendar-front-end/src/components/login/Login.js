import React, { useState, useEffect } from 'react'
import { Container, Button, Jumbotron, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { setCookie } from '../../utils/utils'





export const Login = ({ setLoggedIn }) => {

  const [email, setEmail] = useState('')
  const [password, setPasssword] = useState('')

  const history = useHistory()

  const tryLogin = (email, password) => {
    axios.post('http://localhost:5000/auth/login', {
      email,
      password
    })
    .then((res) => {
      setCookie("auth-token", res.data.data.token)
      setCookie("refresh-token", res.data.data.refreshToken)
      setLoggedIn(true)
      history.push('/')
    })
  }

  return (
    <Container>
      <Jumbotron>
        <Form className="mr-auto">
          <FormGroup controlId="formEmail">
            <FormLabel>Email</FormLabel>
            <FormControl type="email" placeholder="Enter email" className="mr-sm-2" value={email} onChange={e => setEmail(e.target.value)}  />
          </FormGroup>
          <FormGroup controlId="formPassword">
            <FormLabel>Password</FormLabel>
            <FormControl type="password" placeholder="password" className="mr-sm-2" value={password} onChange={e => setPasssword(e.target.value)} />
          </FormGroup>
          <Button onClick={() => tryLogin(email, password)} variant="info">Log In</Button>
          <hr />
          <Link to="/register">Create account</Link>
        </Form>
      </Jumbotron>
    </Container>
    
  )
}