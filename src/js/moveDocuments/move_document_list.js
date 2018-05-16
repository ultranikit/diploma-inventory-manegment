/* eslint-disable no-return-assign,no-param-reassign,class-methods-use-this */
import Component from '../component';

class MoveDocList extends Component {
  init() {
    this.counter = 0;
    this.on('renderMoveDocuments', this.renderDocs.bind(this), document);
  }
  renderDocs(documents) {
    if (documents !== null) {
      documents = documents.filter(item => item.document === 3);
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
        for (let i = 0; i < this.uniqueLength.length; i += 1) {
          documents.forEach((item) => {
            if (item.document_number === this.uniqueLength[i]) {
              item.document_number = i;
            }
          });
        }
      }
      this.counter = 0;
      this.fullQuantity = 0;
      const maxDocLength = Math.max(...documents.map(item => item.document_number));
      const documentList = document.querySelector('#moveDocs');
      const outgoList = document.querySelector('#outgoDocs');
      const entryList = document.querySelector('#entryDocs');
      entryList.classList.remove('collapsible');
      outgoList.classList.remove('collapsible');
      documentList.classList.add('collapsible');
      const elem = document.querySelector('.collapsible');
      // eslint-disable-next-line no-unused-vars
      const instance = M.Collapsible.init(elem, {});
      documentList.innerHTML = '';
      const EntryName = 'Накладная на перемищение';
      for (let i = 0; i <= maxDocLength; i += 1) {
        const docFragment = document.createDocumentFragment();
        const elementLi = document.createElement('li');
        const elementDivHeader = document.createElement('div');
        const elementSpan = document.createElement('span');
        const elementDivBody = document.createElement('div');
        const divTable = document.createElement('table');
        const tableTbody = document.createElement('tbody');
        divTable.id = `docTableMove_${this.counter}`;
        const tableThead = document.createElement('thead');
        const theadTr = document.createElement('tr');
        const exportHtmlToExcel = document.createElement('a');
        exportHtmlToExcel.id = 'exportToExcel';
        exportHtmlToExcel.className = 'waves-effect waves-green btn-flat';
        exportHtmlToExcel.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        exportHtmlToExcel.style.marginTop = '10px';
        exportHtmlToExcel.innerText = 'Экспортировать в Excel';
        const entryInfoTable = document.createElement('tbody');
        tableThead.innerHTML = `
          
           <tr style="font-size: larger;">
            <td style="border: 0;border-bottom: 2px solid #000;padding-bottom: 0;">Накладная</td>
            <td id="docNumberMove_${this.counter}" style="border: 0;border-bottom: 2px solid #000;text-align: center;padding-bottom: 0;"></td>
            <td id="dateMove_${this.counter}" style="border: 0;border-bottom: 2px solid #000;padding-bottom: 0;"></td>
            <td  style="border: 0;border-bottom: 2px solid #000;padding-bottom: 0;"></td>
            <td style="border: 0;border-bottom: 2px solid #000;padding-bottom: 0;"></td>
            </tr>
          `;
        entryInfoTable.id = 'moveTd';
        entryInfoTable.innerHTML =
          `
       <tr>
          <td style="text-align:left;border:0;border-spacing:0;font-weight:500;">Организация: </td>
          <td id="companyMove_${this.counter}" style="text-align:left;border:0;border-spacing:0;font-weight:500;"></td>
       </tr>
       <tr>
          <td style="text-align:left;border:0;font-weight:500;">Склад отправитель: </td>
          <td id="storageMove_${this.counter}" style="text-align:left;border:0;font-weight:500;"></td>
       </tr>
       <tr>
          <td style="text-align:left;border:0;font-weight:500;">Склад получатель: </td>
          <td id="storageEntryMove_${this.counter}" style="text-align:left;border:0;font-weight:500;"></td>
       </tr>`;

        elementDivHeader.className = 'collapsible-header';
        // elementDivHeader.innerHTML = EntryName;
        elementSpan.className = 'new badge';
        elementSpan.setAttribute('data-badge-caption', '');
        elementDivBody.className = 'collapsible-body';
        theadTr.innerHTML = `
           <th style="border: 1px solid #000">№</th>
           <th style="border: 1px solid #000">Наименование товара</th>
           <th style="border: 1px solid #000">Количество</th>`;
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

        const selectCompany = document.querySelector(`#companyMove_${this.counter}`);
        const selectStorageEntry = document.querySelector(`#storageEntryMove_${this.counter}`);
        const selectStorage = document.querySelector(`#storageMove_${this.counter}`);
        const selectEntryData = document.querySelector(`#dateMove_${this.counter}`);
        const selectDocNumberEntry = document.querySelector(`#docNumberMove_${this.counter}`);
        // const selectTable = document.querySelector(`#docTable_${this.counter}`);
        // console.log(selectTable);
        // console.log(documents.length);
        this.addCount = 0;

        documents.forEach((item) => {
          const trItem = document.createElement('tr');
          const tdCount = document.createElement('td');
          const tdName = document.createElement('td');
          const tdQuantity = document.createElement('td');

          if (item.document_number === this.counter) {
            // console.log(this.newIndex);
            trItem.id = `${item.user_id}`;
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
            this.fullQuantity += Number(tdQuantity.innerHTML);
            trItem.appendChild(tdCount);
            trItem.appendChild(tdName);
            trItem.appendChild(tdQuantity);
            tableTbody.appendChild(trItem);
            elementDivHeader.innerHTML = `${EntryName} ${`№ ${item.move_number}`}`;
            elementSpan.innerHTML = `Дата перемищения: ${item.date}`;
            selectCompany.innerHTML = `${item.company}`;
            selectStorage.innerHTML = `${item.storage_name}`;
            selectStorageEntry.innerHTML = `${item.storage_entry_name}`;
            selectDocNumberEntry.innerHTML = `на перемещение № ${item.move_number} от`;
            selectEntryData.innerHTML = `${item.date}`;
          }
        });
        // const docTable = document.querySelector(`#docTableMove_${this.counter}`);
        const freeTr = document.createElement('tr');
        const fullSum = document.createElement('td');
        fullSum.style.border = '1px solid #000';
        fullSum.style.textAlign = 'center';
        fullSum.innerHTML = `Всего: ${this.fullQuantity}`;
        for (let k = 0; k < 2; k += 1) {
          const freeTd = document.createElement('td');
          freeTd.style.border = '0';
          freeTr.appendChild(freeTd);
        }
        const sendGet = document.createElement('tr');
        for (let k = 0; k <= 3; k += 1) {
          const freeTd = document.createElement('td');
          freeTd.style.textAlign = 'left';
          freeTd.style.fontWeight = '500';
          if (k === 0) {
            const textSpan = document.createElement('span');
            textSpan.style.position = 'relative';
            textSpan.style.top = '10px';
            textSpan.innerText = 'Отгрузил(ла):';
            freeTd.style.border = '0';
            freeTd.style.borderBottom = '1px solid #000';
            freeTd.appendChild(textSpan);
          } else if (k === 2) {
            const textSpan = document.createElement('span');
            textSpan.style.position = 'relative';
            textSpan.style.top = '10px';
            textSpan.innerText = 'Получил(ла):';
            freeTd.style.border = '0';
            freeTd.style.borderBottom = '1px solid #000';
            freeTd.appendChild(textSpan);
          } else if (k === 3) {
            freeTd.style.border = '0';
            freeTd.style.borderBottom = '1px solid #000';
          } else freeTd.style.border = '0';
          sendGet.appendChild(freeTd);
        }
        freeTr.appendChild(fullSum);
        tableTbody.appendChild(freeTr);
        tableTbody.appendChild(sendGet);
        elementDivHeader.appendChild(elementSpan);
        documentList.appendChild(docFragment);
        this.fullQuantity = 0;
        this.counter += 1;
      }
    }
  }

  exportToExcel(e, tableID, fileName = '') {
    console.log(e.target.previousElementSibling.id);
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

export default MoveDocList;
