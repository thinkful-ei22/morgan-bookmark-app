/* global $, bookmarkList, api, store, eventListeners */

'use strict';



api.getBookmarks ( response => {
  response.forEach(obj => store.addBookmark(obj));
  store.bookmarks.forEach( object => {
    object.detailView = false;
    object.editTitle = false;
    object.editUrl = false;
    object.editRating = false;
    object.editDesc = false;
  });
  bookmarkList.render();
});

$(eventListeners.main);


