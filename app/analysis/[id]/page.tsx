"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  Users,
  MessageSquare,
  Clock,
  Download,
  Share2,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import Link from "next/link"

interface Clause {
  id: string
  type: string
  content: string
  riskLevel: "low" | "medium" | "high"
  confidence: number
  suggestions: string[]
  position: { start: number; end: number }
}

interface Comment {
  id: string
  user: string
  content: string
  timestamp: string
  clauseId?: string
}

export default function AnalysisPage({ params }: { params: { id: string } }) {
  const [selectedClause, setSelectedClause] = useState<Clause | null>(null)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "Sarah Chen",
      content: "This termination clause seems too broad. We should add specific conditions.",
      timestamp: "2 hours ago",
      clauseId: "clause-1",
    },
    {
      id: "2",
      user: "Mike Johnson",
      content: "Agreed. The liability cap should be higher given the project scope.",
      timestamp: "1 hour ago",
      clauseId: "clause-2",
    },
  ])
  const [newComment, setNewComment] = useState("")
  const [documentData, setDocumentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        // Try to get document from uploaded files
        const uploadedFiles = localStorage.getItem("uploadedFiles")
        if (uploadedFiles) {
          const files = JSON.parse(uploadedFiles)
          const currentDoc = files.find((f: any) => f.filename.includes("service") || f.filename.includes("agreement"))
          if (currentDoc) {
            setDocumentData(currentDoc)
          }
        }
      } catch (error) {
        console.error("Failed to fetch document:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocument()
  }, [params.id])

  const clauses: Clause[] = [
    {
      id: "clause-1",
      type: "Termination",
      content:
        "Either party may terminate this Agreement at any time with or without cause by providing thirty (30) days written notice to the other party.",
      riskLevel: "high",
      confidence: 92,
      suggestions: [
        "Add specific termination conditions",
        "Include termination fee structure",
        "Define notice delivery method",
      ],
      position: { start: 1250, end: 1420 },
    },
    {
      id: "clause-2",
      type: "Liability",
      content:
        "In no event shall either party be liable for any indirect, incidental, special, or consequential damages, regardless of the form of action.",
      riskLevel: "medium",
      confidence: 88,
      suggestions: [
        "Add liability cap amount",
        "Specify excluded damage types",
        "Include carve-outs for willful misconduct",
      ],
      position: { start: 2100, end: 2280 },
    },
    {
      id: "clause-3",
      type: "Payment Terms",
      content:
        "Payment shall be due within thirty (30) days of invoice date. Late payments may incur interest charges at the rate of 1.5% per month.",
      riskLevel: "low",
      confidence: 95,
      suggestions: ["Consider shorter payment terms", "Add early payment discount"],
      position: { start: 850, end: 1020 },
    },
  ]

  const documentText = `
SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on [DATE] between [CLIENT NAME] ("Client") and [SERVICE PROVIDER NAME] ("Provider").

1. SERVICES
Provider agrees to perform the services described in Exhibit A attached hereto and incorporated by reference ("Services").

2. PAYMENT TERMS
Payment shall be due within thirty (30) days of invoice date. Late payments may incur interest charges at the rate of 1.5% per month.

3. TERM AND TERMINATION
This Agreement shall commence on [START DATE] and continue until [END DATE], unless terminated earlier in accordance with this Agreement.

Either party may terminate this Agreement at any time with or without cause by providing thirty (30) days written notice to the other party.

4. LIABILITY
In no event shall either party be liable for any indirect, incidental, special, or consequential damages, regardless of the form of action.

5. CONFIDENTIALITY
Each party acknowledges that it may have access to confidential information of the other party.
  `

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: "You",
        content: newComment,
        timestamp: "Just now",
        clauseId: selectedClause?.id,
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading document analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">DocuReview AI</span>
              </Link>
              <div className="text-gray-400">/</div>
              <h1 className="text-xl font-semibold text-gray-900">Service Agreement Analysis</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback>+2</AvatarFallback>
                  </Avatar>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <Eye className="h-3 w-3 mr-1" />4 viewers
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Analysis Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span>AI Analysis Summary</span>
                    </CardTitle>
                    <CardDescription>Completed analysis of Service Agreement (2.3 KB)</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Analysis Complete</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">Key Clauses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-sm text-gray-600">High Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">1</div>
                    <div className="text-sm text-gray-600">Medium Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-gray-600">Avg Confidence</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Risk Assessment</span>
                    <span className="text-sm text-orange-600">Medium Risk</span>
                  </div>
                  <Progress value={65} className="w-full" />
                  <p className="text-sm text-gray-600">
                    Document contains some high-risk clauses that require attention, particularly around termination
                    terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Document Tabs */}
            <Tabs defaultValue="document" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="document">Document View</TabsTrigger>
                <TabsTrigger value="clauses">Key Clauses</TabsTrigger>
                <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
              </TabsList>

              <TabsContent value="document" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Content</CardTitle>
                    <CardDescription>Click on highlighted sections to view analysis details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-6 rounded-lg border font-mono text-sm leading-relaxed whitespace-pre-wrap">
                      {documentText}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clauses" className="space-y-4">
                {clauses.map((clause) => (
                  <Card
                    key={clause.id}
                    className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedClause?.id === clause.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedClause(clause)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{clause.type}</Badge>
                          <Badge className={getRiskColor(clause.riskLevel)}>
                            {clause.riskLevel.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{clause.confidence}% confidence</span>
                          <Progress value={clause.confidence} className="w-16" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{clause.content}</p>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">AI Suggestions:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {clause.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-blue-600">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Powered Recommendations</CardTitle>
                    <CardDescription>Suggested improvements based on best practices and risk analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-900">High Priority</h4>
                          <p className="text-red-700 text-sm mt-1">
                            The termination clause allows either party to terminate without cause. Consider adding
                            specific conditions or penalties to protect your interests.
                          </p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Button size="sm" variant="outline">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Helpful
                            </Button>
                            <Button size="sm" variant="outline">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              Not Helpful
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-orange-900">Medium Priority</h4>
                          <p className="text-orange-700 text-sm mt-1">
                            The liability clause excludes all consequential damages. Consider adding a liability cap
                            with specific carve-outs for willful misconduct.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Optimization</h4>
                          <p className="text-blue-700 text-sm mt-1">
                            Payment terms are standard but consider adding early payment discounts to improve cash flow.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Collaboration Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Team Collaboration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button onClick={addComment} size="sm" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Document Info */}
            <Card>
              <CardHeader>
                <CardTitle>Document Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">File Name:</span>
                  <span className="text-sm font-medium">service-agreement.pdf</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Size:</span>
                  <span className="text-sm font-medium">2.3 KB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Uploaded:</span>
                  <span className="text-sm font-medium">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Analysis Time:</span>
                  <span className="text-sm font-medium">45 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Version:</span>
                  <span className="text-sm font-medium">v1.0</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Analysis
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Version History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
