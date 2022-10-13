//You can edit ALL of the code here
// main common elements
const rootElem = document.getElementById("root"),
searchBar = document.getElementById("searchBar"),
matches = document.getElementById("matches"),
select = document.getElementById("selectEpisode"),
let EPISODES;


// returning data from show.js with a promise
const getAllEpisodes = () => {
  return EPISODES;
};

// fetch API called Receiving data from website
function setup() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => {
      EPISODES = data;
      render(getAllEpisodes());
    })
    .catch((error) => {
      console.log("No data processed : ", error);
    });
}
// page creation mentions the amount of episode 
function CreationPageForEpisodes(episodeList) {
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
// executes a search for a match between a regular expression and a specified string
const episodeContainsTerm = (episode, searchTerm) => {
  const inName = episode.name,
   const inSynopsis = episode.summary;
  return searchTerm.test(inName) || searchTerm.test(inSynopsis);
};

// Enables the users to search for the collection of episodes
const lookWithinData = () => {
  let searchTerm;
  if (!searchBar.value) {
    rootElem.replaceChildren();
    render(CreationPageForEpisodes());
    return;
  } else {
    searchTerm = new RegExp(searchBar.value, "i");
    let episodesFound = CreationPageForEpisodes().filter((episode) => {
      return episodeContainsTerm(episode, searchTerm);
    });
    rootElem.replaceChildren();
    render(episodesFound);
    return;
  }
};

// returns the season and episode number in S01 E01 order
const minimumTwoDigits = (num) => {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
};

const episodeCode = (item) => {
  const S = minimumTwoDigits(item.season),
  const E = minimumTwoDigits(item.number);
  return `S${S}E${E}`
}

const render = (renderedList) => {
select.replaceChildren();
renderedList.forEach((episode) => {
  let option = document.createElement("option");
  option.value = episode.id;
  option.innerText = `${episodeCode(episode)} - ${episode.name}`;
  select.append(option);
  });


 let numberOfAllEpisodes = CreationPageForEpisodes().length;
  matches.innerText =
    "Currently showing " +
    renderedList.length +
    " episodes out of the " +
    numberOfAllEpisodes +
    " total.";
  console.log(searchBar.value);

  // ITERATE THROUGH COLLECTED DATA
  renderedList.forEach((item) => {
    // CREATE ELEMENTS
    let div = document.createElement("div"),
      title = document.createElement("h1"),
      img = document.createElement("img"),
      description = document.createElement("p");

    // FILL WITH CONTENT
    title.innerText = `${item.name}\n(${episodeCode(item)})`;
    img.src = item.image.medium;
    description.innerHTML = item.summary;

    // ADD CLASSES
    div.classList.add("epDiv");
    title.classList.add("epTitle");
    img.classList.add("epImg");
    description.classList.add("epDescription");

    // ADD ID
    div.setAttribute("id", item.id);

    // APPEND
    div.append(title, img, description);
    rootElem.append(div);
  });
};

const selectEpisode = () => {
  let episode = select.value;
  console.log(episode);
  window.location.href = `#${episode}`;
};

window.onload = () => {
  setup();
};








// search event listener

// creation of tv show page for all episodes function
let 