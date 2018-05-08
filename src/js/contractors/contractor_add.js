/* eslint-disable camelcase,class-methods-use-this */
import Component from '../component';


class ContractorAdd extends Component {
  init() {
    const addButton = document.querySelector('#btn-add-contractor');
    addButton.addEventListener('click', this.openAddModal.bind(this));
  }
  contractorAdd() {
    const contractors = JSON.parse(localStorage.getItem('contractorList'));
    let contractor_id = Math.max(...contractors.map(item => item.contractor_id));
    contractor_id += 1;

    const contractor_name = document.querySelector('#contractor_name').value;
    const contractor_email = document.querySelector('#contractor_email').value;
    const contractor_phone = document.querySelector('#contractor_phone').value;
    const contractor_inn = document.querySelector('#contractor_inn').value;
    const contractor_kpp = document.querySelector('#contractor_kpp').value;
    const contractor_address = document.querySelector('#contractor_address').value;

    const data = {
      contractor_id,
      contractor_name,
      contractor_email,
      contractor_phone,
      contractor_inn,
      contractor_kpp,
      contractor_address,
    };
    this.emit('contractorAdd', data, document);
  }
  openAddModal() {
    const modalContractorAdd = document.querySelector('#modalContractorAdd');
    modalContractorAdd.innerHTML +=
      '  <div class="modal-content">\n' +
      '    <h4>Добавить поставщика</h4>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="contractor_name" type="text" class="validate">\n' +
      '            <label for="contractor name" data-error="wrong" data-success="right">Наименование</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="contractor_email" type="text" class="validate">\n' +
      '            <label for="E-mail" data-error="wrong" data-success="right">E-mail</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12">\n' +
      '            <input id="contractor_phone" type="text" class="validate">\n' +
      '            <label for="phone" data-error="wrong" data-success="right">Телефон</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="contractor_inn" type="text" class="validate">\n' +
      '            <label for="contractor inn" data-error="wrong" data-success="right">ИНН</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="contractor_kpp" type="text" class="validate">\n' +
      '            <label for="kpp" data-error="wrong" data-success="right">КПП</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12">\n' +
      '            <input id="contractor_address" type="text" class="validate">\n' +
      '            <label for="Адрес" data-error="wrong" data-success="right">Адрес</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '  <div class="modal-footer" style="width:90%">\n' +
      '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>\n' +
      '    <a id="createContractor" class="modal-action modal-close waves-effect waves-green btn-flat">Create</a>\n' +
      '  </div>\n';

    const createBtn = document.querySelector('#createContractor');

    const instance = M.Modal.init(modalContractorAdd, {});
    instance.open();

    const clearOnOverlay = document.querySelector('.modal-overlay');
    const clearOnButton = document.querySelector('#modalContractorAdd').querySelector('.modal-close');

    clearOnOverlay.addEventListener('click', this.clearModal.bind(this));
    clearOnButton.addEventListener('click', this.clearModal.bind(this));
    createBtn.addEventListener('click', this.contractorAdd.bind(this));
  }
  clearModal() {
    const modalContractorAdd = document.querySelector('#modalContractorAdd');
    modalContractorAdd.innerHTML = null;
  }
}

export default ContractorAdd;
