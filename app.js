// Storage Controller 
const StorageCtrl = (function () {


    return {
        getItems: function () {
            let items;

            if (localStorage.getItem('items') !== null) {
                items = JSON.parse(localStorage.getItem('items'));
            } else {
                items = [];
            }

            return items;
        },
        addItem: function (item) {
            let items, itemsString;

            if (localStorage.getItem('items') !== null) {
                // get items from ls
                items = JSON.parse(localStorage.getItem('items'));

            } else {
                items = [];
            }

            // append new item to ls
            items.push(item);

            // convert item to string
            itemsString = JSON.stringify(items);

            // re store items into ls
            localStorage.setItem('items', itemsString);
        },
        updateItem: function (item) {
            let items, itemsString;

            // get items
            items = StorageCtrl.getItems();

            // loop through array
            items.forEach(function (ele, i) {
                if (ele.id === item.id) {
                    items[i] = item;
                }
            });

            // convert to string
            itemsString = JSON.stringify(items);

            // set ls
            localStorage.setItem('items', itemsString);
        },
        deleteItem: function (id) {
            let items, itemsString;

            // get Items
            items = StorageCtrl.getItems();

            // loop through array
            items.forEach(function (ele, i) {
                if (ele.id === id) {
                    items.splice(i, 1);
                }
            });

            // convert to string
            itemsString = JSON.stringify(items);

            // set ls
            localStorage.setItem('items', itemsString);
        },
        clearData: function () {
            localStorage.removeItem('items');
        }
    }
})();

