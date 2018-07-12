import { Directive, Input, ViewContainerRef, Component, ElementRef, Renderer2, forwardRef, Inject, Optional, SkipSelf, Injectable, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, Pipe, EventEmitter, Output, NgZone, NgModule, InjectionToken, HostBinding, ContentChild, ContentChildren, ViewEncapsulation, ChangeDetectionStrategy, Injector, PLATFORM_ID, APP_INITIALIZER } from '@angular/core';
import { isPresent, isBlank, MapWrapper, AppConfig, Environment, noop, uuid, isStringMap, assert, StringWrapper, isType, objectToName, FieldPath, isArray, isString, isFunction, isJsObject, unimplemented, ListWrapper, equals, isBoolean, isDate, isEntity, RoutingService, AribaCoreModule, BooleanWrapper, print } from '@aribaui/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrencyPipe, CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { ButtonModule, ToolbarModule, CheckboxModule, AutoComplete, AutoCompleteModule, DropdownModule, InputTextModule as InputTextModule$1, CalendarModule, DialogModule, RadioButtonModule, InputTextareaModule, EditorModule, AccordionTab, AccordionModule, SharedModule, DomHandler, Listbox, ListboxModule, OverlayPanel, TreeDragDropService, ConfirmationService, Header, Footer, PrimeTemplate, Column, Row, HeaderColumnGroup, FooterColumnGroup, Accordion, AUTOCOMPLETE_VALUE_ACCESSOR, BlockUI, BlockUIModule, Breadcrumb, BreadcrumbModule, ButtonDirective, Button, Captcha, CaptchaModule, CALENDAR_VALUE_ACCESSOR, Calendar, Card, CardModule, Carousel, CarouselModule, UIChart, ChartModule, CHECKBOX_VALUE_ACCESSOR, Checkbox, CHIPS_VALUE_ACCESSOR, Chips, ChipsModule, CodeHighlighter, CodeHighlighterModule, COLORPICKER_VALUE_ACCESSOR, ColorPicker, ColorPickerModule, ConfirmDialog, ConfirmDialogModule, ContextMenuSub, ContextMenu, ContextMenuModule, DataGrid, DataGridModule, DataList, DataListModule, DataScroller, DataScrollerModule, DTRadioButton, DTCheckbox, ColumnHeaders, ColumnFooters, TableBody, ScrollableView, DataTable, DataTableModule, DeferredLoader, DeferModule, Dialog, Draggable, Droppable, DragDropModule, DROPDOWN_VALUE_ACCESSOR, Dropdown, EDITOR_VALUE_ACCESSOR, Editor, Fieldset, FieldsetModule, FileUpload, FileUploadModule, Galleria, GalleriaModule, GMap, GMapModule, Growl, GrowlModule, InplaceDisplay, InplaceContent, Inplace, InplaceModule, INPUTMASK_VALUE_ACCESSOR, InputMask, InputMaskModule, INPUTSWITCH_VALUE_ACCESSOR, InputSwitch, InputSwitchModule, InputText, InputTextarea, KEYFILTER_VALIDATOR, KeyFilter, KeyFilterModule, Lightbox, LightboxModule, LISTBOX_VALUE_ACCESSOR, MegaMenu, MegaMenuModule, MenuItemContent, Menu, MenuModule, MenubarSub, Menubar, MenubarModule, Messages, MessagesModule, UIMessage, MessageModule, MULTISELECT_VALUE_ACCESSOR, MultiSelect, MultiSelectModule, OrderList, OrderListModule, OrganizationChartNode, OrganizationChart, OrganizationChartModule, OverlayPanelModule, Paginator, PaginatorModule, Panel, PanelModule, BasePanelMenuItem, PanelMenuSub, PanelMenu, PanelMenuModule, Password, PasswordModule, PickList, PickListModule, ProgressBar, ProgressBarModule, ProgressSpinner, ProgressSpinnerModule, RADIO_VALUE_ACCESSOR, RadioButton, RATING_VALUE_ACCESSOR, Rating, RatingModule, Schedule, ScheduleModule, ScrollPanel, ScrollPanelModule, SELECTBUTTON_VALUE_ACCESSOR, SelectButton, SelectButtonModule, SlideMenuSub, SlideMenu, SlideMenuModule, SLIDER_VALUE_ACCESSOR, Slider, SliderModule, Sidebar, SidebarModule, SPINNER_VALUE_ACCESSOR, Spinner, SpinnerModule, SplitButton, SplitButtonModule, Steps, StepsModule, TabViewNav, TabPanel, TabView, TabViewModule, TabMenu, TabMenuModule, Terminal, TerminalModule, TieredMenuSub, TieredMenu, TieredMenuModule, TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButton, ToggleButtonModule, Toolbar, Tooltip, TooltipModule, UITreeNode, Tree, TreeModule, TreeTableService, TreeTable, TTBody, TTScrollableView, TTSortableColumn, TTSortIcon, TTResizableColumn, TTReorderableColumn, TTSelectableRow, TTSelectableRowDblClick, TTContextMenuRow, TTCheckbox, TTHeaderCheckbox, TTEditableColumn, TreeTableCellEditor, TreeTableToggler, TreeTableModule, TRISTATECHECKBOX_VALUE_ACCESSOR, TriStateCheckbox, TriStateCheckboxModule } from 'primeng/primeng';
import { animate, AnimationBuilder, state, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { ObjectUtils } from 'primeng/components/utils/objectutils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * When we have a custom component like dropdown, radiobuttonlist and
 * many more we want to provide a custom content to it like so:
 *
 * ```
 *  <aw-dropdown [list]="listOfUsers" let somehowGetItemOut>
 *      {{item.userName}}
 *
 *   <aw-dropdown
 *
 * ```
 * Who else would know how to render list of objects..
 *
 * But its not possible in current form. if I do not provide Angular some as they call it this
 * syntactic sugar *,
 *
 *
 * ```
 *  <aw-dropdown *mySugerDirective=.....>
 *      {{item.userName}}
 *
 *   <aw-dropdown
 * ```
 *
 *
 * then angular will not know  inside is a template and I wont be able to get hold of TemplateRef
 * inside the component
 *
 * So the only way I found (expecting I do not want to change anything in terms of bindings and the
 * signature I use it. I have to use it like this:
 *
 * ```
 *  <aw-dropdown [list]="listOfUsers" let somehowGetItemOut>
 *      <ng-template let-item> {{item.userName}}</ng-template>
 *
 *   <aw-dropdown
 *
 * ```
 *
 *  This way it could work. Since I am inside ngFor I want to render the item into the correct
 * viewContainer of ngFor's current item.
 *
 *  This way I can also expose item outside using Angular's special local variable called:
 * $implicit.
 *
 * This gets even more complex if we try to pass this template 2 levels down, like in case of
 * RadioButtonList. But later on I might want to refactor this into custom NG FOR
 *
 * @deprecated in favor of ngTemplateOutlet (will be removed in the next version)
 *
 */
class EmbeddedItemDirective {
    /**
     * @param {?} _viewContainer
     */
    constructor(_viewContainer) {
        this._viewContainer = _viewContainer;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    set item(item) {
        this._implicitValue = item;
    }
    /**
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (isPresent(this._viewRef)) {
            this._viewContainer.remove(this._viewContainer.indexOf(this._viewRef));
        }
        if (isPresent(this.embeddedItem)) {
            let /** @type {?} */ context = new EmbededItem(this._implicitValue);
            this._viewRef = this._viewContainer.createEmbeddedView(this.embeddedItem, context);
        }
    }
}
EmbeddedItemDirective.decorators = [
    { type: Directive, args: [{ selector: '[embeddedItem]' },] },
];
/** @nocollapse */
EmbeddedItemDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
EmbeddedItemDirective.propDecorators = {
    embeddedItem: [{ type: Input }],
    item: [{ type: Input }]
};
/**
 * Wrapper class around Angular's EmbeddedViewRef.context()
 *
 */
class EmbededItem {
    /**
     * @param {?} $implicit
     */
    constructor($implicit) {
        this.$implicit = $implicit;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * GenericContainerComponent is used by include-component.directive to dynamically create an
 * HTMLElement and use this element to wrap a child component. This is very useful when we want to
 * modify a child by wrapping it with a border, a background, or bold its text.
 *
 * The wrapper element is dynamically created. It's element is specified by the tagName property in
 * the bindings \@Input.
 *
 *  ### Example.  Directly in html
 *
 *   app.html
 *      <aw-generic-container tagName="tagName" bindings="bindings">
 *          <my-component ..bindings..></my-component>
 *      </aw-generic-container>
 *
 *   app.component.ts
 *
 *       tagName = (bBold) ? 'h1' : 'span';
 *       bindings = {  style: 'background-color: red' }
 *
 */
class GenericContainerComponent {
    /**
     * param renderer - Renderer is used to create 'tagName' element.
     * @param {?} renderer
     * @param {?} element
     */
    constructor(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.nativeElement = element.nativeElement;
    }
    /**
     * During the initialization, verify that at least one input has been set.
     * @return {?}
     */
    ngOnInit() {
        // If there's no input, this component wouldn't know what to do and throw exception.
        if (isBlank(this.bindings) && isBlank(this.tagName)) {
            throw new Error('GenericContainerComponent input bindings or tagName ' +
                'have not been set.');
        }
        // If the tagName is blank, the get it from bindings.
        if (isBlank(this.tagName)) {
            this.tagName = this.bindings.get('tagName');
            if (isBlank(this.tagName)) {
                this.tagName = GenericContainerComponent.DefaultTagName;
            }
        }
        // Save first added
        this.childElement = this.nativeElement.firstChild;
        this.doRender();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (isPresent(this.childElement) &&
            this.childElement.parentNode !== this.nativeElement.firstChild) {
            this.nativeElement.firstChild.appendChild(this.childElement);
        }
    }
    /**
     * After content has been initialized. Create the tagName element. Apply all the bindings on to
     * the element as attribute. Finally, move the child element, <ng-content>, to inside the
     * wrapper component.
     * @return {?}
     */
    doRender() {
        const /** @type {?} */ el = this.renderer.createElement(this.tagName);
        if (isPresent(this.nativeElement)) {
            this.renderer.appendChild(this.nativeElement, el);
        }
        // Loop through all the bindings and add them to the element.
        MapWrapper.iterable(this.bindings).forEach((v, k) => {
            this.renderer.setStyle(el, k, v);
        });
        // Attach the component to this divElement.
        el.appendChild(this.childElement);
    }
}
/**
 * Default tagName if none is specified inside bindings.
 *
 */
GenericContainerComponent.DefaultTagName = 'div';
GenericContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-generic-container',
                template: '<ng-content></ng-content>',
                styles: []
            },] },
];
/** @nocollapse */
GenericContainerComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
GenericContainerComponent.propDecorators = {
    bindings: [{ type: Input }],
    tagName: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *  Base component shares common functionality among all the components (layouts, widgets).
 *
 * @abstract
 */
class BaseComponent {
    /**
     * @param {?=} env
     */
    constructor(env) {
        this.env = env;
        /**
         * Adds disabled flag to the component
         *
         */
        this.disabled = false;
        /**
         * Weather this component is visible
         * Default is false;
         */
        this.visible = false;
        /**
         * Tell  the component if we are in editing mode.
         *
         */
        this.editable = true;
        /**
         * Removes padding from the component. Usually used when we are nesting other component with
         * its own grid.
         */
        this.omitPadding = false;
        /**
         * Prefix for the correct asset path
         */
        this.assetFolder = 'assets';
        this.extBindings = new Map();
        this.omitPadding = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.assetFolder = this.env.getValue(AppConfig.AssetFolder);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
}
BaseComponent.propDecorators = {
    disabled: [{ type: Input }],
    visible: [{ type: Input }],
    editable: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    styleClass: [{ type: Input }],
    omitPadding: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const WidgetSizeColumns = {
    xsmall: 1,
    small: 3,
    medium: 6,
    large: 9,
    xlarge: 12,
};
WidgetSizeColumns[WidgetSizeColumns.xsmall] = "xsmall";
WidgetSizeColumns[WidgetSizeColumns.small] = "small";
WidgetSizeColumns[WidgetSizeColumns.medium] = "medium";
WidgetSizeColumns[WidgetSizeColumns.large] = "large";
WidgetSizeColumns[WidgetSizeColumns.xlarge] = "xlarge";
/**
 *  BaseFormComponnet extends BaseComponent for add specific form behavior
 *
 * @abstract
 */
class BaseFormComponent extends BaseComponent {
    /**
     * Some of the BaseFormComponent can wrap other component and in these cases we want to
     * inherit some of the behavior from parent
     *
     * \@Inject(Environment) public env: Environment : is tem a workaround as without inject
     * on this specific component it complains that Environment is unresolved symbol
     *
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * Is current element visible
         */
        this.hidden = false;
        /**
         * Renders required flex around the component
         *
         */
        this.required = false;
        /**
         *  a text displayed when value is empty or NULL
         */
        this.placeHolder = '';
        /**
         * Identify if this control is used directly or if its part of some other control
         * e.g. GenericChooser and managed by this control.
         * Meaning State is mananged outside of this component
         *
         */
        this.isStandalone = true;
        this.onModelChanged = noop;
        this.onModelTouched = noop;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isPresent(this.parentContainer)) {
            this.formGroup = this.parentContainer.formGroup;
            this.editable = this.parentContainer.editable;
        }
        this.checkInitForm();
    }
    /**
     * Make sure that we have available formGroup and Name and ID
     *
     * @return {?}
     */
    checkInitForm() {
        if (isBlank(this.env.currentForm)) {
            this.env.currentForm = new FormGroup({});
        }
        /**
                 * Todo: Right now I just need to initialize name , but ideally it needs to be generated
                 * number basedon some semantics app.page.component if there are more component on the page
                 * then app.page.componentNumber. Simple solution is to is to get Elementref and query it.
                 */
        if (isBlank(this.name)) {
            this.name = uuid();
        }
        if (isBlank(this.id)) {
            this.id = uuid();
        }
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    doRegister(name, value) {
        let /** @type {?} */ fControl;
        if (isBlank(this.formGroup.controls[name])) {
            this.formGroup.registerControl(name, new FormControl(value));
            fControl = /** @type {?} */ (this.formGroup.controls[name]);
        }
        else {
            fControl = /** @type {?} */ (this.formGroup.controls[name]);
            let /** @type {?} */ updatedValue = isPresent(fControl.value) ? fControl.value : value;
            fControl.patchValue(updatedValue, { onlySelf: true, emitEvent: false });
        }
        return fControl;
    }
    /**
     * When we are dealing with Forms this is a helper method to register control
     *
     *
     * @param {?} value default value to be pre-set
     * @return {?}
     */
    registerFormControl(value) {
        this.formControl = this.doRegister(this.name, value);
        if (this.disabled) {
            this.formControl.disable();
        }
    }
    /**
     * @return {?}
     */
    get formGroup() {
        return isPresent(this._formGroup) ? this._formGroup : this.env.currentForm;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set formGroup(value) {
        this._formGroup = value;
    }
    /**
     * Indicates if we can pass field type as a binding to the components. e.g. InputField need
     * such type to correctly render input type=text, number
     *
     * todo: is this needed? can we maybe pass this to the formRow?
     * @return {?}
     */
    canSetType() {
        return false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChanged = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
}
/*
     *  Supported layout constants. It is expected there will be more options as we currently
     *  support only these two there will be other variations of it. e.g. for stacked it will not
     *  be 1 columns like it is now but multiple columns
     *
     */
BaseFormComponent.LayoutStacked = 'stacked';
BaseFormComponent.LayoutInline = 'inline';
/** @nocollapse */
BaseFormComponent.ctorParameters = () => [
    { type: Environment, decorators: [{ type: Inject, args: [Environment,] }] },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
BaseFormComponent.propDecorators = {
    name: [{ type: Input }],
    id: [{ type: Input }],
    hidden: [{ type: Input }],
    required: [{ type: Input }],
    placeHolder: [{ type: Input }],
    isStandalone: [{ type: Input }],
    formGroup: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Simple component rendering values in the read only mode. Just needed some component used
 * to render Strings in read only mode
 *
 *
 *  ### Example
 *
 * Using it inside form container along with label
 *
 *
 *  ```
 * \@Component({
 *              selector: 'userInfo' ,
 *              template: `
 *                      <aw-form-table [editable]="false" >
 *                          <aw-form-row [name]="fieldName"  [label]="label">
 *                                 <aw-string [value]="inputValue" ></aw-string>
 *                           </aw-form-row>
 *                      </aw-form-table>
 *
 *                  `
 *          })
 *          export class UserProfileComponent
 *          {
 *              inputValue: string = 'Some text';
 *              inputType: string = 'string';
 *              fieldName: string = 'firstName';
 *              label: string = 'My Name';
 *              required: boolean = true;
 *              editing: boolean = true;
 *              labelsOnTop: boolean = false;
 *
 *          }
 *
 *  ```
 *
 * You can also pass html tags.
 *
 */
class StringComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} sanitizer
     * @param {?} parentContainer
     */
    constructor(env, sanitizer, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.sanitizer = sanitizer;
        this.parentContainer = parentContainer;
        /**
         *  Value to be interpolated
         *
         */
        this._value = '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.sanitizer.bypassSecurityTrustHtml(this._value);
    }
}
StringComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-string',
                template: `
        <span class="w-string-field" [innerHTML]="value"></span>
    `,
                styles: [`.w-string-field{display:inline-block}`]
            },] },
];
/** @nocollapse */
StringComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomSanitizer },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
StringComponent.propDecorators = {
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * A class holding a references to components. The methods are self-explanatory.
 *
 */
class ComponentRegistry {
    /**
     * @param {?} env
     */
    constructor(env) {
        this.env = env;
        this._nameToType = new Map();
    }
    /**
     * @param {?} references
     * @return {?}
     */
    initialize(references) {
        this.registerTypes(references);
        let /** @type {?} */ promise = new Promise((resolve) => {
            resolve(true);
        });
        return promise;
    }
    /**
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    registerType(name, type) {
        if (!this.nameToType.has(name)) {
            this._nameToType.set(name, type);
        }
    }
    /**
     * @param {?} references
     * @return {?}
     */
    registerTypes(references) {
        if (!isStringMap(references)) {
            return;
        }
        Object.keys(references).forEach((name) => {
            this.registerType(name, references[name]);
        });
    }
    /**
     * @return {?}
     */
    get nameToType() {
        return this._nameToType;
    }
}
ComponentRegistry.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ComponentRegistry.ctorParameters = () => [
    { type: Environment }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *  `IncludeComponent` directive dynamically instantiate and insert a components into the screen
 * based on the name. It can accepts bindings as well which will be automatically bound and applied
 * to the component
 *
 *  ### usage:
 *
 *  Instead of inserting component in the way:
 *
 *  ```
 *    <textfield value="some value">
 *
 *  ```
 *
 *  you can do so dynamically like this:
 *
 * ```
 *  <aw-include-component 'TextfieldComponent' [bindings]=bindings ></aw-include-component>
 * ```
 *
 * This is the main building block to dynamically generated UI.
 *
 *
 * Todo: Currently the way Angular API work and we use it to create programatically components
 * is too complext we need to create everything 3 different calls to place a component to the
 * container. What I want is is to create some kind of representation of ContainerElement and this
 * can be also parent for our BaseComponent with method add and remove content. Then we could have
 * some AWContent.
 *
 * e.g.: to replace applyContentElementIfAny where we have several calls to create and add
 * component to the view.
 *
 * ```ts
 *  let containerElement = AWConcreteTemplate(viewContainer, factoryResolver)
 *  containerElement.add('Clck Me')
 * ```
 *
 * To assemble different components together - not only adding string content
 *
 * ```ts
 *  let content = new AWContent(ButtonComponent, bindingsMap)
 *  content.add('Click Me');
 *  containerElement.add(content)
 *
 * ```
 *
 * add more component hierarchy:
 *
 * ```ts
 *  let content = new AWContent(HoverCardComponnets, bindingsMap)
 *  content.add(createLayout();
 *  containerElement.add(content)
 *
 * ```
 *
 *
 *
 *
 */
class IncludeComponentDirective {
    /**
     * @param {?} viewContainer
     * @param {?} factoryResolver
     * @param {?} cd
     * @param {?} compRegistry
     */
    constructor(viewContainer, factoryResolver, cd, compRegistry) {
        this.viewContainer = viewContainer;
        this.factoryResolver = factoryResolver;
        this.cd = cd;
        this.compRegistry = compRegistry;
        /**
         * I use this flag to identify that component is rendering for first time or its updated during
         * change detection
         *
         */
        this.initRenderInProgress = false;
        /**
         * Not sure if we need this, but want to keep it here or maybe move it to some service so we
         * can cache created components and maybe reuse them.
         *
         */
        this.componentReferences = new Map();
        this.bindings = new Map();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initRenderInProgress = true;
        // todo: check if this the right lifecycle callback, this is called only once and you want
        // to probably listen for changes, and change dection decide there is some change and we
        // need to re-draw the view
        this.viewContainer.clear();
        this.doRenderComponent();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (isPresent(changes['name']) &&
            (changes['name'].currentValue !== changes['name'].previousValue)) {
            this.viewContainer.clear();
            this.doRenderComponent();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.initRenderInProgress = false;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // check to see if we need to render and reposition DOM element both for wrapper and
        // content
        this.createWrapperElementIfAny();
        this.createContentElementIfAny();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
    /**
     * Handles a case where we need to resolve additional component and wrap the current one.
     * Just like reateContentElementIfAny() this method needs to be executed after all
     * is created and initialized (inside the ngAfterViewInit() )
     *
     * @return {?}
     */
    createWrapperElementIfAny() {
    }
    /**
     * Renders a component into actual View Container. The process goes as this.
     *  1. We retrieve component Type based on the component name, which creates componentRef
     *  2. Place the component onto the screen
     *  3. Read component metadata, mainly INPUTs and apply bindings for each of them
     *  4. Manually spin change detection to update the screen. Mainly for case where I need to
     * redraw a screen
     * @return {?}
     */
    doRenderComponent() {
        this.placeTheComponent();
        // this.currentComponent.changeDetectorRef.detach();
        this.applyBindings(this.componentReference(), this.currentComponent, this.bindings);
        // this.currentComponent.changeDetectorRef.detectChanges();
        // Still not sure about this what all I should release here.
        this.currentComponent.onDestroy(() => {
            // this.bindings.clear();
            // this.bindings = undefined;
            //
            // this.componentReferences.clear();
            // this.componentReferences = undefined;
            this.destroy();
        });
    }
    /**
     * Place actual component onto the screen using ViewContainerRef
     *
     * @return {?}
     */
    placeTheComponent() {
        let /** @type {?} */ reference = this.componentReference();
        this.currentComponent = this.viewContainer.createComponent(reference.resolvedCompFactory);
    }
    /**
     * When inserting Component that needs to have a content like e.g. hyperlink or button
     *
     * ```
     *   <button> MY NG CONTENT </button>
     *
     * ```
     *  this method applies and insert a child content into the main component. This method insert
     * a simple string. We are not wrapping existing component with another component here.
     *
     * @return {?} need to run detect changes ? default is false
     */
    createContentElementIfAny() {
        let /** @type {?} */ detectChanges = false;
        let /** @type {?} */ ngContent = this.ngContent();
        let /** @type {?} */ ngContentElement = this.ngContentElement();
        if (isPresent(ngContent)) {
            let /** @type {?} */ awContentComponent = this.factoryResolver.resolveComponentFactory(StringComponent);
            let /** @type {?} */ component = this.viewContainer.createComponent(awContentComponent, 0);
            (/** @type {?} */ (component.instance)).value = ngContent;
            let /** @type {?} */ awContentContainer = this.currentComponent.location.nativeElement.firstChild;
            awContentContainer.appendChild(component.location.nativeElement);
            detectChanges = true;
        }
        else if (isPresent(ngContentElement)) ;
        return detectChanges;
    }
    /**
     *
     * Retrieve a NG Content from binding list and remove it so it its not prepagated down when
     * applying other bindings.
     *
     * @return {?}
     */
    ngContent() {
        let /** @type {?} */ content;
        if (isPresent(content = this.bindings.get(IncludeComponentDirective.NgContent))) {
            this.bindings.delete(IncludeComponentDirective.NgContent);
        }
        return content;
    }
    /**
     * @return {?}
     */
    ngContentElement() {
        let /** @type {?} */ content;
        if (isPresent(content = this.bindings.get(IncludeComponentDirective.NgContentElement))) {
            this.bindings.delete(IncludeComponentDirective.NgContentElement);
        }
        return content;
    }
    /**
     * We need to convert a component name to actual a type and then use ComponentFactoryResolver
     * to instantiate a a component and save its information into our component references. The
     * reason why we have this component reference is we need to store Angular's component metadata
     * so we can iterate thru all the inputs and bind them to the context.
     *
     * returns {ComponentReference} a reference representing a compoent currently being rendered
     * @return {?}
     */
    componentReference() {
        if (isPresent(this.resolvedComponentRef)) {
            return this.resolvedComponentRef;
        }
        let /** @type {?} */ currType = this.resolveComponentType();
        let /** @type {?} */ componentFactory = this.factoryResolver
            .resolveComponentFactory(currType);
        let /** @type {?} */ componentMeta = this.resolveDirective(componentFactory);
        let /** @type {?} */ compReference = {
            metadata: componentMeta,
            resolvedCompFactory: componentFactory,
            componentType: currType,
            componentName: this.name
        };
        this.resolvedComponentRef = compReference;
        return compReference;
    }
    /**
     * Iterates thru ComponentMetadata \@Inputs() and check if we have available binding inside the
     * 'this.bindings'
     * @param {?} cRef
     * @param {?} component
     * @param {?} bindings
     * @return {?}
     */
    applyBindings(cRef, component, bindings) {
        let /** @type {?} */ inputs = cRef.metadata.inputs;
        if (isBlank(inputs) || inputs.length === 0) {
            return;
        }
        // should we do any type conversion?
        MapWrapper.iterable(bindings).forEach((v, k) => {
            if (isPresent(component.instance[k])) {
                component.instance[k] = v;
            }
        });
    }
    /**
     * Resolves a component Type based on the string literal
     *
     * @return {?} component type used by `ComponentFactoryResolver`
     *
     * todo: rename the method so its clear that it returns component type based on string.
     */
    resolveComponentType() {
        let /** @type {?} */ componentType = this.compRegistry.nameToType.get(this.name);
        if (isBlank(componentType)) {
            assert(false, this.name + ' component does not exists. Create Dummy Component instead' +
                ' of throwing this error');
            return;
        }
        return componentType;
    }
    /**
     * @param {?} compFactory
     * @return {?}
     */
    resolveDirective(compFactory) {
        let /** @type {?} */ compMeta = {
            inputs: [],
            outputs: []
        };
        if (isPresent(compFactory.inputs) && compFactory.inputs.length > 0) {
            compFactory.inputs.forEach((input) => {
                compMeta.inputs.push(input.propName);
            });
        }
        if (isPresent(compFactory.outputs) && compFactory.outputs.length > 0) {
            compFactory.outputs.forEach((output) => {
                compMeta.outputs.push(output.propName);
            });
        }
        return compMeta;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (isPresent(this.currentComponent)) {
            this.currentComponent.destroy();
            this.currentComponent = undefined;
        }
        if (isPresent(this.viewContainer)) {
            this.viewContainer.clear();
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        if (isPresent(this.currentComponent)) {
            this.currentComponent = null;
            this.resolvedComponentRef = null;
        }
    }
}
IncludeComponentDirective.NgContent = 'ngcontent';
IncludeComponentDirective.NgContentElement = 'ngcontentElement';
IncludeComponentDirective.decorators = [
    { type: Directive, args: [{
                selector: 'aw-include-component'
            },] },
];
/** @nocollapse */
IncludeComponentDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: ComponentRegistry }
];
IncludeComponentDirective.propDecorators = {
    name: [{ type: Input }],
    bindings: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Error Manager is a service used by Forms components to map error codes into meaningful messages.
 * Currently it does not have much but once we plug in localization it will make more sense
 *
 *
 * todo: Once ng-translate is implemented replace this with ng-translate functionality so we can
 * externalize these messages into locale files.
 *
 */
class ErrorManagerService {
    constructor() {
        this.messages = {
            'required': 'Required field',
            'minlength': 'Field does not meet minimum length',
            'maxlength': 'Field does not meet maximum length',
            'customMsg': '%s',
            'metavalid': '%s'
        };
    }
    /**
     * @param {?} validatorName
     * @param {?=} validatorValue
     * @return {?}
     */
    errorMessage(validatorName, validatorValue) {
        let /** @type {?} */ message = this.messages[validatorName];
        if (StringWrapper.contains(message, '%s')) {
            // todo: use ng-translate with proper message formatting
            return StringWrapper.replace(message, '%s', validatorValue.msg);
        }
        return message;
    }
}
ErrorManagerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ErrorManagerService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * ErrorMessagesComponent is used by form's component like FormRow to print its validation errors.
 * Its  based on ModelDriven (Reactive forms) and it reads errors from FormControl
 *
 *
 *
 */
class ErrorMessagesComponent {
    /**
     * @param {?} errManager
     */
    constructor(errManager) {
        this.errManager = errManager;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    hasMessage() {
        let /** @type {?} */ msg = this.errorMsg;
        return isPresent(msg);
    }
    /**
     * Retrieve a messages if any registered by added validators
     *
     * @return {?}
     */
    get errorMsg() {
        for (let /** @type {?} */ propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return this.errManager.errorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
    }
    /**
     *
     * Show errors? We currently shows errors if the control is not valid, it was touched by user.
     * Most of the type on blur event  and at last its not pristine anymore (its dirty)
     *
     * @return {?}
     */
    showErrors() {
        return !this.control.valid && !this.control.pristine && this.control.touched;
    }
}
ErrorMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: 'a-error-messages',
                template: `
            <div class="ui-g">
                    <small *ngIf="hasMessage()"
                        class="ui-g-12 ui-message ui-messages-error ui-corner-all">
                        {{ errorMsg }}
                    </small>
            </div>
    `,
                styles: [``]
            },] },
];
/** @nocollapse */
ErrorMessagesComponent.ctorParameters = () => [
    { type: ErrorManagerService }
];
ErrorMessagesComponent.propDecorators = {
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Modal service is used to to create modal dialogs. It creates modal dialogs dynamically.
 * The service also keeps track of the created modal dialog and can close it by calling the
 * service's close()
 *
 * Modal service requires a ViewContainer to insert newly created modals. This is taken care
 * by the ModalComponent.
 *
 * Usage:
 *     Add   <aw-modal></aw-modal>  into your application main html. It needs to be on every
 *     page where a modal dialog will appear.
 *
 *    1.  Popup a dialog without creating your own component.
 *        Use the existing DialogComponent in widgets.
 *
 *             this.modalService.open<DialogComponent>(DialogComponent, {
 *                     title: 'My Popup Title',
 *                     body: 'My Popup Body'
 *              });
 *
 *
 *   2.   Creating your own Dialog Component to popup.
 *
 *         let componentRef = this.modalService.open<MyDialogComponent>(MyDialogComponent,
 * {inputs});
 *
 * \@Component({
 *                selector: 'aw-mydialog' ,
 *                           template: `
 *                                         <aw-dialog (onClose)="closePopup()">
 *                                              <ng-template #titleTemplate>
 *                                                 <span><i class="fa fa-envira" ></i>This is my
 *     Title </span>
 *                                              </ng-template>
 *                                              <ng-template #bodyTemplate>
 *                                                 <span><i class="fa fa-envira" ></i>This is my
 *     Body </span>
 *                                              </ng-template>
 *                                        </aw-dialog>
 *                                     `
 *         })
 *         export class MyDialogComponent extends DialogComponent implements OnInit {
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *
 *                     closePopup() {
 *                            this.modalService.close();
 *                      }
 *         }
 */
class ModalService {
    /**
     * DI ComponentFactoryResolver to be used to create modal component.
     *
     * @param {?} cfr
     */
    constructor(cfr) {
        this.cfr = cfr;
    }
    /**
     *  PlaceHolder for modal to be inserted.
     *
     * @param {?} vcRef
     * @return {?}
     */
    registerViewContainerRef(vcRef) {
        this.vcRef = vcRef;
    }
    /**
     * Opens the modal dialog by dynamically creating the component and adding it to vcRef.
     *
     * @template T
     * @param {?} component
     * @param {?=} parameters
     * @return {?}
     */
    open(component, parameters) {
        const /** @type {?} */ cf = this.cfr.resolveComponentFactory(component);
        let /** @type {?} */ componentRef = this.vcRef.createComponent(cf);
        // Auto set visiblity to true. So that the Dialog will display
        parameters = (parameters) ? parameters : {};
        parameters['visible'] = true;
        // Handle output parameters.
        ModalService.OUTPUT_PARAMETERS.forEach((param) => {
            if (parameters[param]) {
                (/** @type {?} */ (componentRef.instance))[param].subscribe(parameters[param]);
                delete parameters[param];
            }
        });
        Object.assign(componentRef.instance, parameters);
        // had to cast it in order to avoid any index Error
        // Attach a destroy method to the newly created component.
        (/** @type {?} */ (componentRef.instance))['destroy'] = () => {
            componentRef.destroy();
        };
        // Save the instance, so it can be destroyed later.
        this.instance = componentRef;
        return componentRef;
    }
    /**
     * Calling close() will remove the modal from view.
     * @return {?}
     */
    close() {
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }
    }
}
/**
 * This is a static list of output parameter from Dialog, Confirmation components
 * that needs to be handled.
 *
 */
ModalService.OUTPUT_PARAMETERS = ['onClose', 'onConfirm', 'onCancel'];
ModalService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ModalService.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Place holder for all modal dialogs. This component works with the modalService by providing
 * a place holder for it to inject Dialog component into.
 */
class ModalComponent {
    /**
     * @param {?} modalService
     */
    constructor(modalService) {
        this.modalService = modalService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
    }
}
ModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-modal',
                template: `<div #modal></div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ModalComponent.ctorParameters = () => [
    { type: ModalService }
];
ModalComponent.propDecorators = {
    viewContainerRef: [{ type: ViewChild, args: ['modal', { read: ViewContainerRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This currency formatter will ignore null and empty string for value.
 * Issue : https://github.com/angular/angular/issues/8694  DI fails when extends other classes
 */
class CurrencyFormatPipe {
    /**
     * @param {?} currencyPipe
     */
    constructor(currencyPipe) {
        this.currencyPipe = currencyPipe;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    transform(value, ...args) {
        // Default values
        let /** @type {?} */ currencyCode = 'USD', /** @type {?} */ symbolDisplay = true, /** @type {?} */ digits = '1.0-2';
        if (!value || value.length === 0) {
            return value;
        }
        if (args && args.length > 0) {
            let /** @type {?} */ code = args[0];
            if (code && code.length > 0) {
                currencyCode = code;
            }
        }
        return this.currencyPipe.transform(value, currencyCode, symbolDisplay, digits);
    }
}
CurrencyFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'currencyFormat',
                pure: false
            },] },
];
/** @nocollapse */
CurrencyFormatPipe.ctorParameters = () => [
    { type: CurrencyPipe }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Simple utility directive that is used by NG For cycle in situation where we need to call a
 * or execute some logic after each iteration
 */
class NgForSetDirective {
    constructor() {
        this.onItem = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.onItem.emit('--');
    }
}
NgForSetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngForSet]'
            },] },
];
/** @nocollapse */
NgForSetDirective.ctorParameters = () => [];
NgForSetDirective.propDecorators = {
    onItem: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Simple convenient service to work with the dom. All the future logic related to DOM manipulation
 * or traversal should be put into this service
 *
 */
class DomUtilsService {
    constructor() {
    }
    /**
     * goes all the way up to the body and checks if there is a element identified by a 'selector'
     *
     * @param {?} nativeElement
     * @param {?} selector
     * @return {?}
     */
    hasParent(nativeElement, selector) {
        return isPresent(this.closest(nativeElement, selector));
    }
    /**
     *  Travels all the way up to the BODY and retrieve element identified by 'selector' or NULL if
     * not found
     *
     * @param {?} nativeElement
     * @param {?} selector
     * @return {?}
     */
    closest(nativeElement, selector) {
        let /** @type {?} */ firstChar = selector.charAt(0);
        let /** @type {?} */ parentNode = nativeElement;
        while (isPresent((parentNode = parentNode.parentNode))) {
            if (firstChar === '.' && parentNode.classList.contains(selector.substr(1))) {
                return parentNode;
            }
            if (firstChar === '#' && parentNode.id === selector.substr(1)) {
                return parentNode;
            }
            // If selector is a tag
            if (parentNode.nodeType === 1 && parentNode.tagName.toLowerCase() === selector) {
                return parentNode;
            }
            if (parentNode.nodeType === 1 && parentNode.tagName === 'BODY') {
                return null;
            }
        }
        return null;
    }
    /**
     * When angular component is rendered along with NGContent it has its own _ngContent_INDEX
     * which always corresponds with _nghost_INDEX, this works fine if we have actual component
     * that is already rendered. If we are creating component programatically there is no way to
     * identify where the actual ng-content is placed within the component
     *
     * e.g. Consider following example:
     *
     *
     * Button Component Template:
     *
     * ```
     *  <span class=mybuttonTitle><ng-content></ng-content></span>
     * ```
     *
     * When you use button component as <aw-button>ClickMe</aw-button>  then its rendered as
     *
     * ```
     * <aw-button _nghost_123>
     *  <span _ngcontent_123 class=mybuttonTitle>ClickMe</span>
     * </aw-button>
     * ```
     *
     * But with programmatic API you instantiate Button and since it created without a Content it
     * looks like this;
     *
     *  ```
     * <aw-button _nghost_123>
     *  <span class=mybuttonTitle></span>
     * </aw-button>
     * ```
     *
     * Where do you place you child (content component)? Therefore utility css class was created
     * to wrap <ng-content> to get around this limitation.
     *
     *  ```
     *   <span class="u-ngcontent">
     *      <ng-content></ng-content>
     *   </span>
     *  ````
     *
     *
     *
     *
     * @param {?} parentNativeEl
     * @param {?} childNativeEl
     * @return {?}
     */
    insertIntoParentNgContent(parentNativeEl, childNativeEl) {
        // default behavior is to insert it as child to parentNativeEl
        let /** @type {?} */ ngContentParent = parentNativeEl;
        let /** @type {?} */ foundNgContent = parentNativeEl.querySelector('.u-ngcontent');
        if (isPresent(foundNgContent)) {
            // we don't cover a case where there could be multiple ngcontents
            ngContentParent = foundNgContent;
        }
        ngContentParent.appendChild(childNativeEl);
    }
    /**
     *
     * Retrieves current browser window width and height
     *
     * @return {?}
     */
    browserDimentions() {
        return {
            width: (window.innerWidth || document.documentElement.clientWidth
                || document.body.clientWidth),
            height: (window.innerHeight || document.documentElement.clientHeight
                || document.body.clientHeight)
        };
    }
    /**
     *
     * Retrieves elemements dimensions
     *
     * @param {?} element
     * @return {?}
     */
    elementDimensions(element) {
        if (isPresent(element.getBoundingClientRect)) {
            return element.getBoundingClientRect();
        }
        return { left: 0, top: 0, right: 0, bottom: 0, x: 0, y: 0, width: 0, height: 0 };
    }
}
DomUtilsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomUtilsService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * The Infinite Scroll allows you to perform an action when the user
 * scrolls a specified distance from the bottom or top of the page.
 *
 * The expression assigned to the `infinite` event is called when
 * the user scrolls to the specified distance. When this expression
 * has finished its tasks, it should call the `complete()` method
 * on the infinite scroll instance.
 *
 * ## Usage
 *
 * ```html
 *
 *  <div  *ngFor="let item of items">{{item}} </div>
 *   <aw-infinite-scroll (onLoad)="doInfinite($event)">
 *  </aw-infinite-scroll>
 *
 * ```
 *
 *
 * You can also set a threshold to change the distance when the lazy load kicks
 * in.
 * ## Usage
 *
 * ```html
 *
 *  <div  *ngFor="let item of items">{{item}} </div>
 *   <aw-infinite-scroll (onLoad)="doInfinite($event)"  [distance]="'15%'">
 *  </aw-infinite-scroll>
 *
 * ```
 */
class InfiniteScrollComponent {
    /**
     * @param {?} _render
     * @param {?} _zone
     * @param {?} domUtils
     * @param {?} _cd
     */
    constructor(_render, _zone, domUtils, _cd) {
        this._render = _render;
        this._zone = _zone;
        this.domUtils = domUtils;
        this._cd = _cd;
        this._lastCheck = 0;
        this._lastScrollTop = 0;
        this._thr = '10%';
        this._thrPx = 0;
        this._thrPc = 0.10;
        this._init = false;
        /**
         * \@internal
         */
        this.state = STATE_ENABLED;
        /**
         * \@output {event} Emitted when the scroll reaches
         * the threshold distance. From within your infinite handler,
         * you must call the infinite scroll's `complete()` method when
         * your async operation has completed.
         */
        this.onLoad = new EventEmitter();
        /**
         *
         * Lazy load current numbers. tell the app starting point and what is the size of loaded
         * list
         *
         */
        this.fetchSize = 0;
        this.loadOffset = 0;
    }
    /**
     * \@input {string} The threshold distance from the bottom
     * of the content to call the `onLoad` output event when scrolled.
     * The threshold value can be either a percent, or
     * in pixels. For example, use the value of `10%` for the `infinite`
     * output event to get called when the user has scrolled 10%
     * from the bottom of the page. Use the value `100px` when the
     * scroll is within 100 pixels from the bottom of the page.
     * Default is `15%`.
     * @return {?}
     */
    get distance() {
        return this._thr;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set distance(val) {
        this._thr = val;
        if (val.indexOf('%') > -1) {
            this._thrPx = 0;
            this._thrPc = (parseFloat(val) / 100);
        }
        else {
            this._thrPx = parseFloat(val);
            this._thrPc = 0;
        }
    }
    /**
     * \@input {boolean} If true, Whether or not the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     * @param {?} shouldEnable
     * @return {?}
     */
    set enabled(shouldEnable) {
        this.enable(shouldEnable);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._render.addClass(document.body, 'has-infinite-scroll');
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    _onScroll(ev) {
        if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
            return;
        }
        // must throttle the class by 100ms
        if (this._lastCheck + 100 > ev.timeStamp) {
            // no need to check less than every XXms
            return;
        }
        this._lastCheck = ev.timeStamp;
        let /** @type {?} */ scrollTop = this.scrollTop();
        let /** @type {?} */ winHeight = this.domUtils.browserDimentions().height;
        const /** @type {?} */ height = Math.max(this._docBody.scrollHeight, this._docBody.offsetHeight, winHeight, this._content.scrollHeight, this._content.offsetHeight);
        if (!height) {
            // if there is no height of this element then do nothing
            return;
        }
        const /** @type {?} */ threshold = this._thrPc ? (height * this._thrPc) : this._thrPx;
        let /** @type {?} */ distanceFromInfinite = this._content.scrollHeight - winHeight - scrollTop - threshold;
        // console.log('Document height (' + height + ') , Distance from bottom '
        // + distanceFromInfinite + ',  => threshold = ' +
        //     this.distance + ' (' + threshold + ')');
        if (distanceFromInfinite < 0 && this._lastScrollTop < scrollTop) {
            this.fireOnLazyLoad();
        }
        else if (this._lastScrollTop > scrollTop && scrollTop < winHeight
            && this.loadOffset !== this.fetchSize) {
            this.fireOnLazyUnLoad();
        }
        this._lastScrollTop = scrollTop;
        return;
    }
    /**
     * Todo: refactor to one method
     * @return {?}
     */
    fireOnLazyLoad() {
        this._zone.run(() => {
            if (this.state !== STATE_LOADING && this.state !== STATE_DISABLED) {
                this.state = STATE_LOADING;
                this.onLoad.emit({
                    isLoad: true,
                    limit: this.fetchSize,
                    offset: this.loadOffset
                });
                // start on the next record
                this.loadOffset += this.fetchSize;
            }
        });
    }
    /**
     * @return {?}
     */
    fireOnLazyUnLoad() {
        this._zone.run(() => {
            if (this.state !== STATE_LOADING && this.state !== STATE_DISABLED) {
                this.state = STATE_LOADING;
                // start on the next record
                this.loadOffset = this.fetchSize;
                this.onLoad.emit({
                    isLoad: false,
                    limit: this.fetchSize,
                    offset: this.loadOffset
                });
            }
        });
    }
    /**
     * @return {?}
     */
    scrollTop() {
        return (window.pageYOffset || this._content.scrollTop);
    }
    /**
     * Call `complete()` within the `infinite` output event handler when
     * your async operation has completed. For example, the `loading`
     * state is while the app is performing an asynchronous operation,
     * such as receiving more data from an AJAX request to add more items
     * to a data list. Once the data has been received and UI updated, you
     * then call this method to signify that the loading has completed.
     * This method will change the infinite scroll's state from `loading`
     * to `enabled`.
     * @return {?}
     */
    complete() {
        if (this.state !== STATE_LOADING) {
            return;
        }
        setTimeout(() => {
            this.state = STATE_ENABLED;
            // need to trigger extra detect changes to rerender loading icon
            this._cd.detectChanges();
        }, 100);
    }
    /**
     * Call `enable(false)` to disable the infinite scroll from actively
     * trying to receive new data while scrolling. This method is useful
     * when it is known that there is no more data that can be added, and
     * the infinite scroll is no longer needed.
     * @param {?} shouldEnable  If the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     * @return {?}
     */
    enable(shouldEnable) {
        this.state = (shouldEnable ? STATE_ENABLED : STATE_DISABLED);
        this._setListeners(shouldEnable);
    }
    /**
     * Subscribes to native windows scroll event
     * @param {?} shouldListen
     * @return {?}
     */
    _setListeners(shouldListen) {
        if (this._init) {
            if (shouldListen) {
                if (!this._scLsn) {
                    this._zone.runOutsideAngular(() => {
                        this._scLsn = this._onScroll.bind(this);
                        window.addEventListener('scroll', this._scLsn);
                    });
                }
            }
            else {
                if (isPresent(this._scLsn)) {
                    window.removeEventListener('scroll', this._scLsn);
                    this._scLsn = null;
                }
            }
        }
    }
    /**
     * @return {?}
     */
    isLoading() {
        return this.state === STATE_LOADING;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init = true;
        this._docBody = document.body;
        this._content = document.documentElement;
        this._setListeners(this.state !== STATE_DISABLED);
        if (this.loadOffset === 0) {
            this.fireOnLazyLoad();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this._setListeners(false);
    }
}
InfiniteScrollComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-infinite-scroll',
                template: `<div class="w-infinite-loader-panel" *ngIf="isLoading()">
    <span class="sap-icon icon-synchronize u-spin-icon"></span>
</div>
`,
                styles: [`.w-infinite-loader-panel{display:flex;align-items:center;justify-content:center;background-color:#fff;width:100%;height:100px;z-index:300;bottom:100px}.w-infinite-loader-panel span{color:#4a4a4a;font-size:2em}`],
            },] },
];
/** @nocollapse */
InfiniteScrollComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: NgZone },
    { type: DomUtilsService },
    { type: ChangeDetectorRef }
];
InfiniteScrollComponent.propDecorators = {
    distance: [{ type: Input }],
    enabled: [{ type: Input }],
    onLoad: [{ type: Output }],
    loadPanel: [{ type: ViewChild, args: ['loadinPanel',] }],
    fetchSize: [{ type: Input }]
};
const /** @type {?} */ STATE_ENABLED = 'enabled';
const /** @type {?} */ STATE_DISABLED = 'disabled';
const /** @type {?} */ STATE_LOADING = 'loading';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AwNameStore {
    constructor() {
        this.store = new Map();
    }
    /**
     * @param {?} name
     * @param {?} el
     * @return {?}
     */
    add(name, el) {
        if (this.collides(name)) {
            throw new Error('Name is not unique!');
        }
        return this.store.set(name, el);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    remove(name) {
        return this.store.delete(name);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    collides(name) {
        return this.store.has(name);
    }
    /**
     * @return {?}
     */
    clear() {
        this.store.clear();
    }
}
AwNameStore.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AwNameStore.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * The 'awName' directive attaches a identifier to decorated element to aid selectors for testing
 * purposes. The 'awName' directive tries to generate a unique identifier based on contextual data
 * and inherant immutable element attributes.
 *
 * **Generating the Base Name**
 *
 * The 'awName' directive generates a base name from element tag name and attributes which are
 * static by nature.
 *
 *     Example:
 *         <button name="order" awName>
 *
 *     Result:
 *         <button name="order" awname="button_order">
 *
 * If the element has an 'id', that value takes precedent and is used instead of a generated
 * name.
 *
 *     Example:
 *         <button name="order" id="myOrderButton" awName>
 *
 *     Result:
 *         <button name="order" id="myOrderButton" awname="button_myOrderButton">
 *
 *
 * **Repeated Elements and the 'ext' Parameter**
 *
 * There are many cases where elements are generated dynamically in the code as lists or tables.
 * In such cases, it may not be easy to distinguish individual elements by standard HTML
 * attributes, so the 'awName' directive allows custom extentions to the base name to be provided
 * using the 'ext' attribute.
 *
 *    Example:
 *        fruits = ['apple', 'banana', 'orange'];
 *
 *        <ul>
 *            <li *ngFor="let fruit of fruits" awName ext="{{fruit}}">{{fruit}}</li>
 *        </ul>
 *
 *   Result:
 *       <ul>
 *           <li awname="li_apple">apple</li>
 *           <li awname="li_banana">banana</li>
 *           <li awname="li_orane">orange</li>
 *       </ul>
 *
 * **Adding Context Through Ancestor Inspection**
 *
 * In order to provide context to the element naming, the 'awName' directive loops through the
 * parent ancestry and searches for any unique element 'id' to prepend to the base name.
 *
 *     Example:
 *         <form id="applicant">
 *            <input type="text" name="firstName" awName>
 *            <input type="text" name="lastName" awName>
 *         </form>
 *         <form id="spouse">
 *            <input type="text" name="firstName" awName>
 *            <input type="text" name="lastName" awName>
 *         </form>
 *
 *     Result:
 *         <form id="applicant">
 *            <input type="text" name="firstName" awname="applicant_input_firstName">
 *            <input type="text" name="lastName" awname="applicant_input_lastName">
 *         </form>
 *         <form id="spouse">
 *            <input type="text" name="firstName" awname="spouse_input_firstName">
 *            <input type="text" name="lastName" awname="spouse_input_lastname">
 *         </form>
 *
 * **Uniqueness Check**
 *
 * 'awName' keeps track of the names it creates by adding them to a map store. Whenever it
 * creates a new name during the `ngOnInit` phase it checks it against the existing map,
 * and will throw an error if it encounters a duplicate. Moreover during the element destruction
 * phase, `ngOnDestroy`, 'awName' removes the generated name from the store.
 *
 *
 * **In Production**
 *
 * Using 'awName' adds a small bit of rendering overhead for each element it is used on. In
 * a production environment, 'awName' serves no functionality to the end user, but may have
 * a performance impact on the application. As such, 'awName' takes into account the
 * `AppConfig` settings and disables name generation when `AppConfig.isProductionMode()`
 * is `true`.
 *
 * In your application, you can turn on production mode by setting `devmode.enabled` to
 * `false` when configuring `AribaCoreModule`:
 *
 *     AribaCoreModule.forRoot({
 *         'devmode.enabled': false
 *     })
 *
 */
class AwNameDirective {
    /**
     * @param {?} el
     * @param {?} store
     * @param {?} config
     */
    constructor(el, store, config) {
        this.el = el;
        this.store = store;
        this.config = config;
        this.separator = '_';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.config.isProductionMode()) {
            this.name = this.createName(this.el);
            this.addElementToStore(this.name, this.el);
            this.el.nativeElement.setAttribute('awname', this.name);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.store.remove(this.name);
    }
    /**
     * Add element name/id and reference to map store. If name/id already
     * exists in store then it throws an error.
     *
     * @param {?} name
     * @param {?} elem
     * @return {?}
     */
    addElementToStore(name, elem) {
        try {
            this.store.add(name, elem);
        }
        catch (/** @type {?} */ e) {
            console.error(e.message + `. "${name}" is already in use.`, elem.nativeElement);
            return;
        }
    }
    /**
     * Generate name/id for element.
     *
     * param elem Reference to element
     * @param {?} elem
     * @return {?} String Name/ID
     */
    createName(elem) {
        const /** @type {?} */ tagName = this.getTagName(elem);
        // Initialize array of string parts
        const /** @type {?} */ parts = [];
        // Find ancestor tag id, if there is one
        const /** @type {?} */ parentID = this.getAncestorId(elem);
        if (parentID) {
            parts.push(parentID);
        }
        // Check the tag type
        if (tagName === 'option') {
            const /** @type {?} */ parentName = this.getParentName(elem);
            if (parentName) {
                parts.push(parentName);
            }
        }
        // Get tagname
        parts.push(tagName);
        // Choose id property if it exists
        if (elem.nativeElement.id) {
            parts.push(elem.nativeElement.id);
            // Otherwise build extension from tag properties
        }
        else {
            // check for a name attribute
            if (elem.nativeElement.hasAttribute('name')) {
                parts.push(elem.nativeElement.name);
            }
            // check for value attribute if 'option' tag
            if (tagName === 'option') {
                if (elem.nativeElement.hasAttribute('value')) {
                    parts.push(this.spacesToUnderscore(elem.nativeElement.value));
                }
            }
        }
        // Add custom extension if it exists
        if (this.ext) {
            parts.push(this.spacesToUnderscore(this.ext));
        }
        return parts.join(this.separator);
    }
    /**
     * Get tag name from element reference.
     * @param {?} elem Reference to element
     * @return {?}
     */
    getTagName(elem) {
        return elem.nativeElement.tagName.toLowerCase();
    }
    /**
     * Traverse element ancestry and return first id attribute
     * encountered.
     * @param {?} elem Reference to element
     * @return {?}
     */
    getAncestorId(elem) {
        let /** @type {?} */ parent = elem.nativeElement.parentNode;
        let /** @type {?} */ id = '';
        while (parent && !id) {
            if (parent.id) {
                id = parent.id;
            }
            parent = parent.parentNode;
        }
        return id;
    }
    /**
     * Get name attribute from parent if name attribute exists.
     * @param {?} elem Reference to element
     * @return {?}
     */
    getParentName(elem) {
        const /** @type {?} */ parent = elem.nativeElement.parentNode;
        return (parent.name && !parent.id) ? parent.name : null;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    spacesToUnderscore(str) {
        return str.replace(/\s+/g, '_');
    }
}
AwNameDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awName]',
            },] },
];
/** @nocollapse */
AwNameDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: AwNameStore },
    { type: AppConfig }
];
AwNameDirective.propDecorators = {
    ext: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWCoreComponentModule {
}
AWCoreComponentModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    EmbeddedItemDirective,
                    IncludeComponentDirective,
                    GenericContainerComponent,
                    ErrorMessagesComponent,
                    ModalComponent,
                    CurrencyFormatPipe,
                    NgForSetDirective,
                    InfiniteScrollComponent,
                    AwNameDirective
                ],
                imports: [
                    CommonModule
                ],
                entryComponents: [
                    GenericContainerComponent,
                    ModalComponent
                ],
                exports: [
                    EmbeddedItemDirective,
                    IncludeComponentDirective,
                    GenericContainerComponent,
                    ErrorMessagesComponent,
                    ModalComponent,
                    CurrencyFormatPipe,
                    NgForSetDirective,
                    InfiniteScrollComponent,
                    AwNameDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Parent class for all modal dialogs. Provides defaults functionality for all modals.
 */
class ModalContainer extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * Override function.
         */
        this.destroy = noop;
    }
    /**
     * function that closes the dialog by calling destroy on the component reference.
     * Method inherited by all its children.
     * @return {?}
     */
    closeModal() {
        this.destroy();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * DataTypeProviderRegistry aggregates different DataProviders per type.
 */
class DataTypeProviderRegistry {
    constructor() {
        this.registryByProvider = new Map();
        this.registryNameToClass = new Map();
    }
    /**
     * For every single registered DataProvider implementation we also need store its prototype
     * in order to be able to support some kind of inheritance. You can register a provider for
     * a parent class if needed
     *
     * @template T
     * @param {?} target
     * @param {?} provider
     * @return {?}
     */
    registerProvider(target, provider) {
        if (isBlank(target) || (!isStringMap(target) && !isType(target))) {
            throw new Error(' Cannot register non-object');
        }
        let /** @type {?} */ name = isType(target) ? target.prototype.constructor.name : target.constructor.name;
        this.registryByProvider.set(name, provider);
        let /** @type {?} */ prototype = Object.getPrototypeOf(target);
        this.registryNameToClass.set(name, prototype);
    }
    /**
     * Search for best matching provider. If not found then use object prototype to get hold of its
     * parent and see if there is a provider registered on this level
     *
     * @template T
     * @param {?} className
     * @return {?}
     */
    bestMatchForClass(className) {
        let /** @type {?} */ registeredClassName = className;
        let /** @type {?} */ classProto = this.registryNameToClass.get(className);
        while (isPresent(registeredClassName)) {
            let /** @type {?} */ provider = this.registryByProvider.get(registeredClassName);
            if (isPresent(provider)) {
                provider.type = className;
                return provider;
            }
            // Go up to parent
            if (isPresent(classProto)) {
                classProto = Object.getPrototypeOf(classProto);
                let /** @type {?} */ parentName = objectToName(classProto);
                registeredClassName =
                    (isPresent(parentName) && parentName !== registeredClassName) ? parentName
                        : null;
            }
            else {
                return null;
            }
        }
        return null;
    }
    /**
     * The same as bestMatchForClass() with the difference to pass a type. If you want to
     * support object inheritance you need this.
     *
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    bestMatchForType(type) {
        let /** @type {?} */ name = objectToName(type);
        this.registryNameToClass.set(name, type);
        return this.bestMatchForClass(name);
    }
}
DataTypeProviderRegistry.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DataTypeProviderRegistry.ctorParameters = () => [];
/**
 * Provider is a data driver that can access data and retrieve them. It knows how to get 1
 * or more records, maybe do paging and some other things.
 *
 * @abstract
 * @template T
 */
class DataProvider {
    constructor() {
        /**
         * Notifies all the listeners in case of data are available or if they changed due to some user
         * interaction  (search, adding or removing).
         *
         */
        this.dataChanges = new BehaviorSubject([]);
    }
    /**
     *  Return size of the source
     *
     * @param {?=} params
     * @return {?}
     */
    expectedCount(params) {
        return -1;
    }
    /**
     *
     * Returns non-async current state of data
     * @return {?}
     */
    data() {
        return this.dataChanges.getValue();
    }
    /**
     * Tells if this DataProvider supports INSERT, REMOVE
     *
     * @return {?}
     */
    canCRUD() {
        return false;
    }
    /**
     * Tells if this DataProvider supports query capability
     *
     * @return {?}
     */
    canQuery() {
        return false;
    }
    /**
     * Implement to support insertion. After record is inserted emit event for dataChanges to
     * inform all subscribers
     *
     * @param {?} obj
     * @return {?}
     */
    insert(obj) {
    }
    /**
     * Implement to support record removal. After record is removed emit event for dataChanges to
     * inform all subscribers.
     *
     * @param {?} obj
     * @return {?}
     */
    remove(obj) {
    }
    /**
     * Implement to provide access to low level searcg API.
     *
     * @param {?} params
     * @return {?}
     */
    query(params) {
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Default implementation for Arrays.
 * @template T
 */
class ArrayDataProvider extends DataProvider {
    /**
     * @param {?} values
     */
    constructor(values) {
        super();
        this.values = values;
        this.type = Array;
        this.dataChanges.next(this.values);
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    expectedCount(params) {
        return this.values.length;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    dataForParams(params) {
        if (isBlank(params)) {
            return this.values;
        }
        let /** @type {?} */ data = this.values;
        if (isPresent(params) && params.has('offset') && params.has('limit')) {
            let /** @type {?} */ offset = params.get('offset');
            let /** @type {?} */ limit = params.get('limit');
            if (data.length > (offset + limit)) {
                data = data.slice(offset, offset + limit);
            }
            else {
                data = data.slice(offset, data.length);
            }
        }
        if (params.has('orderby') && params.has('selector')) {
            this.sort(data, params.get('orderby'), params.get('selector'));
        }
        return data;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    fetch(params) {
        return of(this.dataForParams(params));
    }
    /**
     * Provides default implementation for sorting current dataset by one column / key
     *
     * for sortOrdering please see Datatable and its sortOrderingForNumber()
     *
     *      1  = ascending
     *      -1 = descending
     * @param {?} arrayToSort
     * @param {?} key
     * @param {?} sortOrder
     * @return {?}
     */
    sort(arrayToSort, key, sortOrder) {
        arrayToSort.sort((data1, data2) => {
            let /** @type {?} */ value1 = FieldPath.getFieldValue(data1, key);
            let /** @type {?} */ value2 = FieldPath.getFieldValue(data2, key);
            let /** @type {?} */ result = null;
            if (value1 == null && value2 != null) {
                result = -1;
            }
            else if (value1 != null && value2 == null) {
                result = 1;
            }
            else if (value1 == null && value2 == null) {
                result = 0;
            }
            else if (typeof value1 === 'string' && typeof value2 === 'string') {
                result = value1.localeCompare(value2);
            }
            else {
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
            }
            return (sortOrder * result);
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provides top level accessor class in order to make {\@link DataProvider} retrieval process easier.
 * Using {\@link DataTypeProviderRegistry} we either retrieve registered instance of concrete
 * provider or instantiate our implicit provider for native types such as Array.
 *
 *
 */
class DataProviders {
    /**
     * @param {?} registry
     */
    constructor(registry) {
        this.registry = registry;
    }
    /**
     * Finds the best matching  DataProvider or create new one in case of Array
     * More room to register and instantiate some other implicit Providers
     * @param {?} target
     * @return {?}
     */
    find(target) {
        if (isArray(target)) {
            return new ArrayDataProvider(target);
        }
        else if (isString(target)) {
            return this.registry.bestMatchForClass(target);
        }
        return this.registry.bestMatchForType(target);
    }
    /**
     * Registers new provider within DataTypeProviderRegistry
     *
     * @template T
     * @param {?} target
     * @param {?} provider
     * @return {?}
     */
    register(target, provider) {
        this.registry.registerProvider(target, provider);
    }
}
DataProviders.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DataProviders.ctorParameters = () => [
    { type: DataTypeProviderRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Provides a registry of different data Finders used mostly by DataSources. All Finders are
 * registered by this class as we don't have any needs right now to expose this to developer.
 *
 */
class DataFinders {
    constructor() {
        this.findersByType = new Map();
        this.initFinders();
    }
    /**
     * Finds the best matching DataFinder based on the object type and queryType.
     * @param {?} forProvider
     * @param {?} forType
     * @return {?}
     */
    find(forProvider, forType) {
        let /** @type {?} */ finderMatch;
        this.findersByType.forEach((v, k) => {
            if (k.accepts(forProvider, forType)) {
                finderMatch = v;
                return true;
            }
        });
        if (isPresent(finderMatch)) {
            let /** @type {?} */ copy = new finderMatch();
            copy.forData(forProvider);
            return copy;
        }
        return null;
    }
    /**
     * @return {?}
     */
    initFinders() {
        // create a prototype for each
        this.findersByType.set(new FullTextArrayDataFinder(), FullTextArrayDataFinder);
    }
}
DataFinders.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DataFinders.ctorParameters = () => [];
/** @enum {number} */
const QueryType = {
    FullText: 0,
    Predicate: 1,
    FullTextAndPredicate: 2,
};
QueryType[QueryType.FullText] = "FullText";
QueryType[QueryType.Predicate] = "Predicate";
QueryType[QueryType.FullTextAndPredicate] = "FullTextAndPredicate";
/**
 * This class provides matching capability for given DataProvider.
 * @abstract
 */
class DataFinder {
    /**
     * In order to find concrete DataFinder we need to know the target type and the query type
     *
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    accepts(forData, forType) {
        return false;
    }
    /**
     * @template T
     * @param {?} query
     * @param {?=} max
     * @return {?}
     */
    match(query, max = -1) {
        return unimplemented();
    }
    /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    matchWithSelections(selections, query, max) {
        return unimplemented();
    }
}
/**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
 *
 *
 */
class FullTextArrayDataFinder extends DataFinder {
    /**
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    accepts(forData, forType) {
        return forData instanceof ArrayDataProvider && forType === QueryType.FullText;
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    forData(provider) {
        this._provider = provider;
        return this;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    set lookupKey(key) {
        this._keyPath = isPresent(key) ? new FieldPath(key) : null;
    }
    /**
     * @template T
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    instantMatch(query, max) {
        assert(isPresent(this._provider), 'Missing DataProvider');
        let /** @type {?} */ list = this._provider.dataForParams(new Map().set('limit', max));
        return this.instantMatchWithSelections(list, query, max);
    }
    /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    instantMatchWithSelections(selections, query, max) {
        assert(isPresent(this._provider), 'Missing DataProvider');
        if (isBlank(query)) {
            return selections;
        }
        let /** @type {?} */ result = [];
        let /** @type {?} */ toLowerPattern = query.toLowerCase();
        for (let /** @type {?} */ i = 0; i < selections.length; i++) {
            let /** @type {?} */ item = selections[i];
            if (this.matches(item, toLowerPattern)) {
                result.push(item);
                if (result.length >= max) {
                    break;
                }
            }
        }
        return result;
    }
    /**
     *
     * Warning: If you dont supply search Key and you want fulltext search and you use this
     * default implementation be aware that it can  perform poorly as it is naive implementaion
     * that does not do deep compare.
     *
     * @template T
     * @param {?} item
     * @param {?} pattern
     * @return {?}
     */
    matches(item, pattern) {
        let /** @type {?} */ val = (isPresent(this._keyPath)) ? this._keyPath.getFieldValue(item) : item;
        if (isFunction(val)) {
            val = val.call(item);
        }
        else if (isJsObject(item)) {
            return Object.keys(item).filter((key) => isPresent(item[key]) && isString(item[key]) && item[key]
                .toLowerCase().indexOf(pattern) !== -1)
                .length > 0;
        }
        else {
            return isBlank(pattern) ||
                isPresent(val) && val.toString().toLowerCase().indexOf(pattern) > -1;
        }
    }
    /**
     * @template T
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    match(query, max) {
        return of(this.instantMatch(query, max));
    }
    /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    matchWithSelections(selections, query, max) {
        return of(this.instantMatchWithSelections(selections, query, max));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DATA_SOURCE = new InjectionToken('DATA_SOURCE');
/**
 * DataSource describes basic functionality for handling stream of data specific to component
 *
 * It is expected that DataSource will be defined as component provider using
 *
 * \@Components ({
 *      ...
 *      providers:[
 *
 *          provide: DATA_SOURCE, useClass: ChooserDataSourcePlainArrayExample,
 * deps: [DataProviders, DataFinders]
 *      ]
 *
 * })
 *
 *
 * so all the dependencies (DataProviders, DataFinders) are properly injected.
 *
 * DataProvider uses open() method to broadcast changes to all the subscribers in reactive way.
 * Or you can use instant() method to retrieve current state of this DataSource (sync)
 *
 * @abstract
 */
class DataSource {
    /**
     *
     * Each DataSource have injected DataProviders and DataFinders to retrieve concrete
     * implementation
     *
     * @param {?=} dataProviders
     * @param {?=} finders
     */
    constructor(dataProviders, finders) {
        this.dataProviders = dataProviders;
        this.finders = finders;
    }
    /**
     * Returns a data instantly from the internal state of DataProvider
     * @template T
     * @return {?}
     */
    instant() {
        return unimplemented();
    }
}
DataSource.MaxLength = 10;
DataSource.MaxRecentSelected = 5;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
class TopZoneComponent {
    constructor() {
        this.classList = 'ui-g-12 ui-g-nopad ';
    }
}
TopZoneComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-top',
                template: '<ng-content></ng-content>'
            },] },
];
TopZoneComponent.propDecorators = {
    classList: [{ type: HostBinding, args: ['class',] }]
};
/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
class LeftZoneComponent {
    constructor() {
        this.classList = 'ui-g-12 ui-g-nopad';
    }
}
LeftZoneComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-left',
                template: '<ng-content></ng-content>'
            },] },
];
LeftZoneComponent.propDecorators = {
    classList: [{ type: HostBinding, args: ['class',] }]
};
/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
class MiddleZoneComponent {
    constructor() {
        this.classList = 'ui-g-12 ui-md-6 ui-lg-4 ui-g-nopad';
    }
}
MiddleZoneComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-middle',
                template: '<ng-content></ng-content>'
            },] },
];
MiddleZoneComponent.propDecorators = {
    classList: [{ type: HostBinding, args: ['class',] }]
};
/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
class RightZoneComponent {
    constructor() {
        this.classList = 'ui-g-12 ui-g-nopad';
    }
}
RightZoneComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-right',
                template: '<ng-content></ng-content>'
            },] },
];
RightZoneComponent.propDecorators = {
    classList: [{ type: HostBinding, args: ['class',] }]
};
/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
class BottomZoneComponent {
    constructor() {
        this.classList = 'ui-g-12 ui-g-nopad';
    }
}
BottomZoneComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-bottom',
                template: '<ng-content></ng-content>'
            },] },
];
BottomZoneComponent.propDecorators = {
    classList: [{ type: HostBinding, args: ['class',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Used by FormTable to layout fields into Rows. Each FormTable row is reasonable for not only to
 * include actual component such is DropDown or InputField but mainly provides a enough context for
 * the component to specify the size, how it should layout, whether we need to show required flag,
 * to show/hide labels in case if we have no label layout and much more.
 *
 * FormRow component also registers angular validator for the current row/field. As already
 * mentioned We treat our widgets with minimal responsibility as possible to present and retrive
 * information to/from user and let somebody else to figure out where it appear and how.
 *
 * todo: Move under FormTable
 */
class FormRowComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, 
    // Event this creates CI depends. Need to have a reference to parent
    // I need to refactor more parent to not use this child and refactor layouting
    parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Hides the label
         *
         */
        this.noLabelLayout = false;
        /**
         * Renders row with highlighted background
         *
         */
        this.highlightRow = false;
        /**
         *
         *  Field label that should appear above or next to the control
         *
         */
        this.label = '';
        /**
         *
         * For single column layout without zones we need to apply grid directly to the FormRow tag
         * so we don't need to introduce extra div level
         *
         */
        this.classList = '';
        this._size = 'ui-g-12 ui-md-' + WidgetSizeColumns.medium;
    }
    /**
     * Right now we just initialize this once and use the values we do not expect now to react to
     * changes
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(null);
        this.registerValidators();
        this.omitPadding = this.parentContainer.omitPadding;
        this.classList += isPresent(this.parentContainer) ? ' ui-g-12 ' : '';
        this.classList = this.highlightRow ? this.classList + ' highlight-row ' : this.classList;
        this.classList = this.omitPadding ? this.classList + ' ui-g-nopad ' : this.classList;
    }
    /**
     * Just a size getter
     *
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     *  A size setter we translate custom sizes into actual bootstrap grid system. We use medium
     * right now. but we should extend this for other screen sizes
     *
     *  todo: provide mapping and add other grid classes for other sizes xs, sm, lg, xl
     *
     *  Also check if this is dynamic size that should vary based on the how many number of columns
     * we have. e.g. Date widgets is by default small, but in 2, 3 columns layout this small is too
     * small.
     * @param {?} value
     * @return {?}
     */
    set size(value) {
        let /** @type {?} */ isDynVal = false;
        if (StringWrapper.startsWidth(value, 'd-')) {
            isDynVal = true;
            value = value.substr(2, value.length - 1);
        }
        if (isPresent(value)) {
            this._size = value;
            let /** @type {?} */ dSize = this.dynSize(value, isDynVal);
            this._size = 'ui-g-12 ui-md-' + dSize;
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        super.ngDoCheck();
        if (isPresent(this.parentContainer) && this.editable !== this.parentContainer.editable) {
            this.editable = this.parentContainer.editable;
        }
    }
    /**
     * Push out of box angular validator as well as custom one to current FormControl
     * @return {?}
     */
    registerValidators() {
        let /** @type {?} */ validators = [];
        if (isPresent(this.maxLength)) {
            validators.push(Validators.maxLength(this.maxLength));
        }
        if (isPresent(this.minLength)) {
            validators.push(Validators.minLength(this.minLength));
        }
        if (isPresent(this.required) && this.required) {
            validators.push(Validators.required);
        }
        if (isPresent(this.pattern)) {
            validators.push(Validators.pattern(this.pattern));
        }
        if (isPresent(this.customValidators)) {
            ListWrapper.addAll(validators, this.customValidators);
        }
        if (validators.length === 1) {
            this.formControl.setValidators(validators[0]);
        }
        else if (validators.length > 1) {
            this.formControl.setValidators(Validators.compose(validators));
        }
        if (isPresent(this.customAsyncValidators) && this.customAsyncValidators.length === 1) {
            this.formControl.setAsyncValidators(this.customAsyncValidators[0]);
        }
        else if (isPresent(this.customAsyncValidators) && this.customAsyncValidators.length > 1) {
            this.formControl.setAsyncValidators(Validators.composeAsync(this.customAsyncValidators));
        }
    }
    /**
     *
     * Do we have labels on TOP, try to read this from Parent
     *
     * @return {?}
     */
    get labelsOnTop() {
        if (isBlank(this._labelsOnTop) && isPresent(this.parentContainer)) {
            return (/** @type {?} */ (this.parentContainer)).isLabelsOnTop();
        }
        return false;
    }
    /**
     *
     * Can refactor all into 1 line but its hard to debug so this is just for read
     *
     * @param {?} value
     * @param {?} isDynValue
     * @return {?}
     */
    dynSize(value, isDynValue) {
        let /** @type {?} */ normalizeSize = value.toLowerCase().replace('-', '');
        if (isPresent(this.parentContainer) &&
            (/** @type {?} */ (this.parentContainer)).hasTwoColumn && isDynValue) {
            let /** @type {?} */ enumValues = Object.keys(WidgetSizeColumns);
            normalizeSize = enumValues[enumValues.indexOf(normalizeSize) + 1];
        }
        return (/** @type {?} */ (WidgetSizeColumns))[normalizeSize];
    }
}
FormRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-form-row',
                template: `<div *ngIf="!hidden"
     class="w-form-row ui-g"
     [class.highlight-row]="highlightRow"
     [class.required]="required"
     [class.label-on-top]="labelsOnTop"
     [class.label-on-side]="!labelsOnTop"
     [class.has-danger]="!formControl.valid && !formControl.pristine "
     [ngClass]="styleClass">

    <div class="control-label ui-g-12 ui-g-nopad"
         *ngIf="!noLabelLayout"
         [class.ui-md-3]="!labelsOnTop">
        <label [class.sr-only]="noLabelLayout">{{label}}</label>
    </div>

    <div class="control-value ui-g-nopad" [ngClass]="size"
         [class.read-only]="!editable">
        <ng-content></ng-content>
        <a-error-messages [control]="formControl"></a-error-messages>
    </div>
</div>
`,
                styles: [`.required label:after{content:"*";color:red}/deep/ .highlight-row{background-color:#f7f8fa}.w-form-row.highlight-row{background-color:#f7f8fa}.w-form-row.label-on-top{padding-bottom:13px}.w-form-row.label-on-top .control-label,.w-form-row.label-on-top .control-value{padding-top:0;padding-bottom:0}.w-form-row.label-on-top .control-label{padding-bottom:12px}.w-form-row.label-on-side .control-label,.w-form-row.label-on-side .control-value{padding-top:0;padding-bottom:0}.w-form-row.label-on-side .control-label ::ng-deep .w-string-field,.w-form-row.label-on-side .control-value ::ng-deep .w-string-field{line-height:36px}.w-form-row.label-on-side .control-label ::ng-deep .sap-icon,.w-form-row.label-on-side .control-value ::ng-deep .sap-icon{line-height:26px}.w-form-row.label-on-side .control-label label,.w-form-row.label-on-side .control-value label{line-height:36px}.w-form-row.label-on-side .control-label .fa,.w-form-row.label-on-side .control-value .fa{line-height:18px}.control-label{color:#636363}.u-validation-error{border-color:red}`],
                providers: [
                    { provide: BaseFormComponent, useExisting: forwardRef(() => FormRowComponent) }
                ]
            },] },
];
/** @nocollapse */
FormRowComponent.ctorParameters = () => [
    { type: Environment },
    { type: FormTableComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormTableComponent),] }] }
];
FormRowComponent.propDecorators = {
    noLabelLayout: [{ type: Input }],
    highlightRow: [{ type: Input }],
    label: [{ type: Input }],
    maxLength: [{ type: Input }],
    minLength: [{ type: Input }],
    pattern: [{ type: Input }],
    customAsyncValidators: [{ type: Input }],
    customValidators: [{ type: Input }],
    classList: [{ type: HostBinding, args: ['class',] }],
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * FormTable is a specific layout component for rendering Labels and its controls in two columns
 * and 5 different zones.
 *
 * We support LEFT, MIDDLE, RIGHT, TOP, BOTTOM zone where we can place our component or widgets.
 * This
 * component is used as primary layout to wrap all the common use cases. E.g. When we lay out
 * fields in the form I do not want controls to be aware of error validation, size, labels, and
 * some other things. Control such INPUT is just responsible for retrieve user value but not how it
 * appear on the page.
 *
 * This way we can be flexible how we treat widgets for different kinds of situation depending
 * where they appear
 * FormTable just like the rest of the components are using Model driven approach how to work with
 * data, mean we are using FormGroup, FormControl etc. FormGroup can be passed into the FormTable,
 * otherwise its automatically created when the FormTable is instantiated.
 *
 * FormGroup is saved insode Environment where we are using this to pass this around the pages and
 * components.
 *
 * ### Example
 *
 * Simple Layout fields and its control
 *
 *
 * ```typescript
 * \@Component({
 *      selector: 'wrapper-comp' ,
 *      template: `
 *  			<aw-form-table [formGroup]="formGroup" (onSubmit)=>
 *  				<aw-form-row [label]="'name'" [name]="'name'">
 *  					<aw-input-field [type]="'string'"></aw-input-field>
 *  				</aw-form-row>
 *
 *  				<aw-form-row [label]="'Preferred Colors'" [name]="'myColors'">
 *  					<aw-checkbox-list [list]="checkBoxListValues"
 *  					                 [selections]="selectedValues"
 *  					                 [layout]="'inline'"
 *  					                 (onSelection)="onCBClick($event)">
 *  					</aw-checkbox-list>
 *  				</aw-form-row>
 *  				<aw-form-row [label]="'Gender'" [name]="'gender'">
 *
 *  					<aw-radiobutton-list [list]="rbValues" [selection]="rbSelection">
 *
 *  					</aw-radiobutton-list>
 *
 *  				</aw-form-row>
 *  				<aw-form-row [label]="'My birthdate'" [name]="'birthDate'" [size]="'small'">
 *
 *  					<aw-date-time [value]="date" [editable]="editable" [showTime]="showTime">
 *  					</aw-date-time>
 *  				</aw-form-row>
 *  			</aw-form-table>
 *    `
 *  })
 *  export class ShowUserInfoComponent
 *  {
 *       checkBoxListValues: string[] = ['blue' , 'red' , 'yellow' , 'orange' , 'white' , 'silver'
 *     , 'black' , 'Green'
 *     , 'Gray' , 'Navy' ,
 *          'Olive' , 'Aqua' , 'Purple'];
 *      selectedValues: string[] = ['blue' , 'Olive' , 'Aqua' , 'Purple'];
 *      rbValues: string[] = ['male' , 'female' , 'other'];
 *      rbSelection: string = 'male';
 *      editable: boolean = true;
 *      showTime: boolean = true;
 *
 *      formGroup: FormGroup = new FormGroup({});
 *
 *
 *      onCBClick (event): void
 *      {
 *          console.log('onCBClick = ' + event);
 *      }
 *
 *      onSubmit (model: any): void
 *      {
 *         console.log(model)
 *
 *         // will print { name:null, myColors:['blue' , 'Olive' , 'Aqua' , 'Purple'], gender:
 *     male}
 *      }
 *
 *  }
 *
 *  ```
 *
 *  Or you can use zone to layout these fields into two columns:
 *
 *  Current zones are implement with <ng-content SELECT> which is just a selector to searches for
 *     specific pattern. In our case instead of creating extra wrapper custom component use simple
 *     CSS class
 *
 *
 *  ```
 *            <aw-form-table #metaFormTable [editable]="editing"
 *                          [useFiveZone]="isFiveZoneLayout"
 *                          (onSubmit)="onSaveAction($event)">
 *
 *                <aw-left  *ngIf="canShowZone('zLeft')">
 *
 *                        <aw-form-row [label]="'name'" [name]="'name'">
 *                            <aw-input-field [type]="'string'"></aw-input-field>
 *                        </aw-form-row>
 *
 *                        <aw-form-row [label]="'Preferred Colors'" [name]="'myColors'">
 *                            <aw-checkbox-list [list]="checkBoxListValues"
 *                                             [selections]="selectedValues"
 *                                             [layout]="'inline'"
 *                                             (onSelection)="onCBClick($event)">
 *                            </aw-checkbox-list>
 *                        </aw-form-row>
 *                </aw-left>
 *
 *
 *                <aw-right  *ngIf="canShowZone('zRight')">
 *                        <aw-form-row [label]="'Gender'" [name]="'gender'">
 *                                <aw-radiobutton-list [list]="rbValues" [selection]="rbSelection">
 *                                </aw-radiobutton-list>
 *                        </aw-form-row>
 *
 *                        <aw-form-row [label]="'My birthdate'" [name]="'birthDate'"
 *     [size]="'small'">
 *                            <aw-date-time [value]="date" [editable]="editable"
 *     [showTime]="showTime">
 *                            </aw-date-time>
 *                        </aw-form-row>
 *                </<aw-right>
 *            </aw-form-table>
 *
 *  ```
 *
 *  todo: remove my css selectors for zones and replace it with real component even just a tag
 *  todo: would work file
 *
 */
class FormTableComponent extends BaseFormComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env, null);
        this.env = env;
        /**
         * Used for the form layout to see if we need to render labels stacked  or side by side next to
         * the control
         *
         */
        this.labelsOnTop = false;
        /**
         *
         * Is this a 4 zone layout
         *
         */
        this.useFiveZone = false;
        /**
         * For certain usecase we dont want to set automatically this to all children
         */
        this.editabilityCheck = true;
        /**
         *  Triggers when the <form> is submitted. onSubmit we emit the whole formController objects
         *
         *
         */
        this.onSubmit = new EventEmitter();
        /**
         * Cache calculated properties when init this component
         *
         */
        this.hasOneColumn = false;
        this.hasTwoColumn = false;
        this.hasThreeColumn = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (isPresent(changes['editable']) &&
            changes['editable'].previousValue !== changes['editable'].currentValue) {
            this.updateFormFields();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSubmitForm(event) {
        this.onSubmit.emit(event);
    }
    /**
     *
     * Are labels on top
     *
     * @return {?}
     */
    isLabelsOnTop() {
        return this.labelsOnTop;
    }
    /**
     *
     * Used by child component to inherit editability
     *
     * @return {?}
     */
    isFormEditable() {
        return this.editable;
    }
    /**
     * @return {?}
     */
    applyColumns() {
        if (!this.useFiveZone && this.hasAnyZones()) {
            throw new Error('Zones detected in the FormTable but useFiveZone option is false');
        }
        this.hasOneColumn = !isPresent(this.rightZone) && !isPresent(this.middleZone);
        this.hasTwoColumn = isPresent(this.leftZone) && isPresent(this.rightZone) &&
            !isPresent(this.middleZone);
        this.hasThreeColumn = isPresent(this.leftZone) && isPresent(this.rightZone) &&
            isPresent(this.middleZone);
        if (this.hasTwoColumn && !this.isTwoZoneReady()) {
            this.leftZone.classList += ' ui-md-6 ui-lg-6';
            this.rightZone.classList += ' ui-md-6 ui-lg-6';
        }
        if (this.hasThreeColumn && !this.isThreeZoneReady()) {
            this.leftZone.classList += ' ui-md-6 ui-lg-4';
            this.rightZone.classList += ' ui-md-6 ui-lg-4';
        }
    }
    /**
     * @return {?}
     */
    hasAnyZones() {
        return isPresent(this.leftZone) || isPresent(this.rightZone) || isPresent(this.middleZone)
            || isPresent(this.topZone) || isPresent(this.bottomZone);
    }
    /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     * @return {?}
     */
    isTwoZoneReady() {
        return this.leftZone.classList.indexOf('ui-lg-6') > 0 &&
            this.leftZone.classList.indexOf('ui-lg-6') > 0;
    }
    /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     * @return {?}
     */
    isThreeZoneReady() {
        return this.leftZone.classList.indexOf('ui-lg-4') > 0 &&
            this.leftZone.classList.indexOf('ui-lg-4') > 0;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // problem since Angular 4.2, ngAfterContentInit
        // without this I get error that value was changed after view was checked
        // todo: refactor  - mainly our zones left, right middle
        setTimeout(() => {
            this.applyColumns();
            this.updateFormFields();
            this.adjustLayout();
        });
    }
    /**
     * @return {?}
     */
    updateFormFields() {
        if (this.editabilityCheck && isPresent(this.formFields) && this.formFields.length > 0) {
            this.formFields.forEach((item) => {
                item.editable = this.editable;
                // item.formGroup = this.formGroup;
            });
        }
    }
    /**
     * Based on if we are 2 or 3 or 1 column layout we need to adjust widgets width within the
     * form row.
     * @return {?}
     */
    adjustLayout() {
        if (isPresent(this.rows) && this.rows.length > 0) {
            if (this.hasThreeColumn) {
                this.rows.forEach((item) => item.size = 'large');
            }
        }
    }
}
FormTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-form-table',
                template: `<form class="w-form-table ui-g ui-fluid" [formGroup]="formGroup"
      [ngClass]="styleClass"
      (ngSubmit)="onSubmitForm(formGroup.value)" novalidate>

    <div class="ui-g-12 ui-g-nopad">

        <div class="ui-g">
            <ng-content></ng-content>
        </div>

    </div>
</form>

`,
                styles: [`.page-container>form{margin-top:1em}.w-form-table button{float:right}`],
                providers: [
                    { provide: BaseFormComponent, useExisting: forwardRef(() => FormTableComponent) }
                ]
            },] },
];
/** @nocollapse */
FormTableComponent.ctorParameters = () => [
    { type: Environment }
];
FormTableComponent.propDecorators = {
    labelsOnTop: [{ type: Input }],
    useFiveZone: [{ type: Input }],
    editabilityCheck: [{ type: Input }],
    onSubmit: [{ type: Output }],
    leftZone: [{ type: ContentChild, args: [LeftZoneComponent,] }],
    middleZone: [{ type: ContentChild, args: [MiddleZoneComponent,] }],
    rightZone: [{ type: ContentChild, args: [RightZoneComponent,] }],
    topZone: [{ type: ContentChild, args: [TopZoneComponent,] }],
    bottomZone: [{ type: ContentChild, args: [BottomZoneComponent,] }],
    formFields: [{ type: ContentChildren, args: [BaseFormComponent, { descendants: true },] }],
    rows: [{ type: ContentChildren, args: [forwardRef(() => FormRowComponent), { descendants: true },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWFormTableModule {
}
AWFormTableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FormTableComponent,
                    FormRowComponent,
                    TopZoneComponent,
                    LeftZoneComponent,
                    RightZoneComponent,
                    MiddleZoneComponent,
                    BottomZoneComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    InputTextModule,
                    AWCoreComponentModule
                ],
                entryComponents: [
                    FormTableComponent,
                    FormRowComponent,
                    TopZoneComponent,
                    LeftZoneComponent,
                    RightZoneComponent,
                    MiddleZoneComponent,
                    BottomZoneComponent
                ],
                exports: [
                    FormTableComponent,
                    FormRowComponent,
                    TopZoneComponent,
                    LeftZoneComponent,
                    RightZoneComponent,
                    MiddleZoneComponent,
                    BottomZoneComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This component represent a Input field and it can  accept different types of values such as
 * text, number.
 *
 *
 *
 * ### Example
 *
 * ```typescript
 * \@Component({
 *      selector: 'wrapper-comp' ,
 *      template: '<aw-input-field [value]="inputValue" [type]="inputType"></aw-input-field>'
 *  })
 *  export class TestInputComponent
 *  {
 *      inputValue: string = 'Some text';
 *
 *      // by default input type is text, you can pass string, String, or text
 *      inputType: string = 'string';
 *  }
 *
 * ```
 *
 *
 *
 * ### Example wher input field is initialized with ngModel
 *
 * ```typescript
 * \@Component({
 *      selector: 'wrapper-comp' ,
 *      template: '<aw-input-field [value]="inputValue" [(ngModel)]="inputType"></aw-input-field>'
 *  })
 *  export class TestInputComponent
 *  {
 *      inputValue: string = 'Some text';
 *
 *      // by default input type is text, you can pass string, String, or text
 *      inputType: string = 'string';
 *  }
 *
 * ```
 *
 *  Note: if you are using this outside of FormTable please provide your own FormGroup
 *
 */
const /** @type {?} */ INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
};
class InputFieldComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * A value used to save and read  when rendering and updating a component
         *
         */
        this.value = '';
        /**
         * Input field type. Currently we support either Number or text
         */
        this._type = 'string';
        this.decimalPipe = new DecimalPipe(env.locale);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.bigDecimal);
        this.vchSubscriber = this.formControl.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe(val => {
            setTimeout(() => this.value = val);
            // this.value = val;
            this.onModelChanged(this.value);
        });
    }
    /**
     *
     * generated setter to check for value and normalizing into expected either number or text
     *
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        if (value.toLowerCase() === 'string' || value.toLowerCase() === 'text') {
            this._type = 'text';
        }
        else if (value.toLowerCase() === 'number') {
            this._type = 'number';
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @return {?}
     */
    get displayValue() {
        if (this.bigDecimal) {
            this._displayValue = this.formatNumber(this.bigDecimal);
        }
        else {
            this._displayValue = this.value;
        }
        return this._displayValue;
    }
    /**
     * @return {?}
     */
    canSetType() {
        return true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.bigDecimal && !equals(value, this.bigDecimal)) {
            this.bigDecimal = value;
            this.formControl.setValue(this.bigDecimal);
            return;
        }
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value, { onlySelf: true });
        }
    }
    /**
     * Format the number object according to its precision.
     *
     * @param {?} value
     * @return {?}
     */
    formatNumber(value) {
        // The default precision is 2. For example, 10.23.
        let /** @type {?} */ digits = '1.0-2';
        // If precision is present, use it for format the bigDecimal value for display.
        if (isPresent(this.precision) &&
            this._type === 'number') {
            digits = '1.0-' + this.precision;
            return this.decimalPipe.transform(value, digits);
        }
        return value;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        if (isPresent(this.vchSubscriber)) {
            this.vchSubscriber.unsubscribe();
        }
    }
}
InputFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-input-field',
                template: `<div *ngIf="editable" [formGroup]="formGroup" class="w-input-wrapper">

    <input pInputText

           [attr.name]="name"
           [attr.type]="type"
           class="w-input-field"
           [ngClass]="styleClass"
           [class.has-icon]="icon"
           placeholder="{{placeHolder}}"
           [class.u-validation-error]="!(formControl.valid || (formControl.pristine))"
           formControlName="{{name}}"
           [value]="displayValue">
        <span *ngIf="icon" class="sap-icon" [ngClass]="icon"></span>
</div>


<ng-template [ngIf]="!editable">
    <aw-string [value]="displayValue"></aw-string>
</ng-template>
`,
                styles: [`.w-input-wrapper{position:relative}.w-input-field~span{top:13px;position:absolute;right:15px}`],
                providers: [
                    INPUT_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => InputFieldComponent) }
                ]
            },] },
];
/** @nocollapse */
InputFieldComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
InputFieldComponent.propDecorators = {
    value: [{ type: Input }],
    precision: [{ type: Input }],
    bigDecimal: [{ type: Input }],
    icon: [{ type: Input }],
    type: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWStringFieldModule {
}
AWStringFieldModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    StringComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule
                ],
                entryComponents: [
                    StringComponent
                ],
                exports: [
                    StringComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWInputFieldModule {
}
AWInputFieldModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    InputFieldComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    InputTextModule,
                    AWStringFieldModule
                ],
                entryComponents: [
                    InputFieldComponent
                ],
                exports: [
                    InputFieldComponent,
                    AWStringFieldModule,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
class BasicNavigatorComponent extends BaseComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Button component that implements consistent styling, behavior. Button can be rendered either as
 * a button or as a link. It could be standalone or be part of a form.
 *
 *  ### Example
 *  ```
 *
 * \@Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *   <aw-form-table >
 *       <aw-form-row [label]="'Amount'" [name]="'amount'" [size]="'small'">
 *
 *           <aw-button [type]="'submit'" [name]="'button'"
 *                     (action)="onClicked($event)" [value]="command"
 *                     [style]="'warning'" >Button</aw-button>
 *       </aw-form-row>
 *   </aw-form-table>
 *
 *    `
 *    })
 *    export class MyComponent
 *    {
 *        command:boolean;
 *
 *        constructor ()
 *        {
 *        }
 *
 *        onClicked(value:string) {
 *           if (value) {
 *              // submit form.
 *           }
 *        }
 *    }
 */
class ButtonComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
        /**
         * Button types  [ button | submit | reset ]
         *
         */
        this.type = 'button';
        /**
         * styling for this button. See ButtonStyle for all supported styles.
         */
        this.style = 'primary';
        /**
         * sizing for this button. [large, normal, small].
         */
        this.size = 'normal';
        /**
         * Event fired when user select a item
         */
        this.action = new EventEmitter();
        // Default button class is secondary.
        this.buttonClass = 'ui-button-secondary';
        // Default disabled
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        // How to style this button.
        if (isPresent(this.style)) {
            if (this.style === 'primary') {
                // Default .ui-button and .ui-button-primary get the same style.
                // .ui-button-primary is necessary because button style can be overridden
                // when included inside other widgets. So specify primary
                this.buttonClass = 'ui-button-primary';
            }
            else {
                this.buttonClass = 'ui-button-' + this.style;
            }
        }
        // Determine the button class based on input size.
        if (this.size) {
            switch (this.size) {
                case 'large':
                    this.buttonClass += ' btn-lg';
                    break;
                case 'normal':
                    this.buttonClass += ' btn-mid';
                    break;
                case 'small':
                    this.buttonClass += ' btn-sm';
                    break;
            }
        }
    }
    /**
     * This is little hacky hackity hack as currently primeng button directive does not work with
     * ngcontent projection but it has a label bindings, which is not the way developers work with
     * button. you want to
     *
     * <button> MY CONTENT</button instead of <button label='MyContent'></button>
     *
     *
     * \@Todo: Change this until the time keep a test that check that they are still using ui-button
     *     that we are expecting and replacing
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPresent(this.element)) {
            let /** @type {?} */ button = this.element.nativeElement.querySelector('button');
            let /** @type {?} */ buttonTitle = button.children[0];
            button.children[0].textContent = this.element.nativeElement.textContent.trim()
                .replace('ui-button', '').replace('ui-btn', '');
            button.classList.remove('ui-button-text-empty');
            button.textContent = '';
            button.appendChild(buttonTitle);
        }
    }
    /**
     *  Action clicked. Call parent action.
     * @param {?} $event
     * @return {?}
     */
    clicked($event) {
        this.action.emit(isBlank(this.value) ? $event : this.value);
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-button',
                template: `<button
    pButton
    [attr.type]="type"
    [attr.name]="name"
    [ngClass]="buttonClass"
    [disabled]="disabled"
    [attr.value]="value"
    (click)="clicked($event)">

    <ng-content></ng-content>
</button>
`,
                styles: [`.ui-button-link{color:#337ab7;font-weight:400;border-radius:0;background-color:transparent}.ui-button-link,.ui-button-link.active,.ui-button-link:active,.ui-button-link:focus,.ui-button-link:hover,.ui-button-link[disabled]{border-color:transparent}.ui-button-link:focus,.ui-button-link:hover{color:#337ab7;-webkit-text-decoration:#337ab7;text-decoration:#337ab7;background-color:transparent}.ui-button-link[disabled]:focus,.ui-button-link[disabled]:hover{color:#2399e5;text-decoration:none}.ui-button{margin-right:5px}.btn-mid{height:36px;padding:5px 10px}.btn-lg{height:42px;font-size:16px;padding:5px 12px}.btn-sm{height:30px;font-size:12px;padding:5px 10px}`]
            },] },
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
ButtonComponent.propDecorators = {
    type: [{ type: Input }],
    name: [{ type: Input }],
    style: [{ type: Input }],
    size: [{ type: Input }],
    target: [{ type: Input }],
    value: [{ type: Input }],
    action: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWButtonModule {
}
AWButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ButtonComponent
                ],
                imports: [
                    CommonModule,
                    ButtonModule,
                ],
                entryComponents: [
                    ButtonComponent
                ],
                exports: [
                    ButtonComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWBasicNavigatorModule {
}
AWBasicNavigatorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    BasicNavigatorComponent
                ],
                imports: [
                    CommonModule,
                    ToolbarModule,
                    AWButtonModule,
                    AWCoreComponentModule
                ],
                exports: [
                    BasicNavigatorComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CardZoneTopComponent {
}
CardZoneTopComponent.decorators = [
    { type: Directive, args: [{
                selector: `aw-card-top`,
                host: {
                    'class': 'w-card-ztop'
                }
            },] },
];
class CardZoneBottomComponent {
}
CardZoneBottomComponent.decorators = [
    { type: Directive, args: [{
                selector: `aw-card-bottom`,
                host: {
                    'class': 'w-card-zbottom'
                }
            },] },
];
/**
 *
 * Card component is a container rendering its content inside 3 different zones.
 *
 *  ------------------------------------------
 *  |   TITLE                       | ACTION |
 *  |-----------------------------------------
 *  |                                        |
 *  |   TOP                                  |
 *  |                                        |
 *  ------------------------------------------
 *  |                                        |
 *  |   BOTTOM                               |
 *  |                                        |
 *  |                                        |
 *  ------------------------------------------
 *
 *
 *  There are 3 zones  + 1 placeholder for the actionIcon
 *
 *  Cards can be selectable which means when you click on it there will be rendered a border with
 *  a check mark inside Action zone (this is default behavior).
 *  You can use [selectable] binding to disable this, in such case card will have just a border
 *  without any check mark.
 *
 *  Cards can also contain custom Action which is rendered inside ACTION zone and on the
 *  application level you can listen for (click) events as well as you can provide your own action
 *  icon
 *
 *  Besides ACTION, TITLE, TOP and BOTTOM content zones cards support hover overlay effect and
 *  when its activated there is a overlay displayed on top of the card with Icon in the middle.
 *  Please note when [hasHover] is TRUE all the actions and selectability are disabled as there is
 *  only one action which click on the hover overlay.
 *
 *
 * ###example 1:
 *  Basic hover card which by default support selectable mode
 *
 * ```
 *          <aw-card #card1 [hasAction]="false" [width]="'202px'" [height]="'154px'">
 *
 *                 <aw-card-title [align]="'bottom-left'">
 *                     <span class="a-supplier-tag">
 *                         Preferred
 *                     </span>
 *                 </aw-card-title>
 *
 *                 <aw-card-top>
 *                     <div class="supplierName">
 *                         Haight Pumps
 *                     </div>
 *                     <div class="supplierLocation">
 *                         Palo Alto, CA, USA
 *                     </div>
 *                 </aw-card-top>
 *
 *                 <aw-card-bottom class="w-card-zbottom">
 *                     some text about the supplier and his parents<br/>
 *                     and some contacts
 *                 </aw-card-bottom>
 *
 *             </aw-card>
 *
 * ```
 *
 *  ###example 2:
 *   Hover card with custom action. when unselected action will appear and user can click on it.
 *
 * ```
 *          <aw-card #card1 [selectable]="true" [actionIcon]="'icon-question-mark'"
 *                     (onAction)="onAction(3, $event)">
 *
 *                 <aw-card-title [align]="'bottom-left'">
 *                     <span class="a-supplier-tag">
 *                         Preferred
 *                     </span>
 *                 </aw-card-title>
 *
 *                 <aw-card-top>
 *                     <div class="supplierName">
 *                         Haight Pumps
 *                     </div>
 *                     <div class="supplierLocation">
 *                         Palo Alto, CA, USA
 *                     </div>
 *                 </aw-card-top>
 *
 *                 <aw-card-bottom class="w-card-zbottom">
 *                     some text about the supplier and his parents<br/>
 *                     and some contacts
 *                 </aw-card-bottom>
 *
 *             </aw-card>
 *
 * ```
 *
 *
 *
 */
class CardComponent extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * Tells if we should explicitly hide the action
         *
         */
        this.hasAction = false;
        /**
         *
         * Is selectable mode supported? Saying Yes, card will have by default check-mark in the
         * ACTION zone when selected
         *
         */
        this.selectable = true;
        /**
         * Option to pass custom "Card Selected" Icon
         *
         */
        this.selectedIcon = 'icon-accept';
        /*
             * Enable and disables hover effect on top of the card
             */
        this.hasHover = false;
        /**
         *
         * Default icon name for the hover overlay. This icons shows up in the middle over the card
         * vertically and horizontally centered
         *
         */
        this.hoverIcon = 'icon-add';
        /**
         *  Selection state
         *
         */
        this.selected = true;
        /**
         * Fired when the card is selected.
         *
         */
        this.onSelect = new EventEmitter();
        /**
         * Fired when action icon is clicked.
         *
         */
        this.onAction = new EventEmitter();
        /**
         * Fired when the user clicks on the hover overlay.
         *
         */
        this.onHoverAction = new EventEmitter();
        /**
         * Usually when template is provided we want to use it and replace internal one but in this
         * case it will be always conditional and application developer can switch between default
         * template with zones and custom one provided by developer.
         *
         */
        this.useBodyTemplate = false;
        // sets default value
        this.width = '202px';
        this.height = '154px';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        // If application wants to use action it must provide actionIcon
        if (isBlank(this.actionIcon) && this.hasAction) {
            throw new Error('You need to provide action icon');
        }
    }
    /**
     * @return {?}
     */
    showBottomSection() {
        return isPresent(this.bottom);
    }
    /**
     * fires select and unselect event.
     * @param {?} event
     * @return {?}
     */
    toggleSelect(event) {
        if (!this.selectable) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.selected = !this.selected;
            this.onSelect.emit(this.selected);
        }
    }
    /**
     *
     * Only fired when action is rendered and user clicks on custom actionIcon
     *
     * @param {?} event
     * @return {?}
     */
    onActionClick(event) {
        if (this.hasAction && (!this.selected || !this.selectable)) {
            this.onAction.emit(this.selected);
        }
    }
    /**
     * Triggered  when hover effect is on + user click on the card
     *
     * @param {?} isEnter
     * @return {?}
     */
    onHover(isEnter) {
        if (isPresent(this.hoverDiv)) {
            this.hoverDiv.nativeElement.style.opacity = isEnter ? 0.5 : 0;
        }
    }
    /**
     *
     * Used to decide if we should render implicit card template with our zones or
     * user provided template
     *
     * @return {?}
     */
    showBodyTemplate() {
        return isPresent(this.bodyTemplate) && this.useBodyTemplate;
    }
}
CardComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-card',
                template: `<div class="w-card" [style.width]="width" [style.height]="height"
     [class.u-is-hover]="hasHover"
     (mouseenter)="onHover(true)"
     (mouseleave)="onHover(false)"
     [class.u-card-selected]="selected"
     [class.u-card-unselected]="!selected"
     [ngClass]="styleClass"
>

    <div class="card-body ui-g"  *ngIf="!showBodyTemplate()">
        <!-- Hover element that is triggered by mouseenter, mouseleave events-->
        <div #hoverDiv *ngIf="hasHover" class="u-card-hover" (click)="onHoverAction.emit($event)">
            <span [style.width]="'100%'" class="sap-icon" [ngClass]="hoverIcon"></span>
        </div>
        <!-- HEADER HAVING TITLE AND ICONS/ACTIONS-->
        <div class="ui-g-12 ui-g-nopad w-card-header">
            <div class="w-card-ztitle ui-g-nopad" (click)="toggleSelect($event)"
                 [class.u-card-pointer]="selectable"
                 [ngClass]="{'ui-g-9': hasAction || selectable, 'ui-g-11': !hasAction && !selectable}">
                <ng-content select="aw-card-title"></ng-content>
            </div>

            <div *ngIf="hasAction || selectable" class="w-card-zaction ui-g-nopad ui-g-3">

                <span *ngIf="selected && selectable" class="sap-icon selection"
                      [class.u-card-pointer]="selectable"
                      [class.u-card-action-bg]="selected"
                      (click)="toggleSelect($event)"
                      [ngClass]="selectedIcon"></span>


                <span *ngIf="hasAction && (!selected || !selectable) "
                      class="sap-icon action"
                      [class.u-card-pointer]="true"
                      (click)="onActionClick($event)"
                      [ngClass]="actionIcon"
                ></span>
            </div>
        </div>

        <!--TOP CARD SECTION-->
        <div class="w-card-ztop ui-g-nopad ui-g-12 "
             (click)="toggleSelect($event)"
             [class.u-card-pointer]="selectable">
            <ng-content select="aw-card-top"></ng-content>
        </div>

        <div class="ui-g-12 ui-g-nopad w-card-line-divider  " *ngIf="showBottomSection()"></div>
        <!--BOTTOM CARD SECTION-->
        <div *ngIf="showBottomSection()" class="ui-g-12 ui-g-nopad w-card-zbottom"
             [class.u-card-pointer]="selectable"
             (click)="toggleSelect($event)">
            <ng-content select="aw-card-bottom"></ng-content>
        </div>
    </div>

    <div *ngIf="showBodyTemplate()" class="w-card-user-cnt" >
        <ng-container *ngTemplateOutlet="bodyTemplate">
        </ng-container>
    </div>

</div>
`,
                styles: [`.w-card{border:2px solid #0076cb;display:inline-block;overflow:hidden;color:#636363;box-sizing:border-box}.w-card-header{position:relative;height:30px;padding-left:1em}.w-card-ztitle{height:100%;padding-top:3px}.w-card-ztitle ::ng-deep .w-card-title{height:100%;width:100%;display:flex}.w-card-ztitle ::ng-deep .w-card-title>*{flex:0 1}.w-card-zaction{height:100%;display:inline-block;text-align:right}.w-card-zaction .sap-icon{width:29px;height:29px;text-align:center;display:inline-block;font-size:1.5em;line-height:1.4em}.w-card-zaction .sap-icon.selection{color:#fff}.w-card-zaction .sap-icon.action{color:#969696}.w-card-zbottom,.w-card-ztop{padding:1em}.w-card-line-divider{border-top:1px solid #d6d6d6;margin:0 14px}.w-card-user-cnt{width:100%;height:100%;position:relative;background-color:#eee}.u-card-hover{position:absolute;height:100%;width:100%;opacity:0;transition:.5s ease;background-color:#0076cb;z-index:100}.u-card-hover .sap-icon{text-align:center;display:inline-block;font-size:4em;color:#fff;position:relative;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.u-card-action-bg{background:#0076cb}.u-is-hover{position:relative}.u-card-selected{border-color:#0076cb}.u-card-unselected{border-color:#d7d7d7}.u-card-hover,.u-card-pointer{cursor:pointer}`]
            },] },
];
/** @nocollapse */
CardComponent.ctorParameters = () => [
    { type: Environment }
];
CardComponent.propDecorators = {
    hasAction: [{ type: Input }],
    selectable: [{ type: Input }],
    selectedIcon: [{ type: Input }],
    actionIcon: [{ type: Input }],
    hasHover: [{ type: Input }],
    hoverIcon: [{ type: Input }],
    selected: [{ type: Input }],
    onSelect: [{ type: Output }],
    onAction: [{ type: Output }],
    onHoverAction: [{ type: Output }],
    bottom: [{ type: ContentChild, args: [CardZoneBottomComponent,] }],
    bodyTemplate: [{ type: ContentChild, args: ['body',] }],
    hoverDiv: [{ type: ViewChild, args: ['hoverDiv',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Maps our internal alignment value to real css values
 *
 */
const /** @type {?} */ VAlignMap = {
    'top-left': 'flex-start',
    'top-center': 'flex-start',
    'top-right': 'flex-start',
    'center-left': 'center',
    'center-center': 'center',
    'center-right': 'center',
    'bottom-left': 'flex-end',
    'bottom-center': 'flex-end',
    'bottom-right': 'flex-end'
};
const /** @type {?} */ HAlignMap = {
    'top-left': 'flex-start',
    'top-center': 'center',
    'top-right': 'flex-end',
    'center-left': 'flex-start',
    'center-center': 'center',
    'center-right': 'flex-end',
    'bottom-left': 'flex-start',
    'bottom-center': 'center',
    'bottom-right': 'flex-end'
};
/**
 * Title zone provides a content placeholder for the Title Area. This zone is adding ability
 * to align its content into 9 different position.
 *
 * You can use this Title zone within <aw-card> as:
 *
 *
 * ```html
 *
 *  <aw-card  [width]="'202px'" [height]="'154px'" [hasHover]="true"
 *                       [selectable]="false" [hasAction]="false"
 *                  (onHoverAction)="onAction(7, $event)" >
 *
 *                  <aw-card-title [align]="'bottom-left'">
 *                      <span class="a-supplier-tag">
 *                          Preferred
 *                      </span>
 *                  </aw-card-title>
 *
 *   </aw-card>
 *
 * ```
 * Default alignment is top-left
 *
 *
 *
 *
 */
class CardZoneTitleComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} elem
     */
    constructor(env, elem) {
        super(env);
        this.env = env;
        this.elem = elem;
        /**
         * Special property which is used to apply flex properties for aligning content vertically
         * as well as horizontally
         *
         */
        this.align = 'top-left';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.elem.nativeElement.style.alignItems = VAlignMap[this.align];
        this.elem.nativeElement.style.justifyContent = HAlignMap[this.align];
    }
}
CardZoneTitleComponent.decorators = [
    { type: Directive, args: [{
                selector: `aw-card-title`,
                host: {
                    'class': 'w-card-title'
                }
            },] },
];
/** @nocollapse */
CardZoneTitleComponent.ctorParameters = () => [
    { type: Environment },
    { type: ElementRef }
];
CardZoneTitleComponent.propDecorators = {
    align: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWCardModule {
}
AWCardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    CardComponent,
                    CardZoneTitleComponent,
                    CardZoneTopComponent,
                    CardZoneBottomComponent
                ],
                entryComponents: [
                    CardComponent
                ],
                exports: [
                    CardComponent,
                    CardZoneTitleComponent,
                    CardZoneTopComponent,
                    CardZoneBottomComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Implements standard HTML checkbox on top of PrimeNG. There are 2 types of
 * {\@link CheckboxComponent}: form and action checkbox as described above.
 *
 *
 * Usage: Basic example having red checkbox checked
 *
 * ```HTML
 *        <aw-checkbox [name]="'color'" [value]="'red'" [label]="'Red'"
 *                                        [(ngModel)]="model">
 *        </aw-checkbox>
 *        <aw-checkbox [name]="'color'" [value]="'blue'" [label]="'Blue'"
 *                                        [(ngModel)]="model">
 *       </aw-checkbox>
 *
 * ```
 *
 * ```ts
 *
 *
 *   class CBBasicWithNgModelComponent
 *   {
 *
 *       model: string[] = ['red'];
 *
 *       constructor()
 *       {
 *       }
 *   }
 *
 * ```
 *
 * For more examples please see a playground or unit test.
 *
 */
const /** @type {?} */ CB_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};
class CheckboxComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * A value associated with this checkbox
         *
         */
        this.value = '';
        /**
         * Type of checkbox. Form based updates model and Action based only fires click events
         *
         */
        this.type = 'form';
        /**
         * Trigger click event.
         *
         */
        this.action = new EventEmitter();
        /**
         * PrimeNG has this type called binary which works only with Boolean meaning it does not add or
         * remove values.
         *
         * In our case Checktype = Action is always binary or when this.value is boolean
         *
         */
        this.isBinary = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.model = this.value;
        this.type = this.action.observers.length > 0 ? 'action' : this.type;
        if (this.isFormType()) {
            super.ngOnInit();
            if (this.isStandalone) {
                super.registerFormControl(this.value);
                this.model = this.formControl.value;
                this.onModelChanged(this.model);
            }
            else {
                // get control from parent
                this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
            }
        }
        // When value is boolean we are dealing with PrimeNg Binary checkbox
        // which only sets TRUE/FALSE and does not add or remove values
        this.isBinary = isBoolean(this.value);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (isPresent(changes['value']) &&
            (changes['value'].currentValue !== changes['value'].previousValue)) {
            this.model = changes['value'].currentValue;
        }
    }
    /**
     * Called when Checkbox is clicked and it either fire action or updates the model.
     *
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        if (this.isFormType()) {
            this.onModelChanged(this.model);
            if (this.isStandalone) {
                this.formControl.setValue(this.model);
            }
        }
        else {
            this.action.emit(event);
        }
    }
    /**
     *
     * Tell if we are using Form Checkbox. This is used remove some of the bindings that are not
     * applicable for certain type.
     *
     * @return {?}
     */
    isFormType() {
        return this.type === 'form';
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.model && this.isFormType()) {
            this.model = value;
            if (this.isStandalone) {
                this.onModelChanged(this.model);
                this.formControl.setValue(this.model);
            }
        }
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-checkbox',
                template: `<span class="w-checkbox">

    <ng-template [ngIf]="editable && isFormType()">
        <p-checkbox [name]="name" [value]="value" [label]="label"
                    [(ngModel)]="model"
                    [binary]="isBinary"
                    (onChange)="onChange($event)"
                    [disabled]="disabled"
                    [class.u-validation-error]="!(formControl.valid || (formControl.pristine))"
        >
        </p-checkbox>
    </ng-template>


    <ng-template [ngIf]="!isFormType()">
        <p-checkbox [binary]="isBinary"
                    [label]="label"
                    [(ngModel)]="model"
                    (onChange)="onChange($event)"
                    [disabled]="disabled">
        </p-checkbox>

    </ng-template>
</span>
`,
                styles: [`/deep/ .ui-chkbox .ui-chkbox-box{width:22px;height:22px}/deep/ .ui-chkbox .pi{font-family:"SAP icon fonts";color:#199de0;cursor:pointer;font-size:1.07em;line-height:1.42em}/deep/ .ui-chkbox .pi.pi-check:before{content:'\\e05b'}`],
                providers: [
                    CB_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => CheckboxComponent) }
                ]
            },] },
];
/** @nocollapse */
CheckboxComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
CheckboxComponent.propDecorators = {
    value: [{ type: Input }],
    type: [{ type: Input }],
    label: [{ type: Input }],
    action: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWCheckBoxModule {
}
AWCheckBoxModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    CheckboxComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    CheckboxModule
                ],
                entryComponents: [
                    CheckboxComponent
                ],
                exports: [
                    CheckboxComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *  Checkbox list is a wrapper class around 'Checkbox' component to simply assembly of multi choice
 * component
 *
 * In Addition it adds ability to work with complex object. PrimeNG checkboxes work only with
 * primitive values.
 *
 * @see {\@link check-box/check-box.component.ts}
 *
 *
 * ### Example
 *
 *
 * \@Component({
 *       selector: 'showCheckBoxList' ,
 *       template: `
 *           <aw-checkbox-list [list]="checkBoxListValues" [selections]="selectedValues"
 *
 *            [name]="'myColors'" [formGroup]="formGroup" (onSelection)="onCBClick">
 *           </aw-checkbox-list>
 *       `
 *
 *       })
 *        class MyShowCLComponent
 *        {
 *            checkBoxListValues: string[] = ['blue' , 'red' , 'yellow' , 'orange' , 'white' ,
 *     'silver' , 'black' ,
 *            'Green' , 'Gray' , 'Navy' , 'Olive' , 'Aqua' , 'Purple'];
 *
 *            selectedValues: string[] = ['blue' , 'Olive' , 'Aqua' , 'Purple'];
 *
 *
 *            formGroup: FormGroup = new FormGroup({});
 *
 *
 *            onCBClick (event): void
 *            {
 *                console.log('onCBClick = ' + event);
 *            }
 *
 *        }
 * *
 */
const /** @type {?} */ CB_LIST_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxListComponent),
    multi: true
};
class CheckBoxListComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} cd
     * @param {?} parentContainer
     */
    constructor(env, cd, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.cd = cd;
        this.parentContainer = parentContainer;
        /**
         * Fires event when checkbox is selected/clicked. Emits current clicked checkboxed. not the
         * actuall internal model value in this case array of choices
         *
         */
        this.onSelection = new EventEmitter();
        /**
         * Internal model
         */
        this.model = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.selections)) {
            this.selections = [];
        }
        this.registerFormControl(this.selections);
        this.updateModel(this.selections);
        this.onModelChanged(this.selections);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        let /** @type {?} */ updatedModel = [];
        this.model.forEach((index) => updatedModel.push(this.list[index]));
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
        this.cd.detectChanges();
    }
    /**
     * Label is extracted into this method so in the future we can play more how we want to display
     * the value. Since I want to support formatters for each components we might have a chance to
     * decide how label will look like.
     *
     * @param {?} item
     * @return {?}
     */
    labelValue(item) {
        if (isPresent(this.labelFormatter)) {
            return this.labelFormatter(item);
        }
        return item.toString();
    }
    /**
     * In this version of checkboxes we still expect only primitive types. Keep this functionality
     * in extra method so we can work with it even now we just return the same value back
     * @param {?} item
     * @return {?}
     */
    value(item) {
        return item;
    }
    /**
     * Delegate event outside of this component and convert indexed model to original objects
     *
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        let /** @type {?} */ updatedModel = [];
        this.model.forEach((index) => {
            updatedModel.push(this.list[index]);
        });
        this.onSelection.emit(updatedModel);
        this.onModelChanged(updatedModel);
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
    }
    /**
     * Since we might be dealing with complex object store only INDEXes number in the model.
     *
     * @param {?} sourceList
     * @return {?}
     */
    updateModel(sourceList) {
        sourceList.forEach((item) => {
            let /** @type {?} */ index = this.list.findIndex((elem) => {
                return equals(item, elem);
            });
            this.model.push(index);
        });
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (isPresent(this.model) && isPresent(value)) {
            let /** @type {?} */ newModel = value;
            this.updateModel(newModel);
            // this.cd.markForCheck();
        }
    }
}
CheckBoxListComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-checkbox-list',
                template: `<div *ngFor="let item of list; let i = index" class="ui-g">

    <!-- in the future we should be able to to support inline and stack-->
    <div class="ui-g-12">
        <aw-checkbox [(ngModel)]="model"
                     (ngModelChange)="onChange($event)"
                     [editable]="editable"
                     [isStandalone]="false"
                     [name]="name"
                     [value]="i"
                     [label]="labelValue(item)">

        </aw-checkbox>
    </div>

</div>

`,
                styles: [``],
                providers: [
                    CB_LIST_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => CheckBoxListComponent) }
                ]
            },] },
];
/** @nocollapse */
CheckBoxListComponent.ctorParameters = () => [
    { type: Environment },
    { type: ChangeDetectorRef },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
CheckBoxListComponent.propDecorators = {
    list: [{ type: Input }],
    selections: [{ type: Input }],
    onSelection: [{ type: Output }],
    labelFormatter: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWCheckBoxListModule {
}
AWCheckBoxListModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    CheckBoxListComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    AWCheckBoxModule
                ],
                exports: [
                    CheckBoxListComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Hyperlink component that implements consistent styling, behavior. Hyperlink supports all of the
 * native link functionality. In addition, it supports navigation to components through the action
 * binding.
 *
 *
 * for more info please see class Doc of the:
 * @see {\@link button/button.component.ts}
 *
 *  ### Example
 *  ```
 *
 * \@Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *           <aw-hyperlink  [type]="'text/html'" [name]="'link'"
 *                        (action)="onClicked($event)" [value]="customerId"
 *                        [size]="'large'" >my link</aw-hyperlink>
 *
 *    `
 *    })
 *    export class MyComponent
 *    {
 *        command:boolean;
 *
 *        constructor ()
 *        {
 *        }
 *
 *        onClicked(customerId:string) {
 *           if (customerId) {
 *              // display customer details component.
 *           }
 *        }
 *    }
 */
class HyperlinkComponent extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * sizing for this link. [large, normal, small].
         */
        this.size = 'normal';
        /**
         * Event fired when user select a item
         */
        this.action = new EventEmitter();
        /**
         * Internal CSS class that styles this hyperlink based on input 'size'
         */
        this.linkClass = 'link';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        // Determine the link class based on input size.
        if (this.size) {
            switch (this.size) {
                case 'large':
                    this.linkClass += ' link-lg';
                    break;
                case 'normal':
                    this.linkClass += ' link-mid';
                    break;
                case 'small':
                    this.linkClass += ' link-sm';
                    break;
            }
        }
        // If I have an action tag, and no href. We add default styling and behavior.
        if (this.action.observers.length > 0) {
            this.linkClass += ' link-bh';
        }
    }
    /**
     *  Action clicked. Call parent action.
     * @param {?} event
     * @return {?}
     */
    clicked(event) {
        this.action.emit({
            event: event,
            value: this.value
        });
    }
}
HyperlinkComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-hyperlink',
                template: `<a [attr.type]="type"
   [attr.href]="href"
   [attr.rel]="rel"
   [attr.target]="target"
   [ngClass]="linkClass"
   [class.disabled]="disabled"
   (click)="clicked($event)">

    <ng-content></ng-content>
</a>
`,
                styles: [`.link{color:#0275d8;cursor:pointer}.link.link-bh{color:#0275d8}.link.link-bh:hover{text-decoration:underline;cursor:pointer}.link-sm{font-size:.875em}.link-mid{font-size:1em}.link-lg{font-size:1.25em}.link.disabled{pointer-events:none;cursor:default;color:#ddd}`]
            },] },
];
/** @nocollapse */
HyperlinkComponent.ctorParameters = () => [
    { type: Environment }
];
HyperlinkComponent.propDecorators = {
    type: [{ type: Input }],
    href: [{ type: Input }],
    rel: [{ type: Input }],
    size: [{ type: Input }],
    target: [{ type: Input }],
    value: [{ type: Input }],
    action: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWHyperlinkModule {
}
AWHyperlinkModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    HyperlinkComponent
                ],
                imports: [
                    CommonModule
                ],
                entryComponents: [
                    HyperlinkComponent
                ],
                exports: [
                    HyperlinkComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Selection State for the chooser in order to be able to comunicate with the parent object using a
 * chooser. If I would have to manage only single values with no addional methods i would user
 * emitters to do the job, but in this case we need this interface (abstract class) between a
 * chooser and actual object.
 *
 *
 * @abstract
 */
class ChooserSelectionState {
    /**
     *
     * Set selection state is usually triggered by selecting and unselecting a item (in case of
     * multiselect) and it should update its list of objects with either settings/adding item or
     * removing it.
     *
     *
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    setSelectionState(selection, selected) {
    }
    /**
     * The most recent selection . Null if last action was a deselection. Usually used by Chooser
     * or ChooserState to get cuurent value.
     *
     * @return {?}
     */
    selectedObject() {
        return unimplemented();
    }
    /**
     * The most recent selections.
     *
     * @return {?}
     */
    selectedObjects() {
        return unimplemented();
    }
    /**
     *
     * Check if the item selection items is in the selectedObjects
     * @param {?} selection
     * @return {?}
     */
    isSelected(selection) {
        return unimplemented();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * ChooserState manages complete lifecycle for the Chooser Component. It keeps track of current
 * selection as well as it can broadcast any updates.
 *
 *
 */
class ChooserState {
    /**
     * @param {?=} chooserSelectionState
     * @param {?=} isMulti
     */
    constructor(chooserSelectionState, isMulti = true) {
        /**
         * Indicates if there are any validation like entered value does not much with the source list.
         *
         */
        this.isInvalid = false;
        /**
         *
         * indicates that we started to some editing e.g. starting to type in something into the
         * filter, or removing already selected items
         */
        this.addMode = false;
        this.recentSelectedDisplayed = 0;
        /**
         * When this option is active we do not show all selected items, but max number that is
         * defined. User is able to toggle to expand the view to see all selections and hide them as
         * well
         */
        this.showAllRecentlySelected = false;
        this.selectionState = chooserSelectionState;
        this.multiselect = isMulti;
        if (isBlank(this.selectionState)) {
            this.selectionState = new DefaultSelectionState(this.multiselect);
        }
    }
    /**
     *
     * It will select and persist an item using ChooserSelectionState provider.
     *
     * @param {?} item
     * @return {?}
     */
    updatedSelectedObjects(item) {
        if (isBlank(item)) {
            item = this.currentItem;
        }
        if (!this.multiselect) {
            this.setSelectionState(item, true);
        }
        else {
            let /** @type {?} */ selectedObject = this.selectedObject();
            let /** @type {?} */ selectedObjects = this.selectedObjects();
            if (this.addMode) {
                if (this.isInvalid) {
                    if (isPresent(selectedObject)) {
                        this.setSelectionState(selectedObject, false);
                    }
                }
                this.setSelectionState(item, !ListWrapper.containsComplex(selectedObjects, item));
            }
            else {
                if (isPresent(selectedObject)) {
                    this.setSelectionState(selectedObject, false);
                }
                this.setSelectionState(item, true);
            }
        }
    }
    /**
     * When user selection is large we use this method to check if we need to show all selected
     * items or only MaxRecentSelected
     * @return {?}
     */
    toggleAllSelected() {
        this.showAllRecentlySelected = !this.showAllRecentlySelected;
    }
    /**
     *
     * Renders user's selection under the input field
     *
     * @return {?}
     */
    get recentSelectedObjects() {
        if (!this.multiselect) {
            return [];
        }
        let /** @type {?} */ recentSelectedObjects = [];
        this.recentSelectedDisplayed = 0;
        let /** @type {?} */ selectedObjects = this.selectedObjects();
        let /** @type {?} */ size = selectedObjects.length;
        let /** @type {?} */ maxCount = DataSource.MaxRecentSelected;
        if (size > DataSource.MaxRecentSelected && !this.showAllRecentlySelected) {
            maxCount -= 1;
        }
        if (this.showAllRecentlySelected) {
            maxCount = size;
        }
        for (let /** @type {?} */ i = size - 1; i >= 0 && (this.recentSelectedDisplayed < maxCount); i--) {
            let /** @type {?} */ selection = selectedObjects[i];
            recentSelectedObjects.push(selection);
            this.recentSelectedDisplayed++;
        }
        return recentSelectedObjects;
    }
    /**
     * @return {?}
     */
    selectedObject() {
        return this.selectionState.selectedObject();
    }
    /**
     * @return {?}
     */
    selectedObjects() {
        return this.selectionState.selectedObjects();
    }
    /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    setSelectionState(selection, selected) {
        if (isPresent(selection)) {
            this.selectionState.setSelectionState(selection, selected);
        }
    }
}
/**
 * Dummy implementation ChooserSelectionState
 */
class DefaultSelectionState extends ChooserSelectionState {
    /**
     * @param {?} multiSelect
     */
    constructor(multiSelect) {
        super();
        this.multiSelect = multiSelect;
    }
    /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    setSelectionState(selection, selected) {
        if (selected) {
            this._selectedObject = selection;
            if (this.multiSelect && !ListWrapper.containsComplex(this.selectedObjects(), selection)) {
                this.selectedObjects().push(selection);
            }
        }
        else {
            if (this.multiSelect) {
                ListWrapper.removeIfExist(this.selectedObjects(), selection);
            }
        }
    }
    /**
     * @return {?}
     */
    selectedObject() {
        return this._selectedObject;
    }
    /**
     * @return {?}
     */
    selectedObjects() {
        if (isBlank(this._selectedObjects)) {
            this._selectedObjects = [];
        }
        return this._selectedObjects;
    }
    /**
     * @param {?} selection
     * @return {?}
     */
    isSelected(selection) {
        return super.isSelected(selection);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Concrete DataSource implementation for the Chooser component. There are two ways how to use it:
 *
 * 1) You can use default DataSource injected inside component constructor and just call
 * initialize to configure it with correct DataProvider and DataFinder:
 *
 *
 * ```
 *   this.dataSource.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 * and then you can use it to simply retrieve data or run queries.
 *
 * 2) You will instantiate your own DataSource and pass it into the component using [dataSource]
 * binding
 *
 * ```
 *
 *   this.ds = new ChooserDataSource(this.data, this.finders);
 *   this.ds.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 *
 */
class ChooserDataSource extends DataSource {
    /**
     * @param {?} dataProviders
     * @param {?} finders
     */
    constructor(dataProviders, finders) {
        super(dataProviders, finders);
        this.dataProviders = dataProviders;
        this.finders = finders;
    }
    /**
     * To initialize this DataSource with current DataFinder and Provider as well as state we use
     * an interface DSChooserInitParams to have all init values typed checked
     *
     *
     * @param {...?} args
     * @return {?}
     */
    init(...args) {
        if (isBlank(args) || args.length !== 1 && !isDSChooserInitParams(args[0])) {
            throw new Error('You need to initialize DS with (DSChooserInitParams)');
        }
        let /** @type {?} */ init = args[0];
        this.dataProvider = isPresent(init.dataProvider) ? init.dataProvider
            : this.dataProviders.find(init.obj);
        this.dataFinder = isPresent(init.dataFinder) ? init.dataFinder
            : this.finders.find(this.dataProvider, init.queryType);
        assert(isPresent(this.dataProvider) && isPresent(this.dataFinder), 'DataSource incorrectly initialized. (DataProvider, DataFinder) missing. ');
        if (isPresent(init.state)) {
            this.state = init.state;
        }
        else {
            this.state = new ChooserState(null, init.multiselect);
        }
        this.dataFinder.lookupKey = init.lookupKey;
        this.state.lookupKey = init.lookupKey;
    }
    /**
     * @param {?} pattern
     * @param {?} max
     * @return {?}
     */
    find(pattern, max) {
        this.state.pattern = pattern;
        this.state.lastFullMatchPattern = pattern;
        if (pattern.length === 0) {
            return;
        }
        if (pattern === '*') {
            // query everything
            pattern = '';
        }
        // make sure we dataFinder has expected lookup key
        let /** @type {?} */ origKey = this.dataFinder.lookupKey;
        this.dataFinder.lookupKey = this.state.lookupKey;
        this.dataFinder.forData(this.dataProvider).match(pattern, max)
            .subscribe((result) => {
            this.state.matches = result;
            if (this.state.multiselect) {
                for (let /** @type {?} */ i = 0; i < this.state.selectedObjects().length; i++) {
                    let /** @type {?} */ item = this.state.selectedObjects()[i];
                    ListWrapper.removeIfExist(this.state.matches, item);
                }
            }
            this.dataFinder.lookupKey = origKey;
        });
    }
    /**
     *
     * When multiselect this method checks if we need to show SHOW MORE label under the selected
     * items. We do not want show e.g. 50 selection under the chooser that would take up whole
     * page.
     *
     * @return {?}
     */
    showMoreSelected() {
        return this.state.selectedObjects().length >= DataSource.MaxRecentSelected;
    }
    /**
     * @template T
     * @return {?}
     */
    open() {
        return this.dataProvider.dataChanges.asObservable();
    }
    /**
     * @return {?}
     */
    close() {
        this.dataProvider = null;
        this.dataFinder = null;
        this.state = null;
    }
    /**
     * @template T
     * @return {?}
     */
    instant() {
        return this.dataProvider.data();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        this.state.addMode = true;
        if (isArray(value)) {
            let /** @type {?} */ items = value;
            items.forEach((item) => this.state.updatedSelectedObjects(item));
        }
        else {
            this.state.updatedSelectedObjects(value);
        }
        this.state.addMode = false;
    }
    /**
     * @return {?}
     */
    get lookupKey() {
        return this.dataFinder.lookupKey;
    }
}
/**
 * @param {?} init
 * @return {?}
 */
function isDSChooserInitParams(init) {
    return isPresent(init.obj) || isPresent(init.queryType);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Typeahead chooser that supports both single and multi-select. Not like Dropdown, this chooser
 * requires little bit different setup. It requires at minimum \@Input dataSource or
 * destinationClass
 *
 *
 * By default chooser is multi-select. If you want single select then you must provide multi-select
 * with \@Input.
 *
 * ### Example
 *
 * In simple scenario you can use Chooser like so:
 *
 *
 * ```
 * \@Component({
 *      selector: 'chooser-app' ,
 *      template: `<aw-chooser  [formGroup]="formGroup" name="color"'
 *                      [dataSource]="ds"></aw-chooser>`
 *  })
 *  export class MyChooserApp
 *  {
 *
 *      ds: ChooserDataSource;
 *
 *     constructor(private data: DataProviders, private finders: DataFinders){
 *          this.ds = new ChooserDataSource(this.data, this.finders);
 *
 *       this.ds.init({
 *           obj: ['blue', 'red', 'yellow'], queryType: QueryType.FullText, state: null,
 *            multiselect: true
 *       });
 *
 *     }
 *  }
 *
 * ````
 *  Above example will use provided dataSource and render multi-select chooser. With default
 *  implementation  selected values will appear as a tags under the input box
 *
 *
 *
 * * ### Example
 *
 *  In this example we provide custom template to change the way how chooser's MenuItem are
 *     rendered as well as template for the selection item looks like
 *
 * ```
 * \@Component({
 *      selector: 'chooser-app' ,
 *      template: `<aw-chooser  name="commodity"' [dataSource]="ds">
 *
 *          <ng-template #menuItem let-item>
 *             	<span>
 *             		<i class="fa fa-envira " ></i>
 *             		{{item}}
 *             	</span>
 *
 *          </ng-template>
 *
 *          <ng-template #selectionItem let-item>
 *             	<span class="tag tag-circle">
 *             		item: {{item }}
 *             		<i class="fa fa-close" (click)="chooser.removeValue(item)"></i>
 *             	</span>
 *
 *
 *          </ng-template>
 *
 *
 *          </aw-chooser>
 *      `
 *      style: [`
 *              .tag-circle {
 *              	border-radius: 6rem;
 *              	height: 7rem;
 *              	color: #e8eef1;
 *              	background-color: rgba(53, 56, 58, 0.67);
 *              	line-height: 6rem;
 *              }
 *      `]
 *  })
 *
 * ````
 *
 *  In above example we change how the chooser's menu item look like as well as we define custom
 *     template for selection item to turn all selection to circles with text in the middle.
 *
 *
 *
 */
const /** @type {?} */ CHOOSER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChooserComponent),
    multi: true
};
class ChooserComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} elemementRef
     * @param {?} _defaultDS
     * @param {?} parentContainer
     */
    constructor(env, elemementRef, _defaultDS, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.elemementRef = elemementRef;
        this._defaultDS = _defaultDS;
        this.parentContainer = parentContainer;
        /**
         * Max number of items return at single Match so we do not return 1000 items at single time.
         *
         */
        this.maxLength = 10;
        /**
         * Max number of items return at single Match so we do not return 1000 items at single time.
         *
         */
        this.minLenForSearch = 1;
        /**
         * Is this multiselect
         *
         */
        this.multiselect = true;
        this.delay = 300;
        /**
         * Event fired when user select a item
         */
        this.onSelection = new EventEmitter();
        if (isBlank(this.placeHolder)) {
            // this.placeHolder = i18n.instant('Widgets.chooser.placeHolder');
            this.placeHolder = 'Search';
        }
        // this.hideLink = i18n.instant('Widgets.chooser.hideSelection');
        this.hideLink = 'Hide';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.dataSource)) {
            this.dataSource = this._defaultDS;
            this.initDatasource();
        }
        if (isPresent(this.formControl) && isPresent(this.formControl.value)) {
            this.dataSource.updateValue(this.formControl.value);
        }
        this.initInternalModel();
        if (this.isStandalone) {
            super.registerFormControl(this.internalChooserModel);
        }
        else {
            if (isPresent(this.name)) {
                this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
            }
        }
    }
    /**
     * Add Search icon in case of multiselect.
     * todo: Once PrimeNG will provide a template to override default behavior remove it
     *
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.dataSource.state.multiselect) {
            return;
        }
        let /** @type {?} */ searchInput = this.elemementRef.nativeElement.querySelector('.ui-autocomplete-input-token');
        if (isPresent(searchInput)) {
            let /** @type {?} */ iconElement = document.createElement('span');
            iconElement.className = 'search-icon-right fa fa-fw fa-search';
            searchInput.appendChild(iconElement);
        }
        if (isPresent(this.selectionAppendTo) && isPresent(this.selectionViewElem)) {
            let /** @type {?} */ parentElem = this.selectionAppendTo instanceof ElementRef ?
                this.selectionAppendTo.nativeElement : this.selectionAppendTo;
            parentElem.appendChild(this.selectionViewElem.nativeElement);
        }
    }
    /**
     * Need to change current behavior since we want to show selection under the chooser. K
     *
     * @return {?}
     */
    ngAfterViewChecked() {
        if (!this.dataSource.state.multiselect) {
            return;
        }
        let /** @type {?} */ tokens = this.elemementRef.nativeElement.querySelectorAll('.ui-autocomplete .ui-autocomplete-token');
        if (isPresent(tokens) && tokens.length > 0) {
            tokens.forEach((item) => {
                item.remove();
            });
        }
    }
    /**
     *
     * When value is entered into search box, we ask our DataSource to match this pattern
     * against data repository. It will retrieve all possible matches limited by MaxLen and this
     * is again filtered so it does not include already selected items.
     *
     *  the matched resulted is saved in the: this.dataSource.state.matches
     * @param {?} pattern
     * @return {?}
     */
    match(pattern) {
        let /** @type {?} */ maxLen = this.maxLength ? this.maxLength : ChooserDataSource.MaxLength;
        this.dataSource.find(pattern, maxLen);
        // fix: for tests: In version 4 we need to explicitly focus input otherwise autocomplete
        // doesn't give us any popup panel
        if (this.env.inTest && isPresent(this.autoCompleteComponent)) {
            this.autoCompleteComponent.focusInput();
        }
    }
    /**
     *
     * Invoked by Dropdown button in case of single select and here we want to invoke match
     * to retrieve all suggestions without any filter
     *
     * @param {?} event
     * @return {?}
     */
    onDropdownClick(event) {
        this.match('*');
        setTimeout(() => {
            this.match('*');
        }, 100);
    }
    /**
     *
     * Chooser state is updated  with user selection. Please see writeValue. When do not need
     * call anything additional as internalChooserModel and this.chooserState.selectedObjects()
     * shares the same references so its important that we first save reference to
     * this.chooserState.selectedObjects() and then back to internalChooserModel
     *
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        this.onSelection.emit(this.internalChooserModel);
        this.formControl.setValue(this.internalChooserModel, { emitEvent: true });
        this.formControl.markAsDirty({ onlySelf: true });
        this.dataSource.state.addMode = true;
        this.onModelChanged(this.internalChooserModel);
        this.dataSource.state.updatedSelectedObjects(item);
        this.dataSource.state.addMode = true;
        if (!this.dataSource.state.multiselect) {
            this.autoCompleteComponent.inputEL.nativeElement.value =
                this.displayItem(this.internalChooserModel);
        }
    }
    /**
     *
     * Unselect item
     *
     * @param {?} item
     * @return {?}
     */
    removeValue(item) {
        this.dataSource.state.addMode = true;
        this.dataSource.state.updatedSelectedObjects(item);
        this.dataSource.state.addMode = false;
        this.internalChooserModel = this.dataSource.state.selectedObjects();
        this.onSelection.emit(this.internalChooserModel);
        this.formControl.setValue(this.internalChooserModel, { emitEvent: true });
        this.formControl.markAsDirty({ onlySelf: true });
        this.onModelChanged(this.internalChooserModel);
        if (isPresent(this.autoCompleteComponent)) {
            this.autoCompleteComponent.focusInput();
        }
    }
    /**
     *
     * Convert a object if any into the string representation
     *
     * todo: implement better way how to work with objects
     *
     * @param {?} item
     * @return {?}
     */
    displayItem(item) {
        if (isBlank(item)) {
            return null;
        }
        this.dataSource.state.currentItem = item;
        if (isPresent(this.valueTransformer)) {
            return this.valueTransformer(item);
        }
        else if (isPresent(this.dataSource.lookupKey)) {
            return item[this.dataSource.lookupKey];
        }
        else {
            return item.toString();
        }
    }
    /**
     *
     * Returns a label that is shown under the selected item when user selection is >
     * MaxRecentSelected
     *
     * @return {?}
     */
    moreSelectString() {
        let /** @type {?} */ moreSelected = this.dataSource.state.selectedObjects().length -
            this.dataSource.state.recentSelectedDisplayed;
        if (moreSelected < 2 && !this.dataSource.state.showAllRecentlySelected) {
            return '';
        }
        if (this.dataSource.state.showAllRecentlySelected) {
            return this.hideLink;
        }
        return `${moreSelected} more selected...`;
    }
    /**
     * In case of multiselect = false check if we want to show a selected value inside the input
     * field
     *
     * @return {?}
     */
    singleValueSelected() {
        return !this.dataSource.state && isPresent(this.dataSource.state.currentItem)
            && !this.dataSource.state.addMode;
    }
    /**
     * @return {?}
     */
    hasMenuTemplate() {
        return isPresent(this.menuTemplate);
    }
    /**
     * @return {?}
     */
    hasSelectionTemplate() {
        return isPresent(this.selectionTemplate);
    }
    /**
     * Internal. Please see ControlValueAccessor
     * As we are using DataSource internally for [(ngModel)] case we need to deffer DataSource
     * initialization once we have a value and we only accept []
     *
     *
     * ? Should we do some deeper comparision?
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (isBlank(value)) {
            return;
        }
        if (isPresent(this.dataSource)) {
            this.dataSource.updateValue(value);
        }
        else {
            let /** @type {?} */ selState = new DefaultSelectionState(this.multiselect);
            let /** @type {?} */ chState = new ChooserState(selState, this.multiselect);
            this.initDatasource(chState);
            this.dataSource.updateValue(value);
        }
        this.initInternalModel();
    }
    /**
     * @param {?=} chooserState
     * @return {?}
     */
    initDatasource(chooserState) {
        assert(isPresent(this.destinationClass), 'You need to provide destinationClass or custom DataSource');
        this.dataSource.init({
            obj: this.destinationClass,
            queryType: QueryType.FullText,
            lookupKey: this.field,
            state: chooserState,
            multiselect: this.multiselect
        });
    }
    /**
     *
     * Used by ngOnInit and Write value to read state from ChooserState and set it to internal
     * ngModel property
     *
     * @return {?}
     */
    initInternalModel() {
        if (this.dataSource.state.multiselect) {
            this.internalChooserModel = this.dataSource.state.selectedObjects();
        }
        else {
            this.internalChooserModel = this.dataSource.state.selectedObject();
        }
        if (isPresent(this.formControl)) {
            this.formControl.setValue(this.internalChooserModel);
        }
    }
}
ChooserComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-chooser',
                template: `<div class="w-chooser ">

    <p-autoComplete #autoCompplete [(ngModel)]="internalChooserModel"
                    [suggestions]="dataSource.state.matches"
                    [multiple]="dataSource.state.multiselect"
                    [dropdown]="!dataSource.state.multiselect"
                    [minLength]="minLenForSearch"
                    [placeholder]="placeHolder"
                    [delay]="delay"
                    [disabled]="disabled"
                    (onDropdownClick)="onDropdownClick($event)"
                    (completeMethod)="match($event.query)"
                    (onSelect)="selectItem($event)"
                    (onUnselect)="removeValue($event)">


        <ng-template let-internalChooserModel pTemplate="item">
            <ng-template [ngIf]="!hasMenuTemplate()">
                {{ displayItem(internalChooserModel) }}
            </ng-template>
            <ng-template [embeddedItem]="menuTemplate" [item]="internalChooserModel"
                         *ngIf="hasMenuTemplate()"></ng-template>
        </ng-template>
    </p-autoComplete>

    <!--
        Wrap whole selection with one extra element so we can move it around

         see: selectionAppendTo
    -->
    <span #selectionView>
        <div class="w-chooser-selections"
             *ngIf="multiselect && dataSource.state.recentSelectedObjects.length > 0">

        <ng-template [ngIf]="!hasSelectionTemplate()">

            <!-- no selection template render it as it is from CORE-->
            <ul class="ui-autocomplete-multiple-container ui-widget ui-state-default "
                [ngClass]="{'ui-state-disabled':disabled,'ui-state-focus':autoCompleteComponent.focus}">

                <li #token *ngFor="let item of dataSource.state.recentSelectedObjects"
                    class="ui-autocomplete-token ui-state-highlight ui-corner-all" tabindex="0"
                    (keyup.delete)="removeValue(item)"
                    (keyup.backspace)="removeValue(item)">
					<span class="ui-autocomplete-token-icon sap-icon icon-decline"
                          (click)="removeValue(item)"></span>
                    <span class="ui-autocomplete-token-label">{{ displayItem(item) }}</span>
                </li>
            </ul>
        </ng-template>

            <!--Yes there is selection template let's iterate and push each item to be rendered-->
        <ng-template ngFor [ngForOf]="dataSource.state.recentSelectedObjects" let-item>
            <ng-template [embeddedItem]="selectionTemplate" [item]="item"
                         *ngIf="hasSelectionTemplate()"></ng-template>
        </ng-template>

        <ng-template [ngIf]="dataSource.showMoreSelected()">
			<span class="more-selected">
				<aw-hyperlink [size]="'small'" (action)="dataSource.state.toggleAllSelected()">
					{{moreSelectString()}}
				</aw-hyperlink>
			</span>
        </ng-template>
    </div>
    </span>


</div>

`,
                styles: [`/deep/ .ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-input,/deep/ .ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-multiple-container{width:100%}/deep/ .w-chooser .ui-autocomplete-multiple{line-height:normal}/deep/ .w-chooser .ui-autocomplete-input{width:100%}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button{right:0;position:absolute;border:0;width:30px;background:0 0}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button .pi{font-family:"SAP icon fonts";color:#767676;cursor:pointer;font-size:1.4em;margin-left:-.85em}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button .pi-caret-down:before{content:'\\e1ef'}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button input{padding-right:30px}/deep/ .w-chooser .ui-autocomplete-input-token{padding:0;margin:0;vertical-align:baseline;width:inherit}/deep/ .w-chooser .ui-autocomplete-input-token .fa{font-family:"SAP icon fonts";color:#767676;cursor:pointer;font-size:1.2em}/deep/ .w-chooser .ui-autocomplete-input-token .fa-search:before{content:'\\e00d'}/deep/ .w-chooser .ui-autocomplete-input-token input{width:inherit;padding-right:25px}/deep/ .w-chooser .ui-autocomplete-input-token span{position:absolute;right:5px;top:0;padding-top:.6em}/deep/ .w-chooser .ui-autocomplete-dropdown{height:36px}/deep/ .w-chooser .ui-autocomplete-panel .ui-autocomplete-list-item{padding:.65em 2em .65em .64em;margin:0}/deep/ body .ui-autocomplete.ui-autocomplete-multiple .ui-autocomplete-multiple-container{padding:.4em .5em .4em 1em}.w-chooser-selections{margin-top:2px}.w-chooser-selections ul{margin:0;padding:0}.w-chooser-selections .ui-autocomplete-multiple-container{border:0}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token{font-size:.85em;letter-spacing:.1px;font-weight:400;padding:0;background:#e0f2ff;margin-right:5px;margin-bottom:5px}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token-label{padding:4px 21px 4px 5px}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token-icon{font-size:.78em;padding-right:.28em}.w-chooser-selections .ui-autocomplete-multiple-container .sap-icon{line-height:inherit}.w-chooser-selections .more-selected{display:inline-block}`],
                providers: [
                    CHOOSER_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => ChooserComponent) },
                    { provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders] }
                ]
            },] },
];
/** @nocollapse */
ChooserComponent.ctorParameters = () => [
    { type: Environment },
    { type: ElementRef },
    { type: ChooserDataSource, decorators: [{ type: Inject, args: [DATA_SOURCE,] }] },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
ChooserComponent.propDecorators = {
    maxLength: [{ type: Input }],
    minLenForSearch: [{ type: Input }],
    valueTransformer: [{ type: Input }],
    multiselect: [{ type: Input }],
    dataSource: [{ type: Input }],
    selectionAppendTo: [{ type: Input }],
    delay: [{ type: Input }],
    destinationClass: [{ type: Input }],
    field: [{ type: Input }],
    onSelection: [{ type: Output }],
    menuTemplate: [{ type: ContentChild, args: ['menuItem',] }],
    selectionTemplate: [{ type: ContentChild, args: ['selectionItem',] }],
    autoCompleteComponent: [{ type: ViewChild, args: ['autoCompplete',] }],
    selectionViewElem: [{ type: ViewChild, args: ['selectionView',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWChooserModule {
}
AWChooserModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ChooserComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    AutoCompleteModule,
                    AWHyperlinkModule,
                    AWCoreComponentModule
                ],
                entryComponents: [
                    ChooserComponent
                ],
                exports: [
                    ChooserComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * A popup like component rendering list of values as. Based on PrimeNG component and one of the
 * main reason why we need to wrap this is to extend its capabilities to accept almost any
 * data type without using Primens's specific SelectItem type.
 *
 *
 * ### Example
 *
 * ```
 * \@Component({
 *      selector: 'showDropDown' ,
 *      template: '<aw-dropdown [list]="testItemSmall"
 *     (onSelection)="onSelection($event)"></aw-dropdown>'
 *  })
 *  export class MyDropComponent
 *  {
 *      testItemSmall: string[] = ['view' , 'edit'];
 *
 *      // when you switch list binding to refert to large item fiilter automatically is shown and
 *     max 10 items are
 *      // visible
 *      testItemLarge: string[] = ['view' , 'edit' , 'frank' , 'kolar' , 'The Sun' , 'Dog' ,
 *     'Computer' , 'A Desk' ,
 *      'My Car' , 'Pencil' , 'This Page' , 'Yesterday' , 'Monday' , 'Tuesday' , 'BMW R1200 GS' ,
 *     'Czech Republic' ,
 *      'Last Item'];
 *
 *
 *      itemSelected: string = 'view';
 *      itemSelectedLg: string = 'Monday';
 *
 *      noselString: string = '(no selection)';
 *
 *
 *      onSelection (event): void
 *      {
 *          this.itemSelected = event;
 *
 *      }
 *  }
 *
 *  ```
 *
 */
const /** @type {?} */ DD_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
};
class DropdownComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Event fired when user select a item
         */
        this.onSelection = new EventEmitter();
    }
    /**
     * Todo: Put back the scrolling option once we decide so. Currently the requirements are
     * show only 10 items max, no scrolling. Functionality commented out can show scrollbar with
     * search filter.
     * @return {?}
     */
    ngOnInit() {
        if (this.isStandalone) {
            super.ngOnInit();
            super.registerFormControl(this.selection);
        }
        else {
            if (isPresent(this.name)) {
                this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
            }
        }
        // transform a value to PrimeNg Format, we are not really be using a label field only a
        // value.
        this.internalList = [];
        // if (isPresent(this.noSelectionString)) {
        //     this.internalList.push({
        //         label: this.noSelectionString,
        //         value: null
        //     });
        //
        //     if (isBlank(this.selection)) {
        //         this.selection = this.noSelectionString;
        //     }
        // }
        if (isPresent(this.list) && this.list.length >= DropdownComponent.MaxNumShown) {
            this.internalList = this.list.slice(0, DropdownComponent.MaxNumShown).map((item) => {
                return { label: item.toString(), value: item };
            });
        }
        else if (isPresent(this.list)) {
            this.internalList = this.list.slice(0).map((item) => {
                return { label: item.toString(), value: item };
            });
        }
    }
    /**
     * @return {?}
     */
    hasEmbeddedTemplate() {
        return isPresent(this.itemTemplate);
    }
    /**
     * Check to prevent Empty item to be rendered
     *
     * todo: Report this on PrimeNg
     *
     * @param {?} item
     * @return {?}
     */
    itemExist(item) {
        return isPresent(item);
    }
    /**
     * When dropdown list is more then defined constant MaxNumShown (10) automatically show filter
     * input field
     * @return {?}
     */
    showFilter() {
        return false;
        // return isPresent(this.list) && this.list.length > DropdownComponent.MaxNumShown;
    }
    /**
     *
     * Updates internal models of current selections and triggers onSelection event
     *
     * @param {?} value
     * @return {?}
     */
    onItemSelection(value) {
        this.selection = value.value;
        this.onSelection.emit(value.value);
        if (this.isStandalone) {
            this.formControl.setValue(this.selection);
            this.formControl.markAsDirty({ onlySelf: true });
        }
        this.onModelChanged(value.value);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    displayItem(item) {
        return isPresent(item) ? item.label : 'No Selection';
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (!equals(value, this.selection)) {
            this.selection = value;
            this.formControl.setValue(value);
        }
    }
}
DropdownComponent.MaxNumShown = 10;
DropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dropdown',
                template: `<div class="w-dropdown" [formGroup]="formGroup">

    <ng-template [ngIf]="isStandalone">
        <p-dropdown [options]="internalList"
                    [formControlName]="name"
                    [placeholder]="noSelectionString"
                    [autoWidth]="false"
                    [filter]="showFilter()"
                    (onChange)="onItemSelection($event)">

            <ng-template let-item pTemplate="item">
                <ng-template [ngIf]="!hasEmbeddedTemplate() && itemExist(item)">
                    {{item.label }}
                </ng-template>

                <ng-template [embeddedItem]="itemTemplate" [item]="item"
                             *ngIf="hasEmbeddedTemplate() && itemExist(item)">

                </ng-template>
            </ng-template>


        </p-dropdown>
    </ng-template>
</div>


<!-- no formControl Name here. ngModel cannot have formGroup around -->
<ng-template [ngIf]="!isStandalone">
    <div class="w-dropdown">
        <p-dropdown [options]="internalList"
                    [(ngModel)]="selection"
                    [placeholder]="noSelectionString"
                    [autoWidth]="false"
                    [filter]="showFilter()"
                    (onChange)="onItemSelection($event)">

            <ng-template let-item pTemplate="item">

                <ng-template [ngIf]="!hasEmbeddedTemplate() && itemExist(item)">
                    {{item.label }}
                </ng-template>
                <ng-template [embeddedItem]="itemTemplate" [item]="item"
                             *ngIf="hasEmbeddedTemplate() && itemExist(item)">
                </ng-template>
            </ng-template>
        </p-dropdown>
    </div>
</ng-template>
`,
                styles: [`/deep/ .ui-dropdown-panel .ui-dropdown-items-wrapper{max-height:none!important}/deep/ .ui-dropdown-panel .ui-dropdown-item{padding:.65em 2em .65em .64em;margin:0}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container{width:100%}/deep/ .ui-dropdown-panel .ui-dropdown-filter-container .fa{top:1.2em}/deep/ .ui-dropdown-panel .ui-dropdown-list{padding:1em 0}/deep/ .w-dropdown:not(.ng-dirty) label{color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger.ui-corner-right{border-left:none;color:#969696}/deep/ .w-dropdown .ui-dropdown-trigger .pi{font-family:"SAP icon fonts";color:#767676;cursor:pointer;font-size:1.4em;margin-left:-.85em}/deep/ .w-dropdown .ui-dropdown-trigger .pi-caret-down:before{content:'\\e1ef'}/deep/ .w-dropdown .ui-dropdown-label{padding-right:2.4em}`],
                providers: [
                    DD_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => DropdownComponent) }
                ]
            },] },
];
/** @nocollapse */
DropdownComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
DropdownComponent.propDecorators = {
    list: [{ type: Input }],
    selection: [{ type: Input }],
    noSelectionString: [{ type: Input }],
    onSelection: [{ type: Output }],
    itemTemplate: [{ type: ContentChild, args: ['itemTemplate',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWDropdownModule {
}
AWDropdownModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DropdownComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    DropdownModule,
                    AWCoreComponentModule
                ],
                entryComponents: [
                    DropdownComponent
                ],
                exports: [
                    DropdownComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Lightweight and configurable Currency component based on the ng bootstrap directive. This
 * component combines an input and currency code dropdown.
 *
 *
 * for more info please see class Doc of the:
 * @see {\@link currency/currency.component.ts}
 *
 *  ### Example
 *  ```
 *
 * \@Component({
 *    selector: 'amount' ,
 *    template: `
 *
 *      <aw-currency [money]="price" [currencies]="currencies" [name]="'currency'">
 *      </aw-currency>
 *
 *    `
 *    })
 *    export class MyComponent
 *    {
 *        amount: number = 1000;
 *        currencies: string[] = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
 *        currencyCode: string = this.currencies[0];
 *
 *        constructor ()
 *        {
 *        }
 *    }
 */
const /** @type {?} */ CURRENCY_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyComponent),
    multi: true
};
class CurrencyComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Disable user to change Money's currency code and still
         * allow user to edit Money's amount.
         */
        this.readonlyCurrencyCode = false;
        // Initialize currencies.
        this.initCurrencies();
        this.currencyPipe = new CurrencyPipe(env.locale);
        env.onLocaleChange.subscribe((locale) => {
            this.currencyPipe = new CurrencyPipe(locale);
            if (isPresent(this.money)) {
                this.displayValue = this.formatCurrency(this.money.amount);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.money);
        this.initCurrencies();
        if (isBlank(this.currencySelection)) {
            this.currencySelection = this._currencies[0];
        }
        // ready the money field if it exists. and override the existing values.
        if (this.money) {
            this.currencySelection = this.money.currency;
        }
        else {
            this.money = new Money(null, this.currencySelection);
        }
        this.displayValue = this.formatCurrency(this.money.amount);
    }
    /**
     * @return {?}
     */
    initCurrencies() {
        if (!this._currencies || this._currencies.length === 0) {
            this._currencies = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
        }
    }
    /**
     * Display the real value when the user clicks in the currency widget. Then he can modify the
     * value without seeing the formatting.
     *
     * @param {?} el
     * @return {?}
     */
    onFocus(el) {
        if (isPresent(this.money) && isPresent(this.money.amount)) {
            this.displayValue = this.money.amount.toString();
        }
    }
    /**
     * display the formatted currency value when the user navigates away.
     * @param {?} el
     * @return {?}
     */
    onBlur(el) {
        this.money = this.money.clone({ amount: Number(el.value) });
        this.displayValue = this.formatCurrency(this.money.amount);
        this.onModelChanged(this.money);
    }
    /**
     * @param {?} currency
     * @return {?}
     */
    onSelection(currency) {
        this.currencySelection = currency;
        this.displayValue = this.formatCurrency(this.money.amount);
    }
    /**
     * Function will check to see if currency is a valid number before formatting.
     * @param {?} val
     * @return {?}
     */
    formatCurrency(val) {
        if (!val || val.length === 0) {
            return val;
        }
        if (isNaN(val)) {
            return val;
        }
        let /** @type {?} */ code = 'USD';
        if (this.currencySelection) {
            code = this.currencySelection;
        }
        this.money = this.money.clone({ currency: this.currencySelection });
        // By default, the precision is 2. For example, 10.23 USD.
        let /** @type {?} */ digits = '1.0-2';
        // If precision is present, use it for format the money value for display.
        if (isPresent(this.precision)) {
            digits = '1.0-' + this.precision;
        }
        return this.currencyPipe.transform(val, code, 'symbol', digits);
    }
    /**
     * @return {?}
     */
    getMoneyCurrency() {
        if (isPresent(this.displayValue) && this.displayValue.length > 0) {
            return this.currencySelection;
        }
        return '';
    }
    /**
     * @return {?}
     */
    get currencies() {
        return this._currencies;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currencies(value) {
        if (isPresent(value)) {
            this._currencies = value;
        }
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if ((value instanceof Money) && !equals(value, this.money)) {
            this.money = value;
            if (isPresent(this.money.currency)) {
                this.currencySelection = this.money.currency;
            }
            this.displayValue = this.formatCurrency(this.money.amount);
            this.formControl.setValue(this.money);
        }
    }
}
CurrencyComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-currency',
                template: `<ng-template [ngIf]="editable">
    <div class="w-currency-field ui-fluid" [formGroup]="formGroup">
        <div class="ui-g ">
            <div class="ui-g-8 ui-g-nopad ">
                <input #currencyInput
                       pInputText
                       type="text" class="w-text-field currency-format"
                       [attr.name]="name"
                       [attr.placeholder]="placeHolder"
                       [value]="displayValue"
                       (focus)="onFocus(currencyInput)"
                       (blur)="onBlur(currencyInput)"
                       [disabled]="disabled">
            </div>
            <div class="ui-g-4 ui-g-nopad w-cc-field">
                <aw-dropdown *ngIf="!readonlyCurrencyCode"
                             [isStandalone]="false" [list]="currencies"
                             [selection]="money.currency"
                             (onSelection)="onSelection($event)"
                             [disabled]="disabled">

                </aw-dropdown>
                <div *ngIf="readonlyCurrencyCode" class="w-cc-readonly-field">{{money.currency}}</div>
            </div>
        </div>
    </div>
</ng-template>

<!-- currency:'USD':true -->

<ng-template [ngIf]="!editable">
    <aw-string value="{{displayValue}} {{ getMoneyCurrency() }}"></aw-string>
</ng-template>
`,
                styles: [`.w-currency-field [readonly],.w-currency-type-field [readonly]{background-color:#fff}.w-currency-field input,.w-currency-type-field input{min-width:80px}.w-currency-field i.fa,.w-currency-type-field i.fa{cursor:pointer}.w-currency-field{margin-top:0}.w-currency-field /deep/ .ui-dropdown{min-width:80px}.w-cc-field{display:flex;align-items:center}.w-cc-readonly-field{padding-left:5px;color:#969696}.no-gutter>[class*=ui-g-]{padding-right:0;padding-left:0}`],
                providers: [
                    CURRENCY_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => CurrencyComponent) }
                ]
            },] },
];
/** @nocollapse */
CurrencyComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
CurrencyComponent.propDecorators = {
    money: [{ type: Input }],
    readonlyCurrencyCode: [{ type: Input }],
    currencySelection: [{ type: Input }],
    precision: [{ type: Input }],
    currencies: [{ type: Input }]
};
/**
 * Money object is represented as a value, locale, and currencyCode
 */
class Money {
    /**
     * @param {?=} amount
     * @param {?=} currency
     * @param {?=} locale
     */
    constructor(amount = 0, currency = 'USD', locale = 'en_US') {
        this.amount = amount;
        this.currency = currency;
        this.locale = locale;
    }
    /**
     * @return {?}
     */
    getTypes() {
        return {
            amount: Number,
            currency: String,
            locale: String
        };
    }
    /**
     * @return {?}
     */
    className() {
        return 'Money';
    }
    /**
     * @return {?}
     */
    $proto() {
        return new Money(1, '23', '33');
    }
    /**
     * @return {?}
     */
    toString() {
        return this.amount + ', locale: ' + this.locale + ', code:  ' + this.currency;
    }
    /**
     * @param {?=} data
     * @return {?}
     */
    clone(data = {}) {
        return new Money(isPresent(data.amount) ? data.amount : this.amount, isPresent(data.currency) ? data.currency : this.currency, isPresent(data.locale) ? data.locale : this.locale);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWCurrencyModule {
}
AWCurrencyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    CurrencyComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    InputTextModule$1,
                    DropdownModule,
                    AWDropdownModule,
                    AWStringFieldModule,
                    AWCoreComponentModule
                ],
                entryComponents: [
                    CurrencyComponent
                ],
                exports: [
                    CurrencyComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: [CurrencyPipe]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Lightweight and configurable Date and Time component based on the primeng. This
 * component combines both date picker as well as time picker
 *
 *
 *  ### Example
 *  ```
 *
 * \@Component({
 *    selector: 'myTimer' ,
 *    template: `
 *    <aw-date-time [value]="date" [editable]="editable"  [name]="'dueDate'">
 *    </aw-date-time>
 *
 *    `
 *    })
 *    export class MyTimmerComponet
 *    {
 *
 *        date: Date = new Date();
 *
 *
 *        constructor ()
 *        {
 *            this.date.setFullYear(2016 , 10 , 3);
 *            this.date.setHours(10 , 10 , 10);
 *        }
 *    }
 *
 * ```
 *
 * By default you will see date field and time field is hidden to show both you just do following:
 *
 *  ```
 *
 * \@Component({
 *    selector: 'myTimer' ,
 *    template: `
 *
 *    <aw-date-time [value]="date"  [showTime]="showTime" [editable]="editable"  [name]="'bbdd'">
 *    </aw-date-time>
 *
 *    `
 *    })
 *    export class MyTimmerComponet
 *    {
 *        date: Date = new Date();
 *        showTime = true;
 *
 *        constructor ()
 *        {
 *            this.date.setFullYear(2016 , 10 , 3);
 *            this.date.setHours(10 , 10 , 10);
 *        }
 *    }
 *
 * ```
 *
 *
 *
 */
const /** @type {?} */ DATETIME_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateAndTimeComponent),
    multi: true
};
class DateAndTimeComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Default date format pattern used if none is passed
         *
         */
        this.formatPattern = 'mm/dd/yy';
        /**
         * Special workaround as formatters in the primeNG and angular are different so until its
         * fixed we need to keep this extra pattern.
         */
        this.formatPatternNG = 'MM/dd/yy';
        /**
         * Shows and hides navigation bar with year and months selections
         */
        this.showNavigation = false;
        /**
         * Shows and hides navigation bar with year and months selections
         */
        this.showIcon = true;
        /**
         * Whether to show timepicker
         */
        this.showTime = false;
        /**
         * Whether to show DatePicker. Even we can hide it. it should be for most of the case always
         * true
         */
        this.showDate = true;
        /**
         *
         * Tells the date picker what format it should use when presenting time. When hourFormat is 12,
         * it shows the AM, PM
         *
         */
        this.hourFormat = '24';
        /**
         * Triggers event when specific date is clicked inside DatePicker
         *
         */
        this.onChange = new EventEmitter();
        /**
         * Set the date to highlight on first opening if the field is blank.
         *
         */
        this.defaultDate = new Date();
        this.timePlaceHolder = 'hh:ss';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.value);
        // default to dateTime pattern which is defined in resource files
        if (this.hourFormat !== '12' && this.hourFormat !== '24') {
            this.hourFormat = '24';
        }
        this.timePlaceHolder = (this.hourFormat === '12') ?
            ` ${DateAndTimeComponent.NgTime12}` : ` ${DateAndTimeComponent.NgTime24}`;
        this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe((val) => {
            this.value = val;
            this.onModelChanged(this.value);
        });
        this.initTranslations();
        this.env.onLocaleChange.subscribe((locale) => {
            this.initTranslations();
        });
    }
    /**
     * Need to refactor this as this really get complicated trying to cover usecase with time
     * and date and every format we have. We should probably have separate patterns for
     * dates only and date + time
     * @return {?}
     */
    initTranslations() {
        this.formatNameWithTime = this.formatPattern;
        if (!this.showDate) {
            this.formatPatternNG = this.formatPattern += (this.hourFormat === '12') ?
                ` ${DateAndTimeComponent.NgTime12}` : ` ${DateAndTimeComponent.NgTime24}`;
        }
        if (this.showTime) {
            let /** @type {?} */ timeStarts = this.formatPattern.indexOf('h');
            if (timeStarts !== -1) {
                this.formatNameWithTime = this.formatPattern.substring(0, timeStarts);
            }
            this.formatPatternNG += (this.hourFormat === '12') ?
                ` ${DateAndTimeComponent.NgTime12}` : ` ${DateAndTimeComponent.NgTime24}`;
        }
        this.i18n = {
            firstDayOfWeek: 0,
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
                'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
                'Nov', 'Dec']
        };
    }
    /**
     * Fired when dates changes. Here we update  this.value - > date and also update value inside
     * formController
     *
     * @param {?} event
     * @return {?}
     */
    onDateChange(event) {
        if (isBlank(event)) {
            // throw some error ?
            return;
        }
        this.value = isDate(event) ? event : new Date(event);
        this.formControl.setValue(this.value, { onlySelf: false, emitEvent: true });
        this.onModelChanged(this.value);
        this.onChange.emit(this.value);
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value);
        }
    }
}
DateAndTimeComponent.NgTime12 = 'hh:mm a';
DateAndTimeComponent.NgTime24 = 'HH.mm a';
DateAndTimeComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-date-time',
                template: `<ng-template [ngIf]="editable">

    <div class="w-datetime " [class.has-time]="showTime" [formGroup]="formGroup">

        <p-calendar formControlName="{{name}}"
                    [defaultDate]="defaultDate"
                    [showIcon]="showIcon"
                    dateFormat="{{showTime ? formatNameWithTime : formatPattern}}"
                    [yearNavigator]="showNavigation"
                    [monthNavigator]="showNavigation"
                    [yearRange]="yearRange"
                    placeholder="{{showTime ? formatNameWithTime.toUpperCase() : formatPattern.toUpperCase()}}"
                    (onSelect)="onDateChange($event)"
                    [timeOnly]="!showDate"
                    [readonlyInput]="true"
                    [locale]="i18n">
        </p-calendar>

        <p-calendar *ngIf="showTime"
                    icon="icon-history"
                    formControlName="{{name}}"
                    [hourFormat]="hourFormat"
                    [defaultDate]="defaultDate"
                    [showIcon]="showIcon"
                    [timeOnly]="showTime"
                    [showTime]="showTime"
                    [placeholder]="timePlaceHolder"
                    (onSelect)="onDateChange($event)"
                    [locale]="i18n">
        </p-calendar>

    </div>
</ng-template>

<ng-template [ngIf]="!editable">
    <aw-string value="{{value | date: formatPatternNG}}"></aw-string>
</ng-template>
`,
                styles: [`/deep/ .w-datetime .ui-calendar button{border:0;width:0}/deep/ .w-datetime .ui-calendar.ui-calendar-w-btn .ui-inputtext{width:100%}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left{font-family:"SAP icon fonts";color:#199de0;cursor:pointer;font-size:1.4em}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left.pi-calendar:before{content:'\\e0e0'}/deep/ .ui-calendar .ui-calendar-button .ui-button-icon-left.icon-history:before{content:'\\e02d'}/deep/ .ui-datepicker{width:24.28em;line-height:25px;padding:0;border-color:#979797;box-shadow:none}/deep/ .ui-datepicker .ui-datepicker-header{padding:.92em 0;font-weight:400;color:#000;font-size:1em}/deep/ .ui-datepicker .ui-datepicker-next,/deep/ .ui-datepicker .ui-datepicker-prev{top:1em}/deep/ .ui-datepicker .ui-datepicker-prev{left:.2em}/deep/ .ui-datepicker .ui-datepicker-next{right:.2em}/deep/ .ui-datepicker table{font-size:1em;margin:0 0 1.5em}/deep/ .ui-datepicker th{font-weight:400;background-color:#ececec;color:#363636;padding:.786em 1.07em}/deep/ .ui-datepicker td{padding:.1em}/deep/ .ui-datepicker td a{text-align:center;width:2.7em;height:2.7em;line-height:2.7em;padding:0;border-radius:50%}/deep/ .ui-datepicker td a.ui-state-default{border-color:transparent}/deep/ .ui-datepicker td a.ui-state-active{background-color:#199de0;color:#fff}/deep/ .ui-datepicker .pi{font-size:1em}/deep/ .ui-datepicker .pi.pi-chevron-left:before{content:'\\e1ee'}/deep/ .ui-datepicker .pi.pi-chevron-right:before{content:'\\e1ed'}/deep/ .ui-datepicker .ui-datepicker-calendar td:not(.ui-state-disabled) a:hover{border-color:transparent;background-color:rgba(25,157,224,.7);opacity:.75;color:#363636}/deep/ .ui-datepicker-timeonly{width:100%}/deep/ .ui-timepicker{font-size:1.14em;color:#767676;font-weight:400}/deep/ .ui-timepicker .pi{font-size:1em}/deep/ .ui-timepicker .pi.pi-chevron-up:before{content:'\\e1f0'}/deep/ .ui-timepicker .pi.pi-chevron-down:before{content:'\\e1ef'}/deep/ .ui-timepicker>div{margin-left:0}/deep/ .ui-timepicker .ui-separator{width:.1em;min-width:.1em}/deep/ .ui-timepicker .ui-separator .pi{font-size:0}/deep/ .ui-datepicker-trigger{background-color:transparent}/deep/ .ui-datepicker-trigger.ui-button:enabled:hover,/deep/ .ui-datepicker-trigger.ui-button:focus{background-color:transparent}/deep/ .has-time{display:flex;flex-wrap:nowrap}/deep/ .has-time p-calendar:first-child{width:55%;margin-right:14px}/deep/ .has-time p-calendar:last-child{width:45%}/deep/ .has-time p-calendar:last-child .ui-datepicker{padding:0}/deep/ .has-time .ui-button-icon-left{line-height:18px}`],
                providers: [
                    DATETIME_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => DateAndTimeComponent) }
                ]
            },] },
];
/** @nocollapse */
DateAndTimeComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
DateAndTimeComponent.propDecorators = {
    value: [{ type: Input }],
    formatPattern: [{ type: Input }],
    formatPatternNG: [{ type: Input }],
    showNavigation: [{ type: Input }],
    yearRange: [{ type: Input }],
    showIcon: [{ type: Input }],
    showTime: [{ type: Input }],
    showDate: [{ type: Input }],
    hourFormat: [{ type: Input }],
    onChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWDateAndTimeModule {
}
AWDateAndTimeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DateAndTimeComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    CalendarModule,
                    AWStringFieldModule
                ],
                entryComponents: [
                    DateAndTimeComponent
                ],
                exports: [
                    DateAndTimeComponent,
                    ReactiveFormsModule,
                    FormsModule
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * An dialog header area.
 *
 * See {\@link DialogComponent} for more explanation.
 */
class DialogHeaderComponent {
}
DialogHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dialog-header',
                template: '<ng-content></ng-content>'
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * An dialog header area.
 *
 * See {\@link DialogComponent} for more explanation.
 */
class DialogFooterComponent {
}
DialogFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dialog-footer',
                template: '<ng-content></ng-content>'
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Dialog Component that provides the look and feel for a modal dialog. This component has three
 * sections: header, body, and footer. It can be used by itself or extended.
 *
 * There are three types of popup.
 *   1.  a regular dialog box that has header, body and footer. It's the most customizable.
 *   2.  a confirmation box is similar to a dialog box but has accept and reject action buttons.
 *   3.  a overlay, which is a very basic popup with what you put inside.
 *       It doesn't have header and footer.
 *
 * There are two ways to use any popup component.
 *   1.  Either directly by using component, aw-dialog, aw-confirmation or aw-overlay
 *   2.  or the ModalService  service.open(<DialogComponent>), service.close()
 *
 * Usage:
 *    1.  Using Dialog directly to display a modal popup. This usage is a quick way to show a
 * message to the user.
 *
 *             this.modalService.open<DialogComponent>( DialogComponent, {
 *                     title: 'My Popup Title',
 *                     body: 'My Popup Body'
 *              });
 *
 *
 *   2.   Use the component inside your template.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                              <aw-dialog [(visible)]="display" [modal]="true"
 *                                        (onOpen)="openAction()" (onClose)="closeAction()">
 *
 *                                    <aw-dialog-header>Dialog Header</aw-dialog-header>
 *
 *                                     Dialog Body: Creating a dialog using the dialog component
 *
 *                                    <aw-dialog-footer>
 *                                      <aw-button [size]="'small'" [style]="'primary'"
 *                                                 (click)="close()">OK</aw-button>
 *                                    </aw-dialog-footer>
 *                              </aw-dialog>
 *
 *                          <aw-button [size]="'small'" (click)="open()">Open Dialog</aw-button>
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     display: boolean = false;
 *
 *                     dialogAction: string;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *
 *                     open() {
 *                        this.display = true;
 *                     }
 *
 *                     openAction()  {
 *                        this.dialogAction = "open";
 *                      }
 *       }
 *
 *
 */
class DialogComponent extends ModalContainer {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * support two way data binding on visible property.
         */
        this.visibleChange = new EventEmitter();
        /**
         * whether this dialog blocks the rest of the page or not when displayed.
         */
        this.modal = true;
        /**
         * Whether there's an x at the top right that makes the dialog closable.
         */
        this.closable = true;
        /**
         * Event fired when dialog is closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Event fired when the dialog is opened.
         */
        this.onOpen = new EventEmitter();
        this.width = 300;
        this.height = 'auto';
    }
    /**
     * Open this dialog.
     * @return {?}
     */
    open() {
        this.visible = true;
        this.onOpen.emit();
        // visible is a 2-way binding variable.
        this.visibleChange.emit(true);
    }
    /**
     * close the dialog
     * @return {?}
     */
    close() {
        this.visible = false;
        this.onClose.emit();
        // Important to make sure change is set on parent binding.
        // Otherwise, the variable and dialog open/close state can be out
        // of sync and we wouldn't trigger change detection.
        this.visibleChange.emit(false);
    }
    /**
     * Does this dialog have header.
     *
     * @return {?}
     */
    hasHeader() {
        return isPresent(this.header);
    }
    /**
     * Does this dialog have footer.
     *
     * @return {?}
     */
    hasFooter() {
        return isPresent(this.footer);
    }
}
DialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dialog',
                template: `<p-dialog [header]="title" [(visible)]="visible"
          [modal]="modal" [closable]="closable" [width]="width" [height]="height"
          [styleClass]="styleClass" [appendTo]="appendTo" (onShow)="open()" (onHide)="close()">

    <p-header *ngIf="hasHeader()">
        <ng-content select="aw-dialog-header"></ng-content>
    </p-header>

    {{body}}
    <ng-content></ng-content>

    <p-footer *ngIf="hasFooter()">
        <div class="dialog-footer-separator"></div>
        <ng-content select="aw-dialog-footer"></ng-content>
    </p-footer>
</p-dialog>
`,
                styles: [`::ng-deep .ui-dialog .ui-dialog-titlebar{background-color:#f2f2f2;padding:15px 20px}::ng-deep .ui-dialog .ui-dialog-titlebar .ui-dialog-titlebar-icon:hover{border-color:transparent}::ng-deep .ui-widget-header{font-weight:400;font-size:16px}::ng-deep .ui-dialog .ui-dialog-content{padding:15px 20px;line-height:1.3em}::ng-deep .ui-dialog .ui-widget-content{border:none}::ng-deep .ui-dialog.ui-widget-content{border:none;box-shadow:0 2px 10px 0 rgba(0,0,0,.3)}::ng-deep .ui-dialog .dialog-footer-separator{border-top:1px solid #d7d7d7;height:14px}::ng-deep .ui-dialog .ui-dialog-footer{padding:0 20px 15px}`]
            },] },
];
/** @nocollapse */
DialogComponent.ctorParameters = () => [
    { type: Environment }
];
DialogComponent.propDecorators = {
    title: [{ type: Input }],
    body: [{ type: Input }],
    visibleChange: [{ type: Output }],
    modal: [{ type: Input }],
    closable: [{ type: Input }],
    appendTo: [{ type: Input }],
    onClose: [{ type: Output }],
    onOpen: [{ type: Output }],
    header: [{ type: ContentChild, args: [DialogHeaderComponent,] }],
    footer: [{ type: ContentChild, args: [DialogFooterComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWDialogModule {
}
AWDialogModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DialogComponent,
                    DialogHeaderComponent,
                    DialogFooterComponent
                ],
                imports: [
                    CommonModule,
                    AWCoreComponentModule,
                    DialogModule
                ],
                entryComponents: [
                    ModalComponent,
                    DialogComponent,
                    DialogHeaderComponent,
                    DialogFooterComponent
                ],
                exports: [
                    DialogComponent,
                    DialogHeaderComponent,
                    DialogFooterComponent,
                    AWCoreComponentModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Convenient wrapper class around controls such as radiobuttons, dropdown, checkboxes,
 * Chooser. The type of the chooser may be determined dynamically based on the number of items in
 * the data source list, or can be specified explicitly via the "type" binding.
 *
 *
 *
 */
class GenericChooserComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} _viewContainer
     * @param {?} dataSource
     * @param {?} parentContainer
     */
    constructor(env, _viewContainer, dataSource, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this._viewContainer = _viewContainer;
        this.dataSource = dataSource;
        this.parentContainer = parentContainer;
        /**
         *  Is this a List property, or a to-one.
         */
        this.multiselect = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.object)) {
            this.object = (/** @type {?} */ (this._viewContainer.injector)).view.context;
        }
        this.keyPath = new FieldPath(this.key);
        let /** @type {?} */ defaultDataProvider = null;
        if (isPresent(this.list)) {
            defaultDataProvider = this.dataSource.dataProviders.find(this.list);
        }
        else {
            defaultDataProvider = this.dataSource.dataProviders.find(this.destinationClass);
        }
        let /** @type {?} */ projectedSize = defaultDataProvider.expectedCount(this.choiceProviderParams);
        this.initType(projectedSize);
        if (this.type === 'Chooser') {
            this.dataSource.init({
                dataProvider: defaultDataProvider,
                queryType: QueryType.FullText,
                lookupKey: this.displayKey,
                state: new ChooserState(new GCChooserState(this), this.multiselect),
                multiselect: this.multiselect
            });
        }
        else {
            // do we need to read this value in async?
            this.list = defaultDataProvider.data();
        }
        super.registerFormControl(this.selection);
        this.validateRequired();
        if (isBlank(this.selection)) {
            // this.noSelectionString = this.i18n.instant('Widgets.gchooser.noSelString');
            this.noSelectionString = 'Select a Item';
        }
    }
    /**
     *
     * When \@Input type is not passed we try to guess and select the best type for current data
     *
     * @param {?} projectedSize
     * @return {?}
     */
    initType(projectedSize) {
        if (isBlank(this.type)) {
            if (this.multiselect) {
                this.type = (projectedSize <= 0 || projectedSize > 8) ? 'Chooser' : 'Checkbox';
            }
            else {
                this.type = (projectedSize <= 0 || projectedSize > 20) ? 'Chooser'
                    : (projectedSize < 6) ? 'Radio' :
                        'Dropdown';
            }
        }
    }
    /**
     * There are certain properties which are required by this component. As already mentioned
     * above GenericChooser works with references and thefore two key properties are object and key
     * so we can access an object
     *
     *
     * @return {?}
     */
    validateRequired() {
        if (isBlank(this.object)) {
            throw Error('Cannot continue without a object');
        }
        if (isBlank(this.key)) {
            throw Error('Cannot continue without a key binding');
        }
        if (isBlank(this.list) && isBlank(this.destinationClass)) {
            throw Error('Cannot continue without having either list of values or destinationClass');
        }
        if (isPresent(this.type) &&
            (this.type !== 'Radio' && this.type !== 'Checkbox' && this.type !== 'Dropdown' &&
                this.type !== 'Chooser')) {
            throw Error('Cannot instantiate GenericChooser  - invalid type');
        }
        if (isBlank(this.displayKey)) {
            this.displayKey = 'toString';
        }
    }
    /**
     *
     * Used when displaying value both from primitive type as well complex object. If you want to
     * control how item is displayed you can provide display key, which is can be a  method or
     * property of the object you are displaying.
     *
     * Todo: think about formatters as well
     *
     * @param {?} item
     * @return {?}
     */
    displayValue(item) {
        if (isBlank(this.displayKey)) {
            return item;
        }
        let /** @type {?} */ fieldValue = FieldPath.getFieldValue(item, this.displayKey);
        if (isFunction(fieldValue)) {
            return fieldValue.call(item);
        }
        return fieldValue;
    }
    /**
     *  Retrieve a current value from the parent/target object
     *
     * @return {?}
     */
    get selection() {
        return this.keyPath.getFieldValue(this.object);
    }
    /**
     *  set value back to the object
     *
     * @param {?} value
     * @return {?}
     */
    set selection(value) {
        this.keyPath.setFieldValue(this.object, value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onSelection(value) {
        this.selection = value;
        this.formControl.setValue(this.selection);
        this.formControl.markAsDirty();
    }
}
GenericChooserComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-generic-chooser',
                template: `<ng-container [ngSwitch]="type">

    <ng-template [ngSwitchCase]="'Checkbox'">
        <aw-checkbox-list [list]="list"
                          [editable]="editable"
                          [selections]="selection"
                          [name]="name"
                          [disabled]="disabled"
                          [labelFormatter]="displayValue"
                          (onSelection)="onSelection($event)">
        </aw-checkbox-list>
    </ng-template>


    <ng-template [ngSwitchCase]="'Radio'">
        <aw-radiobutton-list [list]="list"
                             [selection]="selection"
                             [editable]="editable"
                             [name]="name"
                             [disabled]="disabled"
                             [labelFormatter]="displayValue"
                             (onSelection)="onSelection($event)">
        </aw-radiobutton-list>
    </ng-template>

    <ng-template [ngSwitchCase]="'Dropdown'">
        <aw-dropdown [list]="list"
                     [isStandalone]="false"
                     [editable]="editable"
                     [noSelectionString]="noSelectionString"
                     [selection]="selection"
                     [disabled]="disabled"
                     [name]="name"
                     (onSelection)="onSelection($event)">
            <ng-template #itemTemplate let-item>

                <!-- todo: allow to pass a PIPE to do some additional formatting -->
                {{ displayValue(item.value) }}
            </ng-template>
        </aw-dropdown>
    </ng-template>


    <ng-template [ngSwitchCase]="'Chooser'">
        <aw-chooser #chooser
                    [editable]="editable"
                    [isStandalone]="false"
                    [name]="name"
                    [multiselect]="multiselect"
                    [dataSource]="dataSource"
                    [valueTransformer]="displayValue"
                    [disabled]="disabled">

        </aw-chooser>

    </ng-template>

</ng-container>
`,
                styles: [``],
                providers: [
                    { provide: BaseFormComponent, useExisting: forwardRef(() => GenericChooserComponent) },
                    { provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders] }
                ]
            },] },
];
/** @nocollapse */
GenericChooserComponent.ctorParameters = () => [
    { type: Environment },
    { type: ViewContainerRef },
    { type: ChooserDataSource, decorators: [{ type: Inject, args: [DATA_SOURCE,] }] },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
GenericChooserComponent.propDecorators = {
    list: [{ type: Input }],
    object: [{ type: Input }],
    key: [{ type: Input }],
    destinationClass: [{ type: Input }],
    choiceProviderParams: [{ type: Input }],
    multiselect: [{ type: Input }],
    type: [{ type: Input }],
    displayKey: [{ type: Input }],
    noSelectionString: [{ type: Input }]
};
/**
 * GenericChooser implementation of the ChooserSelectionState which is used when Type = Chooser.
 *
 */
class GCChooserState extends ChooserSelectionState {
    /**
     * @param {?} gChooser
     */
    constructor(gChooser) {
        super();
        this.gChooser = gChooser;
    }
    /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    setSelectionState(selection, selected) {
        if (selected === this.isSelected(selection)) {
            return;
        }
        if (this.gChooser.multiselect) {
            // Check if we can implement smarter and more generic way how we use it in java
            // RelationshipField.addTo(_object, _keyPath, selection);
            let /** @type {?} */ multiRel = this.gChooser.keyPath.getFieldValue(this.gChooser.object);
            if (isBlank(multiRel)) {
                multiRel = [];
            }
            else if (isPresent(multiRel) && !isArray(multiRel)) {
                throw new Error('I can not store multiselect value into non-array object');
            }
            if (selected) {
                multiRel.push(selection);
                this.gChooser.selection = multiRel;
            }
            else {
                ListWrapper.removeIfExist(multiRel, selection);
            }
        }
        else {
            if (!selection) {
                selection = null;
            }
            this.gChooser.selection = selection;
        }
    }
    /**
     * @return {?}
     */
    selectedObject() {
        if (this.gChooser.multiselect) {
            let /** @type {?} */ objects = this.selectedObjects();
            return (isBlank(objects) || ListWrapper.isEmpty(objects)) ? null : ListWrapper.last(objects);
        }
        return this.gChooser.selection;
    }
    /**
     * @return {?}
     */
    selectedObjects() {
        let /** @type {?} */ selection = this.gChooser.selection;
        if (this.gChooser.multiselect && isBlank(selection)) {
            selection = [];
        }
        return (this.gChooser.multiselect && isArray(selection)) ? selection : [selection];
    }
    /**
     * @param {?} selection
     * @return {?}
     */
    isSelected(selection) {
        if (this.gChooser.multiselect) {
            return ListWrapper.containsComplex(this.selectedObjects(), selection);
        }
        let /** @type {?} */ curValue = this.selectedObject();
        return equals(curValue, selection);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Wrapper class for RadioButton component providing convenient way to to render RadioButton Groups
 *
 *
 * ### Example
 *
 *
 * ```
 * \@Component({
 *          selector: 'gender-selector' ,
 *          template: `
 *              <aw-radiobutton-list [list]="rbListValues" [layout]="layout"
 *     [selection]="selectedValue" [name]="'name'">
 *               </aw-radiobutton-list>
 *      `
 *      })
 *      export class GenderSelectorComponent
 *      {
 *          rbListValues: string[] = ['male' , 'female' , 'other'];
 *          selectedValue: string = 'other';
 *          layout: string = 'stacked';
 *
 *
 *          formGroup: FormGroup = new FormGroup({});
 *
 *
 *          onCBClick (event): void
 *          {
 *              console.log('onCBClick = ' + event);
 *          }
 *
 *      }
 *
 * ```
 */
const /** @type {?} */ RB_LIST_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonListComponent),
    multi: true
};
class RadioButtonListComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * Fires an event when radio button is selected
         *
         */
        this.onSelection = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isPresent(this.selection)) {
            this.model = 0;
        }
        this.updateModel(this.selection);
        this.onModelChanged(this.selection);
        this.registerFormControl(this.selection);
    }
    /**
     * Label is extracted into a method so in the future we can play how we want to display the
     * value. Since I want to support formatters for each components we might have a chance to
     * decide how the label will look like.
     *
     * @param {?} item
     * @return {?}
     */
    labelValue(item) {
        if (isPresent(this.labelFormatter)) {
            return this.labelFormatter(item);
        }
        return item.toString();
    }
    /**
     * In this version of checkboxes we still expect only primitive types. Keep this functionality
     * in extra method so we can work with it even now we just return the same value back
     *
     *
     * @param {?} item
     * @return {?}
     */
    value(item) {
        return item;
    }
    /**
     *
     * On NGModel change retrieve actual record based on the INDEX and propagate it to both
     * ngModel as well as FormGroup.
     *
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        let /** @type {?} */ updatedModel = this.list[this.model];
        this.onSelection.emit(updatedModel);
        this.onModelChanged(updatedModel);
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
    }
    /**
     * Since we might be dealing with complex object store only INDEX number in the model.
     *
     * @param {?} souceItem
     * @return {?}
     */
    updateModel(souceItem) {
        let /** @type {?} */ index = this.list.findIndex((elem) => {
            return souceItem === elem;
        });
        this.model = index === -1 ? 0 : index;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        let /** @type {?} */ updatedModel = this.list[this.model];
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
        // this.cd.detectChanges();
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.value) {
            let /** @type {?} */ newModel = value;
            this.updateModel(newModel);
        }
    }
}
RadioButtonListComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-radiobutton-list',
                template: `<div *ngFor="let item of list;  let i = index" class="ui-g">

    <div class="ui-g-12">
        <aw-radiobutton
            [(ngModel)]="model"
            (ngModelChange)="onChange($event)"
            [isStandalone]="false"
            [name]="name"
            [value]="i"
            [label]="labelValue(item)">
        </aw-radiobutton>
    </div>

</div>
`,
                styles: [``],
                providers: [
                    RB_LIST_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => RadioButtonListComponent) }
                ]
            },] },
];
/** @nocollapse */
RadioButtonListComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
RadioButtonListComponent.propDecorators = {
    list: [{ type: Input }],
    selection: [{ type: Input }],
    labelFormatter: [{ type: Input }],
    onSelection: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Implements standard HTML radio button on top of PrimeNG with ariba styling
 *
 * ### Example
 *
 * 1. Basic usage using ngModel pre-selected first radio
 *
 *  ```ts
 *
 * \@Component({
 *          selector: 'demo-comp',
 *          template: `
 *              <aw-radiobutton [name]="'color'" [value]="'red'" [label]="'Red'"
 *                             [(ngModel)]="model">
 *             </aw-radiobutton>
 *              <aw-radiobutton [name]="'color'" [value]="'blue'" [label]="'Blue'"
 *                      [(ngModel)]="model">
 *              </aw-radiobutton>
 *      `
 *      })*
 *      class BasicWithNgModelComponent
 *      {
 *          model: string[] = ['red'];
 *
 *          constructor()
 *          {
 *          }
 *      }
 *
 *  ```
 *
 *
 * 2. Basic usage with formGroup
 *
 *
 * ```ts
 * \@Component({
 *           selector: 'demo-comp',
 *           template: `
 *          <div [formGroup]="env.currentForm">
 *               <aw-radiobutton [name]="'color2'" [value]="'red'" [label]="'Red'"
 *               (onChange)="onChange($event)">
 *               </aw-radiobutton>
 *               <aw-radiobutton [name]="'color2'" [value]="'blue'" [label]="'Blue'"
 *               (onChange)="onChange($event)">
 *               </aw-radiobutton>
 *
 *       </div>
 *       `
 *       })
 *       class BasicWithFormGroupComponent implements OnInit
 *       {
 *           model: string = 'blue';
 *
 *           constructor(public env: Environment)
 *           {
 *           }
 *
 *           ngOnInit(): void
 *           {
 *               this.env.currentForm = new FormGroup({});
 *               this.env.currentForm.registerControl('color2', new FormControl(this.model));
 *           }
 *
 *
 *           onChange(event: any): void
 *           {
 *               this.modelSet = event;
 *           }
 *
 *       }
 *  ````
 *
 *
 *
 *
 */
const /** @type {?} */ RAB_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
};
class RadioButtonComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * A value associated with this radio
         *
         */
        this.value = '';
        /**
         * Trigger click event with currrent selected value
         *
         */
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.isStandalone) {
            super.registerFormControl(this.value);
            this.model = this.formControl.value;
            this.onModelChanged(this.model);
        }
        else {
            this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
        }
    }
    /**
     * Called when radio is clicked. Not using PrimeNG click event as it is fired before
     * the model is changed. Therefore need to listen on (ngModelChange)
     *
     * @param {?} newVal
     * @return {?}
     */
    onModelChange(newVal) {
        this.onModelChanged(this.model);
        if (this.isStandalone) {
            this.formControl.setValue(this.model, { emitEvent: true });
        }
        this.onChange.emit(this.model);
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.model) {
            this.model = value;
            if (this.isStandalone) {
                this.formControl.setValue(this.model, { emitEvent: true });
            }
            this.onModelChanged(this.model);
        }
    }
}
RadioButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-radiobutton',
                template: `<span class="w-radiobutton">

    <ng-template [ngIf]="editable ">
        <p-radioButton [name]="name"
                       [value]="value"
                       [label]="label"
                       [(ngModel)]="model"
                       [disabled]="disabled"
                       (ngModelChange)="onModelChange($event)"
                       [class.u-validation-error]="!(formControl.valid || (formControl.pristine))">
        </p-radioButton>
    </ng-template>
</span>
`,
                styles: [`/deep/ .w-radiobutton .ui-radiobutton-box{width:23px;height:23px;line-height:23px}/deep/ .w-radiobutton .ui-radiobutton-icon{font-size:1.5em;line-height:1em}`],
                providers: [
                    RAB_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => RadioButtonComponent) }
                ]
            },] },
];
/** @nocollapse */
RadioButtonComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
RadioButtonComponent.propDecorators = {
    value: [{ type: Input }],
    label: [{ type: Input }],
    onChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWRadioButtonModule {
}
AWRadioButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    RadioButtonComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    RadioButtonModule
                ],
                entryComponents: [
                    RadioButtonComponent
                ],
                exports: [
                    RadioButtonComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWRadioButtonListModule {
}
AWRadioButtonListModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    RadioButtonListComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    AWRadioButtonModule
                ],
                entryComponents: [
                    RadioButtonListComponent
                ],
                exports: [
                    RadioButtonListComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWGenericChooserModule {
}
AWGenericChooserModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GenericChooserComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    AWCoreComponentModule,
                    AWDropdownModule,
                    AWCheckBoxListModule,
                    AWChooserModule,
                    AWRadioButtonListModule
                ],
                entryComponents: [
                    GenericChooserComponent
                ],
                exports: [
                    ReactiveFormsModule,
                    FormsModule,
                    GenericChooserComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * OutlineState is the key gluing part for the OutlineFor and OutlineController components. It
 * holds all important information for the current outline tree and manages expansion states in form
 * of so called expansionPath and expansionStates
 *
 * We need to have a way how to work with generic data structure in order not to hold UI specific
 * information on the domain object model just like we had it before, where we had an interface
 * called OutlineNode, with fields (expanded, selected, etc.. )
 *
 *
 * `expansionPath`: Holds an array of currently selected and expanded nodes. This is filled by
 * OutlineController.
 *
 *
 * If we are dealing with Entity or anything that has identity then we have easier situation as we
 * can ask for ID and it is more efficient for serialization
 */
class OutlineState {
    constructor() {
        /**
         *
         * When outline is rendered for first time or re-rendered and we set default value for the
         * expansionStates. This way we can pretty easily execute CollapseAll, ExpandAll
         *
         */
        this.globalState = false;
        /**
         *
         * Holds current level during tree node rendering so we can apply correct indentation
         *
         */
        this.currentLevel = -1;
        this.expansionStates = new Map();
    }
    /**
     * For the collapseAll and expandAll we are using simple mechanism where we clean up all
     * selection and then set the global expand state, this whey isExpand method returns the same
     * state for all items
     * @return {?}
     */
    collapseAll() {
        this.expansionStates.clear();
        this.globalState = false;
    }
    /**
     * @return {?}
     */
    expandAll() {
        this.expansionStates.clear();
        this.globalState = true;
    }
    /**
     * @return {?}
     */
    get expansionPath() {
        if (isBlank(this._expansionPath)) {
            this._expansionPath = [];
        }
        return this._expansionPath;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expansionPath(value) {
        this._expansionPath = value;
        if (isBlank(this._expansionPath)) {
            return;
        }
        this._expansionPath.forEach((item) => {
            this.setExpansionState(item, true);
        });
    }
    /**
     * @param {?} currentPath
     * @param {?=} chidren
     * @return {?}
     */
    toggleExpansion(currentPath, chidren) {
        if (isBlank(currentPath)) {
            return;
        }
        let /** @type {?} */ item = ListWrapper.last(currentPath);
        let /** @type {?} */ itemChildren = chidren || [];
        let /** @type {?} */ newState = !this.isExpanded(item);
        this.setExpansionState(item, newState);
        if (!newState) {
            ListWrapper.removeLast(currentPath);
            itemChildren.forEach((child) => {
                this.setExpansionState(child, newState);
            });
        }
        this.setExpansionPath(currentPath);
    }
    /**
     * @param {?} item
     * @param {?} isExpanded
     * @return {?}
     */
    setExpansionState(item, isExpanded) {
        let /** @type {?} */ key = this.itemToKey(item);
        if (isExpanded === this.globalState) {
            this.expansionStates.delete(key);
        }
        else {
            this.expansionStates.set(key, (isExpanded) ? true : false);
        }
    }
    /**
     * To improve state persisting lets check if we are dealing with an Object that has Identity
     * so we can extract an ID otherwise use object to compare by reference
     *
     *
     * @param {?} item
     * @return {?}
     */
    itemToKey(item) {
        return isEntity(item) ? (/** @type {?} */ (item)).identity() : item;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    setExpansionPath(item) {
        this.expansionPath = item;
        item.forEach((node) => {
            this.setExpansionState(node, true);
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isExpanded(item) {
        let /** @type {?} */ key = this.itemToKey(item);
        if (!this.expansionStates.has(key)) {
            return this.globalState;
        }
        return this.expansionStates.get(key);
    }
}
OutlineState.decorators = [
    { type: Injectable },
];
/** @nocollapse */
OutlineState.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * OutlineForComponent is like ngFor, but for hierarchical (outline/tree) structures -- i.e. in
 * those cases where an item may have children.
 *
 *
 * It uses outline `<aw-outline-control>` to provide expanding functionality, indentation
 * and other things.
 *
 *
 * This component has minimal styling to make sure it can be changed easily.
 *
 * ### Example rendering tree section, where based on the type we format the out plus
 * for the main root section we always render little popup menu.
 *
 * ```
 *
 *   <aw-outline-for [list]="list" [hasChildren]="hasChildren">
 *
 *       <ng-template #outline let-item>
 *
 *           <div class="my-section">
 *               <div class="outline">
 *                   <aw-outline-control>
 *                       <ng-container [ngSwitch]="item.type">
 *                           <ng-template [ngSwitchCase]="'text'">
 *                               <div class="as-paragraf">
 *                                   {{item?.content}}
 *                               </div>
 *                           </ng-template>
 *
 *
 *                           <ng-template ngSwitchDefault>
 *                               {{item?.content}}
 *                           </ng-template>
 *
 *
 *                       </ng-container>
 *
 *
 *                   </aw-outline-control>
 *               </div>
 *
 *               <div class="filters" *ngIf="item.type === 'section'" >
 *
 *                   <aw-hover-card [linkTitle]="'Filter Items'">
 *                       <aw-list [list]="filterItems" [borderless]="true"></aw-list>
 *                   </aw-hover-card>
 *
 *               </div>
 *           </div>
 *     </ng-template>`
 *   </aw-outline-for>
 *
 * ```
 *
 *
 * We can use it also in embedded mode where we use the `awOutlineFor` directive
 *
 * ## Example
 *
 *
 * ````
 *  <table  class="tree-table" >
 *      <thead>
 *          <tr>
 *              <th>Name</th>
 *              <th>Type</th>
 *          </tr>
 *      </thead>
 *      <tbody #ooo2 awOutlineFor [list]="list"
 *             [hasChildren]="hasChildren"
 *             class="outline-table"
 *      >
 *          <ng-template #outline let-item>
 *              <tr>
 *                  <td class="item-name outline-animation">
 *                      <div><aw-outline-control>
 *                          {{item?.content}}
 *                      </aw-outline-control></div>
 *                  </td>
 *                  <td class="item-type outline-animation">
 *                      <div>{{item.type}}</div>
 *                  </td>
 *              </tr>
 *          </ng-template>
 *      </tbody>
 *  </table>
 *
 * ```
 *
 * I was thinking maybe for first time we don't need the same animation like expanding and
 * collapsing. Maybe we need fade-in. In such case I would probably apply \@section anim only
 * on items where level > 0 (in the template I keep levels) and if level == 0 then I would
 * execute the same rendering just without [\@section]
 *
 *
 * Todo: Think about how to do animation for the table case. Must also write unitest - due to
 * AribaLive aggressive schedule we are skipping them for now
 *
 */
class OutlineForComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} _viewContainer
     * @param {?} builder
     * @param {?} element
     */
    constructor(env, _viewContainer, builder, element) {
        super(env);
        this.env = env;
        this._viewContainer = _viewContainer;
        this.builder = builder;
        this.element = element;
        /**
         * Tells the component not to render expansion control, in such case we expandAll as a
         * default behavior
         *
         */
        this.showExpansionControl = true;
        /**
         * Opens all tree nodes.
         *
         */
        this.expandAll = false;
        /**
         *
         * Set indentation size to be used for each level
         *
         */
        this.indentationPerLevel = 25;
        this.pushRootSectionOnNewLine = false;
        /**
         *
         * Used when in selection mode to push current selected Item to the application
         *
         */
        this.onItemSelected = new EventEmitter();
        /**
         *
         * This event is triggered by OutlineControl when node is expanded or collapsed
         *
         */
        this.onExpandChange = new EventEmitter();
        this.embedded = false;
        /**
         * Flag that tells us that component is fully rendered
         *
         */
        this.viewInitialized = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.state)) {
            this.state = new OutlineState();
        }
        if (isBlank(this.state.outlineFor)) {
            this.state.outlineFor = this;
        }
        if (this.expandAll) {
            this.showExpansionControl = false;
        }
        this.state.globalState = this.expandAll;
        // in case we want to render content of tree outside of outlineFor
        if (isPresent(this.externalTemplate)) {
            this.controlTemplate = this.externalTemplate;
        }
        this.embedded = this.element.nativeElement.hasAttribute('awoutlinefor');
        if (isBlank(this.context)) {
            this.context = this;
        }
        // // when root section needs to be on new line, then automatically expand second level
        // if (this.pushRootSectionOnNewLine) {
        //     this.list.forEach((item: any) => {
        //         let currentItem = ListWrapper.last(this.state.currentPath);
        //         this.state.toggleExpansion(item);
        //     })
        // }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        super.ngDoCheck();
    }
    /**
     * Used by template and OutlineControl to identify which item is expanded and collapsed
     *
     * @param {?} item
     * @param {?=} currentLevel
     * @return {?}
     */
    isExpanded(item, currentLevel = -1) {
        return (currentLevel === 0 && this.pushRootSectionOnNewLine)
            ? true : this.state.isExpanded(item);
    }
    /**
     *
     * Since we have currently two ways how to pass children items we need have this method to
     * unify the way how we access it. If we pass `children` binding we use this instead, otherwise
     * we expect current object to have `children` field
     *
     * @param {?} item
     * @return {?}
     */
    childrenForItem(item) {
        return this.hasChildren(item) ? this.doGetChildren(item) : [];
    }
    /**
     *
     * Check if the current item has a children and needs to be rendered
     *
     * @param {?} item
     * @return {?}
     */
    hasChildren(item) {
        if (isBlank(this.children) && isBlank(item.children)) {
            assert(false, 'Missing [children] method binding');
        }
        return this.doGetChildren(item).length > 0;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    doGetChildren(item) {
        return this.children.apply(this.context, [item]);
    }
    /**
     *  Uses the `OutlineState` to toggle state of current selectionPath. The `selectionPath` is
     *  put together inside `OutlineControl` where we iterate all the way to the root and add
     *  each item to the `currentPath` array. This way we collect list of item representing current
     *  current expansionPath.
     *
     *
     * @return {?}
     */
    toggleExpansion() {
        if (this.animationInProgress) {
            // backup procedure in case onAnimationDone fails
            setTimeout(() => {
                if (this.animationInProgress) {
                    // change only if its fails
                    this.animationInProgress = false;
                }
            }, 200);
            return;
        }
        if (!this.embedded) {
            this.animationInProgress = true;
        }
        let /** @type {?} */ currentItem = ListWrapper.last(this.state.currentPath);
        this.state.toggleExpansion(this.state.currentPath, this.childrenForItem(currentItem));
        if (this.embedded) ;
    }
    /**
     * Angular anim. callback that sets back the flag to make sure we don't trigger animations
     * when one is in progress.
     *
     * @param {?} event
     * @return {?}
     */
    onAnimationDone(event) {
        this.animationInProgress = false;
    }
    /**
     * Calculated indentation used to shift the nested section to the right or later on to the
     * left when RTL is supported
     *
     *
     * @param {?} currentLevel
     * @return {?}
     */
    indentation(currentLevel) {
        if (this.pushRootSectionOnNewLine && currentLevel > 0) {
            currentLevel -= 1;
        }
        return (currentLevel === 0 && this.pushRootSectionOnNewLine)
            ? 0 : (this.indentationPerLevel * currentLevel);
    }
    /**
     * Not all rows are visible by default, there can be a case where you dont want to render items
     * using outline. e.g. Datatable with detail row.
     * @param {?} item
     * @return {?}
     */
    isVisible(item) {
        if (isPresent(this.filterOut)) {
            return !this.filterOut(item);
        }
        return true;
    }
}
OutlineForComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-outline-for, [awOutlineFor]',
                template: `<!--
    Starts with the list, where nestingLevel is -1.
    call template outlineItems to iterate and render each item
-->
<ng-container [ngIf]="list" *ngTemplateOutlet="outlineItems;
            context:{ $implicit: list, nestingLevel: 0, parentItem: null, expanded: true}">
</ng-container>

<!--
    Main Entry point for the recursion. this is called by the block above as well as byt the inner
    piece that calls this template recursively again when an item has children
-->
<ng-template #outlineItems let-children let-nestingLevel="nestingLevel"
             let-parent="parentItem" let-expanded="expanded">

    <ng-template ngFor let-item [ngForOf]="children"  let-rowIndex="index">

        <ng-container *ngTemplateOutlet="outlineItem;
            context:{ $implicit: item, nestingLevel: nestingLevel, parentItem: parent,
            expanded: expanded, rowIndex:rowIndex}">
        </ng-container>

        <!--

            Recursion piece:

            For non embedded case when even if its not expanded we need to iterate children
            as we want to apply animation that should go with ngIf which inside the outineItem
            template

            Dont recurse/ render items that are not visible.
        -->

        <ng-template [ngIf]="hasChildren(item) && (isExpanded(item, nestingLevel) || !embedded) && isVisible(item)">
            <ng-container *ngTemplateOutlet="outlineItems;
                        context:{ $implicit: childrenForItem(item),
                                nestingLevel: nestingLevel+1,
                                expanded: isExpanded(item, nestingLevel),
                                parentItem:item }">
            </ng-container>
        </ng-template>
    </ng-template>
</ng-template>


<!--
    Renders actual outline node and applies animation while expanding and collapsing

    [@section]="expanded || isExpanded(item) ? 'visible' : 'hidden'"
-->
<ng-template #outlineItem let-item let-nestingLevel="nestingLevel" let-parent="parentItem"
             let-rowIndex="rowIndex"
             let-expanded="expanded">

    <div class="w-outline-item"
         *ngIf="!embedded && expanded"
         [style.padding-left.px]="indentation(nestingLevel)"
         initNesting [setLevel]="nestingLevel" [setParentItem]="parent"
         [setCurrrentItem]="item"
         [@section]
         (@section.done)="onAnimationDone($event)">

        <ng-container *ngTemplateOutlet="controlTemplate;
                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex }">
        </ng-container>
    </div>

    <!--
        When outline control is used as embedded meaning its inside e..g datatable we
        cannot have any tags around it.

        Todo: Refactor this in the way so we can do animation when table lines are
        expanded. Since its embedded we can not have any wrapping element around, the template
        is fully responsible
    -->
    <ng-template [ngIf]="embedded && expanded"
                 initNesting [setLevel]="nestingLevel" [setParentItem]="parent"
                 [setCurrrentItem]="item"
    >
        <ng-container #renderedItem *ngTemplateOutlet="controlTemplate;
                        context:{ $implicit: item, nestingLevel: nestingLevel, rowIndex:rowIndex  }">
        </ng-container>
    </ng-template>

</ng-template>


`,
                styles: [`.is-outline-animation>div,::ng-deep .w-outline-item{overflow:hidden}`],
                animations: [
                    trigger('section', [
                        state('*', style({
                            'overflow-y': 'hidden',
                            'height': '*',
                            'opacity': '1'
                        })),
                        state('void', style({
                            'height': '0',
                            'opacity': '0',
                            'overflow-y': 'hidden'
                        })),
                        transition('* => void', animate('200ms ease-out')),
                        transition('void => *', animate('200ms ease-in'))
                    ]),
                ]
            },] },
];
/** @nocollapse */
OutlineForComponent.ctorParameters = () => [
    { type: Environment },
    { type: ViewContainerRef },
    { type: AnimationBuilder },
    { type: ElementRef }
];
OutlineForComponent.propDecorators = {
    list: [{ type: Input }],
    showExpansionControl: [{ type: Input }],
    children: [{ type: Input }],
    filterOut: [{ type: Input }],
    expandAll: [{ type: Input }],
    state: [{ type: Input }],
    indentationPerLevel: [{ type: Input }],
    externalTemplate: [{ type: Input }],
    context: [{ type: Input }],
    pushRootSectionOnNewLine: [{ type: Input }],
    onItemSelected: [{ type: Output }],
    onExpandChange: [{ type: Output }],
    controlTemplate: [{ type: ContentChild, args: ['outline',] }],
    outlineItem: [{ type: ViewChild, args: ['renderedItem',] }]
};
/**
 *
 * Since we can not directly set `*ngTemplateOutlet` context variables to the typescript class we
 * use this directive to do the Job
 *
 */
class InitNestingDirective {
    /**
     * @param {?} outline
     */
    constructor(outline) {
        this.outline = outline;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPresent(this.setLevel)) {
            this.outline.state.currentLevel = this.setLevel;
        }
        if (isPresent(this.setCurrrentItem)) {
            this.outline.currentItem = this.setCurrrentItem;
        }
        if (isPresent(this.setParentItem)) {
            this.outline.currentItem['$$parentItem'] = this.setParentItem;
        }
    }
}
InitNestingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[initNesting]'
            },] },
];
/** @nocollapse */
InitNestingDirective.ctorParameters = () => [
    { type: OutlineForComponent }
];
InitNestingDirective.propDecorators = {
    setLevel: [{ type: Input }],
    setCurrrentItem: [{ type: Input }],
    setParentItem: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * OutlineControlComponent renders the indentation, arrow, and text for a node in an outline.
 * It should be used either in the body of an OutlineFor component, or inside datatable
 *
 *
 * ##Usage inside body:
 *
 *  Here you can see that we need to wrap out content inside ng-template which will push us
 *  give us current item item and then we can place OutlineControlComponent to control
 *  the tree.
 *
 * ```
 *  <aw-outline-for2 #ooo [list]="list" [hasChildren]="hasChildren">
 *
 *      <ng-template #outline let-item>
 *          <div class="my-section">
 *              <div class="outline">
 *                  <aw-outline-control>
 *                      {{item?.content}}
 *                  </aw-outline-control>
 *              </div>*
 *          </div>
 *      </ng-template>
 *  </aw-outline-for2>
 *
 *
 * ```
 *
 * We can
 *
 *
 */
class OutlineControlComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} outlineState
     * @param {?} parentControl
     * @param {?} outlineFor
     */
    constructor(env, outlineState, parentControl, outlineFor) {
        super(env);
        this.env = env;
        this.outlineState = outlineState;
        this.parentControl = parentControl;
        this.outlineFor = outlineFor;
        /**
         *
         *  If TRUE it changes the behavior of the outline node text which click is triggered
         *  it selects the item and broadcast the `onItemSelected` event
         *
         */
        this.allowSelection = false;
        /**
         *
         * Triggers action when outline item is expanded
         *
         */
        this.action = new EventEmitter();
        this.isRootItem = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.prepareControl();
    }
    /**
     *
     * We dont show expansion icons when there no children
     *
     * @return {?}
     */
    hasExpansionControl() {
        return this.outlineFor.hasChildren(this.item) && this.outlineFor.showExpansionControl;
    }
    /**
     * @return {?}
     */
    isSelected() {
        return this.outlineFor.state.selectedItem === this.item;
    }
    /**
     * @return {?}
     */
    calculateStyleClass() {
        if (!this.hasExpansionControl() ||
            (this.outlineFor.pushRootSectionOnNewLine && isBlank(this.item.$$parentItem))) {
            return '';
        }
        if (this.outlineFor.embedded) {
            return this.outlineFor.isExpanded(this.item) ? 'icon-slim-arrow-down'
                : 'icon-slim-arrow-right';
        }
        else {
            return this.outlineFor.isExpanded(this.item)
                ? 'icon-slim-arrow-right outline-icon-expanded' : 'icon-slim-arrow-right';
        }
    }
    /**
     * Collapses and expands current node
     *
     * @param {?} event
     * @return {?}
     */
    toggleExpansion(event) {
        this.outlineFor.state.currentPath = [];
        let /** @type {?} */ currentPath = this.item;
        while (isPresent(currentPath)) {
            this.outlineFor.state.currentPath.unshift(currentPath);
            currentPath = currentPath.$$parentItem;
        }
        this.outlineFor.toggleExpansion();
        let /** @type {?} */ payload = {
            item: this.item,
            expanded: this.outlineFor.state.isExpanded(this.item)
        };
        this.action.emit(payload);
        this.outlineFor.onExpandChange.emit(payload);
        event.stopPropagation();
    }
    /**
     * @return {?}
     */
    select() {
        this.outlineFor.state.selectedItem = this.item;
        this.outlineFor.onItemSelected.emit(this.item);
    }
    /**
     * @return {?}
     */
    prepareControl() {
        if (isBlank(this.outlineFor) && isPresent(this.outlineState)) {
            this.outlineFor = this.outlineState.outlineFor;
        }
        assert(isPresent(this.outlineFor), 'Missing outlineFor component');
        if (this.outlineFor.embedded) {
            let /** @type {?} */ level = this.outlineFor.state.currentLevel;
            if (this.outlineFor.pushRootSectionOnNewLine && level > 0) {
                level -= 1;
            }
            this.indentation = (this.outlineFor.indentationPerLevel * level);
        }
        this.item = this.outlineFor.currentItem;
        this.isRootItem = isBlank(this.item.$$parentItem);
    }
}
OutlineControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-outline-control',
                template: `<!--
    Control is just the two flex box items for displaying expand/collapse icon and content

    Since we animate only standalone/non-embedded case now then we need to also animate the icon
    so we use only icon-slim-arrow-right and do tranformation on top of this to make it rotate.

    If embedded case we use both icons icon-slim-arrow-right / icon-slim-arrow-down
-->
<div class="w-outline-control"
     [ngClass]="{'outline-u-unselectable-text': outlineFor.pushRootSectionOnNewLine && !item.$$parentItem}">
    <div class="outline-icon sap-icon"
         *ngIf="!outlineFor.pushRootSectionOnNewLine || !isRootItem"
         (click)="toggleExpansion($event)"
         [style.margin-left.px]="indentation"
         [ngClass]="calculateStyleClass()">
    </div>

    <ng-container *ngIf="allowSelection; then withSelection else withoutSelection">
    </ng-container>
</div>

<!--
 We support two case for the content

 Selection: When you click on the content it will add extra class so you can style currently
 selected item as well as broadcast event outside so developer can hook in some custom logic

 If we dont support selection: Then clicking on the content is just like clicking on expandable
 icon, it toggles the state
-->

<ng-template #withSelection>
     <span class="outline-content outline-content-selected" *ngIf="isSelected()">
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
    </span>
    <span class="outline-content" *ngIf="!isSelected()" (click)="select()">
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
    </span>

</ng-template>


<ng-template #withoutSelection>
    <span class="outline-content" (click)="toggleExpansion($event)">
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
    </span>
</ng-template>


<ng-template #ngContent>
    <ng-content></ng-content>
</ng-template>

`,
                styles: [`.w-outline-control{overflow:hidden;display:flex;flex-wrap:nowrap;cursor:pointer}.w-outline-control .outline-icon{flex:0 0 15px;color:#ababab;font-size:14px;font-weight:700;min-width:11px;align-self:center;transition:-webkit-transform 50ms ease-in;transition:transform 50ms ease-in;transition:transform 50ms ease-in,-webkit-transform 50ms ease-in;-webkit-transform-origin:25% 65%;transform-origin:25% 65%;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.w-outline-control .outline-icon.outline-icon-expanded{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.w-outline-control .outline-content{flex:1 1 auto;flex-wrap:wrap;padding:0 4px}.w-outline-control .outline-content.outline-content-selected{cursor:default;font-weight:700}.outline-u-unselectable-text{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none;cursor:auto}`],
            },] },
];
/** @nocollapse */
OutlineControlComponent.ctorParameters = () => [
    { type: Environment },
    { type: OutlineState, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => OutlineState),] }] },
    { type: OutlineControlComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => OutlineControlComponent),] }] },
    { type: OutlineForComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => OutlineForComponent),] }] }
];
OutlineControlComponent.propDecorators = {
    title: [{ type: Input }],
    allowSelection: [{ type: Input }],
    action: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWOutlineForModule {
}
AWOutlineForModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    OutlineForComponent,
                    OutlineControlComponent,
                    InitNestingDirective
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    AWCoreComponentModule
                ],
                exports: [
                    OutlineForComponent,
                    OutlineControlComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Renders html text area component
 *
 * ### Example
 *
 * ```typescript
 *
 * \@Component({
 *          selector: 'myNote' ,
 *          template: '<aw-text-area [value]="inputValue" [autoResize]="autoResize" >
 *              </aw-text-area>'
 *      })
 *      export class MyNoteComponent
 *      {
 *          inputValue: string = 'Some really long text';
 *          autoResize: false;
 *      }
 *
 * ```
 *  Note: if you are using this outside of FormTable please provide your own FormGroup
 */
const /** @type {?} */ TEXTAREA_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaComponent),
    multi: true
};
class TextAreaComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * A value used to store and read user input
         *
         */
        this.value = '';
        /**
         * Spefifies visible number of lines
         */
        this.rows = 2;
        /**
         * Specifies visible width
         */
        this.columns = 20;
        /**
         * when this option is TRUE and user starts typing it will maximize textarea's width and height
         */
        this.autoResize = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.value);
        this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe(val => {
            this.value = val;
            this.onModelChanged(this.value);
        });
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value, { onlySelf: true });
        }
    }
}
TextAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-text-area',
                template: `<div *ngIf="editable" [formGroup]="formGroup">

	<textarea
        pInputTextarea
        [attr.name]="name"
        class="w-text-area"
        [class.u-validation-error]="!(formControl.valid || (formControl.pristine))"
        [class.disabled]="disabled"
        formControlName="{{name}}"
        [rows]="rows"
        [cols]="columns"
        [autoResize]="autoResize"
        [attr.placeholder]="placeHolder"

    ></textarea>

</div>


<ng-template [ngIf]="!editable">
    <aw-string [value]="value"></aw-string>
</ng-template>
`,
                styles: [``],
                providers: [
                    TEXTAREA_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => TextAreaComponent) }
                ]
            },] },
];
/** @nocollapse */
TextAreaComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
TextAreaComponent.propDecorators = {
    value: [{ type: Input }],
    rows: [{ type: Input }],
    columns: [{ type: Input }],
    autoResize: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWTextAreaModule {
}
AWTextAreaModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TextAreaComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    InputTextareaModule,
                    AWStringFieldModule
                ],
                entryComponents: [
                    TextAreaComponent
                ],
                exports: [
                    TextAreaComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Page-Notification component that implements a notification system for the user regarding
 * the current object he's working on. Typical notification are:
 *      Success - saved.
 *      Warning - Sourcing request requires 3 suppliers.
 *      Error   - cannot connect to server, check internet connection.
 *
 *
 *
 * Usage 1:  As part of page wrapper.
 *
 * \@Component({
 *    selector: 'MyPage' ,
 *    template: `
 *       <aw-object-page-wrapper
 *                        [title]="MyPage"
 *                        [objectType]="MyType"
 *                        [notification]="pageNotification">
 *             page content
 *          `
 *       </aw-object-pager-wrapper>
 *    })
 *    export class MyPage
 *    {
 *
 *        pageNotification: PageNotification = new PageNotification("warn",
 *                              "Policy Warning", "This request requires 3 bids.");
 *
 *        constructor ()
 *        {
 *        }
 *    }
 *
 * Usage 2: directly into the page.
 *
 * \@Component({
 *    selector: 'registration' ,
 *    template: `
 *      <
 *      aw-header></aw-header>
 *        Page Header
 *
 *        <ng-template [ngIf]="hasNotifications()">
 *          <div class="ui-g-12 u-nopadding">
 *            <aw-page-notification [notification]="notification"></aw-page-notification>
 *          </div>
 *        </ng-template>
 *
 *      <aw-footer></aw-footer>
 *    `
 *    })
 *    export class MyPage
 *    {
 *
 *        notification: PageNotification = new PageNotification("warning",
 *                              "Policy Warning", "This request requires 3 bids.");
 *
 *        constructor ()
 *        {
 *        }
 *    }
 *
 */
class PageNotificationComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
    }
    /**
     * @return {?}
     */
    notificationClass() {
        return `notification-${this.notification.type}`;
    }
    /**
     * @return {?}
     */
    notificationIcon() {
        return `ariba-icon icon-${this.notification.type}`;
    }
}
PageNotificationComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-page-notification',
                template: `<div class="page-notification">
    <div [class]="notificationClass()">
        <i [class]="notificationIcon()"></i>
        <span class="content">
              <span class="title">{{notification.title}}</span>
              <span class="description">
                    <ng-template *ngIf="notification.hasTemplate(); else description"
                                 [ngTemplateOutlet]="notification.contentTmpl">
                    </ng-template>
                    <ng-template #description>{{notification.description}}</ng-template>
              </span>
      </span>
    </div>
</div>
`,
                styles: [`.page-notification{margin:0 0 5px}.notification-error,.notification-info,.notification-success,.notification-warning{padding:9px 8px}.notification-error i,.notification-info i,.notification-success i,.notification-warning i{font-size:24px;margin:10px}.notification-success i{color:#58b957}.notification-info i{color:#199de0}.notification-warning i{color:#f90}.notification-error i{color:#c00}.notification-success{background-color:#f1f9f1;border:1px solid rgba(88,185,87,.5)}.notification-info{background-color:#edf8fd;border:1px solid rgba(25,157,224,.5)}.notification-warning{background-color:#fff8dd;border:1px solid rgba(255,153,0,.5)}.notification-error{background-color:#ffebeb;border:1px solid rgba(204,0,0,.5)}.icon-error:before{content:"\\EA9D"}.icon-warning:before{content:"\\EA9C"}.content{vertical-align:super}.title{font-weight:700;margin-right:10px}`]
            },] },
];
/** @nocollapse */
PageNotificationComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
PageNotificationComponent.propDecorators = {
    notification: [{ type: Input }]
};
/**
 * Page Notification are messages for this page only. It displays in the center of the page
 * right under page title. Typical page notifications are 'save confirmation',
 * 'error during submit', warnings of field requirements, etc.
 */
class PageNotification {
    /**
     * @param {?} type
     * @param {?} title
     * @param {?} description
     * @param {?=} contentTmpl
     */
    constructor(type, title, description, contentTmpl) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.contentTmpl = contentTmpl;
    }
    /**
     * @return {?}
     */
    hasTemplate() {
        return isPresent(this.contentTmpl);
    }
    /**
     * @return {?}
     */
    toString() {
        return this.type + ', title: ' + this.title + ', description:  ' + this.description;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWPageNotificationModule {
}
AWPageNotificationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    PageNotificationComponent
                ],
                imports: [
                    CommonModule
                ],
                entryComponents: [
                    PageNotificationComponent
                ],
                exports: [
                    PageNotificationComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Represents an event triggered when a page has been initialized.
 *
 */
class PageInitialized {
    /**
     * @param {?} title
     */
    constructor(title) {
        this.title = title;
    }
    /**
     * @return {?}
     */
    toString() {
        return `PageInitializied(title: ${this.title})`;
    }
}
/**
 * Represents an event triggered when a page has been destroyed.
 *
 */
class PageDestroyed {
    /**
     * @param {?} title
     */
    constructor(title) {
        this.title = title;
    }
    /**
     * @return {?}
     */
    toString() {
        return `PageDestroyed(title: ${this.title})`;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Page LifeCycle Service monitors all page initialization and destructions.
 * The purpose of this service is to help the application monitor page lifecycle, subscribe
 * to lifecycle events and execute actions such as user analytics.
 *
 * Usage:
 *
 *    1.  Inject PageLifeCycleService into your constructor
 *
 *    constructor(pageLifecycle:PageLifeCycleService) {
 *        pageLifecycle.pageEvents.subscribe(event:Event => {
 *            if(event instanceof PageInitialized) {
 *            }
 *            // PageDestroyed
 *
 *        });
 *     }
 */
class PageLifeCycleService {
    /**
     *
     */
    constructor() {
        /**
         * Page event queue when all page lifecycle events: init, destroy are emitted.
         * Listeners can subscribe to these events.
         */
        this.pageEvents = new Subject();
    }
    /**
     * Called when page is initialized.
     * @param {?} pageTitle
     * @return {?}
     */
    onPageInit(pageTitle) {
        this.pageEvents.next(new PageInitialized(pageTitle));
    }
    /**
     * Call when page has been destroyed
     * @param {?} pageTitle
     * @return {?}
     */
    onPageDestroy(pageTitle) {
        this.pageEvents.next(new PageDestroyed(pageTitle));
    }
}
PageLifeCycleService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PageLifeCycleService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const PageType = {
    Init: 0,
    // Init Page type
    Login: 1,
    // Login Page
    Object: 2,
    // Object detail page
    List: 3,
    // List Page
    MasterDetail: 4,
    // MasterDetail
    Dashboard: 5,
    // Dashboard page
    Modal: 6,
};
PageType[PageType.Init] = "Init";
PageType[PageType.Login] = "Login";
PageType[PageType.Object] = "Object";
PageType[PageType.List] = "List";
PageType[PageType.MasterDetail] = "MasterDetail";
PageType[PageType.Dashboard] = "Dashboard";
PageType[PageType.Modal] = "Modal";
/**
 *  Page wrapper is the base class for all pages. The idea is that there are different page types
 *  in an Application. A List Page renders a list of objects, ex: customers, requests, PO.  And
 *  a object page will render one object in detail.
 *
 *  They share common attributes such as page type and page id.
 *
 *  Ariba Page have a life cycle. When page starts up, it's initialized. And when the page is
 *  destroyed, it'll be complete.
 * @abstract
 */
class PageWrapper extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} pageType
     * @param {?} componentRegistry
     * @param {?} pageLifecycleService
     */
    constructor(env, pageType, componentRegistry, pageLifecycleService) {
        super(env);
        this.env = env;
        this.componentRegistry = componentRegistry;
        this.pageLifecycleService = pageLifecycleService;
        /**
         * What type of page this is.
         *
         */
        this.pageType = PageType.Init;
        this.pageType = pageType;
    }
    /**
     * Get the unique Id for this page.
     *
     * @return {?}
     */
    getId() {
        if (this.id) {
            return this.id;
        }
        this.id = this.generatePageId();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *  This is a temporary implementation for the page header component.
 *  When the real implementation of side menu is done, PageHeaderComponent will
 *  be swaped to use it.
 *
 */
class SidenavComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
    }
    /**
     * @return {?}
     */
    getSidenavClass() {
        // Only show if I have items
        return (this.show && this.items) ? 'sidenav sidenav-active' : 'sidenav';
    }
    /**
     * @return {?}
     */
    open() {
        this.show = true;
    }
    /**
     * @return {?}
     */
    close() {
        this.show = false;
    }
    /**
     * @return {?}
     */
    toggle() {
        this.show = !this.show;
    }
}
SidenavComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-sidenav',
                template: `<div [ngClass]="getSidenavClass()">
    <div class="sidenav-content">
        <a *ngFor="let item of items" [routerLink]="item.link">
            <span class="sidenav-icon"><i [ngClass]="'sap-icon ' + item.icon"></i></span>
            {{item.label}}
        </a>
    </div>
</div>
`,
                styles: [`.sidenav{height:100%;width:0;position:fixed;z-index:1;top:50px;left:0;background-color:#363636;overflow-x:hidden;padding-top:20px;transition:.5s}.sidenav-active{width:250px}.sidenav a{padding:8px 8px 8px 32px;text-decoration:none;font-size:16px;color:#fff;display:block;transition:.3s}.sidenav a:hover{background-color:#111}.sidenav-icon{font-size:30px;color:#ccc;margin-right:10px}`]
            },] },
];
/** @nocollapse */
SidenavComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
SidenavComponent.propDecorators = {
    items: [{ type: Input }],
    show: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Header component that implements consistent styling, behavior for an Ariba page.
 * Header includes a menu, user profile, and alerts.
 *
 * \@Component({
 *    selector: 'registration' ,
 *    template: `
 *                <aw-page-header [showBackAction]="true" userName="Chad Noll"
 *                                 [menuItems]="menuItems" [notifications]="userNotifications">
 *                     <div class="page-header-center">
 *                           <a class="navbar-brand" tabindex="0" href="/">
 *                               <img class="navbar-logo" src="./images/SAP_Ariba_DB.png"
 *                                   alt="Go to homepage" data-pin-nopin="true">
 *                          </a>
 *                     </div>
 *                </aw-page-header>
 *
 *    `
 *    })
 *    export class MyPage
 *    {
 *      menuItems: PageMenuItem[] = [new PageMenuItem('icon-home', 'Home', '/play/'),
 *                                  new PageMenuItem('icon-expense-report', 'Reports',
 *                                                     '/play/pageheader'),
 *                                  new PageMenuItem('icon-sales-order', 'Purchase Order',
 *                                                       '/play/pageheader'),
 *                                  new PageMenuItem('icon-account', 'Accounts',
 *                                                     '/play/pageheader')];
 *
 *     userNotifications: UserNotification[] = [
 *       new UserNotification('icon-expense-report', 'Expense report EXP453 has been approved.',
 *                             '/play/'),
 *         new UserNotification('icon-sales-order', 'Sales Order SO1234 has been created.',
 *                             '/play/'),
 *           new UserNotification('icon-account', 'Supplier account SA1234 has been updated.',
 *                               '/play/')
 *        ];
 *
 *        constructor ()
 *        {
 *        }
 *
 *    }
 */
class PageHeaderComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     * @param {?} routing
     */
    constructor(element, env, routing) {
        super(env);
        this.element = element;
        this.env = env;
        this.routing = routing;
        /**
         * Should the user notification icon be hidden. Default it to show the icon even
         * if there's no notifications.
         *
         */
        this.hideNotification = false;
        /**
         * displays the back link that navigates user to the previous page when clicked.
         */
        this.showBackAction = false;
        this.showNotificationPanel = false;
    }
    /**
     * @return {?}
     */
    backAction() {
        this.routing.goBack();
    }
    /**
     * Do i have any menu items.
     *
     * @return {?}
     */
    hasMenuItems() {
        return (this.menuItems && this.menuItems.length > 0);
    }
    /**
     * Toggle the side navigation menu.
     * @return {?}
     */
    showHideMenu() {
        this.sidenav.toggle();
    }
    /**
     * Do I have any notifications.
     *
     * @return {?}
     */
    hasNotifications() {
        return isPresent(this.notifications) && this.notifications.length > 0;
    }
    /**
     * toggling wheather notification panel is displayed or not.
     * @return {?}
     */
    toggleNotificationPanel() {
        this.showNotificationPanel = !this.showNotificationPanel;
    }
}
PageHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-page-header',
                template: `<nav class="navbar page-header" role="navigation">

    <div class="ui-g">
        <div class="ui-g-12 ui-md-4 navbar-left">

        <span *ngIf="hasMenuItems()">
            <a (click)="showHideMenu()">
                <i class="sap-icon icon-paging"></i>
            </a>

            <!-- Side menu -->
            <aw-sidenav #sidemenu [items]="menuItems"></aw-sidenav>
        </span>
            <!-- End Hamburger menu. -->

            <!--  back action -->
            <span class="back-action">
            <a (click)="backAction()">
                <i *ngIf="showBackAction" class="sap-icon icon-arrow-left" role="button"></i>
            </a>
        </span>

        </div>

        <div class="ui-g-12 ui-md-4 navbar-center">

            <!-- central section.  Application can add Ariba-logo, search box, etc -->
            <ng-content select=".page-header-center"></ng-content>
        </div>

        <div class="ui-g-12 ui-md-4 navbar-right">
        <span *ngIf="userName">
            <img id="userProfilePicture" class="profile-logo" aria-hidden="true"
                 [title]="userName" src="{{assetFolder}}/images/default_image_small.png">
            <span class="profile-user" title="{{userName}}">{{userName}}</span>
        </span>

            <span *ngIf="!hideNotification" class="notification-container">

            <i #notificationIcon class="ariba-icon icon-notification"
               (click)="toggleNotificationPanel()"></i>
            <span *ngIf="hasNotifications()" class="notification-badge" aria-hidden="true">{{notifications.length}}</span>

                <!-- Originally I was using p-overlay-panel, however, it doesn't position correctly under the notification icon.
                     The positioning logic in prime ng needs some more investigation. So for now, use a div instead-->
            <div *ngIf="showNotificationPanel" class="notification-panel">

                <div class="notification-header">
                     Notifications
                </div>

                <ul class="notification-content">
                    <li *ngFor="let noti of notifications" class="notification-item">
                        <a [routerLink]="noti.link">
                            <span class="notification-item-icon"><i
                                [ngClass]="'sap-icon ' + noti.icon"></i></span>
                            {{noti.label}}
                        </a>
                    </li>
                </ul>
            </div>
        </span>
        </div>


    </div>
</nav>
`,
                styles: [`.page-header i{font-size:32px}.page-header .icon-paging{font-size:30px;position:relative;top:2px}.back-action{display:inline-block;margin-left:15px}.back-action i{position:relative;top:3px}.navbar{background:#000;color:#fff}.navbar-left{padding-left:15px;height:50px}.navbar-center{text-align:center;height:50px}.navbar-right{text-align:right;height:50px}.profile-logo{width:30px;height:30px;position:relative;top:2px}.profile-user{vertical-align:super;margin-right:30px}.icon-notification:before{content:"\\eA14"}.navbar #sidebar-menu-icon{position:relative;top:.5em}.notification-container{position:relative;margin-right:20px;display:inline-block}.notification-badge{display:inline-block;padding:2px 5px;font-size:12px;font-weight:700;color:#fff;background-color:#c00;border-radius:10px;position:absolute;top:0;left:16px}.notification-panel{position:absolute;right:-27px;top:45px;width:350px;color:#767676;box-shadow:0 2px 10px 0 rgba(0,0,0,.13);background-color:#fff;overflow:hidden;transition:all .3s ease-in-out}.notification-panel .notification-header{background-color:#f3f3f3;font-size:16px;height:50px;line-height:50px;text-align:center}.notification-panel .notification-content{padding:0;margin:0}.notification-panel .notification-item{height:50px;border-top:1px solid #d7d7d7;padding:15px 10px;white-space:nowrap;text-overflow:ellipsis}.notification-panel .notification-item a{color:#767676;text-decoration:none;line-height:35px}.notification-panel .notification-item:hover{background-color:#f7f8fa}.notification-panel .notification-item-icon{margin-right:15px;color:#767676;display:inline-block;margin-top:10px;vertical-align:middle}`]
            },] },
];
/** @nocollapse */
PageHeaderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment },
    { type: RoutingService }
];
PageHeaderComponent.propDecorators = {
    menuItems: [{ type: Input }],
    notifications: [{ type: Input }],
    hideNotification: [{ type: Input }],
    showBackAction: [{ type: Input }],
    userName: [{ type: Input }],
    sidenav: [{ type: ViewChild, args: ['sidemenu',] }]
};
/**
 * PageMenuItem represents an item in the page menu structure.
 */
class PageMenuItem {
    /**
     * @param {?} icon    - Icon of this menu item.
     * @param {?} label   - label of this item.
     * @param {?} link    - link to the destination when user clicks on it.
     */
    constructor(icon, label, link) {
        this.icon = icon;
        this.label = label;
        this.link = link;
    }
    /**
     * @return {?}
     */
    toString() {
        return `PageMenuItem: (label, ${this.label})`;
    }
}
/**
 * notification for the current logged in user.
 * Ex:  PR2049 has been approved.
 *      Order PO518 received.
 */
class UserNotification {
    /**
     * @param {?} icon   - alert notification icon
     * @param {?} label  - alert notification label
     * @param {?} link   - link
     */
    constructor(icon, label, link) {
        this.icon = icon;
        this.label = label;
        this.link = link;
    }
    /**
     * @return {?}
     */
    toString() {
        return `PageUserNotification: (label, ${this.label})`;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Footer component that implements consistent styling, behavior.
 * This footer component self contained.
 *
 * \@Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *          <aw-page-footer>
 *               <div class="page-footer-logo">
 *                   <img src="images/ariba_logo_white_bkgd.png">
 *               </div>
 *               <div class="page-footer-user-info">
 *                   Chad Noll (cnoll) last visit {{last_visited | date:'MM/dd/yyyy h:mma' }}
 *                   | Buyer Organization
 *               </div>
 *               <span class="page-footer-copyright" #copyright>
 *                   <p>© 2020–2028 The Future, Inc. All rights reserved</p>
 *               </span>
 *           </aw-page-footer>
 *    `
 *    })
 *    export class MyPage
 *    {
 *        constructor ()
 *        {
 *        }
 *
 *    }
 */
class PageFooterComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
        /**
         * show default copyright. If copyright is passed in, then show the passed in one.
         */
        this.showDefaultCopyright = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.showDefaultCopyright = !isPresent(this.copyright);
    }
}
PageFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-page-footer',
                template: `<div class="page-footer">
    <div class="ui-g">
        <div class="ui-g-12 ui-md-8">

            <ng-content select=".page-footer-logo"></ng-content>

            <div class="user-info">
                <ng-content select=".page-footer-user-info"></ng-content>
            </div>

            <ul class="footer-links">
                <li role="presentation"><a href="http://www.ariba.com/legal/ariba_tou.cfm">Terms of
                    Use</a></li>
                <li role="presentation"><a
                    href="http://www.ariba.com/legal/ariba_security_policy.cfm">Security
                    Disclosure</a></li>
                <li role="presentation"><a
                    href="http://www.ariba.com/legal/ariba_privacy_statement.cfm">Privacy
                    Statement</a></li>
                <li role="presentation"><a
                    href="http://www.ariba.com/legal/ariba-privacy-statement">Cookie Statement</a>
                </li>
                <li role="presentation"><a
                    href="http://www.ariba.com/legal/ariba-privacy-statement">Participant
                    Statement</a></li>
            </ul>
        </div>

        <div class="ui-g-12 ui-md-4">
            <div class="u-bottom-align"></div>
            <div class="u-hright copyright">
                <ng-content select=".page-footer-copyright"></ng-content>
            </div>

            <!-- Default Copyright -->
            <div *ngIf="showDefaultCopyright" class="u-hright copyright">
                <p>© 1996–2017 Ariba, Inc. All rights reserved</p>
            </div>

        </div>
    </div>
</div>
`,
                styles: [`.page-footer{background:#fff;padding:15px 0 0;font-size:11px;border-top:1px solid #d7d7d7}.page-footer .user-info{color:#ccc}.page-footer .ui-g{margin:0 auto}.page-footer .copyright{color:#ccc}.footer-links{list-style:none;margin:0 -15px;padding:0;font-size:10px}.footer-links li{float:left}.footer-links:after,.footer-links:before{content:" ";display:table}.footer-links:after{clear:both}.footer-links>li,.footer-links>li>a{position:relative;display:block}.footer-links>li>a{padding:10px 15px;color:#199de0}`]
            },] },
];
/** @nocollapse */
PageFooterComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
PageFooterComponent.propDecorators = {
    copyright: [{ type: ContentChild, args: ['copyright',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Object Page Wrapper Component renders any object instance in detail. It has a uniform layout,
 * Header, Page title, Page notification, actions, content, and Footer.
 *
 *
 *  Usage:
 *
 * \@Component({
 *    selector: 'RFXPage' ,
 *    template: `
 *       <aw-object-page-wrapper
 *                        [title]="rfxEntity.headerInfo.title"
 *                        [objectType]="rfxEntity.headerInfo.eventTypeString"
 *                        [notification]="pageNotification">
 *
 *
 *           <aw-page-actions>
 *               <aw-button [type]="'submit'" [name]="'edit'" [value]="edit" [style]="'primary'">
 *                   Edit
 *                </aw-button>
 *               <aw-button [type]="'button'" [name]="'cancel'" [value]="cancel"
 *                                                         [style]="'secondary'">
 *                  Cancel
 *               </aw-button>
 *           </aw-page-actions>
 *
 *           <aw-page-content>
 *             <aw-section title="Sourcing request info" (onStateChanged)="onStateChange($event)">
 *
 *                   <m-context [object]="rfxEntity.headerInfo"
 *                              [operation]="this.editabilityState.headerInfoOp"
 *                              layout="Inspect"
 *                              uiGroup="HeaderGeneral"
 *                   >
 *                       <m-include-component></m-include-component>
 *                   </m-context>
 *
 *             </aw-section>
 *           </aw-page-content>
 *       </aw-object-page-wrapper>
 *    `
 *    })
 *    export class RFXPage
 *    {
 *       // To keep track what section is editable and which read only
 *       editabilityState: EditabilityState;
 *
 *       // Current RFX event
 *       rfxEntity: RfxEventEntity;
 *
 *       // Notifications
 *       notification: PageNotification = new PageNotification("warn",
 *                              "Policy Warning", "This request requires 3 bids.");
 *
 *        constructor ()
 *        {
 *        }
 *
 *    }
 */
class ObjectPageWrapperComponent extends PageWrapper {
    /**
     * @param {?} element
     * @param {?} env
     * @param {?} componentRegistry
     * @param {?} pageLifecycleService
     */
    constructor(element, env, componentRegistry, pageLifecycleService) {
        super(env, PageType.Object, componentRegistry, pageLifecycleService);
        this.element = element;
        this.env = env;
        /**
         * Set true if page should not include any header. Need to set to true even no header
         * object is passed in. Otherwise, a default Header component will be added.
         */
        this.hideHeader = false;
        /**
         * Set true if page should not include any footer. Need to set to true even no footer
         * object is passed in. Otherwise, a default Footer component will be added.
         */
        this.hideFooter = false;
        /**
         * The positioning of the page actions (page buttons)
         *   'top' :    page buttons are placed at the top of the page, below the title, to the right.
         *   'bottom' : page buttons are placed at the bottom of the page, above the footer.
         *   'both'   : page buttons are placed at both top and bottom.
         *
         */
        this.pageActionPosition = 'top';
        /**
         * This flag is driven by pageActionPosition. The default position is top.
         * Value is true for both 'top' and 'both' of pageActionPosition.
         */
        this.hasTopPageActions = true;
        this.objectStateIndex = 0;
        // Setting Default header component
        this.header = PageHeaderComponent;
        this.footer = PageFooterComponent;
    }
    /**
     * Generate a unique Id for this object.
     *
     * @return {?}
     */
    generatePageId() {
        return this.objectType + '_' + this.title + (this.id) ? ('_' + this.id) : '';
    }
    /**
     * Does my page have page notification?
     *
     * @return {?}
     */
    hasNotifications() {
        return (this.notifications && this.notifications.length > 0);
    }
    /**
     * @return {?}
     */
    hasObjectStates() {
        return isPresent(this.objectStates);
    }
    /**
     * Initialize my local components
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        // New Component types that are used in c-include-component
        if (this.header) {
            this.componentRegistry.registerType(this.header.name, this.header);
        }
        // New Component types that are used in c-include-component
        if (this.footer) {
            this.componentRegistry.registerType(this.footer.name, this.footer);
        }
        /** notify subscribers of the page lifecycle service  */
        this.pageLifecycleService.onPageInit(this.title);
        // Setting the page action position.
        if (this.pageActionPosition === 'bottom') {
            this.hasTopPageActions = false;
            this.hasBottomPageActions = true;
        }
        else if (this.pageActionPosition === 'both') {
            this.hasTopPageActions = true;
            this.hasBottomPageActions = true;
        }
        if (isPresent(this.objectStates) && this.objectStates.length > 1
            && isPresent(this.currentState)) {
            this.objectStateIndex = this.objectStates.indexOf(this.currentState);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (isPresent(changes['currentState']) &&
            changes['currentState'].currentValue !== changes['currentState'].previousValue) {
            // we dont need to check if objectStates exists
            this.objectStateIndex = this.objectStates.indexOf(this.currentState);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.pageLifecycleService.onPageDestroy(this.title);
    }
}
ObjectPageWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-object-page-wrapper',
                template: `<div class="page-wrapper">
    <ng-template [ngIf]="!hideHeader">
        <aw-include-component [name]='header.name'></aw-include-component>
    </ng-template>

    <div class="arc-object-detail">

        <div class="ui-g">

            <!-- page header -->
            <div class="ui-g-12 page-title">

                <!-- page title -->
                <div class="ui-g-8 ui-md-8 page-title-text">{{title}}</div>

                <div class="ui-g-4 ui-md-4 page-status">
                    <span class="object-status-label">{{objectStatusLabel}} &nbsp;</span>
                    <span class="object-status">{{objectStatus}}</span>
                </div>
            </div>

            <!-- page actions -->
            <div class="ui-g-12 page-actions" *ngIf="hasTopPageActions">
                <ng-template [embeddedItem]="actionsTemplate"
                             *ngIf="hasTopPageActions"></ng-template>
            </div>

            <!-- object states  displays only if state exists. -->
            <div class="ui-g-12 page-state">
                <div class="ui-g-3 page-state-left" [class.content]="hasObjectStates()">
                    <ng-content select=".page-state-left"></ng-content>
                </div>
                <div class="ui-g-6 page-state-center">
                    <ng-container *ngIf="hasObjectStates()">
                        <aw-stepper [steps]="objectStates"
                                    [currentStep]="objectStateIndex"></aw-stepper>
                    </ng-container>
                </div>
                <div class="ui-g-3 page-state-right">
                    <ng-content select=".page-state-right"></ng-content>
                </div>
            </div>


            <!-- Page Notification -->
            <ng-template [ngIf]="hasNotifications()">
                <div class="ui-g-12 u-nopadding">

                    <aw-page-notification *ngFor="let notification of notifications"
                                          [notification]="notification"></aw-page-notification>
                </div>
            </ng-template>

            <!-- additional content -->
            <ng-content select="aw-page-content"></ng-content>

        </div>

    </div>

    <!-- page actions -->
    <div class="ui-g-12 page-actions-bottom" *ngIf="hasBottomPageActions">
        <ng-template [embeddedItem]="actionsTemplate"
                     *ngIf="hasBottomPageActions"></ng-template>

    </div>

    <div class="page-push"></div>
</div>

<ng-template [ngIf]="!hideFooter">
    <aw-include-component [name]='footer.name'></aw-include-component>
</ng-template>
`,
                styles: [`.page-wrapper{background-color:#f2f2f2;min-height:100%;margin-bottom:-100px}.arc-object-detail{padding:20px}.page-title-text{font-size:22px;color:#000;padding:14px 0}.page-title{padding:5px 0;border-bottom:1px solid #d7d7d7}.page-actions{padding:15px 0 5px}.page-actions-bottom{padding:0 20px}.page-state,.page-state-center,.page-state-left,.page-state-right{padding:0}.content::after{content:'\\00a0';font-size:0}.page-title /deep/ .ui-button{min-width:100px}.page-status{text-align:right;padding:18px 0}.page-status .object-status-label{color:#767676}.page-status .object-status{font-weight:700;color:#038719}.page-push{height:100px}`]
            },] },
];
/** @nocollapse */
ObjectPageWrapperComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment },
    { type: ComponentRegistry },
    { type: PageLifeCycleService }
];
ObjectPageWrapperComponent.propDecorators = {
    title: [{ type: Input }],
    objectType: [{ type: Input }],
    objectStatusLabel: [{ type: Input }],
    objectStatus: [{ type: Input }],
    objectStates: [{ type: Input }],
    currentState: [{ type: Input }],
    header: [{ type: Input }],
    hideHeader: [{ type: Input }],
    footer: [{ type: Input }],
    hideFooter: [{ type: Input }],
    pageActionPosition: [{ type: Input }],
    actionsTemplate: [{ type: ContentChild, args: ['pageActions',] }],
    notifications: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Page actions is a wrapper for all page actions, buttons, links, menus that interacts it with the
 * page. The wrapper use the ability to position it as needed.
 */
class PageActionsComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
    }
}
PageActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-page-actions',
                template: `<div class="page-actions">
    <ng-content></ng-content>
</div>
`,
                styles: [`.page-actions{text-align:right;padding-top:0;padding-right:0}`]
            },] },
];
/** @nocollapse */
PageActionsComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Page content is a wrapper for page content.
 * Currently, it's pretty bare, but as we add more interactions on the page, like a side bar,
 * the page content area will likely get affected.
 */
class PageContentComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
    }
}
PageContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-page-content',
                template: '<ng-content></ng-content>',
                styles: [':host {width: 100%; padding: 0 .5em;}']
            },] },
];
/** @nocollapse */
PageContentComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ STEPPER_COMPLETED_STEP_COLOR = '#58b957';
const /** @type {?} */ STEPPER_CURRENT_STEP_COLOR = '#0076CB';
const /** @type {?} */ STEPPER_REMAINING_STEP_COLOR = '#D7D7D7';
/**
 * Stepper component displays a list of steps for user to follow. It can be used as a checklist
 * to indicate completed, current and remaining items. It could be also be used to indicate
 * the state of an document, created, submitted, approved, etc...
 *
 *
 * Usage:
 *   1.   Use the component inside your template. provide a list of steps and the current step.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                <aw-stepper [steps]="steps" [currentStep]="currentStep"></aw-stepper>
 *
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     steps: string[] = ['Monitor', 'Add Supplier', 'Get Quote'];
 *                     currentStep: number = 1;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *       }
 *
 *   2.  Override the default colors.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                            <aw-stepper [steps]="steps" [stepColorCurrent]="'#ff9900'"
 *                                        [stepColorRemaining]="'#CC0000'"
 *                                        [stepColorCompleted]="'#97a822'"
 *                                        [currentStep]="currentStep">
 *                            </aw-stepper>
 *                  `
 */
class StepperComponent extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * Local variable to indicate whether to use the colors array or not.
         */
        this.bUseColorArray = false;
        /**
         * The current step that's on. If not provided default to the first step.
         */
        this.currentStep = 0;
        // Initial color for the different stages of steps.
        this.stepColorCompleted = STEPPER_COMPLETED_STEP_COLOR;
        this.stepColorCurrent = STEPPER_CURRENT_STEP_COLOR;
        this.stepColorRemaining = STEPPER_REMAINING_STEP_COLOR;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Calculate the connector width based on how many steps
        if (isPresent(this.steps) && this.steps.length > 1) {
            // (100% - 20% (side margins)) / (NumOfSteps -1)
            this.connectorWidth = Math.ceil(80 / (this.steps.length - 1)) + '%';
        }
        /**
                 * Use the color array if it's defined.
                 */
        if (isPresent(this.colors)) {
            this.bUseColorArray = true;
            if (this.colors.length !== this.steps.length) {
                throw new Error(`The size of the steps and colors don't match:
                  (steps.length = ${this.steps.length}), (colors.length = ${this.colors.length}`);
            }
        }
    }
    /**
     * Getting the color of the step for the current index
     *
     * @param {?} index
     * @return {?}
     */
    getStepColor(index) {
        // Color Array overrides everything else.
        if (this.bUseColorArray) {
            return this.colors[index];
        }
        if (index < this.currentStep) {
            return this.stepColorCompleted;
        }
        else if (index === this.currentStep) {
            return this.stepColorCurrent;
        }
        else {
            return this.stepColorRemaining;
        }
    }
    /**
     * The connector colors are driven by the step colors.
     *
     * @param {?} index
     * @return {?}
     */
    getConnectorColor(index) {
        // Color Array overrides everything else.
        if (this.bUseColorArray) {
            return this.colors[index];
        }
        if (index < this.currentStep) {
            return this.stepColorCompleted;
        }
        else {
            return this.stepColorRemaining;
        }
    }
    /**
     * Next step.
     * @return {?}
     */
    nextStep() {
        this.currentStep++;
    }
    /**
     * previous step.
     * @return {?}
     */
    prevStep() {
        this.currentStep--;
    }
}
StepperComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-stepper',
                template: `<div class="stepper-container">
    <div class="steps">
        <div class="step-spacing"></div>

        <ng-container *ngFor="let step of steps; let i=index; let last=last;">
            <div class="step">
                <aw-step [title]="step" [color]="getStepColor(i)"></aw-step>
            </div>
            <div *ngIf="!last" class="step-connector" [style.width]="connectorWidth">
                <div class="connector" [style.borderBottomColor]="getConnectorColor(i)"></div>
            </div>
        </ng-container>

        <div class="step-spacing"></div>
    </div>

    <div class="step-labels"></div>
</div>


`,
                styles: [`.stepper-container{display:table;table-layout:fixed;width:100%}.steps{display:table-row}.step-spacing{display:table-cell;width:10%}.step{display:table-cell;width:32px}.step-connector{display:table-cell;vertical-align:middle}.connector{height:1px;border-bottom:3px solid #58b957}.step-labels{display:table-row;height:50px}`]
            },] },
];
/** @nocollapse */
StepperComponent.ctorParameters = () => [
    { type: Environment }
];
StepperComponent.propDecorators = {
    steps: [{ type: Input }],
    colors: [{ type: Input }],
    stepColorCompleted: [{ type: Input }],
    stepColorCurrent: [{ type: Input }],
    stepColorRemaining: [{ type: Input }],
    currentStep: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Renders html step component
 *
 *  * Usage:
 *       Straight forward to use. But mostly it would be used as part of the stepper component.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                           <aw-step [title]="step" [color]="color"></aw-step>
 *                           `
 */
const /** @type {?} */ DEFAULT_COLOR = '#58b957';
class StepComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        this.env = env;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isBlank(this.color)) {
            this.color = DEFAULT_COLOR;
        }
    }
}
StepComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-step',
                template: `<div class="step-container">
    <div class="outer-circle" [style.borderColor]="color">
        <div class="inner-circle" [style.borderColor]="color" [style.backgroundColor]="color"></div>
    </div>

    <div class="step-title">{{title}}</div>
</div>

`,
                styles: [`.step-container{position:relative;width:32px}.outer-circle{width:26px;height:26px;border-radius:50%;background-color:#fff;border:3px solid #58b957;position:relative}.inner-circle{width:8px;height:8px;border-radius:50%;border:2px solid #58b957;background-color:#58b957;margin:0 auto;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.step-title{position:absolute;width:150px;top:40px;left:-60px;text-align:center}`]
            },] },
];
/** @nocollapse */
StepComponent.ctorParameters = () => [
    { type: Environment }
];
StepComponent.propDecorators = {
    color: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWStepperModule {
}
AWStepperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    StepComponent,
                    StepperComponent
                ],
                imports: [
                    CommonModule,
                    AWCoreComponentModule,
                ],
                entryComponents: [
                    StepComponent,
                    StepperComponent
                ],
                exports: [
                    StepComponent,
                    StepperComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWPageWrapperModule {
}
AWPageWrapperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ObjectPageWrapperComponent,
                    PageActionsComponent,
                    PageContentComponent,
                    PageFooterComponent,
                    PageHeaderComponent,
                    SidenavComponent
                ],
                imports: [
                    CommonModule,
                    RouterModule,
                    AWCoreComponentModule,
                    AWStepperModule,
                    AWPageNotificationModule
                ],
                entryComponents: [
                    PageFooterComponent,
                    PageActionsComponent,
                    PageContentComponent,
                    PageHeaderComponent
                ],
                exports: [
                    ObjectPageWrapperComponent,
                    PageActionsComponent,
                    PageContentComponent,
                    PageFooterComponent,
                    PageHeaderComponent,
                    SidenavComponent
                ],
                providers: [PageLifeCycleService]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const EditorType = {
    Default: 0,
    // Default Editor supports Minimal set of functionality
    // [ bold | italic | underline | ordered | bullet | alignment]
    Full: 1,
    // The full list of functionality,
    TextFormat: 2,
    // Functionalities that affects text formatting.
    Custom: 3,
};
EditorType[EditorType.Default] = "Default";
EditorType[EditorType.Full] = "Full";
EditorType[EditorType.TextFormat] = "TextFormat";
EditorType[EditorType.Custom] = "Custom";
const /** @type {?} */ EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RichTextAreaComponent),
    multi: true
};
class RichTextAreaComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * A value used to save and read when rendering and updating this component
         */
        this.value = '';
        /**
         * Expose editorType so that it can be used in this components template.
         */
        this.EditorType = EditorType;
        this.type = EditorType.Default;
        this.styleClass = 'default-editor';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.value);
        this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe(val => {
            this.value = val;
            this.onModelChanged(this.value);
        });
    }
    /**
     * Internal. Please see ControlValueAccessor
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value);
        }
    }
}
RichTextAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-richtextarea',
                template: `<ng-template [ngIf]="editable">

    <!-- Basic editor, also the default, which the most used features enabled. -->
    <div *ngIf="type === EditorType.Default">
        <p-editor [(ngModel)]="value" [styleClass]="styleClass" [style]="{'height':'180px'}"
                  [placeholder]="placeHolder">
            <p-header>
                    <span class="ql-formats">
                        <button class="ql-bold" aria-label="Bold"></button>
                        <button class="ql-italic" aria-label="Italic"></button>
                        <button class="ql-underline" aria-label="Underline"></button>
                    </span>
                <span class="ql-formats">
                        <button class="ql-list" value="ordered"></button>
                        <button class="ql-list" value="bullet"></button>
                    </span>
                <span class="ql-formats">
                            <button value="left" selected></button>
                            <button value="center"></button>
                            <button value="right"></button>
                            <button value="justify"></button>
                    </span>
            </p-header>
        </p-editor>
    </div>

    <!-- Editor with all the features enabled -->
    <div *ngIf="type === EditorType.Full">
        <p-editor [(ngModel)]="value" [styleClass]="styleClass" [style]="{'height':'180px'}"
                  [placeholder]="placeHolder"></p-editor>
    </div>

    <!-- Editor with all Text formatting  -->
    <div *ngIf="type === EditorType.TextFormat">
        <p-editor [(ngModel)]="value" [styleClass]="styleClass" [style]="{'height':'180px'}"
                  [placeholder]="placeHolder">
            <p-header>
            <span class="ql-format-group">
              <select title="Font" class="ql-font">
                <option value="sans-serif" selected="">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
              <select title="Size" class="ql-size">
                <option value="10px">Small</option>
                <option value="13px" selected="">Normal</option>
                <option value="18px">Large</option>
                <option value="32px">Huge</option>
              </select>
            </span>
                <span class="ql-formats">
                    <button class="ql-bold" aria-label="Bold"></button>
                    <button class="ql-italic" aria-label="Italic"></button>
                    <button class="ql-underline" aria-label="Underline"></button>
                </span>
                <span class="ql-format-group">
              <select title="Text Color" class="ql-color">
                <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)" selected=""></option>
                <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
                <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
                <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
                <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
                <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
                <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
                <option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)"></option>
                <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
                <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
                <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
                <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
                <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
                <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
                <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
                <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
                <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
                <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
                <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
                <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
                <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
                <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
                <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
                <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
                <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
                <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
                <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
                <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
                <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
                <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
                <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
                <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
                <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
                <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
                <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
              </select>
              <span class="ql-format-separator"></span>
              <select title="Background Color" class="ql-background">
                <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>
                <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
                <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
                <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
                <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
                <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
                <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
                <option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)" selected=""></option>
                <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
                <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
                <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
                <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
                <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
                <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
                <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
                <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
                <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
                <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
                <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
                <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
                <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
                <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
                <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
                <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
                <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
                <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
                <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
                <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
                <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
                <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
                <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
                <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
                <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
                <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
                <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
              </select>
            </span>
                <span class="ql-formats">
                <button class="ql-list" value="ordered"></button>
                <button class="ql-list" value="bullet"></button>
            </span>
                <span class="ql-formats">
                    <button value="left" selected></button>
                    <button value="center"></button>
                    <button value="right"></button>
                    <button value="justify"></button>
            </span>
            </p-header>
        </p-editor>
    </div>

    <!-- Custom header Text Editor -->
    <div *ngIf="type === EditorType.Custom">
        <p-editor [(ngModel)]="value" [styleClass]="styleClass" [style]="{'height':'180px'}"
                  [placeholder]="placeHolder">
            <p-header>
                <ng-content select="custom-header"></ng-content>
            </p-header>
        </p-editor>
    </div>

</ng-template>


<ng-template [ngIf]="!editable">
    <aw-string [value]="value"></aw-string>
</ng-template>
`,
                styles: [`/deep/ .ui-editor-toolbar{background-color:#f5f5f5;border:1px solid #d7d7d7}/deep/ p-editor:active /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow,/deep/ p-editor:focus /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow,/deep/ p-editor:hover /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow{border-color:#199de0}/deep/ p-editor:active /deep/ .ui-editor-content.ql-container.ql-snow,/deep/ p-editor:focus /deep/ .ui-editor-content.ql-container.ql-snow,/deep/ p-editor:hover /deep/ .ui-editor-content.ql-container.ql-snow{border-color:#199de0}`],
                providers: [
                    EDITOR_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => RichTextAreaComponent) }
                ]
            },] },
];
/** @nocollapse */
RichTextAreaComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
RichTextAreaComponent.propDecorators = {
    type: [{ type: Input }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWRichTextAreaModule {
}
AWRichTextAreaModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    RichTextAreaComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    EditorModule,
                    AWStringFieldModule
                ],
                entryComponents: [
                    RichTextAreaComponent
                ],
                exports: [
                    RichTextAreaComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Allow developer to override default actions. Must have this declared before class when we
 * want to have this declaration inside the same file.
 */
class SectionActionsComponent {
}
SectionActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-section-actions',
                template: `<ng-content></ng-content> `,
            },] },
];
/**
 *
 * Section component that implements a section of the page. It's an outline box that
 * has the ability to expand and hide its content.
 *
 * ```ts
 * \@Component({
 *    selector: 'rfx-details' ,
 *    template: `
 *         <aw-section title="Sourcing request info" (onEdit)="onStateChange($event)"
 *                          [editable]="true">
 *
 *                <m-context [object]="rfxEntity.headerInfo"
 *                          [operation]="this.editabilityState.headerInfoOp"
 *                          layout="Inspect"
 *                          uiGroup="HeaderGeneral">
 *                   <m-include-component></m-include-component>
 *               </m-context>
 *           </aw-section>
 *
 *
 *           <aw-section #supplierSection title="Selected suppliers" (onOpen)="onOpen()"
 *                [opened]="false">
 *               <supplier-profile-card></supplier-profile-card>
 *           </aw-section>
 *
 *           <aw-section title="RFQ Details"
 *                       description="Review and update information for suppliers to respond."
 *                       [disableClose]="true">
 *
 *               <aw-subsection title="Event timeline">
 *                   <aw-form-table [useFiveZone]="false" [editable]="true">
 *
 *                       <aw-form-row [label]="'Start Date'" [name]="'startDate'" [size]="'small'"
 *                                   [highlightRow]="true">
 *                           <aw-date-time
 *                               formatName="dateTime"
 *                               name="startDate" [value]="rfxEntity.created"
 *                               [showTime]="true"></aw-date-time>
 *                       </aw-form-row>
 *                   </aw-form-table>
 *               </aw-subsection>
 *          </aw-section>
 *    `
 *    })
 *    export class MyPage
 *    {
 *
 *        constructor ()
 *        {
 *        }
 *
 *    }
 *
 * ```
 *
 * Section component also supports editability modes and if enabled it will render action buttons
 * in the footer. Developer can also override default behavior and provide custom actions.
 *
 *
 * e.g:
 *
 * ```
 *      <aw-section [title]="title" [editable]="true"
 *                          (onCancelAction)="someHandler1($event)"
 *                          (onSaveAction)="someHandler2($event)" >
 *              section content
 *
 *
 *   </aw-section>
 *
 * ```
 *
 * or custom action buttons:
 *
 *
 * ```html
 *
 *       <aw-section-actions>
 *                      <aw-button >
 *                            ButtonTest1
 *                      </aw-button>
 *                      <aw-button>
 *                            ButtonTest2
 *                      </aw-button>
 *     </aw-section-actions>
 *
 * ```
 *
 *
 * There are two edit modes
 *  # Default
 *      Renders action buttons in the footers and emit actions to the application
 *
 *  # External
 *     No action buttons are shown in the footer and behavior is handled by application. Only event
 *     is emited.
 *
 *
 *  e.g:
 *
 *  ```ts
 *
 *      <aw-section title="User Information" (onEdit)="onAddSomething($event)"
 *                  [editable]="true" [editMode]="'external'" >
 *                  <div>
 *                      Content
 *                  </div>
 *      </aw-section>
 *
 *  ```
 *
 * Note: When using editing mode you have to call at the end of the editing cycle method
 * `completeEditing()` to commit editing which changes internal state of the Section.
 *
 *
 *
 */
class SectionComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
        /**
         * Should this section be opened at the start. Default is opened.
         */
        this.opened = true;
        /**
         * Whether this section can be closed or not.
         *
         */
        this.disableClose = false;
        /**
         * Whether this section is in EditState or not.
         *
         * When in editing state and we show "Cancel / Save" button developer needs use this binding
         * to control the state.
         */
        this.editState = false;
        /**
         * Current Editing mode. Tells the components if its its default behavior or driven by
         * application using this component.
         *
         * {\@see EditMode}
         *
         */
        this.editMode = 'default';
        /**
         * Developer can provide custom Edit action icon that will appear in the right top corner
         */
        this.actionIcon = 'icon-edit';
        /**
         * Event emitted when the section is fully opened.
         */
        this.onOpen = new EventEmitter();
        /**
         * Event emitted when the section is fully closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Edit state to broadcast state of current section
         */
        this.onEdit = new EventEmitter();
        /**
         * When in editing state and default buttons are rendered on click broadcast Cancel action
         */
        this.onCancelAction = new EventEmitter();
        /**
         * When in editing state and default buttons are rendered on click broadcast Save action
         */
        this.onSaveAction = new EventEmitter();
        this.onEditingComplete = new EventEmitter();
        this.editable = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        // If I have not header, then I can't close the section.
        if (!this.isHeaderDisplayed()) {
            this.disableClose = true;
        }
        // If I can't close the section, then it should default open.
        if (this.disableClose) {
            this.opened = true;
        }
        // initialize the expanded state.
        this.expanded = this.opened;
    }
    /**
     * Don't display header area if I don't have title and description.
     *
     * @return {?}
     */
    isHeaderDisplayed() {
        return (isPresent(this.title) || isPresent(this.description));
    }
    /**
     * Css Class that control the look and feel for section component.
     * @return {?}
     */
    aClass() {
        if (!this.isHeaderDisplayed()) {
            return 'section-no-header';
        }
        return '';
    }
    /**
     * Since we introduced buttons and editState the decision on when to exit editing mode
     * should be on the developer using this component therefore only startEditing
     *
     * @param {?} $event
     * @return {?}
     */
    onEditAction($event) {
        // when in editing make sure we dont switch state as there can be some Form errors
        // which needs to be handled by developer and only then change the editState
        if (!this.editState) {
            this.editState = !this.editState;
            let /** @type {?} */ state$$1 = (this.editState) ? 'inEdit' : 'notInEdit';
            this.onEdit.emit(state$$1);
            this.open();
        }
        // prevent the original event from bubbling up. Because the edit icon is inside
        // the header. If the click even is bubbled up, this event will cause the section to
        // expand or collapse.
        if (isPresent($event.event)) {
            $event.event.stopPropagation();
            $event.event.preventDefault();
        }
    }
    /**
     * @return {?}
     */
    hasDescription() {
        return isPresent(this.description);
    }
    /**
     * Open this section, if it's already open, will do nothing.
     * @param {?=} event
     * @return {?}
     */
    open(event) {
        if (!this.expanded) {
            this.accordionTab.toggle(event);
        }
    }
    /**
     * Close this section, if it's already close, will do nothing.
     * @param {?} event
     * @return {?}
     */
    close(event) {
        if (this.expanded) {
            this.accordionTab.toggle(event);
        }
    }
    /**
     * Callback to be invoked when accordion is opened
     *
     * @param {?} event
     * @return {?}
     */
    onSectionOpen(event) {
        this.expanded = true;
        this.onOpen.emit('open');
    }
    /**
     * Callback to be invoked when accordion is closed
     *
     * @param {?} event
     * @return {?}
     */
    onSectionClose(event) {
        this.expanded = false;
        this.onClose.emit('close');
    }
    /**
     *
     * Tells us if we need to render application defined custom actions
     *
     * @return {?}
     */
    hasCustomActions() {
        return isPresent(this.customActions);
    }
    /**
     * Emit the editing state back to non-editable
     * @return {?}
     */
    completeEditing() {
        this.editState = false;
        this.onEditingComplete.emit(this.editState);
    }
}
SectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-section',
                template: `<div class="ui-g-12 section-container"
     [class.editing]="editable && editState && editMode === 'default'">

    <p-accordion (onOpen)="onSectionOpen($event)" (onClose)="onSectionClose($event)"
                 [styleClass]="aClass()">
        <p-accordionTab #accordionTab [selected]="opened" [disabled]="disableClose">
            <p-header>
                <!-- title and description -->
                <div class="section-header-container">
                    <div class="section-title">{{title}}</div>
                    <div *ngIf="hasDescription()" class="section-description">{{description}}</div>

                    <!-- actions: Hide when in editing and editMode is default -->
                    <div *ngIf="(editable && !editState && editMode === 'default') ||
                        (editable && editMode === 'external')"
                         class="section-actions">
                        <aw-hyperlink (action)="onEditAction($event)">
                            <i class="sap-icon section-edit-action" [ngClass]="actionIcon"></i>
                        </aw-hyperlink>
                    </div>
                </div>
            </p-header>

            <ng-content></ng-content>
        </p-accordionTab>
    </p-accordion>
    <!--
        need to put it outside of p-accordion otherwise button will inherit different
        color scheme
    -->
    <div class="section-footer-container" *ngIf="editable && editState &&
            editMode === 'default'">
        <div class="footer-actions">

            <ng-template [ngIf]="!hasCustomActions()">
                <aw-button [style]="'secondary'" size="small"
                           (action)="onCancelAction.emit($event)">
                    Cancel
                </aw-button>
                <aw-button size="small" (action)="onSaveAction.emit($event)">
                    Save
                </aw-button>
            </ng-template>

            <ng-content select="aw-section-actions"></ng-content>
        </div>
    </div>
</div>
`,
                styles: [`.section-header-container{position:relative}.section-container{margin:10px 0;background-color:#fff;padding:.2em .5em;border:2px dashed transparent}.section-container.editing{border-color:#199de0}.section-container ::ng-deep .ui-accordion-header>a{display:flex}.section-container ::ng-deep .ui-accordion-header>a .ui-accordion-toggle-icon{flex:0 0 30px;padding-top:2px}.section-container ::ng-deep .ui-accordion-header>a p-header{flex:1 0}.section-container /deep/ .ui-accordion-header.ui-state-disabled{opacity:1}.section-title{font-size:1.1em}.section-description{font-size:.9em;padding:.6em 0 .2em}.section-footer-container{margin:1em 2em 0;padding:.8em 0 1.5em .8em;border-top:1px solid #d7d7d7}.section-footer-container .footer-actions{display:inline-block;text-align:right;width:100%}.section-actions{position:absolute;top:0;right:0;z-index:1}.section-actions /deep/ a.link,.section-actions /deep/ a.link:hover{padding:0;text-decoration:none}.section-edit-action{font-size:1.5em;position:relative;padding:.1em 0 .1em .5em;cursor:pointer}.section-edit-action.icon-edit{font-size:1.4em}.section-container /deep/ .ui-accordion-header{color:#363636;border:none;background:#fff!important;padding:0 1em}.section-container /deep/ .ui-accordion-content{border:none;padding:1em 2em}.section-container /deep/ .ui-accordion-header /deep/ a[role=tab]{padding:.75em 0;text-decoration:none}.section-container /deep/ .ui-accordion-header.ui-state-active /deep/ a[role=tab]{border-bottom:1px solid #d7d7d7;color:#363636}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header{height:1px}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header.ui-state-active /deep/ a[role=tab]{border-bottom:none}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header .section-edit-action{cursor:pointer!important}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-down,:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-right{font-family:"SAP icon fonts";font-size:1.1em;top:.8em;left:.1em;color:#767676;margin-top:0}:host /deep/ .ui-accordion-header.ui-state-disabled /deep/ .fa,:host /deep/ .ui-accordion-header.ui-state-disabled /deep/ .pi{display:none}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-right:before{content:"\\e1ed"}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-down:before{content:"\\e1ef"}`]
            },] },
];
/** @nocollapse */
SectionComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
SectionComponent.propDecorators = {
    title: [{ type: Input }],
    description: [{ type: Input }],
    opened: [{ type: Input }],
    disableClose: [{ type: Input }],
    editState: [{ type: Input }],
    editMode: [{ type: Input }],
    actionIcon: [{ type: Input }],
    onOpen: [{ type: Output }],
    onClose: [{ type: Output }],
    onEdit: [{ type: Output }],
    onCancelAction: [{ type: Output }],
    onSaveAction: [{ type: Output }],
    onEditingComplete: [{ type: Output }],
    accordionTab: [{ type: ViewChild, args: ['accordionTab',] }],
    customActions: [{ type: ContentChild, args: [SectionActionsComponent,] }]
};
class SubSectionComponent {
}
SubSectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-subsection',
                template: `
                    <h4 class="subsection-title">{{title}}</h4>
                    <ng-content></ng-content>
                 `,
                styles: ['.subsection-title {color: #363636; }']
            },] },
];
SubSectionComponent.propDecorators = {
    title: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWSectionModule {
}
AWSectionModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SectionComponent,
                    SubSectionComponent,
                    SectionActionsComponent
                ],
                imports: [
                    CommonModule,
                    AccordionModule,
                    AribaCoreModule,
                    AWStringFieldModule,
                    AWHyperlinkModule,
                    AWButtonModule,
                    SharedModule
                ],
                entryComponents: [
                    SectionComponent,
                    SubSectionComponent,
                    SectionActionsComponent
                ],
                exports: [
                    SectionComponent,
                    SectionActionsComponent,
                    SubSectionComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * DTColumn represent single column including header and its body. Each column has its own
 * rendererTemplate which a entry to this component.
 *
 * Keeping this separate from the datatable where DT is not really aware what it is rendering,
 * it allows us more flexibility in terms of different type of column inheriting from this
 * one.. Such as:
 *  DTRowDetail  column
 *  DTSingleSelection column
 *  DTMultiSelection column
 *
 * This way we don't do IF/THEN/ELSE inside the datatable and trying to create different cases.
 *
 *  Then later on this will let us create additional logic for the pivotal layout. Because DT
 *  does know anything about the type of the column so whatever is added to the DT.columns it
 *  will be rendered.
 *
 *
 *  Columns can be also frozen meaning if the content overflows they dont scroll. To make the
 *  column frozen we need to use [frozen] binding and se it to TRUE plus it requires a [width]
 *  binding to be set (in px).
 *  We need this to be able to properly position the second table which is changed to absolute
 *  positioning.
 *
 *
 *
 */
class DTColumn2Component extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env);
        this.env = env;
        this.domHandler = domHandler;
        /**
         *
         * Cell alignment. It inserts regular align attribute to the table cell
         *
         */
        this.align = 'left';
        /**
         *
         * If false applies dt-is-hidden style that hides the column
         *
         */
        this.isVisible = true;
        /**
         * Sorting direction
         *
         */
        this.sortOrdering = 'descending';
        /**
         * Tells the template if whether to render a label
         *
         */
        this.showColumnLabel = true;
        /**
         *
         * See AWDataTable
         *
         */
        this.showSubHeader = false;
        /**
         *
         * Used together with cell selectionMode to tell which column is selectable
         *
         */
        this.selectable = false;
        /**
         * Use globally defined HEADER template for current column
         *
         */
        this.useGlobalHeader = true;
        /**
         * Use globally defined SubHeader template for current column
         *
         */
        this.useGlobalSubHeader = true;
        /**
         * Use globally defined body template
         *
         */
        this.useGlobalBody = true;
        /**
         * Tells if the column is data column  - if it is rendering data or just a label or some
         * control
         *
         * This is important when calculating a column span and we need to know which columns are or
         * will be just for selection controls and which holds data
         */
        this.isDataColumn = true;
        /**
         * Identifies column that will not scroll horizontally with other columns. Column is
         * frozen.
         *
         * For such columns that are marked as frozen binding [width] is required.
         *
         */
        this.frozen = false;
        this.maxWidthPx = 0;
        this.minWidthPx = 0;
        this.widthPx = 0;
        this.widestCell = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.sortOrder = this.dt.sortOrderingForString(this.sortOrdering);
        if (isBlank(this.bodyTemplate) && this.useGlobalBody) {
            this.bodyTemplate = this.dt.bodyTemplate;
        }
        if (isBlank(this.headerTemplate) && this.useGlobalHeader) {
            this.headerTemplate = this.dt.headerTemplate;
        }
        if (isBlank(this.subHeaderTemplate) && this.useGlobalSubHeader) {
            this.subHeaderTemplate = this.dt.subHeaderTemplate;
        }
        if (isBlank(this.bodyClassFn)) {
            this.bodyClassFn = this.dt.bodyClassFn;
        }
        if (isBlank(this.key) && isBlank(this.label)) {
            throw new Error('Missing required binding: ' +
                '[key] or [label] bindings must be used at minimum');
        }
        // To be able to position second DT we require [width] to be set as well
        if (this.frozen && isBlank(this.width)) {
            throw new Error('Missing required binding [width]: ' +
                'when [frozen]=true then [width] binding needs to be specified.');
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // need to deffer this and trigger change detection otherwise I get
        // value was changed after it was checked error
        setTimeout(() => {
            this.maxWidthPx = this.widthToPx(this.maxWidth);
            this.minWidthPx = this.widthToPx(this.minWidth);
            this.widthPx = this.widthToPx(this.width);
        });
    }
    /**
     *
     * When cell selectionMode is enabled this method is triggered when we click on header.
     * It delegates the call to the DT where it toggles currently selected value
     *
     * @param {?} event
     * @param {?} element
     * @return {?}
     */
    handleHeaderClick(event, element) {
        if (this.isHeaderSelectable()) {
            this.dt.onHeaderSelectionChange(element, this);
        }
        else if (this.sortable) {
            this.sort(event);
        }
        event.preventDefault();
    }
    /**
     *
     * Todo: Implement our own sorting mechanism once we extract the sorting logic to its component
     *
     * @param {?} event
     * @return {?}
     */
    sort(event) {
        if (!this.sortable) {
            return;
        }
        let /** @type {?} */ targetNode = event.target;
        if (this.domHandler.hasClass(targetNode, 'dt-u-sortable') ||
            this.domHandler.hasClass(targetNode, 'dt-col-title') ||
            this.domHandler.hasClass(targetNode, 'dt-col-sortable-icon')) {
            if (isPresent(this.dt.sortColumn) && this.dt.sortColumn.key === this.key) {
                this.sortOrder = this.sortOrder * -1;
                this.sortOrdering = this.dt.sortOrderingForNumber(this.sortOrder);
            }
            else {
                this.dt.sortColumn = this;
            }
            this.dt.dataSource.state.sortKey = this.key;
            this.dt.dataSource.state.sortOrder = this.dt.sortOrderingForString(this.sortOrdering);
            this.dt.sortSingle();
        }
        this.dt.updateDataToRender();
    }
    /**
     * Calculated style class based on data
     *
     *
     * @param {?} item
     * @return {?}
     */
    dynamicBodyClass(item) {
        let /** @type {?} */ dynClass = isPresent(this.bodyClassFn)
            ? this.bodyClassFn.apply(this.dt.context, [this, item]) : '';
        if (isPresent(this.bodyStyleClass)) {
            dynClass += ' ' + this.bodyStyleClass;
        }
        else if (isPresent(this.styleClass)) {
            dynClass += ' ' + this.styleClass;
        }
        return dynClass;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isRowSelectable(item) {
        if (isPresent(this.dt.isRowSelectable)) {
            return this.dt.isRowSelectable(item);
        }
        return false;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isCellSelectable(item) {
        return this.dt.selectionMode === 'cell' && this.isRowSelectable(item) && this.selectable;
    }
    /**
     * @return {?}
     */
    isHeaderSelectable() {
        return this.dt.selectionMode === 'cell' && this.selectable;
    }
    /**
     * @return {?}
     */
    getSortOrder() {
        let /** @type {?} */ order = 0;
        if (isPresent(this.dt.sortColumn) && this.key === this.dt.sortColumn.key) {
            order = this.dt.sortColumn.sortOrder;
        }
        return order;
    }
    /**
     * @return {?}
     */
    isSorted() {
        if (!this.sortable) {
            return false;
        }
        return isPresent(this.dt.sortColumn) && this.key === this.dt.sortColumn.key;
    }
    /**
     * @param {?} table
     * @return {?}
     */
    initialize(table) {
        this.dt = table;
        if (isPresent(this.dt.initialSortKey) && this.dt.initialSortKey === this.key) {
            this.sortable = true;
            this.sortOrder = this.dt.sortOrderingForString(this.dt.initialSortOrder);
            this.dt.sortColumn = this;
        }
    }
    /**
     * This method is called at the end of the view init cycle from the dt.ngAfterViewChecked.
     *
     * In case we use MaxWidth directive we set new width once for all columsn
     * @param {?} myIndex
     * @return {?}
     */
    postInitialize(myIndex) {
        const /** @type {?} */ colIndex = myIndex + 1;
        let /** @type {?} */ table;
        if (this.dt.hasFrozenColumns()) {
            table = (/** @type {?} */ (this.dt)).el
                .nativeElement.querySelector('.dt-body-frozen table');
        }
        else {
            table = (/** @type {?} */ (this.dt)).el.nativeElement.querySelector('table');
        }
        if (this.widestCell > 0) {
            let /** @type {?} */ all = table.querySelectorAll('tr th:nth-child(' + colIndex + '), ' +
                'tr td:nth-child(' + colIndex + ')').forEach((node) => {
                node.style.width = this.widestCell + 'px';
            });
        }
    }
    /**
     * You either use this binding directly and say its datacolumn or when there is a [key]
     * biding we know it refers to some field.
     *
     * @return {?}
     */
    isValueColumn() {
        return (isPresent(this.isDataColumn) && BooleanWrapper.isTrue(this.isDataColumn)) ||
            isPresent(this.key);
    }
    /**
     * When we are in outline mode  we need to also indend each selection control accordingly.
     *
     * indent - 1 > only offset with
     * indent
     * @param {?} cell
     * @param {?} level
     * @return {?}
     */
    indentForControl(cell, level) {
        if (this.dt.isOutline() && level > 0 && cell.offsetWidth > 0
            && isPresent(cell.nextElementSibling)) {
            let /** @type {?} */ outlineNodePadding = parseInt(getComputedStyle(cell.nextElementSibling).paddingLeft) || 0;
            // 1st level is pushed as root
            if (this.dt.pushRootSectionOnNewLine) {
                return (level === 1) ? null : (this.dt.indentationPerLevel * level)
                    - outlineNodePadding;
            }
            else {
                return (this.dt.indentationPerLevel * level) + outlineNodePadding;
            }
        }
        return null;
    }
    /**
     *
     * Internal
     * @param {?} width
     * @return {?}
     */
    widthToPx(width) {
        let /** @type {?} */ px;
        if (isPresent(width)) {
            if (width.indexOf('%') > 0) {
                const /** @type {?} */ nonPc = parseFloat(width) / 100;
                px = nonPc * (/** @type {?} */ (this.dt)).el.nativeElement.offsetWidth;
            }
            else {
                px = parseFloat(width);
            }
        }
        return px;
    }
}
DTColumn2Component.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-column2',
                template: `<!--
    To make it more readable Each Column type has its own rendering template instead of putting
    all this into datatable as this is more responsibility of the column. And the main goal
    was try to be modular as possible. When There will be different types of columns

    - Regular DTColumn (current implementation),
    - SelectionColumn (Single/Multi select) - todo,
    - DetailRow column, then pivotal collumn to render row/column/detail attributes - todo.

    When implementing new column type you just inherit this DTColumnComponent and provide your
    own rendering template and DT take care of the rest.

    todo: We have SingleSelect, Multiselect rendering template that is Added programatically
    todo: We have pivotal rendering template


-->
<ng-template #renderingTemplate let-isHeader let-isSubHeader="isSubHeader" let-column="column"
             let-dataToRender="data"
             let-columnIndex="columnIndex"
             let-rowIndex="rowIndex">

    <ng-template *ngIf="isHeader" [ngTemplateOutlet]="colHeader"
                 [ngTemplateOutletContext]="{$implicit: isSubHeader, columnIndex:columnIndex, data: dataToRender,
                 rowIndex:rowIndex}">
    </ng-template>

    <ng-template *ngIf="!isHeader" [ngTemplateOutlet]="colBody"
                 [ngTemplateOutletContext]="{$implicit: column, data:dataToRender,rowIndex:rowIndex}">
    </ng-template>
</ng-template>


<!--
    Templates for header columns. Here we are rendering two types. Header and Subheader that we
    usually use here as some kind of summary columns. Not really having summary at the bottom like other
    DT.

    TH column and their text are usually unselectable and most of these were inherited from
    original PrimeNg DT even not many things got left after we refactor this but the idea is the
    same.

    Each cell has its dt-cell-def class that sets default styling like font, background, alignment
    padding, etcs..


-->
<ng-template #colHeader let-isSubHeader let-columnIndex="columnIndex" let-data="data" let-rowIndex="rowIndex">

    <th #headerCell1 [class]="headerStyleClass||styleClass" *ngIf="!isSubHeader"
        (click)="handleHeaderClick($event, headerCell1)"
        [ngClass]="{'dt-is-default dt-u-unselectable-text' :true,
                    'dt-cell-def': dt.selectionMode !== 'cell' || (!dt.isOutline() || !dt.pivotalLayout),
                    'dt-u-sortable': sortable,
                    'dt-is-active': isSorted(),
                    'dt-is-hidden': !isVisible}"
        [attr.width]="width"
        [attr.align]="align"
        [attr.tabindex]="sortable ? 1 : null"
        [maxWidth]="maxWidthPx"
    >

        <ng-template [ngIf]="dt.headerFilterTemplate && columnIndex === 0 ">
            <ng-container *ngTemplateOutlet="dt.headerFilterTemplate">
            </ng-container>
        </ng-template>
        <!--
            when cell are selectable we need two version where one wrap the cell content in div
        -->
        <ng-template [ngIf]="isHeaderSelectable()">
            <ng-container *ngTemplateOutlet="selectableHeaderCell; context: {$implicit: this}">
            </ng-container>
        </ng-template>


        <ng-template [ngIf]="!isHeaderSelectable()">
            <ng-container *ngTemplateOutlet="nonSelectableHeaderCell; context: {$implicit: this}">
            </ng-container>
        </ng-template>
    </th>

    <th #headerCell2 [class]="headerStyleClass||styleClass" *ngIf="isSubHeader"
        [attr.width]="width"
        [attr.align]="align"
        [ngClass]="{'dt-is-default dt-cell-def dt-sub-header dt-u-unselectable-text':true}"
        [maxWidth]="maxWidthPx">

        <span class="dt-col-title" *ngIf="dt.showSubHeader && subHeaderTemplate">
            <ng-container *ngTemplateOutlet="subHeaderTemplate;
                    context: {$implicit: this, rowData: data, rowIndex: rowIndex}">
            </ng-container>
        </span>
    </th>
</ng-template>


<!--
    Template for the body = the TD. For the body and we might want to do the same for header we
    allow to have calculated body class that comes from the application. So based on the data types
    you might want to apply different class in order to apply custom styling.
-->
<ng-template #colBody let-data="data" let-rowIndex="rowIndex">

    <td #cell [class]="dynamicBodyClass(data)"
        (click)="dt.onCellSelectionChange(cell, this, data)"
        [attr.width]="width"
        [attr.align]="align"
        [ngClass]="{ 'dt-is-default': true,
        'dt-cell-def': !isCellSelectable(data),
        'dt-is-hidden': !isVisible}"
        [maxWidth]="maxWidthPx">

        <!--
            Since we need to support cell selection when we need to draw border around it
            We are wrapping such sells with div which gives us better flexibility
        -->
        <ng-template [ngIf]="isCellSelectable(data)">
            <ng-container *ngTemplateOutlet="selectableBodyCell;
                        context: {$implicit: this, data: data, rowIndex: rowIndex }">
            </ng-container>

        </ng-template>


        <ng-template [ngIf]="!isCellSelectable(data)">
            <ng-container *ngTemplateOutlet="nonSelectableBodyCell;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
            </ng-container>
        </ng-template>

    </td>
</ng-template>

<!--
    Todo: create better solution instead of using different template create directive that wraps
    it with the div conditionally
-->
<ng-template #selectableHeaderCell let-data="data" let-rowIndex="rowIndex">

    <div class="dt-cell-def-selectable"
         [ngClass]="{'dt-cell-selected': dt.isHeaderSelected(this)}">
        <ng-container *ngTemplateOutlet="headerCellContent;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
        </ng-container>
    </div>
</ng-template>


<ng-template #nonSelectableHeaderCell let-data="data" let-rowIndex="rowIndex">
    <ng-container *ngTemplateOutlet="headerCellContent;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
    </ng-container>
</ng-template>


<ng-template #headerCellContent let-data="data" let-rowIndex="rowIndex">
    <span class="dt-col-title" *ngIf="showColumnLabel && !headerTemplate">
                {{label}}
    </span>

    <span class="dt-col-title" *ngIf="showColumnLabel && headerTemplate">
                    <ng-container *ngTemplateOutlet="headerTemplate;
                        context: {$implicit: this, rowData: data, rowIndex: rowIndex }">
                    </ng-container>
    </span>

    <span class="dt-col-sortable-icon sap-icon icon-sort" *ngIf="sortable"
          [ngClass]="{'icon-sort-descending': (getSortOrder() == -1),
                           'icon-sort-ascending': (getSortOrder() == 1)}">
    </span>
</ng-template>


<ng-template #selectableBodyCell let-data="data" let-rowIndex="rowIndex">
    <div class="dt-cell-def-selectable"
         [ngClass]="{'dt-cell-selected': dt.isBodyCellSelected(this, data)}">
        <ng-container *ngTemplateOutlet="bodyCellContent;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
        </ng-container>
    </div>
</ng-template>


<ng-template #nonSelectableBodyCell let-data="data" let-rowIndex="rowIndex">
    <ng-container *ngTemplateOutlet="bodyCellContent;
                        context: {$implicit: this, data: data, rowIndex: rowIndex}">
    </ng-container>
</ng-template>


<ng-template #bodyCellContent let-data="data" let-rowIndex="rowIndex">
    <!--
           when no template is used use our FieldPath to access the object value based on the
           key binding
        -->
    <span class="dt-col-cell-data" *ngIf="!bodyTemplate">
            {{dt.getValue(data, key)}}
        </span>


    <!--
        In case application wants to provide their own cell component they use
        #body ng-template to do so.
    -->
    <span class="dt-col-cell-data" *ngIf="bodyTemplate">
            <ng-container *ngTemplateOutlet="bodyTemplate;
            context: {$implicit: this, rowData: data, rowIndex: rowIndex}"></ng-container>
        </span>
</ng-template>
`,
                styles: [`.dt-sortable-col{cursor:pointer}.dt-col-sortable-icon{display:inline-block;margin-left:.125em}th.dt-cell-def{font-weight:400;color:#4a4a4a}th.dt-is-default{background-color:#f2f2f2;white-space:nowrap}th.dt-is-default.dt-cell-def:not(.dt-sub-header){border-bottom-color:#f2f2f2}th.dt-sub-header{background-color:#fff}th .dt-cell-selected{border-color:#58b957}td .dt-cell-selected{border-left-color:#4f9fcf}.dt-root-section .dt-selection-column,.dt-selection-column{width:46px;padding:0 12px}.dt-pivot-layout td.dt-selection-column,th.dt-selection-column{border-right-color:transparent}thead tr:first-child th{border-top-color:transparent}tbody tr:last-child:not(.dt-drag-row-bottom) td{border-bottom-color:transparent}td:first-child,th:first-child{border-left-color:transparent}td:last-child,th:last-child{border-right-color:transparent}tbody .dt-drag-row-top>td{background:linear-gradient(0deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-bottom>td{background:linear-gradient(180deg,#fff 0,#fff 97%,#0271d2 100%)}tbody .dt-drag-row-both>td{background:linear-gradient(0deg,#0271d2 0,#fff 3%,#fff 97%,#0271d2 100%)}tbody .dt-row-dragging>td{background-color:#ececec;color:#b9b9b9}tbody .dt-row-dragging .ui-state-active{opacity:.5;cursor:not-allowed}`],
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
DTColumn2Component.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];
DTColumn2Component.propDecorators = {
    label: [{ type: Input }],
    key: [{ type: Input }],
    align: [{ type: Input }],
    bodyClassFn: [{ type: Input }],
    isVisible: [{ type: Input }],
    sortable: [{ type: Input }],
    sortOrdering: [{ type: Input }],
    showColumnLabel: [{ type: Input }],
    showSubHeader: [{ type: Input }],
    headerStyleClass: [{ type: Input }],
    bodyStyleClass: [{ type: Input }],
    selectable: [{ type: Input }],
    useGlobalHeader: [{ type: Input }],
    useGlobalSubHeader: [{ type: Input }],
    useGlobalBody: [{ type: Input }],
    isDataColumn: [{ type: Input }],
    frozen: [{ type: Input }],
    maxWidth: [{ type: Input }],
    minWidth: [{ type: Input }],
    rendererTemplate: [{ type: ViewChild, args: ['renderingTemplate',] }],
    headerTemplate: [{ type: ContentChild, args: ['header',] }],
    subHeaderTemplate: [{ type: ContentChild, args: ['subHeader',] }],
    bodyTemplate: [{ type: ContentChild, args: ['body',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * An datatable header area.
 *
 * See {\@link DataTableComponent} for more explanation.
 */
class DTHeaderComponent2 {
}
DTHeaderComponent2.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-header2',
                template: '<ng-content></ng-content>'
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Custom column implementation to render detail row spaning its column across whole table width.
 *
 *
 */
class DTDetailRowComponent extends DTColumn2Component {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env, domHandler);
        this.env = env;
        this.domHandler = domHandler;
        /**
         *
         * tells if we need to render a line between item row and its detail
         *
         */
        this.showRowLine = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // just to get around the check in parent class
        this.key = '';
        this.isVisible = !this.dt.isOutline() || !this.dt.pivotalLayout;
        super.ngOnInit();
    }
    /**
     * Check if we need to keep some leading TDs
     *
     * @return {?}
     */
    visibleLeadingCols() {
        return this.dt.numberOfColsBeforeData - (this.dt.hasInvisibleSelectionColumn() ? 1 : 0);
    }
    /**
     *
     * Check if we can show detail row/column using either [isVisible] or [isVisibleFn] bindings.
     * Here can hook on application level custom method to decide if current item has detail row
     * or not
     *
     * Or we can use isVisible=true to tell all row have detail row
     *
     * @param {?} item
     * @return {?}
     */
    showDetailRow(item) {
        let /** @type {?} */ isVisible = this.isVisible;
        if (isPresent(this.isVisibleFn)) {
            isVisible = this.isVisibleFn.apply(this.dt.context, [this, item]);
        }
        return isVisible;
    }
}
DTDetailRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-detail-column',
                template: `<!--
    Renders application defined detail column. This template just renders a detail row and
    not expansion control. This is implemented by different DtColumn implementation and its added
    (will be) added programmatically during column initialization
-->
<ng-template #renderingTemplate let-column="column" let-rowData="data">

    <tr #detailRowElement class="dt-body-row dt-detail-row">

        <td *ngIf="dt.hasInvisibleSelectionColumn()" width="1px"></td>
        <td *ngIf="visibleLeadingCols() > 0" colspan="visibleLeadingCols()" width="1px">
            &nbsp;&nbsp;
        </td>
        <td [attr.colspan]="dt.startOfFirstDataColumn" [class]="dynamicBodyClass(rowData)"
            [ngClass]="{ 'dt-is-default dt-cell-def': true}">

            <ng-container
                *ngTemplateOutlet="bodyTemplate; context:{$implicit: this, rowData:rowData}">
            </ng-container>
        </td>
    </tr>
</ng-template>

`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
DTDetailRowComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];
DTDetailRowComponent.propDecorators = {
    isVisibleFn: [{ type: Input }],
    showRowLine: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 *
 *
 *
 */
class DTDetailRowExpanderComponent extends DTColumn2Component {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env, domHandler);
        this.env = env;
        this.domHandler = domHandler;
        // we dont want to show the row/column unless application says so
        this.isVisible = false;
        // default width of the selection control
        this.width = '45px';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // just to get around the check in parent class
        this.key = '';
        super.ngOnInit();
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    toggleExpansion(event, item) {
        this.dt.detailRowExpansionState.toggle(item);
        event.stopPropagation();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    calculateStyleClass(item) {
        return this.dt.detailRowExpansionState.isExpanded(item) ?
            'icon-slim-arrow-down' : 'icon-slim-arrow-right';
    }
}
DTDetailRowExpanderComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-detail-column-expand',
                template: `<!--
   Special column that renders expand/collapse control for detail row when detail row is enabled.

   Just like for the other column it renders header section as well as body section with
   expand control to toggle the expansion

-->
<ng-template #renderingTemplate let-isHeader let-isSubHeader="isSubHeader" let-column="column"
             let-dataToRender="data" let-columnIndex="columnIndex" let-rowIndex="rowIndex">


    <ng-template [ngIf]="isHeader && !isSubHeader">
        <th #headerCell1 [class]="headerStyleClass||styleClass"
            class="dt-row-cell-expando"
            [ngClass]="{'dt-is-default dt-u-unselectable-text dt-cell-def' :true,
                        'dt-det-row-expanded': dt.detailRowExpansionState.isExpanded(dataToRender)}">
        </th>

    </ng-template>

    <ng-template [ngIf]="!isHeader && !isSubHeader">
        <td #cell
            class="dt-row-cell-expando"
            [ngClass]="{ 'dt-is-default': true,
                    'dt-cell-def': !isCellSelectable(dataToRender),
                    'dt-det-row-expanded': dt.detailRowExpansionState.isExpanded(dataToRender),
                    'dt-det-row-with-ln' : dt.rowDetailColumn.showRowLine}">

            <span (click)="toggleExpansion($event, dataToRender)"
                  class="dt-det-row-expand sap-icon"
                  [ngClass]="calculateStyleClass(dataToRender)">

            </span>

        </td>

    </ng-template>


</ng-template>

`,
                styles: [`.dt-row-cell-expando{width:14px;text-align:right;padding:17px 5px 17px 17px;border-right-color:transparent}.dt-row-cell-expando .dt-det-row-expand{cursor:pointer;line-height:21px}td.dt-det-row-expanded:not(.dt-det-row-with-ln),td.dt-det-row-expanded:not(.dt-det-row-with-ln)~td{border-bottom-color:transparent}`],
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
DTDetailRowExpanderComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
const /** @type {?} */ DragEvents = ['mousedown', 'dragstart', 'dragover', 'dragenter', 'dragleave',
    'drop', 'dragend'];
/** @enum {string} */
const DragDirection = {
    None: 'none',
    Up: 'dt-drag-row-top',
    Down: 'dt-drag-row-bottom',
    Middle: 'dt-drag-row-both',
};
/** @enum {string} */
const DropPosition = {
    Before: 'before',
    After: 'after',
    Into: 'into',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Concrete DataSource implementation for Datatable which defines state and column definition that
 * can programmatically modify rendered columns (if provided) and method for inserting and
 * and deleting records;
 *
 * All operations dealing with data use Observable<T> and instant() method to retrieve current
 * state is not implemented.
 *
 *
 */
class DT2DataSource extends DataSource {
    /**
     * @param {?=} dataProviders
     * @param {?=} finders
     */
    constructor(dataProviders, finders) {
        super(dataProviders, finders);
        this.dataProviders = dataProviders;
        this.finders = finders;
        this.initialized = false;
        this.state = Datatable2State.create();
        this.debugTime = new Date().getTime();
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    init(...args) {
        if (isBlank(args) || args.length !== 1 && !isDTInitParams(args[0])) {
            throw new Error('You need to initialize DS with (DSChooserInitParams)');
        }
        let /** @type {?} */ init = args[0];
        // use existing or find best match for dataProvider
        this.dataProvider = isPresent(init.dataProvider) ? init.dataProvider
            : this.dataProviders.find(init.obj);
        // use existing or find best match for dataFinder
        this.dataFinder = isPresent(init.dataFinder) ? init.dataFinder
            : this.finders.find(this.dataProvider, init.queryType);
        assert(isPresent(this.dataProvider) && isPresent(this.dataFinder), 'DataSource incorrectly initialized. (DataProvider, DataFinder) missing. ');
        this.dataFinder.lookupKey = init.lookupKey;
        if (isBlank(init.state)) {
            this.state = new Datatable2State();
        }
        else {
            this.state = init.state;
        }
        this.initialized = true;
    }
    /**
     * Triggers async fetch data request and result is given back using dataProvider.dataChanges
     *
     * @param {?=} withParams
     * @return {?}
     */
    fetch(withParams) {
        let /** @type {?} */ params = null;
        if (isPresent(withParams)) {
            params = new Map().set('offset', withParams.offset)
                .set('limit', withParams.limit)
                .set('orderby', withParams.sortKey)
                .set('selector', withParams.sortOrder);
        }
        this.dataProvider.fetch(params).subscribe((result) => {
            if (withParams.offset > 0) {
                let /** @type {?} */ incrData = [...this.dataProvider.dataChanges.getValue(), ...result];
                this.dataProvider.dataChanges.next(incrData);
            }
            else {
                this.dataProvider.dataChanges.next(result);
            }
        });
    }
    /**
     * Component uses this method to open up continuous stream to listen for any changes which
     * need to be reflected on the UI.
     *
     * Dont forget to unsubscribe when component is destroyed.
     * @template T
     * @return {?}
     */
    open() {
        return this.dataProvider.dataChanges.asObservable();
    }
    /**
     * @return {?}
     */
    close() {
        this.dataProvider = null;
        this.dataFinder = null;
    }
    /**
     * If CRUD is enabled we delegate calls to DataProvider that is responsible to tell the
     * dataProvider.dataChanges that are new data. If not enabled we have default implementation
     * which works with local array
     *
     * @param {?} object
     * @return {?}
     */
    insert(object) {
        if (this.dataProvider.canCRUD()) {
            this.dataProvider.insert(object);
        }
        else {
            let /** @type {?} */ copy = this.dataProvider.data().slice();
            copy.push(object);
            this.dataProvider.dataChanges.next(copy);
        }
    }
    /**
     * Please see {\@link insert} method
     *
     * @param {?} object
     * @return {?}
     */
    remove(object) {
        if (this.dataProvider.canCRUD()) {
            this.dataProvider.remove(object);
        }
        else {
            let /** @type {?} */ copy = this.dataProvider.data().slice();
            let /** @type {?} */ afterDelete = copy.filter((elem) => !equals(elem, object));
            this.dataProvider.dataChanges.next(afterDelete);
        }
    }
    /**
     *
     * Provides access to DataFinder which can accept either plain string or Map.
     *
     * To be able to provide correct input we need to ask DataFinder if it supports FullText like
     * type query or Predicate. In case of Predicate we build the Map with different key/value
     * pairs
     *
     *
     * @param {?=} pattern
     * @return {?}
     */
    find(pattern) {
        if (isBlank(pattern) || pattern.length === 0) {
            // if we received empty string return orginal list
            this.fetch(this.state);
            return;
        }
        let /** @type {?} */ searchParam = pattern;
        if (this.dataFinder.accepts(this.dataProvider, QueryType.Predicate)) {
            searchParam = new Map().set('query', pattern).set('limit', DT2DataSource.MaxLimit);
            if (isPresent(this.state.sortKey)) {
                searchParam.set('orderby', this.state.sortKey);
            }
            if (isPresent(this.state.sortKey)) {
                searchParam.set('selector', this.state.sortOrder);
            }
        }
        else {
            assert(isString(pattern), 'Cannot pass non-string value to FullText Finder');
        }
        this.dataFinder.match(searchParam).subscribe((result) => {
            this.dataProvider.dataChanges.next(result);
        });
    }
    /**
     *
     * Data source delegates the responsibility to the given data provider which needs to implement
     * specific sorting mechanism
     *
     * Todo: Extend to sort by multiple columns
     *
     * @param {?} key
     * @param {?} sortOrder
     * @return {?}
     */
    sort(key, sortOrder) {
        if (isBlank(this.dataProvider.data()) || this.dataProvider.data().length === 0) {
            return;
        }
        this.state.sortKey = key;
        this.state.sortOrder = sortOrder;
        this.fetch(this.state);
    }
    /**
     *
     * Persist db state
     *
     * @param {?} offset
     * @param {?} sortField
     * @param {?} sOrder
     * @return {?}
     */
    updateState(offset, sortField, sOrder) {
        this.state.offset = offset;
        this.state.sortKey = sortField;
        this.state.sortOrder = sOrder;
    }
    /**
     *
     * reshuffles current array based on new row D&D result.
     *
     * Since there is a difference if we move item from bottom or from the top and then accordingly
     * highlighting a space between rows. We need to reflect this in here as well.
     *
     * UseCase 1:
     *
     * 1. You can grab item with index 0 and move it down so that you can see a dropping line
     * between row with index 2 - 3
     *
     * 2. In this case splice() starts from position 2 and insert all elements after 2
     *      splice(start: number, deleteCount: number, ...items: T[]): T[];
     *
     * 3. no need to update newPos
     *
     * UseCase 2:
     *
     * 1. You can grab item with index 0 and move all the way down of the DT and now move the
     * row toward TOP and space between rows with index 2 - 3 is highlighted again.
     *
     * 2. Here is the difference, before we highlighted row #2 with line at the bottom, now
     * it seems the same but its highlighted row #3 with line at the TOP.
     *
     * * This is the reason whey we need to do newPos -= 1 or newPos += 1; depending our direction
     * where where the line between rows is created.
     *
     *
     * We don't need any complicated calculation trying to find out if we are on one half of the row
     * or second half and based on this try to apply certain style. This would not give so much
     * space if we want drop row into the row. And the calculation with coordinates woudl be too
     * complicated.
     *
     * We simply remember the direction we are moving and based on this we apply style to
     * to create a line at the TOP if we are going upwards or bottom otherwise.
     *
     *
     * @param {?} origPos
     * @param {?} newPos
     * @param {?} dropPos
     * @return {?}
     */
    reorderRows(origPos, newPos, dropPos) {
        let /** @type {?} */ array = this.dataProvider.data().slice();
        // take something from top and drag&drop under
        if (newPos > origPos && dropPos === DropPosition.Before && newPos < array.length) {
            newPos -= 1;
            // take something from bottom and drag&drop above
        }
        else if (newPos < origPos && dropPos === DropPosition.After && newPos >= 0) {
            newPos += 1;
        }
        array.splice(newPos, 0, ...array.splice(origPos, 1)[0]);
        this.dataProvider.dataChanges.next(array);
    }
}
DT2DataSource.MaxLimit = 100;
/**
 * Keeps current datatable state the state which drivers the way while fetching the data as well
 * encapsulate set of properties that needs to be persistet in order to recover a state after e.g.
 * browser refresh
 *
 *
 * todo: Create methods to convert this state from and to JSON for easier serialization
 */
class Datatable2State {
    constructor() {
        /**
         * Properties for paging and fetching
         */
        this.offset = 0;
        this.limit = 0;
        /**
         * Identifies default value that is used to render N number of rows in non-fullscreen
         * mode
         *
         */
        this.displayLimit = 0;
        /**
         * Sorting order of the sort field. DataTable support sorting for multiple column but we
         * dont persist it now. Maybe in the future
         */
        this.sortOrder = Datatable2State.Ascending;
        /**
         * If we are using global filter for current datatable then save it here
         */
        this.currentSearchQuery = '';
        this.outlineState = new Map();
        this.detailRowExpandState = new Map();
    }
    /**
     * @param {?=} offset
     * @param {?=} limit
     * @param {?=} displayLimit
     * @param {?=} sortField
     * @param {?=} sOrder
     * @param {?=} searchQuery
     * @param {?=} filter
     * @param {?=} outlineState
     * @param {?=} detailRowState
     * @return {?}
     */
    static create(offset = 0, limit = 15, displayLimit = 5, sortField = '', sOrder = 0, searchQuery, filter, outlineState = new Map(), detailRowState = new Map()) {
        let /** @type {?} */ s = new Datatable2State();
        s.offset = offset;
        s.limit = limit;
        s.displayLimit = displayLimit;
        s.sortKey = sortField;
        s.sortOrder = sOrder;
        s.currentSearchQuery = searchQuery;
        s.currentFilter = filter;
        s.outlineState = outlineState;
        s.detailRowExpandState = detailRowState;
        return s;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJSON(data) {
        let /** @type {?} */ state$$1 = JSON.parse(data);
        let /** @type {?} */ ds = new Datatable2State();
        ds.offset = state$$1.offset;
        ds.limit = state$$1.limit;
        ds.displayLimit = state$$1.displayLimit;
        ds.sortKey = state$$1.sortKey;
        ds.sortOrder = state$$1.sortOrder;
        ds.currentSearchQuery = state$$1.currentSearchQuery;
        ds.outlineState = MapWrapper.createFromAnyMap(state$$1.outlineState);
        ds.detailRowExpandState = MapWrapper.createFromAnyMap(state$$1.detailRowExpandState);
        return ds;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static toJSON(data) {
        let /** @type {?} */ toConvert = {
            offset: data.offset,
            limit: data.limit,
            displayLimit: data.displayLimit,
            sortKey: data.sortKey,
            sortOrder: data.sortOrder,
            currentSearchQuery: data.currentSearchQuery,
            outlineState: MapWrapper.toAnyMap(data.outlineState),
            detailRowExpandState: MapWrapper.toAnyMap(data.detailRowExpandState)
        };
        return JSON.stringify(toConvert);
    }
}
Datatable2State.Ascending = 1;
Datatable2State.Descending = -1;
/**
 * This needs to go to DTDataSource to keep and manage the state of the detail row. The idea is
 * simple we have a map holding item reference as a key and boolean value indicating if the
 * detail row is visible
 *
 * Todo: move this out to DS
 */
class DetailRowExpansionState {
    /**
     * @param {?} dt
     */
    constructor(dt) {
        this.dt = dt;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    itemToKey(item) {
        return isEntity(item) ? (/** @type {?} */ (item)).identity() : item;
    }
    /**
     * @return {?}
     */
    get detailExpansionEnabled() {
        return isPresent(this.expansionStates);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set detailExpansionEnabled(value) {
        if (value) {
            this.expansionStates = new Map();
        }
        else {
            this.expansionStates = null;
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    toggle(item) {
        let /** @type {?} */ key = this.itemToKey(item);
        if (!this.isExpanded(item)) {
            this.expansionStates.set(key, true);
        }
        else {
            this.expansionStates.delete(key);
        }
        this.dt.dataSource.state.detailRowExpandState = this.expansionStates;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isExpanded(item) {
        let /** @type {?} */ key = this.itemToKey(item);
        // handle special case where we collapse parent of parent while detail row is expanded
        if (this.dt.isOutline() && !this.dt.outlineState.isExpanded(key)) {
            this.expansionStates.delete(key);
            return false;
        }
        let /** @type {?} */ isOutlineExpanded = this.dt.isOutline() ? this.dt.outlineState.isExpanded(key) : true;
        return isPresent(key) && this.expansionStates.has(key);
    }
}
/**
 * @param {?} init
 * @return {?}
 */
function isDTInitParams(init) {
    return isPresent(init.obj) || isPresent(init.queryType) || isPresent(init.entity);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Column implementation for the Multiselection where we show checkbox control
 *
 *
 */
class DTMultiSelectColumnComponent extends DTColumn2Component {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env, domHandler);
        this.env = env;
        this.domHandler = domHandler;
        // default width of the selection control
        this.width = '45px';
    }
}
DTMultiSelectColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-multi-select-column',
                template: `<!--
    Manages multi selection and renders checkboxes both for header in case [showSelectAll] is
    enabled as well as each checkbox per row
-->
<ng-template #renderingTemplate let-isHeader let-isSubHeader="isSubHeader" let-column="column"
             let-dataToRender="data"
             let-level="nestingLevel"
             let-columnIndex="columnIndex"
             let-rowIndex="rowIndex">

    <ng-template *ngIf="isHeader" [ngTemplateOutlet]="colHeader"
                 [ngTemplateOutletContext]="{$implicit: isSubHeader, columnIndex:columnIndex,
                 level:level}">
    </ng-template>

    <ng-template *ngIf="!isHeader" [ngTemplateOutlet]="colBody"
                 [ngTemplateOutletContext]="{$implicit: column, level:level,
                    data:dataToRender,rowIndex:rowIndex}">
    </ng-template>
</ng-template>


<ng-template #colHeader let-isSubHeader let-columnIndex="columnIndex">
    <th [ngClass]="{'dt-is-default dt-u-unselectable-text dt-selection-column' :true,
                    'dt-cell-def': true,
                    'dt-sub-header': isSubHeader,
                    'dt-is-hidden': !dt.showSelectionColumn}" align="center">

        <ng-template [ngIf]="dt.showSelectAll">
            <aw-checkbox [type]="'action'" (action)="dt.toggleAllColumns($event)"
                         [value]="dt.isToggleAllColumnSelected()"
                         [disabled]="dt.isToggleAllColumnDisabled()">
            </aw-checkbox>
        </ng-template>

        <ng-template [ngIf]="!dt.showSelectAll">&nbsp;
        </ng-template>
    </th>

</ng-template>


<ng-template #colBody let-data="data" let-rowIndex="rowIndex" , let-level="level">

    <td #cell [class]="dynamicBodyClass(data)"
        [style.padding-left.px]="indentForControl(cell, level)"
        align="center"
        [ngClass]="{ 'dt-is-default dt-selection-column': true,
        'dt-cell-def': true,
        'dt-is-hidden': !dt.showSelectionColumn}">

        <aw-checkbox [type]="'action'" [value]="dt.isRowSelected(data)" >
        </aw-checkbox>

    </td>
</ng-template>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
DTMultiSelectColumnComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Column implementation for the SingleSelect where we show checkbox control
 *
 *
 */
class DTSingleSelectColumnComponent extends DTColumn2Component {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env, domHandler);
        this.env = env;
        this.domHandler = domHandler;
        // default width of the selection control
        this.width = '45px';
    }
}
DTSingleSelectColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-single-select-column',
                template: `<!--
    Manages multi selection and renders checkboxes both for header in case [showSelectAll] is
    enabled as well as each checkbox per row
-->
<ng-template #renderingTemplate let-isHeader let-isSubHeader="isSubHeader" let-column="column"
             let-dataToRender="data"
             let-level="nestingLevel"
             let-columnIndex="columnIndex"
             let-rowIndex="rowIndex">

    <ng-template *ngIf="isHeader" [ngTemplateOutlet]="colHeader"
                 [ngTemplateOutletContext]="{$implicit: isSubHeader, columnIndex:columnIndex,
                 level:level}">
    </ng-template>

    <ng-template *ngIf="!isHeader" [ngTemplateOutlet]="colBody"
                 [ngTemplateOutletContext]="{$implicit: column, level:level,
                    data:dataToRender,rowIndex:rowIndex}">
    </ng-template>
</ng-template>


<ng-template #colHeader let-isSubHeader let-columnIndex="columnIndex">
    <th [ngClass]="{'dt-is-default dt-u-unselectable-text dt-selection-column' :true,
                    'dt-cell-def': true,
                    'dt-sub-header': isSubHeader,
                    'dt-is-hidden': !dt.showSelectionColumn}" align="center">
        &nbsp;
    </th>

</ng-template>


<ng-template #colBody let-data="data" let-rowIndex="rowIndex" , let-level="level">

    <td #cell [class]="dynamicBodyClass(data)"
        [style.padding-left.px]="indentForControl(cell, level)"
        align="center"
        [ngClass]="{ 'dt-is-default dt-selection-column': true,
        'dt-cell-def': true,
        'dt-is-hidden': !dt.showSelectionColumn}">

        <aw-radiobutton [name]="'DTRadio'" [value]="data" [(ngModel)]="dt.dataSource.state.selection">
        </aw-radiobutton>
    </td>
</ng-template>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
DTSingleSelectColumnComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * DT component that implements the data grid that shows tabular data. Even the basic
 * structure is based on PrimeNG datatable its completely refactored into smaller pieces that
 * allows more extensibility and trying to stay as close as possible to existing AWL implementation
 *
 * There are 3 main pieces:
 *
 *  Table Wrapper - focuses on the outer structure. Container with basic datable layout plus
 *  contains any additional panels that datatable needs such as our new concept how editing will
 *  work - sliding panel from the bottom
 *
 *  Datatable Column - Instead of rendering everything inside DT I split the part that renders
 *  column into separate component. This way component column has its own renderer template which
 *  can render both header and data cells.
 *  Later on DTColumn is then extended to support other additional column types
 *  SingleSelectionColumn, MultiSelectionColumn, both responsible for rendering selection controls.
 *
 * To support pivotal layout this can be extended for other additional columns that implements their
 * own rendering templates
 *
 * Datatable - The main component that is only focus on header and body rendering and basaed on the
 * column type it will render the correct template
 * column type it will render the correct template
 *
 *
 *
 *
 *
 */
class Datatable2Component extends BaseComponent {
    /**
     *
     * In case of outline table we are inject OutlineState which is provided in the DT component
     * definition. This is used by nested outlineFor component it set itself as reference and
     * initialize the state so it can be used later on inside OutlineControl
     *
     *
     * Each Datatable is pre-defaulted with its own version of DataSource so all the observers
     * inside are unique for this component
     *
     * @param {?} env
     * @param {?} el
     * @param {?} _defaultDS
     * @param {?} changeDetector
     * @param {?} factoryResolver
     * @param {?} outlineState
     * @param {?} zone
     * @param {?} injector
     */
    constructor(env, el, _defaultDS, changeDetector, factoryResolver, outlineState, zone, injector) {
        super(env);
        this.env = env;
        this.el = el;
        this._defaultDS = _defaultDS;
        this.changeDetector = changeDetector;
        this.factoryResolver = factoryResolver;
        this.outlineState = outlineState;
        this.zone = zone;
        this.injector = injector;
        /**
         *  Hides or shows table heading where we have filters and tools menus
         */
        this.showTableHeader = true;
        /**
         * See AWDataTable
         *
         */
        this.pivotalLayout = false;
        /**
         * See AWDataTable
         */
        this.initialSortOrder = 'descending';
        /**
         * When DT is loaded in the page and we are not in the full screen (full page mode), this
         * is hte number of lines that DT will show
         *
         * todo: come up with better name
         */
        this.displayRowSize = 10;
        /**
         * Used for paging on lazy loading using infinite scroller to set initial fetch limit size
         *
         * todo: come up with better name !!!
         *
         */
        this.pageSize = 15;
        /**
         * Default message when there are no data .
         *
         * todo: Use i18n value and create resource file
         */
        this.emptyMessage = 'No records found';
        /**
         *
         * See AWDataTable
         *
         */
        this.selectionMode = 'none';
        /**
         *
         * Can provide custom icon. These icons are not animated divs, we used css
         * transformation to rotate them.
         *
         */
        this.loadingIcon = 'icon-synchronize';
        /**
         * Additional indent can be added when rendering detail row
         */
        this.indentDetailRow = false;
        /**
         * See AWDataTable
         *
         */
        this.indentationPerLevel = 25;
        /**
         *
         *  SubHeader is used to show summary columns, which in our UX is shown at the top just under
         *  the regular table header
         *
         */
        this.showSubHeader = false;
        /**
         * See OutlineFor - only used in the tree mode
         */
        this.expandAll = false;
        /**
         * See AWDataTable
         */
        this.pushRootSectionOnNewLine = true;
        /**
         * Render or hide expansion control for row detail columns. Expansion control makes sense for
         * simple table, when using this inside outline (tree table), its driven by outline control
         */
        this.showRowDetailExpansionControl = true;
        /**
         * See AWDataTable
         *
         */
        this.showSelectionColumn = true;
        /**
         * See AWDataTable
         *
         */
        this.showSelectAll = true;
        /**
         * Show or hide global search term input field in the header
         */
        this.showGlobalSearch = true;
        /**
         * Enables or disables row reordering
         *
         */
        this.dndRowEnabled = false;
        /**
         *
         * Fires event that sorting is enabled for column and we trigger sorting
         *
         */
        this.onSort = new EventEmitter();
        /**
         * Based on selection mode it triggers even
         *
         */
        this.onRowClick = new EventEmitter();
        /**
         *
         * When multi or single selection mode is enabled it will trigger event when checkbox or
         * radio buttons is selected
         *
         * todo: implement SingleSelectionDTColumn, MultiSelectionDTColumn with their renderers
         */
        this.onRowSelectionChange = new EventEmitter();
        /**
         * When cell body selection changes we fire event
         *
         */
        this.onCellChange = new EventEmitter();
        /**
         * When cell header selection changes we fire event
         *
         */
        this.onHeaderSelection = new EventEmitter();
        /**
         *
         * Triggers when items in the list are updated
         *
         */
        this.valueChange = new EventEmitter();
        this.classList = 'w-datatable ';
        /**
         *  Indicates that columns were initialed Also used when we hide and show column to trigger
         *  change.
         *
         */
        this.columnsChanged = false;
        /**
         * See AWDataTable
         */
        this.numberOfColsBeforeData = 0;
        /**
         * See AWDataTable
         */
        this.startOfFirstDataColumn = 0;
        this.dataSource = this._defaultDS;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isPresent(this.list) && isPresent(this.destinationClass)) {
            throw new Error('You cannot use both bindings [list] and [destinationClass]!');
        }
        this.detailRowExpansionState = new DetailRowExpansionState(this);
        // init default columns
        this.rowDetailExpandColumn = this.factoryResolver
            .resolveComponentFactory(DTDetailRowExpanderComponent).create(this.injector).instance;
        this.multiSelectColumn = this.factoryResolver
            .resolveComponentFactory(DTMultiSelectColumnComponent).create(this.injector).instance;
        this.singleSelectColumn = this.factoryResolver
            .resolveComponentFactory(DTSingleSelectColumnComponent).create(this.injector).instance;
        /**
                 * If the data are not deferred and we get list directly then it creates DS. If
                 * ngOnChanges is called first we properly init DS and clean this.list
                 *
                 */
        if (isPresent(this.destinationClass) || isPresent(this.list)) {
            this.initDatasource();
        }
        else if (this.dataSource.initialized) {
            this.initDatasource(false);
        }
        // since we work with references let's pass created map inside our state
        this.outlineState.expansionStates = this.state.outlineState;
    }
    /**
     * When data arrives later maybe due to REST API latency, initialize DS only when we have a
     * data, otherwise if data changed thru the bindings just trigger dataChange event
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (changes['list'] && isPresent(changes['list'].currentValue)
            && !this.dataSource.initialized) {
            this.initDatasource();
        }
        else if (this.dataSource.initialized) {
            this.dataSource.dataProvider.dataChanges.next(this.list);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // make sure we init a state when detail column is present
        // todo: move this initialization to datasource
        this.detailRowExpansionState.detailExpansionEnabled = isPresent(this.rowDetailColumn);
        this.initColumns();
        this.columnsSubscription = this.colsQuery.changes.subscribe(_ => {
            this.initColumns();
            this.changeDetector.markForCheck();
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // assign it programatically as we want to have a context for the filter
        if (isPresent(this.rowDetailColumn) && isPresent(this.outlineState.outlineFor)) {
            this.outlineState.outlineFor.filterOut = this.skipOutlineItem.bind(this);
        }
        if (isPresent(this.outlineState.outlineFor)) ;
        this.initialized = true;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.columnsChanged && this.el.nativeElement.offsetParent) {
            this.columnsChanged = false;
        }
        if (this.hasFrozenColumns()) {
            this.frozenColumns.forEach((col, index) => col.postInitialize(index));
        }
        else {
            this.columns.forEach((col, index) => col.postInitialize(index));
        }
    }
    /**
     * Key entry method that initialized our columns. Later on when we will support selection and
     * multiselection we will programmatically instantiate SingleSelection, MultiSelection column
     * components and add them to the list so they can be rendered.
     *
     * so the idea here is:
     *
     * When DT component initialize and we are in editing mode and we support Single/Multi selection
     * we will use ComponentFactoryResolver to create component and add it as first item to the list
     * and then it will be rendered just like anythign else.
     *
     * @return {?}
     */
    initColumns() {
        this.columns = [];
        this.frozenColumns = [];
        if (this.detailRowExpansionState.detailExpansionEnabled) {
            this.initDetailColumnExpansion();
        }
        if (this.hasLeadingSelectColumn() && this.selectionMode === 'multi') {
            this.columns.push(this.multiSelectColumn);
        }
        else if (this.hasLeadingSelectColumn() && this.selectionMode === 'single') {
            this.columns.push(this.singleSelectColumn);
        }
        /**
                 * Add expansion column when detail row is enabled
                 */
        if (this.detailRowExpansionState.detailExpansionEnabled && !this.isOutline()) {
            this.columns.push(this.rowDetailExpandColumn);
        }
        this.colsQuery
            .filter((col1) => !col1.frozen)
            .forEach((col) => {
            col.initialize(this);
            this.columns.push(col);
        });
        this.initFrozenColumns();
        this.initColumnInfo();
        this.columnsChanged = true;
    }
    /**
     * Makes sure that we also include programmatic column if present. Move them to the correct
     * array
     *
     * @return {?}
     */
    initFrozenColumns() {
        this.colsQuery
            .filter((col1) => col1.frozen)
            .forEach((col) => {
            col.initialize(this);
            this.frozenColumns.push(col);
        });
        if (this.frozenColumns.length > 0) {
            // find last index of column that is internal / programmatic
            let /** @type {?} */ lastInx = this.columns.slice()
                .reverse()
                .findIndex((col) => this.isInternalColumn(col));
            if (lastInx !== -1) {
                let /** @type {?} */ idx = this.columns.length - 1 - lastInx;
                let /** @type {?} */ internalCols = this.columns.splice(0, idx + 1);
                this.frozenColumns = [...internalCols, ...this.frozenColumns];
            }
            let /** @type {?} */ hasValidCols = this.columns
                .findIndex((col) => isBlank(col.width)) === -1;
            assert(hasValidCols || isPresent(this.scrollWidth), 'When using [frozen] binding you need specify [width] for each ' +
                'column or [scrollWidth] on datatable!');
            assert(isBlank(this.rowDetailColumn), 'You cannot combine aw-dt-detail-column with frozen columns!');
        }
    }
    /**
     * Check if current column is programmatically created
     *
     * @param {?} col
     * @return {?}
     */
    isInternalColumn(col) {
        return col instanceof DTSingleSelectColumnComponent ||
            col instanceof DTMultiSelectColumnComponent ||
            col instanceof DTDetailRowExpanderComponent;
    }
    /**
     * Create new Datasource based on passed values. It tries to initialize DS for first time
     * inside the ngInit but in case Data arrives later maybe due to some REST API calls this
     * can be triggered also from ngOnChanges.
     *
     * @param {?=} initialize
     * @return {?}
     */
    initDatasource(initialize = true) {
        if (isBlank(this.state)) {
            this.state = Datatable2State.create(0, this.pageSize, this.displayRowSize, this.initialSortKey, this.sortOrderingForString(this.initialSortOrder));
        }
        else {
            this.state.limit = this.state.displayLimit = this.displayRowSize;
            if (isPresent(this.initialSortKey)) {
                this.state.sortKey = this.initialSortKey;
                this.state.sortOrder = this.sortOrderingForString(this.initialSortOrder);
            }
        }
        if (initialize) {
            this.dataSource.init({
                obj: isPresent(this.destinationClass) ? this.destinationClass : this.list,
                queryType: QueryType.FullText,
                state: this.state,
                multiselect: false
            });
        }
        this.dataSource.fetch(this.state);
        // reset list to make sure it comes from DataProvider, we use list  to initialize
        this.list = null;
        // This is the ENTRY point for the DATA CHANGES. All addition, edits, deletion ends up
        // here. We dont work directly with LIST. Any change is reactive and here is listener
        this.dataSource.open().subscribe((data) => {
            this.updateList(data);
        });
    }
    /**
     * When detailRow column is present we initialize a state holding information which item is
     * expanded.
     *
     * todo: This is temporary here and once we suport lazy loading move this to datasource.
     *
     * For example for outline tree table we need to connect a state from outline with a state in
     * here as we are using outline control to expand and collapse items
     * @return {?}
     */
    initDetailColumnExpansion() {
        this.detailRowExpansionState.detailExpansionEnabled = isPresent(this.rowDetailColumn) &&
            BooleanWrapper.isTrue(this.showRowDetailExpansionControl);
    }
    /**
     * This method is executed after we initialize all the columns in order to calculate correct
     * numbers used for indentation while rendering selection columns as well as detail row columns.
     *
     * Here we need to be aware how many columns to span
     *
     * @return {?}
     */
    initColumnInfo() {
        this.numberOfColsBeforeData = 0;
        this.columns.forEach((col) => {
            if (!col.isValueColumn()) {
                this.numberOfColsBeforeData++;
            }
        });
        if (this.indentDetailRow) {
            this.numberOfColsBeforeData++;
        }
        this.startOfFirstDataColumn = this.columns.length - this.numberOfColsBeforeData;
    }
    /**
     * Pushes a state out to application. Can be use as two way bindings
     *
     * [(state)]=dtState(s)
     *
     * @return {?}
     */
    get state() {
        return this.dataSource.state;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set state(val) {
        this.dataSource.state = val;
    }
    /**
     * See AWDataTable
     *
     * @param {?} cell
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    onCellSelectionChange(cell, column, item) {
        if (this.selectionMode !== 'cell') {
            return;
        }
        let /** @type {?} */ lookupKey = {
            col: column.key || column.label,
            item: item
        };
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {
            let /** @type {?} */ foundIndex = ListWrapper.findIndexComplex(this.state.selection, lookupKey);
            let /** @type {?} */ isSelected = foundIndex !== -1;
            if (isSelected) {
                this.state.selection = this.state.selection
                    .filter((val, index) => index !== foundIndex);
            }
            else {
                this.state.selection = [...this.state.selection, lookupKey];
            }
        }
        else {
            this.state.selection = [lookupKey];
        }
        this.onCellChange.emit(this.state.selection);
    }
    /**
     * See AWDataTable
     *
     * @param {?} cell
     * @param {?} column
     * @return {?}
     */
    onHeaderSelectionChange(cell, column) {
        if (isPresent(this.state.headerSelection)) {
            if (this.isHeaderSelected(column)) {
                this.state.headerSelection = null;
            }
            else {
                this.state.headerSelection = column;
            }
        }
        else {
            this.state.headerSelection = column;
        }
        this.onHeaderSelection.emit(this.state.headerSelection);
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    onHandleRowClicked(event, item) {
        // special alt key modifier. When used with rows it indicates there is a D&D enabled
        if (event.altKey) {
            return;
        }
        if (this.selectionMode === 'multi') {
            this.onRowToggle(event, item);
        }
        else if (this.selectionMode === 'single') {
            this.onRowSelect(event, item);
        }
    }
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    onRowToggle(event, item) {
        let /** @type {?} */ rowSelected = true;
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {
            let /** @type {?} */ foundIndex = ListWrapper.findIndexComplex(this.state.selection, item);
            let /** @type {?} */ isSelected = foundIndex !== -1;
            if (isSelected) {
                this.state.selection = this.state.selection
                    .filter((val, index) => index !== foundIndex);
                rowSelected = false;
            }
            else {
                this.state.selection = [...this.state.selection, item];
            }
            // for the outline go up and down the sync with treeitems
            if (this.isOutline()) {
                this.onHandleOutlineRowToggleToChildren(item, isSelected);
                this.oHandleOutlineRowToggleToParent(item, isSelected);
            }
        }
        else {
            this.state.selection = [item];
            if (this.isOutline()) {
                this.onHandleOutlineRowToggleToChildren(item, false);
                this.oHandleOutlineRowToggleToParent(item, false);
            }
        }
        this.onRowSelectionChange.emit({
            isSelected: rowSelected,
            item: this.state.selection
        });
        event.stopPropagation();
    }
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    onRowSelect(event, item) {
        this.state.selection = item;
        event.stopPropagation();
        this.onRowSelectionChange.emit(item);
    }
    /**
     * See AWDataTable
     *
     * @param {?} currentItem
     * @param {?} isSelected
     * @return {?}
     */
    onHandleOutlineRowToggleToChildren(currentItem, isSelected) {
        let /** @type {?} */ childrenForNode = this.children.apply(this.context, [currentItem]) || [];
        if (childrenForNode.length > 0) {
            // If is selected currently then toggle to other state
            if (!isSelected) {
                // when checking all from root, deselect children and add all
                this.onHandleOutlineRowToggleToChildren(currentItem, true);
                this.state.selection = [...this.state.selection, ...childrenForNode];
            }
            else {
                // remove each child
                for (let /** @type {?} */ child of childrenForNode) {
                    let /** @type {?} */ foundIndex = ListWrapper.findIndexComplex(this.state.selection, child);
                    this.state.selection = this.state.selection
                        .filter((val, index) => index !== foundIndex);
                }
            }
            // apply the same for children of children
            for (let /** @type {?} */ child of childrenForNode) {
                this.onHandleOutlineRowToggleToChildren(child, isSelected);
            }
        }
    }
    /**
     * See AWDataTable
     *
     * @param {?} currentItem
     * @param {?} isSelected
     * @return {?}
     */
    oHandleOutlineRowToggleToParent(currentItem, isSelected) {
        let /** @type {?} */ parent = currentItem.$$parentItem;
        if (isPresent(parent)) {
            let /** @type {?} */ childrenForNode = this.children.apply(this.context, [parent]) || [];
            let /** @type {?} */ allSelected = true;
            for (let /** @type {?} */ child of childrenForNode) {
                allSelected = ListWrapper.findIndexComplex(this.state.selection, child) !== -1
                    && allSelected;
            }
            if (!isSelected) {
                if (allSelected) {
                    this.state.selection.push(parent);
                }
            }
            else {
                if (!allSelected) {
                    let /** @type {?} */ parentIndex = ListWrapper.findIndexComplex(this.state.selection, parent);
                    this.state.selection = this.state.selection
                        .filter((val, index) => index !== parentIndex);
                }
            }
            this.oHandleOutlineRowToggleToParent(currentItem.$$parentItem, isSelected);
        }
    }
    /**
     * See AWDataTable
     *
     * @param {?} origPos
     * @param {?} newPos
     * @param {?} dropPos
     * @return {?}
     */
    onDnDRowDrop(origPos, newPos, dropPos) {
        if (isPresent(this.dataSource)) {
            console.log('Dropping row #: ', origPos + ' ' + dropPos + ' row #: ' + newPos);
            this.dataSource.reorderRows(origPos, newPos, dropPos);
        }
    }
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @return {?}
     */
    onOutlineExpandChange(event) {
        let /** @type {?} */ item = event.item;
        // We dont really need to store a state form outline locally as we are using the same object
        // reference
        // this.state.outlineState = this.outlineState.expansionStates;
        if (this.canUseForDetailRow(item)) {
            this.detailRowExpansionState.toggle(item);
        }
    }
    /**
     * See AWDataTable
     *
     *
     * @return {?}
     */
    sortSingle() {
        if (isPresent(this.list) && isPresent(this.sortColumn)) {
            assert(isPresent(this.sortColumn.key), 'Invalid column to sort');
            this.dataSource.sort(this.sortColumn.key, this.sortColumn.sortOrder);
            this.onSort.emit({
                field: this.sortColumn.key,
                order: this.sortColumn.sortOrder
            });
        }
    }
    /**
     * See AWDataTable
     *
     * @return {?}
     */
    handleDataChange() {
        if (this.state.sortKey || this.sortColumn) {
            if (!this.sortColumn && this.columns) {
                this.sortColumn = this.columns.find(col => col.key === this.state.sortKey);
            }
        }
        this.updateDataToRender();
        this.valueChange.emit(this.list);
    }
    /**
     * @param {?=} datasource
     * @return {?}
     */
    updateDataToRender(datasource) {
        this.dataToRender = datasource || this.list;
        // this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
    }
    /**
     * Updates current immutable list and trigger change detection. Need to wrap it with
     * setTimeout as the change can easily come after view checked and this would result some errors
     *
     * @param {?} newList
     * @return {?}
     */
    updateList(newList) {
        setTimeout(() => {
            this.list = newList;
            this.handleDataChange();
        });
    }
    /**
     * @return {?}
     */
    reset() {
        this.sortColumn = null;
        this.updateDataToRender();
    }
    /**
     * See AWDataTable
     * @param {?} item
     * @return {?}
     */
    isHeaderSelected(item) {
        if (isBlank(this.state.headerSelection)) {
            return false;
        }
        let /** @type {?} */ colMatched = item.key || item.label;
        let /** @type {?} */ currentCol = this.state.headerSelection.key || this.state.headerSelection.label;
        return colMatched === currentCol;
    }
    /**
     *
     * See AWDataTable
     *
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    isBodyCellSelected(column, item) {
        let /** @type {?} */ lookupKey = {
            col: column.key || column.label,
            item: item
        };
        return isPresent(this.state.selection) &&
            ListWrapper.findIndexComplex(this.state.selection, lookupKey) !== -1;
    }
    /**
     *  See AWDataTable
     *
     * @param {?} item
     * @return {?}
     */
    isRowSelected(item) {
        if (this.hasLeadingSelectColumn() && isPresent(this.state.selection)) {
            if (this.selectionMode === 'multi') {
                return ListWrapper.findIndexComplex(this.state.selection, item) !== -1;
            }
            else if (this.selectionMode === 'single') {
                return equals(this.state.selection, item);
            }
        }
        return false;
    }
    /**
     *
     * Do we have data to render Used inside template to tell if we should use the NoData template
     *
     * @return {?}
     */
    isEmpty() {
        return isBlank(this.dataToRender) || (this.dataToRender.length === 0);
    }
    /**
     * @return {?}
     */
    hasFrozenColumns() {
        return isPresent(this.frozenColumns) && this.frozenColumns.length > 0;
    }
    /**
     * See AWDataTable
     * @return {?}
     */
    hasInvisibleSelectionColumn() {
        return this.hasLeadingSelectColumn() && !this.showSelectionColumn;
    }
    /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    hasLeadingSelectColumn() {
        return this.selectionMode !== 'none' && this.selectionMode !== 'cell';
    }
    /**
     * @return {?}
     */
    visibleColumns() {
        return this.columns ? this.columns.filter(c => c.isVisible) : [];
    }
    /**
     * See AWDataTable
     *
     * @param {?} direction
     * @return {?}
     */
    sortOrderingForString(direction) {
        if (isBlank(direction) || direction === 'ascending') {
            return 1;
        }
        if (isBlank(direction) || direction === 'descending') {
            return -1;
        }
        // todo: log bad key
        return 1;
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    sortOrderingForNumber(direction) {
        if (isBlank(direction) || direction === 1) {
            return 'ascending';
        }
        if (isBlank(direction) || direction === -1) {
            return 'descending';
        }
        // todo: log bad key
        return 'ascending';
    }
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @return {?}
     */
    toggleAllColumns(event) {
        let /** @type {?} */ currentItems = this.dataToRender || [];
        let /** @type {?} */ selectedObject = this.state.selection || [];
        if (selectedObject.length >= currentItems.length) {
            this.state.selection = [];
        }
        else {
            this.state.selection = [];
            this.state.selection = [...currentItems];
        }
    }
    /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    isToggleAllColumnSelected() {
        let /** @type {?} */ currentItems = this.dataToRender || [];
        let /** @type {?} */ selectedObject = this.state.selection || [];
        return currentItems.length > 0 && selectedObject.length >= currentItems.length;
    }
    /**
     * @return {?}
     */
    isToggleAllColumnDisabled() {
        let /** @type {?} */ currentItems = this.dataToRender || [];
        return currentItems.length === 0;
    }
    /**
     *
     * Used by template to decide if we need to render DetailRow template. We need to have
     * DetailRow ContentChild and using DetailRow component [isVisibleFn] function binding we
     * check if the item that is about to be rendered is eligible for detail row
     *
     * @param {?} item
     * @return {?}
     */
    showDetailColumn(item) {
        if (this.canUseForDetailRow(item) && this.detailRowExpansionState.isExpanded(item)) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    canUseForDetailRow(item) {
        return isPresent(this.rowDetailColumn) &&
            (/** @type {?} */ (this.rowDetailColumn)).showDetailRow(item);
    }
    /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    isOutline() {
        return isPresent(this.children);
    }
    /**
     *
     * When dealing with detail column (detail row) and outline all together we need have a
     * mechanism to tell to the outline "don't render the next level of items" and use detail row.
     * So certain item type needs to be skipped.
     *
     * The way we skip those item is we use isVisibleFn condition of the detail row and look ahead
     * if we should skip next level.
     *
     * @param {?} item
     * @return {?}
     */
    skipOutlineItem(item) {
        return this.canUseForDetailRow(item);
    }
    /**
     *
     * See AWDaTable
     *
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    getValue(data, field) {
        return FieldPath.getFieldValue(data, field);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
    }
}
Datatable2Component.decorators = [
    { type: Component, args: [{
                selector: 'aw-datatable2',
                template: `<!--
    This template focus only on header and body rendering.

    This datatable also supports frozen column and for this rendering it is pretty much transparent
    as it received sets of column that it needs to render from the TableWrapper.

    TableWrapper in case of frozen columns calls #headerRows and #bodyRows templates twice to
    render to separate tables where one has frozen columns and another one has the rest and its
    scrollable
-->

<aw-dt-wrapper #dtWrapper>
    <ng-template #headingArea>
        <ng-content select="aw-dt-header2"></ng-content>
    </ng-template>

    <ng-template #headerRows let-colsToRender let-frozenView="frozenColumns">
        <ng-container
            *ngTemplateOutlet="header; context:{$implicit: colsToRender, frozen:frozenView }">
        </ng-container>
    </ng-template>

    <ng-template #bodyRows let-colsToRender>
        <ng-template [ngIf]="isOutline()">
            <ng-container
                *ngTemplateOutlet="bodyOutline; context:{$implicit: colsToRender}"></ng-container>
        </ng-template>
        <ng-template [ngIf]="!isOutline()">
            <ng-container
                *ngTemplateOutlet="bodyPlain; context:{$implicit: colsToRender}"></ng-container>
        </ng-template>
    </ng-template>
</aw-dt-wrapper>


<!--
    Each rendering column has its own renderTemplate which define how things should be render.
    Based on different column types this code should be transparent as we dont care on this
    level what kind of column we are rendering.

    Later on when we will support single/multi selection, this will be just another column extending
    DTColumn and providing its own template

    We pass into this template if we are rendering header, subHeader, or data
-->
<ng-template #header let-colsToRender let-frozen="frozen">
    <tr>
        <ng-template ngFor let-col [ngForOf]="colsToRender" let-lastCol="last"
                     let-columnIndex="index">

            <ng-container *ngTemplateOutlet="col.rendererTemplate;
                context:{$implicit: true, isSubHeader:false,
                columnIndex:(frozen ? columnIndex: (columns.length + columnIndex))}">
            </ng-container>
        </ng-template>
    </tr>

    <tr *ngIf="showSubHeader">
        <ng-template ngFor let-col [ngForOf]="colsToRender" let-lastCol="last">
            <ng-container *ngTemplateOutlet="col.rendererTemplate;
                context:{$implicit: true, isSubHeader:true}">
            </ng-container>
        </ng-template>
    </tr>
</ng-template>


<ng-template #bodyPlain let-colsToRender>

    <tbody [ngClass]="{'dt-content dt-data-cells ': true, 'dt-is-hoverable-row': rowHover}">

    <ng-template ngFor let-rowData [ngForOf]="dataToRender" let-even="even" let-odd="odd"
                 let-rowIndex="index" [ngForTrackBy]="rowTrackBy">

        <ng-container *ngTemplateOutlet="rowTemplate; context:{$implicit: rowData, even:even,
                                          odd:odd, rowIndex:rowIndex, colsToRender:colsToRender}">
        </ng-container>

        <ng-template [ngIf]="showDetailColumn(rowData)">
            <ng-container *ngTemplateOutlet="rowDetailColumn.rendererTemplate;
                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}">
            </ng-container>
        </ng-template>

    </ng-template>
    <ng-container *ngTemplateOutlet="noData"></ng-container>
    </tbody>
</ng-template>


<ng-template #bodyOutline let-colsToRender>
    <tbody #outlineFor awOutlineFor [list]="dataToRender"
           [context]="context"
           [indentationPerLevel]="indentationPerLevel"
           [pushRootSectionOnNewLine]="pushRootSectionOnNewLine"
           [children]="children" [expandAll]="expandAll"
           [state]="outlineState"
           [ngClass]="{'dt-content dt-data-cells ': true,
                           'dt-is-hoverable-row': rowHover}"
           (onExpandChange)="onOutlineExpandChange($event)">

    <ng-template #outline let-rowData let-nestingLevel="nestingLevel" let-rowIndex="rowIndex">
        <ng-container *ngTemplateOutlet="rowTemplate;
                                context:{$implicit: rowData, nestingLevel:nestingLevel, colsToRender:colsToRender}">
        </ng-container>

        <ng-template [ngIf]="showDetailColumn(rowData)">
            <ng-container *ngTemplateOutlet="rowDetailColumn.rendererTemplate;
                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}">
            </ng-container>
        </ng-template>

    </ng-template>
    <ng-container *ngTemplateOutlet="noData"></ng-container>
    </tbody>
</ng-template>

<!--
    Default template that is display when there are no data
-->
<ng-template #noData>
    <tr *ngIf="isEmpty()" class=" dt-emptymessage-row"
        [style.visibility]="loading ? 'hidden' : 'visible'">

        <td [attr.colspan]="visibleColumns().length" class="dt-emptymessage">
            <span *ngIf="!emptyMessageTemplate">{{emptyMessage}}</span>
            <ng-container *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
        </td>
    </tr>
</ng-template>

<!--
    Template that renders actual row. Renders both header and body column. Each rendered
    column has its own template called rendererTemplate that has all things that needs to be
    rendered and we just tell the template if we are rendering header, subheader or body
-->
<ng-template #rowTemplate let-rowData let-even="event" let-odd="odd" let-rowIndex="rowIndex"
             let-nestingLevel="nestingLevel" let-colsToRender="colsToRender">


    <tr #rowElement dtDraggableRow [dndRowIndex]="rowIndex"
        class="dt-body-row"
        (click)="onHandleRowClicked($event, rowData)"
        [attr.nestingLevel]="nestingLevel"
        [ngClass]="{'dt-even-row': even, 'dt-odd-row': odd,
            'dt-row-selected': isRowSelected(rowData),
            'dt-row-draggable': dndRowEnabled,
            'dt-root-section': nestingLevel === 0 }">

        <ng-template ngFor let-col [ngForOf]="colsToRender" let-colIndex="index">
            <ng-container *ngTemplateOutlet="col.rendererTemplate;
                    context:{$implicit: false, data:rowData, rowIndex:rowIndex,
                    nestingLevel:nestingLevel}">
            </ng-container>
        </ng-template>
    </tr>
</ng-template>


`,
                styles: [`.w-datatable{position:relative;display:block;box-sizing:border-box}.w-datatable table{border-collapse:collapse;width:100%;table-layout:fixed}.w-datatable tbody,.w-datatable td,.w-datatable th{outline:0}.dt-cell-def,.dt-cell-def-selectable{border:1px solid transparent;padding:17px 16px;box-sizing:border-box}.dt-cell-def-selectable{cursor:pointer;width:100%;height:100%}th .dt-cell-def-selectable{border-width:4px 1px 1px;padding:14px 16px 17px}td .dt-cell-def-selectable{border-width:0 1px 0 5px;padding:17px 16px 17px 13px}.dt-data-cells tr.dt-is-highlight,.dt-data-cells tr.dt-is-hover{border-color:inherit;font-weight:inherit;cursor:pointer}.w-datatable-rtl{direction:rtl}.w-datatable-rtl.w-datatable-rtl.w-datatable thead th{text-align:right}.dt-root-section .dt-cell-def,.dt-root-section .dt-cell-def-selectable{background-color:#f3f6f8;padding:10px 16px;border-bottom-color:transparent;border-right-color:transparent}.dt-plain-layout .dt-is-active,.dt-plain-layout .dt-is-default,.dt-plain-layout .dt-is-highlight,.dt-plain-layout .dt-is-hover,.dt-plain-layout .dt-is-hoverable-row{border-right-color:transparent}.dt-is-active,.dt-is-default,.dt-is-highlight,.dt-is-hover,.dt-is-hoverable-row{border:1px solid #d7d7d7;background-color:#fff;color:#363636}.dt-row-selected td{background-color:rgba(238,255,238,.71)}.dt-is-active{border-color:#065d9c;color:#199de0}.dt-is-highlight{background-color:rgba(65,117,5,.18)}.dt-is-hidden{display:none}.dt-u-unselectable-text{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none}.dt-u-sortable{cursor:pointer}`],
                providers: [
                    ObjectUtils,
                    OutlineState,
                    { provide: DATA_SOURCE, useClass: DT2DataSource, deps: [DataProviders, DataFinders] },
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
Datatable2Component.ctorParameters = () => [
    { type: Environment },
    { type: ElementRef },
    { type: DT2DataSource, decorators: [{ type: Inject, args: [DATA_SOURCE,] }] },
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver },
    { type: OutlineState },
    { type: NgZone },
    { type: Injector }
];
Datatable2Component.propDecorators = {
    list: [{ type: Input }],
    destinationClass: [{ type: Input }],
    tableStyleClass: [{ type: Input }],
    bodyClassFn: [{ type: Input }],
    isRowSelectable: [{ type: Input }],
    showTableHeader: [{ type: Input }],
    pivotalLayout: [{ type: Input }],
    context: [{ type: Input }],
    initialSortOrder: [{ type: Input }],
    initialSortKey: [{ type: Input }],
    displayRowSize: [{ type: Input }],
    pageSize: [{ type: Input }],
    dataSource: [{ type: Input }],
    emptyMessage: [{ type: Input }],
    rowTrackBy: [{ type: Input }],
    rowHover: [{ type: Input }],
    loading: [{ type: Input }],
    selectionMode: [{ type: Input }],
    loadingIcon: [{ type: Input }],
    indentDetailRow: [{ type: Input }],
    indentationPerLevel: [{ type: Input }],
    showSubHeader: [{ type: Input }],
    children: [{ type: Input }],
    showExpansionControl: [{ type: Input }],
    expandAll: [{ type: Input }],
    pushRootSectionOnNewLine: [{ type: Input }],
    showRowDetailExpansionControl: [{ type: Input }],
    showSelectionColumn: [{ type: Input }],
    showSelectAll: [{ type: Input }],
    showGlobalSearch: [{ type: Input }],
    scrollWidth: [{ type: Input }],
    dndRowEnabled: [{ type: Input }],
    onSort: [{ type: Output }],
    onRowClick: [{ type: Output }],
    onRowSelectionChange: [{ type: Output }],
    onCellChange: [{ type: Output }],
    onHeaderSelection: [{ type: Output }],
    header: [{ type: ContentChild, args: [DTHeaderComponent2,] }],
    emptyMessageTemplate: [{ type: ContentChild, args: ['noDataTempl',] }],
    headerTemplate: [{ type: ContentChild, args: ['dtHeader',] }],
    subHeaderTemplate: [{ type: ContentChild, args: ['dtSubHeader',] }],
    bodyTemplate: [{ type: ContentChild, args: ['dtBody',] }],
    headerFilterTemplate: [{ type: ContentChild, args: ['headerFilter',] }],
    colsQuery: [{ type: ContentChildren, args: [DTColumn2Component,] }],
    rowDetailColumn: [{ type: ContentChild, args: [DTDetailRowComponent,] }],
    valueChange: [{ type: Output }],
    classList: [{ type: HostBinding, args: ['class',] }],
    state: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Please see datatable for more detail description. But the main goal of this wrapper to remove
 * all the common surrounding parts around the datatable and make sure DT can focus only actual
 * header and body structure
 *
 * It is expected that wrapper also provides some code for the sliding up panel containing
 * buttons and other actions that will be used during editing
 *
 *
 * Todo: Extract the expand logic out into some directive or component or just a class
 *
 */
class DTWrapper extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} render
     * @param {?} thisElement
     * @param {?} domUtils
     * @param {?} platformId
     * @param {?} dt
     */
    constructor(env, render, thisElement, domUtils, platformId, dt) {
        super(env);
        this.env = env;
        this.render = render;
        this.thisElement = thisElement;
        this.domUtils = domUtils;
        this.platformId = platformId;
        this.dt = dt;
        /**
         * Color that is used by full screen div overlay to create expanding effect which needs to have
         * little tent;
         *
         */
        this.expandColorFrom = '#f3f3f3';
        /**
         * Color that is used to set after we are in the full screen so our overlay div hide everything
         * on the page
         *
         */
        this.expandColorTo = '#FFFFFF';
        /**
         * In order to debounce the typing we need to use subject
         *
         */
        this.searchTerms = new Subject();
        /**
         *  Specifies if we are in viewing/editing mode that can browse whole dataset lazily
         *
         */
        this.isFullScreenMode = false;
        /**
         * Tells if we can support full screen mode - only available for the browser
         *
         */
        this.supportFullScreen = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.querySubscription = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300), 
        // ignore new term if same as previous term
        distinctUntilChanged(), switchMap((term) => of(term))).subscribe((term) => {
            if (term) {
                this.dt.dataSource.find(term);
            }
        });
        this.loadingSub = this.dt.valueChange
            .subscribe((data) => this.loadingFinished());
    }
    /**
     * Iterates over all columns marked as frozen and retrieve a width so we can update
     * parent div
     *
     * @return {?}
     */
    calculateFrozenWidth() {
        if (!this.dt.hasFrozenColumns()) {
            return null;
        }
        let /** @type {?} */ fWidth = 0;
        this.dt.frozenColumns.forEach((col) => {
            if (col.maxWidthPx > 0) {
                fWidth += col.widestCell;
            }
            else {
                fWidth += parseInt(col.width);
            }
        });
        return fWidth;
    }
    /**
     * When having two separate tables we need to make sure that rows of the tables are aligned.
     *
     * Therefore this method takes first column from each table read the height of the rows and set
     * the max height to both rows.
     *
     *
     * @param {?} frozenView
     * @param {?} unFrozenView
     * @return {?}
     */
    alignTablesHeights(frozenView, unFrozenView) {
        assert(isPresent(frozenView) && isPresent(frozenView), 'Cant align table views as one of the view is undefined');
        let /** @type {?} */ frozenRows = frozenView.querySelectorAll('table tr');
        let /** @type {?} */ unFrozenRows = unFrozenView.querySelectorAll('table tr');
        assert(frozenRows.length === unFrozenRows.length, 'Frozen Column: Two tables does not much!');
        Array.from(frozenRows).forEach((frozen, index) => {
            let /** @type {?} */ h = Math.max(frozen.offsetHeight, unFrozenRows[index].offsetHeight);
            frozen.style.height = h + 'px';
            unFrozenRows[index].style.height = h + 'px';
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initFullScreen();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.dt.hasFrozenColumns()) {
            let /** @type {?} */ frozenView = this.thisElement.nativeElement.querySelector('.dt-body-frozen');
            let /** @type {?} */ unFrozenView = this.thisElement.nativeElement.querySelector('.dt-body-unfrozen');
            let /** @type {?} */ frozenWidth = this.calculateFrozenWidth();
            frozenView.style.width = frozenWidth + 'px';
            if (isPresent(unFrozenView)) {
                // include border and create indent effect by having 1px white space
                unFrozenView.style.left = (frozenWidth + 2) + 'px';
                unFrozenView.style.width = unFrozenView.parentElement.offsetWidth
                    - frozenView.offsetWidth + 'px';
                this.alignTablesHeights(frozenView, unFrozenView);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        if (isPresent(this.querySubscription)) {
            this.querySubscription.unsubscribe();
        }
        if (isPresent(this.loadingSub)) {
            this.loadingSub.unsubscribe();
        }
    }
    /**
     *
     * When fullscreen functionality is enabled this method switches between norml and full screen
     * mode
     *
     * @param {?} event
     * @return {?}
     */
    toggleFullScreen(event) {
        if (this.isFullScreenMode) {
            this.closeFullScreen(event);
        }
        else {
            this.openFullScreen(event);
        }
    }
    /**
     * To push this component to full screen mode or maybe full page mode we need run following:
     *
     *  - Execute expand transformation, where we have additional overlay div that we slowly expand
     *  and this creates impression the DT is expanding
     *
     *  - apply full-screen class on top host element  - in this case its DataTable to switch
     *  to absolute positioning
     *
     *  - make sure we are scrolled all the way up
     *
     *  - hide all the elements on the page so their dimension don't interfere with this table.
     *
     *
     * @param {?} event
     * @return {?}
     */
    openFullScreen(event) {
        this.isFullScreenMode = true;
        this.runExpandEffect();
        this.originalScrollPosition = window.pageYOffset;
        window.scroll(0, 0);
        this.toggleFullScreenOnDT(true);
        // mark my element in the path that needs to stay
        let /** @type {?} */ parentNode = this.thisElement.nativeElement.parentNode;
        while (isPresent(parentNode) && parentNode.tagName !== 'BODY') {
            parentNode.classList.add('u-full-screen-element');
            parentNode = parentNode.parentNode;
        }
        this.hideNonFullScreenElement(document.body);
        this.dt.state.limit = Math.round(this.calculateLimit());
        this.dt.dataSource.fetch(this.dt.state);
        // once loaded set back correct page size we use when loading data
        this.dt.state.limit = this.dt.pageSize;
    }
    /**
     *
     * The same like above method (openFullScreen) but in reverse order.
     *
     * @param {?} event
     * @return {?}
     */
    closeFullScreen(event) {
        this.isFullScreenMode = false;
        this.showNonFullScreenElement();
        this.runCollapseEffect();
        this.toggleFullScreenOnDT(false);
        this.dt.dataSource.state.limit = this.dt.dataSource.state.displayLimit;
        this.dt.dataSource.state.offset = 0;
        this.dt.dataSource.fetch(this.dt.dataSource.state);
        setTimeout(() => {
            window.scroll(0, this.originalScrollPosition);
        }, 300);
    }
    /**
     * Creates animation effect to make it feel like the element (in this case DT) is expanding
     * from the middle to the full page mode.
     *
     * We take the dimension of the table then it is scaled slowly to the full page
     * @return {?}
     */
    runExpandEffect() {
        this.dtBoundingClientRect = this.thisElement.nativeElement.getBoundingClientRect();
        this.updateElement();
        this.dtFullScreenOverlay.nativeElement.style.backgroundColor = this.expandColorFrom;
        this.dtFullScreenOverlay.nativeElement.style.opacity = 1;
        this.applyTransformation(true);
        setTimeout(() => {
            this.dtFullScreenOverlay.nativeElement.style.backgroundColor = this.expandColorTo;
        }, 300);
    }
    /**
     * Applies the transformation and scale the helper div (overlay) down to make it look like
     * it collapses
     * @return {?}
     */
    runCollapseEffect() {
        this.updateElement();
        this.applyTransformation(false);
        setTimeout(() => {
            this.updateElement();
            this.dtFullScreenOverlay.nativeElement.style.opacity = 0;
        }, 200);
        setTimeout(() => {
            this.updateElement(this.dtBoundingClientRect.left, this.dtBoundingClientRect.top, 0, 0);
        }, 400);
    }
    /**
     * DFS  - to go thru all the element under BODY and remove them from the page.
     *
     * @param {?} parentElement
     * @return {?}
     */
    hideNonFullScreenElement(parentElement) {
        if (this.thisElement.nativeElement.parentNode === parentElement) {
            return;
        }
        for (let /** @type {?} */ i = 0; i < parentElement.children.length; i++) {
            let /** @type {?} */ element = parentElement.children[i];
            if (this.needTraverseDown(element)) {
                this.hideNonFullScreenElement(element);
            }
            else if (!element.classList.contains('dt-full-screen')) {
                element.classList.add('u-fs-element-out');
            }
        }
    }
    /**
     * Put all the element that were previously removed by hideNonFullScreenElement() back
     * @return {?}
     */
    showNonFullScreenElement() {
        Array.from(document.querySelectorAll('.u-fs-element-out'))
            .forEach((elem) => elem.classList.remove('u-fs-element-out'));
    }
    /**
     * \@Internal
     *
     * @param {?} element
     * @return {?}
     */
    needTraverseDown(element) {
        return isPresent(element) && element.tagName !== 'SCRIPT' &&
            element.classList.contains('u-full-screen-element') &&
            !element.classList.contains('dt-full-screen');
    }
    /**
     * When we enter full screen /page mode when need to calculate how many rows to load initially
     *
     * @return {?}
     */
    calculateLimit() {
        let /** @type {?} */ browserH = this.domUtils.browserDimentions().height;
        let /** @type {?} */ rowH = this.dt.el.nativeElement.querySelector('tbody tr:first-child').offsetHeight;
        return (isPresent(rowH) && rowH > 0) ? (browserH / rowH) + 20 : 50;
    }
    /**
     * \@Internal
     *
     * @param {?=} l
     * @param {?=} t
     * @param {?=} w
     * @param {?=} h
     * @return {?}
     */
    updateElement(l = this.dtBoundingClientRect.left, t = this.dtBoundingClientRect.top, w = this.dtBoundingClientRect.width, h = this.dtBoundingClientRect.height) {
        this.dtFullScreenOverlay.nativeElement.style.left = l + 'px';
        this.dtFullScreenOverlay.nativeElement.style.top = t + 'px';
        this.dtFullScreenOverlay.nativeElement.style.width = w + 'px';
        this.dtFullScreenOverlay.nativeElement.style.height = h + 'px';
    }
    /**
     * \@Internal
     *
     * @param {?} expand
     * @return {?}
     */
    applyTransformation(expand) {
        let /** @type {?} */ x, /** @type {?} */ y, /** @type {?} */ tx, /** @type {?} */ ty;
        if (expand) {
            x = window.innerWidth / this.dtBoundingClientRect.width;
            y = window.innerHeight / this.dtBoundingClientRect.height;
            tx = (window.innerWidth / 2 - this.dtBoundingClientRect.width / 2
                - this.dtBoundingClientRect.left) / x;
            ty = (window.innerHeight / 2 - this.dtBoundingClientRect.height / 2
                - this.dtBoundingClientRect.top) / y;
        }
        else {
            x = 1;
            y = 1;
            tx = this.dtBoundingClientRect.left;
            ty = this.dtBoundingClientRect.top;
        }
        this.dtFullScreenOverlay.nativeElement.style.transform =
            'scaleX(' + x + ') scaleY(' + y + ') translate3d(' + (tx) + 'px, ' + (ty) + 'px, 0px)';
    }
    /**
     * @return {?}
     */
    initFullScreen() {
        if (!isPlatformBrowser(this.platformId)) {
            this.supportFullScreen = false;
            return;
        }
        this.render.appendChild(document.body, this.dtFullScreenOverlay.nativeElement);
    }
    /**
     * Applies set of set of css properties to make the DT main component on the page expand to
     * full page mode and back
     *
     * We want to make it with little delay to let other animation finish
     * @param {?} fullScreen
     * @return {?}
     */
    toggleFullScreenOnDT(fullScreen) {
        this.dt.el.nativeElement.style.opacity = 0;
        setTimeout(() => {
            if (fullScreen) {
                this.dt.classList += 'dt-full-screen';
                this.dt.el.nativeElement.style.opacity = 1;
            }
            else {
                this.dt.classList = this.dt.classList.replace('dt-full-screen', '');
                this.dt.el.nativeElement.style.opacity = 1;
            }
        }, 200);
    }
    /**
     * Listen for infinite scroll event and request new data from data source
     *
     * @param {?} event
     * @return {?}
     */
    onLazyLoad(event) {
        if (event.isLoad) {
            this.dt.state.offset = event.offset;
            this.dt.dataSource.fetch(this.dt.state);
        }
        else {
            let /** @type {?} */ dataProvider = this.dt.dataSource.dataProvider;
            let /** @type {?} */ data = dataProvider.dataChanges.getValue();
            dataProvider.dataChanges.next(data.slice(0, event.offset));
        }
    }
    /**
     * When loading is finished mark loading icon is done so we can hide it. I am using little
     * delay to make the animation visible
     * @return {?}
     */
    loadingFinished() {
        if (isPresent(this.infiniteScroll)) {
            setTimeout(() => this.infiniteScroll.complete(), 200);
        }
    }
}
DTWrapper.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-wrapper',
                template: `<div [ngClass]="dt.styleClass" [class.dt-full-screen-mode]="isFullScreenMode"
     [style.width]="dt.width"
>
    <div class="dt-loading-overlay" *ngIf="dt.loading"></div>
    <div class="dt-loading-content" *ngIf="dt.loading">
        <i [class]="'sap-icon u-dt-spin-icon ' + dt.loadingIcon"></i>
    </div>

    <div class="dt-header" *ngIf="dt.showTableHeader">
        <ng-template *ngIf="dt.header; then appDefinedHeader else defaultHeader"></ng-template>
    </div>

    <!-- DT BODY with table headers and values -->
    <div class="dt-body-wrapper-view">
        <ng-template
            *ngIf="dt.hasFrozenColumns(); then dtBodyWithFrozenColumns else dtBodyNoFrozenColumns">
        </ng-template>
    </div>

    <!--<div class="dt-footer" *ngIf="footer">-->
    <!--&lt;!&ndash; footerArea&ndash;&gt;-->
    <!--<ng-content select="aw-dt-footer"></ng-content>-->
    <!--</div>-->
</div>

<!-- todo: dont activate this if we reached the end of list - -->
<aw-infinite-scroll #infiniteScroll *ngIf="isFullScreenMode"
                    [distance]="'10%'"
                    [fetchSize]="dt.state.limit"
                    (onLoad)="onLazyLoad($event)">
</aw-infinite-scroll>


<ng-template #appDefinedHeader>
    <ng-container *ngTemplateOutlet="heading;"></ng-container>
</ng-template>

<ng-template #defaultHeader>
    <div class="dt-global-filter">
        <span class="sap-icon icon-filter"></span>
    </div>

    <div class="dt-global-actions">
        <div class="dt-action-combo">
            <span *ngIf="supportFullScreen" class="sap-icon icon-resize"
                  (click)="toggleFullScreen($event)"></span>

            <aw-input-field *ngIf="dt.showGlobalSearch" styleClass="dt-table-search"
                            [(ngModel)]="dt.state.currentSearchQuery"
                            placeHolder="search"
                            icon="icon-search"
                            (ngModelChange)="searchTerms.next($event)">
            </aw-input-field>
            <span class="ariba-icon icon-more"></span>
        </div>
    </div>
</ng-template>


<ng-template #dtBodyNoFrozenColumns>
    <!--
        For non-frozen case we also need to set TRUE as the view is actually frozen and does not
        scroll.
        We use this frozenColumns flag inside DT to properly set column index on the header level
        columnIndex:(frozen ? columnIndex: (columns.length + columnIndex))

        therefore we need to set true even in this case to return real columnIndex since we dont
        have the second table.
    -->
    <ng-container *ngTemplateOutlet="dtBody; context:{$implicit: dt.columns, frozenColumns: true }">
    </ng-container>
</ng-template>

<ng-template #dtBodyWithFrozenColumns>
    <ng-container
        *ngTemplateOutlet="dtBody; context:{$implicit: dt.frozenColumns, frozenColumns: true }">
    </ng-container>
    <ng-container
        *ngTemplateOutlet="dtBody; context:{$implicit: dt.columns, frozenColumns: false }">
    </ng-container>
</ng-template>


<ng-template #dtBody let-columns let-frozenColumns="frozenColumns">

    <div #dtContainer class="dt-body-wrapper"
         [style.width.px]="this.calculateFrozenWidth()"
         [class.dt-body-unfrozen]="dt.hasFrozenColumns() && !frozenColumns"
         [class.dt-body-frozen]="dt.hasFrozenColumns() && frozenColumns"
    >

        <table [ngClass]="dt.tableStyleClass"
               [style.width]="frozenColumns ? null : dt.scrollWidth"
               [class.dt-pivot-layout]="dt.pivotalLayout"
               [class.dt-plain-layout]="!dt.pivotalLayout && !dt.isOutline()">

            <!-- Render TH header rows-->
            <thead class="dt-thead">
                <ng-container *ngTemplateOutlet="headerRows; context:{$implicit: columns,frozenColumns:frozenColumns }">
                </ng-container>
            </thead>

            <!--
                Render data rows. For data rows we need to keep tbody tag inside DT table
                due to Outline
             -->
            <ng-container *ngTemplateOutlet="bodyRows; context:{$implicit: columns,  frozenColumns:frozenColumns }">
            </ng-container>
        </table>
    </div>
</ng-template>


<div #dtFullScreenOverlay class="dt-full-screen-overlay u-full-screen-element"></div>
`,
                styles: [`.dt-footer,.dt-header{text-align:center;padding:.5em .75em;box-sizing:border-box}.dt-footer{border-top:0}.dt-thead tr{border-width:0}.dt-body-wrapper-view{position:relative}.dt-body-wrapper{overflow:hidden;border:1px solid #d7d7d7}.dt-body-wrapper.dt-body-unfrozen{border-left-color:transparent;position:absolute;top:0;overflow-x:auto}.dt-loading-overlay{position:absolute;background-color:#9b9b9b;width:100%;height:100%;opacity:.1;z-index:1}.dt-loading-content{position:absolute;left:50%;top:25%;z-index:2}.dt-header{width:100%;display:flex;flex-flow:row nowrap;justify-content:space-between;color:#363636;border-bottom:1px solid #f1f1f1;margin-bottom:30px}.dt-header .dt-global-filter{flex:0 0;align-items:flex-start;font-size:18px}.dt-header .dt-global-actions{flex:0 0;align-items:flex-end}.dt-header .dt-action-combo{display:flex;flex-flow:row nowrap;color:#7d7d7d}.dt-header .dt-action-combo .ariba-icon,.dt-header .dt-action-combo .sap-icon{margin-left:15px;font-size:20px;align-self:center;cursor:pointer}.dt-header .dt-action-combo .dt-table-search{border-top-color:transparent;border-left-color:transparent;border-right-color:transparent}.dt-header .dt-action-combo .icon-resize{color:#4a4a4a;font-size:16px;line-height:18px;margin-right:15px}.u-dt-spin-icon{display:inline-block;-webkit-animation:2s linear infinite doSpin;animation:2s linear infinite doSpin}@-webkit-keyframes doSpin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes doSpin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.dt-full-screen-overlay{position:fixed;z-index:100;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;transition:all .4s ease-in-out}.dt-full-screen{width:98vw;z-index:120;position:absolute;top:15px;pointer-events:all;transition:opacity .5s ease-in-out}.u-fs-element-out{display:none}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
DTWrapper.ctorParameters = () => [
    { type: Environment },
    { type: Renderer2 },
    { type: ElementRef },
    { type: DomUtilsService },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: Datatable2Component, decorators: [{ type: Inject, args: [forwardRef(() => Datatable2Component),] }] }
];
DTWrapper.propDecorators = {
    expandColorFrom: [{ type: Input }],
    expandColorTo: [{ type: Input }],
    heading: [{ type: ContentChild, args: ['headingArea',] }],
    headerRows: [{ type: ContentChild, args: ['headerRows',] }],
    bodyRows: [{ type: ContentChild, args: ['bodyRows',] }],
    footer: [{ type: ContentChild, args: ['footerArea',] }],
    dtFullScreenOverlay: [{ type: ViewChild, args: ['dtFullScreenOverlay',] }],
    infiniteScroll: [{ type: ViewChild, args: ['infiniteScroll',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * This directive is responsible for checking and setting the widest content width onto
 * Column component as the widestCell property.
 *
 *
 *
 *
 */
class SetCellMaxWidthDirective {
    /**
     * @param {?} element
     * @param {?} render
     * @param {?} td
     */
    constructor(element, render, td) {
        this.element = element;
        this.render = render;
        this.td = td;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPresent(this.maxWidth) && this.maxWidth > 0) {
            let /** @type {?} */ inlineData = this.element.nativeElement.querySelector('.dt-col-cell-data');
            if (isPresent(inlineData)) {
                inlineData.style.whiteSpace = 'nowrap';
                inlineData.style.display = 'inline-block';
                let /** @type {?} */ cellWidth = inlineData.offsetWidth; // td
                inlineData.style.whiteSpace = 'normal';
                inlineData.style.display = 'inline';
                if (!this.isInThresHold(cellWidth)) {
                    return;
                }
                cellWidth += this.tdPadding();
                if (cellWidth > this.td.widthPx) {
                    if (cellWidth < this.maxWidth) {
                        this.td.widestCell = cellWidth > this.td.widestCell ? cellWidth :
                            this.td.widestCell;
                    }
                    else if (cellWidth >= this.maxWidth) {
                        this.td.widestCell = this.maxWidth > this.td.widestCell ? this.maxWidth :
                            this.td.widestCell;
                    }
                }
            }
        }
    }
    /**
     *
     * Is the new width the same as the one already set on the column? If yes then probably
     * new content does not differ that much. We still keep certain threshold as the new content
     * width might differ 1 or 2 pixes depending how set the css.
     *
     * To make sure we resize column only if necessary because it could be original size
     * is 400px but the new one is 401px since somewhere add some extra border we have this
     * safe threshold
     *
     * @param {?} newWidth
     * @return {?}
     */
    isInThresHold(newWidth) {
        if (this.td.widestCell > 0) {
            return Math.abs(this.td.widestCell - newWidth) > 3 && newWidth > this.td.widestCell;
        }
        return true;
    }
    /**
     * @return {?}
     */
    tdPadding() {
        let /** @type {?} */ computedStyle = getComputedStyle(this.element.nativeElement);
        let /** @type {?} */ cell = parseInt(computedStyle.paddingLeft) || 0;
        cell += parseInt(computedStyle.paddingRight) || 0;
        cell += parseInt(computedStyle.borderRightWidth) || 0;
        cell += parseInt(computedStyle.borderLeftWidth) || 0;
        // plus give it some little space around the text so it nots px to px inner width of the td
        // cuz it could wrap
        cell += 5;
        return cell;
    }
}
SetCellMaxWidthDirective.decorators = [
    { type: Directive, args: [{
                selector: '[maxWidth]'
            },] },
];
/** @nocollapse */
SetCellMaxWidthDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DTColumn2Component }
];
SetCellMaxWidthDirective.propDecorators = {
    maxWidth: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Directive used inside DT in order to support table rows re-ordering. This manages all the
 * D&D necessary logic for this functionality.
 *
 * [dtDraggableRow] is used inside the `rowTemplate` like this:
 *
 *
 * ```html
 *
 * <ng-template #rowTemplate let-rowData let-even='event" let-odd="odd" let-rowIndex="rowIndex"
 *              let-nestingLevel="nestingLevel" let-colsToRender="colsToRender">
 *
 *     <tr #rowElement dtDraggableRow [dndRowIndex]="rowIndex"
 *          class="dt-body-row"
 *
 *
 *
 * ```
 *
 * which enabled or disables based on the used DT binding [dndRowEnabled]. By default its disabled.
 *
 *
 *
 */
class DTDraggableRowDirective {
    /**
     * @param {?} element
     * @param {?} dt
     * @param {?} domUtils
     * @param {?} ngZone
     */
    constructor(element, dt, domUtils, ngZone) {
        this.element = element;
        this.dt = dt;
        this.domUtils = domUtils;
        this.ngZone = ngZone;
        /**
         *
         * Tells the directive if we enable middle row zone to create an effect that we are dropping
         * into the row. Used for outline DT mainly.
         *
         */
        this.dropIntoEnabled = false;
        /**
         * Current TR index number
         *
         */
        this.dndRowIndex = 0;
        /**
         * Holds information about our dragging direction UP and DOWN in order to assign correct style
         * that highlights the row at the top or bottom
         *
         */
        this.dragDir = DragDirection.None;
        /**
         * Indicates that we dragged our row and stopped in the middle of the other row
         *
         */
        this.inMiddle = false;
        /**
         *
         * Current drag Y coordinates which is used together with the dragDir when assinging dragging
         * direction.
         *
         */
        this.dragY = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.dt.dndRowEnabled) {
            this.setupEventListeners();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.dt.dndRowEnabled) {
            this.releaseEventListeners();
        }
    }
    /**
     * Setups listeners and returns handle to them so we can later on unsubscribe.
     * @return {?}
     */
    setupEventListeners() {
        this.ngZone.runOutsideAngular(() => {
            this.eventHandlers = {};
            this.eventHandlers['mousedown'] = this.onMouseDownEvent.bind(this);
            this.element.nativeElement.addEventListener('mousedown', this.eventHandlers['mousedown']);
            this.eventHandlers['dragstart'] = this.onDragStartEvent.bind(this);
            this.element.nativeElement.addEventListener('dragstart', this.eventHandlers['dragstart']);
            this.eventHandlers['dragover'] = this.onDragOverEvent.bind(this);
            this.element.nativeElement.addEventListener('dragover', this.eventHandlers['dragover']);
            this.eventHandlers['dragleave'] = this.onDragLeaveEvent.bind(this);
            this.element.nativeElement.addEventListener('dragleave', this.eventHandlers['dragleave']);
            this.eventHandlers['drop'] = this.onDropEvent.bind(this);
            this.element.nativeElement.addEventListener('drop', this.eventHandlers['drop']);
            this.eventHandlers['dragend'] = this.onDragEndEvent.bind(this);
            this.element.nativeElement.addEventListener('dragend', this.eventHandlers['dragend']);
        });
    }
    /**
     * Removes all the created listeners inside destroy() callback
     * @return {?}
     */
    releaseEventListeners() {
        DragEvents.forEach((name) => {
            document.removeEventListener('name', this.eventHandlers[name]);
        });
    }
    /**
     *
     * This is first event where we:
     *
     *  - Mark element draggable to enable D&D
     *  - Set click position relative to the middle of the current row
     *      This is mainly needed when we are trying to calculate something for
     *      dropInto row (outline)
     *
     * event.target usually contains reference to TD element
     * @param {?} event
     * @return {?}
     */
    onMouseDownEvent(event) {
        if (event.altKey && this.domUtils.hasParent(event.target, '.dt-row-draggable')) {
            this.element.nativeElement.draggable = true;
            let /** @type {?} */ elToBeDragged = this.domUtils.elementDimensions(event.target);
            this.dt.env.setValue('ddClickDeviance', (elToBeDragged.height / 2) - event.offsetY);
        }
        else {
            this.element.nativeElement.draggable = false;
        }
    }
    /**
     * This is second triggered event when the actual dragging starts. Here we need to disable
     * dragged row and save information that are common to a table.
     *
     * Marking row disabled with the style .dt-row-dragging using setTimeout is needed as
     * if we would go without it then D&D framework would create a copy of row in disabled state.
     * Now we grab a row with active state and after a 200ms delay we disable the original row.
     *
     * @param {?} event
     * @return {?}
     */
    onDragStartEvent(event) {
        setTimeout(() => {
            if (isPresent(event.target.classList)) {
                event.target.classList.add('dt-row-dragging');
            }
        }, 200);
        this.dt.env.setValue('isDragging', true);
        this.dt.env.setValue('dndId', this.dndRowIndex);
        event.dataTransfer.setData('text', this.dndRowIndex);
    }
    /**
     *
     * This events happens anytime as we drag over rows. This event triggered after certain
     * delay. In here we calculate the mouse movement to identify if we are going UP or DOWN.
     *
     * This is mainly needed to mark a row with the correct line on TOP or BOTTOM to visually
     * show a user where we are.
     *
     * Once we know the direction and the drop target is valid we mark the row with correct class
     * that does the trick
     * @param {?} event
     * @return {?}
     */
    onDragOverEvent(event) {
        event.dataTransfer.dropEffect = 'move';
        if (this.dragY < event.pageY) {
            this.dragDir = DragDirection.Down;
        }
        else if (this.dragY > event.pageY) {
            this.dragDir = DragDirection.Up;
        }
        // dont set again unless its different
        if (this.dragY !== event.pageY) {
            this.dragY = event.pageY;
        }
        if (this.isValidDropTarget(event)) {
            // todo test this preventDefault() so it does not create some sideeffect
            event.preventDefault();
            this.markRowWithClass(event, this.domUtils.closest(event.target, 'tr'));
        }
    }
    /**
     * This is finishing event just before D&D is done. It takes current information and
     * broadcast them to the DT so DT can do necessary row reordering
     *
     *
     * @param {?} event
     * @return {?}
     */
    onDropEvent(event) {
        this.clearClasses(event.target.parentElement);
        // event.preventDefault();
        let /** @type {?} */ origIndx = this.dt.env.getValue('dndId');
        let /** @type {?} */ dropPos = this.inMiddle ? DropPosition.Into : (this.dragDir === DragDirection.Up ? DropPosition.Before : DropPosition.After);
        this.dt.onDnDRowDrop(origIndx, this.dndRowIndex, dropPos);
        this.inMiddle = false;
        this.dragY = 0;
    }
    /**
     * Every time we drag over the element we apply some classes to the it. this method does the
     * opposite which is to remove everything so we are ready for the next row
     *
     *
     * @param {?} event
     * @return {?}
     */
    onDragLeaveEvent(event) {
        let /** @type {?} */ tr = this.domUtils.closest(event.target, 'tr');
        this.clearClasses(tr);
        this.dt.env.deleteValue('dndOnHoldIndex');
    }
    /**
     *
     * This is last event within D&D flow. Mainly used to clean up all the resource that has not
     * been clean up already inside onDropEvent.
     *
     * @param {?} event
     * @return {?}
     */
    onDragEndEvent(event) {
        if (isPresent(event.target.classList)) {
            event.target.classList.remove('dt-row-dragging');
        }
        this.clearClasses(event.target);
        this.element.nativeElement.draggable = false;
        this.dt.env.deleteValue('isDragging');
        this.dt.env.deleteValue('dndId');
        this.dt.env.deleteValue('ddClickDeviance');
    }
    /**
     * Assign CSS classes to the row to create an highlighting effect to capture current position
     * for the user.
     *
     * Based on the Drag direction we either apply
     * css class that creates a line on top or bottom.  Only for the dropInto functionality we
     * need to calculate some more to identify if we are really in the middle of the row.
     *
     * DropInto:
     * ---------
     *
     * Initially we captured a position (in mousedown) the distance to the middle of the row and
     * this we are using here with some threshold of 2 pixes so we dont have to be exactly on pixel
     * perfect.
     *
     * - let currentTrCenter = this.domUtils.elementDimensions(activeRow).height / 2;
     *      Read center of current row
     *
     * - let draggedTrCenter = event.offsetY + this.dt.env.getValue('ddClickDeviance');
     *      Read mouse coordinates relative to current row/td and add to it our deviation.
     *
     *
     * @param {?} event
     * @param {?} activeRow
     * @return {?}
     */
    markRowWithClass(event, activeRow) {
        this.clearClasses(activeRow);
        // Check if drag item is in the middle of other row
        let /** @type {?} */ currentTrCenter = this.domUtils.elementDimensions(activeRow).height / 2;
        let /** @type {?} */ draggedTrCenter = event.offsetY + this.dt.env.getValue('ddClickDeviance');
        if (this.dropIntoEnabled) {
            this.inMiddle = Math.abs(currentTrCenter - draggedTrCenter) < 2;
        }
        if (this.inMiddle) {
            activeRow.classList.add(DragDirection.Middle);
        }
        else {
            activeRow.classList.add(this.dragDir);
        }
    }
    /**
     *
     * Drop target must be only another TR and it cannot be the element itself the one we are
     * dragging and it does not make sense to allow to drop to the same position we started from
     *
     * @param {?} event
     * @return {?}
     */
    isValidDropTarget(event) {
        let /** @type {?} */ origInx = this.dt.env.getValue('dndId');
        let /** @type {?} */ siblingRow = this.dndRowIndex - origInx;
        return event.target.parentElement.tagName === 'TR' && this.dndRowIndex !== origInx &&
            !(siblingRow === 1 && this.dragDir === DragDirection.Up) &&
            !(siblingRow === -1 && this.dragDir === DragDirection.Down);
    }
    /**
     *  private
     *
     * @param {?} tr
     * @return {?}
     */
    clearClasses(tr) {
        tr.classList.remove('dt-drag-row-top');
        tr.classList.remove('dt-drag-row-bottom');
        tr.classList.remove('dt-drag-row-both');
    }
    /**
     *  private
     *
     * @return {?}
     */
    dragDirToString() {
        switch (this.dragDir) {
            case DragDirection.Up:
                return 'Up';
            case DragDirection.Down:
                return 'Down';
            default:
                return 'Not Sure';
        }
    }
}
DTDraggableRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dtDraggableRow]'
            },] },
];
/** @nocollapse */
DTDraggableRowDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Datatable2Component, decorators: [{ type: Inject, args: [forwardRef(() => Datatable2Component),] }] },
    { type: DomUtilsService },
    { type: NgZone }
];
DTDraggableRowDirective.propDecorators = {
    dropIntoEnabled: [{ type: Input }],
    dndRowIndex: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWDatatable2Module {
}
AWDatatable2Module.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    Datatable2Component,
                    DTWrapper,
                    DTColumn2Component,
                    DTHeaderComponent2,
                    DTDetailRowComponent,
                    DTDetailRowExpanderComponent,
                    DTMultiSelectColumnComponent,
                    DTSingleSelectColumnComponent,
                    SetCellMaxWidthDirective,
                    DTDraggableRowDirective
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    AWCoreComponentModule,
                    AWCheckBoxModule,
                    AWOutlineForModule,
                    AWRadioButtonModule,
                    AWInputFieldModule
                ],
                entryComponents: [
                    DTDetailRowExpanderComponent,
                    DTMultiSelectColumnComponent,
                    DTSingleSelectColumnComponent
                ],
                exports: [
                    Datatable2Component,
                    DTColumn2Component,
                    AWOutlineForModule,
                    DTHeaderComponent2,
                    DTDetailRowComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * An confirmation header area.
 *
 * See {\@link ConfirmationComponent} for more explanation.
 */
class ConfirmationHeaderComponent {
}
ConfirmationHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-confirmation-header',
                template: '<ng-content></ng-content>'
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * An confirmation header area.
 *
 * See {\@link ConfirmationComponent} for more explanation.
 */
class ConfirmationFooterComponent {
}
ConfirmationFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-confirmation-footer',
                template: '<ng-content></ng-content>'
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Confirmation Component is a specific version of the dialog where it supports confirm and cancel
 * functionality. It behaves like a dialog, is modal, and not closable by default.
 *
 * There are three types of popup.
 *   1.  a regular dialog box that has header, body and footer. It's the most customizable.
 *   2.  a confirmation box is similar to a dialog box but has accept and reject action buttons.
 *   3.  a overlay, which is a very basic popup with what you put inside.
 *       It doesn't have header and footer.
 *
 * There are two ways to use any popup component.
 *   1.  Either directly by using component, aw-dialog, aw-confirmation or aw-overlay
 *   2.  or the ModalService  service.open(<ConfirmationComponent>), service.close()
 *
 * Usage:
 *    1.  Using ModalService directly to display a modal popup. This usage is a quick way to show
 *        a confirmation to the user.
 *
 *          this.modalService.open<ConfirmationComponent>(ConfirmationComponent, {
 *                        title: 'Confirmation',
 *                        body: ` Are you sure ? `,
 *                        width: 300,
 *                        onConfirm: () => {
 *                              this.confirmAction();
 *                        },
 *                        onCancel: () => {
 *                              this.cancelAction();
 *                        }
 *           });
 *
 *
 *   2.   Use the component inside your template.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                              <aw-confirmation [title]="'Confirmation'"
 *                                      [(visible)]="display"
 *                                     (onConfirm)="confirmAction()"
 *                                    (onCancel)="cancelAction()">
 *                                       <i class="sap-icon icon-alert"></i>
 *                                       Are you sure you want to delete your hard drive?
 *                            </aw-confirmation>
 *
 *                                   <aw-button [size]="'small'" (click)="open()">
 *                                       Open Confirmation
 *                                   </aw-button>
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     display: boolean = false;
 *
 *                     confirmAction: string;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *
 *                     open() {
 *                        this.display = true;
 *                     }
 *
 *                     confirmAction()  {
 *                        this.confirmAction = "confirmed";
 *                      }
 *
 *                      close() {
 *                         this.display = false;
 *                      }
 *
 *                      cancelAction() {
 *                          this.confirmAction = "canceled";
 *                      }
 *
 *       }
 *
 *
 */
class ConfirmationComponent extends ModalContainer {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * support two way data binding on visible property.
         */
        this.visibleChange = new EventEmitter();
        /**
         * Whether there's an x at the top right that makes the dialog closable.
         */
        this.closable = false;
        /**
         * Event fired when dialog is closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Event fired when the dialog is opened.
         */
        this.onOpen = new EventEmitter();
        /**
         * Fired when user clicked on confirm button.
         */
        this.onConfirm = new EventEmitter();
        /**
         * Fired when user clicked on cancel button.
         */
        this.onCancel = new EventEmitter();
        this.width = 400;
        this.height = 'auto';
        // Todo: internationalize.
        this.confirmActionLabel = 'Confirm';
        this.cancelActionLabel = 'Cancel';
    }
    /**
     * open confirmation.
     * @return {?}
     */
    open() {
        this.visible = true;
        this.onOpen.emit();
        this.visibleChange.emit(true);
    }
    /**
     * close confirmation.
     * @return {?}
     */
    close() {
        this.visible = false;
        this.onClose.emit();
        // Important to make sure change is set on parent binding.
        // Otherwise, the variable and dialog open/close state can be out
        // of sync and we wouldn't trigger change detection.
        this.visibleChange.emit(false);
    }
    /**
     * Does the confirmation have header content?
     * @return {?}
     */
    hasHeader() {
        return isPresent(this.header);
    }
    /**
     * Does the confirmation have footer content?
     * @return {?}
     */
    hasFooter() {
        return isPresent(this.footer);
    }
    /**
     * Confirm action.
     * @return {?}
     */
    confirm() {
        this.close();
        this.onConfirm.emit();
    }
    /**
     * Cancel action.
     * @return {?}
     */
    cancel() {
        this.close();
        this.onCancel.emit();
    }
}
ConfirmationComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-confirmation',
                template: `<aw-dialog [title]="title" [(visible)]="visible"
           [modal]="true" [closable]="closable" [width]="width" [height]="height"
           [styleClass]="styleClass" [appendTo]="appendTo" (onOpen)="open()" (onClose)="close()">

    <aw-dialog-header *ngIf="hasHeader()">
        <ng-content select="aw-confirmation-header"></ng-content>
    </aw-dialog-header>

    {{body}}
    <ng-content></ng-content>


    <aw-dialog-footer *ngIf="hasFooter(); else defaultFooter">
        <ng-content select="aw-confirmation-footer"></ng-content>
    </aw-dialog-footer>

    <ng-template #defaultFooter>
        <aw-dialog-footer>
            <aw-button name="confirm" [style]="'primary'" (action)="confirm()">
                {{confirmActionLabel}}
            </aw-button>

            <aw-button name="cancel" [style]="'secondary'" (action)="cancel()">
                {{cancelActionLabel}}
            </aw-button>

        </aw-dialog-footer>
    </ng-template>

</aw-dialog>
`,
                styles: [`.confirmation-footer-separator{border-top:1px solid #d7d7d7;height:14px}`]
            },] },
];
/** @nocollapse */
ConfirmationComponent.ctorParameters = () => [
    { type: Environment }
];
ConfirmationComponent.propDecorators = {
    title: [{ type: Input }],
    body: [{ type: Input }],
    confirmActionLabel: [{ type: Input }],
    cancelActionLabel: [{ type: Input }],
    visibleChange: [{ type: Output }],
    closable: [{ type: Input }],
    appendTo: [{ type: Input }],
    onClose: [{ type: Output }],
    onOpen: [{ type: Output }],
    onConfirm: [{ type: Output }],
    onCancel: [{ type: Output }],
    header: [{ type: ContentChild, args: [ConfirmationHeaderComponent,] }],
    footer: [{ type: ContentChild, args: [ConfirmationFooterComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWConfirmationModule {
}
AWConfirmationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ConfirmationComponent,
                    ConfirmationHeaderComponent,
                    ConfirmationFooterComponent
                ],
                imports: [
                    CommonModule,
                    AWCoreComponentModule,
                    AWDialogModule,
                    AWButtonModule
                ],
                entryComponents: [
                    ModalComponent,
                    ConfirmationComponent,
                    ConfirmationHeaderComponent,
                    ConfirmationFooterComponent
                ],
                exports: [
                    ConfirmationComponent,
                    ConfirmationHeaderComponent,
                    ConfirmationFooterComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * Container panel providing scrolling functionality for its children. You can configure this
 * container to let it to scroll its content either horizontally, vertically or let the content
 * wrap.
 *
 *
 * Usage is pretty simple:
 *
 *  ### Example using horizontal scroll (default behavior):
 *
 *  ```
 *            <aw-scrollable>
 *                  <w-demo-card> Card 1</w-demo-card>
 *                  <w-demo-card> Card 2</w-demo-card>
 *                  <w-demo-card> Card 3</w-demo-card>
 *                  <w-demo-card> Card 4</w-demo-card>
 *                  <w-demo-card> Card 5</w-demo-card>
 *                  <w-demo-card> Card 6</w-demo-card>
 *                  <w-demo-card> Card 7</w-demo-card>
 *                  <w-demo-card> Card 8</w-demo-card>
 *                  <w-demo-card> Card 9</w-demo-card>
 *              </aw-scrollable>
 *
 *  ```
 *
 *  ### Example using vertical scroll:
 *
 *  ```
 *            <aw-scrollable [direction]="'vertical'" [height]="'40vh'">
 *                  <w-demo-card> Card 1</w-demo-card>
 *                  <w-demo-card> Card 2</w-demo-card>
 *                  <w-demo-card> Card 3</w-demo-card>
 *                  <w-demo-card> Card 4</w-demo-card>
 *                  <w-demo-card> Card 5</w-demo-card>
 *                  <w-demo-card> Card 6</w-demo-card>
 *                  <w-demo-card> Card 7</w-demo-card>
 *                  <w-demo-card> Card 8</w-demo-card>
 *                  <w-demo-card> Card 9</w-demo-card>
 *              </aw-scrollable>
 *
 * ```
 *
 *  ### Example scrolling is disabled and content wraps and centers:
 *
 *  ```
 *            <aw-scrollable [direction]="'none'" [alignment]="'center'">
 *                  <w-demo-card> Card 1</w-demo-card>
 *                  <w-demo-card> Card 2</w-demo-card>
 *                  <w-demo-card> Card 3</w-demo-card>
 *                  <w-demo-card> Card 4</w-demo-card>
 *                  <w-demo-card> Card 5</w-demo-card>
 *                  <w-demo-card> Card 6</w-demo-card>
 *                  <w-demo-card> Card 7</w-demo-card>
 *                  <w-demo-card> Card 8</w-demo-card>
 *                  <w-demo-card> Card 9</w-demo-card>
 *              </aw-scrollable>
 *  ```
 *
 * ### Height property:
 *
 * When using "horizontal scrolling" it set "flexbox-direction" to "row" where height
 * is set automatically based on its content. The height should be always 100% when using
 * this in parent container.
 *
 * If "vertical scrolling" is used you need to make sure that:
 *   - your parent container sets the boundaries with correctly set width and height
 *   otherwise it will use 100% of the viewport
 *   - if used as standalone you need to limit the height otherwise it will expand to 100% of
 *   the document
 *
 *
 *
 *
 */
class ScrollableContainerComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} elementRef
     */
    constructor(env, elementRef) {
        super(env);
        this.env = env;
        this.elementRef = elementRef;
        /**
         * Defines scrolling direction of the container meaning tells which overflow axies will be
         * disabled or enabled.
         *
         * Default value is "horizontal": Here we lock overflow-y and overflow-x set to auto.
         *
         * When scrolling direction is "vertical" please make sure you maintain correct height and
         * width.
         *
         */
        this.direction = 'horizontal';
        /**
         * Defines how flexbox container items should be aligned. Default behavior is LEFT
         *
         */
        this.alignment = 'left';
        this.height = '100%';
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initDefault();
    }
    /**
     * Make sure we re-initialize default when Input Bindings changes
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.initDefault();
    }
    /**
     * Initialize default values and Calculates layout and alignment class. The reason for using
     * these utility classes is that we can change the behavior anytime as compared to using
     * directly [style.xxx] bindings.
     *
     * ### Direction flow class:
     *  - u-scrollable-f<direction>
     *
     * ### Alignment class:
     *  - u-scrollable-a<alignment>
     *
     * @return {?}
     */
    initDefault() {
        this.layoutClass = 'u-scrollable-fh';
        if (this.direction === 'vertical') {
            this.layoutClass = 'u-scrollable-fv';
        }
        if (this.direction === 'vertical-row') {
            this.layoutClass = 'u-scrollable-fv-row';
        }
        else if (this.direction === 'both') {
            this.layoutClass = 'u-scrollable-fb';
        }
        else if (this.direction === 'none') {
            this.layoutClass = 'u-scrollable-fn';
        }
        this.layoutClass += ' u-scrollable-a' + this.alignment.substring(0, 1);
        if (isPresent(this.styleClass)) {
            this.layoutClass += ` ${this.styleClass}`;
        }
        // make sure we default width and height to some value in case somebody passes null
        if (isBlank(this.width)) {
            this.width = '100%';
        }
        if (isBlank(this.height)) {
            this.height = '100%';
        }
    }
    /**
     * Tells if the horizontal scrollbar is visible
     *
     * @return {?}
     */
    hasHorizontalScroll() {
        let /** @type {?} */ scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
        return scrollContainer.scrollWidth > scrollContainer.clientWidth;
    }
    /**
     * Tells if the vertical scrollbar is visible
     *
     * @return {?}
     */
    hasVerticalScroll() {
        let /** @type {?} */ scrollContainer = this.elementRef.nativeElement.querySelector('.w-scrollable');
        return scrollContainer.scrollHeight > scrollContainer.clientHeight;
    }
}
ScrollableContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-scrollable',
                template: `<div class="w-scrollable" [ngClass]="layoutClass" [style.width]="width"
     [style.height]="height">
    <ng-content></ng-content>
</div>
`,
                styles: [`.w-scrollable{display:flex;display:-webkit-flex;backface-visibility:hidden;-webkit-backface-visibility:hidden;will-change:overflow}.w-scrollable /deep/>*{flex:0 0 auto;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;margin:10px}.u-scrollable-fh{flex-flow:row nowrap;overflow-x:auto;overflow-y:hidden}.u-scrollable-fv{flex-flow:column nowrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fb{flex-flow:row nowrap;overflow-x:auto;overflow-y:auto}.u-scrollable-fv-row{flex-flow:row wrap;overflow-x:hidden;overflow-y:auto}.u-scrollable-fn{flex-flow:row wrap}.u-scrollable-al{justify-content:flex-start;-webkit-justify-content:flex-start}.u-scrollable-ar{justify-content:flex-end;-webkit-justify-content:flex-end}.u-scrollable-ac{justify-content:center;-webkit-justify-content:center}.u-scrollable-aj,.u-scrollable-aj-around{justify-content:space-between;-webkit-justify-content:space-between}`]
            },] },
];
/** @nocollapse */
ScrollableContainerComponent.ctorParameters = () => [
    { type: Environment },
    { type: ElementRef }
];
ScrollableContainerComponent.propDecorators = {
    direction: [{ type: Input }],
    alignment: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWScrollableContainerModule {
}
AWScrollableContainerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ScrollableContainerComponent
                ],
                imports: [
                    CommonModule
                ],
                entryComponents: [
                    ScrollableContainerComponent
                ],
                exports: [
                    ScrollableContainerComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ LB_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ListComponent),
    multi: true
};
/**
 *
 * The List component represent a structure which contains a list of selectable items. Items
 * selection can be configured in single-selection, multi-selection or multi-selection with visible
 * checkboxes mode.
 * In addition it can display data inside 3 zones LEFT, MIDDLE and RIGHT in order to provide
 * easy way for application developer to layout its own custom content or even change out of box
 * behavior.
 *
 *
 *  ### Examples
 *
 *  1. Render simple single selection list
 *
 *  ```html
 *
 *      <aw-list [list]="list"></aw-list>
 *
 *  ```
 *  2. Render list - multi selection with custom RIGHT content to show a CheckMark when item
 *  is selected
 *
 *  ```html
 *
 *   <aw-list #awlist [list]="list"
 *                       height="150px"
 *                       width="250px"
 *                       [selectionMode]="'multi'">
 *
 *                  <ng-template #right let-item>
 *
 *                      <span class="sap-icon"
 *                            [ngClass]="{'icon-accept': awlist.pListBox.isSelected(item),
 *                            '': !awlist.pListBox.isSelected(item)}">
 *
 *                      </span>
 *                  </ng-template>
 *   </aw-list>
 *
 *  ```
 *
 * 3. Render list - multi selection with visible checkboxes and custom MIDDLE content to change
 *  the way item name is rendered
 *
 *
 *
 *  ```html
 *
 *   <aw-list [list]="list" height="180px"
 *                       width="200px"
 *                       [selection]="selection"
 *                       [selectionMode]="'multiWithCheckbox'">
 *
 *                  <ng-template #middle let-item>
 *                      XX-{{item.value}}
 *                  </ng-template>
 *    </aw-list>
 *
 *  ```
 *
 *
 *
 */
class ListComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Component recognizes 3 modes: single, multi, multi with visible checkboxes
         */
        this.selectionMode = 'single';
        /**
         * Don't render Listbox border. Used for embedding this inside other components
         *
         */
        this.borderless = false;
        /**
         * Triggered when we double click on the list Item
         *
         */
        this.action = new EventEmitter();
        /**
         * Event fired when user select a item
         *
         */
        this.onSelection = new EventEmitter();
        this.listStyle = {};
        this.isMultiple = false;
        this.showCheckbox = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.isMultiple = this.selectionMode === 'multi' ||
            this.selectionMode === 'multiWithCheckbox';
        this.showCheckbox = this.selectionMode === 'multiWithCheckbox';
        // cannot have both either we use field to get display value or valueTransformer
        if (isPresent(this.field) && isPresent(this.valueTransformer)) {
            throw new Error('You can have either [field] or [valueTransformer].');
        }
        if (isPresent(this.list)) {
            this.initList();
        }
        else {
            throw new Error('Missing [list] binding.');
        }
        // Also add overflowY to make sure it can scroll and does not expand based on its content
        if (isPresent(this.height)) {
            this.listStyle['height'] = this.height;
            this.listStyle['overflow-y'] = 'auto';
        }
        if (isPresent(this.width)) {
            this.listStyle['width'] = this.width;
        }
        if (this.borderless) {
            this.listStyle['border-color'] = 'transparent';
        }
        if (this.isStandalone) {
            super.registerFormControl(this.selection);
            if (isBlank(this.selection)) {
                this.selection = this.formControl.value;
            }
        }
    }
    /**
     *
     * Since we are using <aw-checkbox> we need to have custom handling both when clicking on the
     * checkbox as well as item text.
     *
     *
     * @param {?} event
     * @param {?} item
     * @param {?} checkbox
     * @return {?}
     */
    itemClicked(event, item, checkbox) {
        if (isPresent(checkbox)) {
            this.pListBox.onCheckboxClick(event, item);
        }
        else if (isPresent(this.pListBox)) {
            this.pListBox.onOptionClick(event, item);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * Internal
     *
     * @return {?}
     */
    hasRightTempl() {
        return isPresent(this.rZoneTempl);
    }
    /**
     * @return {?}
     */
    hasLeftTempl() {
        return isPresent(this.lZoneTempl);
    }
    /**
     * @return {?}
     */
    hasMiddleTempl() {
        return isPresent(this.mZoneTempl);
    }
    /**
     *
     * Triggered by p-listbox component when item is selected. When state is managed internally
     * we also update FormControl model.
     *
     * @param {?} event
     * @return {?}
     */
    onItemSelected(event) {
        if (isBlank(event.value)) {
            return;
        }
        this.onSelection.emit(event.value);
        if (this.isStandalone) {
            this.formControl.setValue(event.value, { emitEvent: true });
        }
        this.onModelChanged(event.value);
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (!equals(value, this.selection)) {
            this.selection = value;
            if (this.isStandalone) {
                this.formControl.setValue(value);
            }
        }
    }
    /**
     * Translates external form of the list into PrimeNG expected format where it uses
     * SelectionItem interface
     * @return {?}
     */
    initList() {
        if (isPresent(this.list)) {
            this.internalList = this.list.map((item) => {
                return { label: this.displayValue(item), value: item };
            });
        }
    }
    /**
     *  Generates label value for the list box.
     *
     * @param {?} item
     * @return {?}
     */
    displayValue(item) {
        if (isBlank(item)) {
            return '';
        }
        let /** @type {?} */ val = item.toString();
        if (isPresent(this.field)) {
            val = item[this.field];
        }
        else if (isPresent(this.valueTransformer)) {
            val = this.valueTransformer(item);
        }
        return val;
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-list',
                template: `<p-listbox #listbox [options]="internalList" [multiple]="isMultiple" [checkbox]="showCheckbox"
           [(ngModel)]="selection" [disabled]="disabled" [style]="listStyle" [showToggleAll]="false"
           (onChange)="onItemSelected($event)" (onDblClick)="action.emit($event.value)"
           [styleClass]="styleClass">


    <ng-template let-item pTemplate="item">
        <div class="w-li-wrapper">
            <div class="w-li-left">
                <ng-template *ngIf="hasLeftTempl(); else defaultLeft"
                             [ngTemplateOutlet]="lZoneTempl"
                             [ngTemplateOutletContext]="{$implicit: item}"></ng-template>


                <ng-template #defaultLeft>
                    <aw-checkbox #check *ngIf="isMultiple && showCheckbox"
                                 [isStandalone]="false"
                                 [value]="listbox.isSelected(item)"
                                 type="action"
                                 (action)="itemClicked($event, item, check)">
                    </aw-checkbox>
                </ng-template>
            </div>

            <div class="w-li-middle" (click)="itemClicked($event, item, null)">

                <ng-template *ngIf="hasMiddleTempl(); else defaultMiddle"
                             [ngTemplateOutlet]="mZoneTempl"
                             [ngTemplateOutletContext]="{$implicit: item}"></ng-template>

                <ng-template #defaultMiddle>
                    {{item.label}}
                </ng-template>

            </div>

            <div class="w-li-right" *ngIf="hasRightTempl()">
                <ng-template [ngTemplateOutlet]="rZoneTempl"
                             [ngTemplateOutletContext]="{$implicit: item}">
                </ng-template>

            </div>
        </div>
    </ng-template>
</p-listbox>
`,
                styles: [`::ng-deep .ui-listbox-item>.ui-chkbox{display:none}::ng-deep .ui-listbox-item .ui-chkbox{margin-right:1em}.w-li-wrapper{display:flex;align-items:flex-start}.w-li-wrapper .w-li-left,.w-li-wrapper .w-li-right{flex:0 1 auto}.w-li-wrapper .w-li-middle{flex:1 1 auto}`],
                providers: [
                    LB_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => ListComponent) }
                ]
            },] },
];
/** @nocollapse */
ListComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
ListComponent.propDecorators = {
    list: [{ type: Input }],
    selection: [{ type: Input }],
    selectionMode: [{ type: Input }],
    valueTransformer: [{ type: Input }],
    field: [{ type: Input }],
    borderless: [{ type: Input }],
    action: [{ type: Output }],
    onSelection: [{ type: Output }],
    pListBox: [{ type: ViewChild, args: ['listbox',] }],
    lZoneTempl: [{ type: ContentChild, args: ['left',] }],
    mZoneTempl: [{ type: ContentChild, args: ['middle',] }],
    rZoneTempl: [{ type: ContentChild, args: ['right',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWListModule {
}
AWListModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ListComponent
                ],
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormsModule,
                    ListboxModule,
                    AWCheckBoxModule
                ],
                entryComponents: [
                    ListComponent
                ],
                exports: [
                    ListComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Overlay Component is a simple version of the dialog where there's only content.
 * Overlay will appear at the position where the action performed trigger an overlay.
 *
 * There are three types of popup.
 *   1.  a regular dialog box that has header, body and footer. It's the most customizable.
 *   2.  a confirmation box is similar to a dialog box but has accept and reject action buttons.
 *   3.  a overlay, which is a very basic popup with what you put inside.
 *       It doesn't have header and footer.
 *
 * There are two ways to use any popup component.
 *   1.  Either directly by using component, aw-dialog, aw-confirmation or aw-overlay
 *   2.  or the ModalService  service.open(<OverlayComponent>), service.close()
 *
 * Usage:
 *    1.  Using ModalService directly to display a modal popup. The usage is a little tricky
 *        because angular currently doesn't support dynamic content projection.
 *
 *          let overlay = this.modalService.open<OverlayComponent>(OverlayComponent, {});
 *
 *            // Add content. There's not support for dynamic content projection yet.
 *            // So have add content directly.
 *            // This is probably not the best way.
 *          overlay.instance.overlay.el.nativeElement.querySelector(".ui-overlaypanel-content")
 *               .innerHTML = `<img style='width:300px;' src="sales.png" alt="Sales Chart" />`;
 *
 *          // delay the opening after ng lifecycle has been initialized.
 *          setTimeout(() => { overlay.instance.open(event); }, 1);
 *
 *
 *   2.   Use the component inside your template.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                                <aw-overlay #overlay (onOpen)="overlayAction='open'"
 *                                                     (onClose)="overlayAction='close'">
 *                                      <img src="sales.png" alt="Chart"/>
 *                                </aw-overlay>
 *
 *                                <aw-button [size]="'small'" (click)="overlay.open($event)">
 *                                    Open Overlay
 *                                </aw-button>
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     overlayAction: string;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *       }
 *
 *
 */
class OverlayComponent extends ModalContainer {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * Enables hide overlay when outside is clicked.
         */
        this.dismissable = true;
        /**
         * displays the close icon 'x' at top of right corner.
         */
        this.showCloseIcon = false;
        /**
         * Event fired when overlay is closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Event fired when the overlay is opened.
         */
        this.onOpen = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * Open Overlay
     * @param {?} event
     * @return {?}
     */
    open(event) {
        this.overlay.show(event);
        this.onOpened(null);
    }
    /**
     * Close Overlay
     * @return {?}
     */
    close() {
        this.overlay.hide();
    }
    /**
     * toggle open and close.
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        this.overlay.toggle(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onOpened(event) {
        this.onOpen.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClosed(event) {
        this.onClose.emit(event);
    }
}
OverlayComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-overlay',
                template: `<p-overlayPanel [dismissable]="dismissable" [showCloseIcon]="showCloseIcon"
                [styleClass]="styleClass" [appendTo]="appendTo"
                (onAfterHide)="onClosed($event)">
    <ng-content></ng-content>
</p-overlayPanel>
`,
                styles: [`::ng-deep .ui-overlaypanel{border:1px solid #d7d7d7;box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .ui-overlaypanel-content{padding:2em 3.4em .6em 1.43em}::ng-deep .ui-overlaypanel-close{border-radius:0;top:.5em;right:.5em}::ng-deep .ui-overlaypanel-close.ui-state-default{border:none}`]
            },] },
];
/** @nocollapse */
OverlayComponent.ctorParameters = () => [
    { type: Environment }
];
OverlayComponent.propDecorators = {
    dismissable: [{ type: Input }],
    showCloseIcon: [{ type: Input }],
    appendTo: [{ type: Input }],
    onClose: [{ type: Output }],
    onOpen: [{ type: Output }],
    overlay: [{ type: ViewChild, args: [OverlayPanel,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const HCCardPosition = {
    top: 0,
    bottom: 1,
    none: 2,
};
HCCardPosition[HCCardPosition.top] = "top";
HCCardPosition[HCCardPosition.bottom] = "bottom";
HCCardPosition[HCCardPosition.none] = "none";
/** @enum {number} */
const HCCardAlignment = {
    left: 0,
    paddedLeft: 1,
    right: 2,
    paddedRight: 3,
    default: 4,
};
HCCardAlignment[HCCardAlignment.left] = "left";
HCCardAlignment[HCCardAlignment.paddedLeft] = "paddedLeft";
HCCardAlignment[HCCardAlignment.right] = "right";
HCCardAlignment[HCCardAlignment.paddedRight] = "paddedRight";
HCCardAlignment[HCCardAlignment.default] = "default";
/**
 * Maps position to styles that are applied to the Card container. This is just to make it easier
 * as we are working with enumerations and have already enum type.
 *
 * u-hc-arrow-b: Arrow will appear at the bottom
 * u-hc-arrow-t: Arrow will appear at the top
 *
 * u-hc-shadow-t: Border shadow will appear at the top
 * u-hc-shadow-b: Border shadow will appear at the bottom
 */
const /** @type {?} */ PositionToStyle = {
    top: ' w-hc-panel-arrow u-hc-arrow-b u-hc-shadow-t',
    bottom: ' w-hc-panel-arrow u-hc-arrow-t u-hc-shadow-b',
    none: ''
};
/**
 *
 * Maps aligned Card container to custom styles in order to apply correct arrow
 *
 * -ll: Stands for Large Left (large: there is plenty of space around )
 * -lr: Stands for Large right
 * -sl: Stands for Small left (Small and resized screen where we try to fit card container
 * somewhere in between)
 * -sr: Stands for Large right
 *
 */
const /** @type {?} */ AlignmentToStyle = {
    left: ' u-hc-arrow-ll',
    right: ' u-hc-arrow-lr',
    paddedLeft: ' u-hc-arrow-sl',
    paddedRight: ' u-hc-arrow-sr',
    default: ' u-hc-arrow-ll',
};
/**
 * The HoverCard components adds hover behavior to text, the specified content is loaded
 * on the left or right side of the element.
 *
 * Todo: extends so we can wrap any element and any element can be triggering this. Not only
 * linkTitle
 *
 *
 * ### Example:
 *
 * ```
 *
 *   <aw-hover-card [linkTitle]="'Frank kolar'">
 *       <h3>My Card Title</h3>
 *       <div>
 *
 *           This is my contents
 *
 *       </div>
 *
 *
 *    </aw-hover-card>
 * ```
 *
 * By default there is [forceClose]=true which forces the user to use X close icon
 *
 *
 *
 */
class HoverCardComponent extends BaseComponent {
    /**
     * @param {?} elem
     * @param {?} env
     * @param {?} cd
     */
    constructor(elem, env, cd) {
        super(env);
        this.elem = elem;
        this.env = env;
        this.cd = cd;
        /**
         * Should we keep the hover card open and force user to manually close
         *
         */
        this.forceClose = true;
        /**
         *
         * This current workaround until we find better solution. PrimeNG overlays operates within
         * its relative element so if the overlay is wrapped inside some other relative container
         * the overlay content is croped by its parent and content is not visible.
         *
         * They have [appendTo] binding which we need to use for this purpose
         *
         */
        this.appendContentToBody = true;
        /**
         *
         * Internal style class to use to apply additional styles when it needs to show a Arrow on the
         * card
         *
         */
        this.arrowClass = '';
        this.opening = false;
        this.currrentPosition = HCCardPosition.none;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        assert(isPresent(this.linkTitle), 'You must provide [linkTitle] binding !');
        // make sure there is open HC when we start new component
        this.env.deleteValue('hc-open');
        if (!this.appendContentToBody) {
            this.appendTo = null;
        }
    }
    /**
     * As of Angular 5 we have to introduce this ViewChecked as PrimeNG does final calculation
     * during this phase.
     *
     * So now its broken down into two parts:
     *   - Apply class styles
     *   - Position it.
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.opening) {
            let /** @type {?} */ container = this.awOverlay.overlay.container;
            let /** @type {?} */ cntRect = container.getBoundingClientRect();
            if (this.currrentPosition !== HCCardPosition.none) {
                this.adjustCard(container, cntRect, this.awOverlay.overlay);
            }
            else {
                this.arrowClass = '';
            }
            this.opening = false;
        }
    }
    /**
     * Init elements BoundingClientRect that we use for calculation
     *
     * @return {?}
     */
    initElements() {
        let /** @type {?} */ titleElem = this.elem.nativeElement.querySelector('.w-hc-title');
        let /** @type {?} */ triggerElem = this.elem.nativeElement.querySelector('.sap-icon');
        this.titleAreaRect = titleElem.getBoundingClientRect();
        this.trigRect = triggerElem.getBoundingClientRect();
        this.trigIconMiddle = this.trigRect.width / 2;
    }
    /**
     *
     * Fires when user mouse over the triggering icon and opens up overlay component. To make sure
     * only one Card is opened at the time it uses Environment to save extra information for it
     *
     *
     * @param {?} event
     * @return {?}
     */
    openCard(event) {
        if (isPresent(this.awOverlay) && !this.env.hasValue('hc-open')) {
            this.awOverlay.open(event);
            this.env.setValue('hc-open', true);
        }
    }
    /**
     *
     * Fired at the end of the opening cycle when all is initialized and the card is about to
     * fade in.
     *
     * This method first simulates displaying card by setting display:block and
     * domHandler.absolutePosition so we can read dimensions and then later on position the card
     * accordingly.
     *
     * @param {?} event
     * @return {?}
     */
    cardOpened(event) {
        let /** @type {?} */ container = this.awOverlay.overlay.container;
        let /** @type {?} */ target = this.awOverlay.overlay.target;
        this.openForAdjustments(container);
        // pre-run positioning so we can calculate new coordinates
        this.awOverlay.overlay.domHandler.absolutePosition(container, target);
        let /** @type {?} */ cntRect = container.getBoundingClientRect();
        this.currrentPosition = this.positionForCard(container, cntRect);
        this.applyStyleClass(container, cntRect, this.awOverlay.overlay);
        this.closeForAdjustments(container);
        this.opening = true;
    }
    /**
     *
     * When card is closed we need to release it and delete all the references from Environment
     *
     *
     * @param {?} event
     * @return {?}
     */
    cardClosed(event) {
        this.env.deleteValue('hc-open');
    }
    /**
     *
     * Applies style.TOP and style.LEFT to the container in order to reposition it and add
     * extra arrow.
     *
     * First based on the initial position we apply style.TOP and depending if its on the
     * top or bottom we apply either -HoverCardComponent.ArrowPad or +HoverCardComponent.ArrowPad.
     *
     * Then for positioning horizontally we use two types.
     *  - When there is allot of space the arrow is 25% from the edge
     *
     *    -----^------------   or       -----------^----
     *
     *
     *  - When there is less or none space we have only 10% far away form the edge
     *
     *    --^------------   or       -----------^--
     *
     *  Once we pick the correct positioning (25%, 10%) we need to recalculate and shift the card
     *  either to the left or right.
     *
     * @param {?} container
     * @param {?} containerRect
     * @param {?} modalContainer
     * @return {?}
     */
    adjustCard(container, containerRect, modalContainer) {
        let /** @type {?} */ diff = (this.currrentPosition === HCCardPosition.bottom) ? 1 : -1;
        let /** @type {?} */ scrollTop = modalContainer.domHandler.getWindowScrollTop();
        let /** @type {?} */ posWithScroll = containerRect.top + scrollTop;
        container.style.top = (posWithScroll + (HoverCardComponent.ArrowPad * diff)) + 'px';
        let /** @type {?} */ alignment = this.alignmentForCard(containerRect, modalContainer);
        container.style.left = this.calcLeftForAlignment(containerRect, alignment) + 'px';
    }
    /**
     * @param {?} container
     * @param {?} containerRect
     * @param {?} modalContainer
     * @return {?}
     */
    applyStyleClass(container, containerRect, modalContainer) {
        if (this.currrentPosition !== HCCardPosition.none) {
            let /** @type {?} */ alignment = this.alignmentForCard(containerRect, modalContainer);
            this.arrowClass = (/** @type {?} */ (PositionToStyle))[(/** @type {?} */ (HCCardPosition))[this.currrentPosition]];
            this.arrowClass += (/** @type {?} */ (AlignmentToStyle))[(/** @type {?} */ (HCCardAlignment))[alignment]];
        }
        else {
            this.arrowClass = '';
        }
    }
    /**
     *
     * Detects if the card is going to be shown on the top of the Link label or under. Or if
     * its covering it.
     *
     * @param {?} container
     * @param {?} boundingRect
     * @return {?}
     */
    positionForCard(container, boundingRect) {
        // secure this in case of IE returning undefined
        let /** @type {?} */ borderWidth = getComputedStyle(container).borderWidth;
        let /** @type {?} */ cntWidth = parseFloat(borderWidth || '0');
        let /** @type {?} */ pos = HCCardPosition.none;
        if (this.trigRect.bottom < boundingRect.top) {
            pos = HCCardPosition.bottom;
        }
        else if (this.trigRect.top > (boundingRect.bottom - cntWidth)) {
            pos = HCCardPosition.top;
        }
        return pos;
    }
    /**
     *
     * Detect horizontal alignment.
     *
     * @param {?} boundingRect
     * @param {?} modalContainer
     * @return {?}
     */
    alignmentForCard(boundingRect, modalContainer) {
        let /** @type {?} */ alignment = HCCardAlignment.left;
        let /** @type {?} */ viewPort = modalContainer.domHandler.getViewport();
        if (this.trigRect.left.toFixed(0) === boundingRect.left.toFixed(0) &&
            boundingRect.left > HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.left;
        }
        else if (boundingRect.left < HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.paddedLeft;
        }
        else if ((viewPort.width - boundingRect.right) < HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.paddedRight;
        }
        else if (this.trigRect.right.toFixed(0) === boundingRect.right.toFixed(0) ||
            (viewPort.width - boundingRect.right) > HoverCardComponent.SpacingLimit) {
            alignment = HCCardAlignment.right;
        }
        else {
            alignment = HCCardAlignment.default;
        }
        return alignment;
    }
    /**
     *
     * Turn on temporary display to BLOCK so we can read dimensions
     *
     * @param {?} container
     * @return {?}
     */
    openForAdjustments(container) {
        container.style.visibility = 'hidden';
        container.style.display = 'block';
        this.initElements();
    }
    /**
     *
     * Turn off display back NONE
     *
     * @param {?} container
     * @return {?}
     */
    closeForAdjustments(container) {
        container.style.visibility = 'visible';
        // container.style.display = 'none';
    }
    /**
     *
     * Calculates positioning for style.LEFT. As already said they are two types of triangles that
     * are applies for these case:
     *
     *
     * a) Large left, Large right
     *
     *  PrimeNG aligns the card with either the right side or left side of the triggering icon
     *
     *
     *  V                                                                V
     *  ......^........................ or  .......................^......
     *
     *
     *
     *
     *  b) Small left , small right
     *
     *  This is for cases where there is not enough space and PrimeNG position the card off to the
     *  triggering icons, so even primeNg does not have space to align it with the V
     *
     *
     *     V                                                      V
     *  ....^........................ or  .......................^....
     *
     *
     * c)Aligned with the edge of browser
     *
     * On the right side this is problem as we cannot calculate full future width of the card.
     * but we applly for this case #b (arrow 10% )
     *
     *
     *
     * @param {?} boundingRect
     * @param {?} alignment
     * @return {?}
     */
    calcLeftForAlignment(boundingRect, alignment) {
        // width for which we need to shift card. 25% or 10% of the container width
        let /** @type {?} */ wLargeTriangle = boundingRect.width * 0.25;
        let /** @type {?} */ wSmallTriangle = boundingRect.width * 0.10;
        switch (alignment) {
            case HCCardAlignment.right:
                let /** @type {?} */ shiftRight = boundingRect.left + wLargeTriangle;
                let /** @type {?} */ trigRight = this.trigRect.right - this.trigIconMiddle;
                return shiftRight - (boundingRect.right - trigRight);
            case HCCardAlignment.paddedRight:
                let /** @type {?} */ shiftRightS = boundingRect.left + wSmallTriangle;
                let /** @type {?} */ trigRightS = this.trigRect.right - this.trigIconMiddle;
                return shiftRightS - (boundingRect.right - trigRightS);
            case HCCardAlignment.paddedLeft:
                let /** @type {?} */ shiftLeftPad = boundingRect.left - wSmallTriangle;
                return shiftLeftPad + this.trigIconMiddle;
            case HCCardAlignment.left:
            default:
                let /** @type {?} */ shiftLeft = boundingRect.left - wLargeTriangle;
                return shiftLeft + this.trigIconMiddle;
        }
    }
}
/**
 * Default padding representing a height of the Arrow for which we need to vertically adjust
 * Card container
 *
 */
HoverCardComponent.ArrowPad = 10;
/**
 * Defines safe threshold where there might not be enough space around or Card is aligned with
 * the left or right edge of the viewport for which we need to position the Arrow closer to the
 * side of the card
 *
 */
HoverCardComponent.SpacingLimit = 50;
HoverCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-hover-card',
                template: `<span class="w-hc">
    <span class="w-hc-title">
        <aw-string [value]="linkTitle"></aw-string>
        <span class="sap-icon icon-slim-arrow-down" (mouseover)="openCard($event)"></span>
    </span>

    <div class="w-hc-body">

         <aw-overlay #overlay [showCloseIcon]="forceClose" [dismissable]="!forceClose"
                     [styleClass]="arrowClass"
                     [appendTo]="appendTo"
                     (onOpen)="cardOpened($event)"
                     (onClose)="cardClosed($event)">

        <!-- this is workaround to create a _ngcontent-INDEX reference so we can
        refer to this ng-content. Angular does not have any way right now to track this
        -->
        <span class="u-ngcontent">
                <ng-content></ng-content>
            </span>

    </aw-overlay>

    </div>
</span>


<!--<ng-template #contentToBody>-->
    <!--<aw-overlay #overlay [showCloseIcon]="forceClose" [dismissable]="!forceClose"-->
                <!--[styleClass]="arrowClass"-->
                <!--[appendTo]="appendTo"-->
                <!--(onOpen)="cardOpened($event)"-->
                <!--(onClose)="cardClosed($event)">-->

        <!--&lt;!&ndash; this is workaround to create a _ngcontent-INDEX reference so we can-->
        <!--refer to this ng-content. Angular does not have any way right now to track this-->
        <!--&ndash;&gt;-->
        <!--<span class="u-ngcontent">-->
                <!--<ng-content></ng-content>-->
            <!--</span>-->

    <!--</aw-overlay>-->

<!--</ng-template>-->


<!--<ng-template #contentToOverlay>-->

    <!--<aw-overlay #overlay [showCloseIcon]="forceClose" [dismissable]="!forceClose"-->
                <!--[styleClass]="arrowClass"-->
                <!--(onOpen)="cardOpened($event)"-->
                <!--(onClose)="cardClosed($event)">-->

        <!--&lt;!&ndash; this is workaround to create a _ngcontent-INDEX reference so we can-->
        <!--refer to this ng-content. Angular does not have any way right now to track this-->
        <!--&ndash;&gt;-->
        <!--<span class="u-ngcontent">-->
                <!--<ng-content></ng-content>-->
            <!--</span>-->

    <!--</aw-overlay>-->
<!--</ng-template>-->


`,
                styles: [`.w-hc-title{padding-right:1.4em;position:relative;white-space:nowrap}.w-hc-title .sap-icon{font-size:1em;color:#00679e;position:absolute;padding-top:.2em;right:0}::ng-deep .w-hc-panel-arrow.u-hc-shadow-b{box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow.u-hc-shadow-t{box-shadow:0 -2px 4px 0 rgba(0,0,0,.2)}::ng-deep .w-hc-panel-arrow:after,::ng-deep .w-hc-panel-arrow:before{left:25%;border:solid transparent;content:" ";height:0;width:0;position:absolute;pointer-events:none}::ng-deep .w-hc-panel-arrow:after{border-color:rgba(136,183,213,0);border-width:.7em;margin-left:-.7em}::ng-deep .w-hc-panel-arrow:before{border-color:rgba(255,136,56,0);border-width:.8em;margin-left:-.8em}::ng-deep .u-hc-arrow-ll:after,::ng-deep .u-hc-arrow-ll:before{left:25%}::ng-deep .u-hc-arrow-lr:after,::ng-deep .u-hc-arrow-lr:before{left:75%}::ng-deep .u-hc-arrow-sl:after,::ng-deep .u-hc-arrow-sl:before{left:10%}::ng-deep .u-hc-arrow-sr:after,::ng-deep .u-hc-arrow-sr:before{left:90%}::ng-deep .u-hc-arrow-t:after,::ng-deep .u-hc-arrow-t:before{bottom:100%}::ng-deep .u-hc-arrow-t:after{border-bottom-color:#fff}::ng-deep .u-hc-arrow-t:before{border-bottom-color:#d7d7d7}::ng-deep .u-hc-arrow-b:after,::ng-deep .u-hc-arrow-b:before{top:100%}::ng-deep .u-hc-arrow-b:after{border-top-color:#fff}::ng-deep .u-hc-arrow-b:before{border-top-color:#d7d7d7}`]
            },] },
];
/** @nocollapse */
HoverCardComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment },
    { type: ChangeDetectorRef }
];
HoverCardComponent.propDecorators = {
    linkTitle: [{ type: Input }],
    forceClose: [{ type: Input }],
    appendContentToBody: [{ type: Input }],
    awOverlay: [{ type: ViewChild, args: ['overlay',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Spy lifecycle directive is used for debugging purposes to track lifecycle callback
 *
 * ###Usage
 *
 * ```
 *   <my-directive spyhooks><my-directive>
 *
 * ```
 */
class SpyLifeCycleHooksDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.logIt('onInit');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.logIt('onDestroy');
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.logIt('ngOnChanges = ' + changes);
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.logIt('ngDoCheck');
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.logIt('ngAfterContentInit');
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.logIt('ngAfterContentChecked');
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.logIt('ngAfterViewInit');
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.logIt('ngAfterViewChecked');
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logIt(msg) {
        let /** @type {?} */ level = 0;
        let /** @type {?} */ me = this.elementRef.nativeElement;
        let /** @type {?} */ tagBody = me;
        while ((tagBody = tagBody.parentNode) != null) {
            level++;
            if (tagBody.tagName === 'APP-ROOT' || level === 6) {
                break;
            }
        }
        let /** @type {?} */ indent = '';
        let /** @type {?} */ indentNumber = level;
        while (level > 0) {
            indent += '\t';
            level--;
        }
        let /** @type {?} */ params = '';
        if (isPresent(me.attributes)) {
            for (let /** @type {?} */ i = 0; i < me.attributes.length; i++) {
                let /** @type {?} */ attr = me.attributes.item(i);
                if (this.ignore(attr.name.toLowerCase())) {
                    continue;
                }
                params += '(' + attr.name + '=' + attr.value + '),  ';
            }
        }
        print(indent + me.tagName + '(' + indentNumber + '): ' + msg + ' => ' + params);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    ignore(name) {
        return name.indexOf('_ng') > -1 ||
            name.indexOf('ng-') > -1 ||
            name.indexOf('spyhooks') > -1;
    }
}
SpyLifeCycleHooksDirective.decorators = [
    { type: Directive, args: [{ selector: '[spyHooks]' },] },
];
/** @nocollapse */
SpyLifeCycleHooksDirective.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var components = /*#__PURE__*/Object.freeze({
    AWCoreComponentModule: AWCoreComponentModule,
    ErrorMessagesComponent: ErrorMessagesComponent,
    ModalContainer: ModalContainer,
    ModalService: ModalService,
    ModalComponent: ModalComponent,
    CurrencyFormatPipe: CurrencyFormatPipe,
    BaseComponent: BaseComponent,
    BaseFormComponent: BaseFormComponent,
    WidgetSizeColumns: WidgetSizeColumns,
    DomUtilsService: DomUtilsService,
    EmbeddedItemDirective: EmbeddedItemDirective,
    EmbededItem: EmbededItem,
    ErrorManagerService: ErrorManagerService,
    GenericContainerComponent: GenericContainerComponent,
    IncludeComponentDirective: IncludeComponentDirective,
    ComponentRegistry: ComponentRegistry,
    DataTypeProviderRegistry: DataTypeProviderRegistry,
    DataProviders: DataProviders,
    DataFinders: DataFinders,
    DataFinder: DataFinder,
    FullTextArrayDataFinder: FullTextArrayDataFinder,
    QueryType: QueryType,
    DATA_SOURCE: DATA_SOURCE,
    DataProvider: DataProvider,
    ArrayDataProvider: ArrayDataProvider,
    NgForSetDirective: NgForSetDirective,
    AwNameDirective: AwNameDirective,
    AwNameStore: AwNameStore,
    FormTableComponent: FormTableComponent,
    AWFormTableModule: AWFormTableModule,
    FormRowComponent: FormRowComponent,
    TopZoneComponent: TopZoneComponent,
    LeftZoneComponent: LeftZoneComponent,
    MiddleZoneComponent: MiddleZoneComponent,
    RightZoneComponent: RightZoneComponent,
    BottomZoneComponent: BottomZoneComponent,
    AWInputFieldModule: AWInputFieldModule,
    AWStringFieldModule: AWStringFieldModule,
    AWBasicNavigatorModule: AWBasicNavigatorModule,
    AWButtonModule: AWButtonModule,
    AWCardModule: AWCardModule,
    AWCheckBoxModule: AWCheckBoxModule,
    AWCheckBoxListModule: AWCheckBoxListModule,
    AWHyperlinkModule: AWHyperlinkModule,
    AWChooserModule: AWChooserModule,
    AWDropdownModule: AWDropdownModule,
    AWCurrencyModule: AWCurrencyModule,
    AWDateAndTimeModule: AWDateAndTimeModule,
    AWDialogModule: AWDialogModule,
    AWGenericChooserModule: AWGenericChooserModule,
    AWRadioButtonModule: AWRadioButtonModule,
    AWRadioButtonListModule: AWRadioButtonListModule,
    AWOutlineForModule: AWOutlineForModule,
    AWTextAreaModule: AWTextAreaModule,
    AWPageNotificationModule: AWPageNotificationModule,
    AWPageWrapperModule: AWPageWrapperModule,
    AWRichTextAreaModule: AWRichTextAreaModule,
    AWSectionModule: AWSectionModule,
    AWStepperModule: AWStepperModule,
    AWDatatable2Module: AWDatatable2Module,
    AWConfirmationModule: AWConfirmationModule,
    AWScrollableContainerModule: AWScrollableContainerModule,
    AWListModule: AWListModule,
    BasicNavigatorComponent: BasicNavigatorComponent,
    ButtonComponent: ButtonComponent,
    CheckBoxListComponent: CheckBoxListComponent,
    CHOOSER_CONTROL_VALUE_ACCESSOR: CHOOSER_CONTROL_VALUE_ACCESSOR,
    ChooserComponent: ChooserComponent,
    ChooserState: ChooserState,
    DefaultSelectionState: DefaultSelectionState,
    ChooserSelectionState: ChooserSelectionState,
    ChooserDataSource: ChooserDataSource,
    isDSChooserInitParams: isDSChooserInitParams,
    CURRENCY_CONTROL_VALUE_ACCESSOR: CURRENCY_CONTROL_VALUE_ACCESSOR,
    CurrencyComponent: CurrencyComponent,
    Money: Money,
    DateAndTimeComponent: DateAndTimeComponent,
    DATETIME_CONTROL_VALUE_ACCESSOR: DATETIME_CONTROL_VALUE_ACCESSOR,
    DialogComponent: DialogComponent,
    DialogHeaderComponent: DialogHeaderComponent,
    DialogFooterComponent: DialogFooterComponent,
    ConfirmationComponent: ConfirmationComponent,
    ConfirmationHeaderComponent: ConfirmationHeaderComponent,
    ConfirmationFooterComponent: ConfirmationFooterComponent,
    OverlayComponent: OverlayComponent,
    DD_CONTROL_VALUE_ACCESSOR: DD_CONTROL_VALUE_ACCESSOR,
    DropdownComponent: DropdownComponent,
    GCChooserState: GCChooserState,
    GenericChooserComponent: GenericChooserComponent,
    HyperlinkComponent: HyperlinkComponent,
    INPUT_CONTROL_VALUE_ACCESSOR: INPUT_CONTROL_VALUE_ACCESSOR,
    InputFieldComponent: InputFieldComponent,
    RadioButtonListComponent: RadioButtonListComponent,
    StringComponent: StringComponent,
    TEXTAREA_CONTROL_VALUE_ACCESSOR: TEXTAREA_CONTROL_VALUE_ACCESSOR,
    TextAreaComponent: TextAreaComponent,
    CardComponent: CardComponent,
    CardZoneTitleComponent: CardZoneTitleComponent,
    CardZoneTopComponent: CardZoneTopComponent,
    CardZoneBottomComponent: CardZoneBottomComponent,
    OutlineForComponent: OutlineForComponent,
    OutlineControlComponent: OutlineControlComponent,
    OutlineState: OutlineState,
    PageContentComponent: PageContentComponent,
    PageNotificationComponent: PageNotificationComponent,
    PageNotification: PageNotification,
    PageInitialized: PageInitialized,
    PageDestroyed: PageDestroyed,
    PageWrapper: PageWrapper,
    PageLifeCycleService: PageLifeCycleService,
    ObjectPageWrapperComponent: ObjectPageWrapperComponent,
    PageHeaderComponent: PageHeaderComponent,
    PageMenuItem: PageMenuItem,
    UserNotification: UserNotification,
    PageFooterComponent: PageFooterComponent,
    SidenavComponent: SidenavComponent,
    PageActionsComponent: PageActionsComponent,
    SectionComponent: SectionComponent,
    SubSectionComponent: SubSectionComponent,
    SectionActionsComponent: SectionActionsComponent,
    EditorType: EditorType,
    RichTextAreaComponent: RichTextAreaComponent,
    CheckboxComponent: CheckboxComponent,
    RadioButtonComponent: RadioButtonComponent,
    StepperComponent: StepperComponent,
    StepComponent: StepComponent,
    ScrollableContainerComponent: ScrollableContainerComponent,
    HoverCardComponent: HoverCardComponent,
    ListComponent: ListComponent,
    Datatable2Component: Datatable2Component,
    DTHeaderComponent2: DTHeaderComponent2,
    DTColumn2Component: DTColumn2Component,
    DTDetailRowComponent: DTDetailRowComponent,
    Datatable2State: Datatable2State,
    isDTInitParams: isDTInitParams,
    DT2DataSource: DT2DataSource,
    DetailRowExpansionState: DetailRowExpansionState,
    DTMultiSelectColumnComponent: DTMultiSelectColumnComponent,
    DomHandler: DomHandler,
    TreeDragDropService: TreeDragDropService,
    ConfirmationService: ConfirmationService,
    Header: Header,
    Footer: Footer,
    PrimeTemplate: PrimeTemplate,
    Column: Column,
    Row: Row,
    HeaderColumnGroup: HeaderColumnGroup,
    FooterColumnGroup: FooterColumnGroup,
    SharedModule: SharedModule,
    AccordionTab: AccordionTab,
    Accordion: Accordion,
    AccordionModule: AccordionModule,
    AUTOCOMPLETE_VALUE_ACCESSOR: AUTOCOMPLETE_VALUE_ACCESSOR,
    AutoComplete: AutoComplete,
    AutoCompleteModule: AutoCompleteModule,
    BlockUI: BlockUI,
    BlockUIModule: BlockUIModule,
    Breadcrumb: Breadcrumb,
    BreadcrumbModule: BreadcrumbModule,
    ButtonDirective: ButtonDirective,
    Button: Button,
    ButtonModule: ButtonModule,
    Captcha: Captcha,
    CaptchaModule: CaptchaModule,
    CALENDAR_VALUE_ACCESSOR: CALENDAR_VALUE_ACCESSOR,
    Calendar: Calendar,
    CalendarModule: CalendarModule,
    Card: Card,
    CardModule: CardModule,
    Carousel: Carousel,
    CarouselModule: CarouselModule,
    UIChart: UIChart,
    ChartModule: ChartModule,
    CHECKBOX_VALUE_ACCESSOR: CHECKBOX_VALUE_ACCESSOR,
    Checkbox: Checkbox,
    CheckboxModule: CheckboxModule,
    CHIPS_VALUE_ACCESSOR: CHIPS_VALUE_ACCESSOR,
    Chips: Chips,
    ChipsModule: ChipsModule,
    CodeHighlighter: CodeHighlighter,
    CodeHighlighterModule: CodeHighlighterModule,
    COLORPICKER_VALUE_ACCESSOR: COLORPICKER_VALUE_ACCESSOR,
    ColorPicker: ColorPicker,
    ColorPickerModule: ColorPickerModule,
    ConfirmDialog: ConfirmDialog,
    ConfirmDialogModule: ConfirmDialogModule,
    ContextMenuSub: ContextMenuSub,
    ContextMenu: ContextMenu,
    ContextMenuModule: ContextMenuModule,
    DataGrid: DataGrid,
    DataGridModule: DataGridModule,
    DataList: DataList,
    DataListModule: DataListModule,
    DataScroller: DataScroller,
    DataScrollerModule: DataScrollerModule,
    DTRadioButton: DTRadioButton,
    DTCheckbox: DTCheckbox,
    ColumnHeaders: ColumnHeaders,
    ColumnFooters: ColumnFooters,
    TableBody: TableBody,
    ScrollableView: ScrollableView,
    DataTable: DataTable,
    DataTableModule: DataTableModule,
    DeferredLoader: DeferredLoader,
    DeferModule: DeferModule,
    Dialog: Dialog,
    DialogModule: DialogModule,
    Draggable: Draggable,
    Droppable: Droppable,
    DragDropModule: DragDropModule,
    DROPDOWN_VALUE_ACCESSOR: DROPDOWN_VALUE_ACCESSOR,
    Dropdown: Dropdown,
    DropdownModule: DropdownModule,
    EDITOR_VALUE_ACCESSOR: EDITOR_VALUE_ACCESSOR,
    Editor: Editor,
    EditorModule: EditorModule,
    Fieldset: Fieldset,
    FieldsetModule: FieldsetModule,
    FileUpload: FileUpload,
    FileUploadModule: FileUploadModule,
    Galleria: Galleria,
    GalleriaModule: GalleriaModule,
    GMap: GMap,
    GMapModule: GMapModule,
    Growl: Growl,
    GrowlModule: GrowlModule,
    InplaceDisplay: InplaceDisplay,
    InplaceContent: InplaceContent,
    Inplace: Inplace,
    InplaceModule: InplaceModule,
    INPUTMASK_VALUE_ACCESSOR: INPUTMASK_VALUE_ACCESSOR,
    InputMask: InputMask,
    InputMaskModule: InputMaskModule,
    INPUTSWITCH_VALUE_ACCESSOR: INPUTSWITCH_VALUE_ACCESSOR,
    InputSwitch: InputSwitch,
    InputSwitchModule: InputSwitchModule,
    InputText: InputText,
    InputTextModule: InputTextModule$1,
    InputTextarea: InputTextarea,
    InputTextareaModule: InputTextareaModule,
    KEYFILTER_VALIDATOR: KEYFILTER_VALIDATOR,
    KeyFilter: KeyFilter,
    KeyFilterModule: KeyFilterModule,
    Lightbox: Lightbox,
    LightboxModule: LightboxModule,
    LISTBOX_VALUE_ACCESSOR: LISTBOX_VALUE_ACCESSOR,
    Listbox: Listbox,
    ListboxModule: ListboxModule,
    MegaMenu: MegaMenu,
    MegaMenuModule: MegaMenuModule,
    MenuItemContent: MenuItemContent,
    Menu: Menu,
    MenuModule: MenuModule,
    MenubarSub: MenubarSub,
    Menubar: Menubar,
    MenubarModule: MenubarModule,
    Messages: Messages,
    MessagesModule: MessagesModule,
    UIMessage: UIMessage,
    MessageModule: MessageModule,
    MULTISELECT_VALUE_ACCESSOR: MULTISELECT_VALUE_ACCESSOR,
    MultiSelect: MultiSelect,
    MultiSelectModule: MultiSelectModule,
    OrderList: OrderList,
    OrderListModule: OrderListModule,
    OrganizationChartNode: OrganizationChartNode,
    OrganizationChart: OrganizationChart,
    OrganizationChartModule: OrganizationChartModule,
    OverlayPanel: OverlayPanel,
    OverlayPanelModule: OverlayPanelModule,
    Paginator: Paginator,
    PaginatorModule: PaginatorModule,
    Panel: Panel,
    PanelModule: PanelModule,
    BasePanelMenuItem: BasePanelMenuItem,
    PanelMenuSub: PanelMenuSub,
    PanelMenu: PanelMenu,
    PanelMenuModule: PanelMenuModule,
    Password: Password,
    PasswordModule: PasswordModule,
    PickList: PickList,
    PickListModule: PickListModule,
    ProgressBar: ProgressBar,
    ProgressBarModule: ProgressBarModule,
    ProgressSpinner: ProgressSpinner,
    ProgressSpinnerModule: ProgressSpinnerModule,
    RADIO_VALUE_ACCESSOR: RADIO_VALUE_ACCESSOR,
    RadioButton: RadioButton,
    RadioButtonModule: RadioButtonModule,
    RATING_VALUE_ACCESSOR: RATING_VALUE_ACCESSOR,
    Rating: Rating,
    RatingModule: RatingModule,
    Schedule: Schedule,
    ScheduleModule: ScheduleModule,
    ScrollPanel: ScrollPanel,
    ScrollPanelModule: ScrollPanelModule,
    SELECTBUTTON_VALUE_ACCESSOR: SELECTBUTTON_VALUE_ACCESSOR,
    SelectButton: SelectButton,
    SelectButtonModule: SelectButtonModule,
    SlideMenuSub: SlideMenuSub,
    SlideMenu: SlideMenu,
    SlideMenuModule: SlideMenuModule,
    SLIDER_VALUE_ACCESSOR: SLIDER_VALUE_ACCESSOR,
    Slider: Slider,
    SliderModule: SliderModule,
    Sidebar: Sidebar,
    SidebarModule: SidebarModule,
    SPINNER_VALUE_ACCESSOR: SPINNER_VALUE_ACCESSOR,
    Spinner: Spinner,
    SpinnerModule: SpinnerModule,
    SplitButton: SplitButton,
    SplitButtonModule: SplitButtonModule,
    Steps: Steps,
    StepsModule: StepsModule,
    TabViewNav: TabViewNav,
    TabPanel: TabPanel,
    TabView: TabView,
    TabViewModule: TabViewModule,
    TabMenu: TabMenu,
    TabMenuModule: TabMenuModule,
    Terminal: Terminal,
    TerminalModule: TerminalModule,
    TieredMenuSub: TieredMenuSub,
    TieredMenu: TieredMenu,
    TieredMenuModule: TieredMenuModule,
    TOGGLEBUTTON_VALUE_ACCESSOR: TOGGLEBUTTON_VALUE_ACCESSOR,
    ToggleButton: ToggleButton,
    ToggleButtonModule: ToggleButtonModule,
    Toolbar: Toolbar,
    ToolbarModule: ToolbarModule,
    Tooltip: Tooltip,
    TooltipModule: TooltipModule,
    UITreeNode: UITreeNode,
    Tree: Tree,
    TreeModule: TreeModule,
    TreeTableService: TreeTableService,
    TreeTable: TreeTable,
    TTBody: TTBody,
    TTScrollableView: TTScrollableView,
    TTSortableColumn: TTSortableColumn,
    TTSortIcon: TTSortIcon,
    TTResizableColumn: TTResizableColumn,
    TTReorderableColumn: TTReorderableColumn,
    TTSelectableRow: TTSelectableRow,
    TTSelectableRowDblClick: TTSelectableRowDblClick,
    TTContextMenuRow: TTContextMenuRow,
    TTCheckbox: TTCheckbox,
    TTHeaderCheckbox: TTHeaderCheckbox,
    TTEditableColumn: TTEditableColumn,
    TreeTableCellEditor: TreeTableCellEditor,
    TreeTableToggler: TreeTableToggler,
    TreeTableModule: TreeTableModule,
    TRISTATECHECKBOX_VALUE_ACCESSOR: TRISTATECHECKBOX_VALUE_ACCESSOR,
    TriStateCheckbox: TriStateCheckbox,
    TriStateCheckboxModule: TriStateCheckboxModule
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWOverlayModule {
}
AWOverlayModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    OverlayComponent
                ],
                imports: [
                    CommonModule,
                    AWCoreComponentModule,
                    OverlayPanelModule
                ],
                entryComponents: [
                    OverlayComponent
                ],
                exports: [
                    OverlayComponent,
                    AWCoreComponentModule
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AWHoverCardModule {
}
AWHoverCardModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    HoverCardComponent
                ],
                imports: [
                    CommonModule,
                    AWOverlayModule,
                    AWStringFieldModule
                ],
                entryComponents: [
                    HoverCardComponent
                ],
                exports: [
                    HoverCardComponent
                ],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Component module is core module for the common layouts and widgets libraries.
 *
 * todo: There are some things that I still need to resolve - please see and notices \@Duplicates
 * jsdoc I want to keep this there to remind me that I need to refactor this as of now there are
 * not much option with angular.
 *
 */
class AribaComponentsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: AribaComponentsModule,
            providers: [
                ModalService,
                ComponentRegistry,
                ErrorManagerService,
                DomUtilsService,
                DataTypeProviderRegistry,
                DataProviders,
                DataFinders,
                AwNameStore,
                {
                    provide: APP_INITIALIZER,
                    useFactory: registerComponents,
                    deps: [ComponentRegistry],
                    multi: true,
                }
            ]
        };
    }
}
AribaComponentsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AribaCoreModule,
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    AWCoreComponentModule,
                    AWBasicNavigatorModule,
                    AWCardModule,
                    AWCheckBoxListModule,
                    AWCheckBoxModule,
                    AWChooserModule,
                    AWConfirmationModule,
                    AWCurrencyModule,
                    AWDateAndTimeModule,
                    AWDialogModule,
                    AWDropdownModule,
                    AWGenericChooserModule,
                    AWHyperlinkModule,
                    AWInputFieldModule,
                    AWOutlineForModule,
                    AWOverlayModule,
                    AWPageNotificationModule,
                    AWPageWrapperModule,
                    AWRadioButtonModule,
                    AWRadioButtonListModule,
                    AWRichTextAreaModule,
                    AWScrollableContainerModule,
                    AWSectionModule,
                    AWStepperModule,
                    AWStringFieldModule,
                    AWTextAreaModule,
                    AWFormTableModule,
                    AWButtonModule,
                    AWHoverCardModule,
                    AWListModule,
                    AWDatatable2Module,
                    PanelModule,
                    ButtonModule,
                    ToolbarModule,
                    InputTextModule$1,
                    InputTextareaModule,
                    AutoCompleteModule,
                    DropdownModule,
                    CalendarModule,
                    CheckboxModule,
                    RadioButtonModule,
                    SharedModule,
                    DialogModule,
                    MenuModule,
                    TabMenuModule,
                    AccordionModule,
                    EditorModule,
                    DataTableModule,
                    PaginatorModule,
                    OverlayPanelModule
                ],
                declarations: [
                    SpyLifeCycleHooksDirective,
                ],
                bootstrap: [],
                entryComponents: [
                    Checkbox,
                    Dialog
                ],
                exports: [
                    ReactiveFormsModule,
                    FormsModule,
                    SpyLifeCycleHooksDirective,
                    AWCoreComponentModule,
                    AWBasicNavigatorModule,
                    AWCardModule,
                    AWCheckBoxListModule,
                    AWCheckBoxModule,
                    AWChooserModule,
                    AWConfirmationModule,
                    AWCurrencyModule,
                    AWDateAndTimeModule,
                    AWDialogModule,
                    AWDropdownModule,
                    AWGenericChooserModule,
                    AWHyperlinkModule,
                    AWInputFieldModule,
                    AWOutlineForModule,
                    AWOverlayModule,
                    AWPageNotificationModule,
                    AWPageWrapperModule,
                    AWRadioButtonModule,
                    AWRadioButtonListModule,
                    AWRichTextAreaModule,
                    AWScrollableContainerModule,
                    AWSectionModule,
                    AWStepperModule,
                    AWStringFieldModule,
                    AWTextAreaModule,
                    AWFormTableModule,
                    EmbeddedItemDirective,
                    AWButtonModule,
                    AWHoverCardModule,
                    AWListModule,
                    AWDatatable2Module,
                    SharedModule,
                    PanelModule,
                    ButtonModule,
                    ToolbarModule,
                    InputTextModule$1,
                    InputTextareaModule,
                    AutoCompleteModule,
                    DropdownModule,
                    CalendarModule,
                    CheckboxModule,
                    RadioButtonModule,
                    DialogModule,
                    MenuModule,
                    TabMenuModule,
                    EditorModule,
                    DataTableModule,
                    PaginatorModule,
                    OverlayPanelModule
                ]
            },] },
];
/**
 * @param {?} compRegistry
 * @return {?}
 */
function registerComponents(compRegistry) {
    return compRegistry.initialize.bind(compRegistry, components);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * This module is used mainly for tests as importing a module with all the components and you
 * use only 1 or two has a big impact on the performance execution. e.g. from executing couple
 * tests under 1 sec can go up to 10sec if you import all the things that you are not using.
 *
 * I havent noticed anything similar in application its only jasmine/karma that needs to init
 * components for every test.
 *
 */
class AribaComponentsTestProviderModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: AribaComponentsTestProviderModule,
            providers: [
                ModalService,
                ComponentRegistry,
                ErrorManagerService,
                DomUtilsService,
                DataTypeProviderRegistry,
                DataProviders,
                DataFinders,
                AwNameStore,
                {
                    provide: APP_INITIALIZER,
                    useFactory: registerComponents$1,
                    deps: [ComponentRegistry],
                    multi: true,
                }
            ]
        };
    }
}
AribaComponentsTestProviderModule.decorators = [
    { type: NgModule, args: [{
                imports: []
            },] },
];
/**
 * @param {?} compRegistry
 * @return {?}
 */
function registerComponents$1(compRegistry) {
    return compRegistry.initialize.bind(compRegistry, components);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { ErrorMessagesComponent, ModalContainer, ModalService, ModalComponent, CurrencyFormatPipe, BaseComponent, WidgetSizeColumns, DomUtilsService, EmbeddedItemDirective, EmbededItem, ErrorManagerService, GenericContainerComponent, IncludeComponentDirective, ComponentRegistry, AWCoreComponentModule, BaseFormComponent, DataTypeProviderRegistry, DataProvider, DataProviders, DataFinders, DataFinder, QueryType, FullTextArrayDataFinder, DATA_SOURCE, ArrayDataProvider, NgForSetDirective, AwNameDirective, AwNameStore, FormTableComponent, FormRowComponent, TopZoneComponent, LeftZoneComponent, MiddleZoneComponent, RightZoneComponent, BottomZoneComponent, AWFormTableModule, BasicNavigatorComponent, ButtonComponent, CheckBoxListComponent, CHOOSER_CONTROL_VALUE_ACCESSOR, ChooserComponent, ChooserState, DefaultSelectionState, ChooserSelectionState, CURRENCY_CONTROL_VALUE_ACCESSOR, CurrencyComponent, Money, DateAndTimeComponent, DATETIME_CONTROL_VALUE_ACCESSOR, DialogComponent, DialogHeaderComponent, DialogFooterComponent, ConfirmationComponent, ConfirmationHeaderComponent, ConfirmationFooterComponent, OverlayComponent, DropdownComponent, GCChooserState, GenericChooserComponent, HyperlinkComponent, INPUT_CONTROL_VALUE_ACCESSOR, InputFieldComponent, RadioButtonListComponent, StringComponent, TEXTAREA_CONTROL_VALUE_ACCESSOR, TextAreaComponent, OutlineForComponent, OutlineControlComponent, PageActionsComponent, PageContentComponent, PageFooterComponent, PageHeaderComponent, PageMenuItem, UserNotification, PageNotificationComponent, PageNotification, PageInitialized, PageDestroyed, PageWrapper, PageLifeCycleService, ObjectPageWrapperComponent, SectionComponent, SubSectionComponent, RichTextAreaComponent, EditorType, CheckboxComponent, RadioButtonComponent, StepperComponent, StepComponent, AWInputFieldModule, AWStringFieldModule, AWBasicNavigatorModule, AWButtonModule, AWHyperlinkModule, AWCardModule, AWCheckBoxModule, AWCheckBoxListModule, AWChooserModule, AWDropdownModule, AWCurrencyModule, AWDateAndTimeModule, AWDialogModule, AWGenericChooserModule, AWRadioButtonModule, AWRadioButtonListModule, AWTextAreaModule, AWPageNotificationModule, AWPageWrapperModule, AWRichTextAreaModule, AWSectionModule, AWStepperModule, ScrollableContainerComponent, AWScrollableContainerModule, AWConfirmationModule, ChooserDataSource, isDSChooserInitParams, HoverCardComponent, ListComponent, AWListModule, CardComponent, OutlineState, Datatable2Component, DTColumn2Component, DTHeaderComponent2, DTDetailRowComponent, DetailRowExpansionState, Datatable2State, isDTInitParams, DT2DataSource, DTMultiSelectColumnComponent, AWDatatable2Module, AribaComponentsModule, AribaComponentsTestProviderModule, SpyLifeCycleHooksDirective, registerComponents as ɵq, registerComponents$1 as ɵr, DataSource as ɵa, InfiniteScrollComponent as ɵs, CardZoneTitleComponent as ɵi, CardZoneBottomComponent as ɵh, CardZoneTopComponent as ɵg, AWCardModule as ɵb, CB_LIST_CONTROL_VALUE_ACCESSOR as ɵd, CB_CONTROL_VALUE_ACCESSOR as ɵn, DTDetailRowExpanderComponent as ɵv, DTSingleSelectColumnComponent as ɵw, SetCellMaxWidthDirective as ɵx, DTDraggableRowDirective as ɵy, DTWrapper as ɵu, DD_CONTROL_VALUE_ACCESSOR as ɵe, AWHoverCardModule as ɵba, LB_CONTROL_VALUE_ACCESSOR as ɵp, InitNestingDirective as ɵj, AWOutlineForModule as ɵc, AWOverlayModule as ɵz, SidenavComponent as ɵk, RB_LIST_CONTROL_VALUE_ACCESSOR as ɵf, RAB_CONTROL_VALUE_ACCESSOR as ɵo, EDITOR_CONTROL_VALUE_ACCESSOR as ɵm, SectionActionsComponent as ɵl };
