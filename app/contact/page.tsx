'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Mail, MessageSquare, CheckCircle2, Clock, MapPin, Send, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Feedback / Tool Suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Contact Support' }]} />

      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
          Contact FinanceCalc Hub
        </h1>
        <p className="text-slate-600 text-sm mt-2 leading-relaxed">
          Have an inquiry, noticed an edge case in a formula, or want to suggest a new personal finance calculator? Our quantitative engineering team responds within 24–48 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Message Received!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your message regarding <em>{category}</em> has been routed to our quantitative support desk. We will get back to you at <strong>{email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-xs font-bold text-slate-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-cat" className="text-xs font-bold text-slate-700 block mb-1">
                  Topic / Department
                </label>
                <select
                  id="contact-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option>Feedback / Tool Suggestion</option>
                  <option>Mathematical Formula Question</option>
                  <option>Partnership & Editorial Inquiry</option>
                  <option>Technical Bug Report</option>
                  <option>General Support</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-msg" className="text-xs font-bold text-slate-700 block mb-1">
                  Message Details *
                </label>
                <textarea
                  id="contact-msg"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, calculator feedback, or formula observation..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Information & Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Direct Contact Channels
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Support Desk</strong>
                  <span>support@financecalchub.org</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Response Window</strong>
                  <span>Monday – Friday: 9:00 AM – 6:00 PM EST</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Operations Office</strong>
                  <span>FinanceCalc Hub Analytics Lab<br />100 Financial Plaza, Suite 400<br />Boston, MA 02110</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Looking for Quick Answers?</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed">
              Check our educational guides on EMI calculation, compounding mechanics, and mortgage prepayments before submitting an inquiry.
            </p>
            <Link
              href="/blog"
              className="inline-block text-xs font-bold text-blue-700 hover:underline pt-1"
            >
              Browse Knowledge Base &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
