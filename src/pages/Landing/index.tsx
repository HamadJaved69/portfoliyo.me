import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X, Terminal, Code, Globe, BarChart, ChevronRight } from 'lucide-react';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Terminal,
      title: 'Simple',
      description: 'No complexity. Just your work.'
    },
    {
      icon: Code,
      title: 'Fast',
      description: 'Create in minutes, not hours.'
    },
    {
      icon: Globe,
      title: 'Public',
      description: 'Share with a single link.'
    },
    {
      icon: BarChart,
      title: 'Analytics',
      description: 'See who views your work.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Navigation */}
      <nav className="border-b border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="font-bold text-lg tracking-tight">
              PORTFOLIYO
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/examples" className="hover:underline">
                Examples
              </Link>
              <Link to="/login" className="hover:underline">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                Get Started →
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-black py-4">
              <div className="flex flex-col space-y-4">
                <Link to="/examples" className="hover:underline">
                  Examples
                </Link>
                <Link to="/login" className="hover:underline">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors inline-block"
                >
                  Get Started →
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Portfolio<br />
            <span className="text-gray-600">for developers</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-700 max-w-2xl mx-auto">
            Dead simple portfolio builder. No design skills needed.
            Just your work, presented cleanly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors flex items-center justify-center group"
            >
              Start Building
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/examples"
              className="border border-black px-8 py-4 hover:bg-gray-50 transition-colors"
            >
              View Examples
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Free forever. No credit card.
          </p>
        </div>
      </section>

      {/* Demo Terminal */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black text-white p-6 font-mono text-sm">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full mr-6"></div>
              <span className="text-gray-400">portfoliyo.me/@johndoe</span>
            </div>
            <div className="space-y-2">
              <p className="text-green-400">$ cat portfolio.json</p>
              <div className="pl-4 text-gray-300">
                <p>{`{`}</p>
                <p className="pl-4">"name": "John Doe",</p>
                <p className="pl-4">"role": "Full Stack Developer",</p>
                <p className="pl-4">"experience": "5 years",</p>
                <p className="pl-4">"stack": ["React", "Node.js", "TypeScript"],</p>
                <p className="pl-4">"status": "Available for hire"</p>
                <p>{`}`}</p>
              </div>
              <p className="text-green-400 pt-2">$ deploy --public</p>
              <p className="text-gray-400">✓ Portfolio live at portfoliyo.me/@johndoe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Everything you need.<br />
            Nothing you don't.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="border border-black p-6 hover:bg-gray-50 transition-colors">
                <feature.icon className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 border-t border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Three steps to launch
          </h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <span className="text-2xl font-bold mr-6">01</span>
              <div>
                <h3 className="font-bold mb-2">Sign up</h3>
                <p className="text-gray-700">Create your account in seconds.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl font-bold mr-6">02</span>
              <div>
                <h3 className="font-bold mb-2">Add your work</h3>
                <p className="text-gray-700">Fill in your experience, projects, and skills.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl font-bold mr-6">03</span>
              <div>
                <h3 className="font-bold mb-2">Share your link</h3>
                <p className="text-gray-700">Your portfolio is instantly live and shareable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Simple pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="border border-black p-8">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-600">/forever</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>1 portfolio</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Basic templates</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Public URL</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Basic analytics</span>
                </li>
              </ul>
              <Link
                to="/signup"
                className="block text-center border border-black py-3 hover:bg-gray-50 transition-colors"
              >
                Start Free
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="border-2 border-black p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 text-xs">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$9</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unlimited portfolios</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Premium templates</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Custom domain</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Remove branding</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link
                to="/signup?plan=premium"
                className="block text-center bg-black text-white py-3 hover:bg-gray-800 transition-colors"
              >
                Go Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to build your portfolio?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join developers who showcase their work the simple way.
          </p>
          <Link
            to="/signup"
            className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors inline-flex items-center group"
          >
            Start Building
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • Free forever
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold">PORTFOLIYO</span>
            </div>

            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="hover:underline">Privacy</Link>
              <Link to="/terms" className="hover:underline">Terms</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 PortfoliYo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;