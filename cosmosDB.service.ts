import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as Crypto from 'crypto-js';
import { Observable } from 'rxjs';

export class CosmosDBService {

    private cosmosKey = "";
    private cosmosAccountName = "";
    private cosmosContainer = "";

    constructor(private http: HttpClient) { }


    // CosmosDB Rest api request headers
    headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json+query',
            'Authorization': this.getAuthorization(),
            'x-ms-date': new Date().toUTCString(),
            'x-ms-version': '2018-12-31'
        })
    };

    // Returns response from CosmosDB REST api request of all collections
    sendRequest(): Observable {
        return this.http.get(this.getCosmosUrl(), this.headers);
    }

    // Returns authorization key for CosmosDB REST api request header
    getAuthorization(): string {
        const resourceType = 'docs';
        const masterKey = this.cosmosKey;
        const resourceId = 'dbs/' + this.cosmosAccountName + '/colls/' + this.cosmosContainer;
        const utcDate = new Date().toUTCString();
        const verb = 'GET';
        const text = (verb || '').toLowerCase() + '\n' + (resourceType || '').toLowerCase() + '\n' + (resourceId || '') + '\n' + utcDate.toLowerCase() + '\n' + '' + '\n';
        const key = Crypto.enc.Base64.parse(masterKey);
        const signature = Crypto.HmacSHA256(text, key).toString(Crypto.enc.Base64);
        const MasterToken = 'master';
        const TokenVersion = '1.0';
        const authToken = encodeURIComponent('type=' + MasterToken + '&ver=' + TokenVersion + '&sig=' + signature);
        return authToken;
    }

    // Returns url for CosmosDB REST api
    getCosmosUrl(): string {
        return 'https://cors-anywhere.herokuapp.com/https://' + this.cosmosAccountName + '.documents.azure.com/dbs/' + this.cosmosAccountName + '/colls/' + this.cosmosContainer + '/docs';
    }

}