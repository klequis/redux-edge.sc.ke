import * as ku from '../lib/ke-utils';

export const getNotes = (state) =>
  state.notes.ids.map((id) => state.notes.byId[id]);

export const getNote = (state, id) =>
  state.notes.byId[id] || null;

export const getOpenNoteId = (state) =>
  state.ui.openNoteId;

export const getToast = (state) =>
  state.ui.toast;

export const getRequest = (state, key) => {
  ku.logFunction('getRequest');
  return state.requests[key] || {};
};

export const getRequests = (state) =>
  state.requests;

export const areRequestsPending = (requests) => {
  ku.logFunction('areRequestsPending');
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending');
};
