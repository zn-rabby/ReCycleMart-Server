

# ReCycleMart 🛒

SecondHand is a web application designed to facilitate the buying and selling of used items. Users can post listings, browse products, and communicate securely with sellers. The platform provides a seamless and secure experience for all users.

---

## Live Deployment

- **Frontend(Live)**: [https://secondhand-client.vercel.app/](https://secondhand-client.vercel.app/)
- **Backend**: [https://second-hand-server-puce.vercel.app](https://second-hand-server-puce.vercel.app)

---

## Features

### User Features
- **User Authentication**: Secure login system using email/phone number and password.
- **User Dashboard**:
  - Post items for sale with descriptions, images, pricing, and categories.
  - Manage listings (update, delete).
  - Track sales and purchases.
  - Edit personal details.
  - Save items to a wishlist.
- **Listings & Search**:
  - Search and filter items by category, price, condition, and location.
  - Mark items as sold after a sale.
- **Communication & Transactions (Optional)**:
  - Messaging system for buyers and sellers.
  - Order management for tracking purchases and sales.

### Admin Features (Optional)
- **User Management**: Ban/unban users.
- **Listing Management**: Delete inappropriate listings.

---

## Tech Stack

### Frontend
- **Next.js**: For server-side rendering (SSR) and static site generation (SSG).
- **TypeScript**: For type safety and better code quality.

### Backend
- **Express.js**: For building the REST API.
- **MongoDB**: For storing user and product data.
- **JWT**: For secure authentication.
- **bcrypt**: For password hashing.

### Deployment
- **Frontend**: Vercel, Netlify.
- **Backend**: Vercel, Railway.

---

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas or local MongoDB instance
- Git

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/zn-rabby/SecondHand-Server.git
   cd SecondHand-Server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the Backend Server**:
   ```bash
   npm start
   ```

5. **Frontend Setup**:
   - Clone the frontend repository (if separate).
   - Install dependencies and start the frontend server.

6. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000` for the frontend.

---

## API Endpoints

### Authentication
- `POST /auth/register` – Register a new user.
- `POST /auth/login` – User login.
- `POST /auth/logout` – Logout user.

### Listings
- `GET /listings` – Retrieve all available listings.
- `GET /listings/:id` – Retrieve details of a specific listing.
- `POST /listings` – Create a new product listing.
- `PUT /listings/:id` – Update listing details.
- `DELETE /listings/:id` – Remove a listing.

### User Management
- `GET /users/:id` – Retrieve user details.
- `PUT /users/:id` – Update user profile.
- `DELETE /users/:id` – Delete user account.

### Transactions & Purchases
- `GET /purchases/:userId` – Fetch purchase history.
- `GET /sales/:userId` – Fetch sales history.
- `POST /transactions` – Create a new transaction.
- `PUT /transactions/:id` – Update transaction status.

### Admin (Optional)
- `PUT /users/:id/ban` – Ban/unban a user.
- `DELETE /listings/:id` – Delete a listing.

### Messages (Optional)
- `POST /messages` – Send a message.
- `GET /messages/:userId` – Retrieve user messages.

---

## Database Schema

### Users Collection
- `name`: String
- `email`: String (unique)
- `phone number`: String
- `password`: String (hashed)
- `role`: String (default: "user")

### Listings Collection
- `title`: String
- `description`: String
- `price`: Number
- `condition`: String
- `images`: Array of Strings
- `userID`: ObjectId (reference to Users Collection)
- `status`: String (default: "available")

### Transactions Collection
- `buyerID`: ObjectId (reference to Users Collection)
- `sellerID`: ObjectId (reference to Users Collection)
- `itemID`: ObjectId (reference to Listings Collection)
- `status`: String (default: "pending")

### Messages Collection (Optional)
- `senderID`: ObjectId (reference to Users Collection)
- `receiverID`: ObjectId (reference to Users Collection)
- `message`: String
- `timestamp`: Date

---

## UI/UX Design Considerations
- **Responsive Design**: Mobile-friendly layout.
- **Modern UI/UX**: Simple navigation, clear CTAs, and intuitive interface.
- **User-friendly Forms**: Easy-to-use forms for posting listings, searching, and communication.

---

## Additional Features
- **Email Notifications**:
  - For buyers: When a seller responds to their inquiry.
  - For sellers: When they receive a new inquiry.
- **Role-Based Access Control**: Buyers and sellers have equal access; optional admin role for moderation.

---

## Contribution Guidelines
- Fork the repository and create a new branch for your feature/bugfix.
- Follow the coding standards and best practices.
- Submit a pull request with a detailed description of your changes.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact
For any queries or feedback, feel free to reach out:
- **Name**: Rabby
- **Email**: zn.rabby@gmail.com
- **GitHub**: [zn-rabby](https://github.com/zn-rabby)

