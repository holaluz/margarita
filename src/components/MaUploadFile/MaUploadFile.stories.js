import { storiesOf } from '@storybook/vue'
import {
  withKnobs,
  array,
  files
} from '@storybook/addon-knobs'

import notes from './MaUploadFile.md'
import MaUploadFile from '@margarita/components/MaUploadFile'
import MaIcon from '@margarita/components/MaIcon'
import MaGridColumn from '@margarita/components/MaGridColumn'

storiesOf('UploadFile', module)
  .addDecorator(withKnobs)
  .add(
    'UploadFile',
    () => {
      const allowedFileTypes = array('Allowed File Types', ['text/csv'])
      const value = files('File')

      return {
        components: { MaIcon, MaUploadFile, MaGridColumn },

        template: `
          <ma-grid-column>  
            <ma-upload-file :value="value" :allowedFileTypes="allowedFileTypes" />
          </ma-grid-column>
        `,

        props: {
          value: {
            default: value[0],
          },
          allowedFileTypes: {
            default: allowedFileTypes,
          },
        },
      }
    },
    { notes }
  )
