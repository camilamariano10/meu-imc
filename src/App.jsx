import React, { useState, createContext, useContext } from 'react';
import { Home as HomeIcon, Settings, User, Scale, Ruler, Zap, Heart, Flame, ArrowRight, ArrowLeft, Moon, Sun } from 'lucide-react';

// --- 1. Context API para o Tema ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // CORREÇÃO: Cores escritas DIRETAMENTE nas strings.
  // O Tailwind precisa ler o código hexadecimal completo (ex: bg-[#F2E0DC]) no arquivo para gerar o CSS.
  
  // Paleta:
  // Fundo Claro (Pêssego): #F2E0DC
  // Cards Claros (Rosa): #F2D0E9
  // Botão/Destaque (Rosa Médio): #F2BBBB
  // Fundo Escuro (Preto): #0D0D0D
  // Detalhe (Menta): #ACF2DE

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      // MODO ESCURO
      bg: 'bg-[#0D0D0D]', 
      card: 'bg-[#1a1a1a] border-[#333333]',
      text: 'text-white',
      textSec: 'text-gray-400',
      input: 'bg-[#262626] border-[#404040] text-white placeholder-gray-500 focus:ring-[#F2BBBB]',
      buttonPrimary: 'bg-[#F2BBBB] hover:bg-opacity-80 text-[#0D0D0D]', // Rosa médio com texto escuro para contraste
      buttonSecondary: 'bg-[#333333] hover:bg-[#404040] text-white',
      border: 'border-[#333333]',
      highlight: 'bg-[#ACF2DE] text-[#0D0D0D]' // Menta
    } : {
      // MODO CLARO (Sua paleta personalizada)
      bg: 'bg-[#F2E0DC]', // Pêssego Claro
      card: 'bg-[#F2D0E9] border-white/50', // Rosa Claro
      text: 'text-[#0D0D0D]', // Preto quase total
      textSec: 'text-[#0D0D0D]/60',
      input: 'bg-white/80 border-white text-[#0D0D0D] placeholder-gray-400 focus:ring-[#F2BBBB]',
      buttonPrimary: 'bg-[#F2BBBB] hover:brightness-95 text-[#0D0D0D]', // Rosa Médio
      buttonSecondary: 'bg-white hover:bg-gray-50 text-[#0D0D0D]',
      border: 'border-white/40',
      highlight: 'bg-[#ACF2DE] text-[#0D0D0D]' // Menta
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Funções Auxiliares ---
const calculateIMC = (weight, heightCm) => {
  if (!weight || !heightCm || heightCm === 0) return null;
  const heightM = heightCm / 100;
  return (weight / (heightM * heightM)).toFixed(2);
};

const getIMCClassification = (imc) => {
  if (imc === null) return "Insira os dados";
  if (imc < 18.5) return "Abaixo do peso";
  if (imc >= 18.5 && imc < 24.9) return "Peso normal";
  if (imc >= 24.9 && imc < 29.9) return "Sobrepeso";
  if (imc >= 29.9 && imc < 34.9) return "Obesidade Grau I";
  if (imc >= 34.9 && imc < 39.9) return "Obesidade Grau II (Severa)";
  return "Obesidade Grau III (Mórbida)";
};

// --- 2. Componentes de Tela ---

const HomeScreen = ({ navigate }) => {
  const { colors } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [imcCalculationsCount, setImcCalculationsCount] = useState(0);

  const handleCalculateIMC = () => {
    if (!name.trim()) {
      alert("Por favor, digite seu nome.");
      return;
    }
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    if (isNaN(parsedWeight) || isNaN(parsedHeight) || parsedWeight <= 0 || parsedHeight <= 0) {
      alert("Por favor, insira valores válidos.");
      return;
    }

    const imc = calculateIMC(parsedWeight, parsedHeight);
    const classification = getIMCClassification(imc);

    setImcCalculationsCount(prev => prev + 1);
    navigate('results', { imc, classification, weight: parsedWeight, height: parsedHeight, name, age });
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
      <div className={`${colors.card} p-6 rounded-3xl shadow-xl backdrop-blur-sm border ${colors.border}`}>
        <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${colors.text}`}>
          <HomeIcon className="w-6 h-6" /> Calculadora de IMC
        </h2>
        
        <div className="space-y-5">
          {/* Nome */}
          <div>
            <label className={`block text-sm font-bold mb-1.5 ml-1 ${colors.textSec}`}>Nome</label>
            <div className="relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-4 pl-11 rounded-2xl border-2 outline-none transition-all font-medium ${colors.input}`}
                placeholder="Seu nome"
              />
              <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 group-focus-within:opacity-100 transition-opacity ${colors.text}`} />
            </div>
          </div>

          {/* Idade */}
          <div>
            <label className={`block text-sm font-bold mb-1.5 ml-1 ${colors.textSec}`}>Idade</label>
            <div className="relative group">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={`w-full p-4 pl-11 rounded-2xl border-2 outline-none transition-all font-medium ${colors.input}`}
                placeholder="Ex: 25"
              />
              <Flame className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 group-focus-within:opacity-100 transition-opacity ${colors.text}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {/* Peso */}
            <div>
              <label className={`block text-sm font-bold mb-1.5 ml-1 ${colors.textSec}`}>Peso (kg)</label>
              <div className="relative group">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={`w-full p-4 pl-11 rounded-2xl border-2 outline-none transition-all font-medium ${colors.input}`}
                  placeholder="70"
                />
                <Scale className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 group-focus-within:opacity-100 transition-opacity ${colors.text}`} />
              </div>
            </div>
            {/* Altura */}
            <div>
              <label className={`block text-sm font-bold mb-1.5 ml-1 ${colors.textSec}`}>Altura (cm)</label>
              <div className="relative group">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={`w-full p-4 pl-11 rounded-2xl border-2 outline-none transition-all font-medium ${colors.input}`}
                  placeholder="175"
                />
                <Ruler className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 group-focus-within:opacity-100 transition-opacity ${colors.text}`} />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleCalculateIMC}
          className={`w-full mt-8 py-4 px-6 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all ${colors.buttonPrimary}`}
        >
          Calcular Agora <Zap className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* Contador */}
      <div className={`${colors.card} p-4 rounded-2xl shadow-lg border flex items-center justify-between ${colors.border}`}>
        <span className={`text-sm font-medium ${colors.textSec}`}>Cálculos hoje</span>
        <div className={`px-3 py-1 rounded-lg font-bold ${colors.highlight}`}>
          {imcCalculationsCount}
        </div>
      </div>

      <button
        onClick={() => navigate('settings')}
        className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all border-2 ${colors.buttonSecondary} ${colors.border}`}
      >
        <Settings className="w-5 h-5" /> Configurações
      </button>
    </div>
  );
};

