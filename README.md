# Development

### Link to Deployed Website
https://smartfox998.github.io/Grocery-Store/

### Goal and Value of the Application
This is an application that can be used by grocery store. Users can add or remove products based on their requirements. Users can use the filter area on the left to choose their preferred product type. They can also sort the products by price and rating.

### Usability Principles Considered

* The shopping cart is sticked on the right to make sure users could always see the updates.

* The filter and sort section is sticked on the left, it won't disappear when users scroll down or up to browse through products.

* There is a **All** choice for both two filters to make sure users could revert back to the original state without refreshing the page.

### Organization of Components

There are 6 components in total in this application:

* TypeFilterSection: This is the component for the filter that can filter products by type.

* AvailableFilterSection: This is the component for the filter that can filter products by availability (pick up or delivery).

* CartSection: This is the component for shopping cart section.

* DisplayList: This is the component for the section showing all the products which also includes the **addToCart** function to add product to shopping cart and the **removeFromCart** function to remove the product from shopping cart.

* GroceryItem: This is the component for each individual product. It includes the layout of a product: product image, product name, product type, availability, rating, price and two buttons for add and remove.

* SortSection: This is the component for sort section, which includes two sort methods --- sort by price and sort by rating.

### How Data is Passed Down Through Components

### How the User Triggers State Changes

