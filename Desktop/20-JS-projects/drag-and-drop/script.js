
const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll('.add-item');


// Categories
const listColumns = document.querySelectorAll('.drag-item-list');    //create a list of class drag-item-list
const backlogList = document.getElementById('backlog');               //to get ID
const progressList = document.getElementById('progress');
const completeList = document.getElementById('complete');
const onHoldList = document.getElementById('onHold');

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];


let updateOnLoad = false;    //when loading the, 
let draggedItem;
let currentColumn;
let dragging;

function getSavedColumns(){
    if (localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
      } else {
        backlogListArray = ['Release the course', 'Sit back and relax'];
        progressListArray = ['Work on projects', 'Listen to music'];
        completeListArray = ['Being cool', 'Getting stuff done'];
        onHoldListArray = ['Being uncool']
        }
}

function updateSavedColumns() {
    listArrays = [backlogListArray,progressListArray,completeListArray,onHoldListArray];
    const arrayNames = ['backlog','progress','compete','onHold'];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    } )
  }

// function to create a new list item for a category
function createItemEl(columnEl, column, item, index) {
    // console.log('columnEl:', columnEl);           //console.log outputs a message to the web console
    // console.log('column:', column);
    // console.log('item:', item);
    // console.log('index:', index);
    const listEl = document.createElement('li');          //create a new list item
    listEl.classList.add('drag-item');                    //and also create the class for css
    listEl.textContent = item;
    listEl.draggable = true;                         //to be able to drag
    listEl.setAttribute('ondragstart', 'drag(event)')

    //so we can edit in the item element
    listEl.contentEditable = true;
    listEl.id = index;
    listEl.setAttribute('onfocusout',  `updateItem(${index}, ${column})`);

    //append
    columnEl.appendChild(listEl);          
  }

//allows arrays to reflect drag and drop
function rebuildArrays(){
    // backlogListArray = backlogList.children.map(i => i.textContent);
    backlogListArray = []
    for (let i = 0; i < backlogList.children.length; i++){
        backlogListArray.push(backlogList.children[i].textContent);
    }

    progressListArray =[]
    for (let i = 0; i < progressList.children.length; i++){
        progressListArray.push(progressList.children[i].textContent);
    }

    completeListArray = []
    for (let i = 0; i < completeList.children.length; i++){
        completeListArray.push(completeList.children[i].textContent);
    }
    
    onHoldListArray = []
    for (let i = 0; i < onHoldList.children.length; i++){
        onHoldListArray.push(onHoldList.children[i].textContent);
    }
    //update the DOM
    updateDOM();
}

// when item starts dragging
function drag(e){
    draggedItem = e.target;
    dragging = true;
}

//when item enters column area 
function dragEnter(column){
    //listColumns[column].classList.add('over');

    //set the current column as the destination after dragging
    currentColumn = column;
}

//column allow for item to drop
function alowDrop(e){
    e.preventDefault();
}

// dropping item in column
function drop(e){
    e.preventDefault();
    // //remove a class after dropping
    // listColumns.forEach((column) =>{
    //     column.classList.remove('over');
    // })

    // add item to column
    const parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);
    
    //rebuild all the columns after dropping
    dragging = false;
    rebuildArrays();
}

//update item - delete if necessary, or update the array values
function updateItem(id,column){
    const selectedArray  = listArrays[column];
    const selectedColumnEl = listColumns[column].children;
    if(!dragging){
        if (! selectedColumnEl[id].textContent){
            delete selectedArray[id];
        }
        else {
            selectedArray[id] = selectedColumnEl[id].textContent;
        } 
        updateDOM();   
    }
}

function filterArray(array){
    console.log(array);
    const filtering = array.filter(item => item != 'null');
    console.log(filtering);
    return filtering;
}

// //add to column list, reset textbox
function addToColumn(column){
    const itemText = addItems[column].textContent;
    const selectedArray = listArrays[column];
    selectedArray.push(itemText);
    updateDOM();
}

//show add item input box
function showInputBox(column){
    addBtns[column].style.visibility = 'hidden'; 
    saveItemBtns[column].style.display = 'flex';   // when we click on the button, it will display
    addItemContainers[column].style.display = 'flex';
   
}

//show add item input box
function hideInputBox(column){
    addBtns[column].style.visibility = 'visible'; 
    saveItemBtns[column].style.display = 'none';   // when we click on the button, it will display
    addItemContainers[column].style.display = 'none';
    addToColumn(column);
}

// to update out DOM (document ocject model)  
function updateDOM(){ 
    //check localStorage once
    if (!updateOnLoad )           //if updateOnLoad is false 
        getSavedColumns();         //call this function 
    
    //Backlog Column

    backlogList.textContent = '';
    backlogListArray.forEach((backlogItem,index) => {
        createItemEl(backlogList,0,backlogItem,index);
    });
    backlogListArray = filterArray(backlogListArray);

    progressList.textContent = '';
    progressListArray.forEach((item,index) => {
        createItemEl(progressList,1,item,index);
    });
    progressListArray = filterArray(progressListArray);

    completeList.textContent = '';
    completeListArray.forEach((item,index) => {
        createItemEl(completeList,2,item,index);
    });
    completeListArray = filterArray(completeListArray);

    onHoldList.textContent = '';
    onHoldListArray.forEach((item,index) => {
        createItemEl(onHoldList,3,item,index);
    });
    onHoldListArray = filterArray(onHoldListArray);

    //run getSavedColumns only once to update local storage
    updateOnLoad= true;

    //to update columns whenever DOM is updated
    updateSavedColumns();
}

//on load
updateDOM();
