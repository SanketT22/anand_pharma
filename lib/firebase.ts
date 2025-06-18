import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, deleteDoc, type Firestore } from "firebase/firestore"

export interface Product {
  id?: string
  name: string
  unit: string
  company: string
  category: string
}

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "demo-api-key" &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== "anand-pharma-demo"
  )
}

let app: FirebaseApp | null = null
let db: Firestore | null = null

// Only initialize Firebase if properly configured
if (isFirebaseConfigured()) {
  try {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }

    // Initialize Firebase only if it hasn't been initialized
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    db = getFirestore(app)
    console.log("Firebase initialized successfully")
  } catch (error) {
    console.error("Firebase initialization error:", error)
    app = null
    db = null
  }
} else {
  console.log("Firebase not configured - using local storage fallback")
}

export const uploadProducts = async (products: Omit<Product, "id">[]): Promise<void> => {
  if (!db || !isFirebaseConfigured()) {
    // Store in localStorage as fallback
    if (typeof window !== "undefined") {
      localStorage.setItem("anand-pharma-products", JSON.stringify(products))
      return
    }
    throw new Error("Unable to store products - no storage available")
  }

  try {
    // Clear existing products
    const querySnapshot = await getDocs(collection(db, "products"))
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref))
    await Promise.all(deletePromises)

    // Add new products
    const addPromises = products.map((product) => addDoc(collection(db, "products"), product))
    await Promise.all(addPromises)
  } catch (error) {
    console.error("Error uploading products:", error)
    throw new Error("Failed to upload products to database")
  }
}

export const getProducts = async (): Promise<Product[]> => {
  // Check localStorage first for uploaded products
  if (typeof window !== "undefined") {
    const localProducts = localStorage.getItem("anand-pharma-products")
    if (localProducts) {
      try {
        const parsedProducts = JSON.parse(localProducts)
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          console.log("Loading products from localStorage")
          return parsedProducts
        }
      } catch (error) {
        console.error("Error parsing local products:", error)
      }
    }
  }

  // Try Firebase if configured and available
  if (db && isFirebaseConfigured()) {
    try {
      const querySnapshot = await getDocs(collection(db, "products"))
      const products: Product[] = []

      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        } as Product)
      })

      // If products found in Firebase, return them
      if (products.length > 0) {
        console.log("Loading products from Firebase")
        return products
      }
    } catch (error) {
      console.error("Error fetching products from Firebase:", error)
    }
  }

  // Fallback to sample data
  console.log("Loading sample products")
  return getSampleProducts()
}

export const isFirebaseReady = (): boolean => {
  return db !== null && isFirebaseConfigured()
}

