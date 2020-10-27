export default class NotificationMessage {
  static shownObject;

  constructor(
    message = '',
    {
      duration = 0,
      type = 'success'
    } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  innerHTML(){
    return `
      <div class="notification ${this.type}" style="--value: ${this.duration}ms">
        <div class="timer">
        </div>
        <div class="inner-wrapper">
          <div class="notification-header">
            ${this.type}
          </div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render(){
    const wrapperElement = document.createElement('div');
    wrapperElement.innerHTML = this.innerHTML();
    this.element = wrapperElement.firstElementChild;
  }

  removeOthersNotification (){
    if (NotificationMessage.shownObject) {
      NotificationMessage.shownObject.remove();
    }
    NotificationMessage.shownObject = this;
  }

  show(placeForShow = document.body){
    this.removeOthersNotification();
    placeForShow.append(this.element); //insertAdjacentElement("beforeend",
    setTimeout(() => this.destroy(), this.duration);
  }
}
