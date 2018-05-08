/* eslint-disable camelcase,prefer-destructuring,class-methods-use-this */
import Component from '../component';

class ProductEdit extends Component {
  init() {
    this.editButton = document.querySelector('#tbodyUser');
    this.editButton.addEventListener('dblclick', this.openEditModal.bind(this));
  }

  editProduct() {
    let user_id = Number(document.querySelector('#user_edit_id').innerText);
    const vendor_code = document.querySelector('#vendor_code').value;
    // const contractor = document.querySelector('#contractor').value;
    const product_name = document.querySelector('#product_name').value;
    let product_number = document.querySelector('#product_number').value;
    const product_number_move = document.querySelector('#product_number').value;
    // const check = product_number;

    product_number = Number(this.check - product_number);
    const products = JSON.parse(localStorage.getItem('userHash'));
    const group = document.querySelector('#modalEdit').querySelector('.storage').querySelector('.selected');
    const storage = JSON.parse(localStorage.getItem('groupList'));
    const findProduct = products.find(product => product.user_id === user_id);
    const find_group = storage.find(item => item.name === group.innerText);
    const check_storage_id = find_group.id;
    let storage_id = findProduct.storage_id;
    let storage_name = findProduct.storage_name;

    if (findProduct.storage_id === check_storage_id) {
      product_number = Number(product_number_move);
    }

    console.log(this.check);
    const data = {
      user_id,
      storage_id,
      vendor_code,
      // contractor,
      product_name,
      product_number,
      storage_name,
    };

    const findProductNew = products.find(product => (product.storage_name === find_group.name && product.product_name === product_name));
    if (findProductNew) {
      console.log(findProductNew);
      product_number = Number(product_number_move) + findProductNew.product_number;
      this.dataMoveProduct = {
        user_id: findProductNew.user_id,
        storage_id: findProductNew.storage_id,
        vendor_code: findProductNew.vendor_code,
        product_name,
        product_number,
        storage_name: findProductNew.storage_name,
      };
      this.emit('editProduct', this.dataMoveProduct, document);
    } else if (findProduct.storage_id !== check_storage_id) {
      user_id = Math.max(...products.map(item => item.user_id)) + 1;
      storage_id = check_storage_id;
      storage_name = find_group.name;
      product_number = Number(product_number_move);
      this.dataMoveProduct = {
        user_id,
        storage_id,
        vendor_code,
        // contractor,
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
      // '          <div class="input-field col s6 contractor">\n' +
      // '            <select id="contractor_group_select">\n' +
      // '              <option value="" disabled selected>Выбирете поставщика</option>\n' +
      // '            </select>\n' +
      // '            <label>Поставщик</label>\n' +
      // '          </div>\n' +
      // '        </div>\n' +
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
      '  <div class="modal-footer">\n' +
      '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Закрыть</a>\n' +
      '    <a id="EditUser" class="modal-action modal-close waves-effect waves-green btn-flat">Обновить</a>\n' +
      '  </div>';

    const updateBtn = document.querySelector('#EditUser');
    const user_id = document.querySelector('#user_edit_id');
    const vendor_code = document.querySelector('#vendor_code');
    // const contractor = document.querySelector('#contractor');
    const product_name = document.querySelector('#product_name');
    const product_number = document.querySelector('#product_number');

    const products = JSON.parse(localStorage.getItem('userHash'));
    const storage = JSON.parse(localStorage.getItem('groupList'));
    // modal open
    const modal_edit = document.querySelector('#modalEdit');
    const select_group_edit = document.querySelector('#group_select_edit');
    // const groupChange = select_group_edit.querySelector('option');

    storage.forEach((store) => {
      select_group_edit.innerHTML += `<option value="${store.id}">${store.name}</option>`;
    });
    const instance = M.Modal.init(modal_edit, {});
    M.FormSelect.init(select_group_edit, {});
    // M.FormSelect.init(contractor_select_group, {});
    instance.open();


    const clickInModal = document.querySelector('.modal-content');
    // modal CLICK
    clickInModal.addEventListener('click', this.checkUpdateBtn.bind(this));
    const storageSelect = document.querySelector('.selected');
    if (storageSelect.innerText === 'Выбирете склад') {
      updateBtn.setAttribute('disabled', '');
    }
    // const group_disable = document.querySelector('.select-wrapper').children[0];
    const obj = products.find(product => product.user_id === Number(e.target.parentElement.id));
    console.log(obj);

    vendor_code.classList.add('valid');
    vendor_code.nextElementSibling.className = 'active';

    // contractor.classList.add('valid');
    // contractor.nextElementSibling.className = 'active';

    product_name.classList.add('valid');
    product_name.nextElementSibling.className = 'active';

    product_number.classList.add('valid');
    product_number.nextElementSibling.className = 'active';

    user_id.innerText = obj.user_id;
    vendor_code.value = obj.vendor_code;
    // contractor.value = obj.contractor;
    product_name.value = obj.product_name;
    product_number.value = obj.product_number;

    this.check = Number(product_number.value);


    // const admin_check = groups.find(group => group.group_id === obj.group_id);
    // console.log(admin_check);
    // if (admin_check.is_admin) {
    //   credit_input.disabled = true;
    // }

    // if (obj.credits === 0) {
    //   edit_name.disabled = true;
    //   edit_last_name.disabled = true;
    //   edit_street.disabled = true;
    //   edit_zip_code.disabled = true;
    //   edit_city.disabled = true;
    //   edit_phone.disabled = true;
    //   group_disable.disabled = true;
    //   credit_input.disabled = true;
    //   updateBtn.setAttribute('disabled', '');
    // }
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
    console.log(storageSelect.innerText);
    if (storageSelect.innerText === 'Выбирете склад') {
      editBtn.setAttribute('disabled', '');
    } else {
      editBtn.removeAttribute('disabled');
    }
  }
}

export default ProductEdit;
