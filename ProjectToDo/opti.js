// ElementById shortcut
const $ = function(id){return document.getElementById(id);}

// Declarations
let todoList = $('todoItemList');
let addBtn = $('addItem');
let textField = $('inputText');
let todo = $('todo');
let todoListItms = $('todoItemList').childNodes;

// Adds item with everything in it to the list
const addItem = function () {
    createElements();
    appendElements();
    resetAndFocus();
}

// Calls all create element functions with one function, to be used in "addItem()"
const createElements = function () {
    createListItem();
    createListTextDiv();
    createListBtnDiv();
    createListDeleteBtn();
    createListEditBtn();
}

// Creates a new list item with classname
const createListItem = function () {
    const newLi = document.createElement('li');                     // Creates a new li
    newLi.setAttribute('class', 'todoItem');                        // Sets a class for the li
    newLi.addEventListener('click', highlightItem);                 // Adds an event listener, to highlight the list item
    newLi.append(createListTextDiv(), createListBtnDiv());          // Appends 2 div inside the li for later use

    return newLi;                                                   // Returns the li for use as a parameter later
}

// Creates a div for the userinput text inside the li
const createListTextDiv = function () {
    const liText = document.createElement('div');                   // Creates a new text div
    liText.setAttribute('class', 'liText');                         // Sets a class for the div
    liText.appendChild(createText());                               // Appends a textnode from user input into the div

    return liText;                                                  // Returns the div for use as a parameter later
}

// Creates a div for the buttons inside the li
const createListBtnDiv = function () { 
    const liBtns = document.createElement('div');                   // Creates a new button div
    liBtns.setAttribute('class', 'liBtns');                         // Sets a class for the div
    liBtns.append(createListEditBtn(), createListDeleteBtn());      // Appends the 2 buttons inside the div

    return liBtns;                                                  // Returns the div for use as a parameter later
}

// Creates a delete button with classname and an icon
const createListDeleteBtn = function () {
    const newDeleteBtn = document.createElement('button');          // Creates a new button
    newDeleteBtn.setAttribute('class', 'deleteBtn');                // Sets a class for the button
    newDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';    // Imports an icon into the button
    newDeleteBtn.addEventListener('click', deleteItem);             // Adds an event listener, to delete the list item
    
    return newDeleteBtn;                                            // Returns the button for use as a parameter later
}

// Creates an edit button with classname and an icon
const createListEditBtn = function () {
    const newEditBtn = document.createElement('button');            // Creates a new button
    newEditBtn.setAttribute('class', 'editBtn');                    // Sets a class for the button
    newEditBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';     // Imports an icon into the button
    newEditBtn.addEventListener('click', editItem);                 // Adds an event listener, to edit the list item

    return newEditBtn;                                              // Returns the button for use as a parameter later
}

// Creates a textnode from input
const createText = function () {
    const liUserText = document.createTextNode(textField.value);    // Create a textnode from user input
    
    return liUserText;                                              // Returns the textnode for use as a parameter later
}

// Appends elements
const appendElements = function () {
    todoList.appendChild(createListItem());                         // Appends the list item to the empty div "toDoList/ToDoItemList"
}

// Deletes a list item when clicking on the delete button
function deleteItem (e) {
    let p = e.target.parentElement;                                 // Targets the parent element of the button, and again and again..
    let pp = p.parentElement;
    let ppp = pp.parentElement;
    let pppp = ppp.parentElement;
    pppp.removeChild(ppp);                                          // Removes the li from the ul when the delete button is clicked
}

// Delete all list items
// Missing feature, but the code would work if it had a designated button
const deleteAllItems = function () {
    todoList.remove(createListItem);                                // Removes all list items at once
}

// Highlight a list item
const highlightItem = function (e) {
    if (e.target.classList.contains('done')){                       // Checks if the the target contains said class when clicked
        e.target.classList.remove('done');                          // If it does: Remove the class
    } else {
        e.target.classList.add('done');                             // If it doesn't: Add the class
    }
}

// Ability to edit list item, doesn't work correctly
// My attempt at targeting the innerHTML of the liText div
const editItem = function (e) {
    let txt;                                                        // New variable
    let t = e.target.parentElement;                                 // Targets the parent element of the button, and again and again..
    let tt = t.parentElement;
    let ttt = tt.parentElement;
    let tttt = ttt.parentElement;
    
    let newText = prompt('Edit item', tttt.firstChild.innerHTML);   // Prompts a message to edit the item, which should include what was already written in the liText div
    if (newText == null || newText == ''){                          // Checks if there's nothing written in the textfield
        txt = textField.value;                                      // If there is: Change nothing
    } else {
        txt = newText;                                              // If not: Change to the new input text
    }
    tttt.firstChild.innerHTML = txt;
}

// Resets and focuses input
const resetAndFocus = function () {
    textField.focus();                                              // Resets the focus back onto the input field
    
    textField.value = '';                                           // Resets the input field
}

// Adds item if input field is not empty
function addItemAfterClick(){
    if (textField.value.length > 0) {                               // Checks if there's at least one letter in the input field
        addItem();                                                  // Runs the addItem function
    } else {
        alert('You forgot to put in some text');                    // Alerts the user to input text
    }
}

// Adds item if input field is not empty
function addItemAfterKeypress(e){
    if (textField.value.length > 0 && e.key === 'Enter') {          // Checks if there's at least one letter in the input field and if the "Enter" button is pressed
      addItem();                                                    // Runs the addItem function
    } else if (textField.value.length == 0 && e.key === 'Enter'){   // Checks if the input length is equal to zero and if the "Enter" button is pressed
        alert('You forgot to put in some text');                    // Alerts the user to input text
    }
}

// Event listeners
addBtn.addEventListener('click', addItemAfterClick);                // Event listener to initiate the addItemAfterClick on click
textField.addEventListener('keypress', addItemAfterKeypress);       // Event listener to initiate the addItemAfterKeypress on "Enter" keypress
