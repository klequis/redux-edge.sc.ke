import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';
const notes = new Schema('notes');
import * as ku from '../lib/ke-utils'

export const rejectErrors = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }
  return Promise.reject({ message: res.statusText });
};

export const fetchJson = (url, options = {}) => (

  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(rejectErrors)
  .then((res) => res.json())
);

export default {
  notes: {

    readList() {
      // ku.logFunction('readList');
      return fetchJson('/api/notes')
        .then((data) => {
          // ku.log('data', data, 'red');
          const normalized = normalize(data, arrayOf(notes));
          // ku.log('normalized', normalized, 'red');
          const o = {
            notes: normalized.entities.notes || {},
            ids: normalized.result,
          };
          // ku.log('o', o, 'red');
          return o;
        });
    },

    create() {
      // ku.logFunction('create');
      return fetchJson(
        '/api/notes',
        {
          method: 'POST',
        }
      );
    },

    update(id, content) {
      ku.logFunction('api.update');
      ku.log('id', id);
      // ku.log('content', content);
      return fetchJson(
        `/api/notes/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ content }),
        }
      );
    },

    delete(id) {
      // ku.logFunction('delete');
      return fetchJson(
        `/api/notes/${id}`,
        {
          method: 'DELETE',
        }
      );
    },
  },
};
