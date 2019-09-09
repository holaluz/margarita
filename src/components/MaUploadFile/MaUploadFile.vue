<template>
  <div v-cloak class="upload-file" @drop.prevent="onDropFile" @dragover.prevent>
    <input
      ref="fileInput"
      class="upload-file__file-input"
      type="file"
      @change="onAddFileInInput"
    />
    <ma-icon
      icon="UploadContract"
      width="35"
      height="47"
      icon-color="#E6007D"
      class="upload-file__icon"
    />
    <div class="upload-file__content">
      <template v-if="!file">
        <span v-text="$t('files.uploads.dragFile')" />
        <a
          href=""
          @click.prevent="$refs.fileInput.click()"
          v-text="$t('files.uploads.alternativeAdvice')"
        ></a>
        <p
          v-text="
            $t('files.uploads.allowedFiles') + allowedFileTypesAsReadableList
          "
        />
      </template>
      <template v-else>
        <strong v-text="$t('files.uploads.summary')" /> <br />
        <span class="upload-file__file-name">
          {{ file.name }} - {{ toKb(file.size) }}
          {{ $t('files.uploads.file-size-unit') }}
          <ma-button
            class="upload-file__delete-button"
            category="no-background"
            v-bind="$attrs"
            :text="$t('files.uploads.delete')"
            @click="removeFile(file)"
          >
            {{ $t('files.uploads.delete') }}
            <ma-icon icon="Close" width="10" height="10" icon-color="#E6007D" />
          </ma-button>
        </span>
      </template>
      <transition name="fade">
        <span class="error" v-if="error" v-text="error" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',

  props: {
    allowedFileTypes: {
      type: Array,
      default: () => [],
    },
    value: {
      type: File,
      default: null,
    },
  },

  data() {
    return {
      error: '',
    }
  },

  computed: {
    file: {
      get() {
        return this.value
      },
      set(file) {
        this.$emit('input', file)
      },
    },

    uploadDisabled() {
      return this.files.length === 0
    },

    allowedFileTypesAsReadableList() {
      return this.allowedFileTypes.join(', ') + '.'
    },
  },

  methods: {
    onAddFileInInput() {
      this.addFile(this.$refs.fileInput.files[0])
    },

    onDropFile(event) {
      const { files } = event.dataTransfer
      if (!files) return
      if (files.length > 1) {
        this.error = this.$t('files.uploads.error')
        return
      }
      this.addFile(files[0])
    },

    addFile(file) {
      if (!file || this.allowedFileTypes.includes(file.type)) {
        this.file = file
        this.error = ''
      } else {
        this.file = null
        this.error =
          this.$t('files.uploads.errorWrongType') +
          this.allowedFileTypesAsReadableList
      }
    },

    removeFile() {
      this.$refs.fileInput.value = ''
      this.addFile(null)
    },

    toKb(size) {
      return Math.floor(size / 1024)
    },
  },
}
</script>

<style scoped lang="scss" src="./MaUploadFile.scss"></style>
