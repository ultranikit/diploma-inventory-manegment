/* eslint-disable class-methods-use-this,camelcase */
import Component from '../component';

class StorageEdit extends Component {
  init() {
    this.editButton = document.querySelector('#tbodyStorage');
    this.editButton.addEventListener('dblclick', this.openEditModal.bind(this));
  }
  storageEdit() {
    let storage_id = document.querySelector('#storage_edit_id').innerHTML;
    storage_id = Number(storage_id);

    const storage_name = document.querySelector('#storage_name').value;
    const storage_street = document.querySelector('#storage_street').value;
    const storage_description = document.querySelector('#storage_description').value;
    const storage_phone = document.querySelector('#storage_phone').value;
    const storage_schedule = document.querySelector('#storage_schedule').value;
    // const number_products = document.querySelector('#all_products').value;
    const storage = JSON.parse(localStorage.getItem('groupList'));

    const findOurStorage = storage.find(item => item.id === storage_id);
    const number_products = findOurStorage.storage_product_number;

    const data = {
      id: storage_id,
      name: storage_name,
      street: storage_street,
      description: storage_description,
      phone: storage_phone,
      schedule: storage_schedule,
      storage_product_number: number_products,
    };
    this.emit('storageEdit', data, document);
  }

  openEditModal(e) {
    const modalStorageEdit = document.querySelector('#modalStorageEdit');
    modalStorageEdit.innerHTML +=
      '  <div class="modal-content">\n' +
      '    <h4>Редактировать склад</h4>\n' +
      '<div id="storage_edit_id" hidden></div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="storage_name" type="text" class="validate">\n' +
      '            <label for="storage name" data-error="wrong" data-success="right">Название склада</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="storage_street" type="text" class="validate">\n' +
      '            <label for="Адрес" data-error="wrong" data-success="right">Адрес</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12">\n' +
      '            <input id="storage_description" type="text" class="validate">\n' +
      '            <label for="storage name" data-error="wrong" data-success="right">Описание</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12">\n' +
      '            <input id="storage_phone" type="text" class="validate">\n' +
      '            <label for="Телефон" data-error="wrong" data-success="right">Телефон</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="storage_schedule" type="text" class="validate">\n' +
      '            <label for="График" data-error="wrong" data-success="right">График работы</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="all_products" type="text" class="validate" disabled>\n' +
      '            <label for="number" style="color: #4CAF50">Всего товаров</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12 showProductsStorage">\n' +
      '          </div>\n' +
      '        </div>\n' +
      '  <div class="modal-footer" style="width: 90%;position: fixed">\n' +
      '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Закрыть</a>\n' +
      '    <a id="storageUpdate" class="modal-action modal-close waves-effect waves-green btn-flat">Обновить</a>\n' +
      '  </div>\n';

    const updateBtn = document.querySelector('#storageUpdate');
    const storage_id = document.querySelector('#storage_edit_id');

    const storage_name = document.querySelector('#storage_name');
    const storage_street = document.querySelector('#storage_street');
    const storage_description = document.querySelector('#storage_description');
    const storage_phone = document.querySelector('#storage_phone');
    const storage_schedule = document.querySelector('#storage_schedule');
    const number_products = document.querySelector('#all_products');
    const storage = JSON.parse(localStorage.getItem('groupList'));
    const products = JSON.parse(localStorage.getItem('userHash'));
    const productsOnStorage = document.querySelector('.showProductsStorage');

    const instance = M.Modal.init(modalStorageEdit, {});
    instance.open();

    modalStorageEdit.style.maxHeight = '90%';
    modalStorageEdit.style.height = '88%';
    const obj = storage.find(store => store.id === Number(e.target.parentElement.id));
    // console.log(obj);

    storage_name.classList.add('valid');
    storage_name.nextElementSibling.className = 'active';

    storage_street.classList.add('valid');
    storage_street.nextElementSibling.className = 'active';

    storage_description.classList.add('valid');
    storage_description.nextElementSibling.className = 'active';

    storage_phone.classList.add('valid');
    storage_phone.nextElementSibling.className = 'active';

    storage_schedule.classList.add('valid');
    storage_schedule.nextElementSibling.className = 'active';

    number_products.classList.add('valid');
    number_products.nextElementSibling.className = 'active';

    storage_id.innerText = obj.id;
    storage_name.value = obj.name;
    storage_street.value = obj.street;
    storage_description.value = obj.description;
    storage_phone.value = obj.phone;
    storage_schedule.value = obj.schedule;
    number_products.value = `Всего на складе : ${obj.storage_product_number}`;

    productsOnStorage.innerHTML +=
     '<table class="">\n' +
      '    <thead id="showProducts">    <tr>\n' +
      '      <th>Артикул</th>\n' +
      '      <th>Наименование товара</th>\n' +
      '      <th>Склад</th>\n' +
      '      <th>Общее количество</th>\n' +
      '    </tr> </thead>';
    const insertProducts = document.querySelector('#showProducts');

    products.forEach((item) => {
      if (obj.id === item.storage_id) {
        insertProducts.innerHTML +=
          `<tr><td>${item.vendor_code}</td>
               <td>${item.product_name}</td>
               <td>${item.storage_name}</td>
               <td style="padding-left: 50px">${item.product_number}</td>
          </tr>`;
      }
    });
    if (insertProducts.children.length === 1) {
      insertProducts.setAttribute('hidden', '');
    }
    const clearOnOverlay = document.querySelector('.modal-overlay');
    const clearOnButton = document.querySelector('#modalStorageEdit').querySelector('.modal-close');

    updateBtn.addEventListener('click', this.storageEdit.bind(this));
    clearOnOverlay.addEventListener('click', this.clearModal.bind(this));
    clearOnButton.addEventListener('click', this.clearModal.bind(this));
  }
  clearModal() {
    const modalEdit = document.querySelector('#modalStorageEdit');
    modalEdit.innerHTML = null;
  }
}
export default StorageEdit;
