<style lang="scss" src="./CallMeNow.scss"></style>

<template>
  <div v-if="show" class="call-me-now">
    <div class="call-me-now__box">
      <transition name="fade-cmn">
        <div v-if="!isOpen" class="call-me-now__toggle">
          <div
            class="call-me-now__toggle-button"
            role="button"
            data-testid="cmn-open-button"
            @click="toggleIsOpen"
          >
            <ma-icon
              :title="$t('open')"
              icon="Arrow"
              class="call-me-now__button-icon call-me-now__button-icon--open"
              width="8"
              height="8"
            />
          </div>
          <span class="call-me-now__title" v-text="computedTitle" />
        </div>
      </transition>
      <transition name="collapse-horizontal">
        <div v-if="isOpen" class="call-me-now__content">
          <div class="call-me-now__title-row">
            <span class="call-me-now__title" v-text="computedTitle" />
            <div
              class="call-me-now__toggle-button gtm_cerrarflotante"
              role="button"
              data-testid="cmn-close-button"
              @click="toggleIsOpen"
            >
              <ma-icon
                :title="$t('close')"
                icon="Close"
                class="call-me-now__button-icon"
                width="8"
                height="8"
              />
            </div>
          </div>
          <call-me-now-form
            v-if="!callMeNowStatus"
            :is-call-me-back="isCallMeBack"
            :event-category="eventCategory"
            :owner="owner"
            :calendar-id="calendarId"
            :contact-phone-key="contactPhoneKey"
          />
          <call-me-now-feedback v-else :status="callMeNowStatus" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CallMeNowForm from './_components/CallMeNowForm'
import CallMeNowFeedback from './_components/CallMeNowFeedback'

export default {
  name: 'CallMeNow',

  components: {
    CallMeNowForm,
    CallMeNowFeedback,
  },

  props: {
    isCallMeBack: {
      type: Boolean,
      default: false,
    },

    eventCategory: {
      type: String,
      required: true,
    },

    owner: {
      type: String,
      default: '17838303',
    },

    calendarId: {
      type: String,
      default: '',
    },

    contactPhoneKey: {
      type: String,
      default: 'informate',
    },
  },

  data() {
    return {
      isOpen: false,
      hasUserInteracted: false,
    }
  },

  computed: {
    ...mapState(['callMeNowStatus', 'isWorkTime']),

    computedTitle() {
      const title = this.isCallMeBack ? 'callMeBackTitle' : 'callMeNowTitle'
      return this.$t(title)
    },

    show() {
      return this.isWorkTime !== null
    },
  },

  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen
      this.hasUserInteracted = true
    },
  },
}
</script>

<i18n>
{
  "es": {
    "open": "Desplegar formulario",
    "close": "Cerrar formulario",
    "callMeNowTitle": "Te llamamos ahora",
    "callMeBackTitle": "Te llamamos. Dinos cuándo."
  }
}
</i18n>
