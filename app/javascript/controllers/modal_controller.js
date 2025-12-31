import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["newRecordModal"]

    connect() {
        this.boundHandleSubmitEnd = this.handleSubmitEnd.bind(this)
        document.addEventListener("turbo:submit-end", this.boundHandleSubmitEnd)
    }

    disconnect() {
        document.removeEventListener("turbo:submit-end", this.boundHandleSubmitEnd)
    }

    handleSubmitEnd(event) {
        if (event.detail.success) {
            event.detail.formSubmission.formElement.reset()
            this.close()
        }
    }

    open() {
        this.newRecordModalTarget.classList.remove("hidden")
    }

    close() {
        this.newRecordModalTarget.classList.add("hidden")
    }

    closeOnOverlay(event) {
        if (event.target === this.newRecordModalTarget) {
            this.close()
        }
    }

    stopPropagation(event) {
        event.stopPropagation()
    }
}