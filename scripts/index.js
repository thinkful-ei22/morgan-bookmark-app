/* global $, bookmarkList, api, store, eventListeners */

'use strict';

// const dummyData = [
//   {
//     id: '33334444',
//     title: 'Facebook Homepage',
//     url: 'https://www.facebook.com',
//     desc: 'blah blah blah blah',
//     rating: 4,
//     detailView: false
//   },
//   {
//     id: '55556666',
//     title: 'Thinkful Dashboard',
//     url: 'https://dashboard.thinkful.com/',
//     desc: 'place where I build this bookmark app',
//     rating: 5,
//     detailView: true
//   }
// ];


api.getBookmarks ( response => {
  response.forEach(obj => store.addBookmark(obj));
  store.bookmarks.forEach( object => object.detailView = false);
  bookmarkList.render();
});

console.log(store.bookmarks);
$(eventListeners.main);



// store.bookmarks = dummyData;
// bookmarkList.render();


//api.addBookmark(dummyData[1]);
//api.deleteBookmark('cjiopfl6s000n0kug349pk34c', () => console.log('item deleted'));

//api.getBookmarks(() => console.log('got the package')));
// store.bookmarks = dummyData;
// store.updateBookmark('55556666', {title: 'Thinkful Homepage'});
// api.updateBookmark('cjioq1eqo000s0kugpzja8rh3', {title: 'Something Else', desc:"Something Else"});
// console.log(store.bookmarks);

// store.bookmarks = dummyData;
// bookmarkList.render();