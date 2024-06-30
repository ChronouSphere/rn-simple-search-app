import {createAction} from '@reduxjs/toolkit';

export const organizationListAction = {
  startRequestFetchApi: createAction<Module.Action.RequestFetchApiPayload>(
    'ORGANIZATION_ACTION/START_REQUEST_FETCH',
  ),
  successRequestFetchApi: createAction<Module.Action.RequestFetchSuccess>(
    'ORGANIZATION_ACTION/REQUEST_FETCH_SUCCESS',
  ),
  failedRequestFetchApi: createAction(
    'ORGANIZATION_ACTION/REQUEST_FETCH_FAILURE',
  ),
  searchStartRequestFetchApi:
    createAction<Module.Action.RequestSearchApiPayload>(
      'ORGANIZATION_ACTION/SEARCH_START_REQUEST_FETCH',
    ),
  searchSuccessRequestFetchApi: createAction<Module.Action.RequestFetchSuccess>(
    'ORGANIZATION_ACTION/SEARCH_REQUEST_FETCH_SUCCESS',
  ),
  searchFailedRequestFetchApi: createAction(
    'ORGANIZATION_ACTION/SEARCH_REQUEST_FETCH_FAILURE',
  ),
  searchItemReset: createAction(
    'ORGANIZATION_ACTION/SEARCH_REQUEST_FETCH_FAILURE',
  ),
};
