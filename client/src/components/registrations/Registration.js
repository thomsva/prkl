import React, { useState } from 'react';
import { useStore } from 'react-hookstore';
import { useForm } from 'react-hook-form';
import { Header, Icon, Button } from 'semantic-ui-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import { FREEFORM, SINGLE_CHOICE, MULTI_CHOICE, TIMES } from '../../util/questionTypes';
import { REGISTER_TO_COURSE, DELETE_REGISTRATION } from '../../GqlQueries';
import RegistrationForm from './RegistrationForm';
import ConfirmationButton from '../ui/ConfirmationButton';
import timeChoices from '../../util/timeFormChoices';
import UserGroup from '../users/UserGroup';

export default ({ course }) => {
  const hookForm = useForm({ mode: 'onChange' });
  const { handleSubmit } = hookForm;
  const [createRegistration] = useMutation(REGISTER_TO_COURSE);
  const [deleteRegistration] = useMutation(DELETE_REGISTRATION);

	const [user, setUser] = useStore('userStore');
	const [view, setView] = useState('info');
  const courseId = course.id;
  const studentId = user.id;

  const variables = { studentId, courseId };
  const intl = useIntl();
  const history = useHistory();

  const parseDay = (day, dayIndex, key) => {
    let prev = [1, timeChoices.no];
    const list = [];

    const entries = Object.entries(day);

    if (entries[0][1] !== timeChoices.no) {
      [prev] = entries;
    }

    for (let i = 1; i < entries.length; i += 1) {
      if (prev[1] !== timeChoices.no && entries[i][1] !== prev[1]) {
        list.push({
          questionId: key,
          tentative: prev[1] === timeChoices.maybe,
          startTime: new Date(1970, 0, dayIndex + 5, prev[0], 0),
          endTime: new Date(1970, 0, dayIndex + 5, entries[i][0], 0),
        });
        prev = entries[i];
      } else if (prev[1] === timeChoices.no && entries[i][1] !== timeChoices.no) {
        prev = entries[i];
      }

      if (i === entries.length - 1 && prev[1] !== timeChoices.no) {
        list.push({
          questionId: key,
          tentative: prev[1] === timeChoices.maybe,
          startTime: new Date(1970, 0, dayIndex + 5, prev[0], 0),
          endTime: new Date(1970, 0, dayIndex + 5, Number.parseInt(entries[i][0], 10) + 1, 0),
        });
      }
    }

    return list;
  };

  const parseWeek = (week, key) => {
    const timeList = [];
    Object.values(week).forEach((day, dayIndex) => {
      const parsedDay = parseDay(day, dayIndex, key);

      parsedDay.forEach(stamp => {
        timeList.push(stamp);
      });
    });
    return timeList;
	};

	const handleUserGroupView = () => {
    if (view !== 'userGroup') {
      setView('userGroup');
    } else {
      setView('info');
		}
  };

  // Format form data for GraphQL and post to backend.
  const onSubmit = async data => {
    // Remove TOC button's value.
    delete data.toc; // eslint-disable-line no-param-reassign
    const answer = { courseId };

    answer.workingTimes = [];

    answer.questionAnswers = Object.keys(data).map(key => {
      const res = { questionId: key };
      const type = course.questions.filter(q => q.id === key)[0].questionType;

      switch (type) {
        case FREEFORM:
          res.content = data[key];
          break;

        case SINGLE_CHOICE:
          res.answerChoices = [{ id: data[key] }];
          break;

        case MULTI_CHOICE:
          res.answerChoices = data[key].map(id => ({ id }));
          break;

        case TIMES:
          parseWeek(data[key], key).forEach(stamp => {
            answer.workingTimes.push(stamp);
          });
          break;
        default:
          throw new Error('Question type not supported!');
      }

      return res;
    });

    try {
      // TODO: Add spinner before next line and disable the submit button on click.
      const response = await createRegistration({ variables: { data: answer } });
  
      const updatedUser = user;
      const newReg = {
        course: { 
          id: course.id,
          title: course.title,
          code: course.code,
          deleted: course.deleted,
          __typename: course.__typename,
        },
        id: response.data.createRegistration.id,
        __typename: response.data.createRegistration.__typename,
      };
      const regs = updatedUser.registrations.concat(newReg);
      updatedUser.registrations = regs;
			setUser(updatedUser);
      //TODO: add timeout success alert
    } catch (err) {
      // TODO: Handle errors.
      console.log(err);
    }
  };

  const handleRegistrationDeletion = async () => {
    try {
      await deleteRegistration({
        variables
      });
      const updatedUser = user;
      const regs = updatedUser.registrations.filter(r => r.course.id !== courseId);
      updatedUser.registrations = regs;
      setUser(updatedUser);
    } catch (deletionError) {
      console.log('error:', deletionError);
    }
    history.push('/courses');
  }

  const userIsRegistered = () => {
    const found = user.registrations?.find(r => r.course.id === course.id);

    if (found === undefined) {
      return false;
    }

    return true;
	};

  return (
		<div>
			{ view === 'info' ? (
				<div>
					{userIsRegistered() ? (
						<div>
							<br></br>
								<Header as="h2">
									<div>
										<Icon name="thumbs up outline" data-cy="registered" />
										<Header.Content>
											<FormattedMessage id="course.userHasRegistered" />
										</Header.Content>
									</div>
								</Header>
							{new Date(course.deadline) > new Date() ? (
								<ConfirmationButton
									onConfirm={handleRegistrationDeletion}
									modalMessage={intl.formatMessage({ id: "courseRegistration.cancelConfirmation" })}
									buttonDataCy="cancel-registration-button"
									color="red"
								>
									<FormattedMessage id="courseRegistration.cancel" />
								</ConfirmationButton>
							) : (
								<div>
									<Header as="h5">
										<Header.Content>
											<FormattedMessage id="course.contactTeacher" />
										</Header.Content>
									</Header>
								</div>		
							)}
							<div>
								{course.groupsPublished ? (
									<div>
										<br></br>
										<Button onClick={handleUserGroupView} color="blue" data-cy="show-user-groups-button">
											<FormattedMessage id="course.showUserGroup" />
										</Button>
									</div>
								) : (
									<div>
										<br></br>
											<Button disabled color="blue" data-cy="disabled-show-user-groups-button">
												<FormattedMessage id="course.disabledShowUserGroup" />
											</Button>
									</div>
								)}
							</div>
						</div>
					) : (
						<div>
							{new Date(course.deadline) > new Date() ? (
								<RegistrationForm
									onSubmit={handleSubmit(onSubmit)}
									questions={course.questions}
									formControl={hookForm}
								/>
							) : null} 
						</div>
					)}
				</div>
			) : (
				<div>
					<UserGroup user={user} course={course} />
				<br></br>
					<Button onClick={handleUserGroupView} color="blue" data-cy="back-to-info-button">
						<FormattedMessage id="course.switchInfoView" />
					</Button>
				</div>
			)}
		</div>
	)};