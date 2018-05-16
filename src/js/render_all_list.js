/* eslint-disable camelcase,class-methods-use-this,max-len */
import Component from './component';

class allRenderList extends Component {
  init() {
    this.searchString = '';
    this.on('renderUserList', this.render.bind(this), document);
    // this.on('count', this.countUsers.bind(this), document);
    // this.on('renderStorage', this.renderStorage.bind(this), document);
    window.addEventListener('hashchange', this.location.bind(this));

    this.documentsDiv = document.querySelector('#showList');
    this.documentsDiv.style.display = 'none';
    const documentsAddition = document.querySelector('#additions');
    documentsAddition.addEventListener('click', () => {
      if (this.documentsDiv.style.display === 'none') {
        this.documentsDiv.style.display = 'block';
      } else {
        this.documentsDiv.style.display = 'none';
      }
    });
    // sort dropdown menu
    this.vendorSort = document.querySelector('#vendor_sort');
    this.nameSort = document.querySelector('#name_sort');
    this.storageSort = document.querySelector('#storage_sort');
    this.sortProducts = JSON.parse(localStorage.getItem('userHash'));
    this.vendorSort.addEventListener('click', () => {
      this.sortProducts.sort((a, b) => a.vendor_code - b.vendor_code);
      this.emit('renderUserList', this.sortProducts, document);
    });
    this.nameSort.addEventListener('click', () => {
      this.sortProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
      this.emit('renderUserList', this.sortProducts, document);
    });
    this.storageSort.addEventListener('click', () => {
      this.sortProducts.sort((a, b) => a.storage_id - b.storage_id);
      this.emit('renderUserList', this.sortProducts, document);
    });
    this.dropdownSort = document.querySelector('#dropdown-sort');

    const htmlBody = document.querySelector('html');
    const groupLength = document.querySelector('#filters');
    for (let i = 0; i < groupLength.children.length; i += 1) {
      groupLength.children[i].style.backgroundColor = 'transparent';
      groupLength.children[i].className = ''; // clear class active for all group list;
      if (htmlBody.clientWidth <= 1300 && i < groupLength.children.length - 1) {
        groupLength.children[i + 1].addEventListener('click', () => {
          const elem = document.querySelector('.sidenav');
          const instance = M.Sidenav.getInstance(elem);
          instance.close();
        });
      }
    }
  }

