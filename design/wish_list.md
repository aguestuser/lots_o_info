# Design wish list

## Clean up tasks needed after parse

* identify `owners_of_unknown_type` that should be companies
  * determine identity through:
    * match btw/ property.owned_by.name & company.name
      * (former from PLUTO, latter from DOB)

* identify `owners_of_uknown_type` that should be people
  * deterimine identity through:
    * match btw/ property.owned_by.name & person.name
      * (former from PLUTO, latter from DOB)
    q
* dedupe business names (easy)
  * determine identity through:
    * common name field (decisive)
    * similar name field (decisive?, if not, then also:)
    * look for common office addresses
    * look for common employee/owner name fields (non-decisive)
  * once identity established:
    * concatenate arrays of 
    * concatenate arrays of employees (if any)
    * concatenate arrays of owned_by fields (if any)
    * concatenate arrays of 
  
* dedupe people names
  * look for common business owns/works_for name fields (non-decisive)
  * look for common home addresses

## Queries Needed:

* all owners of unknown type
  * provide cite to transform to company or person
  * create new doc in company or persons collection
  * give it name of `owner_of_unkonwn_type`
  * give it owns: PropertyId 
  * update property owned_by to PersonID/CompanyID

* find & resolve companies that own properties 
  ```
    [company, property] where 
      property.owned_by.memberOf('owners_of_unknown_type') && 
      company.name ~== property.owned_by.name
  ``` 

* find people that might own companies
  ```
  [person, company] where
    person.tied_to
    ```

## DB accessors needed
* change `owner_of_unknown_type` to `person` or `company`
* 


## Mods to parser needed

* DOB property fields
  * task:
    * extend existing property fields (don't make new or overwrite)
  * how:
    * add `extends` field to translations obj (where?)
    * 
    
* DOB business/business owner fields (do what??)
  * task:
  *

