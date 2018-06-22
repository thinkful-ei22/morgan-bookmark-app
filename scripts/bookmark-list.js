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
              <div class='display-rating'>
                <p>Rating: ${obj.rating} / 5</p>
              </div>
            </div>
            <div class='detail-view'>
              <p>Go to <a href='${obj.url}' target='_blank'>${obj.title}</a></p>
              <div class='desc-container'>
                <p>Description:</p>
                <p class='display-description'>${obj.desc}</p>
              </div>
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
              <div class='display-rating'>
                <p>Rating: ${obj.rating} / 5</p>
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
      return generateBookmarkHtml(bookmark) 
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


  //generates html string from store.bookmarks
  //inserts that string into the <ul> list
  const render = function() {
    const listString = generateFullList(store.bookmarks);
    $('.js-bookmark-list').html(listString);
    if (store.showAddForm) {
      $('.js-add-bookmark-form form').show();
      $('.toggle-add-state').hide();
    } else {
      $('.js-add-bookmark-form form').hide();
      $('.toggle-add-state').show();
    }
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