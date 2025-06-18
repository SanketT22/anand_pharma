# Anand Pharma Website

A professional medical store website for Anand Pharma with product catalog management, Excel file upload functionality, and Firebase integration.

## Features

- **Homepage**: Professional landing page with store information and featured products
- **Product Catalog**: Searchable and filterable catalog with 600+ products
- **Admin Panel**: Secure file upload system for updating product catalog via Excel files
- **Contact Page**: Contact information and inquiry form
- **Firebase Integration**: Real-time database for product storage
- **Responsive Design**: Mobile-first design that works on all devices
- **Excel Processing**: Automatic parsing and categorization of product data

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Copy your Firebase configuration
4. Create a `.env.local` file and add your Firebase credentials:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 3. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Usage

### Admin Access
- Navigate to `/admin`
- Default password: `anandpharma2024`
- Upload Excel files with columns: PRODUCT, UNIT, COMPANY FULL NAME

### Excel File Format
Your Excel file should have these columns:
- **PRODUCT**: Product name (e.g., "ENSURE CH-RF")
- **UNIT**: Unit/size (e.g., "200GM", "2+1 OFFER")
- **COMPANY FULL NAME**: Company name (e.g., "ABBOTT HEALTH(NUT)")

### Product Categories
Products are automatically categorized into:
- Nutritional Supplements
- Personal Care
- Oral Care
- Pain Relief
- Baby Products
- Feminine Hygiene
- Cosmetics
- Miscellaneous

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your Firebase environment variables in Vercel dashboard
4. Deploy

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Store Information

- **Name**: Anand Pharma
- **Phone**: 02423222396
- **Mobile**: 8208411296
- **Email**: anandpharma1993@gmail.com
- **Established**: 1993

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **File Processing**: xlsx library
- **Icons**: Lucide React

## Security Features

- Password-protected admin panel
- Input validation for file uploads
- Firebase security rules
- Error handling and user feedback

## Support

For technical support or questions about the website, please contact the development team or refer to the documentation.
