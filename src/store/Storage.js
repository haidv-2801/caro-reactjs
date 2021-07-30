/**
 * Example: setStorage('key', { a1: '111', a2: 222 })-> key:{ a1: '111', a2: 222 }
 */
 export const set = (key, val) => localStorage.setItem(key, JSON.stringify(val))

 /**
  * Example: getStorage('key')-> { a1: '111', a2: 222 }
  */
 export const get = (key) => {
   let storageVal = localStorage.getItem(key)
   storageVal = storageVal === 'undefined' ? '' : JSON.parse(storageVal)
   return storageVal
 }
 
 /**
  * Example: hasStorage('key')-> true
  * Example: hasStorage('key',{ a1: '111', a2: 222 })-> key:{ a1: '111', a2: 222 }
  */
 export const has = (key, defaultVal) => {
   if (!defaultVal) {
     return !Object.is(get(key), null)
   }
   set(key, defaultVal)
   return get(key) ? set(key) : defaultVal
 }
 
 /**
  * Example: removeStorage('key')
  */
 export const remove = (key) => localStorage.removeItem(key)
 
 /**
  * Example: clearStorage()
  */
 export const clear = () => localStorage.clear()