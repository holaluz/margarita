<template>
  <div>
    <slot name="content"></slot>
    <slot name="trigger"></slot>
  </div>
</template>

<script>
export default {}

/**

  <ma-tooltip>
    <template slot="content"></template>tooltip content
    <div slot="trigger">Open me</div>
  </ma-tooltip>

*/
</script>
