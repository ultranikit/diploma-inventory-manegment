/* eslint-disable no-return-assign,no-param-reassign,class-methods-use-this */
import Component from '../component';

class OutGoDocList extends Component {
  init() {
    this.counter = 0;
    this.on('renderOutDocuments', this.renderDocs.bind(this), document);
  }
  renderDocs(documents) {
    if (documents !== null) {
      documents = documents.filter(item => item.document === 2);
      if (documents.length === 1) {
        documents.forEach(item => item.document_number = 0);
      } else {
        documents.sort((a, b) => a.document_number - b.document_number);
        this.uniqueLength = [];
        documents.forEach((item) => { // find all same document numbers and return once;
          if (!this.uniqueLength.includes(item.document_number)) {
            this.uniqueLength.push(item.document_number);
          }
        });
        // const maxDocLength = Math.max(...documents.map(item => item.document_number));
        for (let i = 0; i < this.uniqueLength.length; i += 1) {
          documents.forEach((item) => {
            if (item.document_number === this.uniqueLength[i]) {
              item.document_number = i;
            }
          });
        }
      }
      this.counter = 0;
      this.fullSum = 0;
      const maxDocLength = Math.max(...documents.map(item => item.document_number));
      const documentList = document.querySelector('#outgoDocs');
      const entryList = document.querySelector('#entryDocs');
      const moveList = document.querySelector('#moveDocs');
      entryList.classList.remove('collapsible');
      moveList.classList.remove('collapsible');
      documentList.classList.add('collapsible');
      const elem = document.querySelector('.collapsible');
      // eslint-disable-next-line no-unused-vars
      const instance = M.Collapsible.init(elem, {});
      documentList.innerHTML = '';
      const EntryName = 'Расходная накладная';
      for (let i = 0; i <= maxDocLength; i += 1) {
        const docFragment = document.createDocumentFragment();
        const elementLi = document.createElement('li');
        const elementDivHeader = document.createElement('div');
        const elementSpan = document.createElement('span');
        const elementDivBody = document.createElement('div');
        const divTable = document.createElement('table');
        const tableTbody = document.createElement('tbody');
        divTable.id = `docTableOut_${this.counter}`;
        const tableThead = document.createElement('thead');
        const theadTr = document.createElement('tr');
        const exportHtmlToExcel = document.createElement('a');
        exportHtmlToExcel.id = 'exportToExcel';
        exportHtmlToExcel.className = 'waves-effect waves-green btn-flat';
        exportHtmlToExcel.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        exportHtmlToExcel.innerText = 'Экспортировать в Excel';
        const entryInfoTable = document.createElement('tbody');
        tableThead.innerHTML = `
          
           <tr style="font-size: larger;">
            <td style="border: 0;border-bottom: 2px solid #000;padding-bottom: 0;">Расходная</td>
            <td id="docNumberOut_${this.counter}" style="border: 0;border-bottom: 2px solid #000;text-align: center;padding-bottom: 0;"></td>
            <td id="dateOut_${this.counter}" style="border: 0;border-bottom: 2px solid #000;padding-bottom: 0;"></td>
            <td  style="border: 0;border-bottom: 2px solid #000;padding-bottom: 0;"></td>
            <td style="border: 0;border-bottom: 2px solid #000;padding-bottom: 0;"></td>
            </tr>
          `;
        entryInfoTable.innerHTML =
          `

          <tr>
          <td style="text-align:left;border:0;border-spacing:0;font-weight:500;">Поставщик: </td>
          <td id="contractorOut_${this.counter}" style="text-align:left;border:0;border-spacing:0;font-weight:500;"></td>
       </tr>
        <tr>
          <td style="text-align:left;border:0;font-weight:500;">Покупатель: </td>
          <td id="customerOut_${this.counter}" style="text-align:left;border:0;font-weight:500;"></td>
       </tr>
        <tr>
          <td style="text-align:left;border:0;font-weight:500;width: 8%;">Склад: </td>
          <td id="storageOut_${this.counter}" style="text-align:left;border:0;font-weight:500;"></td>
       </tr>`;

        elementDivHeader.className = 'collapsible-header';
        // elementDivHeader.innerHTML = EntryName;
        elementSpan.className = 'new badge';
        elementSpan.setAttribute('data-badge-caption', '');
        elementDivBody.className = 'collapsible-body';
        theadTr.innerHTML = `
           <th style="border: 1px solid #000">№</th>
           <th style="border: 1px solid #000">Наименование товара</th>
           <th style="border: 1px solid #000">Количество</th>
           <th style="border: 1px solid #000">Цена без ПДВ</th>
           <th style="border: 1px solid #000">Сумма без ПДВ</th>`;
        exportHtmlToExcel.addEventListener('click', this.exportToExcel);

        divTable.appendChild(tableThead);
        divTable.appendChild(entryInfoTable);
        divTable.appendChild(theadTr);
        divTable.appendChild(tableTbody);
        // elementDivBody.appendChild(entryInfoTable);
        elementDivBody.appendChild(divTable);
        elementDivBody.appendChild(exportHtmlToExcel);
        elementLi.appendChild(elementDivHeader);
        elementLi.appendChild(elementDivBody);
        documentList.appendChild(elementLi);

        const selectContractor = document.querySelector(`#contractorOut_${this.counter}`);
        const selectCustomer = document.querySelector(`#customerOut_${this.counter}`);
        const selectStorage = document.querySelector(`#storageOut_${this.counter}`);
        const selectEntryData = document.querySelector(`#dateOut_${this.counter}`);
        const selectDocNumberEntry = document.querySelector(`#docNumberOut_${this.counter}`);
        // const selectTable = document.querySelector(`#docTable_${this.counter}`);
        // console.log(selectTable);
        // console.log(documents.length);
        this.addCount = 0;

        documents.forEach((item) => {
          const trItem = document.createElement('tr');
          const tdCount = document.createElement('td');
          const tdName = document.createElement('td');
          const tdQuantity = document.createElement('td');
          const tdPrice = document.createElement('td');
          const tdSum = document.createElement('td');

          if (item.document_number === this.counter) {
            // console.log(this.newIndex);
            trItem.id = `${item.product_id}`;
            tdCount.innerHTML = `${this.addCount += 1}`;
            tdCount.style.border = '1px solid #000';
            tdCount.style.textAlign = 'center';
            tdName.id = 'prod_name';
            tdName.innerHTML = `${item.product_name}`;
            tdName.style.border = '1px solid #000';
            tdName.style.textAlign = 'center';
            tdQuantity.id = `quantity_${this.addCount}`;
            tdQuantity.innerHTML = `${item.product_number}`;
            tdQuantity.style.border = '1px solid #000';
            tdQuantity.style.textAlign = 'center';
            tdPrice.id = `price_${this.addCount}`;
            tdPrice.innerHTML = `${item.product_price}`;
            tdPrice.style.border = '1px solid #000';
            tdPrice.style.textAlign = 'center';
            tdSum.id = `price_${this.addCount}`;
            tdSum.innerHTML = `${item.product_sum}`;
            tdSum.style.border = '1px solid #000';
            tdSum.style.textAlign = 'center';
            this.fullSum += Number(tdSum.innerHTML);
            trItem.appendChild(tdCount);
            trItem.appendChild(tdName);
            trItem.appendChild(tdQuantity);
            trItem.appendChild(tdPrice);
            trItem.appendChild(tdSum);
            tableTbody.appendChild(trItem);
            elementDivHeader.innerHTML = `${EntryName} ${`№ ${item.entry_number}`}`;
            elementSpan.innerHTML = `Дата продажи: ${item.date}`;
            selectContractor.innerHTML = `${item.contractor}`;
            selectCustomer.innerHTML = `${item.customer}`;
            selectStorage.innerHTML = `${item.storage_name}`;
            selectDocNumberEntry.innerHTML = `накладная № ${item.entry_number} от`;
            selectEntryData.innerHTML = `${item.date}`;
          }
        });
        const docTable = document.querySelector(`#docTableOut_${this.counter}`);
        const freeTr = document.createElement('tr');
        const fullSum = document.createElement('td');
        fullSum.style.border = '1px solid #000';
        fullSum.style.textAlign = 'center';
        fullSum.innerHTML = `Всего: ${this.fullSum}`;
        for (let k = 0; k < 4; k += 1) {
          const freeTd = document.createElement('td');
          freeTd.style.border = '0';
          freeTr.appendChild(freeTd);
        }
        freeTr.appendChild(fullSum);
        docTable.appendChild(freeTr);
        elementDivHeader.appendChild(elementSpan);
        documentList.appendChild(docFragment);
        this.fullSum = 0;
        this.counter += 1;
      }
    }
  }

  exportToExcel(e, tableID, fileName = '') {
    tableID = e.target.previousElementSibling.id;
    const tableSelect = document.getElementById(tableID);
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    // eslint-disable-next-line no-useless-concat
    const dataType = 'application/vnd.ms-excel' + '\uFEFF';
    // Specify file name
    fileName = fileName ? `${fileName}.xls` : 'excel_data.xls';

    // Create download link element
    const downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(['\ufeff', tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      // Create a link to the file
      downloadLink.href = `data:${dataType}, ${tableHTML}`;

      // Setting the file name
      downloadLink.download = fileName;

      // triggering the function
      downloadLink.click();
    }
  }
}

export default OutGoDocList;
