export class Product {
    name: string;
    expiry: Date;
    stock: number;
    heading: string;
    subheading: string;
    tags: string;
    description: string;
    id?: string;
}

export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ){}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}