// UI Controller 
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        itemListLI: '#item-list li',
        itemName: '#item-name',
        itemCalories: '#item-calories',
        total: '.total-calories',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn'
    };


    return {
        getUISelectors: function () {
            return UISelectors;
        },
        getInputValues: function () {
            const name = document.querySelector(UISelectors.itemName).value;
            const calories = parseInt(document.querySelector(UISelectors.itemCalories).value);

            return {
                name: name,
                calories: calories
            };
        },
        showItemList: function (list) {
            let html = '';

            // Loop through Array
            list.forEach(element => {
                html += `<li class="collection-item" id="item-${element.id}">
                <strong>${element.name}: </strong> <em>${element.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="item-edit fa fa-pencil"></i>
                </a>
              </li>`;
            });

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        addItem: function (item) {
            let html;

            html = `<li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="item-edit fa fa-pencil"></i>
            </a>
          </li>`;

            document.querySelector(UISelectors.itemList).insertAdjacentHTML('beforeend', html);
        },
        updateTotal: function (total) {
            document.querySelector(UISelectors.total).textContent = total;
        },
        updateItem: function (item) {
            let li, html;

            li = Array.from(document.querySelectorAll(UISelectors.itemListLI));

            html = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="item-edit fa fa-pencil"></i>
            </a>
          `;

            li.forEach(function (ele) {
                if (ele.getAttribute('id') === `item-${item.id}`) {
                    ele.innerHTML = html;
                }
            });

        },
        deleteItem: function (item) {
            let li;

            li = Array.from(document.querySelectorAll(UISelectors.itemListLI));

            li.forEach(function (ele) {
                if (ele.getAttribute('id') === `item-${item}`) {
                    ele.remove();
                }
            });
        },
        clearData: function () {
            let li;

            li = Array.from(document.querySelectorAll(UISelectors.itemListLI));

            li.forEach(function (ele) {
                ele.remove();
            });
        },
        clearInputs: function () {
            document.querySelector(UISelectors.itemName).value = '';
            document.querySelector(UISelectors.itemCalories).value = '';

            document.querySelector(UISelectors.itemName).focus();
        },
        setEditMode: function () {
            document.querySelector(UISelectors.addBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
        },
        setEditModeInputsData: function () {
            let inputData;

            inputData = itemCtrl.getCurrentEditItem();

            document.querySelector(UISelectors.itemName).value = inputData.name;
            document.querySelector(UISelectors.itemCalories).value = inputData.calories;
        },
        setAddMode: function () {
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
        }
    }

})();

// Item Controller 
const itemCtrl = (function (StorageCtrl) {
    // Item Constructor 
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // data strucutre 
    const data = {
        items: StorageCtrl.getItems(),
        totalCalories: 0,
        currentEditItem: null
    };

    return {
        getItems: function () {
            return data.items;
        },
        getItemById: function (id) {
            let item;

            data.items.forEach(function (ele) {
                if (ele.id === id) {
                    item = ele;
                }
            });

            return item;
        },
        addItem: function (name, calories) {
            let ID, newItem;

            calories = parseInt(calories);

            // Set Auto Inc ID
            if (data.items.length === 0) {
                ID = 0;
            } else {
                ID = data.items[data.items.length - 1].id + 1;
            }

            newItem = new Item(ID, name, calories);

            data.items.push(newItem);

            return newItem;
        },
        updateItem: function (item) {
            let index;

            item.id = data.currentEditItem.id;

            data.items.forEach(function (ele, i) {
                if (ele.id === item.id) {
                    index = i;
                }
            });

            data.items[index] = item;

            return item;
        },
        deleteItem: function (index) {
            let deletedId;

            deletedId = data.items[index].id;

            data.items.splice(index, 1);

            return deletedId;
        },
        clearData: function () {
            data.items = [];
            data.currentEditItem = null;
            data.totalCalories = 0;
        },
        getItemIndex: function () {
            let index;

            data.items.findIndex(function (ele, i) {
                if (data.currentEditItem.id === ele.id) {
                    index = i;
                }
            });

            return index;
        },
        setCurrentEditItem: function (item) {
            data.currentEditItem = item;
        },
        getCurrentEditItem: function () {
            return data.currentEditItem
        },
        calcTotal: function () {
            let total = 0;

            data.items.forEach(function (item) {
                total += item.calories;
            });

            return total;
        },
        logData: function () { // FOR TEST PERPOSE
            console.log(data.items);
        }
    }

})(StorageCtrl);

// App Controller 
const App = (function (UICtrl, ItemCtrl, StorageCtrl) {
    const selector = UICtrl.getUISelectors();

    const loadEventListener = function () {
        // Add Item Event
        document.querySelector(selector.addBtn).addEventListener('click', addItem);

        // Edit Item Event
        document.querySelector(selector.itemList).addEventListener('click', editItem);

        // Update Item Event 
        document.querySelector(selector.updateBtn).addEventListener('click', updateItem);

        // Delete Item Evenet 
        document.querySelector(selector.deleteBtn).addEventListener('click', deleteItem);

        // Back Button Event
        document.querySelector(selector.backBtn).addEventListener('click', backBtn);

        // Clear Button Event
        document.querySelector(selector.clearBtn).addEventListener('click', clearBtn);
    }

    // Add Item
    const addItem = function (e) {
        let newItem, total;
        // Get Input Values
        const inputValues = UICtrl.getInputValues();

        // add item to data structure
        newItem = itemCtrl.addItem(inputValues.name, inputValues.calories);

        // calc the total
        total = itemCtrl.calcTotal();

        // add total into UI
        UICtrl.updateTotal(total);

        // add item into UI
        UICtrl.addItem(newItem);

        // add item into storage
        StorageCtrl.addItem(newItem);

        // clear inputs 
        UICtrl.clearInputs();


        e.preventDefault();
    };

    // Edit Item
    const editItem = function (e) {
        let ID, itemId, idArr, item;

        if (e.target.classList.contains('item-edit')) {

            // item id (item-0, item-1)
            itemId = e.target.parentNode.parentNode.id;

            // split string to extract the id
            idArr = itemId.split('-');

            // final id
            ID = parseInt(idArr[1]);

            // returned item
            item = itemCtrl.getItemById(ID);

            // set Edit Mode
            UICtrl.setEditMode();

            // set Data into current edit item
            itemCtrl.setCurrentEditItem(item);

            // set UI input data
            UICtrl.setEditModeInputsData();
        }

        e.preventDefault();
    }

    // Update Item
    const updateItem = function (e) {
        let item, total;

        // get input values 
        item = UICtrl.getInputValues();

        // update data structure 
        item = itemCtrl.updateItem(item);

        // update UI
        UICtrl.updateItem(item);

        // update item in ls
        StorageCtrl.updateItem(item);

        // calc the total
        total = itemCtrl.calcTotal();

        // add total into UI
        UICtrl.updateTotal(total);

        // clear input 
        UICtrl.clearInputs();

        // return to add mode
        UICtrl.setAddMode();

        e.preventDefault();
    }

    // Delete Item
    const deleteItem = function (e) {
        let itemIndex, itemDeletedId, total;

        // get the index 
        itemIndex = itemCtrl.getItemIndex();

        // delete item from data structure
        itemDeletedId = itemCtrl.deleteItem(itemIndex);

        // delete item from UI
        UICtrl.deleteItem(itemDeletedId);

        // delete item from ls
        StorageCtrl.deleteItem(itemDeletedId);

        // calc the total
        total = itemCtrl.calcTotal();

        // add total into UI
        UICtrl.updateTotal(total);

        // clear input 
        UICtrl.clearInputs();

        // return to add mode
        UICtrl.setAddMode();

        e.preventDefault();
    };

    // Back Button
    const backBtn = function (e) {
        // clear input 
        UICtrl.clearInputs();

        // return to add mode
        UICtrl.setAddMode();

        e.preventDefault();
    };

    const clearBtn = function (e) {

        // clear all data from data structur
        itemCtrl.clearData();

        // clear all data from UI
        UICtrl.clearData();

        // add total into UI
        UICtrl.updateTotal(0);

        // clear all data from ls
        StorageCtrl.clearData();

        // clear input 
        UICtrl.clearInputs();

        // return to add mode
        UICtrl.setAddMode();

        e.preventDefault();
    }


    return {
        init: function () {
            let total;

            const items = itemCtrl.getItems();

            // Render all items in HTML
            UICtrl.showItemList(items);

            // set Add Mode
            UICtrl.setAddMode();

            // calc the total
            total = itemCtrl.calcTotal();

            // add total into UI
            UICtrl.updateTotal(total);

            // Load the Events
            loadEventListener();

        }
    }
})(UICtrl, itemCtrl, StorageCtrl);


// Init the app
App.init();