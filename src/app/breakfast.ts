export class Breakfast {

    public _id: String;
    public title: String;
    public participants: Participant[];
    public availableProducts: Product[];
    public date: Date;
    public created: Date;
    public updated: Date;

    constructor() {}

    get titleDate(): any {
        return this.title + ' ' + this.date;
    }

    deserialize(input): any {
        this._id = input._id;
        this.title = input.title;
        this.participants = this.participants || [];
        input.participants.forEach(participant => {
            this.participants.push(new Participant().deserialize(participant));
        });
        this.availableProducts = this.availableProducts || [];
        input.availableProducts.forEach(product => {
            this.availableProducts.push(new Product().deserialize(product));
        });
        this.date = input.date;
        this.created = input.created;
        this.updated = input.updated;

        return this;
    }
}

export class Participant {
    public _id: String;
    public name: String;
    public products: Product[];

    constructor() {}

    get totalPrice(): Number {
        let sum = 0;
        this.products.forEach(product => {
            sum += +product.quantity * product.price;
        });
        return sum;
    }

    deserialize(input): any {
        this._id = input._id;
        this.name = input.name;
        this.products = this.products || [];
        input.products.forEach(product => {
            this.products.push(new Product().deserialize(product));
        });

        return this;
    }
}

export class Product {
    public _id: String;
    public quantity: number;
    public name: String;
    public price: number;

    constructor() {}

    deserialize(input): any {
        this._id = input._id;
        this.name = input.name;
        this.quantity = input.quantity;
        this.price = input.price;

        return this;
    }
}
