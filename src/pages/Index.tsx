
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Shield, Zap, Users } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Enterprise-grade security with encrypted data protection and secure login flows."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with modern technologies for the best user experience."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time updates and shared workspaces."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Welcome to the Future</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
               Amazing
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Experiences
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create, collaborate, and scale your projects with our powerful platform. 
              Join thousands of teams already building the future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium hover-scale shadow-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3 text-lg font-medium hover-scale border-gray-300 hover:bg-gray-50"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section 
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl">
            <CardContent className="p-12 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join our community today and experience the difference. No credit card required.
              </p>
              <Link to="/register">
                <Button 
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium hover-scale shadow-lg"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
     */ }
    </div>
  );
};

export default Index;
