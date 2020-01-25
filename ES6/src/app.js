import UICtrl from './ui';
import StorageCtrl from './storage';
import itemCtrl from './item';


class App {
    
    selector = UICtrl.getUISelectors();

    loadEventListener() {
        // Add Item Event
        document.querySelector(this.selector.addBtn).addEventListener('click', this.addItem);

        // Edit Item Event
        document.querySelector(this.selector.itemList).addEventListener('click', this.editItem);

        // Update Item Event 
        document.querySelector(this.selector.updateBtn).addEventListener('click', this.updateItem);

        // Delete Item Evenet 
        document.querySelector(this.selector.deleteBtn).addEventListener('click', this.deleteItem);

        // Back Button Event
        document.querySelector(this.selector.backBtn).addEventListener('click', this.backBtn);

        // Clear Button Event
        document.querySelector(this.selector.clearBtn).addEventListener('click', this.clearBtn);
    }

    // Add Item
    addItem(e) {
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
        StorageCtrl.addItem(newItem).then(() => {

        }).catch(err => {
            console.log(err);
        });

        // clear inputs 
        UICtrl.clearInputs();


        e.preventDefault();
    };

    // Edit Item
    editItem(e) {
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
    updateItem(e) {
        let item, total;

        // get input values 
        item = UICtrl.getInputValues();

        // update data structure 
        item = itemCtrl.updateItem(item);

        // update UI
        UICtrl.updateItem(item);

        // update item in ls
        StorageCtrl.updateItem(item).then(() => { }).catch(err => console.log(err));

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
    deleteItem(e) {
        let itemIndex, itemDeletedId, total;

        // get the index 
        itemIndex = itemCtrl.getItemIndex();

        // delete item from data structure
        itemDeletedId = itemCtrl.deleteItem(itemIndex);

        // delete item from UI
        UICtrl.deleteItem(itemDeletedId);

        // delete item from ls
        StorageCtrl.deleteItem(itemDeletedId).then(() => { }).catch(err => console.log(err));

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
    backBtn(e) {
        // clear input 
        UICtrl.clearInputs();

        // return to add mode
        UICtrl.setAddMode();

        e.preventDefault();
    };

    clearBtn(e) {

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


    init() {
        let total;


        const items = StorageCtrl.fetchItems().then(data => {

            // Set Data Items
            itemCtrl.setDataItems(data);

            // Render all items in HTML
            UICtrl.showItemList(data);

            // set Add Mode
            UICtrl.setAddMode();

            // calc the total
            total = itemCtrl.calcTotal();

            // add total into UI
            UICtrl.updateTotal(total);

            // Load the Events
            this.loadEventListener();
        });


    }
}


const init = new App().init();