import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'rcn-show-hide',
  styleUrl: './show-hide.css',
  shadow: true
})
export class ShowHide {
  @Prop() for: string

  showHideElement() {
    const element: HTMLElement = document.getElementById(this.for)
    element.hidden = !element.hidden;
  }

  render() {
    return (
      <button onClick={this.showHideElement.bind(this)}>
        <slot></slot>
      </button>
    )
  }
}