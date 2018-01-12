import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {BreakfastService} from '../breakfast.service';
import {Breakfast, Participant, Product} from '../breakfast';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-breakfast',
    templateUrl: './breakfast.component.html',
    styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit, OnChanges {
    public breakfast: Breakfast;
    public newParticipationPrice: number = 0;
    @Input() participantForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private breakfastService: BreakfastService) {
        this.participantForm = this.formBuilder.group({
            name: ['', Validators.required],
            orderedProducts: this.formBuilder.array([])
        });
        this.onChanges();
    }

    ngOnInit() {
        this.route.params.subscribe(_ => {
            this.getBreakfast(this.route.snapshot.paramMap.get('id'));
        });
    }

    getBreakfast(id: String): void {
        this.breakfastService
            .getBreakfast(id)
            .subscribe((breakfast: Breakfast) => {
                console.log(breakfast.titleDate);
                breakfast.participants.forEach(participant => {
                    console.log(participant.totalPrice);
                });
                this.breakfast = breakfast;
                console.log(this.breakfast);
                this.fillProducts();
            });
    }

    fillProducts() {
        const productsFGs = this.breakfast.availableProducts.map((product: Product) => {
            product.quantity = 0;
            return this.formBuilder.group(product);
        });
        const productsFromArray = this.formBuilder.array(productsFGs);
        this.participantForm.setControl('orderedProducts', productsFromArray);
    }

    get orderedProducts(): FormArray {
        return this.participantForm.get('orderedProducts') as FormArray;
    }

    ngOnChanges() {
        console.log(123, arguments);
    }

    onChanges() {
        this.participantForm.valueChanges.subscribe(particpant => {
            this.newParticipationPrice = 0;
            particpant.orderedProducts.forEach((product) => {
                this.newParticipationPrice += +product.quantity * product.price;
            });
        });
    }

    onSubmit() {
        const participant = new Participant();
        participant.name = this.participantForm.value.name;
        const products = [];
        this.participantForm.value.orderedProducts.forEach(product => {
            const p = new Product().deserialize(product);
            products.push(p);
        });
        participant.products = products;
        this.breakfastService.saveParticipant(this.breakfast, participant).subscribe(_ => this.getBreakfast(this.breakfast._id));
    }

    getSum(productName: String): Number {
        let sum = 0;
        this.breakfast.participants.forEach(participant => {
            participant.products.forEach(product => {
                if (product.name === productName) {
                    sum += +product.quantity;
                }
            });
        });
        return sum;
    }

    getSumPrice (productName: String): Number {
        let sum = 0;
        this.breakfast.participants.forEach(participant => {
            participant.products.forEach(product => {
                if (product.name === productName) {
                    sum += +product.quantity * product.price;
                }
            });
        });
        return sum;
    }

    get totalPrice(): Number {
        let sum = 0;
        this.breakfast.participants.forEach(participant => {
            participant.products.forEach(product => {
                sum += +product.quantity * product.price;
            });
        });
        return sum;
    }
}
