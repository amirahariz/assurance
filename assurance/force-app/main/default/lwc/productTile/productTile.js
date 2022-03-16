import { LightningElement, api } from 'lwc';

/**
 * A presentation component to display a Product__c sObject. The provided
 * Product__c data must contain all fields used by this component.
 */
export default class ProductTile2 extends LightningElement {
    /** Whether the tile is draggable. */
    @api draggable;

    _product;
    /** Product__c to display. */
    @api
    get product() {
        return this._product;
    }
    set product(value) {
        this._product = value;
        this.name = value.Name;
        this.description = value.Description;
        this.pictureUrl = value.Picture_URL__c;

    }

    /** Product__c field values to display. */
    name;
    description;
    pictureUrl;


    handleClick() {
        const selectedEvent = new CustomEvent('selected', {
            detail: this.product.Id
        });
        //console.log(this.product.Id);

        this.dispatchEvent(selectedEvent);
    }

    handleDragStart(event) {
        event.dataTransfer.setData('product', JSON.stringify(this.product));
    }
}
