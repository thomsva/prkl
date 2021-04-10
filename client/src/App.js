import React, { createContext, useEffect } from 'react';
import { initShibbolethPinger } from 'unfuck-spa-shibboleth-session';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, useStore } from 'react-hookstore';
import { useQuery } from '@apollo/client';
import { Loader } from 'semantic-ui-react';

import { ALL_COURSES, CURRENT_USER } from './GqlQueries';

import CourseForm from './components/courses/CourseForm';
import PrivateRoute from './components/ui/PrivateRoute';
import UserInfo from './components/users/UserInfo';
import KeepAlive from './components/misc/KeepAlive';
import Courses from './components/courses/Courses';
import Course from './components/courses/Course';
import Users from './components/users/Users';
import DevBar from './components/DevBar';
import Header from './components/Header';
import roles from './util/userRoles';
import './App.css';
import Notification from './components/ui/Notification';

createStore('grouplessStudentsStore', []);
createStore('groupsUnsavedStore', false);
createStore('lockedGroupsStore', []);
createStore('toggleStore', false);
createStore('coursesStore', []);
createStore('teacherStore', []);
createStore('groupsStore', []);
createStore('notificationStore', {});

export const AppContext = createContext();

export default () => {
  // eslint-disable-next-line no-unused-vars
  const [courses, setCourses] = useStore('coursesStore');
  const [mocking] = useStore('mocking');

  const { loading: userLoading, error: userError, data: userData } = useQuery(CURRENT_USER);
  const { loading: courseLoading, error: courseError, data: courseData } = useQuery(ALL_COURSES);

  useEffect(() => {
    initShibbolethPinger();
  }, []);

  useEffect(() => {
    if (!courseLoading) {
      if (courseError !== undefined) {
        // eslint-disable-next-line no-console
        console.log('error:', courseError);
      } else {
        setCourses((courseData && courseData.courses) || []);
      }
    }
  }, [courseData, courseError, courseLoading, setCourses]);

  if (userLoading || !userData) {
    return <Loader active/>
  }

  const user = userData.currentUser;

  return (
    <AppContext.Provider value={{user}}>
      {process.env.REACT_APP_CUSTOM_NODE_ENV !== 'production' ? <DevBar /> : null}
      <div className="App">
        <Notification />
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          {courseLoading && user ? (
            <Loader active data-cy="loader" />
          ) : (
            <div className="mainContent">
              <Loader />
              <Route path="/user" render={() => <UserInfo courses={courses} />} />
              <PrivateRoute
                path="/addcourse"
                requiredRole={roles.STAFF_ROLE}
                render={() => <CourseForm />}
              />
              <PrivateRoute
                path="/usermanagement"
                requiredRole={roles.ADMIN_ROLE}
                render={() => <Users />}
              />
              <Route
                exact
                path="/course/:id/:subpage?"
                render={({ match }) => <Course id={match.params.id} match={match} />}
              />
              <Route exact path={['/', '/courses']} component={Courses} />
            </div>
          )}
        </Router>
        <KeepAlive />
      </div>
    </AppContext.Provider>
  );
};
