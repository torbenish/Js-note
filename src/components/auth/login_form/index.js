/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';
import {
  Button, Field, Control, Input, Column, Help, Label,
} from 'rbx';
import { Redirect } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [redirectToNotes, setRedirectToNotes] = useState(false);
  const [error, setError] = useState(false);

  if (redirectToRegister) return <Redirect to={{ pathname: '/register' }} />;
  if (redirectToNotes) return <Redirect to={{ pathname: '/notes' }} />;

  return (
    <>
      <Column.Group centered>
        <form>
          <Column size={12}>
            <Field>
              <Label size="small">Email:</Label>
              <Control>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  name="email"
                />
              </Control>
            </Field>
            <Field>
              <Label size="small">Password:</Label>
              <Control>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  name="password"
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column>
                    <a
                      href="register"
                      className="button is-white has-text-custom-purple"
                      onClick={(e) => setRedirectToRegister(true)}
                    >
                      Register or
                    </a>
                  </Column>
                  <Column>
                    <Button color="custom-purple" outlined>
                      Login
                    </Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>
            {error && <Help color="danger">Email or Password invalid</Help>}
          </Column>
        </form>
      </Column.Group>
    </>
  );
}

export default LoginForm;
