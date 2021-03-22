/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { setCredentialUsername, setCredentialPassword } from '../actions/index';
import { setUserData } from '../api/setData';
import ErrorMessage from '../components/ErrorMessage';
import LoaderSpinner from '../components/LoaderSpinner';
import autoLogin from '../api/autoLogin';

const SignUser = props => {
  const token = localStorage.getItem('token');
  const { buttonText } = props;
  const dispatch = useDispatch();
  const { user } = useSelector(state => state);

  const setCredentialName = e => {
    const input = e.target.value;
    dispatch(setCredentialUsername(input));
  };

  const setUser = e => {
    e.preventDefault();
    const signAction = e.target.textContent.toLowerCase();
    dispatch(setUserData(signAction));
  };

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  const setCredentialPass = e => {
    const input = e.target.value;
    dispatch(setCredentialPassword(input));
  };
  const shouldComponentRender = () => {
    let isPending = false;
    if (user.pending === false || user.error !== null) {
      isPending = false;
    } else {
      isPending = true;
    }
    return isPending;
  };
  if (shouldComponentRender()) return <LoaderSpinner />;
  const errorText = `Error: ${user.error}`;
  return (
    <>
      {user.error && (
      <ErrorMessage message={errorText} />
      )}
      <form>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" onChange={setCredentialName} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={setCredentialPass} />
        <button type="submit" onClick={setUser}>{buttonText}</button>
      </form>
      { token && <Redirect to="/session" />}
    </>
  );
};

SignUser.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default SignUser;
