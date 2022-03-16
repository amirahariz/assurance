import { LightningElement, api, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import PACK_SELECTED_MESSAGE from '@salesforce/messageChannel/PackSelected__c';

// Utils to extract field values
import { getFieldValue } from 'lightning/uiRecordApi';

// Pack__c Schema
import NAME_FIELD from '@salesforce/schema/Pack__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Pack__c.Description__c';


const CSS_CLASS = "modal-hidden";

export default class PackPopup extends LightningElement {
    showModal = false;

    @api show(){
        this.showModal = true;
    }
    handleDialogClose(){
        this.showModal = false;
    }

    // Exposing fields to make them available in the template
    nameField = NAME_FIELD;
    descriptionField = DESCRIPTION_FIELD;

    // Id of Pack__c to display
    recordId;

    // Pack fields displayed with specific format
    packName;
    packDescription;

    /** Load context for Lightning Messaging Service */
    @wire(MessageContext) messageContext;

    /** Subscription for PackSelected Lightning message */
    packSelectionSubscription;

    connectedCallback() {
        // Subscribe to PackSelected message
        this.packSelectionSubscription = subscribe(
            this.messageContext,
            PACK_SELECTED_MESSAGE,
            (message) => this.handlePackSelected(message.packId)
        );
    }

    handleRecordLoaded(event) {
        const { records } = event.detail;
        const recordData = records[this.recordId];
        this.packName = getFieldValue(recordData, NAME_FIELD);
        this.packDescription = getFieldValue(recordData, DESCRIPTION_FIELD);
    }

    /**
     * Handler for when a pack is selected. When `this.recordId` changes, the
     * lightning-record-view-form component will detect the change and provision new data.
     */
    handlePackSelected(packId) {
        this.recordId = packId;
    }


}