<template>
  <div>
    <div><slot name="content"></slot></div>
    <div><slot name="trigger"></slot></div>
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
