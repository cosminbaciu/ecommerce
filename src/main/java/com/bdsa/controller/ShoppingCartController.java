package com.reljicd.controller;

import com.reljicd.model.Product;
import com.reljicd.service.ProductService;
import com.reljicd.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    private final ProductService productService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService, ProductService productService) {
        this.shoppingCartService = shoppingCartService;
        this.productService = productService;
    }

    @GetMapping("/shoppingCart")
    public ResponseEntity<List<Product>> shoppingCart() {
        return new ResponseEntity<>(shoppingCartService.getProductsInCart(), HttpStatus.OK);
    }

    @GetMapping("/total")
    public ResponseEntity<String> shoppingCartTotal() {

        return new ResponseEntity<>(shoppingCartService.getTotal().toString(), HttpStatus.OK);
    }

    @PostMapping("/shoppingCart/addProduct/{productId}")
    public ResponseEntity<List<Product>> addProductToCart(@PathVariable("productId") Long productId) {
        productService.findById(productId).ifPresent(shoppingCartService::addProduct);
        return shoppingCart();
    }

    @RequestMapping(value = "/shoppingCart/substractProduct/{productId}", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<List<Product>> substractProductToCart(@PathVariable("productId") Long productId) {
        productService.findById(productId).ifPresent(shoppingCartService::substractProduct);
        return shoppingCart();
    }

    @DeleteMapping("/shoppingCart/removeProduct/{productId}")
    public ResponseEntity<List<Product>> removeProductFromCart(@PathVariable("productId") Long productId) {
        productService.findById(productId).ifPresent(shoppingCartService::removeProduct);
        return shoppingCart();
    }

//    @GetMapping("/shoppingCart/checkout")
//    public ResponseEntity<Map<Product, Integer>> checkout() {
//        try {
//            shoppingCartService.checkout();
//        } catch (NotEnoughProductsInStockException e) {
//            return shoppingCart().addObject("outOfStockMessage", e.getMessage());
//        }
//        return shoppingCart();
//    }
}
