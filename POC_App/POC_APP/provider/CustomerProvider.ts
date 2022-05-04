import axios from 'axios';
import ICustomer from '../Interfaces/ICustomer';

const customerProvider = async (): Promise < ICustomer[] > => {
    let customers: ICustomer[] = [];
    try {
        // customers = await axios.get('https://10.0.2.2:7013/api/customer', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // });
        const response = await fetch('https://10.0.2.2:7013/api/customer', {mode: 'cors'});
        const data = await response.json();
        console.log("AAAA",{data});
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