import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-tab',
  template: `
    <div [hidden]="!active" role="tabpanel">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input('tab-name') tabName = '';
  @Input() active = false;
}
