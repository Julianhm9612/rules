/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { AppConfig, Environment, isBlank, isPresent } from '@aribaui/core';
/**
 *
 * basic navigation bar provide a main action buttons for its content (page level buttons).
 * This is not the Top level application navigation. This component provides by default action OK,
 * CANCEL and you are free to modify how the OK or CANCEL will be call as well as subscribe to the
 * event. Or you can provide your own buttons template which will be used instead of this default
 * one.
 *
 *
 *
 *
 *
 * ### Example 1:
 *
 * In order to use navigation bar in its basic usage you can do following:
 * this will render buttons on the top as well as on the bottom around the content.
 *
 *
 *  ```html
 *
 *      <aw-basic-navigator [brandImg]="'img/aribalogobal.png'">
 *
 *            <div class="container">
 *                <form>
 *                    User name: <input type=text value="peter.pan">
 *                </<form>>
 *            </div>
 *      </aw-basic-navigator>
 *
 *
 * ```
 *
 *  if you do not want button on the top or bottom you can say thi using binding showTop or
 * showBottom.
 *
 *
 * ### Example 2:
 *  In this example we are providing custom buttons as well as brank section
 *
 *
 *  ```html
 *
 *
 *      <aw-basic-navigator [brandImg]="'img/aribalogobal.png'">
 *            <ng-template #buttons>
 *                <ul class="nav navbar-nav float-md-right collapse navbar-toggleable-xs">
 *                    <li class="nav-item ">
 *                        <button class="btn btn-secondary" type="button"
 * (click)="onSaveAction($evemt)">Cancel</button>
 *                    </li>
 *                    <li class="nav-item active">
 *                        <button class="btn btn-primary" type="button"
 * (click)="onCancelAction($event)"> Save
 *                        </button>
 *                    </li>
 *                </ul>
 *            </ng-template>
 *
 *            <ng-template #brand>
 *                <span class="brand-title">Ariba</span>
 *            </ng-template>
 *
 *
 *            <div class="container">
 *                <form>
 *                    User name: <input type=text value="peter.pan">
 *                </<form>>
 *            </div>
 *      </aw-basic-navigator>
 *
 *
 * ```
 *
 */
