/* global $, bookmarkList, api, store, eventListeners */

'use strict';

const eventListeners = (function(){

  const revealAddForm = function() {
    $('.js-alter-list').on('click', '.toggle-add-state', () => {
      $('.js-add-bookmark-form form').show();
      $('.toggle-add-state').hide();
    });
  };


  const hideAddForm = function() {
    $('.js-add-bookmark-form').on('click', 'button[type=reset]', () => {
      console.log('cancel button clicked');
      $('.js-add-bookmark-form form').hide();
      $('.toggle-add-state').show();
    });
  };


  const toggleExpandView = function() {
    $('ul').on('click', '.toggle-expand-view', event => {
      const expandedBool = bookmarkList.getDetailBoolFromElement(event.currentTarget);
      if(expandedBool === false){
        const currentId = bookmarkList.getIdFromElement(event.currentTarget);
        store.updateBookmark(`${currentId}`, {detailView: true});
        bookmarkList.render();
      } else {
        const currentId = bookmarkList.getIdFromElement(event.currentTarget);
        store.updateBookmark(`${currentId}`, {detailView: false});
        bookmarkList.render();
      }
    });
  };


  const main = function() {
    toggleExpandView();
    revealAddForm();
    hideAddForm();
  };



  return {
    main
  };
}());

