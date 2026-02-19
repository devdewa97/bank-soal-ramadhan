import React, { useState, useMemo } from 'react';
import { 
  Moon, 
  Sun, 
  Plus, 
  LogOut, 
  Search, 
  User, 
  Lock,
  ChevronRight,
  Copy,
  CheckCircle2,
  Edit3,
  X,
  Star,
  LayoutGrid,
  ChevronDown,
  BookOpen,
  UserCheck,
  ShieldCheck
} from 'lucide-react';

// Konfigurasi Admin
const ADMIN_CREDENTIALS = {
  Dewa: { password: 'Dewa123', canInput: true, roleName: 'Administrator' },
  Herlin: { password: 'Herlin123', canInput: false, roleName: 'Admin View' }
};

const CATEGORIES = ["Soal Tausiyah Pagi", "Soal Tausiyah Sore"];

const App = () => {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [notes, setNotes] = useState([
    { id: 1, title: 'Ketahanan Keluarga di Bulan Ramadhan', category: 'Soal Tausiyah Pagi', content: 'Keluarga adalah unit terkecil masyarakat. Di bulan Ramadhan, ketahanan keluarga diuji melalui kesabaran dan kebersamaan dalam beribadah.' },
    { id: 2, title: 'Sensitifitas Sosial di Bulan Ramadhan', category: 'Soal Tausiyah Pagi', content: 'Puasa mengajarkan kita untuk merasakan lapar, sehingga tumbuh rasa empati terhadap saudara-saudara kita yang kurang beruntung.' },
    { id: 3, title: 'Berbagi Kebaikan di Bulan Suci Ramadhan', category: 'Soal Tausiyah Pagi', content: 'Ramadhan adalah momentum terbaik untuk berbagi. Setiap kebaikan akan dilipatgandakan pahalanya.' },
    { id: 10, title: 'Evaluasi Dekade Pertama', category: 'Soal Tausiyah Sore', content: 'Sepuluh hari pertama adalah fase Rahmat. Mari kita evaluasi kualitas ibadah kita sebelum memasuki fase Maghfirah.' },
    { id: 11, title: 'Sabar Buah Utama Puasa', category: 'Soal Tausiyah Sore', content: 'Sabar bukan hanya menahan lapar, tapi juga menahan lisan dari ucapan yang sia-sia.' }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [copySuccess, setCopySuccess] = useState(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const [selectedNote, setSelectedNote] = useState(null);
  const [formNote, setFormNote] = useState({ title: '', category: 'Soal Tausiyah Pagi', content: '' });

  const handleCopy = (text, id) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = ADMIN_CREDENTIALS[loginData.username];
    if (admin && admin.password === loginData.password) {
      setUser({ 
        username: loginData.username, 
        canInput: admin.canInput,
        roleName: admin.roleName 
      });
    } else {
      setLoginError('Username atau Password salah!');
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    const newEntry = { ...formNote, id: Date.now() };
    setNotes([newEntry, ...notes]);
    setIsAddModalOpen(false);
    setFormNote({ title: '', category: 'Soal Tausiyah Pagi', content: '' });
  };

  const handleEditNote = (e) => {
    e.preventDefault();
    setNotes(notes.map(n => n.id === selectedNote.id ? { ...formNote, id: n.id } : n));
    setIsEditModalOpen(false);
    setSelectedNote(null);
  };

  const openEdit = (note) => {
    setSelectedNote(note);
    setFormNote({ title: note.title, category: note.category, content: note.content });
    setIsEditModalOpen(true);
  };

  const openView = (note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Semua' || note.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [notes, searchTerm, activeCategory]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#04120b] flex items-center justify-center p-4 font-sans relative">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="w-full max-w-sm bg-[#0a1f16]/80 backdrop-blur-xl border border-white/5 p-6 sm:p-10 rounded-md shadow-2xl relative z-10 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-md shadow-lg">
            <Moon className="w-7 h-7 text-[#04120b] fill-[#04120b]" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Panel Admin</h1>
          <p className="text-emerald-500/60 text-[10px] font-medium uppercase tracking-[0.3em] mb-8">Ramadhan 1447 H</p>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-[10px] text-emerald-500 font-bold uppercase ml-1">Username</label>
              <input 
                type="text" className="w-full bg-[#04120b]/50 border border-white/10 rounded-md py-3 px-4 text-white text-sm outline-none focus:border-amber-500/50"
                placeholder="Masukkan username" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-emerald-500 font-bold uppercase ml-1">Password</label>
              <input 
                type="password" className="w-full bg-[#04120b]/50 border border-white/10 rounded-md py-3 px-4 text-white text-sm outline-none focus:border-amber-500/50"
                placeholder="Masukkan password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})}
              />
            </div>
            {loginError && <p className="text-red-400 text-[11px] text-center bg-red-400/10 py-2 rounded-md">{loginError}</p>}
            <button className="w-full bg-amber-500 text-[#04120b] font-bold py-3 rounded-md uppercase tracking-widest text-[11px] mt-4 hover:bg-amber-400 transition-all">Masuk</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04120b] font-sans text-emerald-50/90 selection:bg-amber-500/30">
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 sm:py-10">
        
        {/* Basmalah */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-amber-400/90 text-2xl sm:text-3xl font-serif mb-2 tracking-wide">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h2>
          <p className="text-emerald-600 text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.5em] font-bold uppercase opacity-50">Quiz Ramadhan 1447 H</p>
        </div>

        {/* Header Dashboard */}
        <header className="flex flex-col gap-4 mb-8 sm:mb-10 bg-white/5 p-4 sm:p-5 rounded-md border border-white/5 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Logo & Counter */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0a1f16] rounded-md flex items-center justify-center border border-emerald-800 shrink-0">
                 <Moon className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
              </div>
              <div className="text-left">
                <h1 className="text-base sm:text-lg font-bold text-white leading-tight">Bank Soal Ramadhan</h1>
                <p className="text-emerald-500/70 text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest">{notes.length} Soal Tersimpan</p>
              </div>
            </div>

            {/* Profile & Logout */}
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
               {/* Profile Info */}
               <div className="flex items-center gap-2.5 bg-white/5 px-3 py-1.5 rounded-md border border-white/5 flex-grow sm:flex-grow-0">
                  <div className="w-7 h-7 bg-emerald-800 rounded-md flex items-center justify-center shrink-0">
                     <UserCheck size={14} className="text-amber-400" />
                  </div>
                  <div className="text-left leading-tight">
                     <p className="text-[10px] font-bold text-white uppercase truncate max-w-[80px] sm:max-w-none">{user.username}</p>
                     <p className="text-[8px] text-emerald-500 font-medium uppercase tracking-tight">{user.roleName}</p>
                  </div>
               </div>

               <button onClick={() => setUser(null)} className="p-2 sm:p-2.5 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20 transition-all border border-red-500/20 shrink-0" title="Logout">
                  <LogOut size={16}/>
               </button>
            </div>
          </div>

          {/* Action Button - Only for Admin */}
          {user.canInput && (
            <button onClick={() => setIsAddModalOpen(true)} className="w-full bg-amber-500 hover:bg-amber-400 text-[#04120b] font-bold py-2.5 rounded-md flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 text-[10px] sm:text-[11px] uppercase">
              <Plus size={14} strokeWidth={3} />
              Tambah Soal Baru
            </button>
          )}
        </header>

        {/* Search & Tabs */}
        <div className="flex flex-col gap-3 mb-8 sm:mb-10">
          <div className="relative group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-800 transition-colors group-focus-within:text-amber-400" />
            <input 
              type="text" placeholder="Cari materi soal..." 
              className="w-full bg-[#0a1f16]/40 border border-white/5 rounded-md py-3 pl-11 pr-4 text-white text-sm placeholder-emerald-900/50 outline-none focus:border-amber-500/30 transition-all backdrop-blur-sm"
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full overflow-x-auto pb-1 scrollbar-hide">
            {['Semua', ...CATEGORIES].map(cat => (
              <button
                key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex-1 min-w-[80px] py-2.5 rounded-md text-[9px] font-bold tracking-widest uppercase transition-all border whitespace-nowrap ${
                  activeCategory === cat ? 'bg-amber-500 border-amber-500 text-[#04120b] shadow-md' : 'bg-white/5 border-white/5 text-emerald-600 hover:border-emerald-800'
                }`}
              >
                {cat === 'Semua' ? 'Semua' : cat.split(' ').slice(2).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-3">
          {filteredNotes.map((note) => (
            <div 
              key={note.id} 
              className="bg-[#fcfaf2] rounded-md p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all hover:bg-white shadow-sm border border-emerald-100/50 group cursor-pointer text-left"
              onClick={() => openView(note)}
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-grow overflow-hidden text-left">
                <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 sm:mt-0 ${note.category === 'Soal Tausiyah Pagi' ? 'bg-blue-400' : 'bg-amber-500'}`}></div>
                <div className="overflow-hidden">
                  <h3 className="text-[#04120b] font-semibold text-sm sm:text-lg truncate tracking-tight mb-0.5 group-hover:text-amber-600 transition-colors text-left">{note.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm border ${note.category === 'Soal Tausiyah Pagi' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                       {note.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-emerald-50/50 justify-end" onClick={e => e.stopPropagation()}>
                <button 
                  onClick={() => handleCopy(note.content, note.id)}
                  className="p-2 sm:p-2.5 bg-emerald-50 text-emerald-700 rounded-md hover:bg-amber-100 transition-all"
                >
                  {copySuccess === note.id ? <CheckCircle2 size={14} className="sm:w-[16px]" /> : <Copy size={14} className="sm:w-[16px]" />}
                </button>
                {user.canInput && (
                  <button onClick={() => openEdit(note)} className="p-2 sm:p-2.5 bg-emerald-50 text-emerald-700 rounded-md hover:bg-emerald-100 transition-all">
                    <Edit3 size={14} className="sm:w-[16px]" />
                  </button>
                )}
                <div className="p-1.5 text-emerald-200 group-hover:text-amber-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-20 py-8 sm:py-10 border-t border-white/5 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 bg-emerald-900 rounded-md flex items-center justify-center border border-emerald-800/50 shadow-inner shrink-0">
               <ShieldCheck size={14} className="text-amber-500" />
            </div>
            <p className="text-amber-500 font-bold uppercase tracking-widest text-[9px] sm:text-[11px]">
              Bank Soal Tausiyah Ramadhan
            </p>
          </div>
          <p className="text-emerald-300/60 text-[8px] sm:text-[9px] font-medium uppercase tracking-widest max-w-[280px] sm:max-w-xs mx-auto leading-relaxed mb-6">
            Platform Manajemen Materi Digital Khusus Sesi Ramadhan 1447 H
          </p>
          <div className="bg-white/5 inline-block px-3 py-1.5 rounded-md border border-white/5">
            <p className="text-[8px] text-emerald-400/40 font-bold tracking-widest uppercase">
              © 2026 Digital Da'wah System • Versi 1.2.0
            </p>
          </div>
        </footer>
      </div>

      {/* MODAL VIEW / DETAIL - RESPONSIVE */}
      {isViewModalOpen && selectedNote && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-[#04120b]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-[#fcfaf2] rounded-md w-full max-w-2xl overflow-hidden shadow-2xl border border-emerald-100">
            <div className="p-5 sm:p-10 text-left">
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <span className="px-3 py-1 rounded-sm text-[8px] sm:text-[9px] font-bold uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200">
                  {selectedNote.category}
                </span>
                <button onClick={() => setIsViewModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e6f4ea] text-[#10b981] hover:bg-[#d1ebd8] transition-all">
                  <X size={16} strokeWidth={3} />
                </button>
              </div>
              
              <h2 className="text-xl sm:text-3xl font-bold text-[#04120b] mb-6 sm:mb-8 leading-tight tracking-tight text-left">{selectedNote.title}</h2>
              
              <div className="bg-[#f0f4f1]/80 p-5 sm:p-10 rounded-md border border-[#10b981]/10 shadow-sm text-left">
                <p className="text-[#04120b] leading-relaxed font-normal text-sm sm:text-lg">
                  "{selectedNote.content}"
                </p>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => handleCopy(selectedNote.content, selectedNote.id)}
                  className="w-full sm:w-auto bg-[#0a1f16] text-[#fbbf24] px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[9px] sm:text-[10px] flex items-center justify-center gap-3 hover:bg-[#122d21] transition-all active:scale-95 shadow-xl border border-white/5"
                >
                  {copySuccess === selectedNote.id ? (
                    <><CheckCircle2 size={14} className="text-green-400" /> TERSALIN</>
                  ) : (
                    <><Copy size={14} /> SALIN ISI MATERI</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INPUT / EDIT - RESPONSIVE */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-[#04120b]/90 backdrop-blur-md overflow-y-auto animate-in slide-in-from-bottom-5">
          <div className="bg-[#fcfaf2] rounded-md w-full max-w-xl overflow-hidden shadow-2xl border border-emerald-100">
            <div className="bg-[#0a1f16] p-5 sm:p-8 text-white flex justify-between items-center text-left">
               <div className="flex items-center gap-2">
                 <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500" />
                 <h2 className="text-lg sm:text-xl font-bold tracking-tight">{isAddModalOpen ? 'Tambah Soal' : 'Edit Soal'}</h2>
               </div>
               <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 text-emerald-500 transition-colors">
                 <X size={18}/>
               </button>
            </div>
            
            <form onSubmit={isAddModalOpen ? handleAddNote : handleEditNote} className="p-5 sm:p-8 space-y-5 text-left">
              <div className="space-y-1.5">
                <label className="text-[9px] sm:text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest ml-1 block">Judul Materi</label>
                <input 
                  type="text" required value={formNote.title}
                  onChange={e => setFormNote({...formNote, title: e.target.value})}
                  className="w-full bg-white border border-emerald-100 rounded-md px-4 py-2.5 text-[#04120b] font-semibold text-sm sm:text-base outline-none focus:border-amber-500/50"
                  placeholder="Ketik judul soal..."
                />
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] sm:text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest ml-1 block">Kategori</label>
                  <select 
                    value={formNote.category}
                    onChange={e => setFormNote({...formNote, category: e.target.value})}
                    className="w-full bg-white border border-emerald-100 rounded-md px-4 py-2.5 text-[#04120b] font-semibold text-sm outline-none appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2310b981'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '0.9rem' }}
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] sm:text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest ml-1 block">Warna Label</label>
                  <div className="flex flex-wrap gap-2 py-1">
                    {['#fbbf24', '#10b981', '#60a5fa', '#a78bfa', '#f87171', '#94a3b8'].map((c, i) => (
                      <div key={i} className={`w-6 h-6 sm:w-7 sm:h-7 rounded-sm border cursor-pointer ${i === 2 ? 'ring-2 ring-emerald-900 border-white shadow-md' : 'border-transparent'}`} style={{ backgroundColor: c }}></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] sm:text-[11px] font-bold text-emerald-900/40 uppercase tracking-widest ml-1 block">Isi Materi</label>
                <textarea 
                  required rows="4" value={formNote.content}
                  onChange={e => setFormNote({...formNote, content: e.target.value})}
                  className="w-full bg-white border border-emerald-100 rounded-md px-4 py-2.5 text-[#04120b] font-normal text-sm sm:text-base outline-none resize-none leading-relaxed"
                  placeholder="Tuliskan materi soal secara lengkap..."
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="order-2 sm:order-1 flex-1 py-3 text-emerald-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-emerald-50 rounded-md transition-colors">Batal</button>
                <button className="order-1 sm:order-2 flex-1 bg-[#122d21] text-white font-bold py-3 rounded-md shadow-lg hover:bg-[#04120b] transition-all uppercase tracking-widest text-[9px] sm:text-[10px]">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;