public with sharing class csvController {
    @AuraEnabled(cacheable = true)
    public static List<Account> fetchRecords(){
        return [Select Id, Name, Industry, Website, Phone from Account];       
    }
}