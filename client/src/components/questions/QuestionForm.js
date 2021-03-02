import React, { useEffect, useState } from 'react';
import { Form, Input, Message, Radio, Segment } from 'semantic-ui-react';
import { FormattedMessage, useIntl } from 'react-intl';

const QuestionForm = ({ qName, questionIndex, setQuestions, questions, hideAddRemoveButtons, hookForm }) => {
  const intl = useIntl();

  const defaultQuestion = {
    questionType: 'singleChoice',
    content: '',
    order: questionIndex,
    optional: false,
    useInGroupCreation: true,
    qKey: qName,
  };

  const [questionOptionality, setQuestionOptionality] = useState(false);
  const [useInGroupCreation, setUseInGroupCreation] = useState(true)
  const [questionType, setQuestionType] = useState('singleChoice');
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState(defaultQuestion);
  const [init, setInit] = useState(true);

  const { setValue, trigger, errors, setError, clearErrors, register, unregister } = hookForm;

  const missingChoicesErr = 'choice-' + qName;

  useEffect(() => {
    register({ name: qName }, { required: intl.formatMessage({ id: 'questionForm.questionTitleValidationFailedMsg' }) });
    if (questionType !== 'freeForm' && !options.length) {
      setError(missingChoicesErr, {message: intl.formatMessage({ id: 'questionForm.questionChoicesMissingValidationFailedMsg' }) });
    } else {
      clearErrors(missingChoicesErr);
    }
  }, [options, question]);

  useEffect(() => {
    const qstn = questions[questionIndex]
      ? {
          id: questions[questionIndex].id,
          questionType: questions[questionIndex].questionType
            ? questions[questionIndex].questionType
            : defaultQuestion.questionType,
          content: questions[questionIndex].content,
          questionChoices: questions[questionIndex].questionChoices,
          optional: questions[questionIndex].optional,
          useInGroupCreation: questions[questionIndex].useInGroupCreation,
          order: questionIndex,
          qKey: qName,
        }
      : defaultQuestion;
    setQuestionOptionality(qstn.optional);
    setUseInGroupCreation(qstn.useInGroupCreation);
    setQuestionType(qstn.questionType);
    setQuestion(qstn);
    setValue(qName, qstn.content);
    if (init) {
      setQuestions(questions.map(q => q.qKey !== question.qKey ? q : question));
      setInit(false);
    }
    const opts = questions[questionIndex]?.questionChoices
      ? questions[questionIndex].questionChoices.map(qc => {
          const oName = qc.id
            ? qc.id : qc.oName
            ? qc.oName : 'question-' + qName + '-o-' + new Date().getTime().toString();
          if (!qc.oName) register({name: oName}, {required: intl.formatMessage({ id: 'questionForm.questionChoiceTitleValidationFaildMsg' }) });
          return {
            id: qc.id,
            content: qc.content,
            order: qc.order,
            oName: oName,
          };
        })
      : options;
    setOptions(opts);
    opts.forEach(o => { setValue(o.oName, o.content) });
  }, [questions]);

  useEffect(() => {
    if (questionOptionality || questionType === 'freeForm') {
      handleUseInGroupCreationChange(false);
    }
  }, [questionOptionality, questionType]);

  const updateQuestions = questionObject => {
    const newQuestions = [...questions];
    newQuestions[questionIndex] = questionObject;
    setQuestion(questionObject);
    setQuestions(newQuestions);
  };

  const handleOptionalityChange = () => {
    const questionObject = {
      ...question,
      optional: !questionOptionality,
    };

    setQuestionOptionality(!questionOptionality);
    updateQuestions(questionObject);
  };

  const handleUseInGroupCreationChange = value => {
    const questionObject = {
      ...question,
      useInGroupCreation: value,
    };

    setUseInGroupCreation(value);
    updateQuestions(questionObject);
  };

  const handleOptionChange = (e, index, value) => {
    const newOptions = options;
    newOptions[index] = { ...newOptions[index], content: value };
    setOptions(newOptions);

    const questionObject = {
      ...question,
      questionChoices: newOptions,
    };
    updateQuestions(questionObject)
  };

  const handleTypeChange = value => {
    const questionObject = { ...question, questionType: value };
    // Remove options on type change to freeForm
    if (questionType === 'freeForm') {
      delete questionObject.questionChoices;
      options.forEach(o => unregister(o.oName));
      setOptions([]);
    }
    setQuestionType(value);
    updateQuestions(questionObject)
  };

  const handleTitleChange = (e, value) => {
    const questionObject = { ...question, content: value };
    updateQuestions(questionObject)
  };

  const handleAddForm = () => {
    const oName = 'question-' + qName + '-o-' + new Date().getTime().toString();
    register({name: oName}, {required: intl.formatMessage({ id: 'questionForm.questionChoiceTitleValidationFaildMsg' }) });
    setOptions([...options, { oName: oName, order: options.length + 1, content: '' }]);
  };

  const handleRemoveForm = () => {
    if (options.length === 0) return;
    if (options) unregister(options[options.length-1].oName);
    const newOptions = options.slice(0, options.length - 1);
    const newQuestion = { ...question, questionChoices: newOptions };
    const newQuestions = [...questions];
    newQuestions[questionIndex] = newQuestion;
    setOptions(newOptions);
    setQuestion(newQuestion);
    setQuestions(newQuestions);
  };

  const removeQuestion = e => {
    e.preventDefault();
    unregister(qName);
    options.forEach(o => unregister(o.oName));
    clearErrors(missingChoicesErr);
    setOptions([]);
    const newQuestions = questions
      .filter((q, i) => {
        return i !== questionIndex;
      })
      .map((q, i) => {
        return i < questionIndex ? q : { ...q, order: q.order-1 }
      });
    setQuestions(newQuestions);
  };

  return (
    <Segment style={{ padding: 15, margin: 10 }}>
      {!hideAddRemoveButtons &&
        <Form.Button
          onClick={removeQuestion}
          floated="right"
          data-cy="question-remove-button"
        >
          X
        </Form.Button>
      }
      <Form.Field
        name={qName}
        onChange={async (e, { name, value }) => {
          handleTitleChange(e, value);
          setValue(name, value);
          await trigger(name);
        }}
        error={errors[qName]?.message}
        control={Input}
        value={question.content}
        label={intl.formatMessage({
          id: 'questionForm.title',
        })}
        placeholder={intl.formatMessage({
          id: 'questionForm.titlePlaceholder',
        })}
        data-cy="question-title"
      />
      {!hideAddRemoveButtons &&
        <Form.Group inline>
          <label>
            <FormattedMessage id="questionForm.questionTypeLabel" />
          </label>
          <Form.Field
            control={Radio}
            label={intl.formatMessage({
              id: 'questionForm.numericalQuestion',
            })}
            value="singleChoice"
            checked={question.questionType === 'singleChoice'}
            onChange={() => handleTypeChange('singleChoice')}
            data-cy="question-type-single"
          />
          <Form.Field
            control={Radio}
            label={intl.formatMessage({
              id: 'questionForm.multipleSelectOne',
            })}
            value="multipleChoice"
            checked={question.questionType === 'multipleChoice'}
            onChange={() => handleTypeChange('multipleChoice')}
            data-cy="question-type-multi"
          />
          <Form.Field
            control={Radio}
            label={intl.formatMessage({
              id: 'questionForm.freeformQuestion',
            })}
            value="freeForm"
            checked={question.questionType === 'freeForm'}
            onChange={() => handleTypeChange('freeForm')}
            data-cy="question-type-freeform"
          />
        </Form.Group>
      }

      {question.questionType !== 'freeForm' ? (
        <>
          {!hideAddRemoveButtons &&
            <Form.Group>
              <Form.Button type="button" onClick={handleAddForm} color="green" data-cy="add-question-choice-button">
                <FormattedMessage id="questionForm.addQuestion" />
              </Form.Button>

              <Form.Button type="button" onClick={handleRemoveForm} color="red" data-cy="remove-question-choice-button">
                <FormattedMessage id="questionForm.removeQuestion" />
              </Form.Button>
            </Form.Group>
          }

          {errors[missingChoicesErr] &&
            <Message negative header={errors[missingChoicesErr]?.message} />
          }
          <Form.Group style={{ flexWrap: 'wrap' }}>
            {options.map((q, index) => (
              <Form.Field
                name={q.oName}
                onChange={async (e, { name, value }) => {
                  handleOptionChange(e, index, value);
                  setValue(name, value);
                  await trigger(name);
                }}
                error={errors[q.oName]?.message}
                control={Input}
                type="text"
                value={q.content}
                label={intl.formatMessage(
                  {
                    id: 'questionForm.optionTitle',
                  },
                  {
                    number: index + 1,
                  }
                )}
                key={`question${questionIndex}optionsForm${index}`}
                placeholder={intl.formatMessage(
                  {
                    id: 'questionForm.optionTitle',
                  },
                  {
                    number: index + 1,
                  }
                )}
                data-cy={`question-${questionIndex}-choice-${index}`}
              />
            ))}
          </Form.Group>
        </>
      ) : null}

      <Form.Checkbox
        name="questionOptionality"
        label={intl.formatMessage({ id: 'questionForm.optional' })}
        checked={questionOptionality === true}
        onClick={() => handleOptionalityChange()}
        data-cy="question-optionality-checkbox"
      />

      <Form.Checkbox
        name="useInGroupCreation"
        label={intl.formatMessage({ id: 'questionForm.useInGroupCreation' })}
        checked={useInGroupCreation}
        onClick={() => handleUseInGroupCreationChange(!useInGroupCreation)}
        disabled={questionOptionality || questionType === 'freeForm'}
      />
    </Segment>
  );
};

export default QuestionForm;
