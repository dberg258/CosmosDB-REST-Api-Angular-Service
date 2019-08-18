# CosmosDB REST Api Angular Service

*  Contained within this repository is an Angular Service for sending CosmosDB REST api requests.
*  The request in the included file returns the documents in a CosmosDB container. However, a few minor changes can be made to make any CosmosDB request.
* For further information regarding the CosmosDB REST api, [here](https://docs.microsoft.com/en-us/rest/api/cosmos-db/) is the offical documentation.

## Setup

*  In the included file, populate the following variables:
    * cosmosKey = ""; --> one of the access keys for your CosmosDB accout.
    * cosmosAccountName = ""; --> the name of your CosmosDB account.
    * cosmosContainer = ""; --> the container in your CosmosDB you want the documents returned from.
*  Call sendRequest().

## Change Request Type
*  If you would like to make a different CosmosDB REST api request, simplly change the following two variables:
    * const resourceId = 'dbs/' + this.cosmosAccountName + '/colls/' + this.cosmosContainer; --> found within getAuthorization(), change this to the desired resoureId url.
    * Within getCosmosUrl(), change the provided url to the desired CosmosDB REST api url. Leave 'https://cors-anywhere.herokuapp.com/https://' at the beggnining of any url you decide to use, as it will prevent a common error from happening.
