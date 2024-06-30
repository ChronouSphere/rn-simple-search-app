import {createSelector} from '@reduxjs/toolkit';

const stateSelector = state => state.listReducer;

export const listItemSelector = createSelector(
  stateSelector,
  (appState): Module.OrganizationItem[] => {
    return appState.listItems ?? [];
  },
);

export const searchOrganizationItemSelector = createSelector(
  stateSelector,
  (appState): Module.OrganizationItem[] => {
    return appState.searchOrganizationItem ?? [];
  },
);
