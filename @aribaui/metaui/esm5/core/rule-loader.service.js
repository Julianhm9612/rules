/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { isArray, isBlank, isPresent, isStringMap, ListWrapper, MapWrapper } from '@aribaui/core';
import { LocalizedString } from './uimeta';
import { Rule, Selector } from './rule';
import { Meta, OverrideValue } from './meta';
import { ContextFieldPath, Expr, StaticallyResolvableWrapper, StaticDynamicWrapper } from './property-value';
/**
 * @record
 */
export function RuleLoader() { }
function RuleLoader_tsickle_Closure_declarations() {
    /** @type {?} */
    RuleLoader.prototype.loadRules;
}
var RuleLoaderService = /** @class */ (function () {
    function RuleLoaderService() {
    }
    Object.defineProperty(RuleLoaderService.prototype, "uiMeta", {
        get: /**
         * @return {?}
         */
        function () {
            return this._uiMeta;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._uiMeta = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} meta
     * @param {?} source
     * @param {?} module
     * @param {?} onRule
     * @return {?}
     */
    RuleLoaderService.prototype.loadRules = /**
     * @param {?} meta
     * @param {?} source
     * @param {?} module
     * @param {?} onRule
     * @return {?}
     */
    function (meta, source, module, onRule) {
        var _this = this;
        this._uiMeta = /** @type {?} */ (meta);
        source.forEach(function (val, index) {
            var /** @type {?} */ rule = _this.readRule(val, module);
            if (isPresent(onRule)) {
                onRule(rule);
            }
        });
    };
    /**
     * @param {?} source
     * @param {?} module
     * @return {?}
     */
    RuleLoaderService.prototype.loadRulesWithReturn = /**
     * @param {?} source
     * @param {?} module
     * @return {?}
     */
    function (source, module) {
        var _this = this;
        var /** @type {?} */ rules = new Array();
        source.forEach(function (val, index) {
            var /** @type {?} */ rule = _this.readRule(val, module);
            rules.push(rule);
        });
        return rules;
    };
    /**
     * @param {?} jsonRule
     * @param {?} module
     * @return {?}
     */
    RuleLoaderService.prototype.readRule = /**
     * @param {?} jsonRule
     * @param {?} module
     * @return {?}
     */
    function (jsonRule, module) {
        var _this = this;
        var /** @type {?} */ selectors = new Array();
        try {
            for (var _a = tslib_1.__values(jsonRule._selectors), _b = _a.next(); !_b.done; _b = _a.next()) {
                var item = _b.value;
                if (isPresent(item._value) && item._value.constructor === Object && Object.keys(item._value).length === 0) {
                    item._value = Meta.NullMarker;
                }
                var /** @type {?} */ selector = new Selector(item._key, item._value, item._isDecl);
                selectors.push(selector);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var /** @type {?} */ properties = MapWrapper.createFromStringMapWithResolve(jsonRule._properties, function (k, v) {
            if (isStringMap(v) &&
                isPresent(v['t'])) {
                return _this.resoveValue(v['t'], v, module);
            }
            else if (isStringMap(v) && !isArray(v)) {
                // we have some
                // other sub level
                // of object
                // literal - lets
                // convert this
                // into Map.
                return MapWrapper.createFromStringMapWithResolve(v, function (key, val) {
                    return _this.resoveValue(val['t'], val, module);
                });
            }
            else if (isArray(v)) {
                // let convert with
                // typings as well
                return ListWrapper.clone(v);
            }
            return v;
        });
        var /** @type {?} */ props = properties.size === 0 ? undefined : properties;
        var /** @type {?} */ rule = new Rule(selectors, props, jsonRule._rank);
        return rule;
        var e_1, _c;
    };
    /**
     * @param {?} type
     * @param {?} value
     * @param {?} module
     * @return {?}
     */
    RuleLoaderService.prototype.resoveValue = /**
     * @param {?} type
     * @param {?} value
     * @param {?} module
     * @return {?}
     */
    function (type, value, module) {
        if (isBlank(value)) {
            return null;
        }
        if (type === 'Expr') {
            return new Expr(value['v']);
        }
        else if (type === 'SDW') {
            var /** @type {?} */ expr = new Expr(value['v']);
            return new StaticDynamicWrapper(new StaticallyResolvableWrapper(expr));
        }
        else if (type === 'CFP') {
            return new ContextFieldPath(value['v']);
        }
        else if (type === 'OV') {
            return new OverrideValue(value['v']);
        }
        else if (type === 'i18n' && value['v']['key']) {
            var /** @type {?} */ locKey = value['v']['key'];
            return isPresent(this._uiMeta) ? this._uiMeta.createLocalizedString(locKey, value['v']['defVal'])
                :
                    new LocalizedString(null, module, locKey, value['v']['defVal']);
        }
        return value;
    };
    RuleLoaderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RuleLoaderService.ctorParameters = function () { return []; };
    return RuleLoaderService;
}());
export { RuleLoaderService };
function RuleLoaderService_tsickle_Closure_declarations() {
    /** @type {?} */
    RuleLoaderService.prototype._uiMeta;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS1sb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvcnVsZS1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQWtCQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUMsZUFBZSxFQUFTLE1BQU0sVUFBVSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXRDLE9BQU8sRUFBQyxJQUFJLEVBQUUsYUFBYSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzNDLE9BQU8sRUFDSCxnQkFBZ0IsRUFDaEIsSUFBSSxFQUNKLDJCQUEyQixFQUMzQixvQkFBb0IsRUFDdkIsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7OztJQWlCdEI7S0FFQztJQUdELHNCQUFJLHFDQUFNOzs7O1FBQVY7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN2Qjs7Ozs7UUFFRCxVQUFXLEtBQWE7WUFFcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDeEI7OztPQUxBOzs7Ozs7OztJQU9ELHFDQUFTOzs7Ozs7O0lBQVQsVUFBVSxJQUFVLEVBQUUsTUFBVyxFQUFFLE1BQWMsRUFBRSxNQUE0QjtRQUEvRSxpQkFhQztRQVhHLElBQUksQ0FBQyxPQUFPLHFCQUFXLElBQUksQ0FBQSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFRLEVBQUUsS0FBVTtZQUVoQyxxQkFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7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WUFDOUMscUJBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUvQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQ2xFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekIsQ0FBQztvQkFDRCxJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUV2RTtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7OztnQkFuSXBCLFVBQVU7Ozs7NEJBeENYOztTQXlDYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc0FycmF5LCBpc0JsYW5rLCBpc1ByZXNlbnQsIGlzU3RyaW5nTWFwLCBMaXN0V3JhcHBlciwgTWFwV3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0xvY2FsaXplZFN0cmluZywgVUlNZXRhfSBmcm9tICcuL3VpbWV0YSc7XG5pbXBvcnQge1J1bGUsIFNlbGVjdG9yfSBmcm9tICcuL3J1bGUnO1xuaW1wb3J0IHtKc29uUnVsZX0gZnJvbSAnLi9qc29uLXJ1bGUnO1xuaW1wb3J0IHtNZXRhLCBPdmVycmlkZVZhbHVlfSBmcm9tICcuL21ldGEnO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0RmllbGRQYXRoLFxuICAgIEV4cHIsXG4gICAgU3RhdGljYWxseVJlc29sdmFibGVXcmFwcGVyLFxuICAgIFN0YXRpY0R5bmFtaWNXcmFwcGVyXG59IGZyb20gJy4vcHJvcGVydHktdmFsdWUnO1xuXG5cbnR5cGUgRHluYW1pY1ZhbHVlVHlwZSA9ICdFeHByJyB8ICdTRFcnIHwgJ0NGUCcgfCAnT1YnIHwgJ2kxOG4nO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVsZUxvYWRlclxue1xuICAgIGxvYWRSdWxlcyAobWV0YTogTWV0YSwgc291cmNlOiBhbnksIG1vZHVsZTogc3RyaW5nLCBvblJ1bGU6IChydWxlOiBSdWxlKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJ1bGVMb2FkZXJTZXJ2aWNlIGltcGxlbWVudHMgUnVsZUxvYWRlclxue1xuXG4gICAgcHJpdmF0ZSBfdWlNZXRhOiBVSU1ldGE7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgIH1cblxuXG4gICAgZ2V0IHVpTWV0YSgpOiBVSU1ldGFcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl91aU1ldGE7XG4gICAgfVxuXG4gICAgc2V0IHVpTWV0YSh2YWx1ZTogVUlNZXRhKVxuICAgIHtcbiAgICAgICAgdGhpcy5fdWlNZXRhID0gdmFsdWU7XG4gICAgfVxuXG4gICAgbG9hZFJ1bGVzKG1ldGE6IE1ldGEsIHNvdXJjZTogYW55LCBtb2R1bGU6IHN0cmluZywgb25SdWxlOiAocnVsZTogUnVsZSkgPT4gdm9pZClcbiAgICB7XG4gICAgICAgIHRoaXMuX3VpTWV0YSA9IDxVSU1ldGE+bWV0YTtcbiAgICAgICAgc291cmNlLmZvckVhY2goKHZhbDogYW55LCBpbmRleDogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgcnVsZSA9IHRoaXMucmVhZFJ1bGUodmFsLCBtb2R1bGUpO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChvblJ1bGUpKSB7XG4gICAgICAgICAgICAgICAgb25SdWxlKHJ1bGUpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBsb2FkUnVsZXNXaXRoUmV0dXJuKHNvdXJjZTogYW55LCBtb2R1bGU6IHN0cmluZyk6IEFycmF5PFJ1bGU+XG4gICAge1xuXG4gICAgICAgIGxldCBydWxlczogQXJyYXk8UnVsZT4gPSBuZXcgQXJyYXk8UnVsZT4oKTtcbiAgICAgICAgc291cmNlLmZvckVhY2goKHZhbDogYW55LCBpbmRleDogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgcnVsZSA9IHRoaXMucmVhZFJ1bGUodmFsLCBtb2R1bGUpO1xuICAgICAgICAgICAgcnVsZXMucHVzaChydWxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJ1bGVzO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkUnVsZShqc29uUnVsZTogSnNvblJ1bGUsIG1vZHVsZTogc3RyaW5nKTogUnVsZVxuICAgIHtcblxuICAgICAgICBsZXQgc2VsZWN0b3JzOiBBcnJheTxTZWxlY3Rvcj4gPSBuZXcgQXJyYXk8U2VsZWN0b3I+KCk7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YganNvblJ1bGUuX3NlbGVjdG9ycykge1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGl0ZW0uX3ZhbHVlKSAmJiBpdGVtLl92YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0ICYmIE9iamVjdC5rZXlzKFxuICAgICAgICAgICAgICAgICAgICBpdGVtLl92YWx1ZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5fdmFsdWUgPSBNZXRhLk51bGxNYXJrZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RvciA9IG5ldyBTZWxlY3RvcihpdGVtLl9rZXksIGl0ZW0uX3ZhbHVlLCBpdGVtLl9pc0RlY2wpO1xuICAgICAgICAgICAgc2VsZWN0b3JzLnB1c2goc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gTWFwV3JhcHBlci5jcmVhdGVGcm9tU3RyaW5nTWFwV2l0aFJlc29sdmU8YW55Pihqc29uUnVsZS5fcHJvcGVydGllcyxcbiAgICAgICAgICAgIChrLCB2KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZ01hcCh2KSAmJlxuICAgICAgICAgICAgICAgICAgICBpc1ByZXNlbnQodlsndCddKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdmVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHZbJ3QnXSwgdixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZ01hcChcbiAgICAgICAgICAgICAgICAgICAgICAgIHYpICYmICFpc0FycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgdikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBzb21lXG4gICAgICAgICAgICAgICAgICAgIC8vIG90aGVyIHN1YiBsZXZlbFxuICAgICAgICAgICAgICAgICAgICAvLyBvZiBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgLy8gbGl0ZXJhbCAtIGxldHNcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCB0aGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIGludG8gTWFwLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWFwV3JhcHBlci5jcmVhdGVGcm9tU3RyaW5nTWFwV2l0aFJlc29sdmU8YW55PihcbiAgICAgICAgICAgICAgICAgICAgICAgIHYsIChrZXksIHZhbCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc292ZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxbJ3QnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUpKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY29udmVydCB3aXRoXG4gICAgICAgICAgICAgICAgICAgIC8vIHR5cGluZ3MgYXMgd2VsbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIuY2xvbmU8c3RyaW5nPihcbiAgICAgICAgICAgICAgICAgICAgICAgIHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBsZXQgcHJvcHMgPSBwcm9wZXJ0aWVzLnNpemUgPT09IDAgPyB1bmRlZmluZWQgOiBwcm9wZXJ0aWVzO1xuICAgICAgICBsZXQgcnVsZTogUnVsZSA9IG5ldyBSdWxlKHNlbGVjdG9ycywgcHJvcHMsIGpzb25SdWxlLl9yYW5rKTtcblxuICAgICAgICByZXR1cm4gcnVsZTtcbiAgICB9XG5cblxuICAgIC8vICdFeHByJyB8ICdTRFcnIHwgJ0NGUCcgfCAnT1YnIHwgJ2kxOG4nO1xuICAgIHByaXZhdGUgcmVzb3ZlVmFsdWUodHlwZTogRHluYW1pY1ZhbHVlVHlwZSwgdmFsdWU6IGFueSwgbW9kdWxlOiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ0V4cHInKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEV4cHIodmFsdWVbJ3YnXSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1NEVycpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gbmV3IEV4cHIodmFsdWVbJ3YnXSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0YXRpY0R5bmFtaWNXcmFwcGVyKG5ldyBTdGF0aWNhbGx5UmVzb2x2YWJsZVdyYXBwZXIoZXhwcikpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ0NGUCcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29udGV4dEZpZWxkUGF0aCh2YWx1ZVsndiddKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdPVicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3ZlcnJpZGVWYWx1ZSh2YWx1ZVsndiddKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdpMThuJyAmJiB2YWx1ZVsndiddWydrZXknXSkge1xuICAgICAgICAgICAgbGV0IGxvY0tleSA9IHZhbHVlWyd2J11bJ2tleSddO1xuXG4gICAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX3VpTWV0YSkgPyB0aGlzLl91aU1ldGEuY3JlYXRlTG9jYWxpemVkU3RyaW5nKGxvY0tleSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVbJ3YnXVsnZGVmVmFsJ10pXG4gICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgIG5ldyBMb2NhbGl6ZWRTdHJpbmcobnVsbCwgbW9kdWxlLCBsb2NLZXksIHZhbHVlWyd2J11bJ2RlZlZhbCddKTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcblxuICAgIH1cbn1cbiJdfQ==