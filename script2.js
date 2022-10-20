// common elements 
const rootElem = document.getElementById("root"),
  searchBar = document.getElementById("searchBar"),
  matches = document.getElementById("matches"),
  select = document.getElementById("selectEpisode");
let EPISODES;

// returning data from episode.js with a promise
const getAllEpisodes = () => {
  return EPISODES;
};
// fetch API called Receiving data from website
function setup() {
  fetch("https://api.tvmaze.com/shows/179/episodes")
    .then((response) => response.json())
    .then((data) => {
      EPISODES = data;
      render(getAllEpisodes());
    })
    .catch((error) => {
      console.log("Data hasn't arrive see error: ", error);
    });
}
// page creation mentions the amount of episodes
function makePageForEpisodes(episodeList) {
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
// executes a search for a match between a regular expression and a specified string
const episodeContainsTerm = (episode, searchTerm) => {
  const inTitle = episode.name,
    inDescription = episode.summary;
  return searchTerm.test(inTitle) || searchTerm.test(inDescription);
};
// Enables the users to search for the collection of episodes
const searchCollection = () => {
  let searchTerm;
  if (!searchBar.value) {
    rootElem.replaceChildren();
    render(getAllEpisodes());
    return;
  } else {
    searchTerm = new RegExp(searchBar.value, "i");
    let episodesFound = getAllEpisodes().filter((episode) => {
      return episodeContainsTerm(episode, searchTerm);
    });
    rootElem.replaceChildren();
    render(episodesFound);
    return;
  }
};
// returns the season and episode number in S01 E01 order
const minTwoDigits = (num) => {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
};

const episodeCode = (item) => {
  const S = minTwoDigits(item.season),
    E = minTwoDigits(item.number);
  return `S${S}E${E}`;
};

// allows user to select episode by display the specified HTML code inside the specified HTML element.
const render = (renderedList) => {
  select.replaceChildren();
  renderedList.forEach((episode) => {
    let option = document.createElement("option");
    option.value = episode.id;
    option.innerText = `${episodeCode(episode)} - ${episode.name}`;

    select.append(option);
  });

  // display number of total matches out of all the episodes
  let numberOfAllEpisodes = getAllEpisodes().length;
  matches.innerText =
    "Currently showing " +
    renderedList.length +
    " episodes out of the " +
    numberOfAllEpisodes +
    " total.";
  console.log(searchBar.value);

  // Attempts to go through episode.js
  renderedList.forEach((item) => {
    // Creation of new elements
    let div = document.createElement("div"),
      title = document.createElement("h1"),
      img = document.createElement("img"),
      description = document.createElement("p");
      div.setAttribute("id", item.id);


    title.innerText = `${item.name}\n(${episodeCode(item)})`;
    img.src = item.image.medium;
    description.innerHTML = item.summary;

    // addition of new classes to display box with episode name and number 
    div.classList.add("epDiv");
    title.classList.add("epTitle");
    img.classList.add("epImg");
    description.classList.add("epDescription");
    div.append(title, img, description);
    rootElem.append(div);
  });
};
// allows to be viewed in browser through window.onload 
const selectEpisode = () => {
  let episode = select.value;
  console.log(episode);
  window.location.href = `#${episode}`;
};

window.onload = () => {
  setup();
};
// need to add a event listener