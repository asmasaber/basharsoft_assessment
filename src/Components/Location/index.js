import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import If from 'Components/Utils/If';
import LookupControl from 'Components/Form/Controls/lookup';

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 20px',
    width:250,
  },
}));

function Location(props) {
  const classes = useStyles();
  const { value, onChange } = props;
  
  const [country, setCountry] = useState(value.country);
  const [city, setCity] = useState(value.city);
  const [area, setArea] = useState(value.area);

  const [anchorEl, setAnchorEl] = React.useState(null);


  const isEgyptCountry = Number(country) === 56;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {

    setAnchorEl(null);
    onChange({
      country,
      city,
      area
    })
  };

  const open = Boolean(anchorEl);
  const id = open ? 'location-popover' : undefined;

  return (<>
    <Button
      id="location"
      variant="contained"
      aria-describedby={id}
      onClick={handleClick}
    >
      Select Location
    </Button>

    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <LookupControl
              label='Country'
              value={country}
              id='country'
              lookup='country'
              onChange={v => setCountry(v)}
              style={{ width: '100%' }}
            />
          </Grid>
          <If condition={country}>
            <Grid item xs={12}>
              <LookupControl
                label='City'
                value={city}
                id={`country_${country}_city`}
                lookup='city'
                payload={{ countryId: country }}
                onChange={v => setCity(v)}
              />
            </Grid>
          </If>
          <If condition={isEgyptCountry && city}>
            <Grid item xs={12}>
              <LookupControl
                label='Area'
                value={area}
                id={`country_${country}_city_${city}_area`}
                lookup='area'
                payload={{ countryId: country, cityId: city }}
                onChange={v => setArea(v)}
              />
            </Grid>
          </If>
        </Grid>
      </div>
    </Popover>
  </>);
}

Location.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

Location.defaultProps = {
  value: {},
};

export default Location;
