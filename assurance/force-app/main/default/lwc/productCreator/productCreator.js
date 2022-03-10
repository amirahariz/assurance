import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import NAME_FIELD from '@salesforce/schema/Product2.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Product2.Description';
import {NavigationMixin} from 'lightning/navigation';

export default class ProductCreator extends NavigationMixin(LightningElement) {
    objectApiName = PRODUCT_OBJECT;
    fields = [NAME_FIELD, DESCRIPTION_FIELD];
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Product created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

    viewProducts(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                actionName: "home",
                objectApiName: "Product2"
            }
        })
    }
}