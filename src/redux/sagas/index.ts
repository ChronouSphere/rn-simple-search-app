import {all, call, put, take} from 'redux-saga/effects';
import {organizationListAction} from '../actions/organizationListAction';
import {getOrganizationList, getSearchOrganizationList} from '../../api/list';

function* fetchApiRuntime() {
  while (true) {
    const action: any = yield take(organizationListAction.startRequestFetchApi);
    const {pageNumber} = action.payload;

    const response: Module.FetchItemApiResponse = yield call(
      getOrganizationList,
      pageNumber,
    );

    // succesfull call will return list otherwise its 'undefined'
    if (!!response) {
      const organizationList = response;
      yield put(
        organizationListAction.successRequestFetchApi({
          listItems: organizationList as unknown as Module.OrganizationItem[],
        }),
      );
    } else {
      // lifecycle, can perform better handling here
      yield put(organizationListAction.failedRequestFetchApi());
    }
  }
}

function* searchFetchApiRuntime() {
  while (true) {
    const action: any = yield take(
      organizationListAction.searchStartRequestFetchApi,
    );
    const {query} = action.payload;

    const response: Module.FetchItemApiResponse = yield call(
      getSearchOrganizationList,
      query,
    );

    // succesfull call will return list otherwise its 'undefined'
    if (!!response) {
      const organizationList = response;
      yield put(
        organizationListAction.searchSuccessRequestFetchApi({
          listItems: organizationList as unknown as Module.OrganizationItem[],
        }),
      );
    } else {
      // lifecycle, can perform better handling here
      yield put(organizationListAction.searchFailedRequestFetchApi());
    }
  }
}

export default function* allRuntimes() {
  yield all([call(fetchApiRuntime), call(searchFetchApiRuntime)]);
}
