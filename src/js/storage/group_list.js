/* eslint-disable camelcase */
import Component from '../component';

const sidenav = document.querySelector('.sidenav');
M.Sidenav.init(sidenav, {});

class GroupList extends Component {
  init() {
    this.on('count', this.countProductsOnStorage.bind(this), document);
    this.on('renderGroups', this.render.bind(this), document);
  }
  // eslint-disable-next-line class-methods-use-this
  render(groups) {
    // item elements
    const table = document.querySelector('.stripped');
    const docFragment = document.createDocumentFragment();
    const list = document.querySelector('#tbodyStorage');
    list.innerHTML = '';
    // location hash;
    groups.forEach((item) => {
      const trStorageItem = document.createElement('tr');
      const storage_name = document.createElement('td');
      const storage_street = document.createElement('td');
      const storage_description = document.createElement('td');
      const storage_phone = document.createElement('td');
      const storage_schedule = document.createElement('td');
      const storage_product_number = document.createElement('td');
      const icon = document.createElement('a');

      trStorageItem.id = item.id;
      storage_name.innerText = item.name;
      storage_street.innerText = item.street;
      storage_description.innerHTML = item.description.replace(/(.{15})(.)/g, '$1-<br>$2');
      storage_phone.innerText = item.phone;
      storage_schedule.innerText = item.schedule;
      storage_product_number.innerHTML = item.storage_product_number;
      storage_product_number.style.paddingLeft = '50px';
      icon.className = 'destroy';
      icon.addEventListener('click', this.deleteGoods.bind(this));

      trStorageItem.appendChild(storage_name);
      trStorageItem.appendChild(storage_street);
      trStorageItem.appendChild(storage_description);
      trStorageItem.appendChild(storage_phone);
      trStorageItem.appendChild(storage_schedule);
      trStorageItem.appendChild(storage_product_number);
      trStorageItem.appendChild(icon);
      list.appendChild(trStorageItem);
    });
    table.appendChild(docFragment);
  }
  countProductsOnStorage() {
    const products = JSON.parse(localStorage.getItem('userHash'));
    const groups = JSON.parse(localStorage.getItem('groupList'));
    // console.log(groups);
    // const check = storage.filter(item => item.name);
    // console.log(check);
    groups.forEach((store) => {
    // eslint-disable-next-line no-param-reassign
      store.storage_product_number = products.reduce((acc, cur) => {
        if (cur.storage_id === store.id) {
          // console.log(acc);
          // console.log(cur.product_number);
          // console.log(cur.storage_id);
          // console.log(store.id);
          //
          // console.log(acc + cur.product_number)
          return acc + cur.product_number;
        }
        // console.log(acc);
        return acc;
      }, 0);
    });
    localStorage.setItem('groupList', JSON.stringify(groups));
    this.emit('renderGroups', groups, document);
  }
  deleteGoods(e) {
    // console.log(e.currentTarget.parentElement.id);
    const getId = Number(e.currentTarget.parentElement.id);
    // console.log(getId);
    const storage = JSON.parse(localStorage.getItem('groupList'));
    const index = storage.indexOf(storage.find(item => item.id === getId));
    // console.log(index);
    storage.splice(index, 1);
    localStorage.setItem('groupList', JSON.stringify(storage));
    this.emit('renderGroups', storage, document);
  }
}

export default GroupList;
