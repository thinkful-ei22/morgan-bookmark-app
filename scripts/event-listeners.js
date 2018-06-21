/* global $, bookmarkList, api, store */

'use strict';

const eventListeners = (function(){

  const revealAddForm = function() {
    $('.js-alter-list').on('click', '.toggle-add-state', () => {
      $('.js-add-bookmark form').show();
    });
  };


  const expandBookmark = function() {
    $('li').click(event => {
      const targetId = bookmarkList.getIdFromElement(event.currentTarget);
      store.updateBookmark(targetId, {detailView: true});
      bookmarkList.render();
    });
  };


  const main = function() {
    expandBookmark();
    revealAddForm();
  };



  return {
    main
  };
}());

