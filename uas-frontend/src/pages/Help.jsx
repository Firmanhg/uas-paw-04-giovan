import { HelpCircle, Mail, Phone, MessageSquare, FileText, ChevronRight } from "lucide-react";

export default function Help() {
  const faqs = [
    {
      question: "How do I list my property?",
      answer: "Click on 'Add New Property' button in the sidebar or dashboard. Fill in all required information including title, description, price, and property details."
    },
    {
      question: "How do I edit my property listing?",
      answer: "Go to 'My Properties', find your property, and click the 'Edit' button. Make your changes and save."
    },
    {
      question: "How do filters work in property search?",
      answer: "Use the filter sidebar on the Listing page. You can filter by location, property type, price range, bedrooms, and bathrooms. Click 'Apply Filters' to see results."
    },
    {
      question: "How do I delete a property?",
      answer: "Go to 'My Properties', find the property you want to delete, and click the 'Delete' button. Confirm the deletion when prompted."
    },
    {
      question: "What property types are supported?",
      answer: "We support House, Apartment, Villa, and Land property types."
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      detail: "support@propertiku.com",
      description: "Get response within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      detail: "+62 21 1234 5678",
      description: "Mon-Fri, 9:00 AM - 6:00 PM"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      detail: "Available Now",
      description: "Chat with our support team"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 text-white rounded-full mb-4">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Help Center</h1>
          <p className="text-gray-600 text-lg">Find answers to common questions and get support</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <method.icon className="text-slate-900" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{method.title}</h3>
                  <p className="text-slate-900 font-medium mb-1">{method.detail}</p>
                  <p className="text-gray-500 text-sm">{method.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-slate-900" size={28} />
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-slate-900">{faq.question}</span>
                  <ChevronRight className="text-gray-400 group-open:rotate-90 transition-transform" size={20} />
                </summary>
                <div className="px-5 pb-5 pt-2 text-gray-600 border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* User Guide */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Start Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-900">For Agents</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold">1.</span>
                  <span>Navigate to <strong>Dashboard</strong> to see your property statistics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold">2.</span>
                  <span>Click <strong>Add New Property</strong> to list a new property</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold">3.</span>
                  <span>Manage your listings in <strong>My Properties</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold">4.</span>
                  <span>Update your profile in <strong>Settings</strong></span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-900">Property Listing Tips</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-slate-900">•</span>
                  <span>Use clear, descriptive titles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900">•</span>
                  <span>Provide detailed descriptions highlighting key features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900">•</span>
                  <span>Set competitive prices based on market research</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900">•</span>
                  <span>Include accurate property specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900">•</span>
                  <span>Keep your listings up to date</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-8 text-center bg-slate-900 text-white rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
          <p className="text-gray-300 mb-6">Our support team is ready to assist you</p>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
}
