import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["track", "fill", "thumb", "hiddenField", "valueDisplay"]

  connect() {
    this.isDragging = false
    this.minValue = 1
    this.maxValue = 10

    // 初期値がある場合は選択状態を復元
    const currentValue = this.hiddenFieldTarget.value
    if (currentValue) {
      this.setValue(parseInt(currentValue))
    }
  }

  startDrag(event) {
    event.preventDefault()
    this.isDragging = true

    // マウスとタッチの両方に対応
    const moveEvent = event.type === 'mousedown' ? 'mousemove' : 'touchmove'
    const endEvent = event.type === 'mousedown' ? 'mouseup' : 'touchend'

    const onMove = (e) => this.drag(e)
    const onEnd = () => {
      this.isDragging = false
      document.removeEventListener(moveEvent, onMove)
      document.removeEventListener(endEvent, onEnd)
    }

    document.addEventListener(moveEvent, onMove)
    document.addEventListener(endEvent, onEnd)
  }

  drag(event) {
    if (!this.isDragging) return
    this.updateValueFromEvent(event)
  }

  clickTrack(event) {
    this.updateValueFromEvent(event)
  }

  updateValueFromEvent(event) {
    const rect = this.trackTarget.getBoundingClientRect()
    const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))

    // 1-10の値に変換
    const value = Math.round(percentage * (this.maxValue - this.minValue) + this.minValue)
    this.setValue(value)
  }

  setValue(value) {
    // 値を範囲内に制限
    value = Math.max(this.minValue, Math.min(this.maxValue, value))

    // パーセンテージを計算
    const percentage = ((value - this.minValue) / (this.maxValue - this.minValue)) * 100

    // UIを更新
    this.fillTarget.style.width = `${percentage}%`
    this.thumbTarget.style.left = `${percentage}%`
    this.valueDisplayTarget.textContent = value

    // hidden fieldを更新
    this.hiddenFieldTarget.value = value
  }
}
