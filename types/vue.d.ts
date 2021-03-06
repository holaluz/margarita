import Vue from 'vue'
import { Layout } from './margarita'

// https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins
declare module 'vue/types/vue' {
  interface Vue {
    $layout: Layout
  }
}
