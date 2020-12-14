export declare type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export type Layout = {
  readonly currentBreakpoint: Breakpoint
  getResponsivePropValue: (_: string | string[]) => string
}
