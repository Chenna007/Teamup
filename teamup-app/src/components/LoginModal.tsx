'use client';

import { useState } from 'react';
import { X, Mail, Phone } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { signInWithGoogle, signInWithEmail, signInWithPhone, verifyPhoneOtp } from '@/lib/supabase';

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal } = useAppStore();
  const [mode, setMode] = useState<'main' | 'phone' | 'email'>('main');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  if (!showLoginModal) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
    setLoading(false);
    // Redirect handled by Supabase OAuth flow
  };

  const handlePhoneLogin = async () => {
    setLoading(true);
    setError(null);
    if (!otpSent) {
      const { error } = await signInWithPhone(phone);
      if (error) { setError(error.message); setLoading(false); return; }
      setOtpSent(true);
      setLoading(false);
      return;
    }
    const { error } = await verifyPhoneOtp(phone, otp);
    if (error) { setError(error.message); setLoading(false); return; }
    setShowLoginModal(false);
    setLoading(false);
    // Auth state change listener in AuthProvider will handle the rest
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signInWithEmail(email);
    if (error) { setError(error.message); setLoading(false); return; }
    setEmailSent(true);
    setLoading(false);
  };

  const handleClose = () => {
    setShowLoginModal(false);
    setMode('main');
    setPhone('');
    setEmail('');
    setOtp('');
    setOtpSent(false);
    setError(null);
    setEmailSent(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md mx-4 mb-4 md:mb-0 bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Welcome to Teamup</h3>
              <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
            </div>
            <button onClick={handleClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>
          )}

          {mode === 'main' && (
            <div className="space-y-3">
              {/* Google */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>

              {/* Phone */}
              <button
                onClick={() => setMode('phone')}
                className="w-full flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <Phone size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">Continue with Phone Number</span>
              </button>

              {/* Email */}
              <button
                onClick={() => setMode('email')}
                className="w-full flex items-center gap-3 px-4 py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <Mail size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">Continue with Email</span>
              </button>
            </div>
          )}

          {mode === 'phone' && (
            <div className="space-y-4">
              <button onClick={() => { setMode('main'); setOtpSent(false); setOtp(''); }} className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                &larr; Back
              </button>
              {!otpSent ? (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    onClick={handlePhoneLogin}
                    disabled={!phone.trim() || loading}
                    className="w-full mt-4 py-3.5 bg-emerald-500 text-white rounded-2xl font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending…' : 'Send OTP'}
                  </button>
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Enter OTP sent to {phone}</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 text-center text-lg tracking-widest placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    onClick={handlePhoneLogin}
                    disabled={otp.length < 4 || loading}
                    className="w-full mt-4 py-3.5 bg-emerald-500 text-white rounded-2xl font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Verifying…' : 'Verify & Continue'}
                  </button>
                </div>
              )}
            </div>
          )}

          {mode === 'email' && (
            <div className="space-y-4">
              <button onClick={() => { setMode('main'); setEmailSent(false); }} className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                &larr; Back
              </button>
              {emailSent ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail size={24} className="text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Check your email</h4>
                  <p className="text-sm text-gray-500">We sent a magic link to <span className="font-medium text-gray-700">{email}</span></p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <button
                    onClick={handleEmailLogin}
                    disabled={!email.includes('@') || loading}
                    className="w-full py-3.5 bg-emerald-500 text-white rounded-2xl font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending…' : 'Send Magic Link'}
                  </button>
                </>
              )}
            </div>
          )}

          <p className="text-xs text-gray-400 text-center mt-6">
            By continuing, you agree to Teamup&apos;s Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
