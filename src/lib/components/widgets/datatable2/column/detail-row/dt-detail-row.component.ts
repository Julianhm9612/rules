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
import {Component, forwardRef, Inject, Input, ViewEncapsulation} from '@angular/core';
import {Datatable2Component} from '../../datatable2.component';
import {Environment, isPresent} from '@aribaui/core';
import {DomHandler} from 'primeng/primeng';
import {DTColumn2Component} from '../dt-column.component';


/**
 *
 * Custom column implementation to render detail row spaning its column across whole table width.
 *
 *
 */
@Component({
    selector: 'aw-dt-detail-column',
    templateUrl: 'dt-detail-row.component.html',
    styleUrls: ['dt-detail-row.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DomHandler]

})
export class DTDetailRowComponent extends DTColumn2Component
{

    /**
     * Defines current visibility for current data row using method reference
     *
     */
    @Input()
    isVisibleFn: (column: DTColumn2Component, item: any) => boolean;


    /**
     *
     * tells if we need to render a line between item row and its detail
     *
     */
    @Input()
    showRowLine: boolean = true;


    constructor (public env: Environment,
                 public domHandler: DomHandler,
                 @Inject(forwardRef(() => Datatable2Component))
                 public dt: Datatable2Component)
    {
        super(env, domHandler, dt);
    }


    ngOnInit (): void
    {
        // just to get around the check in parent class
        this.key = '';

        this.isVisible = !this.dt.isOutline() || !this.dt.pivotalLayout;
        super.ngOnInit();
    }


    initialize (): void
    {
        super.initialize();
    }

    /**
     * Check if we need to keep some leading TDs
     *
     */
    visibleLeadingCols (): number
    {
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
     */
    showDetailRow (item: any): boolean
    {
        let isVisible = this.isVisible;
        if (isPresent(this.isVisibleFn)) {
            isVisible = this.isVisibleFn.apply(this.dt.context, [this, item]);
        }
        return isVisible;
    }

}

