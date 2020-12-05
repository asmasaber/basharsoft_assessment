import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Loading(props) {
  const classes = useStyles();
  const { text } = props;

  return (
    <Typography component='div' variant="h6" gutterBottom className={classes.root}>
      Loading {text}...
      <CircularProgress />
    </Typography>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
