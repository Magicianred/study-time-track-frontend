/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  resetSubjectData,
  setActiveTab,
  setSessionTitle,
} from '../actions/index';
import autoLogin from '../api/autoLogin';
import { setSessionData } from '../api/setData';
import ErrorMessage from '../components/ErrorMessage';
import LoaderSpinner from '../components/LoaderSpinner';
import LogOut from './LogOut';

const AddSession = () => {
  const token = localStorage.getItem('token');
  const { user, session } = useSelector(state => state);
  const dispatch = useDispatch();

  const setTitle = e => {
    const input = e.target.value;
    dispatch(setSessionTitle(input));
  };

  useEffect(() => {
    dispatch(autoLogin());
    dispatch(setActiveTab('Add Session'));
  }, []);

  const setSession = e => {
    e.preventDefault();
    dispatch(setSessionData());
    dispatch(resetSubjectData());
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
      {!token && <Redirect to="/" />}
      {session.redirect && <Redirect to={`/sessionDetail/${session.session.id}`} />}
      <form>
        <label htmlFor="title">Title</label>
        <input onChange={setTitle} id="title" type="text" placeholder="Session Title" />
        <button type="submit" onClick={setSession}>Add</button>
      </form>
      <LogOut />
    </>
  );
};

export default AddSession;
