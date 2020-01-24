import { Calory } from './calory';

class Item {
    // data strucutre 
    data = {
        items: [],
        totalCalories: 0,
        currentEditItem: null
    };

    getItems() {
        return this.data.items;
    }

    setDataItems(items) {
        this.data.items = [...items];
    }

    getItemById(id) {
        let item;

        this.data.items.forEach(ele => {
            if (ele.id === id) {
                item = ele;
            }
        });

        return item;
    }

    addItem(name, calories) {
        let ID, newItem;

        calories = parseInt(calories);

        // Set Auto Inc ID
        if (this.data.items.length === 0) {
            ID = 0;
        } else {
            ID = this.data.items[this.data.items.length - 1].id + 1;
        }

        newItem = new Calory(ID, name, calories);

        this.data.items.push(newItem);

        return newItem;
    }

    updateItem(item) {
        let index;

        item.id = this.data.currentEditItem.id;

        this.data.items.forEach((ele, i) => {
            if (ele.id === item.id) {
                index = i;
            }
        });

        this.data.items[index] = item;

        return item;
    }

    deleteItem(index) {
        let deletedId;

        deletedId = this.data.items[index].id;

        this.data.items.splice(index, 1);

        return deletedId;
    }

    clearData() {
        this.data.items = [];
        this.data.currentEditItem = null;
        this.data.totalCalories = 0;
    }

    getItemIndex() {
        let index;

        this.data.items.findIndex((ele, i) => {
            if (this.data.currentEditItem.id === ele.id) {
                index = i;
            }
        });

        return index;
    }

    setCurrentEditItem(item) {
        this.data.currentEditItem = item;
    }

    getCurrentEditItem() {
        return this.data.currentEditItem
    }

    calcTotal() {
        let total = 0;

        this.data.items.forEach((item) => {
            total += item.calories;
        });

        return total;
    }

    logData() { // FOR TEST PERPOSE
        console.log(data.items);
    }
}

export default new Item();