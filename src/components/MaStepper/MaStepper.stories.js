import MaStepper from './MaStepper'
import docs from '../../../docs/components/MaStepper.docs.mdx'

export default {
  title: 'Components/Stepper',
  component: MaStepper,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xsmall', 'small', 'medium', 'large'],
      },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <ma-stepper v-bind="$props">
        <section>
            <ma-stack space="medium">
                <ma-heading level="3" size="small">Lorem ipsum</ma-heading>
                <ma-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Suspendisse non ante eget nisi sagittis ultrices a id sem. 
                    Vivamus euismod varius maximus.
                </ma-text>
            </ma-stack>
        </section>
        <ma-card>
            <ma-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Suspendisse non ante eget nisi sagittis ultrices a id sem. 
                Vivamus euismod varius maximus.
            </ma-text>
        </ma-card>
        <section>
            <ma-text size="medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Suspendisse non ante eget nisi sagittis ultrices a id sem. 
                Vivamus euismod varius maximus.
            </ma-text>
        </section> 
    </ma-stepper>
    `,
})

export const Stepper = Template.bind({})
