/* eslint-disable camelcase */
import Component from '../component';

const groupAddButton = document.querySelector('#btn-add-group');

class GroupAdd extends Component {
  init() {
    groupAddButton.addEventListener('click', this.openAddModal.bind(this));
  }
  groupAdd() {
    const storage_name = document.querySelector('#storage_name').value;
    const storage_street = document.querySelector('#storage_street').value;
    const storage_description = document.querySelector('#storage_description').value;
    const storage_phone = document.querySelector('#storage_phone').value;
    const storage_schedule = document.querySelector('#storage_schedule').value;
    const storage = JSON.parse(localStorage.getItem('groupList'));
    let storage_id = Math.max(...storage.map(item => item.id));
    storage_id += 1;
    // console.log(storage_id);
    const data = {
      id: storage_id,
      name: storage_name,
      street: storage_street,
      description: storage_description,
      phone: storage_phone,
      schedule: storage_schedule,
      storage_product_number: 0,
    };
    this.emit('groupAdd', data, document);
  }
  openAddModal() {
    const modalGroupAdd = document.querySelector('#modalGroupAdd');
    modalGroupAdd.innerHTML +=
      '  <div class="modal-content">\n' +
      '    <h4>Добавить новый склад</h4>\n' +
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
      '          <div class="input-field col s12">\n' +
      '            <input id="storage_schedule" type="text" class="validate">\n' +
      '            <label for="График" data-error="wrong" data-success="right">График работы</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '  <div class="modal-footer" style="width: 90%;position: fixed">\n' +
      '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Закрыть</a>\n' +
      '    <a id="createGroup" class="modal-action modal-close waves-effect waves-green btn-flat">Создать</a>\n' +
      '  </div>\n';

    const createBtn = document.querySelector('#createGroup');

    const instance = M.Modal.init(modalGroupAdd, {});
    instance.open();

    const clearOnOverlay = document.querySelector('.modal-overlay');
    const clearOnButton = document.querySelector('#modalGroupAdd').querySelector('.modal-close');

    clearOnOverlay.addEventListener('click', this.clearModal.bind(this));
    clearOnButton.addEventListener('click', this.clearModal.bind(this));
    createBtn.addEventListener('click', this.groupAdd.bind(this));
  }
  // eslint-disable-next-line class-methods-use-this
  clearModal() {
    const modalGroupAdd = document.querySelector('#modalGroupAdd');
    modalGroupAdd.innerHTML = null;
  }
}

export default GroupAdd;
