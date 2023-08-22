/**
 * This function calculates the total price of a list of products
 * @param {Array} products cartProducts: Array of objects 
 * @returns {number} Total price of products
 */

export const totalPrice = (products) => {
    let sum = 0
    products.forEach(product => sum += product.price)
    return sum
}