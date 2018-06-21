/* global $, bookmarkList, api, store */
'use strict';


const store = (function() {

  let bookmarks = [];


  const addBookmark = function(obj) {
    this.bookmarks.push(obj);
  };


  const deleteBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter( index => index.id !== id );
  };



  const updateBookmark = function(id, newData) {
    let tempObj = this.bookmarks.find( index => index.id === id );
    this.deleteBookmark(id);
    const keysToUpdate = Object.keys(newData);
    for(let i = 0; i<keysToUpdate.length; i++){
      tempObj[keysToUpdate[i]] = newData[keysToUpdate[i]];
    }
    this.addBookmark(tempObj);
  };



  return {
    minRating: 0,
    bookmarks, 
    addBookmark,
    updateBookmark,
    deleteBookmark
  };
}());