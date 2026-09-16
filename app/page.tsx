export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/suitcase.jpg')] bg-cover bg-center px-4 relative">
      {/* Lớp mờ (overlay) để làm dịu background, giúp form nổi bật */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      {/* Thẻ Form phong cách Vintage / Art Deco */}
      <div className="w-full max-w-md bg-[#f4f1ea]/95 border-2 border-[#d4af37] rounded-sm shadow-2xl p-8 relative z-10 overflow-hidden">
        
        {/* Viền trang trí góc */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]"></div>

        <h2 className="text-3xl font-serif text-[#3e3a35] tracking-widest uppercase border-b border-[#d4af37] pb-4 mb-8 text-center drop-shadow-sm">
          Login
        </h2>
        
        <form className="space-y-6 relative z-10">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-serif text-[#5c5446] tracking-wider mb-2 uppercase font-semibold"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your credentials"
              className="w-full px-4 py-2 bg-[#fffdf7] border border-[#bfa87e] text-[#3e3a35] focus:border-[#8b7355] focus:ring-1 focus:ring-[#8b7355] outline-none rounded-none placeholder-stone-400 font-serif shadow-inner"
            />
          </div>
          
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-serif text-[#5c5446] tracking-wider mb-2 uppercase font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your passcode"
              className="w-full px-4 py-2 bg-[#fffdf7] border border-[#bfa87e] text-[#3e3a35] focus:border-[#8b7355] focus:ring-1 focus:ring-[#8b7355] outline-none rounded-none placeholder-stone-400 font-serif shadow-inner"
            />
          </div>
          
          <button
            type="button"
            className="w-full mt-4 bg-[#2a2622] text-[#d4af37] font-serif uppercase tracking-widest border border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] transition-colors duration-500 py-3 px-4 rounded-none shadow-md"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
