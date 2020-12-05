import { put, call, select } from 'redux-saga/effects';
import { Creators as LookupsActions } from 'Store/Actions/Lookups';
import api from 'Services/Api';

const getLookup = lookup => state => state.lookups[lookup];

export default {
  * get({ id, lookup, payload }) {
    const lookupState = yield select(getLookup(id));

    // don't load lookups twice
    if (lookupState && (lookupState.loaded || lookupState.loading)) {
      // Skipping loading lookup twice.
      return null;
    }

    yield put(LookupsActions.setLoading(id));

    const res = yield call(api.lookups[lookup], payload);

    if (res.ok) {
      yield put(LookupsActions.getSuccess(id, res.data.data));
    } else {
      yield put(LookupsActions.getError(id, res.error));
    }

    return null;
  }
};
