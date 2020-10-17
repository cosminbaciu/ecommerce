package com.reljicd.service.impl;

import com.reljicd.exception.NotEnoughProductsInStockException;
import com.reljicd.model.Product;
import com.reljicd.repository.ProductRepository;
import com.reljicd.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

/**
 * Shopping Cart is implemented with a Map, and as a session bean
 *
 * @author Dusan
 */
@Service
//@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
//@Transactional
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ProductRepository productRepository;

    private List<Product> products = new ArrayList<>();

    @Autowired
    public ShoppingCartServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * If product is in the map just increment quantity by 1.
     * If product is not in the map with, add it with quantity 1
     *
     * @param product
     */
    @Override
    public void addProduct(Product product) {
        product.setQuantity(product.getQuantity() + 1);
        boolean found = false;
        for(Product product1 : products)
            if(product1.getName().equals(product.getName())) {
                product1.setQuantity(product1.getQuantity() + 1);
                found = true;
            }
        if(!found)
         products.add(product);
    }

    @Override
    public void substractProduct(Product product) {
        for(Product product1 : products)
            if(product1.getName().equals(product.getName())) {
                product1.setQuantity(product1.getQuantity() - 1);
            }
    }

    /**
     * If product is in the map with quantity > 1, just decrement quantity by 1.
     * If product is in the map with quantity 1, remove it from map
     *
     * @param product
     */
    @Override
    public void removeProduct(Product product) {
        long id;
        products.removeIf(product1 -> product1.getName().equals(product.getName()));
    }

    /**
     * @return unmodifiable copy of the map
     */
    @Override
    public List<Product> getProductsInCart() {

        System.out.println(products);
        return products;
    }

    /**
     * Checkout will rollback if there is not enough of some product in stock
     *
     * @throws NotEnoughProductsInStockException
     */
    @Override
    public void checkout() throws NotEnoughProductsInStockException {
//        Product product;
//        for (Map.Entry<Product, Integer> entry : products.entrySet()) {
//            // Refresh quantity for every product before checking
//            product = productRepository.findOne(entry.getKey().getId());
//            if (product.getQuantity() < entry.getValue())
//                throw new NotEnoughProductsInStockException(product);
//            entry.getKey().setQuantity(product.getQuantity() - entry.getValue());
//        }
//        productRepository.save(products.keySet());
//        productRepository.flush();
//        products.clear();
    }

    @Override
    public BigDecimal getTotal() {
        return products.stream()
                .map(entry -> entry.getPrice().multiply(BigDecimal.valueOf(entry.getQuantity())))
                .reduce(BigDecimal::add)
                .orElse(BigDecimal.ZERO);
    }
}
