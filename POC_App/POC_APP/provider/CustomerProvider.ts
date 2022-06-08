import ICustomer from '../Interfaces/ICustomer';
import axios from 'axios';

const customerProvider = async (): Promise < ICustomer[] > => {
    let customers: ICustomer[] = [];
    try {
        // customers = await axios.get('https://127.0.0.1:7013/api/customer', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     }
        // });
        const response = await fetch('http://10.0.2.2:5013/api/customer', {mode: 'cors'});
        const data = await response.json();
        console.log("Customers: ",{data});
        customers = data;
    } catch (error) {
        console.log(error);
        customers = [{
            id: 1,
            name: "abdada",
            address: "string",
            phoneNumber: 2,
            owner: "string",
        }, {
            id: 1,
            name: "wdaawa",
            address: "string",
            phoneNumber: 221,
            owner: "string",
        }];
    }
    return customers;
}
export default customerProvider;