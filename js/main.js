'use strict';

var addItems = document.querySelector('.add-items');
var itemsList = document.querySelector('.plates');
var items = JSON.parse(localStorage.getItem('items')) || [];
var checkThemAllBtn = document.querySelector('.checkThemAll');
var unCheckThemAllBtn = document.querySelector('.unCheckThemAll');
var removeSelectedItemsBtn = document.querySelector('.deleteSelectedItems');
var inputRequired = document.getElementById('inputRequired');


function setItemToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function removeItemFromLocalStorage() {
    localStorage.removeItem('items', JSON.stringify(items));
}
// function notNeedToBeRequired() {
//     inputRequired.prop('required', false);
// }

function addItem(e) {
    e.preventDefault();
    var text = (this.querySelector('[name=item]')).value;
    var item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    setItemToLocalStorage();
    this.reset();
}


function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {//importante añadir en la primera línea `, si no, no pinta//
        return ` 
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join('');
}


function toggleDone(e) {
    if (!e.target.matches('input')) return;
    var el = e.target;
    var index = el.dataset.index;
    items[index].done = !items[index].done;
    setItemToLocalStorage();
    populateList(items, itemsList);
}

function checkAllItems() {
    // notNeedToBeRequired();
    items.map(item => {
        item.done = true;
    })
    setItemToLocalStorage();
    populateList(items, itemsList);
}

function unCheckAllItems() {
    // notNeedToBeRequired();
    items.map(item => {
        item.done = false;
    })
    setItemToLocalStorage();
    populateList(items, itemsList);
}


function removeCheckedItems() {
    items.filter(item => {
        item.done = true;
    })
    removeItemFromLocalStorage();
}
// setItemToLocalStorage();
// populateList(items, itemsList);



addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
checkThemAllBtn.addEventListener('click', checkAllItems);
unCheckThemAllBtn.addEventListener('click', unCheckAllItems);
removeSelectedItemsBtn.addEventListener('click', removeCheckedItems);


populateList(items, itemsList);



