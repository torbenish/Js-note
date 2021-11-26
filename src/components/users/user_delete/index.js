/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { Button } from 'rbx';
import { Redirect } from 'react-router-dom';
import UsersService from '../../../services/users';

function UsersDelete() {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const deleteUser = async () => {
    if (window.confirm('Are you sure you wish to delete this account?')) {
      await UsersService.delete();
      setRedirectToHome(true);
    }
  };

  if (redirectToHome == true) return <Redirect to={{ pathname: '/' }} />;

  return (
    <Button color="danger" onClick={() => deleteUser()}>
      Excluir conta
    </Button>
  );
}

export default UsersDelete;
