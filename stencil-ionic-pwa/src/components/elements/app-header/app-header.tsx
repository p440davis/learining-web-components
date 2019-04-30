import { Component, Prop, Event } from "@stencil/core";
import { EventEmitter } from "events";

@Component({
  tag: "app-header"
})
export class AppHeader {
  @Prop() pageTitle: string = "Home";
  @Prop() isHome: boolean = false;
  @Prop() delete: boolean = false;

  @Event({ composed: true, bubbles: true }) deleteClick: EventEmitter;

  onDelete() {
    this.deleteClick.emit("delete");
  }

  render() {
    let backButton = null;
    if (!this.isHome) {
      backButton = (
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" />
        </ion-buttons>
      );
    }

    let deleteButton = null;
    if (this.delete) {
      deleteButton = (
        <ion-buttons slot="primary">
          <ion-button onClick={this.onDelete.bind(this)}>
            <ion-icon name="trash" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      );
    }

    return [
      <ion-header>
        <ion-toolbar color="primary">
          {backButton}
          <ion-title>{this.pageTitle}</ion-title>
          {deleteButton}
        </ion-toolbar>
      </ion-header>
    ];
  }
}
