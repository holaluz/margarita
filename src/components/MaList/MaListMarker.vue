<template>
  <ma-text v-if="type === 'check'" tone="pink">
    <ma-icon
      icon="Checkmark"
      width="16"
      height="14"
      view-box-height="14"
      title="Check icon"
    />
  </ma-text>
  <ma-text v-else-if="type === 'bullet'" tone="pink">•</ma-text>
  <ma-text v-else>{{ index }}.</ma-text>
</template>

<script>
export default {
  name: 'MaListMarker',

  props: {
    type: { type: String, required: true },
    index: { type: Number, required: true },
  },
}
</script>
