/* global $, bookmarkList, api, store, eventListeners */
'use strict';

const api = (function(){


  //const BASE_URL = 'https://thinkful-list-api.herokuapp.com/morganhuegel/bookmarks';
  const BASE_URL = '/bookmarks';
  

  const addBookmark = function(object, callbackSuccess, callbackError){
    const newItem = JSON.stringify({ 
      'title': object.title,
      'url': object.url,
      'desc': object.desc,
      'rating': object.rating,
    });
    
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: callbackSuccess,
      error: callbackError
    });
  };



  const getBookmarks = function(callback) {
    return $.getJSON({
      url: BASE_URL,
      dataType: 'json',
      success: callback
    });
  };


  const deleteBookmark = function(id, callback){
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    });
  };


  const updateBookmark = function(id, update, successCallback, errorCallback){
    const updatedInfo = JSON.stringify(update);
    
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      data: updatedInfo,
      contentType: 'application/json',
      success: successCallback,
      error: errorCallback
    });
  };

  const testTitleAndUrl = function(newObj){
    if(newObj.title === '') {
      const errMessage = 'Title is required. It must be at least 1 character in length.';
      console.log(errMessage);
    } else if (newObj.url === '') {
      const errMessage = 'URL is required. It must begin with http://  ';
      console.log(errMessage);
    } else {
      return true;
    }
  };


  return {
    addBookmark, 
    getBookmarks, 
    deleteBookmark, 
    updateBookmark,
    testTitleAndUrl
  };
}());