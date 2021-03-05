<template>
  <div>
    <ma-text
      v-if="label"
      :for="id"
      tone="gray-dark"
      size="small"
      tag="label"
      v-text="label"
    />
    <div class="ma-range">
      <span
        v-for="(_, index) in new Array(bulletsAmount)"
        :key="`${index}-bullet`"
        :style="getBulletStyle(index)"
        class="ma-range__bullet"
      />
      <span :style="progressStyle" class="ma-range__progress" />
      <span :style="circleStyle" class="ma-range__circle" />
      <input
        :id="id"
        v-model="selectedValue"
        :max="stepsAmount - 1"
        class="ma-range__native-element"
        type="range"
        min="0"
        step="1"
      />
      <div
        v-for="(step, index) in steps"
        :key="`${step.value}-step`"
        :style="getStepStyle(index)"
        :class="{
          'ma-range__step--active': index === Number(selectedValue),
        }"
        class="ma-range__step"
        @click="updateSelectedValue(index)"
      >
        {{ step.text }}
      </div>
    </div>
  </div>
</template>

<script>
import MaText from '@margarita/components/MaText'
import uuid from '@margarita/utils/uuid'

const REQUIRED_STEP_KEYS = ['value', 'text']

/**
 * Renders a range input element following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-range--range)
 */
export default {
  name: 'MaRange',

  components: {
    MaText,
  },

  props: {
    /**
     * Current range value
     * @model
     */
    value: {
      type: String,
      required: true,
    },

    /**
     * Sets the range steps
     *.
     * ```ts
     *   <{
     *    text: string,
     *    value: any,
     *   }[]>
     * ```
     */
    steps: {
      type: Array,
      required: true,
      validator: (propValue) =>
        propValue.every((step) => {
          // eslint-disable-next-line no-prototype-builtins
          return REQUIRED_STEP_KEYS.every((key) => step.hasOwnProperty(key))
        }),
    },

    /**
     * Sets component's label
     */
    label: {
      type: String,
      default: '',
    },

    /**
     * Sets component's id
     */
    id: {
      type: String,
      default: uuid,
    },
  },

  computed: {
    selectedValue: {
      get() {
        return this.steps.findIndex((step) => step.value === this.value)
      },
      set(newValue) {
        this.$emit('input', this.steps[newValue].value)
      },
    },

    stepsAmount() {
      return this.steps.length
    },

    bulletsAmount() {
      return Math.max(this.stepsAmount - 2, 0)
    },

    offsetMultiplier() {
      return 100 / (this.stepsAmount - 1)
    },

    isFirstStep() {
      return Number(this.selectedValue) === 0
    },

    isLastStep() {
      return Number(this.selectedValue) === this.stepsAmount - 1
    },

    selectedStepOffset() {
      return Math.floor(this.selectedValue * this.offsetMultiplier)
    },

    circleStyle() {
      let circleOffset = `calc(${this.selectedStepOffset}% - 8px)`

      if (this.isFirstStep) {
        circleOffset = '16px'
      }
      if (this.isLastStep) {
        circleOffset = `calc(${this.selectedStepOffset}% - 16px)`
      }

      return { left: circleOffset }
    },

    progressStyle() {
      let progressBarWidth = `calc(${this.selectedStepOffset}% + 4px)`

      if (this.isFirstStep) {
        progressBarWidth = '32px'
      }
      if (this.isLastStep) {
        progressBarWidth = '100%'
      }

      return { width: progressBarWidth }
    },
  },

  methods: {
    getBulletStyle(index) {
      const leftOffset = Math.floor((index + 1) * this.offsetMultiplier)

      return {
        left: `calc(${leftOffset}% - 1px)`,
      }
    },

    getStepStyle(index) {
      let translateOffset = '-50%'

      if (index === this.stepsAmount - 1) {
        return {
          right: 0,
        }
      }

      // First step is justified to the slider
      if (index === 0) {
        translateOffset = '0%'
      }

      const leftOffset = Math.floor(index * this.offsetMultiplier)

      return {
        left: `calc(${leftOffset}%)`,
        transform: `translateX(${translateOffset})`,
      }
    },

    updateSelectedValue(newValue) {
      this.selectedValue = newValue
    },
  },
}
</script>

<style src="./MaRange.css" scoped></style>
