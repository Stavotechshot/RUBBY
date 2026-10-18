import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  Check, 
  PhoneCall, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Bot
} from 'lucide-react';
import { SUPPORTED_BRANDS, Currency } from '../types';

interface WhatsAppBotViewProps {
  isLightMode?: boolean;
}

interface ChatStep {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function WhatsAppBotView({ isLightMode = false }: WhatsAppBotViewProps) {
  const [messages, setMessages] = useState<ChatStep[]>([
    {
      sender: 'bot',
      text: '👋 Welcome to Rubby Direct WhatsApp Trade! I am the automated fast-lane trade bot. Type "rates", "sell", or send a card photo to get an instant payout to your bank!',
      time: '11:00 AM'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userEntry: ChatStep = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userEntry]);
    if (!textToSend) setInputMsg('');
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      const lower = text.toLowerCase();
      let botReply = '';

      if (lower.includes('rate') || lower.includes('price')) {
        botReply = '🔥 TOP RATES TODAY:\n• Steam $100: ₦87,000 / GH₵1,350\n• Apple/iTunes $100: ₦85,000 / GH₵1,280\n• Razer Gold $100: ₦89,000 / GH₵1,410\n• Vanilla Visa $100: ₦82,000 / GH₵1,220\n\nReply with "Sell Steam $100" to trade now!';
      } else if (lower.includes('sell') || lower.includes('trade')) {
        botReply = '✅ Order Created: #W-81920\nPlease upload card picture or paste 16-digit voucher pin, followed by your Account Number & Bank Name for 2-minute settlement!';
      } else if (lower.includes('pin') || lower.includes('claim') || lower.includes('steam') || lower.includes('apple')) {
        botReply = '⚡ Voucher verification in progress... Pin verified! ₦87,000 has been dispatched to your Providus Bank account. Ref: NIP-TX-881920. Trade completed in 42 seconds! 🚀';
      } else {
        botReply = 'Understood! You can reply with:\n1. "Rates" to see live prices\n2. "Sell [Card Name]" to initiate a trade\n3. "Support" to speak with Evelyn on live desk.';
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl relative overflow-hidden`}>
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            <span>WhatsApp Direct-To-Trade API Engine</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Trade Gift Cards Directly on WhatsApp & Telegram
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Reach the 60% of West African street and high-velocity traders who prefer trading straight inside WhatsApp without installing an app. Automated quotes, card validation, and instant bank disbursements.
          </p>
        </div>
      </div>

      {/* Simulator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Phone Mockup */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-md rounded-[2.5rem] border-8 border-slate-800 dark:border-slate-900 bg-[#0B141A] text-white shadow-2xl overflow-hidden flex flex-col h-[540px]">
            {/* Phone Top Bar */}
            <div className="bg-[#1F2C34] px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow-sm">
                  R
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>Rubby Trade Bot</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </h4>
                  <span className="text-[10px] text-emerald-400 block leading-tight">Official Verified Business</span>
                </div>
              </div>
              <span className="text-[10px] text-white/50 font-mono">+234 810 RUBBY FX</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0B141A]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#005C4B] text-white rounded-tr-none'
                        : 'bg-[#1F2C34] text-white/90 rounded-tl-none border border-white/5'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-white/40 block text-right mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1F2C34] text-white/60 rounded-2xl rounded-tl-none p-3 text-xs flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Phone Input Box */}
            <div className="bg-[#1F2C34] p-2.5 flex items-center gap-2 border-t border-white/5">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type 'rates', 'sell steam', or paste pin..."
                className="flex-1 bg-[#2A3942] text-xs text-white px-3.5 py-2 rounded-xl focus:outline-none placeholder:text-white/40"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Quick Command Triggers & Business API Capabilities */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl space-y-4`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Simulate Live WhatsApp Commands
            </h3>
            <p className="text-xs text-slate-400">
              Click any prompt below to trigger instant automated responses:
            </p>

            <div className="space-y-2">
              {[
                { label: 'Check Live Rates', prompt: 'Rates' },
                { label: 'Start Sell Steam $100 Order', prompt: 'Sell Steam $100' },
                { label: 'Submit Card Pin', prompt: 'PIN: STEAM-8921-9942-8812' },
                { label: 'Request Human Escalation', prompt: 'Connect to support desk' }
              ].map(cmd => (
                <button
                  key={cmd.prompt}
                  type="button"
                  onClick={() => handleSend(cmd.prompt)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                    isLightMode
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      : 'bg-white/5 hover:bg-white/10 border-white/5 text-white'
                  }`}
                >
                  <span>{cmd.label}</span>
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">"{cmd.prompt}"</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Meta WhatsApp Cloud Business API Webhook</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Automated NIP payout trigger upon broker approval</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Telegram Bot mirrored with the same backend queue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
