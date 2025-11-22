"use client"
import React, { useState } from 'react';
import { 
  Check, 
  X,
  Star,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Users,
  MessageSquare,
  Phone,
  Calendar,
  BarChart3,
  Globe,
  Clock,
  Headphones,
  Crown,
  Rocket
} from 'lucide-react';

// Navbar
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            SocialBadi
          </h1>
          <div className="flex items-center gap-6">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Home
            </a>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all text-sm font-semibold">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function PricingHero({ billingPeriod, setBillingPeriod }) {
  return (
    <section className="relative pt-32 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTIwLTIwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Simple, Transparent Pricing</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Plans That Scale With You
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Save 20%</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pricing Cards
function PricingCards({ billingPeriod }) {
  const plans = [
    {
      name: 'Starter',
      icon: Rocket,
      description: 'Perfect for small businesses getting started',
      monthlyPrice: 99,
      annualPrice: 79,
      popular: false,
      features: [
        { text: 'Up to 1,000 conversations/month', included: true },
        { text: '1 AI agent', included: true },
        { text: '5 languages', included: true },
        { text: 'Email support', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'CRM integration', included: false },
        { text: 'Custom branding', included: false },
        { text: 'Priority support', included: false }
      ],
      cta: 'Start Free Trial',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      icon: Star,
      description: 'For growing businesses with advanced needs',
      monthlyPrice: 299,
      annualPrice: 239,
      popular: true,
      features: [
        { text: 'Up to 10,000 conversations/month', included: true },
        { text: '5 AI agents', included: true },
        { text: '25 languages', included: true },
        { text: 'Priority email & chat support', included: true },
        { text: 'Advanced analytics & reporting', included: true },
        { text: 'CRM integration', included: true },
        { text: 'Custom branding', included: true },
        { text: 'API access', included: true }
      ],
      cta: 'Start Free Trial',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      description: 'For large organizations with custom requirements',
      monthlyPrice: null,
      annualPrice: null,
      popular: false,
      features: [
        { text: 'Unlimited conversations', included: true },
        { text: 'Unlimited AI agents', included: true },
        { text: '50+ languages', included: true },
        { text: '24/7 phone & dedicated support', included: true },
        { text: 'Custom analytics dashboard', included: true },
        { text: 'All integrations', included: true },
        { text: 'White-label solution', included: true },
        { text: 'Custom SLA', included: true }
      ],
      cta: 'Contact Sales',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            
            return (
              <div
                key={index}
                className={`relative p-8 rounded-2xl transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105'
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                    <span className="text-white text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`p-3 bg-gradient-to-br ${plan.gradient} rounded-xl w-fit mb-4`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {price ? (
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">${price}</span>
                      <span className="text-gray-400">/mo</span>
                    </div>
                    {billingPeriod === 'annual' && (
                      <div className="text-sm text-green-400 mt-1">
                        Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-white">Custom</div>
                    <div className="text-sm text-gray-400 mt-1">Contact us for pricing</div>
                  </div>
                )}

                <button className={`w-full px-6 py-4 rounded-xl font-semibold text-sm transition-all mb-6 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}>
                  {plan.cta}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Add-ons Section
function AddOns() {
  const addons = [
    {
      icon: MessageSquare,
      name: 'Additional Conversations',
      description: 'Scale beyond your plan limits',
      price: '$0.05/conversation'
    },
    {
      icon: Phone,
      name: 'Voice Minutes',
      description: 'Extra voice call capacity',
      price: '$0.10/minute'
    },
    {
      icon: Users,
      name: 'Additional Agents',
      description: 'Deploy more AI agents',
      price: '$49/agent/month'
    },
    {
      icon: Globe,
      name: 'Language Packs',
      description: 'Add more language support',
      price: '$29/language/month'
    },
    {
      icon: Headphones,
      name: 'Premium Support',
      description: 'Dedicated support manager',
      price: '$499/month'
    },
    {
      icon: BarChart3,
      name: 'Advanced Analytics',
      description: 'Custom reporting & insights',
      price: '$99/month'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Add-ons
          </h2>
          <p className="text-gray-400">Customize your plan with additional features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addons.map((addon, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <addon.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{addon.price}</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{addon.name}</h3>
              <p className="text-gray-400 text-sm">{addon.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: 'Can I change plans later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate the difference.'
    },
    {
      question: 'What happens after the free trial?',
      answer: 'After your 14-day trial, you will be automatically enrolled in your selected plan. You can cancel anytime during the trial with no charges.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied, we will provide a full refund, no questions asked.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and wire transfers for Enterprise plans.'
    },
    {
      question: 'Are there any setup fees?',
      answer: 'No setup fees ever! All our plans include free onboarding and setup assistance from our team.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely! You can cancel your subscription at any time. No long-term contracts or cancellation fees.'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">Everything you need to know about our pricing</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
            >
              <summary className="px-6 py-4 cursor-pointer text-white font-semibold flex items-center justify-between">
                <span>{faq.question}</span>
                <HelpCircle className="w-5 h-5 text-gray-400 group-open:text-blue-400 transition-colors" />
              </summary>
              <div className="px-6 pb-4 text-gray-400 text-sm">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trust Section
function TrustSection() {
  const stats = [
    { icon: Users, number: '10,000+', label: 'Active Customers' },
    { icon: MessageSquare, number: '50M+', label: 'Conversations' },
    { icon: Clock, number: '99.9%', label: 'Uptime SLA' },
    { icon: Star, number: '4.9/5', label: 'Customer Rating' }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-400">Join businesses worldwide that chose SocialBadi</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center hover:bg-white/10 hover:border-blue-500/50 transition-all group"
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
          <div className="relative p-12 text-center">
            <Zap className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your 14-day free trial today. No credit card required. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all font-semibold flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all font-semibold">
                Contact Sales
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Questions? Talk to our sales team at sales@socialbadi.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Component
export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <PricingHero billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />
      <PricingCards billingPeriod={billingPeriod} />
      <AddOns />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}