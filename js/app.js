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
  itemCreator();

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
  console.log(`items to be displayed ${itemsDisplayedArray}`);


  for (var i = 0; i < 3; i++) {
    allItems[itemsDisplayedArray[i]].displays++;
    console.log(`display tally: ${allItems[itemsDisplayedArray[i]].displays}`);
    var image = document.createElement('img');
    image.setAttribute('src', allItems[itemsDisplayedArray[i]].imageURL);
    image.setAttribute('data-name', allItems[itemsDisplayedArray[i]].name);
    console.log(image);
    // image.addEventListener('event', handleVotes);
    itemShell.appendChild(image);
  }
}
//TESTS FOR THE ABOVE FUNCTION
console.log(render());
//-------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------

//--------------------------------------------Executables-------------------------------------------------------------
//CALL STACK OF ALL NECESSARY FUNCTIONS
// itemCreator();
//-------------------------------------------------------------------------------------------------------------
