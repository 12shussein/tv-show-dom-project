//You can edit ALL of the code here
// main elements
const shows = getAllShows();
let showsArr = []; // array of episodes
let selectOption = [];
const search = document.querySelector('.search');
const select = document.querySelector('.options');
const selectShows = document.querySelector('.optionsShows');
const display = document.querySelector('.display');
const btnReturn = document.querySelector('.btnReturn');
const searchShow = document.querySelector('.searchShow');
console.log(selectShows);
shows.sort((a,b) =>  {
  if (a.name[0] > b.name[0])
   {        return 1;      }
    else if (a.name[0] < b.name[0]) 
    {        return -1;      }
     else {        return 0;      }
});


// search event listener

// creation of tv show page for all episodes function
let 