const getSampleProducts = (): Product[] => {
  return [
    { name: "ENSURE CH-RF", unit: "200GM", company: "ABBOTT HEALTH(NUT)", category: "Nutritional Supplements" },
    { name: "ENSURE VAN", unit: "400GM", company: "ABBOTT HEALTH(NUT)", category: "Nutritional Supplements" },
    { name: "SIMILAC", unit: "400GM", company: "ABBOTT HEALTH(NUT)", category: "Nutritional Supplements" },
    { name: "PROTINEX CHOC", unit: "250GM", company: "DANONE", category: "Nutritional Supplements" },
    { name: "COLGATE TP", unit: "100GM", company: "COLGATE", category: "Oral Care" },
    { name: "COLGATE BRUSH", unit: "SOFT", company: "COLGATE", category: "Oral Care" },
    { name: "SENSODYNE", unit: "70GM", company: "GSK CONSUMER", category: "Oral Care" },
    { name: "DOVE SOAP", unit: "100GM", company: "UNILEVER", category: "Personal Care" },
    { name: "NIVEA CREAM", unit: "50ML", company: "NIVEA", category: "Personal Care" },
    { name: "PAMPERS", unit: "NB10", company: "P&G", category: "Baby Products" },
    { name: "JOHNSON BABY OIL", unit: "100ML", company: "JOHNSON & JOHNSON", category: "Baby Products" },
    { name: "WHISPER GREEN", unit: "90", company: "P&G", category: "Feminine Hygiene" },
    { name: "STAYFREE", unit: "20", company: "JOHNSON & JOHNSON", category: "Feminine Hygiene" },
    { name: "LOREAL SHAMPOO", unit: "180ML", company: "LOREAL", category: "Cosmetics" },
    { name: "LAKME CREAM", unit: "30GM", company: "LAKME", category: "Cosmetics" },
    { name: "VICKS RUB", unit: "50GM", company: "P&G", category: "Pain Relief" },
    { name: "AMRUTANJAN", unit: "8ML", company: "AMRUTANJAN", category: "Pain Relief" },
    { name: "CROCIN", unit: "10TAB", company: "GSK CONSUMER", category: "Pain Relief" },
    { name: "IODEX", unit: "40GM", company: "GSK CONSUMER", category: "Pain Relief" },
    { name: "DETTOL SOAP", unit: "75GM", company: "RECKITT", category: "Personal Care" },
    { name: "LISTERINE", unit: "250ML", company: "JOHNSON & JOHNSON", category: "Oral Care" },
    { name: "HEAD & SHOULDERS", unit: "180ML", company: "P&G", category: "Personal Care" },
    { name: "PANTENE", unit: "180ML", company: "P&G", category: "Personal Care" },
    { name: "ORAL B BRUSH", unit: "SOFT", company: "P&G", category: "Oral Care" },
    { name: "ENSURE CH-RF", unit: "2+1 OFFER", company: "ABBOTT HEALTH(NUT)", category: "Nutritional Supplements" },
    { name: "COLGATE BRUSH", unit: "3+1X75GM", company: "COLGATE", category: "Oral Care" },
    { name: "PROTINEX", unit: "OFFER", company: "DANONE", category: "Nutritional Supplements" },
    { name: "GLUCON D", unit: "500GM", company: "HEINZ", category: "Nutritional Supplements" },
    { name: "BOURNVITA", unit: "500GM", company: "CADBURY", category: "Nutritional Supplements" },
    { name: "HORLICKS", unit: "500GM", company: "GSK CONSUMER", category: "Nutritional Supplements" },
    { name: "COMPLAN", unit: "500GM", company: "HEINZ", category: "Nutritional Supplements" },
    { name: "PEDIASURE", unit: "400GM", company: "ABBOTT HEALTH(NUT)", category: "Nutritional Supplements" },
    { name: "CERELAC", unit: "300GM", company: "NESTLE", category: "Baby Products" },
    { name: "LACTOGEN", unit: "400GM", company: "NESTLE", category: "Baby Products" },
    { name: "NAN PRO", unit: "400GM", company: "NESTLE", category: "Baby Products" },
    { name: "FAREX", unit: "300GM", company: "HEINZ", category: "Baby Products" },
    { name: "JOHNSON POWDER", unit: "100GM", company: "JOHNSON & JOHNSON", category: "Baby Products" },
    { name: "JOHNSON SHAMPOO", unit: "100ML", company: "JOHNSON & JOHNSON", category: "Baby Products" },
    { name: "HIMALAYA CREAM", unit: "50GM", company: "HIMALAYA", category: "Personal Care" },
    { name: "PATANJALI SOAP", unit: "75GM", company: "PATANJALI", category: "Personal Care" },
    { name: "DABUR HONEY", unit: "250GM", company: "DABUR", category: "Miscellaneous" },
    { name: "VICKS VAPORUB", unit: "25GM", company: "P&G", category: "Pain Relief" },
    { name: "ENO", unit: "30GM", company: "GSK CONSUMER", category: "Miscellaneous" },
    { name: "PUDIN HARA", unit: "30ML", company: "DABUR", category: "Miscellaneous" },
    { name: "HAJMOLA", unit: "120TAB", company: "DABUR", category: "Miscellaneous" },
    { name: "DIGENE", unit: "170ML", company: "ABBOTT HEALTH(NUT)", category: "Miscellaneous" },
    { name: "GELUSIL", unit: "170ML", company: "PFIZER", category: "Miscellaneous" },
    { name: "BURNOL", unit: "20GM", company: "RECKITT", category: "Pain Relief" },
    { name: "MOOV", unit: "50GM", company: "RECKITT", category: "Pain Relief" },
    { name: "VOLINI", unit: "30GM", company: "RANBAXY", category: "Pain Relief" },
    { name: "ASPRO", unit: "10TAB", company: "RECKITT", category: "Pain Relief" },
    { name: "DISPRIN", unit: "10TAB", company: "RECKITT", category: "Pain Relief" },
    { name: "PARACETAMOL", unit: "10TAB", company: "GENERIC", category: "Pain Relief" },
    { name: "BETADINE", unit: "15ML", company: "WIN MEDICARE", category: "Miscellaneous" },
    { name: "DETTOL LIQUID", unit: "125ML", company: "RECKITT", category: "Personal Care" },
    { name: "SAVLON", unit: "100ML", company: "ITC", category: "Personal Care" },
    { name: "BAND AID", unit: "10PCS", company: "JOHNSON & JOHNSON", category: "Miscellaneous" },
    { name: "COTTON", unit: "100GM", company: "GENERIC", category: "Miscellaneous" },
    { name: "THERMOMETER", unit: "1PC", company: "GENERIC", category: "Miscellaneous" },
    { name: "GLUCOSE POWDER", unit: "200GM", company: "GENERIC", category: "Miscellaneous" },
    { name: "ORS", unit: "10SACHETS", company: "GENERIC", category: "Miscellaneous" },
    { name: "VITAMIN C", unit: "30TAB", company: "GENERIC", category: "Nutritional Supplements" },
    { name: "CALCIUM", unit: "30TAB", company: "GENERIC", category: "Nutritional Supplements" },
    { name: "IRON TABLETS", unit: "30TAB", company: "GENERIC", category: "Nutritional Supplements" },
    { name: "MULTIVITAMIN", unit: "30TAB", company: "GENERIC", category: "Nutritional Supplements" },
    { name: "ASPIRIN", unit: "10TAB", company: "BAYER", category: "Pain Relief" },
    { name: "STREPSILS", unit: "16LOZENGES", company: "RECKITT", category: "Miscellaneous" },
    { name: "HALLS", unit: "20DROPS", company: "MONDELEZ", category: "Miscellaneous" },
    { name: "FISHERMAN FRIEND", unit: "25GM", company: "LOFTHOUSE", category: "Miscellaneous" },
    { name: "TIGER BALM", unit: "19.4GM", company: "HAW PAR", category: "Pain Relief" },
    { name: "ZANDU BALM", unit: "8ML", company: "EMAMI", category: "Pain Relief" },
    { name: "BOROLINE", unit: "20GM", company: "GD PHARMA", category: "Personal Care" },
    { name: "VASELINE", unit: "50ML", company: "UNILEVER", category: "Personal Care" },
    { name: "PONDS", unit: "50GM", company: "UNILEVER", category: "Personal Care" },
    { name: "FAIR & LOVELY", unit: "50GM", company: "UNILEVER", category: "Cosmetics" },
  ]
}

export default db
