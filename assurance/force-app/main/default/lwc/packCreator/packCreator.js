import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import PACK_OBJECT from '@salesforce/schema/Pack__c';
import NAME_FIELD from '@salesforce/schema/Pack__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Pack__c.Description__c';
import PRODUCT_FIELD from '@salesforce/schema/Pack__c.Product__c';
//import getListProducts from '@salesforce/apex/ProductController.getListProducts';
import {NavigationMixin} from 'lightning/navigation';


export default class ProductCreator extends NavigationMixin(LightningElement) {
  /*  objectApiName = PACK_OBJECT;
    fields = [NAME_FIELD, DESCRIPTION_FIELD,PRODUCT_FIELD];
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Pack created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
    @wire(getListProducts)
    products; */

    createNewPack(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                actionName: "new",
                objectApiName: "Pack__c"
            }
        })
    }


}