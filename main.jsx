import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Copy, Phone, MessageCircle, X, Share2, Sparkles, Wand2, Send, Train, Car, Cake } from 'lucide-react';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("복사되었습니다");

  // Gemini API States
  const [apiKey, setApiKey] = useState(""); 
  const [relation, setRelation] = useState("");
  const [wishKeyword, setWishKeyword] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isGeneratingMsg, setIsGeneratingMsg] = useState(false);
  
  const [selectedDoljabi, setSelectedDoljabi] = useState(null);
  const [doljabiResult, setDoljabiResult] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);

  // --- 사용자 정보 설정 ---
  const babyName = "백서한";
  const eventDate = "2026년 3월 14일 토요일";
  const realBirthday = "3월 12일";
  const eventTime = "오후 6시 30분";
  const locationName = "노보텔 앰배서더 수원";
  const locationAddress = "경기 수원시 팔달구 덕영대로 902";
  
  // 메인 사진 URL 설정 
  // 📸 [사진 변경 방법]: 아래 주소를 보내주신 사진 파일 경로(예: '/images/1000014073.jpg')로 변경하세요.
  const mainPhotoUrl = "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop"; 

  // 부모님 정보
  const parents = {
    dad: { name: "백호준", phone: "010-1234-5678" },
    mom: { name: "심다은", phone: "010-8765-4321" }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setToastMessage("복사되었습니다");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  // --- Gemini API Logic ---
  const callGemini = async (prompt) => {
    const API_KEY = ""; // System provides key
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      if (!response.ok) throw new Error(`API call failed`);
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "죄송해요, AI가 잠시 생각에 잠겼어요. 다시 시도해주세요.";
    }
  };

  const handleGenerateMessage = async () => {
    if (!relation) {
        setToastMessage("아기와의 관계를 입력해주세요!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        return;
    }
    
    setIsGeneratingMsg(true);
    setGeneratedMessage("");
    
    const prompt = `
      You are a witty AI assistant writing a congratulatory message for a baby's first birthday (Doljanchi) in Korean.
      Baby Name: ${babyName}
      Date: March 14th (Event), Real Birthday is March 12th.
      Sender's Relation: ${relation}
      Sender's Wish: ${wishKeyword || "Health and Happiness"}
      
      Task: Write a short, warm, natural Korean message (2-3 sentences). Mentioning how fast time flies or how cute the baby is.
    `;

    const result = await callGemini(prompt);
    setGeneratedMessage(result);
    setIsGeneratingMsg(false);
  };

  const handleDoljabiPrediction = async (item) => {
    setSelectedDoljabi(item);
    setIsPredicting(true);
    setDoljabiResult("");

    const prompt = `
      At a Korean First Birthday (Doljanchi), the baby ${babyName} grabbed the "${item}".
      Predict ${babyName}'s future career or personality based on this item with a fun, modern, and encouraging twist.
      Language: Korean.
      Length: 2 sentences.
      Tone: Cheerful and witty.
    `;

    const result = await callGemini(prompt);
    setDoljabiResult(result);
    setIsPredicting(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center py-4 font-sans text-stone-800">
      <div className={`w-full max-w-md bg-white shadow-xl overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Hero Section */}
        <div className="relative h-[480px] bg-stone-200 group">
          <img 
            src={mainPhotoUrl}
            alt="Main Baby Photo" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent flex flex-col items-center justify-end pb-12 text-white">
            <span className="text-xs tracking-[0.4em] uppercase mb-3 opacity-90 drop-shadow-md">First Birthday</span>
            <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-8 bg-white/80"></span>
                <h1 className="text-4xl font-serif text-white drop-shadow-lg">{babyName}</h1>
                <span className="h-px w-8 bg-white/80"></span>
            </div>
            <p className="text-sm font-light tracking-wider opacity-90 drop-shadow-md">{eventDate}</p>
          </div>
        </div>

        {/* Greeting Section */}
        <div className="px-8 py-12 text-center bg-white relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-sm">
             <Heart fill="#f43f5e" className="text-rose-500" size={24} />
          </div>
          
          <h2 className="text-xl font-bold mb-6 text-stone-700 mt-2">초대합니다</h2>
          <div className="space-y-3 text-stone-600 leading-relaxed text-sm font-light">
            <p>화이트데이 사탕처럼 달콤한<br/>저희 {babyName}이가 첫 생일을 맞이했습니다.</p>
            <p className="text-xs text-rose-400 font-medium">(실제 생일은 {realBirthday}이에요 🎂)</p>
            <p className="mt-4">사랑스러운 서한이가<br/>밝고 건강하게 자랄 수 있도록</p>
            <p>함께 자리하셔서<br/>따뜻한 축복과 응원 부탁드립니다.</p>
          </div>
          <div className="mt-10 flex justify-center items-center gap-8 text-sm text-stone-600">
            <div className="text-center">
              <span className="block text-xs text-stone-400 mb-1">아빠</span>
              <span className="font-medium text-lg text-stone-800">{parents.dad.name}</span>
            </div>
            <div className="h-8 w-px bg-stone-200"></div>
            <div className="text-center">
              <span className="block text-xs text-stone-400 mb-1">엄마</span>
              <span className="font-medium text-lg text-stone-800">{parents.mom.name}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-stone-50"></div>

        {/* Date & Calendar */}
        <div className="px-8 py-12 bg-white text-center">
          <div className="inline-block px-3 py-1 rounded-md bg-stone-100 text-stone-500 text-[10px] font-bold tracking-widest mb-6">
            DATE
          </div>
          <h2 className="text-2xl font-serif text-stone-800 mb-2">2026. 03. 14</h2>
          <p className="text-stone-500 mb-8">{eventTime}</p>

          {/* Calendar Visualization (March 2026) */}
          <div className="bg-white border border-stone-100 p-6 rounded-xl mx-2 shadow-sm">
            <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-sm font-bold text-stone-400">March</span>
                <span className="text-sm font-bold text-stone-800">2026</span>
            </div>
            <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center text-xs">
              <div className="text-rose-400 font-medium">S</div>
              <div className="text-stone-400">M</div>
              <div className="text-stone-400">T</div>
              <div className="text-stone-400">W</div>
              <div className="text-stone-400">T</div>
              <div className="text-stone-400">F</div>
              <div className="text-stone-400">S</div>

              {/* Week 1: 1st is Sunday */}
              <div className="text-rose-400">1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div>
              {/* Week 2: 12th is Thu, 14th is Sat */}
              <div className="text-rose-400">8</div><div>9</div><div>10</div><div>11</div>
              
              {/* 12th: Real Birthday */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center z-0"></div>
                <span className="relative z-10 font-bold text-stone-600">12</span>
                <Cake size={10} className="absolute -top-2 -right-1 text-yellow-500 fill-yellow-400" />
              </div>
              
              <div>13</div>
              
              {/* 14th: Event Date */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-7 h-7 bg-rose-500 rounded-full text-white flex items-center justify-center z-10 shadow-lg font-bold">14</div>
              </div>
              
              {/* Week 3 */}
              <div className="text-rose-400">15</div><div>16</div><div>17</div><div>18</div><div>19</div><div>20</div><div>21</div>
              {/* Week 4 */}
              <div className="text-rose-400">22</div><div>23</div><div>24</div><div>25</div><div>26</div><div>27</div><div>28</div>
              {/* Week 5 */}
              <div className="text-rose-400">29</div><div>30</div><div>31</div><div className="text-stone-200">1</div><div className="text-stone-200">2</div><div className="text-stone-200">3</div><div className="text-stone-200">4</div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center gap-4 text-[10px] text-stone-500">
             <div className="flex items-center gap-1">
                <Cake size={12} className="text-yellow-500" />
                <span>12일: 실제 생일</span>
             </div>
             <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                <span>14일: 돌잔치</span>
             </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-stone-50"></div>

        {/* Gemini: Message */}
        <div className="px-6 py-12 bg-rose-50/30">
          <div className="text-center mb-6">
             <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-500 text-[10px] font-bold tracking-widest mb-2">
               <Sparkles size={10} /> AI WRITER
             </div>
             <h3 className="text-lg font-bold text-stone-700">AI 축하메시지 쓰기</h3>
             <p className="text-xs text-stone-500 mt-2">
               어떤 말을 써야할지 고민되시나요?<br/>
               AI가 서한이를 위한 축하글을 대신 써드려요!
             </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-rose-100">
            <div className="space-y-3">
              <input 
                type="text" 
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="서한이와의 관계 (예: 고모, 삼촌)"
                className="w-full p-3 bg-stone-50 border border-stone-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
              />
              <input 
                type="text" 
                value={wishKeyword}
                onChange={(e) => setWishKeyword(e.target.value)}
                placeholder="덕담 키워드 (예: 건강, 행복, 씩씩함)"
                className="w-full p-3 bg-stone-50 border border-stone-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
              />
              
              <button 
                onClick={handleGenerateMessage}
                disabled={isGeneratingMsg}
                className="w-full py-3 bg-rose-400 text-white rounded-lg font-bold text-sm hover:bg-rose-500 transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isGeneratingMsg ? (
                  <span className="animate-pulse">AI가 글 쓰는 중...</span>
                ) : (
                  <>
                    <Wand2 size={16} /> 메시지 생성하기
                  </>
                )}
              </button>
            </div>

            {generatedMessage && (
              <div className="mt-4 pt-4 border-t border-dashed border-stone-200 animate-fadeIn">
                <div className="bg-stone-50 p-4 rounded-lg text-stone-600 text-sm leading-relaxed relative border border-stone-100">
                   "{generatedMessage}"
                   <button 
                    onClick={() => handleCopy(generatedMessage)}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-stone-400 hover:text-rose-500 transition-colors"
                   >
                     <Copy size={12} />
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-stone-50"></div>

        {/* Gemini: Doljabi */}
        <div className="px-6 py-12 bg-white">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-500 text-[10px] font-bold tracking-widest mb-2">
               <Sparkles size={10} /> PREDICTION
             </div>
             <h3 className="text-lg font-bold text-stone-700">AI 돌잡이 점치기</h3>
             <p className="text-xs text-stone-500 mt-2">
               서한이가 무엇을 잡을까요? 재미로 점쳐보세요!
             </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {['연필', '명주실', '돈', '마이크', '청진기', '판사봉'].map((item) => (
              <button
                key={item}
                onClick={() => handleDoljabiPrediction(item)}
                className={`p-2 rounded-xl border transition-all text-xs font-medium flex flex-col items-center justify-center gap-2 h-20
                  ${selectedDoljabi === item 
                    ? 'border-blue-400 bg-blue-50 text-blue-600 ring-1 ring-blue-300' 
                    : 'border-stone-100 bg-white text-stone-500 hover:bg-stone-50'}`}
              >
                <span className="text-xl">
                  {item === '연필' ? '✏️' : 
                   item === '명주실' ? '🧵' : 
                   item === '돈' ? '💰' : 
                   item === '마이크' ? '🎤' : 
                   item === '청진기' ? '🩺' : '⚖️'}
                </span>
                {item}
              </button>
            ))}
          </div>

          {isPredicting && (
             <div className="text-center py-4 bg-stone-50 rounded-xl">
                <p className="text-stone-400 text-xs animate-pulse">서한이의 미래를 상상하는 중...</p>
             </div>
          )}

          {!isPredicting && doljabiResult && (
            <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100 animate-fadeIn text-center shadow-sm">
               <div className="text-xs font-bold text-blue-500 mb-2">✨ AI의 해석</div>
               <p className="text-stone-700 text-sm leading-relaxed break-keep">
                 {doljabiResult}
               </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-2 bg-stone-50"></div>

        {/* Location */}
        <div className="px-8 py-12 bg-white">
           <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 rounded-md bg-stone-100 text-stone-500 text-[10px] font-bold tracking-widest mb-2">
              LOCATION
            </div>
            <h3 className="text-xl font-bold text-stone-700">{locationName}</h3>
            <p className="text-stone-400 text-xs mt-2">{locationAddress}</p>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-56 bg-stone-100 rounded-xl relative overflow-hidden mb-6 flex items-center justify-center border border-stone-200">
             {/* Abstract Map Background */}
             <div className="absolute inset-0 bg-stone-200 opacity-50"></div>
             
             {/* Center Marker */}
             <div className="z-10 bg-white p-3 rounded-xl shadow-lg flex flex-col items-center animate-bounce-slow">
                <MapPin className="text-rose-500 mb-1" size={24} />
                <span className="font-bold text-xs text-stone-800">노보텔 앰배서더</span>
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl">
                <div className="mt-1 bg-white p-2 rounded-full shadow-sm text-stone-600">
                    <Train size={16} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-stone-700 mb-1">지하철 이용 시</h4>
                    <p className="text-xs text-stone-500 leading-relaxed">
                        <span className="text-blue-600 font-bold">1호선</span> / <span className="text-yellow-500 font-bold">수인분당선</span> 수원역 하차<br/>
                        수원역 4번 출구 또는 AK플라자 2층 연결통로 이용
                    </p>
                </div>
             </div>

             <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl">
                <div className="mt-1 bg-white p-2 rounded-full shadow-sm text-stone-600">
                    <Car size={16} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-stone-700 mb-1">자가용 이용 시</h4>
                    <p className="text-xs text-stone-500 leading-relaxed">
                        호텔 지하 주차장 또는 AK플라자 주차장 이용<br/>
                        (행사 참석 시 3시간 무료 주차 지원)
                    </p>
                </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-900 text-stone-400 py-12 px-6 text-center">
            <div className="flex justify-center gap-6 mb-8">
               <button className="flex flex-col items-center gap-1 group">
                  <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white group-hover:bg-rose-500 transition-colors">
                    <Phone size={16} />
                  </div>
                  <span className="text-[10px]">전화하기</span>
               </button>
               <button className="flex flex-col items-center gap-1 group">
                  <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white group-hover:bg-rose-500 transition-colors">
                    <MessageCircle size={16} />
                  </div>
                  <span className="text-[10px]">문자하기</span>
               </button>
               <button 
                className="flex flex-col items-center gap-1 group"
                onClick={() => handleCopy(window.location.href)}
               >
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-stone-900 font-bold group-hover:bg-yellow-300 transition-colors">
                    <Share2 size={16} />
                  </div>
                  <span className="text-[10px]">공유하기</span>
               </button>
            </div>
            <p className="text-xs mb-2 tracking-wider">Seo-han's 1st Birthday</p>
            <p className="text-[10px] text-stone-600 font-light">Copyright © 2026 Baek Family. All rights reserved.</p>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-stone-800/90 text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-xl z-50 animate-fadeInUp flex items-center gap-2 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}

