/* eslint-disable class-methods-use-this,camelcase,no-param-reassign,max-len,prefer-template */
import Component from '../component';

class EntryDocumentAdd extends Component {
  init() {
    this.documentNumber = 0;
    this.editNewProducts = [];
    this.newList = [];
    this.allAddedProducts = [];
    this.count = 0;
    this.addCount = 0;
    const entryAddBtn = document.querySelector('#btn-add-entry-document');
    entryAddBtn.addEventListener('click', this.openEntryModal.bind(this));
  }

  addNewDocument() {
    if (localStorage.getItem('allDocuments') !== null) {
      this.documents = JSON.parse(localStorage.getItem('allDocuments'));
      this.documentNumber = Math.max(...this.documents.map(item => item.document_number)) + 1;
    } else {
      this.documents = [];
      this.documentNumber = 0;
    }
    this.documents = [];
    this.editNewProducts = [];
    this.editNewProducts = this.allAddedProducts;
    // console.log(this.editNewProducts);
    try {
      if (this.editNewProducts.length === 0) {
        throw new Error('Пустой список товаров');
      }
      const storage = JSON.parse(localStorage.getItem('groupList'));
      const allDocList = JSON.parse(localStorage.getItem('allDocuments'));
      const contractor = document.querySelector('.contractor').querySelector('.selected').innerText;
      // console.log(contractor);
      let entryDocNumber = document.querySelector('#entry_document_number').value;
      entryDocNumber = Number(entryDocNumber);
      // console.log(entryDocNumber);
      const customer = document.querySelector('#customer').value;
      // console.log(customer);
      const entryData = document.querySelector('#entry_data').value;
      // console.log(entryData);
      const selectedStorage = document.querySelector('.storage').querySelector('.selected').innerText;
      // console.log(selectedStorage);
      const findStorage = storage.find(store => store.name === selectedStorage);
      const storageId = findStorage.id;
      // console.log(storageId);
      const storageName = findStorage.name;
      // console.log(findStorage);
      // console.log(productTable);
      this.editNewProducts.forEach((product) => {
        product.document_number = this.documentNumber;
        product.document = 1;
        product.entry_number = entryDocNumber;
        product.contractor = contractor;
        product.customer = customer;
        product.date = `${entryData}`;
        product.storage_id = storageId;
        // console.log(product.storage_id);
        product.storage_name = storageName;
      // console.log(product);
      // const findProd = products.find(item => (item.product_name === product.product_name && item.storage_name === product.storage_name));
      // // console.log(findProd);
      // if (findProd) {
      //   product.user_id = findProd.user_id;
      // }
      });
      this.documents = this.documents.concat(this.editNewProducts);
      if (allDocList !== null) {
        this.documents = this.documents.concat(allDocList);
      }
      // console.log(this.documents);
      localStorage.setItem('allDocuments', JSON.stringify(this.documents));
      this.emit('renderEntryDocuments', this.documents, document);
      // console.log(this.allAddedProducts);
      // console.log(this.changeProducts);
      this.changeProducts.forEach((product) => {
        const products = JSON.parse(localStorage.getItem('userHash'));
        // product.document_number = this.documentNumber;
        // product.document = 1;
        // product.entry_number = entryDocNumber;
        // product.contractor = contractor;
        // product.customer = customer;
        // product.date = `${entryData}`;
        // product.storage_id = storageId;
        // console.log(product.storage_id);
        // product.storage_name = storageName;

        // console.log(product);
        const findProd = products.find(item => (item.product_name === product.product_name && item.storage_name === product.storage_name));
        // console.log(findProd);
        if (findProd) {
          product.user_id = findProd.user_id;
          product.product_number += findProd.product_number;
          this.emit('editProduct', product, document);
        } else {
          product.user_id = Math.max(...products.map(item => item.user_id)) + 1;
          this.emit('editProduct', product, document);
        }
      // console.log(product);
      });
      this.documentNumber += 1;
      this.allAddedProducts = [];
      const entryModal = document.querySelector('#modalEntryDocumentAdd');
      entryModal.innerHTML = null;
    } catch (e) {
      alert('Что-то введено не верно, попробуйте снова');
      setTimeout(() => {
        const modalEntryAdd = document.querySelector('#modalEntryDocumentAdd');
        modalEntryAdd.innerHTML = '';
        this.openEntryModal();
      }, 250);
    }
  }
  openEntryModal() {
    const modalEntryAdd = document.querySelector('#modalEntryDocumentAdd');
    modalEntryAdd.innerHTML +=
      '<div class="modal-content">\n' +
      '    <div id="user_edit_id" hidden></div>\n' +
      '    <h4>Приходная накладная</h4>\n' +
      '    <div class="row">\n' +
      '      <form class="col s12">\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6 contractor">\n' +
      '            <select id="contractor_group_select">\n' +
      '              <option value="" disabled selected>Выбирете поставщика</option>\n' +
      '            </select>\n' +
      '            <label>Поставщик</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="entry_document_number" type="number">\n' +
      '            <label for="document">Номер накладной</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="customer" type="text">\n' +
      '            <label for="customer">Покупатель</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="entry_data" type="text" class="datepicker">\n' +
      '            <label for="Date">Дата получения</label>\n' +
      '          </div>\n' +
      // '          <div class="input-field col s6">\n' +
      // '            <input type="text" class="sale_datepicker">\n' +
      // '            <label for="Date">Дата продажи</label>\n' +
      // '          </div>\n' +
              '</div>\n' +
      '        </div>\n' +
      // '        <div class="row">\n' +
      // '          <div class="input-field col s12">\n' +
      // '            <input id="product_name" type="text" class="validate">\n' +
      // '            <label for="Наименование товара" data-error="wrong" data-success="right">Наименование товара</label>\n' +
      // '          </div>\n' +
      // '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6 storage">\n' +
      '            <select id="choose_entry_storage">\n' +
      '              <option value="" disabled selected>Выбирете склад</option>\n' +
      '            </select>\n' +
      '            <label>Склад</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '    <a id="choose_product" class="waves-effect waves-green btn-flat" style="background-color: rgba(0, 0, 0, 0.1);">Выбрать товар</a>\n' +
      '    <a id="add_new_prod" class="waves-effect waves-green btn-flat" style="background-color: rgba(0, 0, 0, 0.1);">Добавить новый товар</a>\n' +
      '          <div class="col s12 addedProducts">\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </form>\n' +
      // '<div id="modalChooseProduct" class="modal modal-fixed-footer">\n' +
      // '</div>\n' +
      '    </div>\n' +
      '  <div class="modal-footer">\n' +
      '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Закрыть</a>\n' +
      '    <a id="createEntryDocument" class="modal-action modal-close waves-effect waves-green btn-flat">Сохранить</a>\n' +
      '  </div>';

    function clearEntryModal() {
      const entryModal = document.querySelector('#modalEntryDocumentAdd');
      entryModal.innerHTML = '';
    }

    const date_pick = document.querySelector('.datepicker');
    // const contractor = document.querySelector('#contractor');
    this.products = JSON.parse(localStorage.getItem('userHash'));
    const contractors = JSON.parse(localStorage.getItem('contractorList'));
    const storage = JSON.parse(localStorage.getItem('groupList'));
    const contractor_select_group = document.querySelector('#contractor_group_select');
    const storage_select_group = document.querySelector('#choose_entry_storage');
    // const groupChange = select_group_edit.querySelector('option');
    contractors.forEach((contractor) => {
      contractor_select_group.innerHTML += `<option value="${contractor.contractor_id}">${contractor.contractor_name}</option>`;
    });
    storage.forEach((store) => {
      storage_select_group.innerHTML += `<option value="${store.id}">${store.name}</option>`;
    });
    const instance = M.Modal.init(modalEntryAdd, {});
    M.FormSelect.init(contractor_select_group, {});
    M.FormSelect.init(storage_select_group, {});
    M.Datepicker.init(date_pick, {
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false,
      // Close upon selecting a date,
    });
    // make table for choose products
    // this.products.sort((a, b) => a.product_name.localeCompare(b.product_name));
    // this.products.reduce((acc, cur) => {
    //   const findIndex = this.products.indexOf(this.products.find(item => item.product_name === acc.product_name));
    //   if (acc.product_name === cur.product_name) {
    //     this.products.forEach((item, newIndex) => {
    //       if (item.product_name === acc.product_name) {
    //         this.products.splice(findIndex, 1);
    //         newIndex = findIndex;
    //       }
    //       // console.log(newIndex);
    //       return newIndex;
    //     });
    //   }
    //   return cur;
    // });
    // make table for choose products end
    instance.open();
    this.allAddedProducts = [];
    this.changeProducts = [];
    const datePickerModal = document.querySelector('.datepicker-modal');
    datePickerModal.style.position = 'fixed';
    datePickerModal.style.top = '-15%';
    datePickerModal.style.height = '410px';
    datePickerModal.style.width = '600px';

    const modalOpened = document.querySelector('.open');
    modalOpened.style.width = '60%';
    modalOpened.style.maxHeight = '80%';
    modalOpened.style.height = '80%';
    // modalEntryAdd.style.width = '75%';
    this.closeEntryBtn = document.querySelector('#modalEntryDocumentAdd').querySelector('.modal-close');
    this.closeEntryOverlay = document.querySelector('#modalEntryDocumentAdd').nextElementSibling;
    this.closeEntryBtn.addEventListener('click', clearEntryModal);
    this.closeEntryOverlay.addEventListener('click', clearEntryModal);

    const addProductBtn = document.querySelector('#add_new_prod');
    const productsAddedTable = document.querySelector('.addedProducts');
    const chooseProduct = document.querySelector('#choose_product');


    chooseProduct.addEventListener('click', () => {
      // console.log('ZAWEL');
      const modalChoose = document.querySelector('#modalChooseProduct');
      // modalChoose.style.zIndex = '1004';
      // modalChoose.style.position = 'absolute';
      modalChoose.innerHTML += '<div class="modal-content">\n' +
        '    <h4>Выбор товара</h4>\n' +
        '    <div class="row">\n' +
        '      <form class="col s12">\n' +

        '        <div class="row">\n' +
        '          <div class="input-field col s12 showProductsChoose">\n' +
        '          </div>\n' +
        '        </div>\n' +

        '      </form>\n' +
        '    </div>\n' +

        '  <div class="modal-footer" style="width: 90%;position: fixed">\n' +
        '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Закрыть</a>\n' +
        '    <a id="addChosenProds" class="modal-action modal-close waves-effect waves-green btn-flat">Добавить</a>\n' +
        '  </div>';
      const openChoose = M.Modal.init(modalChoose, {});


      openChoose.open();
      function modalChooseClose() {
        const clearModal = document.querySelector('#modalChooseProduct');
        // console.log('ok');
        // console.log(clearModal);
        clearModal.innerHTML = '';
      }

      this.addChosenBtn = document.querySelector('#addChosenProds');
      this.addChosenBtn.addEventListener('click', this.addChosen.bind(this));
      const listProductsChoose = document.querySelector('.showProductsChoose');
      listProductsChoose.innerHTML +=
        '<table class="">\n' +
        '    <thead>    <tr>\n' +
        '      <th>Наименование товара</th>\n' +
        '      <th>Отметить</th>\n' +
        '    </tr> </thead>\n' +
        '<tbody id="showProductsChoose"></tbody>';
      const insetList = document.querySelector('#showProductsChoose');

      this.products.sort((a, b) => a.product_name.localeCompare(b.product_name));
      this.products.reduce((acc, cur) => {
        const findIndex = this.products.indexOf(this.products.find(item => item.product_name === acc.product_name));
        if (acc.product_name === cur.product_name) {
          this.products.forEach((item, newIndex) => {
            if (item.product_name === acc.product_name) {
              this.products.splice(findIndex, 1);
              newIndex = findIndex;
            }
            // console.log(newIndex);
            return newIndex;
          });
        }
        return cur;
      });
      this.products.forEach((item) => {
        item.completed = false;
        insetList.innerHTML +=
          `<tr id="${item.user_id}">
           <td>${item.product_name}</td>
           <td><input type="checkbox" class="filled-in" /></td>
          </tr>`;
      });
      this.changeCheckbox = document.querySelector('#showProductsChoose');
      this.changeCheckbox.addEventListener('click', this.completeProduct.bind(this));

      // console.log(this.products);

      this.closeBtn = document.querySelector('#modalChooseProduct').querySelector('.modal-close');
      this.closeOverlay = document.querySelector('#modalChooseProduct').nextElementSibling;
      this.closeBtn.addEventListener('click', modalChooseClose);
      this.closeOverlay.addEventListener('click', modalChooseClose);
    });
    productsAddedTable.innerHTML +=
      '<table class="">\n' +
      '    <thead id="showAddedProducts">    <tr>\n' +
      '      <th>№</th>\n' +
      '      <th>Наименование товара</th>\n' +
      '      <th>Количество</th>\n' +
      '      <th>Цена без ПДВ</th>\n' +
      '      <th>Сумма без ПДВ</th>\n' +
      '</tr>' +
      '</thead>';
    addProductBtn.addEventListener('click', () => {
      const tableProd = document.querySelector('#showAddedProducts');
      if (tableProd.children.length === 1) {
        this.addCount = 0;
      } else {
        this.addCount = this.count;
      }
      const user_id = Math.round(Math.random() * 1000);
      tableProd.innerHTML +=
        `<tr id="${user_id}">
              <td>${this.addCount += 1}</td>
              <td id="prod_name" style="white-space: nowrap">впишите имя</td>
              <td  id="quantity_${this.addCount}" >0</td>
              <td  id="price_${this.addCount}">0</td>
              <td id="sum_${this.addCount}"></td>
          </tr>`;
      const product_name = document.querySelector('#prod_name').innerText;
      const newProdData = {
        user_id,
        vendor_code: '0',
        product_name,
        storage_name: 'some',
        storage_id: 1,
        product_number: 0,
      };
      // console.log(newProdData);
      // console.log(this.allAddedProducts);
      this.allAddedProducts.push(newProdData);
      this.changeProducts.push(newProdData);
      this.count = this.addCount;
    });
    const selectTd = document.querySelector('#showAddedProducts');
    selectTd.addEventListener('click', (myEdit) => {
      this.td = myEdit.target;
      this.prodId = Number(myEdit.target.parentElement.id);
      // console.log(this.prodId);
      const findNewProd = this.allAddedProducts.find(product => this.prodId === product.user_id);
      const indexNewProd = this.allAddedProducts.indexOf(findNewProd);
      // console.log(findNewProd);
      // console.log(indexNewProd);
      // console.log(selectTd.children[indexNewProd + 1].children[1].innerHTML);
      this.td.setAttribute('contenteditable', 'true');
      // console.log(this.td);
      try {
        this.td.addEventListener('keypress', (event) => {
          const keyEnter = event.keyCode;
          if (keyEnter === 13) {
            findNewProd.product_name = selectTd.children[indexNewProd + 1].children[1].innerHTML;
            findNewProd.product_number = Number(selectTd.children[indexNewProd + 1].children[2].innerHTML);
            findNewProd.product_price = Number(selectTd.children[indexNewProd + 1].children[3].innerHTML);
            findNewProd.product_sum = Number(selectTd.children[indexNewProd + 1].children[4].innerHTML);
            // console.log(keyEnter);
            this.td.removeAttribute('contenteditable');
            this.priceCount();
          }
        });
        this.td.addEventListener('blur', () => {
          findNewProd.product_name = selectTd.children[indexNewProd + 1].children[1].innerHTML;
          findNewProd.product_number = Number(selectTd.children[indexNewProd + 1].children[2].innerHTML);
          findNewProd.product_price = Number(selectTd.children[indexNewProd + 1].children[3].innerHTML);
          findNewProd.product_sum = Number(selectTd.children[indexNewProd + 1].children[4].innerHTML);
          this.td.removeAttribute('contenteditable');
          this.priceCount();
        });
      } catch (e) {
        console.log('check');
      }
    });
    const saveDocBtn = document.querySelector('#createEntryDocument');
    saveDocBtn.addEventListener('click', this.addNewDocument.bind(this));
  }
  completeProduct(e) {
    const trItemId = Number(e.target.parentElement.parentElement.id);
    // console.log(trItemId);
    const checkboxStatus = e.target;
    // console.log(checkboxStatus);
    const findProduct = this.products.find(item => item.user_id === trItemId);
    const index = this.products.indexOf(this.products.find(item => item.user_id === trItemId));
    try {
      if (!checkboxStatus.checked) {
        findProduct.completed = false;
        // console.log(index);
        this.products.splice(index, 1);
        this.products.push(findProduct);
        // console.log(this.newList);
        checkboxStatus.removeAttribute('checked');
      } else if (checkboxStatus.checked) {
        findProduct.completed = true;
        // console.log(index);
        this.products.splice(index, 1);
        this.products.push(findProduct);
        checkboxStatus.setAttribute('checked', '');
      }
    } catch (e) {
      console.log('missed');
    }
    this.products.sort((a, b) => a.product_name.localeCompare(b.product_name));
    this.newList = this.products;
    // console.log(this.newList);
  }
  addChosen() {
    // console.log(this.newList);
    const addToTable = document.querySelector('#showAddedProducts');
    if (addToTable.children.length === 1) {
      this.count = 0;
    } else {
      this.count = this.addCount;
    }
    this.newList.forEach((item) => {
      if (item.completed) {
        addToTable.innerHTML +=
          `<tr id="${item.user_id}">
              <td>${this.count += 1}</td>
              <td>${item.product_name}</td>
              <td id="quantity_${this.count}">0</td>
              <td id="price_${this.count}">0</td>
              <td id="sum_${this.count}"></td>
          </tr>`;
        this.allAddedProducts.push(item);
        this.changeProducts.push(item);
      }
      this.addCount = this.count;
    });
    // PRICE COUNTER
    for (let k = 1; k < addToTable.children.length; k += 1) {
      const quantity = document.getElementById('quantity_' + k);
      const price = document.getElementById('price_' + k);
      const sum = document.getElementById('sum_' + k);
      sum.innerHTML = `${Number(quantity.innerText) * Number(price.innerText)}`;
    }
    // console.log(this.newList);
    const modalChoose = document.querySelector('#modalChooseProduct');
    modalChoose.innerHTML = null;
  }
  priceCount() {
    const addToTable = document.querySelector('#showAddedProducts');
    for (let k = 1; k < addToTable.children.length; k += 1) {
      const quantity = document.getElementById('quantity_' + k);
      const price = document.getElementById('price_' + k);
      const sum = document.getElementById('sum_' + k);
      sum.innerHTML = `${Number(quantity.innerText) * Number(price.innerText)}`;
    }
  }
}

export default EntryDocumentAdd;
