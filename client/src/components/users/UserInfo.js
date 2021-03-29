import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useStore } from 'react-hookstore';
import { dummyEmail, dummyStudentNumber } from '../../util/privacyDefaults';
import UserCourseList from './UserCourseList';
import roles from '../../util/userRoles';

import { Container, Typography } from '@material-ui/core';

export default ({courses, user}) => {
  const [privacyToggle] = useStore('toggleStore');

  const coursesTeachedOn = courses.filter(c => c.teachers.some(t => t.id === user.id));

  const usersCourses = () => {
    const coursesIds = user.registrations.map(reg => reg.course.id);
    const usersCourses = courses.filter(c => coursesIds.includes(c.id));

    return (usersCourses);
  };

  const divider = <span style={{ color: '#f2f2f2' }}>{' | '}</span>

  return (
    <Container>

          <Typography variant="h4">

            <FormattedMessage
              id="studentInfo.fullname"
              values={{ fullname: `${user.firstname} ${user.lastname}` }}
            />

          </Typography>

          <Typography variant="h5" color="textSecondary" gutterBottom>

            <FormattedMessage
              id="studentInfo.studentNo"
              values={{ studentNo: privacyToggle ? dummyStudentNumber : user.studentNo }}
            />{divider}
            <FormattedMessage
              id="studentInfo.email"
              values={{ email: privacyToggle ? dummyEmail : user.email }}
              className
            />

          </Typography>

      &nbsp;
      {user.registrations ? (
        <>
          <Typography variant="h5" gutterBottom>
            <FormattedMessage id="studentInfo.userCourses" />
          </Typography>

          <UserCourseList courses={usersCourses()} user={user} />
        </>
      ) : null}

      &nbsp;
      {user.role === roles.ADMIN_ROLE || user.role === roles.STAFF_ROLE ? (
        <>
          <Typography variant="h5" gutterBottom>
            <FormattedMessage id="studentInfo.ownCourses" />
          </Typography> 

          {coursesTeachedOn.length > 0 ? (
            <UserCourseList courses={coursesTeachedOn} user={user} />
          ) : 
            <>
              <Typography variant="h7" color="textSecondary" gutterBottom>
                <FormattedMessage id="studentInfo.noOwnCourses" />
              </Typography>
            </>
          }
          
        </>
      ) : null}

    </Container>
  );
};
