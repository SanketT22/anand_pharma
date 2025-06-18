"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileSpreadsheet, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { uploadProducts, isFirebaseReady } from "@/lib/firebase"
import * as XLSX from "xlsx"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  const handleAuth = () => {
    // Simple password authentication - in production, use proper authentication
    if (password === "anandpharma2024") {
      setIsAuthenticated(true)
      setMessage("")
    } else {
      setMessage("Invalid password")
      setMessageType("error")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (
        selectedFile.type.includes("sheet") ||
        selectedFile.name.endsWith(".xlsx") ||
        selectedFile.name.endsWith(".xls")
      ) {
        setFile(selectedFile)
        setMessage("")
      } else {
        setMessage("Please select a valid Excel file (.xlsx or .xls)")
        setMessageType("error")
      }
    }
  }

  const categorizeProduct = (productName: string, company: string): string => {
    const name = productName.toLowerCase()
    const comp = company.toLowerCase()

    if (
      name.includes("ensure") ||
      name.includes("similac") ||
      name.includes("protinex") ||
      name.includes("glucon") ||
      name.includes("bournvita") ||
      name.includes("horlicks") ||
      name.includes("complan") ||
      name.includes("pediasure") ||
      comp.includes("abbott") ||
      comp.includes("danone") ||
      comp.includes("heinz") ||
      comp.includes("cadbury")
    ) {
      return "Nutritional Supplements"
    }
    if (
      name.includes("colgate") ||
      name.includes("sensodyne") ||
      name.includes("brush") ||
      name.includes("paste") ||
      name.includes("listerine") ||
      name.includes("oral")
    ) {
      return "Oral Care"
    }
    if (
      name.includes("dove") ||
      name.includes("nivea") ||
      name.includes("soap") ||
      name.includes("lotion") ||
      name.includes("shampoo") ||
      name.includes("dettol") ||
      name.includes("savlon") ||
      name.includes("himalaya") ||
      name.includes("patanjali") ||
      name.includes("boroline") ||
      name.includes("vaseline") ||
      name.includes("ponds")
    ) {
      return "Personal Care"
    }
    if (
      name.includes("pampers") ||
      name.includes("johnson") ||
      name.includes("baby") ||
      name.includes("cerelac") ||
      name.includes("lactogen") ||
      name.includes("nan pro") ||
      name.includes("farex")
    ) {
      return "Baby Products"
    }
    if (name.includes("whisper") || name.includes("stayfree") || name.includes("carefree")) {
      return "Feminine Hygiene"
    }
    if (
      name.includes("loreal") ||
      name.includes("lakme") ||
      name.includes("maybelline") ||
      name.includes("fair & lovely") ||
      comp.includes("loreal")
    ) {
      return "Cosmetics"
    }
    if (
      name.includes("vicks") ||
      name.includes("amrutanjan") ||
      name.includes("crocin") ||
      name.includes("iodex") ||
      name.includes("burnol") ||
      name.includes("moov") ||
      name.includes("volini") ||
      name.includes("aspro") ||
      name.includes("disprin") ||
      name.includes("paracetamol") ||
      name.includes("aspirin") ||
      name.includes("tiger balm") ||
      name.includes("zandu balm")
    ) {
      return "Pain Relief"
    }
    return "Miscellaneous"
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setMessage("")

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      // Validate and transform data
      const products = jsonData.map((row: any) => {
        const product = row["PRODUCT"] || row["Product"] || row["product"] || ""
        const unit = row["UNIT"] || row["Unit"] || row["unit"] || ""
        const company = row["COMPANY FULL NAME"] || row["Company"] || row["company"] || ""

        if (!product || !company) {
          throw new Error("Missing required columns: PRODUCT, COMPANY FULL NAME")
        }

        return {
          name: product.toString().trim(),
          unit: unit.toString().trim(),
          company: company.toString().trim(),
          category: categorizeProduct(product.toString(), company.toString()),
        }
      })

      if (products.length === 0) {
        throw new Error("No valid products found in the file")
      }

      // Upload products (will use Firebase if configured, localStorage otherwise)
      await uploadProducts(products)

      const storageType = isFirebaseReady() ? "Firebase database" : "local storage"
      setMessage(`Successfully uploaded ${products.length} products to ${storageType}`)
      setMessageType("success")
      setFile(null)

      // Reset file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      console.error("Upload error:", error)
      setMessage(error instanceof Error ? error.message : "Failed to upload products")
      setMessageType("error")
    } finally {
      setUploading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to access file upload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAuth()}
            />
            <Button onClick={handleAuth} className="w-full">
              Login
            </Button>
            {message && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Product Catalog Management</h1>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Product Catalog
              </CardTitle>
              <CardDescription>
                Upload an Excel file to update the product catalog. The file should contain columns: PRODUCT, UNIT,
                COMPANY FULL NAME
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Instructions */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">File Format Requirements:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Excel file (.xlsx or .xls format)</li>
                  <li>• Required columns: PRODUCT, UNIT, COMPANY FULL NAME</li>
                  <li>• Products will be automatically categorized</li>
                  <li>• Special offers will be detected from unit descriptions</li>
                </ul>
              </div>

              {/* Firebase Status */}
              <div
                className={`p-4 rounded-lg ${
                  isFirebaseReady() ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"
                }`}
              >
                <h3 className={`font-semibold mb-2 ${isFirebaseReady() ? "text-green-900" : "text-yellow-900"}`}>
                  Database Status:
                </h3>
                {isFirebaseReady() ? (
                  <p className="text-sm text-green-800">✅ Firebase configured - Data will be stored permanently</p>
                ) : (
                  <div className="text-sm text-yellow-800">
                    <p>⚠️ Firebase not configured - Data will be stored locally</p>
                    <p className="mt-1">Add Firebase credentials to environment variables for permanent storage</p>
                  </div>
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileSpreadsheet className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".xlsx,.xls"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {file && (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">{file.name}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <Button onClick={handleUpload} disabled={!file || uploading} className="w-full" size="lg">
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Catalog
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {message && (
                <Alert
                  className={messageType === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
                >
                  {messageType === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={messageType === "success" ? "text-green-800" : "text-red-800"}>
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Logout */}
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAuthenticated(false)
                    setPassword("")
                    setFile(null)
                    setMessage("")
                  }}
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
