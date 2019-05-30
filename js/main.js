// 1 -- Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// 2 -- Fetch the values

function saveBookmark(e) {
  // get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  // Check if bookmark is null
  if (localStorage.getItem("bookmarks") === null) {
    // Init Array
    var bookmarks = [];
    bookmarks.push(bookmark);
    // Set to local Storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // fetch it from localstorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmark to the array
    bookmarks.push(bookmark);
    // re-set back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  //clear form
  document.getElementById("myForm").reset();
  // Re-fetch bookmarks
  fetchBookmarks();

  e.preventDefault();
}

// function test() {
//   function inner() {
//     console.log("test");
//   }
// }

// Delete Bookmarks
function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }
  // Reset back to local storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}
// Fetch Bookmarks

function fetchBookmarks() {
  // fetch it from localstorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Get output id
  var bookmarksResults = document.getElementById("bookmarksResults");

  // Build our output
  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="well">' +
      "<h3>" +
      name +
      ' <a class="btn btn-success" target="_blank" href="' +
      url +
      '">Visit</a> ' +
      " <a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      "</h3>" +
      "</div>";
  }
}

// Validation Function

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("please fill in the form");
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("please enter a valid URL");
    return false;
  }

  return true;
}