const ResultScreen = ({ navigate, params }) => {
  const { colors, isDarkMode } = useContext(ThemeContext);
  const { imc, classification, weight, height, name, age } = params;

  // Lógica de cores para o resultado
  const getStatusColor = (label) => {
    if (label.includes("Normal")) return "bg-[#ACF2DE] text-[#0D0D0D]"; // Menta
    if (label.includes("Abaixo")) return "bg-yellow-100 text-yellow-800";
    return "bg-[#F2BBBB] text-[#0D0D0D]"; // Rosa Médio (Alerta)
  };

  return (
    <div className="animate-in slide-in-from-right duration-300">
      <div className={`${colors.card} p-8 rounded-3xl shadow-xl border text-center ${colors.border}`}>
        
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-inner ${colors.highlight}`}>
          <Heart size={40} className="text-[#0D0D0D]" />
        </div>
        
        <h2 className={`text-3xl font-bold mb-1 ${colors.text}`}>Olá, {name}!</h2>
        {age && <p className={`text-sm mb-6 font-medium ${colors.textSec}`}>{age} anos</p>}
        
        <div className={`py-6 px-4 rounded-2xl mb-6 ${isDarkMode ? 'bg-black/20' : 'bg-white/40'}`}>
          <span className={`text-sm uppercase tracking-wider font-bold ${colors.textSec}`}>Seu IMC é</span>
          <p className={`text-6xl font-black my-2 ${colors.text}`}>
            {imc || "--"}
          </p>
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mt-2 ${getStatusColor(classification)}`}>
            {classification}
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-4 mb-8 text-left`}>
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-black/20' : 'bg-white/50'}`}>
            <p className={`text-xs font-bold uppercase mb-1 ${colors.textSec}`}>Peso</p>
            <p className={`text-xl font-bold ${colors.text}`}>{weight} <span className="text-sm font-normal">kg</span></p>
          </div>
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-black/20' : 'bg-white/50'}`}>
            <p className={`text-xs font-bold uppercase mb-1 ${colors.textSec}`}>Altura</p>
            <p className={`text-xl font-bold ${colors.text}`}>{height} <span className="text-sm font-normal">cm</span></p>
          </div>
        </div>

        <button
          onClick={() => navigate('home')}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${colors.buttonSecondary}`}
        >
          <ArrowLeft className="w-5 h-5" /> Novo Cálculo
        </button>
      </div>
    </div>
  );
};

const SettingsScreen = ({ navigate }) => {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <div className="animate-in slide-in-from-right duration-300">
      <div className={`${colors.card} p-6 rounded-3xl shadow-xl border ${colors.border}`}>
        <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${colors.text}`}>
          <Settings className="w-7 h-7" /> Ajustes
        </h2>

        <div className={`flex items-center justify-between p-5 rounded-2xl mb-6 ${isDarkMode ? 'bg-black/20' : 'bg-white/50'}`}>
          <div>
            <h3 className={`font-bold text-lg ${colors.text}`}>Modo Escuro</h3>
            <p className={`text-sm ${colors.textSec}`}>Alterar aparência</p>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`w-16 h-9 rounded-full p-1 transition-all duration-300 flex items-center ${isDarkMode ? 'bg-[#ACF2DE] justify-end' : 'bg-gray-300 justify-start'}`}
          >
            <div className={`w-7 h-7 rounded-full shadow-sm flex items-center justify-center transition-all ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
               {isDarkMode ? <Moon size={14} className="text-white" /> : <Sun size={14} className="text-yellow-500" />}
            </div>
          </button>
        </div>

        <div className={`p-5 rounded-2xl border ${colors.border} ${colors.highlight} bg-opacity-20`}>
          <p className="text-sm font-medium text-[#0D0D0D]">
            <strong>Dica:</strong> O tema utiliza Context API para aplicar as cores personalizadas (#F2D0E9, #ACF2DE...) em todo o app instantaneamente.
          </p>
        </div>

        <button
          onClick={() => navigate('home')}
          className={`w-full mt-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${colors.buttonSecondary}`}
        >
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>
      </div>
    </div>
  );
};

const MainContent = () => {
  const { colors } = useContext(ThemeContext);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [navParams, setNavParams] = useState({});

  const navigate = (screenName, params = {}) => {
    setNavParams(params);
    setCurrentScreen(screenName);
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500 ${colors.bg}`}>
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className={`text-4xl font-black tracking-tight mb-1 ${colors.text}`}>
            IMC Saúde
          </h1>
          <p className={`font-medium opacity-70 ${colors.textSec}`}>Calculadora Personalizada</p>
        </header>

        <main>
          {currentScreen === 'home' && <HomeScreen navigate={navigate} />}
          {currentScreen === 'results' && <ResultScreen navigate={navigate} params={navParams} />}
          {currentScreen === 'settings' && <SettingsScreen navigate={navigate} />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}