export class BasicNavigatorComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} appConfig
     */
    constructor(env, appConfig) {
        super(env);
        /**
         * Indicates that buttons will be rendered on the top
         *
         * Default value is TRUE
         *
         */
        this.showTop = true;
        /**
         * Indicates that buttons will be rendered on the bottom
         *
         * Default value is TRUE
         *
         */
        this.showBottom = true;
        /**
         * Indicates that brand section that is on the left side and only in the top bar is visible
         *
         * Default value is TRUE
         *
         */
        this.showBrand = true;
        /**
         *
         * EventEmitter that is triggered when you click on default OK Action
         *
         */
        this.onOKAction = new EventEmitter();
        /**
         *
         * EventEmitter that is triggered when you click on default CANCEL Action
         *
         */
        this.onCancelAction = new EventEmitter();
        // todo: load this from resource file using ngTranslate service
        this.okActionLabel = 'OK';
        this.cancelActionLabel = 'Cancel';
        this.brandImg = 'images/aribalogobal.png';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.showCancelButton)) {
            this.showCancelButton = this.editable || (this.onCancelAction.observers.length > 0
                && this.onOKAction.observers.length > 0);
        }
    }
    /**
     * Returns if buttonsTemplate is available
     *
     * @return {?}
     */
    hasButtonTemplate() {
        return isPresent(this.buttonsTemplate);
    }
    /**
     * Returns if brandTemplate is available
     *
     * @return {?}
     */
    hasBrandTemplate() {
        return isPresent(this.brandTemplate);
    }
}
BasicNavigatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-basic-navigator',
                template: `<p-toolbar *ngIf="showTop" [class]="'w-basic-navigator'">
    <div class="ui-toolbar-group-left">

        <a class="nav-brand" href="#" *ngIf="showBrand">
            <ng-template [ngIf]="!hasBrandTemplate()">
                <img src="{{assetFolder}}/{{brandImg}}" height="30" alt="">
                <span class="nav-brand-title">Ariba</span>
            </ng-template>

            <ng-template [embeddedItem]="brandTemplate" [item]="context"
                         *ngIf="hasBrandTemplate()"></ng-template>
        </a>

    </div>

    <div class="ui-toolbar-group-right">
        <ng-template [ngIf]="!hasButtonTemplate()">

            <aw-button *ngIf="showCancelButton" [style]="'secondary'"
                       (action)="onCancelAction.emit($event)">
                {{cancelActionLabel}}
            </aw-button>

            <aw-button (action)="onOKAction.emit($event)">
                {{okActionLabel}}
            </aw-button>


        </ng-template>
        <ng-template [embeddedItem]="buttonsTemplate" [item]="context"
                     *ngIf="hasButtonTemplate()"></ng-template>
    </div>

</p-toolbar>

<ng-content></ng-content>

<p-toolbar *ngIf="showBottom">

    <div class="ui-toolbar-group-right">
        <ng-template [ngIf]="!hasButtonTemplate()">

            <aw-button *ngIf="showCancelButton" [style]="'secondary'"
                       (action)="onCancelAction.emit($event)">
                {{cancelActionLabel}}
            </aw-button>

            <aw-button (action)="onOKAction.emit($event)">
                {{okActionLabel}}
            </aw-button>
        </ng-template>
        <ng-template [embeddedItem]="buttonsTemplate" [item]="context"
                     *ngIf="hasButtonTemplate()"></ng-template>
    </div>

</p-toolbar>



`,
                styles: [`a.nav-brand{vertical-align:middle;line-height:inherit;text-decoration:none;color:#2d353c}a.nav-brand:focus,a.nav-brand:hover{text-decoration:none}a.nav-brand span{vertical-align:middle}.nav-brand img{display:inline-block;vertical-align:middle;padding:3px}`]
            },] },
];
/** @nocollapse */
BasicNavigatorComponent.ctorParameters = () => [
    { type: Environment },
    { type: AppConfig }
];
BasicNavigatorComponent.propDecorators = {
    showTop: [{ type: Input }],
    showBottom: [{ type: Input }],
    showBrand: [{ type: Input }],
    brandImg: [{ type: Input }],
    okActionLabel: [{ type: Input }],
    cancelActionLabel: [{ type: Input }],
    context: [{ type: Input }],
    showCancelButton: [{ type: Input }],
    onOKAction: [{ type: Output }],
    onCancelAction: [{ type: Output }],
    buttonsTemplate: [{ type: ContentChild, args: ['buttons',] }],
    brandTemplate: [{ type: ContentChild, args: ['brand',] }]
};
function BasicNavigatorComponent_tsickle_Closure_declarations() {
    /**
     * Indicates that buttons will be rendered on the top
     *
     * Default value is TRUE
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.showTop;
    /**
     * Indicates that buttons will be rendered on the bottom
     *
     * Default value is TRUE
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.showBottom;
    /**
     * Indicates that brand section that is on the left side and only in the top bar is visible
     *
     * Default value is TRUE
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.showBrand;
    /**
     * Relative path to a image. Images are saved inside assets folder.
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.brandImg;
    /**
     * If you are not using custom buttons you can pass a label to OK action
     *
     * Default value is OK
     * @type {?}
     */
    BasicNavigatorComponent.prototype.okActionLabel;
    /**
     * If you are not using custom buttons you can pass a label to Cancel action
     *
     * Default value is OK
     * @type {?}
     */
    BasicNavigatorComponent.prototype.cancelActionLabel;
    /**
     * Context is an object which is rendered inside nav-bar content. Sometimes there are situation
     * that you want to render some information from the object inside navigation bar. So you are
     * free to pass a context object and then access it inside your template
     *
     * ```HTML
     *            <ng-template #brand let-item>
     *                <span class="brand-title">{{item.firstName}}</span>
     *            </ng-template>
     *
     * ```
     * @type {?}
     */
    BasicNavigatorComponent.prototype.context;
    /** @type {?} */
    BasicNavigatorComponent.prototype.showCancelButton;
    /**
     *
     * EventEmitter that is triggered when you click on default OK Action
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.onOKAction;
    /**
     *
     * EventEmitter that is triggered when you click on default CANCEL Action
     *
     * @type {?}
     */
    BasicNavigatorComponent.prototype.onCancelAction;
    /**
     * Queries a buttons template if any
     * @type {?}
     */
    BasicNavigatorComponent.prototype.buttonsTemplate;
    /**
     * Queries a brand template if any
     * @type {?}
     */
    BasicNavigatorComponent.prototype.brandTemplate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtbmF2aWdhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Jhc2ljLW5hdmlnYXRvci9iYXNpYy1uYXZpZ2F0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4SXpFLE1BQU0sOEJBQStCLFNBQVEsYUFBYTs7Ozs7SUF5R3RELFlBQVksR0FBZ0IsRUFBRSxTQUFvQjtRQUU5QyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7dUJBakdJLElBQUk7Ozs7Ozs7MEJBVUQsSUFBSTs7Ozs7Ozt5QkFTTCxJQUFJOzs7Ozs7MEJBbURPLElBQUksWUFBWSxFQUFPOzs7Ozs7OEJBUW5CLElBQUksWUFBWSxFQUFPOztRQXNCdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLHlCQUF5QixDQUFDO0tBQzdDOzs7O0lBRUQsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUM7bUJBQzNFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRDtLQUNKOzs7Ozs7SUFPRCxpQkFBaUI7UUFFYixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUMxQzs7Ozs7O0lBTUQsZ0JBQWdCO1FBRVosTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDeEM7OztZQTdNSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTJEYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxpUUFBaVEsQ0FBQzthQUM5UTs7OztZQTdJa0IsV0FBVztZQUF0QixTQUFTOzs7c0JBdUpaLEtBQUs7eUJBVUwsS0FBSzt3QkFTTCxLQUFLO3VCQU9MLEtBQUs7NEJBUUwsS0FBSztnQ0FRTCxLQUFLO3NCQWdCTCxLQUFLOytCQUlMLEtBQUs7eUJBUUwsTUFBTTs2QkFRTixNQUFNOzhCQU9OLFlBQVksU0FBQyxTQUFTOzRCQU10QixZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtBcHBDb25maWcsIEVudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG5cbi8qKlxuICpcbiAqIGJhc2ljIG5hdmlnYXRpb24gYmFyIHByb3ZpZGUgYSBtYWluIGFjdGlvbiBidXR0b25zIGZvciBpdHMgY29udGVudCAocGFnZSBsZXZlbCBidXR0b25zKS5cbiAqIFRoaXMgaXMgbm90IHRoZSBUb3AgbGV2ZWwgYXBwbGljYXRpb24gbmF2aWdhdGlvbi4gVGhpcyBjb21wb25lbnQgcHJvdmlkZXMgYnkgZGVmYXVsdCBhY3Rpb24gT0ssXG4gKiBDQU5DRUwgYW5kIHlvdSBhcmUgZnJlZSB0byBtb2RpZnkgaG93IHRoZSBPSyBvciBDQU5DRUwgd2lsbCBiZSBjYWxsIGFzIHdlbGwgYXMgc3Vic2NyaWJlIHRvIHRoZVxuICogZXZlbnQuIE9yIHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biBidXR0b25zIHRlbXBsYXRlIHdoaWNoIHdpbGwgYmUgdXNlZCBpbnN0ZWFkIG9mIHRoaXMgZGVmYXVsdFxuICogb25lLlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKiAjIyMgRXhhbXBsZSAxOlxuICpcbiAqIEluIG9yZGVyIHRvIHVzZSBuYXZpZ2F0aW9uIGJhciBpbiBpdHMgYmFzaWMgdXNhZ2UgeW91IGNhbiBkbyBmb2xsb3dpbmc6XG4gKiB0aGlzIHdpbGwgcmVuZGVyIGJ1dHRvbnMgb24gdGhlIHRvcCBhcyB3ZWxsIGFzIG9uIHRoZSBib3R0b20gYXJvdW5kIHRoZSBjb250ZW50LlxuICpcbiAqXG4gKiAgYGBgaHRtbFxuICpcbiAqICAgICAgPGF3LWJhc2ljLW5hdmlnYXRvciBbYnJhbmRJbWddPVwiJ2ltZy9hcmliYWxvZ29iYWwucG5nJ1wiPlxuICpcbiAqICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICogICAgICAgICAgICAgICAgPGZvcm0+XG4gKiAgICAgICAgICAgICAgICAgICAgVXNlciBuYW1lOiA8aW5wdXQgdHlwZT10ZXh0IHZhbHVlPVwicGV0ZXIucGFuXCI+XG4gKiAgICAgICAgICAgICAgICA8Lzxmb3JtPj5cbiAqICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgIDwvYXctYmFzaWMtbmF2aWdhdG9yPlxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiAgaWYgeW91IGRvIG5vdCB3YW50IGJ1dHRvbiBvbiB0aGUgdG9wIG9yIGJvdHRvbSB5b3UgY2FuIHNheSB0aGkgdXNpbmcgYmluZGluZyBzaG93VG9wIG9yXG4gKiBzaG93Qm90dG9tLlxuICpcbiAqXG4gKiAjIyMgRXhhbXBsZSAyOlxuICogIEluIHRoaXMgZXhhbXBsZSB3ZSBhcmUgcHJvdmlkaW5nIGN1c3RvbSBidXR0b25zIGFzIHdlbGwgYXMgYnJhbmsgc2VjdGlvblxuICpcbiAqXG4gKiAgYGBgaHRtbFxuICpcbiAqXG4gKiAgICAgIDxhdy1iYXNpYy1uYXZpZ2F0b3IgW2JyYW5kSW1nXT1cIidpbWcvYXJpYmFsb2dvYmFsLnBuZydcIj5cbiAqICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNidXR0b25zPlxuICogICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgZmxvYXQtbWQtcmlnaHQgY29sbGFwc2UgbmF2YmFyLXRvZ2dsZWFibGUteHNcIj5cbiAqICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbSBcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiXG4gKiAoY2xpY2spPVwib25TYXZlQWN0aW9uKCRldmVtdClcIj5DYW5jZWw8L2J1dHRvbj5cbiAqICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICogICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtIGFjdGl2ZVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiXG4gKiAoY2xpY2spPVwib25DYW5jZWxBY3Rpb24oJGV2ZW50KVwiPiBTYXZlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICogICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICAgICAgICA8L3VsPlxuICogICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNicmFuZD5cbiAqICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJhbmQtdGl0bGVcIj5BcmliYTwvc3Bhbj5cbiAqICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqXG4gKlxuICogICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gKiAgICAgICAgICAgICAgICA8Zm9ybT5cbiAqICAgICAgICAgICAgICAgICAgICBVc2VyIG5hbWU6IDxpbnB1dCB0eXBlPXRleHQgdmFsdWU9XCJwZXRlci5wYW5cIj5cbiAqICAgICAgICAgICAgICAgIDwvPGZvcm0+PlxuICogICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgPC9hdy1iYXNpYy1uYXZpZ2F0b3I+XG4gKlxuICpcbiAqIGBgYFxuXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWJhc2ljLW5hdmlnYXRvcicsXG4gICAgdGVtcGxhdGU6IGA8cC10b29sYmFyICpuZ0lmPVwic2hvd1RvcFwiIFtjbGFzc109XCIndy1iYXNpYy1uYXZpZ2F0b3InXCI+XG4gICAgPGRpdiBjbGFzcz1cInVpLXRvb2xiYXItZ3JvdXAtbGVmdFwiPlxuXG4gICAgICAgIDxhIGNsYXNzPVwibmF2LWJyYW5kXCIgaHJlZj1cIiNcIiAqbmdJZj1cInNob3dCcmFuZFwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFoYXNCcmFuZFRlbXBsYXRlKClcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cInt7YXNzZXRGb2xkZXJ9fS97e2JyYW5kSW1nfX1cIiBoZWlnaHQ9XCIzMFwiIGFsdD1cIlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2LWJyYW5kLXRpdGxlXCI+QXJpYmE8L3NwYW4+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW2VtYmVkZGVkSXRlbV09XCJicmFuZFRlbXBsYXRlXCIgW2l0ZW1dPVwiY29udGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJoYXNCcmFuZFRlbXBsYXRlKClcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2E+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1aS10b29sYmFyLWdyb3VwLXJpZ2h0XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaGFzQnV0dG9uVGVtcGxhdGUoKVwiPlxuXG4gICAgICAgICAgICA8YXctYnV0dG9uICpuZ0lmPVwic2hvd0NhbmNlbEJ1dHRvblwiIFtzdHlsZV09XCInc2Vjb25kYXJ5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwib25DYW5jZWxBY3Rpb24uZW1pdCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAge3tjYW5jZWxBY3Rpb25MYWJlbH19XG4gICAgICAgICAgICA8L2F3LWJ1dHRvbj5cblxuICAgICAgICAgICAgPGF3LWJ1dHRvbiAoYWN0aW9uKT1cIm9uT0tBY3Rpb24uZW1pdCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAge3tva0FjdGlvbkxhYmVsfX1cbiAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuXG5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtlbWJlZGRlZEl0ZW1dPVwiYnV0dG9uc1RlbXBsYXRlXCIgW2l0ZW1dPVwiY29udGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc0J1dHRvblRlbXBsYXRlKClcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuXG48L3AtdG9vbGJhcj5cblxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG48cC10b29sYmFyICpuZ0lmPVwic2hvd0JvdHRvbVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInVpLXRvb2xiYXItZ3JvdXAtcmlnaHRcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFoYXNCdXR0b25UZW1wbGF0ZSgpXCI+XG5cbiAgICAgICAgICAgIDxhdy1idXR0b24gKm5nSWY9XCJzaG93Q2FuY2VsQnV0dG9uXCIgW3N0eWxlXT1cIidzZWNvbmRhcnknXCJcbiAgICAgICAgICAgICAgICAgICAgICAgKGFjdGlvbik9XCJvbkNhbmNlbEFjdGlvbi5lbWl0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICB7e2NhbmNlbEFjdGlvbkxhYmVsfX1cbiAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuXG4gICAgICAgICAgICA8YXctYnV0dG9uIChhY3Rpb24pPVwib25PS0FjdGlvbi5lbWl0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICB7e29rQWN0aW9uTGFiZWx9fVxuICAgICAgICAgICAgPC9hdy1idXR0b24+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbZW1iZWRkZWRJdGVtXT1cImJ1dHRvbnNUZW1wbGF0ZVwiIFtpdGVtXT1cImNvbnRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJoYXNCdXR0b25UZW1wbGF0ZSgpXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cblxuPC9wLXRvb2xiYXI+XG5cblxuXG5gLFxuICAgIHN0eWxlczogW2BhLm5hdi1icmFuZHt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7bGluZS1oZWlnaHQ6aW5oZXJpdDt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojMmQzNTNjfWEubmF2LWJyYW5kOmZvY3VzLGEubmF2LWJyYW5kOmhvdmVye3RleHQtZGVjb3JhdGlvbjpub25lfWEubmF2LWJyYW5kIHNwYW57dmVydGljYWwtYWxpZ246bWlkZGxlfS5uYXYtYnJhbmQgaW1ne2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwYWRkaW5nOjNweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBCYXNpY05hdmlnYXRvckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGF0IGJ1dHRvbnMgd2lsbCBiZSByZW5kZXJlZCBvbiB0aGUgdG9wXG4gICAgICpcbiAgICAgKiBEZWZhdWx0IHZhbHVlIGlzIFRSVUVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1RvcDogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGF0IGJ1dHRvbnMgd2lsbCBiZSByZW5kZXJlZCBvbiB0aGUgYm90dG9tXG4gICAgICpcbiAgICAgKiBEZWZhdWx0IHZhbHVlIGlzIFRSVUVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0JvdHRvbTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCBicmFuZCBzZWN0aW9uIHRoYXQgaXMgb24gdGhlIGxlZnQgc2lkZSBhbmQgb25seSBpbiB0aGUgdG9wIGJhciBpcyB2aXNpYmxlXG4gICAgICpcbiAgICAgKiBEZWZhdWx0IHZhbHVlIGlzIFRSVUVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0JyYW5kOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFJlbGF0aXZlIHBhdGggdG8gYSBpbWFnZS4gSW1hZ2VzIGFyZSBzYXZlZCBpbnNpZGUgYXNzZXRzIGZvbGRlci5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYnJhbmRJbWc6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIElmIHlvdSBhcmUgbm90IHVzaW5nIGN1c3RvbSBidXR0b25zIHlvdSBjYW4gcGFzcyBhIGxhYmVsIHRvIE9LIGFjdGlvblxuICAgICAqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBpcyBPS1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb2tBY3Rpb25MYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSWYgeW91IGFyZSBub3QgdXNpbmcgY3VzdG9tIGJ1dHRvbnMgeW91IGNhbiBwYXNzIGEgbGFiZWwgdG8gQ2FuY2VsIGFjdGlvblxuICAgICAqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBpcyBPS1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2FuY2VsQWN0aW9uTGFiZWw6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogQ29udGV4dCBpcyBhbiBvYmplY3Qgd2hpY2ggaXMgcmVuZGVyZWQgaW5zaWRlIG5hdi1iYXIgY29udGVudC4gU29tZXRpbWVzIHRoZXJlIGFyZSBzaXR1YXRpb25cbiAgICAgKiB0aGF0IHlvdSB3YW50IHRvIHJlbmRlciBzb21lIGluZm9ybWF0aW9uIGZyb20gdGhlIG9iamVjdCBpbnNpZGUgbmF2aWdhdGlvbiBiYXIuIFNvIHlvdSBhcmVcbiAgICAgKiBmcmVlIHRvIHBhc3MgYSBjb250ZXh0IG9iamVjdCBhbmQgdGhlbiBhY2Nlc3MgaXQgaW5zaWRlIHlvdXIgdGVtcGxhdGVcbiAgICAgKlxuICAgICAqIGBgYEhUTUxcbiAgICAgKiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnJhbmQgbGV0LWl0ZW0+XG4gICAgICogICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJicmFuZC10aXRsZVwiPnt7aXRlbS5maXJzdE5hbWV9fTwvc3Bhbj5cbiAgICAgKiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbnRleHQ6IGFueTtcblxuXG4gICAgQElucHV0KClcbiAgICBzaG93Q2FuY2VsQnV0dG9uOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBFdmVudEVtaXR0ZXIgdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB5b3UgY2xpY2sgb24gZGVmYXVsdCBPSyBBY3Rpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uT0tBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEV2ZW50RW1pdHRlciB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHlvdSBjbGljayBvbiBkZWZhdWx0IENBTkNFTCBBY3Rpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2FuY2VsQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBRdWVyaWVzIGEgYnV0dG9ucyB0ZW1wbGF0ZSBpZiBhbnlcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdidXR0b25zJylcbiAgICBidXR0b25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBRdWVyaWVzIGEgYnJhbmQgdGVtcGxhdGUgaWYgYW55XG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnYnJhbmQnKVxuICAgIGJyYW5kVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuXG4gICAgY29uc3RydWN0b3IoZW52OiBFbnZpcm9ubWVudCwgYXBwQ29uZmlnOiBBcHBDb25maWcpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIC8vIHRvZG86IGxvYWQgdGhpcyBmcm9tIHJlc291cmNlIGZpbGUgdXNpbmcgbmdUcmFuc2xhdGUgc2VydmljZVxuICAgICAgICB0aGlzLm9rQWN0aW9uTGFiZWwgPSAnT0snO1xuICAgICAgICB0aGlzLmNhbmNlbEFjdGlvbkxhYmVsID0gJ0NhbmNlbCc7XG4gICAgICAgIHRoaXMuYnJhbmRJbWcgPSAnaW1hZ2VzL2FyaWJhbG9nb2JhbC5wbmcnO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2hvd0NhbmNlbEJ1dHRvbikpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NhbmNlbEJ1dHRvbiA9IHRoaXMuZWRpdGFibGUgfHwgKHRoaXMub25DYW5jZWxBY3Rpb24ub2JzZXJ2ZXJzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAmJiB0aGlzLm9uT0tBY3Rpb24ub2JzZXJ2ZXJzLmxlbmd0aCA+IDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGlmIGJ1dHRvbnNUZW1wbGF0ZSBpcyBhdmFpbGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0J1dHRvblRlbXBsYXRlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5idXR0b25zVGVtcGxhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgaWYgYnJhbmRUZW1wbGF0ZSBpcyBhdmFpbGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0JyYW5kVGVtcGxhdGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmJyYW5kVGVtcGxhdGUpO1xuICAgIH1cblxufVxuIl19