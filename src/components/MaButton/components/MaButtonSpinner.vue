<template>
  <svg
    class="ma-button-spinner"
    width="18px"
    height="18px"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Loading</title>
    <circle
      class="ma-button-spinner__path"
      fill="none"
      stroke-width="6"
      stroke-linecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
</template>

<script>
export default {
  name: 'MaButtonSpinner',
}
</script>

<style scoped lang="scss" src="./MaButtonSpinner.scss"></style>
