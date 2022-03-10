public with sharing class ProductController {
    static Integer PAGE_SIZE = 9;

    @AuraEnabled(Cacheable=true)
    public static PagedResult getProducts(Integer pageNumber) {
       
        String whereClause = '';
        Integer pageSize = ProductController.PAGE_SIZE;
        Integer offset = (pageNumber - 1) * pageSize;
        PagedResult result = new PagedResult();
        result.pageSize = pageSize;
        result.pageNumber = pageNumber;
        result.totalItemCount = Database.countQuery(
            'SELECT count() FROM Product2 ' + whereClause
        );      
        result.records = Database.query(
            'SELECT Id, Name, Description FROM Product2 ' + 
            ' WITH SECURITY_ENFORCED' +
            ' ORDER BY Name '
        );
        return result;
    }

   
}
