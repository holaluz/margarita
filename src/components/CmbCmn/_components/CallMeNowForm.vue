<template>
  <div class="call-me-now__form">
    <ma-text
      v-model="phone"
      :placeholder="$t('placeholder')"
      :label="$t('label')"
    >
      <ma-button
        slot="inputSibling"
        data-testid="submit-cmn-button"
        :loading="loading"
        :title="$t('buttonTitle')"
        :disabled="!isValidPhoneNumber"
        @click="onClickCallMe"
      >
        <ma-icon v-if="!loading" :title="$t('buttonTitle')" icon="Phone" />
      </ma-button>
    </ma-text>
    <i18n tag="p" path="privacyPolicy.text" class="call-me-now__privacy">
      <a
        slot="link"
        class="hl-link"
        href="https://www.holaluz.com/documentos-legales/politica-privacidad/"
        v-text="$t('privacyPolicy.link')"
      />
    </i18n>
    <i18n tag="p" path="description" class="call-me-now__description">
      <a
        slot="link"
        class="hl-link gtm_c2c-flotante"
        :href="$t(`contact.${contactPhoneKey}.href`)"
        v-text="$t(`contact.${contactPhoneKey}.text`)"
      />
    </i18n>
  </div>
</template>

<script>
import isValidPhone from '../_utils/validate-phone'
import { mapActions } from 'vuex'

export default {
  name: 'CallMeNowForm',

  props: {
    isCallMeBack: {
      type: Boolean,
      required: true,
    },

    eventCategory: {
      type: String,
      required: true,
    },

    owner: {
      type: String,
      required: true,
    },

    calendarId: {
      type: String,
      required: true,
    },

    contactPhoneKey: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      phone: '',
    }
  },

  computed: {
    // FIXME: we don't load this store module. What do we do with this?
    // ...mapState('callMeBackStore', ['leadId']),

    computedPhone() {
      return this.phone.replace(/\s/g, '')
    },

    isValidPhoneNumber() {
      return isValidPhone(this.computedPhone)
    },
  },

  methods: {
    ...mapActions(['createCallMeBack', 'createCallMeNow']),

    async onClickCallMe() {
      if (!this.isValidPhoneNumber) return

      this.loading = true

      if (this.isCallMeBack) {
        await this.executeCallMeBack()
      } else {
        await this.executeCallMeNow()
      }

      this.loading = false
      this.phone = ''
    },

    async executeCallMeBack() {
      await this.createCallMeBack(this.computedPhone)

      this.$gtm.pushEvent({
        event: 'gaEvent',
        eventAction: 'Llamadme(CMB)',
        eventCategory: this.eventCategory,
        eventLabel: 'flotante',
        // FIXME
        // lead: { id: this.leadId },
        trigger: 'submit',
      })

      let url = `https://app.acuityscheduling.com/schedule.php?owner=${this.owner}&phone=${this.computedPhone}`
      if (this.calendarId) {
        url += `&calendarID=${this.calendarId}`
      }

      window.open(
        url,
        'Schedule_Call',
        'location=no,scrollbars=no,resizable=no'
      )
    },

    async executeCallMeNow() {
      await this.createCallMeNow(this.computedPhone)

      this.$gtm.pushEvent({
        event: 'gaEvent',
        eventAction: 'Llamadme(CMN)',
        eventCategory: this.eventCategory,
        eventLabel: 'flotante',
        trigger: 'submit',
      })
    },
  },
}
</script>
<i18n>
{
  "es": {
    "placeholder": "Tu teléfono es...",
    "label": "Introduce tu teléfono",
    "buttonTitle": "Teléfono",
    "privacyPolicy": {
      "text": "Al introducir tu teléfono aceptas la {link}.",
      "link": "política de privacidad de Holaluz"
    },
    "description": "Si lo prefieres, llámanos al {link}. Es gratis 😉",
    "contact": {
      "informate": {
        "text": "900 67 07 07",
        "href": "tel:900670707"
      },
      "at-cliente": {
        "text": "900 64 92 92",
        "href": "tel:900649292"
      },
      "self-consumption": {
        "text": "900 67 01 70",
        "href": "tel:900670170"
      }
    }
  }
}
</i18n>
