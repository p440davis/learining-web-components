import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'pd-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop({ reflectToAttr: true }) name: string;

  render() {
    return (
      <aside>
        <header>
          <h1>{this.name}</h1>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    )
  }
}