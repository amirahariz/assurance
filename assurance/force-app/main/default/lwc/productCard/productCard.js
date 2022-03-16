import { LightningElement, wire, api } from 'lwc';

// Lightning Message Service and a message channel
import { NavigationMixin } from 'lightning/navigation';
import { subscribe, MessageContext } from 'lightning/messageService';
import PRODUCT_SELECTED_MESSAGE from '@salesforce/messageChannel/ProductSelected__c';
import PACK_SELECTED_MESSAGE from '@salesforce/messageChannel/PackSelected__c';

//import displayPackRecords from '@salesforce/apex/ProductController.displayPackRecords';

// Utils to extract field values
import { getFieldValue } from 'lightning/uiRecordApi';

// Product2 Schema
import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import NAME_FIELD from '@salesforce/schema/Product2.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Product2.Description';
import displayPackRecords from '@salesforce/apex/ProductController.displayPackRecords';
import getPacks from '@salesforce/apex/PackController.getPacks';


/**
 * Component to display details of a Product2.
 */
export default class ProductCard extends NavigationMixin(LightningElement) {
    recordPackId;
   // @wire(getPacks) pack;

    _pack;
    @api
    get pack() {
        return this._pack;
    }

    handleClick(){
        const selectedEvent = new CustomEvent('selected', {
            detail: this.pack.Id
        });
        console.log(this.pack.Id);
        this.dispatchEvent(selectedEvent);
        //const modal = this.template.querySelector("c-pack-popup");
        //modal.show();
        
    }

    handlePackSelected(event) {
        publish(this.messageContext, PACK_SELECTED_MESSAGE, {
            packId: event.detail
        });
    }


    // Exposing fields to make them available in the template
    nameField = NAME_FIELD;
    descriptionField = DESCRIPTION_FIELD;

    // Id of Product2 to display
    recordId;

    // Product fields displayed with specific format
    productName;
    productDescription;

    /** Load context for Lightning Messaging Service */
    @wire(MessageContext) messageContext;

    /** Subscription for ProductSelected Lightning message */
    productSelectionSubscription;

    connectedCallback() {
        // Subscribe to ProductSelected message
        this.productSelectionSubscription = subscribe(
            this.messageContext,
            PRODUCT_SELECTED_MESSAGE,
            (message) => this.handleProductSelected(message.productId)
        );
    }
    @wire(displayPackRecords,{prodId:'$recordId'}) packs;

    handleRecordLoaded(event) {
        const { records } = event.detail;
        const recordData = records[this.recordId];
        this.productName = getFieldValue(recordData, NAME_FIELD);
        this.productDescription = getFieldValue(recordData, DESCRIPTION_FIELD);
    }

    /**
     * Handler for when a product is selected. When `this.recordId` changes, the
     * lightning-record-view-form component will detect the change and provision new data.
     */
    handleProductSelected(productId) {
        this.recordId = productId;
    }

   // @wire(displayPackRecords,{prodId:'$productId'}) packs;


    handleNavigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: PRODUCT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }

   
   /* handleDragStart(event) {
        event.dataTransfer.setData('pack', JSON.stringify(this.pack));
    }*/
}
