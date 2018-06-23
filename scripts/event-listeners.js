/* global $, bookmarkList, api, store, eventListeners */

'use strict';

const eventListeners = (function(){

  const handleRevealAddForm = function() {
    $('.js-alter-list').on('click', '.toggle-add-state', () => {
      store.showAddForm = true;
      bookmarkList.render();
    });
  };


  const handleHideAddForm = function() {
    $('.js-add-bookmark-form').on('click', 'button[type=reset]', () => {
      store.showAddForm = false;
      bookmarkList.render();
    });
  };


  const handleToggleExpandView = function() {
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


  const handleBadTitle = function() {
    $('.js-add-bookmark-form').on('blur', '.js-add-title', () => {
      if ($('.js-add-title').val() === '') {
        const errMessage = 'HEADS-UP: Title must be at least 1 character long.';
        bookmarkList.displayErrorToaster(errMessage);
      }
    });
  };


  const handleBadUrl = function() {
    $('.js-add-bookmark-form').on('blur', '.js-add-url', () => {
      if ($('.js-add-url').val() === '') {
        const errMessage = 'HEADS-UP: Bookmark must contain a valid URL.';
        bookmarkList.displayErrorToaster(errMessage);
      } else if ($('.js-add-url').val().startsWith('http') === false) {
        const errMessage = 'HEADS-UP: URL must begin with http:// or https://';
        bookmarkList.displayErrorToaster(errMessage);
      }
    });
  };


  //imbed newTitle into newObject, etc. to refactor
  const handleNewBookmarkSumbit = function(){
    $('.js-add-bookmark-form').submit(event => {
      event.preventDefault();
      const newTitle = $('.js-add-title').val();
      const newUrl = $('.js-add-url').val();
      let newDesc = $('.js-add-desc').val();
      if(newDesc === '') {
        newDesc = 'n/a';
      }
      const newRating = parseInt($('.js-add-rating').val());
      const newObject = {
        title: newTitle,
        url: newUrl,
        desc: newDesc,
        rating: newRating
      };
      api.addBookmark(newObject, response => {
        console.log('success! New object in the server');
        response.detailView = false;
        response.editTitle = false;
        response.editRating = false;
        response.editDesc = false;
        response.editUrl = false;
        store.addBookmark(response);
        store.showAddForm = false;
        bookmarkList.resetForm();
        bookmarkList.render();
      }, error => {
        bookmarkList.displayErrorToaster(error.responseJSON.message);
      });
    });
  };


  const handleBookmarkDelete = function(){
    $('ul').on('click', '.js-delete-bookmark', event => {
      const id = bookmarkList.getIdFromElement(event.currentTarget);
      api.deleteBookmark(id, () => {
        console.log('deleted from server');
        store.deleteBookmark(id);
        bookmarkList.render();
      });
    });
  };


  const handleFilterByRating = function(){
    $('.js-filter-rating').change( () => {
      const pulledValue = $('#js-filter-rating').val();
      store.minRating = parseInt(pulledValue);
      bookmarkList.render();
    });
  };

  const handleEditBookmarkTitle = function() {
    $('ul').on('click', '.edit-button.title', event => {
      event.preventDefault();
      const targetId = bookmarkList.getIdFromElement(event.currentTarget);
      let targetBookmark = store.bookmarks.find(obj => obj.id === targetId);
      Object.assign(targetBookmark, {editTitle: !targetBookmark.editTitle});
      bookmarkList.render();
    });
    $('ul').on('click', '.submit-new.title', event => {
      const newTitle = $('.input-new.title').val();
      if (newTitle === '') {
        bookmarkList.displayErrorToaster('Title must be at least 1 character in length.');
      } else {
        event.preventDefault();
        $('.input-new.title').val('');
        const targetId = bookmarkList.getIdFromElement(event.currentTarget);
        store.updateBookmark(targetId, {title: newTitle, editTitle: false});
        api.updateBookmark(targetId, {title: newTitle});
        bookmarkList.render();
      }
    });
  };


  const main = function() {
    handleToggleExpandView();
    handleRevealAddForm();
    handleHideAddForm();
    handleNewBookmarkSumbit();
    handleBookmarkDelete();
    handleFilterByRating();
    handleBadTitle();
    handleBadUrl();
    handleEditBookmarkTitle();
  };



  return {
    main
  };
}());

