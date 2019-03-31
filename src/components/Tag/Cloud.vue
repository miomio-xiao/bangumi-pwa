<script>
import d3Cloud from 'd3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';

const fill = scaleOrdinal(schemeCategory10);

const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj)
    ? (clone.length = obj.length) && Array.from(clone)
    : clone;
};

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
      require: true
    },

    font: {
      type: [String, Function],
      default: 'serif'
    },

    fontSizeMapper: {
      type: Function,
      default: word => word.value
    },

    height: {
      type: Number,
      default: 0
    },

    width: {
      type: Number,
      default: 0
    },

    padding: {
      type: [Number, Function],
      default: 5
    },

    rotate: {
      type: [Number, Function],
      default: 0
    }
  },

  computed: {
    words() {
      return deepClone(this.data);
    }
  },

  methods: {
    draw() {
      if (!this.wordCloud) {
        return;
      }

      if (this.layout) {
        this.layout.stop();
      }

      const {
        words,
        padding,
        font,
        fontSizeMapper,
        rotate,
        onWordClick,
        onWordMouseOver,
        onWordMouseOut
      } = this;

      const rect = this.wordCloud.getBoundingClientRect();

      const width = this.width || rect.width;
      const height = this.height || rect.height;

      if (!width || !height) {
        return;
      }

      select(this.wordCloud)
        .selectAll('*')
        .remove();

      const layout = d3Cloud()
        .size([width, height])
        .font(font)
        .words(words)
        .padding(padding)
        .rotate(rotate)
        .fontSize(fontSizeMapper)
        .on('end', words => {
          const texts = select(this.wordCloud)
            .append('svg')
            .attr('width', layout.size()[0])
            .attr('height', layout.size()[1])
            .append('g')
            .attr(
              'transform',
              `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
            )
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .style('font-size', d => `${d.size}px`)
            .style('font-family', font)
            .style('fill', (d, i) => fill(i))
            .attr('text-anchor', 'middle')
            .attr(
              'transform',
              d => `translate(${[d.x, d.y]})rotate(${d.rotate})`
            )
            .text(d => d.text);

          texts.on('click', word => {
            this.$emit('on-word-click', word);
          });

        });

      this.layout = layout;

      layout.start();
    }
  },

  mounted() {
    this.wordCloud = this.$refs.cloud;

    if (this.data.length) {
      this.draw();
    }
  },

  watch: {
    words() {
      this.$nextTick(() => {
        this.draw();
      });
    }
  },

  render(h) {
    return h('div', {
      ref: 'cloud',
      class: 'tag-cloud'
    });
  }
};
</script>

<style scoped>
.tag-cloud {
  width: 100%;
  height: 100%;
}
</style>