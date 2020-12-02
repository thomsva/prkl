import React, { useState, useEffect } from 'react';
import { Header, Card, Item } from 'semantic-ui-react';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';

export default ({id, deadline, teachers, paragraphs}) => {
  const intl = useIntl();

  return (
		<div>
		<Card
			fluid
			color="blue"
		>
			<Card.Content header={`${intl.formatMessage({
        id: 'courses.deadline',
      })} ${intl.formatDate(deadline)}`} color="red" />
			<Card.Content> 
				<Card.Meta>
					<FormattedMessage id="courseInfo.teachers" />
					<div>
						{teachers ? (
							teachers.map(t =>
								<p key={t.id}>{t.firstname} {t.lastname} - ({t.email})</p>)
						) : null}
					</div>
				</Card.Meta>
			</Card.Content>
			<Card.Content description={paragraphs.map(p => (
						<p key={p}>{p}</p>
					))}
			/>
		</Card>
		</div>
  );
}