public with sharing class PackController {
    @AuraEnabled(cacheable=true)
    public static List<Pack__c> getPacks() {
        return [
            SELECT Name, Description__c
            FROM Pack__c
            WITH SECURITY_ENFORCED
           
        ];
    }
}
