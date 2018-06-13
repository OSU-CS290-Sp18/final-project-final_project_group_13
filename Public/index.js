function insertNewComment(commentText, commentAuthor) {

  var postID;

  var newPost = document.createElement('article');
  newPost.classList.add('comment');


  var newCommentContent = document.createElement('div');
  newCommentContent.classList.add('comment-content');
  newPost.appendChild(newCommentContent);


  var newCommentAuthorTextNode = document.createTextNode(commentAuthor);
  var newCommentAuthorLink = document.createElement('a');
  newCommentAuthorLink.href = '#';
  newCommentAuthorLink.appendChild(newCommentAuthorTextNode);
  var newCommentAuthor = document.createElement('p');
  newCommentAuthor.classList.add('comment-author');
  newCommentAuthor.appendChild(newCommentAuthorLink);
  newCommentContent.appendChild(newCommentAuthor);


  var newCommentContentTextNode = document.createTextNode(commentText);
  var newCommentContentText = document.createElement('p');
  newCommentContentText.classList.add('twit-text');
  newCommentContentText.appendChild(newCommentContentTextNode);
  newCommentContent.appendChild(newCommentContentText);


  var commentContainer = document.querySelector('main.comment-container');
  postContainer.appendChild(newPost);

}

function createCommentClick() {

  var commentText = document.getElementById('comment-content').value;
  var commentAuthor = document.getElementById('comment-name').value;


  if (commentText && commentAuthor) {

    insertNewComment(commentText,commentAuthor);

  } else {

    alert('You must specify both the text and the author of the Comment!');

  }
}

var createCommentButton = document.querySelector('.leave-comment-button');
if (createCommentButton) {
  createCommentButton.addEventListener('click', createCommentClick);
}
