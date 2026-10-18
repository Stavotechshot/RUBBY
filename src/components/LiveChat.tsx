import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  User, 
  LifeBuoy, 
  MessageSquare, 
  MessageCircleCode, 
  Clock, 
  Check, 
  ThumbsUp,
  X,
  Languages
} from 'lucide-react';
import { SupportMessage } from '../types';

export default function LiveChat() {
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: "Hello! Welcome to Rubby Support center. I am Evelyn, your dedicated Concierge. We speak English, French, Twi, Hausa, and Yoruba. How can I help you turn your unused gift cards into instant cash today? 💫",
      createdAt: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-rubby-chat', handleOpenChat);
    return () => window.removeEventListener('open-rubby-chat', handleOpenChat);
  }, []);

  const FAQ_OPTIONS = [
    { q: "How fast is Naira withdrawal?", a: "Naira cashout withdrawals are processed instantly through our Providus/NIP channel, reaching your bank account in 2 to 5 minutes!" },
    { q: "Can I pay electricity & buy airtime?", a: "Yes! Use the 'Pay Bills & Airtime' tab to spend your wallet balance on MTN/Airtel/Glo airtime, internet data, DSTV, and AEDC/EKEDC power tokens with up to 3% cashback." },
    { q: "How do I deposit USDT & Crypto?", a: "Head to 'Crypto Inflow' to copy your personal TRC-20, BEP-20, or Bitcoin SegWit deposit address. Once confirmations clear, crypto auto-sweeps to Naira or Cedis." },
    { q: "Can I trade on WhatsApp?", a: "Yes! Open the 'WhatsApp Bot' tab or text our verified business WhatsApp line to get live quotes and auto-trade directly via messaging." },
    { q: "What is my Virtual Account?", a: "Check the 'Virtual NUBAN' tab to get your permanent Providus Bank account number. Any transfer sent to it auto-credits your wallet in 5 seconds." }
  ];

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: SupportMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate agent typing and automated custom responses
    setTimeout(() => {
      setIsTyping(false);
      let agentReply = "Thanks for asking! Our support agents are active 24/7. Your query has been logged. Let me assist: we guarantee lightning transactions and top-tier security for all cards! Feel free to list a card in the portal to see how fast we process cashouts.";

      // Smart FAQs matching
      const lowerText = text.toLowerCase();
      if (lowerText.includes('withdrawal') || lowerText.includes('withdraw') || lowerText.includes('naira')) {
        agentReply = "Fast Withdrawals are our highest priority! Once your gift card is matched and processed (usually 2-3 minutes), you can transfer Naira directly toGTBank, Kuda, Access or other Nigerian banks instantly. Cedis drops into MoMo immediately!";
      } else if (lowerText.includes('momo') || lowerText.includes('cedis') || lowerText.includes('ghana')) {
        agentReply = "Yes, we fully support Ghana Mobile Money! You can make quick MoMo deposits to fund your Cedis wallet, or withdraw your card sale proceeds directly to your MTN MoMo, Telecel Cash, or AirtelTigo wallet in minutes.";
      } else if (lowerText.includes('rate') || lowerText.includes('price') || lowerText.includes('calculator')) {
        agentReply = "Rates fluctuate based on international markets. Steam is currently trading up to ₦870/$ and Razer Gold is leading at ₦890/$. Try using our 'Rate Target Alert' component to set rate rules so you get instantly notified when they hit your target!";
      } else if (lowerText.includes('2fa') || lowerText.includes('security') || lowerText.includes('secure')) {
        agentReply = "Security is top premium at Rubby. We encrypt all submissions. You can activate Two-Factor Authentication (2FA) by heading to the Authentication Status Panel below, scanning the QR code, and entering your code to protect your account.";
      }

      const agentMsg: SupportMessage = {
        id: Math.random().toString(),
        sender: 'agent',
        text: agentReply,
        createdAt: new Date().toISOString()
      };

      setMessages(prev => [...prev, agentMsg]);
    }, 1500);
  };

  return (
    <>
      {/* Absolute Bottom-Right Floating Support Button */}
      <button
        type="button"
        id="btn-open-chat"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-rose-600 hover:bg-rose-500 text-white p-4 rounded-full shadow-2xl z-40 transition-transform hover:scale-110 active:scale-95 flex items-center gap-2 cursor-pointer border border-rose-500/30 font-bold"
      >
        <MessageCircleCode className="w-5 h-5 animate-pulse" />
        <span className="text-xs font-bold leading-none pr-1">Talk to Specialist</span>
      </button>

      {/* Floating Chat Drawer Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            className="fixed bottom-24 right-6 w-full max-w-sm bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col h-[500px] backdrop-blur-md text-slate-900 dark:text-white font-sans"
          >
            {/* Header */}
            <div className="bg-slate-50 dark:bg-[#131A2E] p-4 text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-rose-50 dark:bg-rose-500/10 rounded-full flex items-center justify-center relative border border-rose-200 dark:border-rose-500/20">
                  <LifeBuoy className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-spin-slow" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#131A2E] rounded-full"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Live Support Specialist</h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Languages className="w-3 h-3 text-rose-500" />
                    NGN & GHS Settlement Desk
                  </span>
                </div>
              </div>

              <button
                type="button"
                id="btn-close-chat"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-slate-900 dark:text-white/60 dark:hover:text-white transition cursor-pointer bg-transparent border-0"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-transparent">
              {messages.map((msg, idx) => {
                const isAgent = msg.sender === 'agent';
                return (
                  <div key={idx} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[82%] p-3 rounded-2xl text-xs leading-normal ${
                      isAgent 
                        ? 'bg-white dark:bg-[#1A2238] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-tl-none shadow-xs' 
                        : 'bg-rose-600 text-white rounded-tr-none shadow-md shadow-rose-900/20'
                    }`}>
                      <p>{msg.text}</p>
                      <span className={`text-[9px] block text-right mt-1.5 font-mono ${
                        isAgent ? 'text-slate-400 dark:text-white/40' : 'text-white/70'
                      }`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1A2238] border border-slate-200 dark:border-white/10 p-2.5 rounded-2xl rounded-tl-none flex items-center gap-2.5 shadow-xs">
                    <span className="text-[11px] text-slate-500 dark:text-white/40 font-medium">Specialist is typing</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>

            {/* Quick FAQ Selection Box */}
            <div className="px-3 py-2 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#131A2E]/70 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              <span className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase">FAQs:</span>
              {FAQ_OPTIONS.map(faq => (
                <button
                  type="button"
                  key={faq.q}
                  onClick={() => handleSendMessage(faq.q)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-700 dark:text-white/80 rounded-full text-[10px] font-medium transition cursor-pointer border border-slate-200/60 dark:border-white/5"
                >
                  {faq.q}
                </button>
              ))}
            </div>

            {/* TextInput Footer */}
            <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1322] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputText);
                }}
                placeholder="Ask us a question..."
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-[#080B14] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
              <button
                type="button"
                id="btn-send-message"
                onClick={() => handleSendMessage(inputText)}
                className="p-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition cursor-pointer shadow-md shadow-rose-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
