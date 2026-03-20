"use client";

import React, { useState } from 'react';
import { X, Search, Phone, ExternalLink, MessageCircle, Plus } from 'lucide-react';


const ZALO_CONTACTS = [
  {
    id: '1',
    name: 'Ctk Kazuha',
    initials: 'CK',
    phone: '0987654321',
    zaloLink: 'https://zalo.me/0987654321',
    color: 'bg-indigo-500',
  },
  {
    id: '2',
    name: 'Danh Le',
    initials: 'DL',
    phone: '0912345678',
    zaloLink: 'https://zalo.me/0912345678',
    color: 'bg-amber-500',
  },
  {
    id: '3',
    name: 'BS. Tuấn (Khoa Nội)',
    initials: 'BT',
    phone: '0909090909',
    zaloLink: 'https://zalo.me/0909090909',
    color: 'bg-emerald-500',
  },
  {
    id: '4',
    name: 'Nguyễn Văn A',
    initials: 'NA',
    phone: '0345678910',
    zaloLink: 'https://zalo.me/0345678910',
    color: 'bg-purple-500',
  },
  {
    id: '5',
    name: 'Trần Thị B',
    initials: 'TB',
    phone: '0888777666',
    zaloLink: 'https://zalo.me/0888777666',
    color: 'bg-pink-500',
  },
];

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  
  const filteredContacts = ZALO_CONTACTS.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {isOpen && (
        <div className="w-[340px] h-[500px] bg-[#0B1121] border border-slate-800/60 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 font-sans">
         
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-white tracking-tight flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#8BB4DC]" />
              Liên hệ Zalo
            </h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 mb-2">
            <div className="bg-white/5 hover:bg-white/10 rounded-xl flex items-center px-3 py-2.5 text-slate-400 border border-transparent focus-within:border-[#8BB4DC]/50 transition-all shadow-inner">
              <Search className="h-4 w-4 mr-2 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Tìm tên hoặc số điện thoại..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 mt-2 space-y-1 pb-4">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <a 
                  key={contact.id} 
                  href={contact.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#1A2235] cursor-pointer transition-all border border-transparent hover:border-slate-800 group"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-[15px] shadow-sm flex-shrink-0 ${contact.color}`}>
                    {contact.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-semibold text-slate-200 group-hover:text-white truncate transition-colors">
                      {contact.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5 text-slate-400">
                      <Phone className="h-3 w-3" />
                      <span className="text-[12px] font-medium">{contact.phone}</span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-[#8BB4DC] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </a>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2">
                <Search className="h-8 w-8 opacity-20" />
                <p className="text-sm">Không tìm thấy liên hệ nào</p>
              </div>
            )}
          </div>
          <div className="py-3 border-t border-slate-800/60 text-center bg-[#0B1121]">
            <button className="text-[13px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#35678E] to-[#8BB4DC] hover:opacity-80 transition-all flex items-center justify-center w-full gap-2">
              <Plus className="h-4 w-4 text-[#8BB4DC]" />
              Thêm liên hệ mới
            </button>
          </div>

        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-[#35678E] to-[#8BB4DC] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#35678E]/30 transition-transform hover:scale-105 hover:opacity-90 relative"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

    </div>
  );
};