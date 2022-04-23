export default class Bike {
    image: string;
    type: string;
    size: number;
    color: string;
    brand: string;
    model: string;
    buyDate: object;
    dayPrice: number;
    weekendPrice: number;
    weekPrice: number;
    monthPrice: number;

    constructor(image: string, type: string, size: number, color: string, brand: string, model: string, buyDate: object, dayPrice: number, weekendPrice: number, weekPrice: number, monthPrice: number) {
        this.image = image;
        this.type = type;
        this.size = size;
        this.color = color;
        this.brand = brand;
        this.model = model;
        this.buyDate = buyDate;
        this.dayPrice = dayPrice;
        this.weekendPrice = weekendPrice;
        this.weekPrice = weekPrice;
        this.monthPrice = monthPrice;
    }
}