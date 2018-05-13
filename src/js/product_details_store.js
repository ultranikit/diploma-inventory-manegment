/* eslint-disable camelcase,class-methods-use-this,max-len */
import Component from './component';

class ProductStore extends Component {
  init() {
    this.on('addNewProduct', this.addNewProduct.bind(this), document);
    this.on('editProduct', this.editProduct.bind(this), document);
    this.on('groupAdd', this.groupAdd.bind(this), document);
    this.on('storageEdit', this.groupEdit.bind(this), document);
    this.on('contractorAdd', this.contractorAdd.bind(this), document);
    this.on('contractorEdit', this.contractorEdit.bind(this), document);
  }

  addNewProduct(product) {
    const products = JSON.parse(localStorage.getItem('userHash'));

    function clearOnCreate() {
      const modalAdd = document.querySelector('#modalAdd');
      modalAdd.innerHTML = null;
    }

    products.push(product);
    localStorage.setItem('userHash', JSON.stringify(products));
    clearOnCreate();
    this.emit('reRender', products, document);
  }

  editProduct(product) {
    const products = JSON.parse(localStorage.getItem('userHash'));
    function clearOnUpdate() {
      const modalEdit = document.querySelector('#modalEdit');
      modalEdit.innerHTML = '';
    }

    if (products.find(item => item.user_id === Number(product.user_id))) {
      const index = products.indexOf(products.find(item => item.user_id === Number(product.user_id)));
      // console.log(index);
      products.splice(index, 1);
    }
    products.push(product);
    products.sort((a, b) => a.storage_id - b.storage_id);
    localStorage.setItem('userHash', JSON.stringify(products));
    clearOnUpdate();
    this.emit('renderUserList', products, document);
  }

  groupAdd(group) {
    function clearOnAdd() {
      const modalEdit = document.querySelector('#modalGroupAdd');
      modalEdit.innerHTML = '';
    }

    const groups = JSON.parse(localStorage.getItem('groupList'));
    groups.push(group);
    groups.sort((a, b) => a.id - b.id);
    localStorage.setItem('groupList', JSON.stringify(groups));
    clearOnAdd();
    this.emit('renderGroups', groups, document);
  }

  groupEdit(group) {
    const storage = JSON.parse(localStorage.getItem('groupList'));
    const products = JSON.parse(localStorage.getItem('userHash'));
    const ourStore = storage.find(item => item.id === Number(group.id));
    // console.log(storage);
    function clearOnUpdate() {
      const modalEdit = document.querySelector('#modalStorageEdit');
      modalEdit.innerHTML = '';
    }

    if (ourStore) {
      const index = storage.indexOf(storage.find(item => item.id === Number(group.id)));
      // console.log(index);
      storage.splice(index, 1);
    }
    storage.push(group);
    storage.sort((a, b) => a.id - b.id);
    localStorage.setItem('groupList', JSON.stringify(storage));
    clearOnUpdate();
    products.forEach((item) => {
      if (item.storage_id === ourStore.id) {
      // eslint-disable-next-line no-param-reassign
        item.storage_name = group.name;
      }
    });
    localStorage.setItem('userHash', JSON.stringify(products));
    this.emit('renderGroups', storage, document);
  }
  contractorAdd(contractor) {
    function clearOnAdd() {
      const modalAdd = document.querySelector('#modalContractorAdd');
      modalAdd.innerHTML = '';
    }
    const contractors = JSON.parse(localStorage.getItem('contractorList'));
    contractors.push(contractor);
    contractors.sort((a, b) => a.contractor_id - b.contractor_id);
    localStorage.setItem('contractorList', JSON.stringify(contractors));
    clearOnAdd();
    this.emit('renderContractorList', contractors, document);
  }
  contractorEdit(contractor) {
    function clearOnAdd() {
      const modalEdit = document.querySelector('#modalContractorEdit');
      modalEdit.innerHTML = '';
    }
    const contractors = JSON.parse(localStorage.getItem('contractorList'));
    const ourContractor = contractors.find(item => item.contractor_id === contractor.contractor_id);
    if (ourContractor) {
      const index = contractors.indexOf(contractors.find(item => item.contractor_id === contractor.contractor_id));
      contractors.splice(index, 1);
    }
    contractors.push(contractor);
    contractors.sort((a, b) => a.contractor_id - b.contractor_id);
    localStorage.setItem('contractorList', JSON.stringify(contractors));
    clearOnAdd();
    this.emit('renderContractorList', contractors, document);
  }
}

export default ProductStore;
