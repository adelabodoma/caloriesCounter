import http from './http';

import itemCtrl from './item';


class Storage {

    baseUrl = 'http://localhost:3000/';

    getItems() {
        itemCtrl.getItems();
    }

    fetchItems(){
        return http.get(`${this.baseUrl}calories`);
    }

    addItem(item) {
        return http.post(`${this.baseUrl}calories`, item);
    }

    updateItem(item) {
        return http.put(`${this.baseUrl}calories/${item.id}`, item);
    }

    deleteItem(id) {
        return http.delete(`${this.baseUrl}calories/${id}`);
    }

    clearData() {
        localStorage.removeItem('items');
    }
}

export default new Storage();