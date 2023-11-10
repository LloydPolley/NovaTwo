function ready(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

// Usage:
ready(function () {
  const FilmButton = document.getElementById("block-607633d773ec1bf820c9");
  const FilmButtonA = FilmButton.getElementsByTagName("a")[0];

  const PhotoButton = document.getElementById("block-3c4b5ef24bea747a983f");
  const PhotoButtonA = PhotoButton.getElementsByTagName("a")[0];

  var filmsContainer = document.querySelector(
    '[data-section-id="654a96919dd985523db604e7"]'
  );
  var photosContainer = document.querySelector(
    '[data-section-id="654a96919dd985523db604ea"]'
  );

  const isPhotos = window.location.search.includes("photos");

  if (isPhotos) {
    PhotoButtonA.style.backgroundColor = "#2e3a2d";
    filmsContainer.style.display = "none";
    photosContainer.style.display = "block";
  } else {
    FilmButtonA.style.backgroundColor = "#2e3a2d";
  }

  FilmButton.addEventListener("click", function () {
    console.log("running");
    filmsContainer.style.display = "block";
    photosContainer.style.display = "none";
    FilmButtonA.style.backgroundColor = "#2e3a2d";
    PhotoButtonA.style.backgroundColor = "";
  });
  PhotoButton.addEventListener("click", function () {
    console.log("running");
    PhotoButtonA.style.backgroundColor = "#2e3a2d";
    FilmButtonA.style.backgroundColor = "";
    filmsContainer.style.display = "none";
    photosContainer.style.display = "block";
  });

  let videos;

  setTimeout(() => {
    videos = document.querySelectorAll("video");
    console.log("videos, ", videos);

    videos.forEach((video) => {
      console.log("videos", video);
      video.setAttribute("data-src", video.getAttribute("src"));
      video.removeAttribute("src");

      video.addEventListener("click", function () {
        console.log("Click", video);
        if (!video.getAttribute("src")) {
          video.setAttribute("src", video.getAttribute("data-src"));
        }
      });
    });
  }, 5000);
});
