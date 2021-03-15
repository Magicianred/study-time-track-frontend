import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import autoLogin from '../api/autoLogin';
import fetchData from '../api/fetchData';
import LogOut from '../containers/LogOut';
import ErrorMessage from './ErrorMessage';
import LoaderSpinner from './LoaderSpinner';

const UserDetail = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    dispatch(autoLogin());
    dispatch(fetchData());
  }, []);
  const { user } = useSelector(state => state);
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
      <div>
        {user.error && (
        <ErrorMessage message={errorText} />
        )}
        {!token && <Redirect to="/" />}
        <h1>User</h1>
        <h2>{user.user.username}</h2>
        <h1>Sessions</h1>
        { user.user.sessions
        && user.user.sessions.map(session => <h2 key={session.id}>{session.title}</h2>)}
      </div>
      <LogOut />
    </>
  );
};

export default UserDetail;
