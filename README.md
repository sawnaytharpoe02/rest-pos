# Food Ordering System

This project provides a user-friendly and efficient food ordering experience for both customers and restaurants.

## Features

- Fast and Detailed Ordering: Users can quickly scan a QR code to access the ordering page and browse through menus by category. The detailed menu descriptions allow for informed choices.
- Streamlined Kitchen Operations: Orders appear directly in the kitchen interface, enabling chefs to easily manage preparation and update order status (pending, cooking, complete).
- Beautiful Landing Page: The landing page serves as a welcoming introduction to your restaurant.

## Tech Stack

- Frontend: Material UI, Next.js
- Type Safety: TypeScript
- API: Next.js API routes
- Database: PostgreSQL
- ORM: Prisma
- State Management: Redux Toolkit
- Image Storage: DigitalOcean Spaces
- QR Code Generation: qrcode package
- File Handling: multer package

## Getting Started

### Environment Variables

Create a `.env` file in the root directory of your project and add the following variables with your specific values.(Google OAuth credentials, API base URLs, database connection string, etc.).

```plaintext
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXT_PUBLIC_BACKOFFICE_API_BASE_URL='http://localhost:3000/api/backoffice'
NEXT_PUBLIC_ORDER_API_BASE_URL='http://localhost:3000/api/order'
NEXT_PUBLIC_BACKOFFICE_BASE_URL='http://localhost:3000/backoffice'
NEXT_PUBLIC_ORDER_APP_URL='http://localhost:3000/order'
NEXTAUTH_SECRET='your_secret_key'
NEXT_PUBLIC_SPACE_ENDPOINT=https://sgp1.digitaloceanspaces.com
NEXT_PUBLIC_SPACE_ACCESS_KEY_ID=""
NEXT_PUBLIC_SPACE_SECRET_ACCESS_KEY=""
DATABASE_URL="postgresql://postgres:root@localhost:5432/your_database_name?schema=public"
```

### Installation

1. Run `npm install` or `yarn install` to install dependencies.
2. Initialize Prisma with `npx prisma init`.
3. Generate the Prisma client with `npx prisma generate`.
4. (Optional) Run database migrations (if needed) with `npx prisma migrate dev`.

### Database Management

Use `npx prisma studio` to visually manage your database schema.

### Development

Start the development server with `npm run dev` or `yarn dev`.

## Usage

### Landing Page

### Backoffice (Restaurant Management)

- Login with Google Authentication.
- Upon successful login, the system automatically creates default data for your restaurant (company, location, tables, menus, etc.).
- Update menus, manage add-ons, and configure other restaurant settings.
- View and manage incoming orders.

### User Ordering

1. Scan the QR code to access the ordering page.
2. Browse menus by category and view detailed descriptions of each item.
3. Select add-ons, quantities, and add items to the cart.
4. Confirm and submit the order.
5. Track the order status (pending, cooking, complete).




