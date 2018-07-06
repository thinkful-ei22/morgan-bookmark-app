/* global $, bookmarkList, api, store, eventListeners */
'use strict';

const bookmarkList = (function(){


  //takes in single object
  //checks if detailView is true or false
  //returns either detailed HTML string or condensed HTML string
  const generateBookmarkHtml = function(obj){
    if(obj.rating >= store.minRating){
      if (obj.detailView) {
        return `
          <li class='js-bookmark-item' data-bookmark-id='${obj.id}' data-detail-view='${obj.detailView}'>
            <div class='condense-view'>
              <h2 class='toggle-expand-view'>${obj.title}</h2>
              <input type='image' class='edit-button title' alt='Edit Button for Bookmark Title' src='edit-button.png'>
              <form class='edit-box title' name='edit-title'>

              </form>
              <div class='display-rating'>
                <p>Rating: ${obj.rating} / 5</p>
                <input type='image' class='edit-button rating' alt='Edit Button for Bookmark Rating' src='edit-button.png'>
                <form class='edit-box rating' name='edit-rating'>

                </form>
              </div>
            </div>
            <div class='detail-view'>
              <p class='display-link'>Go to <a href='${obj.url}' target='_blank'>${obj.title}</a></p>
              <input id='edit-url-button' type='image' class='edit-button url' alt='Edit Button for Bookmark URL' src='edit-button.png'>
              <label for='edit-url-button'>(edit URL)</label>
              <form class='edit-box url' name='edit-url'>

              </form>
              <div class='desc-container'>
                <p class='description-heading'>Description:</p>
                <input type='image' class='edit-button desc' alt='Edit Button for Bookmark Description' src='edit-button.png'>
                <p class='display-description'>${obj.desc}</p>
              </div>
              <form class='edit-box desc' name='edit-desc'>

              </form>
              <button type='button' class='js-delete-bookmark' name='delete-bookmark'>DELETE this bookmark</button>
              <button type='button' class='condense-button toggle-expand-view'>Condense</button>
            </div>
          </li>`;
      }
      else {
        return `
          <li class='js-bookmark-item' data-bookmark-id='${obj.id}' data-detail-view='${obj.detailView}'>
            <div class='condense-view'>
              <h2 class='toggle-expand-view'>${obj.title}</h2>
              <input type='image' class='edit-button title' alt='Edit Button for Bookmark Title' src='edit-button.png'>
              <form class='edit-box title' name='edit-title'>

              </form>
              <div class='display-rating'>
                <p>Rating: ${obj.rating} / 5</p>
                <input type='image' class='edit-button rating' alt='Edit Button for Bookmark Rating' src='edit-button.png'>
                <form class='edit-box rating' name='edit-rating'>

                </form>
              </div>
              <button type='button' class='expand-button toggle-expand-view'>Expand</button>
            </div>
          </li>`;
      }
    }
  };



  //takes in array of items (each item is an object)
  //calls generateBookmarkHtml() on each item
  //returns a string of HTML
  const generateFullList = function(itemArr){
    return itemArr.map( bookmark => {
      return generateBookmarkHtml(bookmark); 
    }).join('');
  };


  //takes in a DOM element
  //finds closest <li> and returns the value from data-bookmark-id
  const getIdFromElement = function(listItem) {
    return $(listItem).closest('li').data('bookmark-id');
  };


  //takes in a DOM element
  //finds closest <li> and returns the value from data-detail-view
  const getDetailBoolFromElement = function(listItem) {
    return $(listItem).closest('li').data('detail-view');
  };

  const displayErrorToaster = function(message) {
    $('.js-error-message').text(message);
    $('.error-toaster').show().delay('3000').fadeOut('slow');
  };


  const checkAddFormShow = function() {
    if (store.showAddForm) {
      $('.add').fadeIn(800);
      $('.js-add-bookmark-form form').slideDown();
      $('.toggle-add-state').hide();
    } else {
      $('.add').fadeOut();
      $('.js-add-bookmark-form form').slideUp(600);
      $('.toggle-add-state').fadeIn(1400);
    }
  };

  const checkEditTitleShow = function(bookmark) {
    if (bookmark.editTitle) {
      $(`li[data-bookmark-id="${bookmark.id}"]`).find('.edit-box.title').html(`
        <input type='text' class='input-new title' placeholder='Type new title here...' required>
        <button type='submit' class='submit-new title'>Submit changes</button>
      `);
    } 
  };


  const checkEditRatingShow = function(bookmark) {
    if (bookmark.editRating) {
      $(`li[data-bookmark-id="${bookmark.id}"]`).find('.edit-box.rating').html(`
        <label for='edit-rating'>Input new rating:</label>
        <select name="edit-rating" class='js-edit-rating'>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type='submit' class='submit-new rating'>Submit changes</button>
      `);
    }
  };


  const checkEditUrlShow = function(bookmark) {
    if (bookmark.editUrl) {
      $(`li[data-bookmark-id="${bookmark.id}"]`).find('.edit-box.url').html(`
        <input type='url' class='input-new url' placeholder='Type new url here...' required>
        <button type='submit' class='submit-new url'>Submit changes</button>
      `);
    }
  };

  const checkEditDescShow = function(bookmark) {
    if (bookmark.editDesc) {
      $(`li[data-bookmark-id="${bookmark.id}"]`).find('.edit-box.desc').html(`
        <textarea class='input-new desc' placeholder='Type new description here...' rows='4'></textarea>
        <button type='submit' class='submit-new desc'>Submit changes</button>
      `);
    }
  };


  //generates html string from store.bookmarks
  //inserts that string into the <ul> list
  const render = function() {
    const listString = generateFullList(store.bookmarks);
    $('.js-bookmark-list').html(listString);
    checkAddFormShow();
    store.bookmarks.forEach(bookmark => checkEditTitleShow(bookmark));
    store.bookmarks.forEach(bookmark => checkEditRatingShow(bookmark));
    store.bookmarks.forEach(bookmark => checkEditUrlShow(bookmark));
    store.bookmarks.forEach(bookmark => checkEditDescShow(bookmark));
  };


  const resetForm = function() {
    $('.js-add-desc').val('');
    $('.js-add-title').val('');
    $('.js-add-url').val('');
    $('.js-add-rating').val('1');
  };


  return {
    generateBookmarkHtml, 
    generateFullList, 
    render, 
    getIdFromElement,
    getDetailBoolFromElement,
    resetForm,
    displayErrorToaster
  };
}());