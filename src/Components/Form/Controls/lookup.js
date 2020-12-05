import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'seamless-immutable';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import map from 'lodash/map';
import get from 'lodash/get';
import flatMap from 'lodash/flatMap';

import If from 'Components/Utils/If';
import Loading from 'Components/Loading';

import { Creators as actions } from 'Store/Actions/Lookups';

function formatData(lookupData) {
  const data = Immutable.asMutable(lookupData, { deep: true });
  return flatMap(data, item => ({ id: item.id, name: item.attributes.name }));
}

function load({ lookups, id, lookup, payload, loadLookup }) {
  const loaded = get(lookups, `${id}.loaded`, false);
  const loading = get(lookups, `${id}.loading`, false);

  if (!loaded && !loading) {
    loadLookup(id, lookup, payload);
  }
}

function LookupControl(props) {
  const {
    id,
    value,
    label,
    lookup,
    payload,
  } = props;
  const loading = get(props, `lookups.${id}.loading`, false);
  const data = formatData(get(props, `lookups.${id}.data`, []));

  useEffect(() => {
    load(props);
  }, [id, lookup, payload]);

  return (
    <FormControl variant="outlined" style={{ 'paddingBottom': 20 }} fullWidth>
      <Typography variant="h6">
        {label}
      </Typography>
      <If condition={loading}>
        <Loading />
      </If>
      <If condition={!loading}>
        <Select
          value={value}
          onChange={event => props.onChange(event.target.value)}
        >
          {map(data, (item, i) => (
            <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </If>
    </FormControl>
  );
}

LookupControl.propTypes = {
  id: PropTypes.string,
  lookup: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  payload: PropTypes.object,
  lookups: PropTypes.object,
  loadLookup: PropTypes.func,
};

LookupControl.defaultProps = {
  value: '',
};

const mapStateToProps = store => ({
  lookups: store.lookups,
});

const mapDispatchToProps = dispatch => ({
  loadLookup: (id, lookup, payload) => dispatch(actions.get(id, lookup, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LookupControl);
