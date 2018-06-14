var currID;


function insertNewComment(CommentText, CommentAuthor, postID) {

  var CommentElem = document.createElement('article');
  CommentElem.classList.add('Comment');

  var CommentContentElem = document.createElement('div');
  CommentContentElem.classList.add('Comment-content');
  CommentElem.appendChild(CommentContentElem);

  var CommentAttributionTextNode = document.createTextNode(CommentAuthor);
  var CommentAttributionLinkElem = document.createElement('a');
  CommentAttributionLinkElem.href = '#';
  CommentAttributionLinkElem.appendChild(CommentAttributionTextNode);
  var CommentAttributionElem = document.createElement('p');
  CommentAttributionElem.classList.add('Comment-attribution');
  CommentAttributionElem.appendChild(CommentAttributionLinkElem);
  CommentContentElem.appendChild(CommentAttributionElem);

  var CommentTextNode = document.createTextNode(CommentText);
  var CommentTextElem = document.createElement('p');
  CommentTextElem.classList.add('Comment-text');
  CommentTextElem.appendChild(CommentTextNode);
  CommentContentElem.appendChild(CommentTextElem);

  var CommentContainer = document.querySelector('main.Comment-container');
  CommentContainer.appendChild(CommentElem);
}

function insertNewPost(text,author,title,topic,image){
  var PostElem = document.createElement('article');
  PostElem.classList.add('postContainer');

  var postImg = document.createElement('img');
  postImg.classList.add('postImage');
  postImg.src = image;
  postImg.width = "150";
  postImg.height = "150";
  PostElem.appendChild(postImg);

  var PostContentElem = document.createElement('div');
  PostContentElem.classList.add('content');
  PostElem.appendChild(PostContentElem);

  var PostAuthorNode = document.createTextNode(author);
  var PostAuthorElem = document.createElement('p');
  PostAuthorElem.classList.add('author');
  PostAuthorElem.appendChild(PostAuthorNode);
  PostContentElem.appendChild(PostAuthorElem);

  var PostTitleTextNode = document.createTextNode(title);
  var PostTitleLinkElem = document.createElement('a');
  PostTitleLinkElem.href = '#';
  PostTitleLinkElem.appendChild(PostTitleTextNode);
  var PostTitleElem = document.createElement('p');
  PostTitleElem.classList.add('title');
  PostTitleElem.appendChild(PostTitleLinkElem);
  PostContentElem.appendChild(PostTitleElem);

  var PostTextNode = document.createTextNode(text);
  var PostTextElem = document.createElement('p');
  PostTextElem.classList.add('text');
  PostTextElem.appendChild(PostTextNode);
  PostContentElem.appendChild(PostTextElem);

  var PostTopicNode = document.createTextNode(topic);
  var PostTopicElem = document.createElement('p');
  PostTopicElem.classList.add('topic');
  PostTopicElem.appendChild(PostTopicNode);
  PostContentElem.appendChild(PostTopicElem);

  var content = document.querySelector('main.content');
  content.appendChild(PostElem);
}

var allPosts = [];
var allComments = [];

function handleModalAcceptClick() {

  var CommentText = document.getElementById('Comment-text-input').value;
  var CommentAuthor = document.getElementById('Comment-attribution-input').value;

  if (CommentText && CommentAuthor) {

    allComments.push({
      Ctext: CommentText,
      Cauthor: CommentAuthor,
      postID: currID
    });

    clearCommentSearchAndReinsertComments();

  } else {

    alert('You must specify both the text and the author of the Comment!');

  }
}

function clearCommentSearchAndReinsertComments() {

  document.getElementById('navbar-search-input').value = "";
  commentSearchUpdate();

}

function clearPostSearchAndReinsertComments() {

  document.getElementById('navbar-search-input').value = "";
  postSearchUpdate();

}

