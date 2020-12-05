import { all, takeEvery } from "redux-saga/effects";
import { Types as LookupsTypes } from "Store/Actions/Lookups";
import lookupsSagas from './Lookups';

export default function* rootSaga() {
  yield all([takeEvery(LookupsTypes.GET, lookupsSagas.get)]);
}