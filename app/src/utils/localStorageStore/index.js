/**
 * Create a new LocalStorage Store
 * @param {LocalStorageStoreOptions} options  @default {storageKey: 'LOCAL_STORAGE_STORE'}
 * @returns {LocalStorageStore} the store with LocalStorage persistence
 */
export default function LocalStorageStore(options = {
  storageKey: 'LOCAL_STORAGE_STORE'
}) {
  var store = JSON.parse(localStorage.getItem(options.storageKey) || '{}');

  function _persistStore(store) {
    localStorage.setItem(options.storageKey, JSON.stringify(store));
  }

  function AddObectToStore(id, data) {
    store[id] = data;
  
    _persistStore(store);
  }

  function DeleteObjectFromStore(id) {
    delete store[id];
  
    _persistStore(store);
  }
  
  function GetStore() {
    return store;
  }
  
  function ClearStore() {
    localStorage.setItem(options.storageKey, JSON.stringify({}));
  }

  return {
    AddObectToStore,
    DeleteObjectFromStore,
    GetStore,
    ClearStore
  }
}

/**
 * @typedef {Object} LocalStorageStoreOptions
 * @property {string} storageKey              the Local Storage item key where store is persisted
 */

/**
 * @typedef {Object} LocalStorageStore
 * @property {any} AddObectToStore
 * @property {any} DeleteObjectFromStore
 * @property {any} GetStore
 * @property {any} ClearStore
 */