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

// Calls all create element functions with one function
const createElements = function () {
    createListItem();
    createListTextDiv();
    createListBtnDiv();
    createListDeleteBtn();
    createListEditBtn();
}

// Creates a new list item with classname
const createListItem = function () {
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'todoItem');
    newLi.addEventListener('click', highlightItem);
    newLi.append(createListTextDiv(), createListBtnDiv());

    return newLi;
}

// Creates two divs inside the new list item with classnames
const createListTextDiv = function () {
    const liText = document.createElement('div');
    liText.setAttribute('class', 'liText');
    liText.appendChild(createText());

    return liText;
}

const createListBtnDiv = function () { 
    const liBtns = document.createElement('div');
    liBtns.setAttribute('class', 'liBtns');
    liBtns.append(createListEditBtn(), createListDeleteBtn());

    return liBtns;
}

// Creates an edit button and a delete button with classnames and icons
const createListDeleteBtn = function () {
    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.setAttribute('class', 'deleteBtn');
    newDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    newDeleteBtn.addEventListener('click', deleteItem);
    
    return newDeleteBtn;
}

const createListEditBtn = function () {
    const newEditBtn = document.createElement('button');
    newEditBtn.setAttribute('class', 'editBtn');
    newEditBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    newEditBtn.addEventListener('click', editItem);

    return newEditBtn;
}

// Creates a textnode from input
const createText = function () {
    const liUserText = document.createTextNode(textField.value);
    
    return liUserText;
}

// Appends elements
const appendElements = function () {
    todoList.appendChild(createListItem());
}

// Deletes a list item when clicking on the delete button
function deleteItem (e) {
    let p = e.target.parentElement;
    let pp = p.parentElement;
    let ppp = pp.parentElement;
    let pppp = ppp.parentElement;
    pppp.removeChild(ppp);
}

// Delete all list items
const deleteAllItems = function () {
    todoList.remove(createListItem);
}

// Highlight a list item
const highlightItem = function (e) {
    if (e.target.classList.contains('done')){
        e.target.classList.remove('done');
    } else {
        e.target.classList.add('done');
    }
}

// Ability to edit list item
const editItem = function () {
    let txt;

    let newText = prompt('Edit item', createListTextDiv().innerHTML);
    if (newText == null || newText == ''){
        txt = textField.value;
    } else {
        txt = newText;
    }
    createListItem().innerHTML = txt;
}

// Resets and focuses input
const resetAndFocus = function () {
    // Resets the focus back onto the input field
    textField.focus();
    // Resets the input field
    textField.value = '';
}

// Adds item if input field is not empty
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

addBtn.addEventListener('click', addItemAfterClick);
textField.addEventListener('keypress', addItemAfterKeypress);
