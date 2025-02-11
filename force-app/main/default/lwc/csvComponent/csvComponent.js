import { LightningElement, wire} from 'lwc';
import fetchRecords from '@salesforce/apex/csvController.fetchRecords';
export default class CsvComponent extends LightningElement {
    accountData = [];
    columns = [
        { label: 'Acccount Name', fieldName: 'Name' },
        { label: 'Website', fieldName: 'website', type: 'url' },
        { label: 'Phone', fieldName: 'phone', type: 'phone' },
        { label: 'Industry', fieldName: 'Industry', type: 'text' }
    ];
    @wire(fetchRecords) wiredFunction({data, error}){
        if(data){
            this.accountData = data;
        }else if(error){
            console.log(error);

        }
    }

    get checkRecord(){
        return this.accountData.length > 0 ? false : true;
    }

    clickHandler(){
        console.log('Clicked');
        let selectedRows = [];
        let downloadRecords = [];
        selectedRows = this.template.querySelector("lightning-datatable").getSelectedRows();

        if(selectedRows.length > 0){
            downloadRecords = [...selectedRows];
        }
        else{
            downloadRecords = [...this.accountData];
        }
        this.parsedObject = structuredClone(downloadRecords);
        let csvFile = this.convertArrayToCSV(this.parsedObject);
        this.createLinkForDownload(csvFile);
    }

    convertArrayToCSV(parsedObject){
        console.log('inside convert method');
        let csvHeader = Object.keys(parsedObject[0]).toString();
        let csvBody = parsedObject.map(currItem =>
            Object.values(currItem).map(value => `"${value}"`).join(',')
        );
        let csvFile = csvHeader + '\n' + csvBody.join('\n');
        return csvFile;
    }

    createLinkForDownload(csvFile){
        const downlink = document.createElement("a");
        downlink.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(csvFile);
        downlink.target = '_blank';
        downlink.download = 'Account_Data.csv';
        document.body.appendChild(downlink);
        console.log('Doenlaod merhod caledejwbsrkgbv');
        downlink.click();
        document.body.removeChild(downlink);

    }
}