  // eslint-disable-next-line consistent-return
  render(products) {
    this.sortProducts = products;
    const groups = JSON.parse(localStorage.getItem('groupList'));
    const contractors = JSON.parse(localStorage.getItem('contractorList'));
    const allDocs = JSON.parse(localStorage.getItem('allDocuments'));

    const table = document.querySelector('.stripped');
    const list = document.querySelector('#tbodyUser');
    const storageBody = document.querySelector('#tbodyStorage');
    const contractorBody = document.querySelector('#tbodyContractor');
    const entryDocList = document.querySelector('#entryDocs');
    const outgoDocList = document.querySelector('#outgoDocs');
    const moveDocList = document.querySelector('#moveDocs');
    const page_title = document.querySelector('.page-title');
    const docFragment = document.createDocumentFragment();
    const locationHash = document.location.hash;
    const group_add_button = document.querySelector('#btn-add-group');
    const button_add = document.querySelector('#btn-add-user');
    const contractor_button_add = document.querySelector('#btn-add-contractor');
    const entry_document_add = document.querySelector('#btn-add-entry-document');
    const outgo_document_add = document.querySelector('#btn-add-outgo-document');
    const move_document_add = document.querySelector('#btn-add-move-document');

    const infoSelect = document.querySelector('#info_search');
    this.dropdownSort.style.display = 'none';
    infoSelect.style.display = 'none';
    entryDocList.innerHTML = '';
    entryDocList.hidden = true;
    outgoDocList.innerHTML = '';
    outgoDocList.hidden = true;
    moveDocList.innerHTML = '';
    moveDocList.hidden = true;
    contractorBody.innerHTML = '';
    storageBody.innerHTML = '';
    list.innerHTML = '';
    const ourLocation = locationHash.slice(2);
    const newTr = document.querySelector('thead');
    entry_document_add.style.display = 'none';
    outgo_document_add.style.display = 'none';
    move_document_add.style.display = 'none';
    button_add.style.display = 'none';
    contractor_button_add.style.display = 'none';
    group_add_button.style.display = 'none';
    this.documentsDiv.style.display = 'none';
    newTr.innerHTML = '';
    if (ourLocation === 'documents') {
      page_title.innerText = 'Документы';
      // entryDocList.hidden = false;
      // outgoDocList.hidden = false;
      this.documentsDiv.style.display = 'block';
      this.emit('renderEntryDocuments', allDocs, document);
      this.emit('renderMoveDocuments', allDocs, document);
      this.emit('renderOutDocuments', allDocs, document);
      if (entryDocList.childNodes.length >= 1) {
        entryDocList.hidden = false;
      }
      if (outgoDocList.childNodes.length >= 1) {
        outgoDocList.hidden = false;
      }
      if (moveDocList.childNodes.length >= 1) {
        moveDocList.hidden = false;
      }
      entryDocList.classList.add('collapsible');
      moveDocList.classList.add('collapsible');
    } else if (ourLocation === 'entry_documents') {
      page_title.innerText = 'Приход';
      this.documentsDiv.style.display = 'block';
      entry_document_add.style.display = 'block';
      this.emit('renderEntryDocuments', allDocs, document);
      if (entryDocList.childNodes.length >= 1) {
        entryDocList.hidden = false;
      }
    } else if (ourLocation === 'outcoming_documents') {
      page_title.innerText = 'Расход';
      outgo_document_add.style.display = 'block';
      this.documentsDiv.style.display = 'block';
      this.emit('renderOutDocuments', allDocs, document);
      if (outgoDocList.childNodes.length >= 1) {
        outgoDocList.hidden = false;
      }
    } else if (ourLocation === 'moves') {
      page_title.innerText = 'Движение по складам';
      move_document_add.style.display = 'block';
      this.documentsDiv.style.display = 'block';
      this.emit('renderMoveDocuments', allDocs, document);
      if (moveDocList.childNodes.length >= 1) {
        moveDocList.hidden = false;
      }
    } else if (ourLocation === 'storage') {
      page_title.innerText = 'Склады';
      group_add_button.style.display = 'block';
      contractorBody.innerHTML = '';
      newTr.innerHTML = '    <tr>\n' +
        '      <th>Название</th>\n' +
        '      <th>Улица</th>\n' +
        '      <th>Описание</th>\n' +
        '      <th>Телефон</th>\n' +
        '      <th>График работы</th>\n' +
        '      <th>Товаров на складе</th>\n' +
        '    </tr>';
      return this.emit('count', groups, document);
    } else if (ourLocation === 'contractor') {
      storageBody.innerHTML = '';
      page_title.innerText = 'Поставщики';
      contractor_button_add.style.display = 'block';
      newTr.innerHTML = '    <tr>\n' +
        '      <th>Наименование</th>\n' +
        '      <th>E-mail</th>\n' +
        '      <th>Телефон</th>\n' +
        '      <th>ИНН</th>\n' +
        '      <th>КПП</th>\n' +
        '      <th>Адрес</th>\n' +
        '    </tr>';
      return this.emit('renderContractorList', contractors, document);
    } else if (ourLocation === 'goods') {
      this.dropdownSort.style.display = 'inline-block';
      infoSelect.style.display = 'block';
      button_add.style.display = 'block';
      page_title.innerText = 'Товары';
      newTr.innerHTML = '    <tr>\n' +
        '      <th>Артикул</th>\n' +
        '      <th>Наименование товара</th>\n' +
        '      <th>Склад</th>\n' +
        '      <th>Общее количество</th>\n' +
        '    </tr>';

      if (infoSelect.children.length < 2) {
        const createLi = document.createElement('li');
        const createSearch = document.createElement('input');
        createLi.style.color = '#000';
        createLi.style.width = '20%';
        createLi.style.paddingLeft = '5px';
        createSearch.id = 'search';
        createSearch.type = 'text';
        createSearch.style.maxHeight = '30px';
        createSearch.style.border = '1px solid #000';
        createLi.appendChild(createSearch);
        // infoSelect.appendChild(createLi);
        infoSelect.appendChild(createLi);
        const searchSelect = document.querySelector('#search');
        searchSelect.addEventListener('keypress', this.searchProduct.bind(this));
        searchSelect.addEventListener('keydown', this.deleteStringElem.bind(this));
        searchSelect.addEventListener('keyup', this.updateInputValue.bind(this));
      }
      products.forEach((item) => {
      // product elements
        const trItem = document.createElement('tr');
        const vendor_code = document.createElement('td');
        // const contractor = document.createElement('td');
        const product_name = document.createElement('td');
        const storage_name = document.createElement('td');
        const product_number = document.createElement('td');
        // const linkIcon = document.createElement('a');
        const icon = document.createElement('a');

        if (item.product_number < 0) {
          product_number.style.backgroundColor = 'rgba(255, 15, 15, 0.15)';
        }
        trItem.id = item.user_id;
        vendor_code.innerText = item.vendor_code;
        product_name.innerText = item.product_name;
        storage_name.innerText = item.storage_name;
        product_number.style.paddingLeft = '50px';
        product_number.innerText = item.product_number;
        //  linkIcon.className = 'waves-effect waves-light btn-small';
        icon.className = 'destroy';
        icon.addEventListener('click', this.deleteGoods.bind(this));
        trItem.appendChild(vendor_code);
        trItem.appendChild(product_name);
        trItem.appendChild(storage_name);
        trItem.appendChild(product_number);
        trItem.appendChild(icon);
        list.appendChild(trItem);
      });
      table.appendChild(docFragment);
    } else {
      page_title.innerText = 'Select group, please!';
      newTr.innerHTML = null;
    }
  }
  // search function for products
  updateInputValue(event) {
    const updateProducts = JSON.parse(localStorage.getItem('userHash'));
    const keyUp = event.keyCode;
    if (keyUp === 8 || keyUp === 46 || keyUp === 13) {
      const searchInput = document.querySelector('#search').value;
      this.searchString = searchInput;
      console.log(this.searchString);
      this.sortedArray = updateProducts.filter(item => item.product_name.indexOf(this.searchString) > -1
        || item.vendor_code.toString().indexOf(this.searchString) > -1);
      // searchInput.value = this.searchString;
      if (searchInput.length === 0) {
        this.searchString = '';
        this.sortedArray = updateProducts;
      }
      this.emit('renderUserList', this.sortedArray, document);
    }
  }
  deleteStringElem(event) {
    const updateProducts = JSON.parse(localStorage.getItem('userHash'));
    const keyPress = event.keyCode;
    if (keyPress === 8) {
      this.searchString = this.searchString.slice(0, -1);
      this.sortedArray = updateProducts.filter(item => item.product_name.indexOf(this.searchString) > -1
        || item.vendor_code.toString().indexOf(this.searchString) > -1);
    }
    if (keyPress === 13) {
      this.searchString.trim();
      this.sortedArray = updateProducts.filter(item => item.product_name.indexOf(this.searchString) > -1
        || item.vendor_code.toString().indexOf(this.searchString) > -1);
    }
  }
  searchProduct(event) {
    const updateProducts = JSON.parse(localStorage.getItem('userHash'));
    if (this.searchString === null) {
      this.emit('renderUserList', updateProducts, document);
    }
    const keyPress = event.key;
    if (keyPress !== 'Enter' && keyPress !== 'Alt') {
      console.log(keyPress);
      this.searchString += keyPress;
      this.searchString = this.searchString.toLowerCase();
      this.sortedArray = updateProducts.filter(item => item.vendor_code.toString().indexOf(this.searchString) > -1 || item.product_name.indexOf(this.searchString) > -1);
      this.sortedArray.sort((a, b) => a.vendor_code - b.vendor_code);
      this.emit('renderUserList', this.sortedArray, document);
    }
    // search function for products end
  }
  location(e) {
    const products = JSON.parse(localStorage.getItem('userHash'));
    const additionUl = document.querySelector('#docList');
    const groupLength = document.querySelector('#filters');
    for (let i = 0; i < groupLength.children.length; i += 1) {
      groupLength.children[i].style.backgroundColor = 'transparent';
      groupLength.children[i].className = ''; // clear class active for all group list;
    }
    for (let i = 0; i < additionUl.childElementCount; i += 1) {
      additionUl.children[i].style.backgroundColor = 'transparent';
      additionUl.children[i].className = '';
    }
    e.currentTarget.document.activeElement.parentElement.className = 'active';
    e.currentTarget.document.activeElement.parentElement.style.backgroundColor = '#ee6e73';
    e.currentTarget.document.activeElement.parentElement.style.color = '#fff';
    // products.sort((a, b) => a.product_name.localeCompare(b.product_name));
    products.sort((a, b) => a.storage_id - b.storage_id);
    this.emit('renderUserList', products, document);
  }
  deleteGoods(e) {
    // console.log(e.currentTarget.parentElement.id);
    const getId = Number(e.currentTarget.parentElement.id);
    const goods = JSON.parse(localStorage.getItem('userHash'));
    const index = goods.indexOf(goods.find(item => item.user_id === getId));
    // console.log(index);
    goods.splice(index, 1);
    localStorage.setItem('userHash', JSON.stringify(goods));
    this.emit('reRender', goods, document);
  }
}

export default allRenderList;
