/* eslint-disable class-methods-use-this,camelcase */
import Component from '../component';

class ContractorList extends Component {
  init() {
    this.on('renderContractorList', this.render.bind(this), document);
  }
  render(contractors) {
    const table = document.querySelector('.stripped');
    const docFragment = document.createDocumentFragment();
    const list = document.querySelector('#tbodyContractor');
    list.innerHTML = '';

    contractors.forEach((item) => {
      const trContractorItem = document.createElement('tr');
      const contractor_name = document.createElement('td');
      const contractor_email = document.createElement('td');
      const contractor_phone = document.createElement('td');
      const contractor_inn = document.createElement('td');
      const contractor_kpp = document.createElement('td');
      const contractor_address = document.createElement('td');
      const icon = document.createElement('a');

      trContractorItem.id = item.contractor_id;
      contractor_name.innerHTML = item.contractor_name;
      contractor_email.innerHTML = item.contractor_email;
      contractor_phone.innerHTML = item.contractor_phone;
      contractor_inn.innerHTML = item.contractor_inn;
      contractor_kpp.innerHTML = item.contractor_kpp;
      contractor_address.innerHTML = item.contractor_address;
      icon.style.marginLeft = '-40px';
      icon.className = 'destroy';
      icon.addEventListener('click', this.deleteGoods.bind(this));

      trContractorItem.appendChild(contractor_name);
      trContractorItem.appendChild(contractor_email);
      trContractorItem.appendChild(contractor_phone);
      trContractorItem.appendChild(contractor_inn);
      trContractorItem.appendChild(contractor_kpp);
      trContractorItem.appendChild(contractor_address);
      trContractorItem.appendChild(icon);
      list.appendChild(trContractorItem);
    });
    table.appendChild(docFragment);
  }
  deleteGoods(e) {
    // console.log(e.currentTarget.parentElement.id);
    const getId = Number(e.currentTarget.parentElement.id);
    const contractors = JSON.parse(localStorage.getItem('contractorList'));
    const index = contractors.indexOf(contractors.find(item => item.contractor_id === getId));
    // console.log(index);
    contractors.splice(index, 1);
    localStorage.setItem('contractorList', JSON.stringify(contractors));
    this.emit('renderContractorList', contractors, document);
  }
}

export default ContractorList;
