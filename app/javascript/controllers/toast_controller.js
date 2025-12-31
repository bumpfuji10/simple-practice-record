import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect() {
        requestAnimationFrame(() => {
            this.element.classList.add("fade-in")
        })
        // 5秒後にフェードアウト開始
        setTimeout(() => {
            this.element.classList.add("fade-out")

            // フェードアウトアニメーション完了後に削除
            setTimeout(() => {
                this.element.remove()
            }, 300) // 0.3秒のアニメーション時間
        }, 5000)
    }
}
