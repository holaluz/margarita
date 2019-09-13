<template>
  <ma-text ref="field" :label="label" :placeholder="placeholder" />
</template>
<script>
import Pikaday from 'pikaday'
import MaText from '../MaText'
import locales from './locales'

export default {
  name: 'ma-datepicker',

  components: { MaText },

  props: {
    label: {
      type: String,
      default: '',
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    value: {
      type: Date,
      default: null,
    },
    locale: {
      type: String,
      default: 'es-ES',
    },
    isRange: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      pikaday: null,
    }
  },

  computed: {
    placeholder() {
      return locales[this.locale].format
    },
  },

  watch: {
    value(newVal) {
      this.pikaday.setDate(newVal)
      this.updateRangesIfIsRange()
    },
    startDate(newVal) {
      this.pikaday.setMinDate(newVal)
      this.updateRangesIfIsRange()
    },
    endDate(newVal) {
      this.pikaday.setMaxDate(newVal)
      this.updateRangesIfIsRange()
    },
    locale() {
      this.pikaday.destroy()
      this.initPikaday()
    },
  },

  mounted() {
    this.initPikaday()
  },

  beforeDestroy() {
    this.pikaday.destroy()
  },

  methods: {
    initPikaday() {
      // Configuration for Pikaday: https://github.com/Pikaday/Pikaday#configuration
      this.pikaday = new Pikaday({
        field: this.$refs.field.$el.querySelector('input'),
        onSelect: dateSelected => {
          if (
            (dateSelected &&
              this.value &&
              dateSelected.getDate() === this.value.getDate()) ||
            dateSelected === this.value
          )
            return
          this.$emit('input', dateSelected)
        },
        maxDate: this.endDate,
        minDate: this.startDate,
        defaultDate: this.value,
        setDefaultDate: true,
        format: locales[this.locale].format,
        firstDay: locales[this.locale].firstDay,
        startDate: this.startDate,
        i18n: locales[this.locale],
      })
      this.updateRangesIfIsRange()
    },

    updateRangesIfIsRange() {
      if (!this.isRange) return
      if (this.startDate) {
        this.pikaday.setStartRange(this.startDate)
        this.pikaday.setEndRange(this.value)
      } else if (this.endDate) {
        this.pikaday.setStartRange(this.value)
        this.pikaday.setEndRange(this.endDate)
      }
    },
  },
}
</script>

<style lang="scss" src="./MaDatepicker.scss"></style>
