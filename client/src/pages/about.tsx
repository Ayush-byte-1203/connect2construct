import { Card, CardContent } from "@/components/ui/card";
import { Shield, Handshake, Clock, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">About BuildPro Connect</h1>
            <p className="text-lg text-gray-600 mb-6">
              We're dedicated to connecting property owners with skilled, verified construction professionals. 
              Our platform ensures quality, reliability, and transparent communication throughout your project.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Shield className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Verified Professionals</h3>
                  <p className="text-gray-600">All contractors and laborers undergo thorough background checks and credential verification.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Handshake className="text-accent h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Quality Guarantee</h3>
                  <p className="text-gray-600">We stand behind our network with project guarantees and customer satisfaction policies.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Clock className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Our dedicated support team is available around the clock to assist with your projects.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Team of construction professionals in meeting discussing project plans" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary rounded-xl p-8 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Verified Contractors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2,000+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To revolutionize the construction industry by providing a trusted platform that connects 
            property owners with skilled professionals, ensuring every project is completed with 
            excellence, integrity, and reliability.
          </p>
        </div>

        {/* Our Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality First</h3>
              <p className="text-gray-600">
                We prioritize quality in every aspect of our service, from the professionals we verify 
                to the support we provide throughout your project.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="text-accent h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trust & Security</h3>
              <p className="text-gray-600">
                Every contractor and laborer is thoroughly vetted, licensed, and insured to give you 
                peace of mind with every project.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Handshake className="text-secondary h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partnership</h3>
              <p className="text-gray-600">
                We believe in building lasting relationships between clients and contractors, 
                fostering collaboration that leads to exceptional results.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
