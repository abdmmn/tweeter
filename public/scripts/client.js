/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    
    const tweetslist = document.querySelector("#tweets-container");
    tweetslist.insertAdjacentHTML("afterbegin", createTweetElement(tweet));

  }
}

const createTweetElement = function(tweet) {
let $tweet = 
`<article id="tweet-container">
  <header class="old-tweet-header">
    <div class="old-header-left">
      <img class="old-tweet-img" src="${tweet.user.avatars}">
      <span>${tweet.user.name}</span>
    </div>
    <span class="name-tag">${tweet.user.handle}</span>
  </header>
  <div class="old-tweet-text">
    <p id="past-tweet">${tweet.content.text}</p>
  </div>
  <footer class="old-tweet-footer">
    <div class="time passed">${timeago.format(tweet.created_at)}</div>
    <div class="react-icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`


return $tweet;
}

jQuery(document).ready(function () {

  $( ".new-tweet form" ).submit( handlesubmit ) 
    
  loadtweets()

});

 function handlesubmit( event ) {
  event.preventDefault();
  
  let tweetLen = $(this).find('#tweet-text').val().length
  if (tweetLen > 140) {
    $("#errorLong").fadeIn().fadeOut(7000)
  } else if (tweetLen === 0) {
    $("#errorShort").fadeIn()
  } else 
    $.ajax({
      url: '/tweets',
      type: "POST",
      data: $( this ).serialize(),
      success: function() {
        loadtweets()
      },
    });
 }

function loadtweets() {
  $.ajax({
    url: '/tweets',
    type: "GET",
    datatype: "json",
    // data: ,
    success: function (tweets) {
      console.log(tweets)
      renderTweets(tweets)
    },
  });
  }
 


