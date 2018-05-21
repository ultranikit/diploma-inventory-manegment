/* eslint-disable camelcase,prefer-destructuring,class-methods-use-this,max-len,no-param-reassign */
import Component from '../component';

class ProductEdit extends Component {
  init() {
    this.editButton = document.querySelector('#tbodyUser');
    this.editButton.addEventListener('dblclick', this.openEditModal.bind(this));
  }

  editProduct() {
    let product_id = Number(document.querySelector('#user_edit_id').innerText);
    const vendor_code = document.querySelector('#vendor_code').value;
    const product_name = document.querySelector('#product_name').value;
    let product_number = document.querySelector('#product_number').value;
    const product_number_move = document.querySelector('#product_number').value;

    product_number = Number(this.check - product_number);
    let products = JSON.parse(localStorage.getItem('userHash'));
    const group = document.querySelector('#modalEdit').querySelector('.storage').querySelector('.selected');
    const storage = JSON.parse(localStorage.getItem('groupList'));
    const findProduct = products.find(product => product.product_id === product_id);
    const find_group = storage.find(item => item.name === group.innerText);
    const check_storage_id = find_group.id;
    let storage_id = findProduct.storage_id;
    let storage_name = findProduct.storage_name;

    const documentList = JSON.parse(localStorage.getItem('allDocuments'));
    // console.log(product_name);
    // console.log(this.oldProdName);
    documentList.forEach((item) => {
      if (item.product_name === this.oldProdName) {
        item.product_name = product_name;
      }
    });
    localStorage.setItem('allDocuments', JSON.stringify(documentList));
    products.forEach((item) => {
      if (item.product_name === this.oldProdName) {
        item.product_name = product_name;
      }
    });
    localStorage.setItem('userHash', JSON.stringify(products));
    products = JSON.parse(localStorage.getItem('userHash'));
    if (findProduct.storage_id === check_storage_id) {
      product_number = Number(product_number_move);
    }

    // console.log(this.check);
    const data = {
      product_id,
      storage_id,
      vendor_code,
      product_name,
      product_number,
      storage_name,
    };

    const findProductNew = products.find(product => (product.storage_name === find_group.name && product.product_name === product_name));
    if (findProductNew) {
      // console.log(findProductNew);
      product_number = Number(product_number_move) + findProductNew.product_number;
      this.dataMoveProduct = {
        product_id: findProductNew.product_id,
        storage_id: findProductNew.storage_id,
        vendor_code: findProductNew.vendor_code,
        product_name,
        product_number,
        storage_name: findProductNew.storage_name,
      };
      this.emit('editProduct', this.dataMoveProduct, document);
    } else if (findProduct.storage_id !== check_storage_id) {
      product_id = Math.max(...products.map(item => item.product_id)) + 1;
      storage_id = check_storage_id;
      storage_name = find_group.name;
      product_number = Number(product_number_move);
      this.dataMoveProduct = {
        product_id,
        storage_id,
        vendor_code,
        product_name,
        product_number,
        storage_name,
      };
      this.emit('editProduct', this.dataMoveProduct, document);
    }

    this.emit('editProduct', data, document);
  }
  openEditModal(e) {
    const modalEdit = document.querySelector('#modalEdit');
    modalEdit.innerHTML +=
      '<div class="modal-content">\n' +
      '    <div id="user_edit_id" hidden></div>\n' +
      '    <h4>Редактировать товар</h4>\n' +
      '    <div class="row">\n' +
      '      <form class="col s12">\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="vendor_code" type="text" class="validate">\n' +
      '            <label for="Артикул" data-error="wrong" data-success="right">Артикул</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12">\n' +
      '            <input id="product_name" type="text" class="validate">\n' +
      '            <label for="Наименование товара" data-error="wrong" data-success="right">Наименование товара</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12 storage">\n' +
      '            <select id="group_select_edit">\n' +
      '              <option value="" disabled selected>Выбирете склад</option>\n' +
      '            </select>\n' +
      '            <label>Склад</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="product_number" type="text" class="validate">\n' +
      '            <label for="number" data-error="wrong" data-success="right">Количество товара</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </form>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '  <div class="modal-footer" style="width: 90%;position: fixed">\n' +
      '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Закрыть</a>\n' +
      '    <a id="EditUser" class="modal-action modal-close waves-effect waves-green btn-flat">Обновить</a>\n' +
      '  </div>';

    const updateBtn = document.querySelector('#EditUser');
    const product_id = document.querySelector('#user_edit_id');
    const vendor_code = document.querySelector('#vendor_code');
    const product_name = document.querySelector('#product_name');
    const product_number = document.querySelector('#product_number');

    const products = JSON.parse(localStorage.getItem('userHash'));
    const storage = JSON.parse(localStorage.getItem('groupList'));
    // modal open
    const modal_edit = document.querySelector('#modalEdit');
    const select_group_edit = document.querySelector('#group_select_edit');

    storage.forEach((store) => {
      select_group_edit.innerHTML += `<option value="${store.id}">${store.name}</option>`;
    });
    const instance = M.Modal.init(modal_edit, {});
    M.FormSelect.init(select_group_edit, {});
    instance.open();


    const clickInModal = document.querySelector('.modal-content');
    // modal CLICK
    clickInModal.addEventListener('click', this.checkUpdateBtn.bind(this));
    const storageSelect = document.querySelector('.selected');
    if (storageSelect.innerText === 'Выбирете склад') {
      updateBtn.setAttribute('disabled', '');
    }
    const obj = products.find(product => product.product_id === Number(e.target.parentElement.id));

    this.oldProdName = obj.product_name;
    console.log(this.oldProdName);

    vendor_code.classList.add('valid');
    vendor_code.nextElementSibling.className = 'active';

    product_name.classList.add('valid');
    product_name.nextElementSibling.className = 'active';

    product_number.classList.add('valid');
    product_number.nextElementSibling.className = 'active';

    product_id.innerText = obj.product_id;
    vendor_code.value = obj.vendor_code;
    product_name.value = obj.product_name;
    product_number.value = obj.product_number;

    this.check = Number(product_number.value);
    const clearOnOverlay = document.querySelector('.modal-overlay');
    const clearOnButton = document.querySelector('#modalEdit').querySelector('.modal-close');

    clearOnOverlay.addEventListener('click', this.clearModal.bind(this));
    clearOnButton.addEventListener('click', this.clearModal.bind(this));
    updateBtn.addEventListener('click', this.editProduct.bind(this));
  }
  // eslint-disable-next-line class-methods-use-this
  clearModal() {
    const modalEdit = document.querySelector('#modalEdit');
    modalEdit.innerHTML = null;
  }
  checkUpdateBtn() {
    const storageSelect = document.querySelector('.selected');
    const editBtn = document.querySelector('#EditUser');
    // console.log(storageSelect.innerText);
    if (storageSelect.innerText === 'Выбирете склад') {
      editBtn.setAttribute('disabled', '');
    } else {
      editBtn.removeAttribute('disabled');
    }
  }
}

export default ProductEdit;
