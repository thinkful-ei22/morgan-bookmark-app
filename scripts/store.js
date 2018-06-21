/* global $, bookmarkList, api, store */
'use strict';

const formHTML = `
<form name='add-bookmark'>

  <div class='add title'>
    <label for='add-title'>*Bookmark Title: </label>
    <input type='textbox' name='add-title' placeholder='e.g. Facebook Homepage' required>
  </div>

  <div class='add url'>
    <label for='add-url' class='add-bookmark-form-label'>*URL: </label>
    <input type='textbox' name='add-url' placeholder='e.g. https://www.facebook.com' required>
  </div>

  <div class='add rating'>
    <label for='add-rating' class='add-bookmark-form-label'>Rating (out of 5)</label>
    <select name="add-rating">
        <option value="No Rating">No Rating</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
  </div>

  <div class='add desc'>
    <label for='add-desc' class='add-bookmark-form-label'>Description (optional): </label>
    <input type='textbox' name='add-desc' placeholder="e.g. social media site where you can see pictures of your friends' kids">
  </div>

  <div>
    <button type='submit'>ADD Bookmark</button>
    <button type='reset'>Cancel</button>
  </div>

</form>
`;


const store = (function() {

  let bookmarks = [];

  const getIdFromElement = function(listItem) {
    return $(listItem).closest('li').data('bookmark-id');
  };

  const addBookmark = function(obj) {
    this.items.push(obj);
  };




  return {
    minRating: 0,
    bookmarks, 
    getIdFromElement, 
    addBookmark
  };
}());