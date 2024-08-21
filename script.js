const inputKeywords = document.getElementById("input");
const submitButton = document.getElementById("submit");
const musicContainer = document.querySelector(".musicDisplay");

submitButton.addEventListener("click", () => {
  getSong();
});

async function getSong() {
  const url = `https://shazam.p.rapidapi.com/search?term=${inputKeywords.value}&locale=en-US&offset=0&limit=1`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "688268f4d0msh69176cddbc5ed7bp1008d5jsn1f63b7d6afe9",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const results = await response.json();
    setSongDataDisplay(results);
  } catch (error) {
    console.error("Error fetching song data:", error);
    musicContainer.innerHTML =
      "<p>Error fetching song data. Please try again.</p>";
  }
}

function setSongDataDisplay(results) {
  if (
    results &&
    results.tracks &&
    results.tracks.hits &&
    results.tracks.hits.length > 0
  ) {
    const track = results.tracks.hits[0].track;
    musicContainer.innerHTML = `
            <div class="container">
                <div class="line">
                    <div>
                        <img src="${track.images.coverart}" alt="Album Art" class="song-img" />
                        <h4 id="title">${track.title}</h4>
                        <a href="${track.url}" id="url" target="_blank">${track.url}</a>
                    </div>
                    <hr />
                    <div>
                        <img src="${track.images.background}" alt="Artist Background" class="artist-img" />
                        <p id="artist-text">${track.subtitle}</p>
                    </div>
                </div>
            </div>
        `;
  } else {
    musicContainer.innerHTML =
      "<p>No results found. Please try a different search term.</p>";
  }
}
