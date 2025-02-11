import { LightningElement, wire} from 'lwc';
import fetchRecords from '@salesforce/apex/csvController.fetchRecords';
export default class CsvComponent extends LightningElement {
    accountData = [];
    columns = [
        { label: 'Acccount Name', fieldName: 'name' },
        { label: 'Website', fieldName: 'website', type: 'url' },
        { label: 'Phone', fieldName: 'phone', type: 'phone' },
        { label: 'Industry', fieldName: 'Industry', type: 'text' }
    ];
    @wire(fetchRecords) wiredFunction({data, Error}){
        if(data){
            this.accountData = data;
        }else if(error){
            console.log(error);

        }
    }

    get checkRecord(){
        return this.accountData.length > 0 ? false : true;
    }
}