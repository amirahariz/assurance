public with sharing class PackController {
    @AuraEnabled(cacheable=true)
    public static List<Pack__c> getPacks() {
        return [
            SELECT Name, Description__c
            FROM Pack__c
            WITH SECURITY_ENFORCED
           
        ];
    }

    @AuraEnabled
    public static Pack__c getPackById(String packId){
       return[
        SELECT Name, Description__c
        FROM Pack__c
        WHERE Pack__c.Id=:packId
        WITH SECURITY_ENFORCED
       ];
    }
}
