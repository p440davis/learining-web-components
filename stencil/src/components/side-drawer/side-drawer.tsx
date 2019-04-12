import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'rcn-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop() id: string

  render() {
    return [
      <rcn-show-hide for={this.id}>Menu</rcn-show-hide>,
      <rcn-show-hide class="backdrop" for={this.id}></rcn-show-hide>,
      <aside>
        <rcn-show-hide class="close" for={this.id}>&times;</rcn-show-hide>
        <slot />
      </aside>
    ]
  }
}