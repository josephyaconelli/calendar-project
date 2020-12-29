import React, { useState, useEffect } from 'react'
import { Container, Button, Jumbotron, Form, FormControl, FormGroup, FormLabel, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { setCookie } from '../../utils/utils'





export const Login = ({ isLoggedIn, isError, error, logIn }) => {

  const [email, setEmail] = useState('')
  const [password, setPasssword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/')
    }
  }, [isLoggedIn])



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
          {isError && (<Alert variant="danger">
            {error}
          </Alert>)}
          <Button onClick={() => logIn(email, password)} variant="info">Log In</Button>
          <hr />
          <Link to="/register">Create account</Link>
        </Form>
      </Jumbotron>
    </Container>
    
  )
}