function clearCommentInputValues() {

  var CommentInputElems = document.getElementsByClassName('Comment-input-element');
  for (var i = 0; i < CommentInputElems.length; i++) {
    var input = CommentInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

function CommentMatchesSearchQuery(comment, searchQuery) {

  if (!searchQuery) {
    return true;
  }

  searchQuery = searchQuery.trim().toLowerCase();
  return (comment.postID).toLowerCase().indexOf(searchQuery) >= 0;
}

function PostMatchesSearchQuery(Post, searchQuery) {

  if (!searchQuery) {
    return true;
  }

  searchQuery = searchQuery.trim().toLowerCase();
  return (Post.author + " " + Post.text + " " + Post.title + " " + Post.topic).toLowerCase().indexOf(searchQuery) >= 0;
}

function PostMatchesTopic(Post, searchQuery) {

  if (!searchQuery) {
    return true;
  }
  searchQuery = searchQuery.trim().toLowerCase();
  return (Post.topic).toLowerCase().indexOf(searchQuery) >= 0;
}

function commentSearchUpdate() {

  var searchQuery = currID;

  var CommentContainer = document.querySelector('.Comment-container');
  if (CommentContainer) {
    while (CommentContainer.lastChild) {
      CommentContainer.removeChild(CommentContainer.lastChild);
    }
  }
  console.log(allComments.length);
  allComments.forEach(function (comment) {
    if (CommentMatchesSearchQuery(comment, searchQuery)) {
      console.log(comment);
      insertNewComment(comment.Ctext, comment.Cauthor,comment.PostID);
    }
  });

}

function postSearchUpdate() {

  var searchQuery = document.getElementById('navbar-search-input').value;

  var PostContainer = document.querySelector('.content');
  if (PostContainer) {
    while (PostContainer.lastChild) {
      PostContainer.removeChild(PostContainer.lastChild);
    }
  }

  allPosts.forEach(function (Post) {
    if (PostMatchesSearchQuery(Post, searchQuery)) {
      insertNewPost(Post.text, Post.author,Post.title,Post.topic,Post.Img);
    }
  });

}

function postSearchUpdatebyTopic(searchQuery) {

  var PostContainer = document.querySelector('.content');
  if (PostContainer) {
    while (PostContainer.lastChild) {
      PostContainer.removeChild(PostContainer.lastChild);
    }
  }
  allPosts.forEach(function (Post) {
    if (PostMatchesTopic(Post, searchQuery)) {
      insertNewPost(Post.text, Post.author,Post.title,Post.topic,Post.Img);
    }
  });

}

function parseCommentElem(CommentElem) {

  var comment = {};

  var CommentTextElem = CommentElem.querySelector('.Comment-text');
  comment.Ctext = CommentTextElem.textContent.trim();

  var CommentAttributionLinkElem = CommentElem.querySelector('.Comment-attribution a');
  comment.Cauthor = CommentAttributionLinkElem.textContent.trim();

  return comment;

}

function parsePostElem(PostElem) {

  var Post = {};

  var PostTextElem = PostElem.querySelector('.text');
  Post.text = PostTextElem.textContent.trim();

  var PostAttributionLinkElem = PostElem.querySelector('.author a');
  Post.author = PostAttributionLinkElem.textContent.trim();

  var PostTitleLinkElem = PostElem.querySelector('.title a');
  Post.title = PostTitleLinkElem.textContent.trim();

  var PostIDElem = PostElem.querySelector('.id');
  Post.PostID = PostIDElem.textContent.trim();

  var PostTopicElem = PostElem.querySelector('.topic');
  Post.topic = PostTopicElem.textContent.trim();
/*
  var PostImgElem = PostElem.querySelector('.PostImg');
  Post.image = PostImgElem.src.trim();
*/
  return Post;

}

function focusPosts(focuspost){

  var PostContainer = document.querySelector('.content');
  if (PostContainer) {
    while (PostContainer.lastChild) {
      PostContainer.removeChild(PostContainer.lastChild);
    }
  }
  allPosts.push(focuspost);
}

function navClick(topic){
  var newComment = document.getElementsByClassName('comment-box')[0];
  newComment.style.display = "none";
  addActive(topic);
  postSearchUpdatebyTopic(topic);
}

function addActive(topic){

  var newsItem = document.getElementById('news');
  newsItem.classList.remove('active');
  var gamingItem = document.getElementById('gaming');
  gamingItem.classList.remove('active');
  var healthItem = document.getElementById('health');
  healthItem.classList.remove('active');
  var musicItem = document.getElementById('music');
  musicItem.classList.remove('active');
  var sportsItem = document.getElementById('sports');
  sportsItem.classList.remove('active');
  var homeItem = document.getElementById('home');
  homeItem.classList.remove('active');

  var navitem = document.getElementById(topic);
  navitem.classList.add('active');
}


window.addEventListener('DOMContentLoaded', function () {

  var CommentElemsCollection = document.getElementsByClassName('Comment');
  for (var i = 0; i < CommentElemsCollection.length; i++) {
    allComments.push(parseCommentElem(CommentElemsCollection[i]));
  }
  console.log(allComments);

  var createCommentButton = document.getElementById('create-Comment-button');
  if (createCommentButton) {
    createCommentButton.addEventListener('click', showCreateCommentModal);
  }


  var modalAcceptButton = document.querySelector('.leave-comment-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }

  var searchButton = document.getElementById('navbar-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', postSearchUpdate);
  }

  var searchInput = document.getElementById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', postSearchUpdate);
  }

  var postElemsCollection = document.getElementsByClassName('postContainer');
  for (var j = 0; j < postElemsCollection.length; j++) {
    allPosts.push(parsePostElem(postElemsCollection[j]));
  }


  var newsButton = document.getElementById('news');
  if(newsButton){
    newsButton.addEventListener('click', function(){navClick("news")});
  }

  var sportsButton = document.getElementById('sports');
  if(sportsButton){
    sportsButton.addEventListener('click', function(){navClick("sports")});
  }

  var musicButton = document.getElementById('music');
  if(musicButton){
    musicButton.addEventListener('click', function(){navClick("music")});
  }

  var gamingButton = document.getElementById('gaming');
  if(gamingButton){
    gamingButton.addEventListener('click', function(){navClick("gaming")});
  }

  var healthButton = document.getElementById('health');
  if(healthButton){
    healthButton.addEventListener('click', function(){navClick("health")});
  }




// FOLLOWING LINES ARE FOR ADDING LISTENERS TO POSTS
  Array.from(postElemsCollection).forEach(el => {
    el.addEventListener('click',function(post){
      var PostContainer = document.querySelector('.content');
      if (PostContainer) {
        while (PostContainer.lastChild) {
          PostContainer.removeChild(PostContainer.lastChild);
        }
      }

      allPosts.push(el);
      el = parsePostElem(el);
      insertNewPost(el.text,el.author,el.title,el.topic,el.image);
      var newComment = document.getElementsByClassName('comment-box')[0];
      newComment.style.display = "block";

      commentSearchUpdate();
      currID = el.PostID;
    })
  })

});
