export const phonePattern = /^[/+]?[(]?[0-9]{3}[)]?[-\s/.]?[0-9]{3}[-\s/.]?[0-9]{4,9}$/;
export const emailPattern = /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
export const currencyPattern = /^-?\d+(,\d{3})*(\.\d{1,2})?$/;
export const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const defaultValues = {
        fname: '',
        lname: '',
        address: '',
        phone_num: '',
        gender: '',
        status: '',
        nationality: '',
        sponsor: '',
        sponsor_phone: '',
        sponsor_address: '',
        duration: '',
        fee: '',
        ini_depo: '',
        email: '',
        reg_num: ''
};

export const loginValues = {
        user_email: '',
        user_password: ''
}

export const regValues = {
        user_email: '',
        user_password: '',
        confirm_password: '',
        username: '',
        fname: '',
        lname: ''
}