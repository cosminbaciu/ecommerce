package com.reljicd.service;

import com.reljicd.exception.NotEnoughProductsInStockException;
import com.reljicd.model.Product;

import java.math.BigDecimal;
import java.util.List;

public interface ShoppingCartService {

    void addProduct(Product product);

    void substractProduct(Product product);

    void removeProduct(Product product);

    List<Product> getProductsInCart();

    void checkout() throws NotEnoughProductsInStockException;

    BigDecimal getTotal();
}
