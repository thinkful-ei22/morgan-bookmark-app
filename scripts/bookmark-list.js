/* global $, bookmarkList, api, store */
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
              <h3>${obj.title}</h3>
              <div class='display-rating'>
                <p>Rating: ${obj.rating} / 5</p>
              </div>
            </div>
            <div class='detail-view'>
              <p>Travel to <a href='${obj.url}' target='_blank'>${obj.title}</a></p>
              <div class='desc-container'>
                <p>Description: </p>
                <p>${obj.desc}</p>
              </div>
              <button type='button' class='js-delete-bookmark' name='delete-bookmark'>DELETE this bookmark</button>
            </div>
          </li>`;
      }
      else {
        return `
          <li class='js-bookmark-item' data-bookmark-id='${obj.id}' data-detail-view='${obj.detailView}'>
            <div class='condense-view'>
              <h3>${obj.title}</h3>
              <div class='display-rating'>
                <p>Rating: ${obj.rating} / 5</p>
              </div>
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


  const render = function() {
    const listString = generateFullList(store.bookmarks);
    $('.js-bookmark-list').html(listString);
  };


  return {
    generateBookmarkHtml, 
    generateFullList, 
    render, 
    getIdFromElement
  };
}());