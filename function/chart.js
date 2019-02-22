import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["data", "options", "label", "background"],
  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData: function() {
      return this.data;
    },
    labels: function() {
      return this.label;
    },
    backgroundColor: function() {
      return this.background;
    }
  },
  methods: {
    renderLineChart: function() {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              label: "Semester Average Grade",
              backgroundColor: this.backgroundColor,
              data: this.chartData
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );
    }
  },
  watch: {
    data: function() {
      this._chart.destroy();
      console.log(this.data);
      console.log(this.options);
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  }
};
