import Component from './component';

class AllData extends Component {
  init() {
    this.on('reRender', this.ReRender.bind(this));
    this.on('DOMContentLoaded', this.loadStorage.bind(this));
    this.on('socket', this.webSocket.bind(this));
  }
  loadStorage() {
    if (localStorage.getItem('userHash') !== null) {
      this.products = JSON.parse(localStorage.getItem('userHash'));
      this.groups = JSON.parse(localStorage.getItem('groupList'));
      this.contracors = JSON.parse(localStorage.getItem('contractorList'));
      this.entryDocuments = JSON.parse(localStorage.getItem('allDocuments'));
      this.products.sort((a, b) => a.product_name.localeCompare(b.product_name));
      this.ClearSelectedMenu();
      // id = JSON.parse(localStorage.getItem('id'));
      this.emit('renderUserList', this.products, document);
      // this.emit('renderGroups', this.groups, document);
    } else {
      this.ClearSelectedMenu();
      this.products = [{
        product_name: 'tov1', product_number: 21, storage_id: 2, storage_name: 'sklad 2', user_id: 334, vendor_code: '1231',
      },
      {
        product_name: 'tov2', product_number: 22, storage_id: 3, storage_name: 'sklad 3', user_id: 34, vendor_code: '1231',
      },
      {
        product_name: 'tov3', product_number: 23, storage_id: 3, storage_name: 'sklad 3', user_id: 3324, vendor_code: '1231',
      },
      {
        product_name: 'tov4', product_number: 45, storage_id: 3, storage_name: 'sklad 3', user_id: 33224, vendor_code: '1231',
      }];

      this.storage = [{
        id: 1, name: 'sklad 1', street: 'xoxlova', description: 'some description of your shop', phone: '+389292', schedule: 'c пн-пт', storage_product_number: 0,
      },
      {
        id: 2, name: 'sklad 2', street: 'xoxlova', description: 'some description of your shop', phone: '+389292', schedule: 'c пн-пт', storage_product_number: 0,
      },
      {
        id: 3, name: 'sklad 3', street: 'xoxlova', description: 'some description of your shop', phone: '+389292', schedule: 'c пн-пт', storage_product_number: 0,
      },
      {
        id: 4, name: 'sklad 4', street: 'xoxlova', description: 'some description of your shop', phone: '+389292', schedule: 'c пн-пт', storage_product_number: 0,
      }];

      this.contracors = [{
        contractor_id: 1, contractor_name: 'Best One', contractor_email: 'contractor@gmail.com', contractor_phone: '+380932244130', contractor_inn: '123213', contractor_kpp: '123456789', contractor_address: 'salyutna street',
      }];

      this.products.sort((a, b) => a.product_name.localeCompare(b.product_name));
      localStorage.setItem('userHash', JSON.stringify(this.products));
      this.storage.sort((a, b) => a.id - b.id);
      localStorage.setItem('groupList', JSON.stringify(this.storage));
      this.contracors.sort((a, b) => a.user_id - b.user_id);
      localStorage.setItem('contractorList', JSON.stringify(this.contracors));
      this.emit('renderUserList', this.products, document);
      // this.emit('socket', this.products, document);
    }
  }
  webSocket() {
    // this.products = [{
    // }];
    fetch('storage.txt')
      .then(response => response.text())
      .then((storage) => {
        // console.log(users);
        this.groups = JSON.parse(storage);
        this.groups.sort((a, b) => a.id - b.id);
        localStorage.setItem('groupList', JSON.stringify(this.groups));
        // this.emit('count', this.groups, document);
      });
    fetch('goods.txt')
      .then(response => response.text())
      .then((users) => {
        // console.log(users);
        this.products = JSON.parse(users);
        this.products.sort((a, b) => a.product_name.localeCompare(b.product_name));
        localStorage.setItem('userHash', JSON.stringify(this.products));
        // console.log(this.products);
        this.emit('renderUserList', this.products, document);
      });
    fetch('contractors.txt')
      .then(response => response.text())
      .then((contractor) => {
        // console.log(users);
        this.contracors = JSON.parse(contractor);
        this.contracors.sort((a, b) => a.user_id - b.user_id);
        localStorage.setItem('contractorList', JSON.stringify(this.contracors));
        // console.log(this.products);
        // this.emit('renderContractorList', this.products, document);
      });
  }
  ReRender(users) {
    this.products = users;
    this.emit('renderUserList', this.products, document);
  }
  // eslint-disable-next-line class-methods-use-this
  ClearSelectedMenu() {
    const additionUl = document.querySelector('#docList');
    const groupLength = document.querySelector('#filters');
    for (let i = 0; i < groupLength.children.length; i += 1) {
      groupLength.children[i].style.backgroundColor = 'transparent';
      groupLength.children[i].className = ''; // clear class active for all group list;
    }
    for (let i = 0; i < additionUl.childElementCount; i += 1) {
      additionUl.children[i].style.backgroundColor = 'transparent';
      additionUl.children[i].className = '';
    }
  }
}

export default AllData;

function download(content, fileName, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const saveGoodsButton = document.querySelector('#save_data');
saveGoodsButton.addEventListener('click', () => {
  const users = localStorage.getItem('userHash');
  download(users, 'goods.txt', 'text/plain');
});
const saveStorageButton = document.querySelector('#save_storage');
saveStorageButton.addEventListener('click', () => {
  const groups = localStorage.getItem('groupList');
  download(groups, 'storage.txt', 'text/plain');
});
