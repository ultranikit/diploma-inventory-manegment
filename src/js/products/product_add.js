/* eslint-disable camelcase,class-methods-use-this */
import Component from '../component';

class ProductAdd extends Component {
  init() {
    const addButton = document.querySelector('#btn-add-user');
    addButton.addEventListener('click', this.openAddModal.bind(this));
    // const trash = document.querySelector('#trash');
    // trash.addEventListener('click', this.trash.bind(this));
  }
  trash() {
    for (let i = 0; i < 20; i += 1) {
      const storage = JSON.parse(localStorage.getItem('groupList'));
      const user_id = Math.round(Math.random() * 10000);
      const storage_id = Math.round(Math.random() * 10);
      const vendor_code = Math.round(Math.random() * 1000);
      const product_name = String('kavo') + String(Math.round(Math.random() * 1000));
      const product_number = Math.round(Math.random() * 100);
      let storage_name = '';
      storage.forEach((item) => {
        if (item.id === storage_id) {
          storage_name = item.name;
        }
      });
      const data = {
        user_id,
        storage_id,
        vendor_code,
        product_name,
        product_number,
        storage_name,
      };
      this.emit('addNewProduct', data, document);
    }
  }
  addNewProduct() {
    const user_id = Math.round(Math.random() * 1000);
    const vendor_code = document.querySelector('#vendor_code').value;
    // const contractor = document.querySelector('#contractor').value;
    const product_name = document.querySelector('#product_name').value;
    let product_number = document.querySelector('#product_number').value;
    product_number = Number(product_number);
    const group = document.querySelector('#modalAdd').querySelector('.storage').querySelector('.selected');
    const storage = JSON.parse(localStorage.getItem('groupList'));

    const find_group = storage.find(item => item.name === group.innerText);
    // const contractor = find_contractor.contractor_name;
    const storage_id = find_group.id;
    const storage_name = find_group.name;

    const data = {
      user_id,
      storage_id,
      vendor_code,
      // contractor,
      product_name,
      product_number,
      storage_name,
    };
    this.emit('addNewProduct', data, document);
  }
  openAddModal() {
    const modalAdd = document.querySelector('#modalAdd');
    modalAdd.innerHTML +=
      '  <div class="modal-content">\n' +
      '    <h4>Добавить новый торар</h4>\n' +
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
      '            <select id="group_select">\n' +
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
      '    <a id="createUser" class="modal-action modal-close waves-effect waves-green btn-flat">Добавить</a>\n' +
      '  </div>\n';

    const createBtn = document.querySelector('#createUser');
    const modal = document.querySelector('#modalAdd');
    const select_group = document.querySelector('#group_select');
    const storage = JSON.parse(localStorage.getItem('groupList'));

    storage.forEach((store) => {
      select_group.innerHTML += `<option value="${store.id}">${store.name}</option>`;
    });
    const instance = M.Modal.init(modal, {});
    M.FormSelect.init(select_group, {});
    instance.open();
    const modalClick = document.querySelector('.modal-content');
    // modal CLICK
    const storageSelect = document.querySelector('.selected');
    if (storageSelect.innerText === 'Выбирете склад') {
      createBtn.setAttribute('disabled', '');
    }
    modal.style.maxHeight = '90%';
    modal.style.height = '88%';
    const clearOnOverlay = document.querySelector('.modal-overlay');
    const clearOnButton = document.querySelector('#modalAdd').querySelector('.modal-close');

    modalClick.addEventListener('click', this.checkValid.bind(this));
    clearOnOverlay.addEventListener('click', this.clearModal.bind(this));
    clearOnButton.addEventListener('click', this.clearModal.bind(this));
    createBtn.addEventListener('click', this.addNewProduct.bind(this));
  }
  checkValid() {
    const createButton = document.querySelector('#createUser');
    const storageSelect = document.querySelector('.selected');
    if (storageSelect.innerText === 'Выбирете склад') {
      createButton.setAttribute('disabled', '');
    } else {
      createButton.removeAttribute('disabled');
    }
  }
  clearModal() {
    const modalAdd = document.querySelector('#modalAdd');
    modalAdd.innerHTML = null;
  }
}

export default ProductAdd;
