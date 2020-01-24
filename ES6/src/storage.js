import http from './http';

import itemCtrl from './item';


class Storage {

    getItems() {
        itemCtrl.getItems();
    }

    fetchItems(){
        return http.get('http://localhost:3000/calories');
    }

    addItem(item) {
        return http.post('http://localhost:3000/calories', item);
    }

    updateItem(item) {
        return http.put(`http://localhost:3000/calories/${item.id}`, item);
    }

    deleteItem(id) {
        // let items, itemsString;

        // // get Items
        // items = itemCtrl.getItems();

        // // loop through array
        // items.forEach((ele, i) =>{
        //     if (ele.id === id) {
        //         items.splice(i, 1);
        //     }
        // });

        // // convert to string
        // itemsString = JSON.stringify(items);

        // // set ls
        // localStorage.setItem('items', itemsString);

        return http.delete(`http://localhost:3000/calories/${id}`);

    }

    clearData() {
        localStorage.removeItem('items');
    }
}

export default new Storage();