import api from '../api';
import { v4 } from 'uuid';
import * as ku from '../lib/ke-utils';

export const noop = (explanation) => ({
  type: 'app/noop',
  payload: explanation,
});

export const insertNote = (note) => ({
  type: 'app/insertNote',
  payload: note,
});

export const replaceNotes = (notes) => ({
  type: 'app/replaceNotes',
  payload: notes,
});

export const removeNote = (id) => ({
  type: 'app/removeNote',
  payload: { id },
});

export const closeNote = () => ({
  type: 'app/closeNote',
});

export const openNote = (id) => ({
  type: 'app/openNote',
  payload: { id },
});

export const setToast = (message, level = 'info', id = v4() ) => ({
  type: 'app/setToast',
  payload: {
    id,
    message,
    level,
  },
});

export const clearToast = () => ({
  type: 'app/clearToast',
});

export const markRequestPending = (key) => ({
  type: 'app/markRequestPending',
  meta: { key },
});

export const markRequestSuccess = (key) => ({
  type: 'app/markRequestSuccess',
  meta: { key },
});

export const markRequestFailed = (reason, key) => ({
  type: 'app/markRequestFailed',
  payload: reason,
  meta: { key },
});

export const createRequestThunk = ({ request, key, start = [], success = [], failure = [] }) => {
  ku.logFunction('createRequestThunk');
  const o = {
    request,
    key,
    start,
    success,
    failure,
  };
  ku.log('createRequestThunk.params', o);
  // start
  let len = start.length;
  ku.log('start.length', start.length);
  len > 0 ? ku.log('start[0]', start[0]) : '';
  len > 1 ? ku.log('start[1]', start[1]) : '';
  len > 2 ? ku.log('start[2]', start[2]) : '';
  len > 3 ? ku.log('start[3]', start[3]) : '';
  // Success
  len = success.length;
  ku.log('success.length', success.length);
  len > 0 ? ku.log('success[0]', success[0]) : '';
  len > 1 ? ku.log('success[1]', success[1]) : '';
  len > 2 ? ku.log('success[2]', success[2]) : '';
  len > 3 ? ku.log('success[3]', success[3]) : '';
  // failure
  len = failure.length;
  ku.log('failure.length', failure.length);
  len > 0 ? ku.log('failure[0]', failure[0]) : '';
  len > 1 ? ku.log('failure[1]', failure[1]) : '';
  len > 2 ? ku.log('failure[2]', failure[2]) : '';
  len > 3 ? ku.log('failure[3]', failure[3]) : '';

  const tmp = (...args) => (dispatch) => {
    ku.logFunction('tmp');
    ku.log('...args', args);
    ku.log('dispatch', dispatch);
    const requestKey = (typeof key === 'function') ? key(...args) : key;
    ku.log('requestKey', requestKey);
    start.forEach((actionCreator) => dispatch(actionCreator()));
    dispatch(markRequestPending(requestKey));
    return request(...args)
      .then((data) => {
        success.forEach((actionCreator) => dispatch(actionCreator(data)));
        dispatch(markRequestSuccess(requestKey));
      })
      .catch((reason) => {
        failure.forEach((actionCreator) => dispatch(actionCreator(reason)));
        dispatch(markRequestFailed(reason, requestKey));
      });
  };  // end return
  ku.log('return', tmp);
  return tmp;
};

export const updateNote = (content, id, timestamp = Date.now()) => ({
  type: 'app/updateNote',
  payload: {
    id,
    content,
    timestamp,
  },
});

export const requestUpdateNote = createRequestThunk({
  request: api.notes.update,
  key: (id) => `updateNote/${id}`,
  success: [ updateNote, () => setToast('Note saved') ],
  failure: [ () => setToast('Couldn\'t save note', 'warn') ],
});

// no assoc action
export const requestDeleteNote = createRequestThunk({
  request: api.notes.delete,
  key: (id) => `deleteNote/${id}`,
  success: [ (note) => removeNote(note.id), () => setToast('Note deleted') ],
  failure: [ () => setToast('Couldn\'t remove note', 'warn') ],
});

// no assoc action
export const requestReadNotes = createRequestThunk({
  request: api.notes.readList,
  key: 'readNotes',
  success: [ replaceNotes, (notes) => (notes.ids.length > 0) ? openNote(notes.ids[0]) : noop('No note to open') ],
});

// no assoc action
export const requestCreateNote = createRequestThunk({
  request: api.notes.create,
  key: 'createNote',
  success: [ insertNote, (note) => openNote(note.id), () => setToast('Note created') ],
  failure: [ () => setToast('Couldn\'t add note', 'warn') ],
});
