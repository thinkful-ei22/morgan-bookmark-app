/* global $, bookmarkList, api, store */
'use strict';

const api = (function(){


  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/morganhuegel/bookmarks';


  const defaultAddCallback = function(item){
    store.addBookmark(item);
    console.log(store.bookmarks);
  };


  const addBookmark = function(object, callback=defaultAddCallback){
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
      success: callback
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


  const updateBookmark = function(id, update, callback=function(){console.log('update successful');}){
    const updatedInfo = JSON.stringify(update);
    
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      data: updatedInfo,
      contentType: 'application/json',
      success: callback
    });
  };


  return {
    addBookmark, 
    getBookmarks, 
    deleteBookmark, 
    updateBookmark
  };
}());