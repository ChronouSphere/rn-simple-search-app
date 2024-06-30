import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {APP_INITIAL_STATE} from './initialState';
import {organizationListAction} from '../../actions/organizationListAction';

const listItems = createReducer(APP_INITIAL_STATE, builder => {
  builder
    .addCase(organizationListAction.successRequestFetchApi, (state, action) => {
      return {
        ...state,
        listItems: [...state.listItems, ...action.payload.listItems], // append
      };
    })
    .addCase(
      organizationListAction.searchSuccessRequestFetchApi,
      (state, action) => {
        return {
          ...state,
          searchOrganizationItem: action.payload.listItems, // replace
        };
      },
    )
    .addMatcher(
      isAnyOf(
        organizationListAction.startRequestFetchApi,
        organizationListAction.failedRequestFetchApi,
        organizationListAction.searchStartRequestFetchApi,
        organizationListAction.searchFailedRequestFetchApi,
      ),
      (state, _) => {
        return state;
      },
    );
});

export default listItems;
