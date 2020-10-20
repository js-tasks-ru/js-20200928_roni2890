export default class ColumnChart {
  chartHeight = 50;
  valueTagColumns = 'columns';
  elementChartColumns = {};
  constructor({
                data = [],
                label = '',
                link = '',
                value = 0
              } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;

    this.render();
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  getLink(){
    return this.link ? `<a class="column-chart__link" href="${this.link}">Тыкай</a>` : "";
  }

  getChartColumn(data){
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      const percent = (item / maxValue * 100).toFixed(0);
      return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
      }).join('');
  }

  innerHTML(){
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div class="column-chart__header">
            ${this.value}
          </div>
          <div class="column-chart__chart" data-element="${this.valueTagColumns}">
            ${this.getChartColumn(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  render(){
    const wrapperElement = document.createElement('div');
    wrapperElement.innerHTML = this.innerHTML();
    //все это будет обернуто еще в div который мы создали ранее, надо получить вложенный div
    const element = wrapperElement.firstElementChild;
    if (this.data.length) {
      element.classList.remove('column-chart_loading');
    }
    this.element = element;
    this.elementChartColumns = element.querySelector(`[data-element="${this.valueTagColumns}"]`);
  }

  update(newData){
    this.elementChartColumns.innerHTML = this.getChartColumn(newData);
  }
}
