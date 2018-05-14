'use strict';

var addItems = document.querySelector('.add-items');
var itemsList = document.querySelector('.plates');
var items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    var text = (this.querySelector('[name=item]')).value;
    var item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}


function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return
        `<li>
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
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}


addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);



