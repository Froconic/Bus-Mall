`use strict`;
//--------------------------------------------Data-------------------------------------------------------------
var itemNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var allItems = [];
var totalClicks = 0;
var itemsDisplayedArray = [];

//-------------------------------------------------------------------------------------------------------------
//--------------------------------------------Functionality-------------------------------------------------------------
// CONSTRUCTOR FUNCTION----------------------------------------------------------------------------------------

function Item(name) {
  this.name = name;
  this.imageURL = `img/${name}.jpg`;
  this.votes = 0;
  this.displays = 0;
  allItems.push(this);
}

//-------------------------------------------------------------------------------------------------------------

// OBJECT CREATOR FUNCTION----------------------------------------------------------------------------------------

function itemCreator() {
  for (var i = 0; i < itemNames.length; i++) {
    new Item(itemNames[i]);
  }

  // console.table(allItems);
}
//TESTS FOR THE ABOVE FUNCTION
// console.table(itemCreator());
//-------------------------------------------------------------------------------------------------------------

//RANDOM ITEM SELECTOR FUNCTION-------------------------------------------------------------------------------------------------------------
function randomItem() {
  return Math.floor(Math.random() * allItems.length);
}
//TESTS FOR THE ABOVE FUNCTION
// console.log(randomItem());
//-------------------------------------------------------------------------------------------------------------

// FUNCTION TO SELECT ITEMS-----------------------------------------------------------------------------------------------------
//Randomly Selects the items to be displayed
function displayedItems() {
  itemsDisplayedArray = [];
  for (var i = 0; i < 3; i++) {
    // console.log('running items to grab');
    itemsDisplayedArray.push(randomItem());
  }
  // console.table(itemsDisplayedArray);
  if (itemsDisplayedArray[1] === itemsDisplayedArray[0]) {
    // console.log('duplicate detected for item 2');
    itemsDisplayedArray[1] = randomItem();
    // console.log('new item selected for item 2');
  }

  if (itemsDisplayedArray[2] === itemsDisplayedArray[0] || itemsDisplayedArray[2] === itemsDisplayedArray[1]) {
    // console.log('duplicate detected for item 3');
    itemsDisplayedArray[2] = randomItem();
    // console.log('new item selected for item 3');
  }

  return itemsDisplayedArray;
}
//TESTS FOR THE ABOVE FUNCTION
// console.table(displayedItems());
//-------------------------------------------------------------------------------------------------------------


//RENDER FUNCTION-------------------------------------------------------------------------------------------------------------
function render() {
  displayedItems();
  var itemShell = document.getElementById('item-shell');
  //Creates the open display
  itemShell.innerHTML = '';
  // console.log(`items to be displayed ${itemsDisplayedArray}`);


  for (var i = 0; i < 3; i++) {
    allItems[itemsDisplayedArray[i]].displays++;
    // console.log(`display tally: ${allItems[itemsDisplayedArray[i]].displays}`);
    var image = document.createElement('img');
    image.setAttribute('src', allItems[itemsDisplayedArray[i]].imageURL);
    image.setAttribute('data-name', allItems[itemsDisplayedArray[i]].name);
    // console.log(image);

    image.setAttribute('width', '250px');
    image.setAttribute('height', '250px');
    image.addEventListener('click', handleVotes);
    itemShell.appendChild(image);

  }
  // console.log(`total clicks: ${totalClicks}`);
  // console.log(allItems.length);
  // console.log('Click away!');
  // console.table(allItems);
}
//TESTS FOR THE ABOVE FUNCTION
// console.log(itemCreator());
// console.log(render());
//-------------------------------------------------------------------------------------------------------------

//VOTE HANDLING FUNCTION-------------------------------------------------------------------------------------------------------------
function handleVotes(event) {
  // console.log('I am running');
  var itemName = event.target.dataset.name;
  // console.log(allItems.length);
  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i].name === itemName) {
      allItems[i].votes++;
      // console.log('votes: ' + allItems.votes);
      totalClicks++;
      // console.log(`total clicks:${totalClicks}`);
      render();
      sidebarResults();
      // console.log('render ran');
    }
  }
  totalClicksChecker();
}
//-------------------------------------------------------------------------------------------------------------

//TOTAL CLICKS CHECKER FUNCTION-------------------------------------------------------------------------------------------------------------
function totalClicksChecker() {
  if (totalClicks === 25) {
    console.log(`game over!`);
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      images[i].removeEventListener('click', handleVotes);
    }

    finalResults();
  }
}

//-------------------------------------------------------------------------------------------------------------

//FUNCTION THAT DISPLAYS FINAL RESULTS-------------------------------------------------------------------------------------------------------------

function finalResults() {
  var results = document.getElementById('results-shell')
  var list = document.createElement('ul');
  // var thumbnail = document.createElement('img');

  // console.log(image);



  for (var i = 0; i < allItems.length; i++) {
    var item = allItems[i];
    var listItem = document.createElement('li');
    // //Adds a thumbnail to the image
    // thumbnail.setAttribute('src', item[i].imageURL);
    // thumbnail.setAttribute('data-name', item[i].name);
    // thumbnail.setAttribute('width', '250px');
    // thumbnail.setAttribute('height', '250px');
    // listItem.appendChild(thumbnail);

    listItem.textContent = `${item.name} has ${item.votes} votes and ${item.displays} views`;
    list.appendChild(listItem);
  }
  results.appendChild(list);
}


//-------------------------------------------------------------------------------------------------------------

//FUNCTION THAT HANDLES THE SIDEBAR-------------------------------------------------------------------------------------------------------------

function sidebarResults() {
  console.log('I am running');
  var sidebar = document.getElementById('progress');
  var list = document.createElement('li');

  list.textContent = `Times voted: ${totalClicks}`
  console.log(list.textContent);
  sidebar.appendChild(list);
}

//TESTS FOR THE ABOVE FUNCTION
// console.log(itemCreator());
// console.log(render());
// console.log(sidebarResults());

//-------------------------------------------------------------------------------------------------------------

//--------------------------------------------Executables-------------------------------------------------------------
//CALL STACK OF ALL NECESSARY FUNCTIONS
itemCreator();
render();
//-------------------------------------------------------------------------------------------------------------
