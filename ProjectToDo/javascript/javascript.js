/*******  OPTIMIZED TO DO LIST *******/

// Shortkey for declaring variables through ID's
const $ = function(id){return document.getElementById(id);}

// Declarations
let todoList = $('todoItemList');
let addBtn = $('addItem');
let textField = $('inputText');
let todo = $('todo');
let saveBtn = $('saveBtn');

// Main function to add item to the list
function addItem () {
    //  Defines a value based on the users input
    let textInput = $('inputText').value;

    // CREATE LI ELEMENTS IN THE UL 
    //  Creates a list item and divs and adds classnames
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'todoItem');

    const liText = document.createElement('div');
    liText.setAttribute('class', 'liText');

    const liBtns = document.createElement('div');
    liBtns.setAttribute('class', 'liBtns');

    // Inputs user text into the new element
    const liUserText = document.createTextNode(textInput);

    // Displays the new todo list items text
    liText.appendChild(liUserText);

    // Displays new div elements
    newLi.append(liText, liBtns);

    // Displays the new todo list item
    todoList.append(newLi);

    // CREATE BUTTONS ON LISTED ITEMS
    // Creates a delete and an edit button with every new item added
    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.setAttribute('class', 'deleteBtn');
    
    const newEditBtn = document.createElement('button');
    newEditBtn.setAttribute('class', 'editBtn');
        
    // Appends and displays delete and edit buttons
    liBtns.append(newEditBtn, newDeleteBtn);
    newDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    newEditBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    
    // HIGHLIGHTING A FINNISHED TASK ON THE UL
    // Loops through each list item and adds an event listener with a function
    let todoListItms = $('todoItemList').childNodes;
    todoListItms.forEach(function() {
        newDeleteBtn.addEventListener('click', deleteItem);
        newLi.addEventListener('click', crossItem);
        newEditBtn.addEventListener('click', editItem);
    });

    // Deletes list item
    function deleteItem () {
        newLi.remove();
    }

    // Highlights list items
    function crossItem () {
        if (newLi.classList.contains('done')){
            newLi.classList.remove('done');
        } else {
            newLi.classList.add('done');
        }
    }

    // Prompts a message to edit an item in case of a mispell
    function editItem () {
        let txt;
        let newText = prompt('Edit item', liText.innerHTML);
        if (newText == null || newText == ''){
            txt = textInput;
        } else {
            txt = newText;
        }
        liText.innerHTML = txt;
    }

    resetAndFocus();
} 
   
// check if input value is > 0, if yes = run addItem function
function addItemAfterClick(){
    if (textField.value.length > 0) {
        addItem();
    } else {
        alert('You forgot to put in some text');
    }
}

function addItemAfterKeypress(e){
    if (textField.value.length > 0 && e.key === 'Enter') {
      addItem();
    } else if (textField.value.length == 0 && e.key === 'Enter'){
        alert('You forgot to put in some text');
    }
}


const resetAndFocus = function () {
    // Resets the focus back onto the input field
    textField.focus();
    // Resets the input field
    textField.value = '';
}

addBtn.addEventListener('click', addItemAfterClick);
textField.addEventListener('keypress', addItemAfterKeypress);


/********* SAVE LISTS **********/
// Display save button when there's at least one item on the list
/* 
function displaySaveBtn(){
    if (todoList.getElementsByTagName('li').length >= 1){
        saveBtn.style.display = "block";
    } else{
        saveBtn.style.display = "none";
    }
}
window.setInterval(displaySaveBtn, 100);

// save list and add a title to the list
function saveList(){
    const addDiv = document.createElement('div');
    addDiv.setAttribute('class', 'savedList');

    const addTitle = document.createElement('h2');
    addTitle.setAttribute('class', 'listTitle')
    listBox.appendChild(addDiv);    
}

function addListToLists(){
    /*
    let titleText = prompt('Write the title of your list');
    if (titleText == null || titleText == ''){ 
        saveList();

        /*
        const addTitle = document.createElement('h2')
        addTitle.setAttribute('class', 'listTitle');

    }
    saveBtn.addEventListener('click', addListToLists);

*/

/********* LIST BOX ********/
// let listBox = $('listBox');

// let listBox = [];