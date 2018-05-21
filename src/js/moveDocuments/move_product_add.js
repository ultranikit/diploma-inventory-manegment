/* eslint-disable class-methods-use-this,camelcase,no-param-reassign,max-len,prefer-template,no-shadow */
import Component from '../component';

class MoveDocumentAdd extends Component {
  init() {
    this.documentNumber = 0;
    this.editNewProducts = [];
    this.newList = [];
    this.allAddedProducts = [];
    this.count = 0;
    this.addCount = 0;
    const entryAddBtn = document.querySelector('#btn-add-move-document');
    entryAddBtn.addEventListener('click', this.openEntryModal.bind(this));
  }

  addMoveDocument() {
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

      // console.log(contractor);
      let moveDocNumber = document.querySelector('#move_document_number').value;
      moveDocNumber = Number(moveDocNumber);
      // console.log(entryDocNumber);
      const company = document.querySelector('#company').value;
      // console.log(company);
      const entryData = document.querySelector('#entry_data').value;
      // console.log(entryData);
      const selectedStorage = document.querySelector('.storage').querySelector('.selected').innerText;
      const selectedStorageEntry = document.querySelector('.storage-entry').querySelector('.selected').innerText;
      // console.log(selectedStorage);
      const findStorage = storage.find(store => store.name === selectedStorage);
      const findStorageEntry = storage.find(store => store.name === selectedStorageEntry);
      const storageId = findStorage.id;
      // console.log(storageId);
      const storageName = findStorage.name;
      // console.log(findStorage);
      // console.log(productTable);
      const storageEntryId = findStorageEntry.id;
      const storageEntryName = findStorageEntry.name;
      this.editNewProducts.forEach((product) => {
        product.document_number = this.documentNumber;
        product.document = 3;
        product.move_number = moveDocNumber;
        product.company = company;
        product.date = `${entryData}`;
        product.storage_id = storageId;
        // console.log(product.storage_id);
        product.storage_name = storageName;
        product.storage_entry_id = storageEntryId;
        product.storage_entry_name = storageEntryName;
        // console.log(product);
      });
      this.documents = this.documents.concat(this.editNewProducts);
      if (allDocList !== null) {
        this.documents = this.documents.concat(allDocList);
      }
      // console.log(this.documents);
      localStorage.setItem('allDocuments', JSON.stringify(this.documents));
      this.emit('renderMoveDocuments', this.documents, document);
      // console.log(this.allAddedProducts);
      // console.log(this.changeProducts);
      this.changeProducts.forEach((product) => {
        const products = JSON.parse(localStorage.getItem('userHash'));
        const findProd = products.find(item => (item.product_name === product.product_name && item.storage_name === product.storage_name));
        const findEntryProd = products.find(item => (item.product_name === product.product_name && item.storage_name === product.storage_entry_name));
        // console.log(findProd);
        const oldProdNumber = product.product_number;
        if (findProd) {
          product.product_id = findProd.product_id;
          product.product_number = findProd.product_number - product.product_number;
          this.emit('editProduct', product, document);
        }
        if (findEntryProd) {
          product.product_id = findEntryProd.product_id;
          product.storage_name = storageEntryName;
          product.storage_id = storageEntryId;
          product.product_number = findEntryProd.product_number + oldProdNumber;
          this.emit('editProduct', product, document);
        } else {
          product.product_id = Math.max(...products.map(item => item.product_id)) + 1;
          product.storage_name = storageEntryName;
          product.storage_id = storageEntryId;
          product.product_number = oldProdNumber;
          this.emit('editProduct', product, document);
        }
        // console.log(product);
      });
      this.documentNumber += 1;
      this.allAddedProducts = [];
      const entryModal = document.querySelector('#modalMoveDocumentAdd');
      entryModal.innerHTML = null;
    } catch (e) {
      alert('Что-то введено не верно, попробуйте снова');
      setTimeout(() => {
        const modalEntryAdd = document.querySelector('#modalMoveDocumentAdd');
        modalEntryAdd.innerHTML = '';
        this.openEntryModal();
      }, 250);
    }
  }
  openEntryModal() {
    const modalEntryAdd = document.querySelector('#modalMoveDocumentAdd');
    modalEntryAdd.innerHTML +=
      '<div class="modal-content">\n' +
      '    <div id="user_edit_id" hidden></div>\n' +
      '    <h4>Движение по складам</h4>\n' +
      '    <div class="row">\n' +
      '      <form class="col s12">\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="company" type="text">\n' +
      '            <label for="company">Организация</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="move_document_number" type="number">\n' +
      '            <label for="document">Номер накладной</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="entry_data" type="text" class="datepicker">\n' +
      '            <label for="Date">Дата перемещения</label>\n' +
      '          </div>\n' +
      '</div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6 storage">\n' +
      '            <select id="choose_outgo_storage">\n' +
      '              <option value="" disabled selected>Выбирете склад отпарвитель</option>\n' +
      '            </select>\n' +
      '            <label>Склад отправитель</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6 storage-entry">\n' +
      '            <select id="choose_entry_storage">\n' +
      '              <option value="" disabled selected>Выбирете склад получатель</option>\n' +
      '            </select>\n' +
      '            <label>Склад получатель</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '    <a id="choose_product" class="waves-effect waves-green btn-flat" style="background-color: rgba(0, 0, 0, 0.1);">Выбрать товар</a>\n' +
      '          <div class="col s12 addedProducts">\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </form>\n' +
      '    </div>\n' +
      '  <div class="modal-footer">\n' +
      '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Закрыть</a>\n' +
      '    <a id="createMoveDocument" class="modal-action modal-close waves-effect waves-green btn-flat">Сохранить</a>\n' +
      '  </div>';

    function clearEntryModal() {
      const entryModal = document.querySelector('#modalMoveDocumentAdd');
      entryModal.innerHTML = '';
    }

    const date_pick = document.querySelector('.datepicker');
    // const contractor = document.querySelector('#contractor');
    this.products = JSON.parse(localStorage.getItem('userHash'));
    const storage = JSON.parse(localStorage.getItem('groupList'));
    // const contractor_select_group = document.querySelector('#contractor_group_select');
    const storage_select_group = document.querySelector('#choose_outgo_storage');
    const storageEntry_select_group = document.querySelector('#choose_entry_storage');
    // const groupChange = select_group_edit.querySelector('option');

    storage.forEach((store) => {
      storage_select_group.innerHTML += `<option value="${store.id}">${store.name}</option>`;
    });
    storage.forEach((store) => {
      storageEntry_select_group.innerHTML += `<option value="${store.id}">${store.name}</option>`;
    });
    const instance = M.Modal.init(modalEntryAdd, {});
    M.FormSelect.init(storage_select_group, {});
    M.FormSelect.init(storageEntry_select_group, {});
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

    // make table for choose products end
    instance.open();
    this.allAddedProducts = [];
    this.changeProducts = [];
    const datePickerModal = document.querySelector('.datepicker-modal');
    datePickerModal.style.position = 'fixed';

    const modalOpened = document.querySelector('.open');
    // modalOpened.style.width = '60%';
    modalOpened.style.maxHeight = '80%';
    modalOpened.style.height = '80%';
    // modalEntryAdd.style.width = '75%';
    this.closeEntryBtn = document.querySelector('#modalMoveDocumentAdd').querySelector('.modal-close');
    this.closeEntryOverlay = document.querySelector('#modalMoveDocumentAdd').nextElementSibling;
    this.closeEntryBtn.addEventListener('click', clearEntryModal);
    this.closeEntryOverlay.addEventListener('click', clearEntryModal);


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
      const products = JSON.parse(localStorage.getItem('userHash'));
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
        '      <th>Количество товара</th>\n' +
        '      <th>Отметить</th>\n' +
        '    </tr> </thead>\n' +
        '<tbody id="showProductsChoose"></tbody>';
      const insetList = document.querySelector('#showProductsChoose');

      this.products = products;
      const selectedStorage = document.querySelector('.storage').querySelector('.selected').innerText;
      this.products = this.products.filter(item => item.storage_name === selectedStorage.toString());
      this.products.forEach((item) => {
        item.completed = false;
        insetList.innerHTML +=
          `<tr id="${item.product_id}">
           <td>${item.product_name}</td>
           <td>${item.product_number}</td>
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
      '</tr>' +
      '</thead>';

    const selectTd = document.querySelector('#showAddedProducts');
    selectTd.addEventListener('click', (myEdit) => {
      this.td = myEdit.target;
      this.prodId = Number(myEdit.target.parentElement.id);
      // console.log(this.prodId);
      const findNewProd = this.allAddedProducts.find(product => this.prodId === product.product_id);
      const indexNewProd = this.allAddedProducts.indexOf(findNewProd);
      // console.log(findNewProd);
      // console.log(indexNewProd);
      // console.log(selectTd.children[indexNewProd + 1].children[1].innerHTML);
      this.td.setAttribute('contenteditable', 'true');
      // console.log(this.td);
      selectTd.setAttribute('contenteditable', 'false');
      this.td.addEventListener('keypress', (event) => {
        const keyEnter = event.keyCode;
        if (keyEnter === 13) {
          findNewProd.product_number = Number(selectTd.children[indexNewProd + 1].children[2].innerHTML);
          // console.log(keyEnter);
          this.td.removeAttribute('contenteditable');
        }
      });
      this.td.addEventListener('blur', () => {
        findNewProd.product_number = Number(selectTd.children[indexNewProd + 1].children[2].innerHTML);
        this.td.removeAttribute('contenteditable');
      });
    });
    let selectedStorageEntry = document.querySelector('.storage-entry').querySelector('.selected').innerText;
    const selectedAddChecker = document.querySelector('.storage-entry').querySelector('ul');
    const saveDocBtn = document.querySelector('#createMoveDocument');
    saveDocBtn.addEventListener('click', this.addMoveDocument.bind(this));
    if (selectedStorageEntry === 'Выбирете склад получатель') {
      saveDocBtn.setAttribute('disabled', '');
      for (let i = 0; i < selectedAddChecker.childElementCount; i += 1) {
        // eslint-disable-next-line no-loop-func
        selectedAddChecker.childNodes[i].addEventListener('click', () => {
          selectedStorageEntry = document.querySelector('.storage-entry').querySelector('.selected').innerText;
          if (selectedStorageEntry !== 'Выбирете склад получатель') {
            saveDocBtn.removeAttribute('disabled');
          }
        });
      }
    }
  }
  completeProduct(e) {
    const trItemId = Number(e.target.parentElement.parentElement.id);
    // console.log(trItemId);
    const checkboxStatus = e.target;
    // console.log(checkboxStatus);
    const findProduct = this.products.find(item => item.product_id === trItemId);
    const index = this.products.indexOf(this.products.find(item => item.product_id === trItemId));
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
          `<tr id="${item.product_id}">
              <td>${this.count += 1}</td>
              <td>${item.product_name}</td>
              <td id="quantity_${this.count}">0</td>
          </tr>`;
        this.allAddedProducts.push(item);
        this.changeProducts.push(item);
      }
      this.addCount = this.count;
    });
    // PRICE COUNTER
    // console.log(this.newList);
    const modalChoose = document.querySelector('#modalChooseProduct');
    modalChoose.innerHTML = null;
  }
}

export default MoveDocumentAdd;
