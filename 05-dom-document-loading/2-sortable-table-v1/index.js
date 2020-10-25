export default class SortableTable {
  constructor(header = [], {data=[]} = {}){
    this.header = header;
    this.data = data;

    this.render();
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  /*
    id: 'images',
    title: 'Image',
    sortable: false,
    template: (data = []) => {
      return `
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="${data[0]?.url}">
        </div>
      `;
    }
*/
  getHeaderColumns(sortColumn = '', order = ''){
    return this.header.map(headColumn => {
      const sortArrow = `${headColumn.sortable ? `<span data-element="arrow" class="sortable-table__sort-arrow">
                                                    <span class="sort-arrow"></span>
                                                  </span>` : ''}`;
      const sortedColumn = `${headColumn.id ===sortColumn ? ("data-order=" + order): ""}`;
      return `
        <div class="sortable-table__cell" data-name="${headColumn.id}" data-sortable="${headColumn.sortable}"
        ${sortedColumn}>
           <span>${headColumn.title}</span>
           ${sortArrow}
        </div>
      `
    }).join('');
  }

  getRowContent(row) {
    return this.header.map(column => {
      return column.template ? column.template(row[column.id])
        : `<div class="sortable-table__cell">${row[column.id]}</div>`
    }).join('');
  }

  getRows(data) {
    return data.map(row => {
      return `
         <a href="${row.id}" class="sortable-table__row">
           ${this.getRowContent(row)}
         </a>
        `
    }).join('');
  }

  innerHTML(){
    return `
      <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
         ${this.getHeaderColumns()}
        </div>
        <div data-element="body" class="sortable-table__body">
         ${this.getRows(this.data)}
        </div>
      </div>
    `;
  }

  getSortData(field = '', order = '') {
    const sortType = this.header.find(column => column.id === field).sortType;
    if ((sortType !== "number" && sortType !== "string") ||
        (order !== "asc" && order !== "desc")) {
      return this.data;
    }
    return [...this.data].sort(function (a, b) {
      function getSortResult() {
        switch (sortType) {
          case "number":
            return a[field] - b[field];
          case "string":
            return a[field].localeCompare(b[field], ['ru', 'en-US'], {caseFirst: 'upper'});
        }
      }
      if (order === 'asc')
        return getSortResult()
      else
        return getSortResult() * -1;
    });
  }

  render(){
    const wrapperElement = document.createElement('div');
    wrapperElement.innerHTML = this.innerHTML();
    this.element = wrapperElement.firstElementChild;
    this.elementHeaderTable = this.element.querySelector(`[data-element="header"]`);
    this.elementBodyTable = this.element.querySelector(`[data-element="body"]`);
  }

  setSortArrow(field = '', order = ''){
    //this.elementHeaderTable.querySelector(`[data-name="${field}"]`)
    //  .setAttribute("data-order", order);
    this.elementHeaderTable.innerHTML = this.getHeaderColumns(field, order);
  };

  setSortRow(field = '', order = ''){
    this.elementBodyTable.innerHTML = this.getRows(this.getSortData(field, order));
  }

  sort(field = '', order = ''){
    this.setSortArrow(field, order);
    this.setSortRow(field, order);
  }

  get subElements(){
    const elements = this.element.querySelectorAll('[data-element]')
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement
      return accum
    }, {})
  }
}

