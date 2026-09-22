import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle2, Mail, User, PenTool, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 700);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>شاركونا آراءكم ومقترحاتكم</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title text-gold-gradient mb-4">
            تواصل معنا وطلب دعاء
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            نسعد بتلقي ملاحظاتكم، مقترحاتكم لتحسين البوابة، أو طلبات الدعاء بظهر الغيب.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border-amber-400/25 shadow-2xl relative">
          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-4 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 font-title mb-2">
                جزاكم الله خيراً!
              </h3>
              <p className="text-sm text-slate-400 max-w-md">
                تم إرسال رسالتكم بنجاح وسنسعد بالاطلاع عليها. جعلها الله في ميزان حسناتكم.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    الاسم الكريم *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="اسمك أو كنيتك"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/60"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@domain.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/60"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  موضوع الرسالة
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="اقتراح / استفسار / طلب دعاء..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/60"
                  />
                  <PenTool className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  نص الرسالة أو الدعاء *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب رسالتك الكريمة هنا..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/60 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 shadow-lg shadow-amber-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                {submitting ? (
                  <span>جاري الإرسال...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>إرسال الرسالة</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Developer credit banner */}
          <div className="mt-8 pt-4 border-t border-white/5 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>بوابة نور الإسلام الرقمية • تطوير وإشراف: <span className="text-amber-300 font-bold">كريم سامي</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};
