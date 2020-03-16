<template>
  <div class="call-me-now-feedback">
    <ma-alert :type="status">
      <i18n
        tag="p"
        class="call-me-now-feedback__text"
        :path="`callMeNow.status.${status}`"
      >
        <a
          slot="link"
          class="hl-link"
          href="tel:900670111"
          v-text="`900 670 111`"
        />
      </i18n>
    </ma-alert>
  </div>
</template>

<script>
const VALID_STATUS_LIST = ['success', 'error']

export default {
  name: 'CallMeNowFeedback',

  props: {
    status: {
      type: String,
      required: true,
      validator: s => VALID_STATUS_LIST.includes(s),
    },
  },
}
</script>

<style lang="scss">
.call-me-now-feedback {
  padding-top: rem(16px);
  color: get-color('tundora');

  &__text {
    margin: 0;

    a {
      white-space: nowrap;
    }
  }
}
</style>
