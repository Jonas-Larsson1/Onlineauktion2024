# Project - 'Producera och Leverera Mjukvara' - Group 3 

## Group members

### **Jonas Larsson**: [@Jonas-Larsson1](https://github.com/Jonas-Larsson1)
- **Features Developed:**
  - Auction page
  - Place bid on auctions
  - View auction bid history
  - Save auctions
  - Pay for auctions with Stripe
- **Components Built:**
  - ImageGallery
  - LimitBidHistory
  - Bidding
  - AddToWatchList
  - CheckoutNavButton
  - NotificationNavButton
  - ImageAdder
  - NewBid
  - AuctionPage
  - Checkout
  - Wonitem
  - Checkout

- **Endpoints Created:**
  - `POST /api/login` 
  - `POST /api/auctions` 
  - `POST /api/users` 
  - `GET /api/auctions` 
  - `GET /api/auction:id` 
  - `GET /api/login` 
  - `GET /api/users` 
  - `GET /api/user:id` 
  - `DELETE /api/login` 

  - `POST /api/create-checkout-session` 
  - `GET /api/wonAuctions` 
  - `PUT /api/auction:id` 
  - `PUT /api/auction/newBid:id` 
  - `PUT /api/pay-for-auctions/:paymentId` 
  - `PUT /api/user/:id` 
  - `DELETE /api/login` 
- **Tests Conducted:**
  - Search feature

---

### **Benjamin Segelström**: [@BenjaminSegel](https://github.com/BenjaminSegel)
- **Features Developed:**
  - Notifications when outbid
  - Create new auctions
- **Components Built:**
  - Notifications
  - SocketListener
  - NotificationPage
  - LoginPage
  - RegisterPage
  - NewAuctionPage
- **Endpoints Created:**
  - `POST /api/login` 
  - `POST /api/auctions` 
  - `POST /api/users` 
  - `GET /api/auctions` 
  - `GET /api/auction:id` 
  - `GET /api/login` 
  - `GET /api/users` 
  - `GET /api/user:id` 
  - `DELETE /api/login` 

  - `GET /api/notifications`
  - `PUT /api/auction/newBid:id` 
  - `DELETE /api/notifications:id`
- **Tests Conducted:**
  - Error handling user registration / new auction

---

### **Polina Bass Larsson**: [@polyalyameow](https://github.com/polyalyameow)
- **Features Developed:**
  - Search for auctions
  - Create new auctions
- **Components Built:**
  - Categories
  - SearchBar
  - SearchResults
  - SearchPage
  - NewAuctionpage
- **Endpoints Created:**
  - `POST /api/login` 
  - `POST /api/auctions` 
  - `POST /api/users` 
  - `GET /api/auctions` 
  - `GET /api/auction:id` 
  - `GET /api/login` 
  - `GET /api/users` 
  - `GET /api/user:id` 
  - `DELETE /api/login` 
- **Tests Conducted:**
  - Create auction feature

---

### **Robin Starke**: [@Starke-R](https://github.com/Starke-R)
- **Features Developed:**
  - Edit existing auctions
  - Nav and footer bar
  - Account page
  - Loading placeholder
- **Components Built:**
  - BackButton
  - EditButton
  - Loading
  - Navbar
  - Footer
  - AccountPage (all)
  - EditAuction
  - StyleCard
- **Endpoints Created:**
  - `POST /api/login` 
  - `POST /api/auctions` 
  - `POST /api/users` 
  - `GET /api/auctions` 
  - `GET /api/auction:id` 
  - `GET /api/login` 
  - `GET /api/users` 
  - `GET /api/user:id` 
  - `DELETE /api/login` 
- **Tests Conducted:**
  - Register user feature

---

### **Sigge Kingborg**: [@djaevil](https://github.com/djaevil)
- **Features Developed:**
  - View all auctions on front page
  - Filter auctions by status
- **Components Built:**
  - ListPage
  - ListItem
- **Endpoints Created:**
  - `POST /api/login` 
  - `POST /api/auctions` 
  - `POST /api/users` 
  - `GET /api/auctions` 
  - `GET /api/auction:id` 
  - `GET /api/login` 
  - `GET /api/users` 
  - `GET /api/user:id` 
  - `DELETE /api/login` 
- **Tests Conducted:**
  - Account page feature

---

### **Oliver Thulin**: [@Hoube14](https://github.com/Hoube14)
- **Features Developed:**
  - Auction page
  - Place bid on auctions
  - View auction bid history
  - Save auctions
  - Redirect when url is wrong or user not logged in
- **Components Built:**
  - ImageGallery
  - LimitBidHistory
  - Bidding
  - AddToWatchList
  - NewBid
  - AuctionPage
  - PageNotFound
  - AboutPage
- **Endpoints Created:**
  - `POST /api/login` 
  - `POST /api/auctions` 
  - `POST /api/users` 
  - `GET /api/auctions` 
  - `GET /api/auction:id` 
  - `GET /api/login` 
  - `GET /api/users` 
  - `GET /api/user:id` 
  - `DELETE /api/login` 
- **Tests Conducted:**
  - Auction bid feature