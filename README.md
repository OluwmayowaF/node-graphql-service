# node-graphql-service

Deployed App `https://nodeqraphql-service.herokuapp.com/api`

Please Note an Auth token (passed as `Authorization: Bearer {authToken}`) signed with the provided Service account credentials is required to access the server routes. 

## The Following Queries were implemented 
1. Fetch an order a given order uid. `order(uid)`
2. Fetch all orders between a given booking date range. It should take fromDate and toDate unix timestamps. `orders(fromDate, toDate)`
3. Fetch all order for a given customer email customer.email. It should take email field. `orders(email)`

## The Following Mutations were implemented 
1. Create a new order in the orders collection. It should accept the title, bookingDate, address `addOrder(title, bookingDate, customer, address)`and customer fields.

2. Delete the order for the given order uid. `deleteOrder(uid)`
3. Delete all orders for a given customer email customer.email. `deleteOrder(email)`

## Local Setup 

1. Clone repo locally git clone `git@github.com:OluwmayowaF/node-graphql-service.git`
2. Run `npm install` in root directory 
3. Setup Environment with `.env.example` file provided for either Firebase 
4. For Dev 
  - Run `npm run dev`
5. For Prod 
   - Run build `npm run build`
   - Start Server `npm run serve`

   