import docs from '../../../docs/components/MaHidden.docs.mdx'
export default {
  title: 'Layout/Hidden',
  parameters: {
    docs: { page: docs },
  },
}

export const Hidden = () => {
  return {
    template: `
      <div>
        <ma-hidden below="tablet">1. I'm hidden below tablet!</ma-hidden>
        <ma-hidden below="desktop">2. I'm hidden below desktop!</ma-hidden>
        <ma-hidden above="mobile">3. I'm hidden above mobile!</ma-hidden>
        <ma-hidden above="tablet">4. I'm hidden above tablet!</ma-hidden>
      </div>
    `,
  }
}

export const InlineHidden = () => {
  return {
    template: `
      <p>
        Hidden
          <b>
            <ma-hidden inline below="tablet">below</ma-hidden>
            <ma-hidden inline above="mobile">above</ma-hidden>
          </b>
        tablet.
      </p>
    `,
  }
}
