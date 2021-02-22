export default {
  en: {
    // We're using dots for nesting and camelCase for each name

    'home.welcome': 'Welcome!',
    'home.briefing':
      'Please aquaint yourself with the available projects through the courses tab. Happy grouping!',

    'header.personalInfo': 'Personal info',
    'header.toggle': 'Toggle privacy',
    'header.courses': 'Courses',
    'header.addCourse': 'Add Course',
    'header.userManagement': 'Manage Users',
    'header.logout': 'Logout',

    'courseForm.pageTitle': 'Create course',
    'courseForm.titleForm': 'Title',
    'courseForm.courseCodeForm': 'Course code',
    'courseForm.courseDeadlineForm': 'Enrollment deadline',
    'courseForm.courseDescriptionForm': 'Course description',
    'courseForm.includeCalendar': 'Include a time table',
    'courseForm.timeFormLabel': 'Purpose of the time table',
    'courseForm.timeQuestionDefault':
      'Working hours that are okay/unsure/impossible for you, respectively',
    'courseForm.confirmButton': 'Confirm',
    'courseForm.addQuestion': 'Add question',
    'courseForm.publishCourse': 'Publish course',
    'courseForm.removeQuestion': 'Remove question',
    'courseForm.infoBox':
      'Answer options in single choice questions are assumed to be on a continuum '
      + '(ie. choices 1 and 2 are more similar than 1 and 3), give options in order. '
      + 'In multiple choice question the order does not matter.',
    'courseForm.publishAlert':'Note: Admin privileges are required to edit published courses!',
    'courseForm.confirmSubmit': 'Confirm course creation?',
    'courseForm.confirmPublishSubmit': 'Create and publish course?',
    'courseForm.teacherInfo': 'Choose teachers for your course from this list',
    'courseForm.titleValidationFailMsg': 'Title required',
    'courseForm.courseCodeValidationFailMsg': 'Course code required',
    'courseForm.deadlineValidationFailMsg': 'Deadline required',
    'courseForm.deadlinePassedValidationFailMsg': 'Date passed',
    'courseForm.descriptionValidationFailMsg': 'Description required',
    'courseForm.calendarDescValidationFailMsg': 'Calendar description required',

    'editView.pageTitle': 'Modify Course',
    'editView.coursePublishedNotification': "Course has been published, adding or removing new questions is not allowed. Texts of existing questions and their answer choices may be edited.",
    'editView.confirmPublishSubmit': 'Confirm all edits and publish course? Published courses can only be edited by admins!',
    'editView.confirmSubmit': 'Confirm all edits?',
    'editView.closeRegistrationLabel': 'Immediately close registration (for admin)',
    'editView.closeRegistrationBtn': 'Close registration',
    'editView.pastDeadlineWarning': 'Warning: You have set a registration deadline that has already passed. Registration will be effectively closed.',
    'editView.cancelEditsButton': 'Cancel',
    'editView.confirmCancelEdits': 'Discard all changes?',

    'courses.searchPlaceholder': 'Search courses',
    'courses.deadline': 'Enrollment deadline',
    'courses.teachers': 'Teachers:',
    'courses.showPastCoursesButtonLabel': 'Show past courses',
    'courses.showMyCourses': 'Show only my courses',
    'courses.orderByLabel': 'Order by:',
    'courses.orderByNameOption': 'Name',
    'courses.orderByCodeOption': 'Course Code',
    'courses.orderByDeadlineOption': 'Deadline',
    'courses.enrolledStudents': 'Enrolled students: ',

    'users.empty': 'No users found',
    'users.admin': 'Admin user',
    'users.staff': 'Staff',
    'users.student': 'Student',
    'users.searchPlaceholder': 'Search users',

    'gradeQuestion.title': 'Select an option that best describes you',
    'gradeQuestion.gradeAnswer1': 'I want a good grade',
    'gradeQuestion.gradeAnswer2': 'I want to pass the course',
    'gradeQuestion.gradeAnswer3': "I don't care about the grade",

    'questionForm.addQuestion': 'Add answer option',
    'questionForm.removeQuestion': 'Remove answer option',
    'questionForm.titlePlaceholder': 'Question',
    'questionForm.title': 'Title',
    'questionForm.numericalQuestion': 'Single choice',
    'questionForm.freeformQuestion': 'Freeform',
    'questionForm.multipleSelectOne': 'Multiple select',
    'questionForm.optionTitle': 'Choice {number}',
    'questionForm.questionTypeLabel': 'Question type',
    'questionForm.questionTitleValidationFailedMsg': 'Question title required',
    'questionForm.questionChoicesMissingValidationFailedMsg': 'At least one answer option required',
    'questionForm.questionChoiceTitleValidationFaildMsg': 'Choice label required',

    'course.deadline': 'Enrollment deadline:',
    'course.questionsPreface': 'Answer the questions below',
    'course.multipleChoicePlaceholder': 'Choose',
    'course.freeFormPlaceholder': 'Type your answer',
    'course.gradeQuestion': 'What are your goals for the project?',
    'course.delete': 'Delete course',
    'course.confirmDelete': 'Delete this course?',
    'course.userHasRegistered': 'Already registered!',
		'course.groupsComeHere': 'Groups are still under construction...',
		'course.disabledShowUserGroup': 'Groups are not ready yet...',
		'course.contactTeacher': 'If you want to cancel your registration, please contact course teacher.',
    'course.seeGroups': 'Generated groups',
    'course.hideTeachers': 'Hide teachers',
    'course.showTeachers': 'Show teachers',
		'course.switchGroupsView': 'Manage groups',
		'course.switchInfoView': 'Back to course info',
		'course.switchQuestionsView': 'Join groups here',
		'course.showUserGroup': 'Check your group here',
    'course.switchRegistrationsView': 'Show enrolled students',
    'course.switchEditView': 'Edit course',
		'course.noTeachers': 'This course has no teachers. You will be set as a teacher',
		'course.joinToGroups': 'Join group here',

		'courseInfo.teachers': 'Teachers: ',

    'studentInfo.header': 'Student Info',
    'studentInfo.fullname': 'Name: {fullname}',
    'studentInfo.studentNo': 'Student number: {studentNo}',
    'studentInfo.email': 'Email: {email}',
    'studentInfo.course': 'Enrolled courses - click the course to check your groups',
    'studentInfo.group': 'Groups assigned to',
    'studentInfo.noGroups': 'Not assigned to a group yet.',

    'forms.errorAnswerAll': 'Please answer all questions!',
    'forms.submitRegistration': 'Register On The Course',
    'forms.confirmRegistration': 'Confirm Registration',
    'forms.registrationSuccess': 'Great success! Your registration was received.',
    'forms.toc': 'Assembler may disclose my name and e-mail address to students in my group (required).',

    'timeForm.hours': 'Hour',
    'timeForm.monday': 'Mon',
    'timeForm.tuesday': 'Tue',
    'timeForm.wednesday': 'Wed',
    'timeForm.thursday': 'Thu',
    'timeForm.friday': 'Fri',
    'timeForm.saturday': 'Sat',
    'timeForm.sunday': 'Sun',

    'tag.own': 'Own Course',
    'tag.unpublished': 'Unpublished',
    'tag.dl': 'DL passed',

    'courseRegistration.title': 'Students enrolled to the course:',
    'courseRegistration.firstName': 'First name',
    'courseRegistration.lastName': 'Last name',
    'courseRegistration.studentNumber': 'Student number',
    'courseRegistration.email': 'Email',
    'courseRegistration.cancel': 'Cancel registration',
    'courseRegistration.remove': 'Remove from course',
    'courseRegistration.cancelConfirmation': 'Confirm registration cancelation?',
    'courseRegistration.removeConfirmation': 'Remove student from this course?',

    'groups.title': 'Group',
    'groups.empty': 'No groups generated',
    'groups.name': 'Name',
    'groups.studentNumber': 'Student number',
    'groups.email': 'Email',
    'groups.loadingError': 'Error loading groups',
    'groups.showTimes': 'Show matching times',
    'groups.toggleGroupTimes': 'Toggle group times',
    'groups.removeGroupButton': 'Remove group',
    'groups.createGroups': 'Create and save groups',
    'groups.createConfirm': 'Confirm group selection',
    'groups.addGroupButton': 'Add new group',
    'groups.published': 'Your group has been published:',
    'groups.notPublished': 'Groups are coming soon after enrollment deadline.',
    'groups.switchGroupButton': 'Move to another group',
    'groups.switchGroupLabel': 'Move student to another group',
    'groups.removeFromGroupLabel': 'Remove student from group',
    'groups.message': 'Message for the group:',
    'groups.messageInfo': 'Use this to send a message to members of this group...',
    'groups.students': 'Students in this group:',

    'groupsView.noRegistrations': 'No registrations',
    'groupsView.matchingTimes': 'Matching times',
    'groupsView.maxGroupSize': 'Maximum group size',
    'groupsView.targetGroupSize': 'Target group size',
    'groupsView.confirmGroupGeneration':
      'Are you sure you want to generate new groups?',
    'groupsView.confirmGroupsSave': 'Save and overwrite existing groups?',
    'groupsView.generateGroups': 'Generate new groups',
    'groupsView.saveGroups': 'Save groups',
    'groupsView.unsavedGroupsInfo': 'Remember to save groups!',
    'groupsView.unsavedGroupsPrompt' : 'Warning: you have unsaved edits to your groups. Are you sure you want to discard them?',
    'groupsView.groupsSavedSuccessMsg': 'New groups saved.',
    'groupsView.confirmCancelGroups': 'Are you sure?',
    'groupsView.cancelGroups': 'Cancel',
    'groupsView.publishGroupsBtn': 'Publish groups',
    'groupsView.publishGroupsConfirm': 'Are you sure you want to publish groups?',
    'groupsView.publishedGroupsInfo': 'Groups have been published, future changes are visible immediately to students.',
    'groupsView.defaultGroupNamePrefix': 'Group',
    'groupsView.groupListingOrder': 'Groups listing order',
    'groupsView.showGrouplessStudents': 'Toggle groupless students',

    'util.notAllowed': 'You do not have the required roles to access this content.',
  },
};
