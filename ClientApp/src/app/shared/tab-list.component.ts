import { AfterContentInit, Component, ContentChildren, QueryList } from "@angular/core";
import { TabComponent } from "./tab.component";

@Component(
  {
    selector: 'app-tab-list',
    template: `
      <ul class="nav nav-tabs" role="tablist">
        <li *ngFor="let t of tabs" class="nav-item" role="presentation" (click)="selectTab(t)">
          <button class="btn btn-link nav-link" [class.active]="t.active" id="home-tab" type="button"
                  role="tab">
            {{t.tabName}}
          </button>
        </li>
      </ul>
      <ng-content></ng-content>
    `
  }
)
export class TabListComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    let activateTabs = this.tabs.filter(t => t.active);

    if (activateTabs.length == 0)
      this.selectTab(this.tabs.first);
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach(t => t.active = false);
    tab.active = true;
  }
}
