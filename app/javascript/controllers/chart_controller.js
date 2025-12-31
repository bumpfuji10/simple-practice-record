import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["canvas", "monthly", "yearly", "monthSelect", "monthSelectContainer"]
  static values = {
    monthsData: Object,
    monthlyLabels: Array,
    monthlyData: Array
  }

  connect() {
    this.currentView = 'monthly'
    this.monthsDataObj = this.monthsDataValue

    // 現在の月をデフォルトに設定
    const currentMonthKey = Object.keys(this.monthsDataObj).sort().reverse()[0]
    this.currentMonth = currentMonthKey

    this.waitForChart()
  }

  waitForChart() {
    if (typeof Chart !== 'undefined') {
      this.renderChart()
    } else {
      setTimeout(() => this.waitForChart(), 100)
    }
  }

  switchToMonthly() {
    this.currentView = 'monthly'
    this.updateChart()
    this.updateButtons()
    this.updateMonthSelectVisibility()
  }

  switchToYearly() {
    this.currentView = 'yearly'
    this.updateChart()
    this.updateButtons()
    this.updateMonthSelectVisibility()
  }

  changeMonth(event) {
    this.currentMonth = event.target.value
    this.updateChart()
  }

  updateMonthSelectVisibility() {
    if (this.hasMonthSelectContainerTarget) {
      if (this.currentView === 'monthly') {
        this.monthSelectContainerTarget.style.display = 'block'
      } else {
        this.monthSelectContainerTarget.style.display = 'none'
      }
    }
  }

  updateButtons() {
    if (this.hasMonthlyTarget && this.hasYearlyTarget) {
      if (this.currentView === 'monthly') {
        this.monthlyTarget.classList.add('active')
        this.yearlyTarget.classList.remove('active')
      } else {
        this.monthlyTarget.classList.remove('active')
        this.yearlyTarget.classList.add('active')
      }
    }
  }

  renderChart() {
    const ctx = this.canvasTarget.getContext('2d')
    const currentMonthData = this.monthsDataObj[this.currentMonth]

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: currentMonthData.labels,
        datasets: [{
          label: '調子',
          data: currentMonthData.data,
          borderColor: '#1abc9c',
          backgroundColor: 'rgba(26, 188, 156, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#1abc9c',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: { size: 14 },
            bodyFont: { size: 13 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 1
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })

    this.updateButtons()
    this.updateMonthSelectVisibility()
  }

  updateChart() {
    if (!this.chart) return

    if (this.currentView === 'monthly') {
      const currentMonthData = this.monthsDataObj[this.currentMonth]
      this.chart.data.labels = currentMonthData.labels
      this.chart.data.datasets[0].data = currentMonthData.data
    } else {
      this.chart.data.labels = this.monthlyLabelsValue
      this.chart.data.datasets[0].data = this.monthlyDataValue
    }

    this.chart.update()
  }
}
