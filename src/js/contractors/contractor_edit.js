/* eslint-disable camelcase */
import Component from '../component'

class ContractorEdit extends Component {
  init() {
    this.editBtn = document.querySelector('#tbodyContractor');
    this.editBtn.addEventListener('dblclick', this.openModalEdit.bind(this));
  }
  editContractor() {
    const contractor_id = Number(this.contractorId.innerHTML);
    const contractor_name = this.contractorName.value;
    const contractor_email = this.contractorEmail.value;
    const contractor_phone = this.contractorPhone.value;
    const contractor_inn = this.contractorInn.value;
    const contractor_kpp = this.contractorKpp.value;
    const contractor_address = this.contractorAddress.value;
    const contractor = {
      contractor_id,
      contractor_name,
      contractor_email,
      contractor_phone,
      contractor_inn,
      contractor_kpp,
      contractor_address,
    };
    this.emit('contractorEdit', contractor, document);
  }
  openModalEdit(event) {
    const contractorEdit = document.querySelector('#modalContractorEdit');
    contractorEdit.innerHTML =
        `<div class="modal-content"> 
          <div id="contractor_edit_id" hidden></div>
          <h4>Редактировать поставщика</h4> 
              <div class="row"> 
                <div class="input-field col s6"> 
                  <input id="contractor_name" type="text" class="validate"> 
                  <label for="contractor name" data-error="wrong" data-success="right">Наименование</label> 
                </div> 
                <div class="input-field col s6"> 
                  <input id="contractor_email" type="text" class="validate"> 
                  <label for="E-mail" data-error="wrong" data-success="right">E-mail</label> 
                </div> 
              </div> 
              <div class="row"> 
                <div class="input-field col s12"> 
                  <input id="contractor_phone" type="text" class="validate"> 
                  <label for="phone" data-error="wrong" data-success="right">Телефон</label> 
                </div> 
              </div> 
              <div class="row"> 
                <div class="input-field col s6"> 
                  <input id="contractor_inn" type="text" class="validate"> 
                  <label for="contractor inn" data-error="wrong" data-success="right">ИНН</label> 
                </div> 
                <div class="input-field col s6"> 
                  <input id="contractor_kpp" type="text" class="validate"> 
                  <label for="kpp" data-error="wrong" data-success="right">КПП</label> 
                </div> 
              </div> 
              <div class="row"> 
                <div class="input-field col s12"> 
                  <input id="contractor_address" type="text" class="validate"> 
                  <label for="Адрес" data-error="wrong" data-success="right">Адрес</label> 
                </div> 
              </div> 
        <div class="modal-footer" style="width: 90%;position: fixed"> 
          <a class="modal-action modal-close waves-effect waves-green btn-flat">Закрыть</a> 
          <a id="editContractor" class="modal-action modal-close waves-effect waves-green btn-flat">Обновить</a> 
        </div>`;
    this.updateBtn = document.querySelector('#editContractor');
    this.contractorId = document.querySelector('#contractor_edit_id');
    this.contractorName = document.querySelector('#contractor_name');
    this.contractorEmail = document.querySelector('#contractor_email');
    this.contractorPhone = document.querySelector('#contractor_phone');
    this.contractorInn = document.querySelector('#contractor_inn');
    this.contractorKpp = document.querySelector('#contractor_kpp');
    this.contractorAddress = document.querySelector('#contractor_address');
    const contractorList = JSON.parse(localStorage.getItem('contractorList'));
    const instance = M.Modal.init(contractorEdit, {});
    instance.open();
    const modalItems = document.querySelector('.modal-content');
    const selectInput = modalItems.querySelectorAll('input');
    const selectLabel = modalItems.querySelectorAll('label');
    // eslint-disable-next-line max-len
    const findContractor = contractorList.find(item => item.contractor_id === Number(event.target.parentElement.id));
    this.contractorId.innerText = findContractor.contractor_id.toString();
    this.contractorName.value = findContractor.contractor_name;
    this.contractorEmail.value = findContractor.contractor_email;
    this.contractorPhone.value = findContractor.contractor_phone;
    this.contractorInn.value = findContractor.contractor_inn;
    this.contractorKpp.value = findContractor.contractor_kpp;
    this.contractorAddress.value = findContractor.contractor_address;
    selectInput.forEach(item => item.classList.add('valid'));
    selectLabel.forEach(item => item.classList.add('active'));


    this.updateBtn.addEventListener('click', this.editContractor.bind(this));
  }
}

export default ContractorEdit;
