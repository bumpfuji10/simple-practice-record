import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dialog", "title", "date", "content", "condition"]

  connect(){
    this.dialogTarget.addEventListener('click', this.handleBackdropClick.bind(this))
  }

  disconnect() {
    this.dialogTarget.removeEventListener('click', this.handleBackdropClick.bind(this))
  }

  handleBackdropClick(event) {
    if (event.target === this.dialogTarget) {
      this.close()
    }
  }

  openWithData(event) {
    const card = event.currentTarget
    this.titleTarget.textContent = card.dataset.title
    this.dateTarget.textContent = card.dataset.date
    this.contentTarget.textContent = card.dataset.content
    this.conditionTarget.textContent = card.dataset.condition
    this.dialogTarget.showModal()
  }

  open() {
    this.dialogTarget.showModal()
  }

  close() {
    this.dialogTarget.close()
  }
}