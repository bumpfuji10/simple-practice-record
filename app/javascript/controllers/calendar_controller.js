import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dialog", "dialogTitle", "dialogDate", "recordsList"]

  openDay(event) {
    const dayElement = event.currentTarget
    const dateStr = dayElement.dataset.date
    const recordsJson = dayElement.dataset.records

    if (!recordsJson || recordsJson === '[]') {
      return // レコードがない場合は何もしない
    }

    const records = JSON.parse(recordsJson)
    const date = new Date(dateStr)

    // ダイアログのタイトルと日付を設定
    this.dialogTitleTarget.textContent = `${date.getMonth() + 1}/${date.getDate()}の練習記録`
    this.dialogDateTarget.textContent = dateStr

    // レコードリストをクリア
    this.recordsListTarget.innerHTML = ''

    // 各レコードをリストに追加
    records.forEach(record => {
      const recordElement = this.createRecordElement(record)
      this.recordsListTarget.appendChild(recordElement)
    })

    // ダイアログを表示
    this.dialogTarget.showModal()
  }

  createRecordElement(record) {
    const div = document.createElement('div')
    div.className = 'dialog-record-item'

    const time = new Date(record.created_at).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    })

    div.innerHTML = `
      <div class="dialog-record-header">
        <h3 class="dialog-record-title">${this.escapeHtml(record.title)}</h3>
        <span class="dialog-record-time">${time}</span>
      </div>
      ${record.condition ? `<div class="dialog-record-condition">調子: ${record.condition}</div>` : ''}
      <p class="dialog-record-content">${this.escapeHtml(record.content)}</p>
    `

    return div
  }

  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  close() {
    this.dialogTarget.close()
  }

  closeOnBackdrop(event) {
    if (event.target === this.dialogTarget) {
      this.close()
    }
  }
}
