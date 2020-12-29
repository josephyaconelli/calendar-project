import React, { useState, useEffect } from 'react'
import { Container, Button, Jumbotron, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { setCookie } from '../../utils/utils'


export const Register = ({setLoggedIn}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPasssword] = useState('')


  const history = useHistory()


  const tryRegister = (name, email, password) => {
    axios.post('http://localhost:5000/auth/register', {
      email,
      password,
      name
    })
    .then((res) => {
      setCookie("auth-token", res.data.data.token)
      setCookie("refresh-token", res.data.data.refreshToken)
      setLoggedIn(true)
      history.push('/')
    })
    .catch((err) => console.log(err))
  }


  return (
    <Container>
      <Jumbotron>
        <Form className="mr-auto">
          <FormGroup controlId="formName">
            <FormLabel>Name</FormLabel>
            <FormControl type="text" placeholder="John Smith" className="mr-sm-2" value={name} onChange={e => setName(e.target.value)}  />
          </FormGroup>
          <FormGroup controlId="formEmail">
            <FormLabel>Email</FormLabel>
            <FormControl type="email" placeholder="Enter email" className="mr-sm-2" value={email} onChange={e => setEmail(e.target.value)}  />
          </FormGroup>
          <FormGroup controlId="formPassword">
            <FormLabel>Password</FormLabel>
            <FormControl type="password" placeholder="password" className="mr-sm-2" value={password} onChange={e => setPasssword(e.target.value)} />
          </FormGroup>
          <Button onClick={() => tryRegister(name, email, password)} variant="info">Register</Button>
          <hr />
          <Link to="/login">Already have an account?</Link>
        </Form>
      </Jumbotron>
    </Container>
    
  )
}