/*const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    PName:{type: String, required: true, trim: true},
    PDescription:{type: String, required: true},
    PCategory:{type: String, required: true},
    PBrand:{type: String, required: true},
    PAmount:{type: Number, required: true},
    PPrice:{type: Number, required: true},
    PImage:{type: String}
},{
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;*/
module.exports = function Cart(oldCart) {
    this.items =oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item,id) {
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item:item,qty:0,price:0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;
    }

    this.generateArray =function () {
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
     }
}