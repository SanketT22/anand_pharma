import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                             <img src="/logo.png" alt="Anand Pharma Logo" className="h-12 w-12 object-contain" />

              </div>
              <div>
                <h3 className="text-xl font-bold">Anand Pharma</h3>
                <p className="text-sm text-gray-400">Since 1993</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted medical store providing quality healthcare products and expert pharmaceutical consultation
              for over 30 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-400 hover:text-white transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">02423222396</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-400 text-sm">8208411296</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400 text-sm">anandpharma1993@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-gray-400 text-sm">Location details coming soon</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Mon - Sat</p>
                  <p className="text-xs text-gray-400">8:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Sunday</p>
                  <p className="text-xs text-gray-400">9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Anand Pharma. All rights reserved.</p>
            <p className="text-gray-400 text-sm">Trusted healthcare partner since 1993</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
