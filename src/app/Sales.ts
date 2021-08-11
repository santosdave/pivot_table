/**
 * An instance or instances of sale of a product to a customer
 */
 export interface Sales {
    /**
     * The category of the product sold.
     */
    category: string;
  
    /**
     * The city in which the customer's shipping address resides.
     */
    city: string;
  
    /**
     * The country in which the customer's shipping address resides.
     */
    country: string;
  
    /**
     * The customer's unique identifier.
     */
    customerId: string;
  
    /**
     * The customer's name.
     */
    customerName: string;
  
    /**
     * The discount ratio applied to the order, where 0 means no discount and 1
     * means the product was free.
     */
    discount: number;
  
    /**
     * The date on which the order took place.
     */
    orderDate: string;
  
    /**
     * The order's unique identifier.
     */
    orderId: string;
  
    /**
     * The postal code in which the customer's shipping address resides.
     */
    postalCode: number;
  
    /**
     * The unique identifier of the product ordered.
     */
    productId: string;
  
    /**
     * The product's name.
     */
    productName: string;
  
    /**
     * The amount of profit made from the order.
     */
    profit: number;
  
    /**
     * The number of instances of the product ordered.
     */
    quantity: number;
  
    /**
     * The geographical region in which the customer's shipping address resides.
     */
    region: string;
  
    /**
     * The identifier for the order's record in the dataset.
     */
    rowId: number;
  
    /**
     * The total sale amount of the order.
     */
    sales: number;
  
    /**
     * The type of customer who ordered the product.
     */
    segment: string;
  
    /**
     * The date on which the product ordered was shipped.
     */
    shipDate: string;
  
    /**
     * The type of shipping by which the product ordered was shipped.
     */
    shipMode: string;
  
    /**
     * The state in which the customer's shipping address resides.
     */
    state: string;
  
    /**
     * The subcategory within {@link category} of the product sold.
     */
    subCategory: string;
  }
  