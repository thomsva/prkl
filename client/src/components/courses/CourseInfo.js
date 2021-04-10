import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Card, CardContent, Typography, Link, Divider, Popover, List, ListItem, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default ({code, title, id, deadline, teachers, paragraphs }) => {
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const divider = <span style={{ color: '#f2f2f2' }}>{' | '}</span>

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          
          <Typography variant="h4">
            {`${title} - `} 
            <Link href={`https://courses.helsinki.fi/fi/${code}`}>{code}</Link>
          </Typography>

          <Typography variant="h6" gutterBottom>
            {`${intl.formatMessage({ id: 'courses.deadline' })} ${intl.formatDate(deadline)}`}
            {divider}
            <Link onClick={handleClick} style={{ color: 'inherit', textDecoration: 'inherit' /*does not work with mui makestyle!*/ }}>
              {'Teachers'}<ExpandMoreIcon fontSize="small"/>
            </Link>

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <List>
                  {teachers.map(t => (
                    <ListItem divider key={t.id}>
                        {t.firstname} {t.lastname}&nbsp; {divider} &nbsp;<Link href={`mailto:${t.email}`}>{t.email}</Link>
                    </ListItem>
                  ))}
                </List>
              </Popover>

          </Typography>

          <Divider light />
          <br/>

          <Typography variant="body1">
            {paragraphs.map(p => (
              <p key={p}>{p}</p>
            ))}
          </Typography>

        </CardContent>
      </Card>
    </div>
  );
};
