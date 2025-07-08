"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, FileText, Search, Plus, Clock, Users, AlertTriangle, TrendingUp, BarChart3 } from "lucide-react"
import Link from "next/link"

interface Document {
  id: string
  name: string
  type: string
  status: "completed" | "processing" | "pending"
  riskLevel: "low" | "medium" | "high"
  uploadDate: string
  size: string
  collaborators: number
}

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("/api/documents")
        const data = await response.json()
        if (data.documents) {
          setDocuments(data.documents)
        }
      } catch (error) {
        console.error("Failed to fetch documents:", error)
        // Fallback to demo data
        setDocuments([
          {
            id: "sample-contract",
            name: "Service Agreement.pdf",
            type: "Contract",
            status: "completed",
            riskLevel: "medium",
            uploadDate: "2 hours ago",
            size: "2.3 KB",
            collaborators: 4,
          },
          {
            id: "nda-doc",
            name: "Non-Disclosure Agreement.docx",
            type: "NDA",
            status: "completed",
            riskLevel: "low",
            uploadDate: "1 day ago",
            size: "1.8 KB",
            collaborators: 2,
          },
          {
            id: "lease-agreement",
            name: "Office Lease Agreement.pdf",
            type: "Lease",
            status: "processing",
            riskLevel: "high",
            uploadDate: "3 hours ago",
            size: "4.2 KB",
            collaborators: 6,
          },
          {
            id: "employment-contract",
            name: "Employment Contract Template.doc",
            type: "Employment",
            status: "pending",
            riskLevel: "medium",
            uploadDate: "5 hours ago",
            size: "3.1 KB",
            collaborators: 1,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || doc.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DocuReview AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/upload">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Document
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage and review your AI-analyzed documents</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600">+12%</span>
                <span className="text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Risk Items</p>
                  <p className="text-3xl font-bold text-red-600">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-600">2 new</span>
                <span className="text-gray-600 ml-1">this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Collaborators</p>
                  <p className="text-3xl font-bold text-purple-600">12</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-purple-600">4 online</span>
                <span className="text-gray-600 ml-1">right now</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Saved</p>
                  <p className="text-3xl font-bold text-green-600">47h</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600">70% faster</span>
                <span className="text-gray-600 ml-1">than manual review</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterStatus === "completed" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("completed")}
                    >
                      Completed
                    </Button>
                    <Button
                      variant={filterStatus === "processing" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("processing")}
                    >
                      Processing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="animate-pulse bg-gray-200 h-8 w-8 rounded"></div>
                      <div className="flex-1">
                        <div className="animate-pulse bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
                        <div className="animate-pulse bg-gray-200 h-3 w-1/2 rounded"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : filteredDocuments.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                    <p className="text-gray-600 mb-4">Upload your first document to get started with AI analysis</p>
                    <Button asChild>
                      <Link href="/upload">Upload Document</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <Badge variant="outline">{doc.type}</Badge>
                              <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                              <Badge className={getRiskColor(doc.riskLevel)}>{doc.riskLevel} risk</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right text-sm text-gray-600">
                            <div>{doc.uploadDate}</div>
                            <div>
                              {doc.size} • {doc.collaborators} collaborators
                            </div>
                          </div>
                          <Button asChild>
                            <Link href={`/analysis/${doc.id}`}>View Analysis</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>Document Analysis Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart visualization would go here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">High Risk</span>
                      <span className="text-sm text-red-600">12.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Medium Risk</span>
                      <span className="text-sm text-orange-600">37.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Low Risk</span>
                      <span className="text-sm text-green-600">50%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage team access and collaboration permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">SC</span>
                      </div>
                      <div>
                        <p className="font-medium">Sarah Chen</p>
                        <p className="text-sm text-gray-600">sarah@company.com</p>
                      </div>
                    </div>
                    <Badge>Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-medium">MJ</span>
                      </div>
                      <div>
                        <p className="font-medium">Mike Johnson</p>
                        <p className="text-sm text-gray-600">mike@company.com</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Editor</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
