import { Component, Prop } from "@stencil/core";

@Component({
  tag: 'rcn-tooltip',
  styleUrl: './tooltip.css',
  shadow: true
})
export class tooltip {
  @Prop() tip: string
  render() {
    return [
      <slot />,
      <span>{this.tip}</span>
    ]
  }
}