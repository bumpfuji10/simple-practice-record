import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    labels: Array,
    data: Array
  }

  connect() {
    // Chart.jsが読み込まれるまで待機
    this.waitForChart()
  }

  waitForChart() {
    if (typeof Chart !== 'undefined') {
      this.renderChart()
    } else {
      // Chart.jsが読み込まれていない場合は少し待って再試行
      setTimeout(() => this.waitForChart(), 100)
    }
  }

  renderChart() {
    const ctx = this.element.getContext('2d')

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelsValue,
        datasets: [{
          label: '調子',
          data: this.dataValue,
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
  }
}
