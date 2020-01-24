import itemCtrl from './item';

class UICtrl {

    UISelectors = {
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
    }

    getUISelectors() {
        return this.UISelectors;
    }

    getInputValues() {
        const name = document.querySelector(this.UISelectors.itemName).value;
        const calories = parseInt(document.querySelector(this.UISelectors.itemCalories).value);

        return {
            name: name,
            calories: calories
        };
    }

    showItemList(list) {
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

        document.querySelector(this.UISelectors.itemList).innerHTML = html;
    }

    addItem(item) {
        let html;

        html = `<li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="item-edit fa fa-pencil"></i>
                    </a>
                </li>`;

        document.querySelector(this.UISelectors.itemList).insertAdjacentHTML('beforeend', html);
    }

    updateTotal(total) {
        document.querySelector(this.UISelectors.total).textContent = total;
    }

    updateItem(item) {
        let li, html;

        li = Array.from(document.querySelectorAll(this.UISelectors.itemListLI));

        html = `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="item-edit fa fa-pencil"></i>
                    </a>
                `;

        li.forEach((ele) =>{
            if (ele.getAttribute('id') === `item-${item.id}`) {
                ele.innerHTML = html;
            }
        });

    }

    deleteItem(item) {
        let li;

        li = Array.from(document.querySelectorAll(this.UISelectors.itemListLI));

        li.forEach((ele) =>{
            if (ele.getAttribute('id') === `item-${item}`) {
                ele.remove();
            }
        });
    }

    clearData() {
        let li;

        li = Array.from(document.querySelectorAll(this.UISelectors.itemListLI));

        li.forEach((ele) =>{
            ele.remove();
        });
    }

    clearInputs() {
        document.querySelector(this.UISelectors.itemName).value = '';
        document.querySelector(this.UISelectors.itemCalories).value = '';

        document.querySelector(this.UISelectors.itemName).focus();
    }

    setEditMode() {
        document.querySelector(this.UISelectors.addBtn).style.display = 'none';
        document.querySelector(this.UISelectors.updateBtn).style.display = 'inline';
        document.querySelector(this.UISelectors.deleteBtn).style.display = 'inline';
        document.querySelector(this.UISelectors.backBtn).style.display = 'inline';
    }

    setEditModeInputsData() {
        let inputData;

        inputData = itemCtrl.getCurrentEditItem();

        document.querySelector(this.UISelectors.itemName).value = inputData.name;
        document.querySelector(this.UISelectors.itemCalories).value = inputData.calories;
    }

    setAddMode() {
        document.querySelector(this.UISelectors.addBtn).style.display = 'inline';
        document.querySelector(this.UISelectors.updateBtn).style.display = 'none';
        document.querySelector(this.UISelectors.deleteBtn).style.display = 'none';
        document.querySelector(this.UISelectors.backBtn).style.display = 'none';
    }

}

export default new UICtrl();

 