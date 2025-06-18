import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Star, ShoppingBag, MessageCircle } from "lucide-react"

const featuredProducts = [
  { name: "ENSURE VAN", unit: "400GM", company: "ABBOTT HEALTH(NUT)", category: "Nutritional Supplements" },
  { name: "COLGATE TP", unit: "100GM", company: "COLGATE", category: "Oral Care" },
  { name: "PAMPERS", unit: "NB10", company: "P&G", category: "Baby Products" },
  { name: "WHISPER GREEN", unit: "90", company: "P&G", category: "Feminine Hygiene" },
  { name: "VICKS RUB", unit: "50GM", company: "P&G", category: "Pain Relief" },
  { name: "DOVE SOAP", unit: "100GM", company: "UNILEVER", category: "Personal Care" },
]

const specialOffers = [
  { name: "ENSURE CH-RF", unit: "2+1 OFFER", company: "ABBOTT HEALTH(NUT)" },
  { name: "COLGATE BRUSH", unit: "3+1X75GM", company: "COLGATE" },
  { name: "PROTINEX", unit: "OFFER", company: "DANONE" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">AP</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Anand Pharma</h1>
            <p className="text-xl md:text-2xl mb-8">Your Trusted Medical Store for Health and Wellness</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>02423222396</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>8208411296</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>anandpharma1993@gmail.com</span>
            </div>
          </div>

          <Link href="/catalog">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Browse Product Catalog
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <ShoppingBag className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Wide Product Range</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Over 600+ medical and healthcare products from trusted brands</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Quality Assured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">All products sourced from authorized distributors and manufacturers</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Expert Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Professional guidance for all your healthcare needs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{product.unit}</span>
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium mt-2">Contact for pricing</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {specialOffers.map((product, index) => (
              <Card key={index} className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">OFFER</span>
                  </div>
                  <CardDescription>{product.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-lg font-bold text-orange-600">{product.unit}</span>
                  <p className="text-sm text-green-600 font-medium mt-2">Contact for pricing</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding Something?</h2>
          <p className="text-xl mb-8">Our experienced pharmacists are here to help you</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
            <Link href="/catalog">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
