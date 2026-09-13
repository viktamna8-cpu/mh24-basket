import React, { useState, useEffect } from "react";
import {
  Search, Bell, Home, Leaf, ShoppingBasket, ChevronRight, Plus, Minus,
  X, Check, Lock, ArrowLeft, Trash2, Settings, MapPin, Phone, User,
} from "lucide-react";

/* =========================================================
   CATEGORIES
   ========================================================= */
const CATEGORIES = [
  { id: "daily", mr: "रोजच्या भाज्या", en: "Daily Vegetables", img: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&q=80" },
  { id: "leafy", mr: "पालेभाज्या", en: "Leafy Vegetables", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80" },
  { id: "seasonal", mr: "हंगामी भाज्या", en: "Seasonal Vegetables", img: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=80" },
  { id: "piece", mr: "नगावर मिळणाऱ्या वस्तू", en: "Piece Items", img: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=400&q=80" },
];

/* =========================================================
   PRODUCT FACTORY
   imgKey refers to IMG (real photo) or VEGGIE_FALLBACK (icon) below
   ========================================================= */
let _id = 0;
const P = (mr, en, cat, type, savingUnit, imgKey, inStock = true) => ({
  id: ++_id, mr, en, cat, type, savingUnit, imgKey, inStock,
});

/* Real, accurate photos only — every key here is verified to match the vegetable */
const IMG = {
  tomato: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80",
  onion: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=80",
  potato: "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=400&q=80",
  carrot: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&q=80",
  beetroot: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=400&q=80",
  radish: "https://images.unsplash.com/photo-1585159812596-fac104f2f069?w=400&q=80",
  cucumber: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&q=80",
  ladyfinger: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
  cauliflower: "https://images.unsplash.com/photo-1568584711271-6c929fb49b0b?w=400&q=80",
  cabbage: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&q=80",
  capsicum: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80",
  greenchilli: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=80",
  frenchbeans: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=400&q=80",
  rawbanana: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&q=80",
  sweetpotato: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=400&q=80",
  garlic: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=400&q=80",
  ginger: "https://images.unsplash.com/photo-1573414405950-8a19fa5ab5ab?w=400&q=80",
  greenpeas: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&q=80",
  corn: "https://images.unsplash.com/photo-1601593768799-76c05e7d9b8e?w=400&q=80",
  mushroom: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
  pumpkin: "https://images.unsplash.com/photo-1509618434313-84cf5cb6f2ff?w=400&q=80",
  methi: "https://images.unsplash.com/photo-1600231316490-2d5567c9db22?w=400&q=80",
  spinach: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80",
  coriander: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=80",
  mint: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&q=80",
  curryleaves: "https://images.unsplash.com/photo-1600231316490-2d5567c9db22?w=400&q=80",
  rawmango: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=400&q=80",
  jackfruit: "https://images.unsplash.com/photo-1601493700518-42b241a914d2?w=400&q=80",
  lemon: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&q=80",
  coconut: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=400&q=80",
  brinjal: "https://images.unsplash.com/photo-1635342630559-6f2b56316b5f?w=400&q=80",
};

/* Vegetables without a verified accurate photo get a clean icon card instead of a wrong photo */
const VEGGIE_FALLBACK = {
  bittergourd: { emoji: "🥒", bg: "#DCEEDC" },
  ridgegourd: { emoji: "🥒", bg: "#DCEEDC" },
  snakegourd: { emoji: "🥒", bg: "#DCEEDC" },
  bottlegourd: { emoji: "🥒", bg: "#E8F3E0" },
  clusterbeans: { emoji: "🫛", bg: "#E4F0DD" },
  drumstick: { emoji: "🌿", bg: "#E4F0DD" },
  ivygourd: { emoji: "🫑", bg: "#DCEEDC" },
  hyacinthbeans: { emoji: "🫘", bg: "#E4F0DD" },
  dill: { emoji: "🌿", bg: "#E0F2E9" },
  amaranth: { emoji: "🥬", bg: "#E0F2E9" },
  suran: { emoji: "🍠", bg: "#F3EADA" },
  default: { emoji: "🥬", bg: "#E8F3E0" },
};

const PRODUCTS = [
  P("टोमॅटो", "Tomato", "daily", "weight", 3, "tomato"),
  P("कांदा", "Onion", "daily", "weight", 3, "onion"),
  P("बटाटा", "Potato", "daily", "weight", 2, "potato"),
  P("गाजर", "Carrot", "daily", "weight", 2, "carrot"),
  P("बीट", "Beetroot", "daily", "weight", 2, "beetroot"),
  P("मुळा", "Radish", "daily", "weight", 2, "radish"),
  P("काकडी", "Cucumber", "daily", "weight", 2, "cucumber"),
  P("दुधी भोपळा", "Bottle Gourd", "daily", "weight", 3, "bottlegourd"),
  P("कारले", "Bitter Gourd", "daily", "weight", 3, "bittergourd"),
  P("दोडका", "Ridge Gourd", "daily", "weight", 3, "ridgegourd"),
  P("पडवळ", "Snake Gourd", "daily", "weight", 3, "snakegourd"),
  P("भेंडी", "Lady Finger", "daily", "weight", 3, "ladyfinger"),
  P("वांगी", "Brinjal", "daily", "weight", 3, "brinjal"),
  P("फ्लॉवर", "Cauliflower", "daily", "weight", 3, "cauliflower"),
  P("कोबी", "Cabbage", "daily", "weight", 3, "cabbage"),
  P("ढोबळी मिरची", "Capsicum", "daily", "weight", 4, "capsicum"),
  P("हिरवी मिरची", "Green Chilli", "daily", "weight", 4, "greenchilli"),
  P("फरसबी", "French Beans", "daily", "weight", 2, "frenchbeans"),
  P("गवार", "Cluster Beans", "daily", "weight", 3, "clusterbeans"),
  P("शेवगा", "Drumstick", "daily", "weight", 3, "drumstick"),
  P("तोंडली", "Ivy Gourd", "daily", "weight", 3, "ivygourd"),
  P("वाल पापडी", "Hyacinth Beans", "daily", "weight", 3, "hyacinthbeans"),
  P("कच्ची केळी", "Raw Banana", "daily", "weight", 2, "rawbanana"),
  P("रताळे", "Sweet Potato", "daily", "weight", 2, "sweetpotato"),
  P("लसूण", "Garlic", "daily", "weight", 4, "garlic"),
  P("आले", "Ginger", "daily", "weight", 4, "ginger"),
  P("हिरवे वाटाणे", "Green Peas", "daily", "weight", 4, "greenpeas"),
  P("मका", "Corn", "daily", "weight", 3, "corn"),
  P("मशरूम", "Mushroom", "daily", "weight", 4, "mushroom"),
  P("भोपळा", "Pumpkin", "daily", "weight", 2, "pumpkin"),
  P("मेथी", "Methi", "leafy", "pendi", 3, "methi"),
  P("पालक", "Spinach", "leafy", "pendi", 3, "spinach"),
  P("कोथिंबीर", "Coriander", "leafy", "pendi", 3, "coriander"),
  P("पुदिना", "Mint", "leafy", "pendi", 3, "mint"),
  P("शेपू", "Dill", "leafy", "pendi", 3, "dill"),
  P("तांदुळजा", "Amaranth", "leafy", "pendi", 3, "amaranth"),
  P("चाकवत", "Chakvat", "leafy", "pendi", 3, "amaranth"),
  P("अंबाडी", "Ambadi", "leafy", "pendi", 3, "amaranth"),
  P("कढीपत्ता", "Curry Leaves", "leafy", "pendi", 2, "curryleaves"),
  P("करडईची भाजी", "Safflower Leaves", "leafy", "pendi", 3, "amaranth"),
  P("अळूची पाने", "Colocasia Leaves", "leafy", "pendi", 3, "spinach"),
  P("मोहरीची भाजी", "Mustard Greens", "leafy", "pendi", 3, "spinach"),
  P("कैरी", "Raw Mango", "seasonal", "weight", 4, "rawmango"),
  P("सुरण", "Suran", "seasonal", "weight", 3, "suran"),
  P("अळूचे कंद", "Arbi", "seasonal", "weight", 3, "suran"),
  P("फणस", "Jackfruit", "seasonal", "piece", 15, "jackfruit"),
  P("ताजे हिरवे वाटाणे", "Fresh Green Peas", "seasonal", "weight", 4, "greenpeas"),
  P("हंगामी मका", "Seasonal Corn", "seasonal", "piece", 3, "corn"),
  P("हंगामी कच्ची केळी", "Seasonal Raw Banana", "seasonal", "weight", 2, "rawbanana"),
  P("हंगामी भोपळा", "Seasonal Pumpkin", "seasonal", "weight", 2, "pumpkin"),
  P("लिंबू", "Lemon", "piece", "piece", 1, "lemon"),
  P("नारळ", "Coconut", "piece", "piece", 3, "coconut"),
  P("मका (नग)", "Corn (Piece)", "piece", "piece", 3, "corn"),
  P("कच्चे केळे (नग)", "Raw Banana (Piece)", "piece", "piece", 2, "rawbanana"),
  P("शेवगा (नग)", "Drumstick (Piece)", "piece", "piece", 2, "drumstick"),
  P("काकडी (नग)", "Cucumber (Piece)", "piece", "piece", 2, "cucumber"),
  P("दुधी भोपळा (नग)", "Bottle Gourd (Piece)", "piece", "piece", 3, "bottlegourd"),
  P("भोपळा (नग)", "Pumpkin (Piece)", "piece", "piece", 4, "pumpkin"),
  P("फ्लॉवर (नग)", "Cauliflower (Piece)", "piece", "piece", 3, "cauliflower"),
  P("कोबी (नग)", "Cabbage (Piece)", "piece", "piece", 3, "cabbage"),
];

/* =========================================================
   CONSTANTS
   ========================================================= */
const WHATSAPP_NUMBER = "919503816596";
const DISPLAY_NUMBER = "9503816596";
const DELIVERY_FEE_TEXT = "₹99 only";
const DISCLAIMER = "Saving shown is an estimated minimum saving. Final availability and saving will be confirmed by MH24 Basket.";
const ADMIN_PASSWORD = "mh24admin";
const STORAGE_KEY = "mh24_basket_customer_details";

const GREEN = "#1F6B3A";
const GREEN_DARK = "#164F2B";
const CREAM = "#FAF8F0";

/* =========================================================
   HELPERS
   ========================================================= */
function qtyLabel(type, qty) {
  if (type === "weight") {
    if (qty < 1000) return `${qty} g`;
    const kg = qty / 1000;
    return `${kg % 1 === 0 ? kg : kg.toFixed(2).replace(/0$/, "").replace(/\.$/, "")} Kg`;
  }
  if (type === "pendi") return `${qty} पेंडी`;
  return `${qty} नग`;
}
function stepFor(type) { return type === "weight" ? 250 : 1; }
function minFor(type) { return type === "weight" ? 250 : 1; }
function savingFor(product, qty) {
  if (product.type === "weight") return Math.round(product.savingUnit * (qty / 250));
  return Math.round(product.savingUnit * qty);
}
function loadDetails() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { name: "", mobile: "", society: "", flat: "", address: "", landmark: "", note: "" };
}
function saveDetails(details) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(details)); } catch (e) {}
}

/* =========================================================
   VEGGIE IMAGE — real photo, with a clean icon fallback
   if no verified photo exists or the photo fails to load
   ========================================================= */
function VeggieImage({ imgKey, name, className }) {
  const [failed, setFailed] = useState(false);
  const url = IMG[imgKey];
  const hasRealPhoto = url && !failed;
  const fallback = VEGGIE_FALLBACK[imgKey] || VEGGIE_FALLBACK.default;

  if (hasRealPhoto) {
    return (
      <img
        src={url}
        alt={name}
        className={className}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    );
  }
  return (
    <div className={`${className} flex items-center justify-center`} style={{ backgroundColor: fallback.bg }}>
      <span style={{ fontSize: "2.25rem", lineHeight: 1 }}>{fallback.emoji}</span>
    </div>
  );
}

/* =========================================================
   SHARED UI PIECES
   ========================================================= */
function StockBadge({ inStock }) {
  return inStock ? (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/95 text-emerald-700 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> उपलब्ध
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/95 text-red-600 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> उपलब्ध नाही
    </span>
  );
}

function QtyStepper({ product, qty, onChange, disabled }) {
  const step = stepFor(product.type);
  const min = minFor(product.type);
  return (
    <div className={`flex items-center rounded-full overflow-hidden border ${disabled ? "border-gray-200 opacity-50" : "border-emerald-200"}`}>
      <button
        disabled={disabled}
        onClick={() => onChange(Math.max(min, qty - step))}
        className="w-9 h-9 flex items-center justify-center bg-emerald-50 text-emerald-800 disabled:cursor-not-allowed active:scale-95 transition"
      >
        <Minus size={16} />
      </button>
      <div className="px-3 min-w-[70px] text-center text-sm font-semibold text-gray-800 tabular-nums">
        {qtyLabel(product.type, qty)}
      </div>
      <button
        disabled={disabled}
        onClick={() => onChange(qty + step)}
        className="w-9 h-9 flex items-center justify-center bg-emerald-50 text-emerald-800 disabled:cursor-not-allowed active:scale-95 transition"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

function ProductCard({ product, qty, onQtyChange, onAdd, inCart }) {
  const disabled = !product.inStock;
  const saving = savingFor(product, qty);
  return (
    <div className={`rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${disabled ? "opacity-60" : ""}`}>
      <div className="relative h-28 w-full">
        <VeggieImage imgKey={product.imgKey} name={product.en} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2"><StockBadge inStock={product.inStock} /></div>
      </div>
      <div className="p-3">
        <div className="flex items-baseline justify-between gap-2">
          <div className="min-w-0">
            <div className="font-bold text-gray-900 text-sm leading-tight truncate">{product.mr}</div>
            <div className="text-xs text-gray-500 truncate">{product.en}</div>
          </div>
          <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
            ₹{saving} बचत
          </div>
        </div>
        <div className="mt-3">
          <QtyStepper product={product} qty={qty} onChange={onQtyChange} disabled={disabled} />
        </div>
        <button
          disabled={disabled}
          onClick={onAdd}
          className={`mt-3 w-full py-2 rounded-full text-sm font-semibold transition active:scale-[0.98] ${
            disabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : inCart
              ? "bg-emerald-100 text-emerald-800"
              : "text-white shadow-sm"
          }`}
          style={!disabled && !inCart ? { backgroundColor: GREEN } : {}}
        >
          {disabled ? "उपलब्ध नाही" : inCart ? "✓ टोपलीत जोडले" : "टोपलीत जोडा"}
        </button>
      </div>
    </div>
  );
}

function BottomNav({ screen, setScreen, cartCount }) {
  const items = [
    { id: "home", mr: "मुख्यपृष्ठ", icon: Home },
    { id: "daily", mr: "रोजच्या भाज्या", icon: Leaf },
    { id: "leafy", mr: "पालेभाज्या", icon: Leaf },
    { id: "basket", mr: "टोपली", icon: ShoppingBasket },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex items-center justify-around py-2 px-2 z-40">
      {items.map((it) => {
        const active = screen === it.id;
        const Icon = it.icon;
        return (
          <button key={it.id} onClick={() => setScreen(it.id)} className="flex flex-col items-center gap-0.5 px-3 py-1 relative">
            <Icon size={22} color={active ? GREEN : "#9CA3AF"} />
            {it.id === "basket" && cartCount > 0 && (
              <span className="absolute -top-1 right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-[10px] font-medium" style={{ color: active ? GREEN : "#9CA3AF" }}>{it.mr}</span>
          </button>
        );
      })}
    </div>
  );
}

function Header({ setScreen }) {
  return (
    <div className="px-4 pt-5 pb-2 flex items-center justify-between" style={{ backgroundColor: CREAM }}>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: GREEN }}>
          <Leaf size={18} color="white" />
        </div>
        <div>
          <div className="font-extrabold text-lg leading-none" style={{ color: GREEN }}>MH24 Basket</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Fresh Vegetables • Healthier Families</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setScreen("search")} className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Search size={17} className="text-gray-600" />
        </button>
        <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Bell size={17} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   SCREENS
   ========================================================= */
function HomeScreen({ setScreen, setCategory, search, setSearch }) {
  return (
    <div className="pb-24">
      <Header setScreen={setScreen} />
      <div className="px-4 pt-2">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setScreen("search")}
            placeholder="भाजी शोधा"
            className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white border border-gray-100 shadow-sm text-sm outline-none"
          />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">आज ताज्या भाज्यांवर बचत</h1>
        <p className="text-gray-500 text-sm mt-1 mb-4">Fresh savings today, delivered to your doorstep</p>
        <button
          onClick={() => setScreen("daily")}
          className="w-full py-3.5 rounded-full text-white font-bold mb-5 active:scale-[0.98] transition shadow-md"
          style={{ backgroundColor: GREEN }}
        >
          ऑर्डर करा
        </button>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCategory(c.id); setScreen("category"); }}
              className="text-left rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
            >
              <div className="h-24 w-full bg-gray-100">
                <img src={c.img} alt={c.en} className="w-full h-full object-cover" />
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900 text-sm leading-tight">{c.mr}</div>
                  <div className="text-xs text-gray-500">{c.en}</div>
                </div>
                <ChevronRight size={16} className="text-gray-400 shrink-0" />
              </div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-5">
          <button onClick={() => setScreen("basket")} className="flex flex-col items-center gap-1.5 bg-white border border-gray-100 rounded-2xl py-3 shadow-sm">
            <ShoppingBasket size={20} color={GREEN} />
            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">माझी टोपली</span>
          </button>
          <button onClick={() => setScreen("profile")} className="flex flex-col items-center gap-1.5 bg-white border border-gray-100 rounded-2xl py-3 shadow-sm">
            <User size={20} color={GREEN} />
            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">ग्राहक माहिती</span>
          </button>
          <button onClick={() => setScreen("search")} className="flex flex-col items-center gap-1.5 bg-white border border-gray-100 rounded-2xl py-3 shadow-sm">
            <Search size={20} color={GREEN} />
            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">भाजी शोधा</span>
          </button>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 text-xs text-emerald-800 flex gap-2">
          <span>ⓘ</span><span>{DISCLAIMER}</span>
        </div>
        <button onClick={() => setScreen("admin-login")} className="mt-6 text-[11px] text-gray-300 mx-auto block">admin</button>
      </div>
    </div>
  );
}

function CategoryScreen({ categoryId, products, cart, updateQty, addToCart, setScreen }) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const [search, setSearch] = useState("");
  const list = products.filter(
    (p) => p.cat === categoryId && (p.mr.includes(search) || p.en.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="pb-24">
      <div className="px-4 pt-5 pb-2 flex items-center gap-3" style={{ backgroundColor: CREAM }}>
        <button onClick={() => setScreen("home")}><ArrowLeft size={20} /></button>
        <div className="font-extrabold text-lg" style={{ color: GREEN }}>MH24 Basket</div>
      </div>
      <div className="px-4 pt-3">
        <h1 className="text-xl font-extrabold text-gray-900">{cat.en}</h1>
        <p className="text-gray-500 text-sm mb-3">{cat.mr}</p>
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="या यादीत शोधा"
            className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white border border-gray-100 shadow-sm text-sm outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {list.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              qty={cart[p.id]?.qty ?? minFor(p.type)}
              onQtyChange={(q) => updateQty(p.id, q)}
              onAdd={() => addToCart(p.id)}
              inCart={!!cart[p.id]}
            />
          ))}
          {list.length === 0 && <div className="col-span-2 text-center text-gray-400 text-sm py-10">काही सापडले नाही</div>}
        </div>
      </div>
    </div>
  );
}

function SearchScreen({ products, cart, updateQty, addToCart, setScreen }) {
  const [q, setQ] = useState("");
  const list = q ? products.filter((p) => p.mr.includes(q) || p.en.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div className="pb-24">
      <div className="px-4 pt-5 pb-2 flex items-center gap-3" style={{ backgroundColor: CREAM }}>
        <button onClick={() => setScreen("home")}><ArrowLeft size={20} /></button>
        <div className="font-extrabold text-lg" style={{ color: GREEN }}>भाजी शोधा</div>
      </div>
      <div className="px-4 pt-3">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="टोमॅटो..."
            className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white border border-gray-100 shadow-sm text-sm outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {list.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              qty={cart[p.id]?.qty ?? minFor(p.type)}
              onQtyChange={(qty) => updateQty(p.id, qty)}
              onAdd={() => addToCart(p.id)}
              inCart={!!cart[p.id]}
            />
          ))}
          {q && list.length === 0 && <div className="col-span-2 text-center text-gray-400 text-sm py-10">काही सापडले नाही</div>}
        </div>
      </div>
    </div>
  );
}

function BasketScreen({ cart, products, updateQty, removeFromCart, setScreen, details, markOrdered }) {
  const items = Object.entries(cart).map(([id, v]) => ({ product: products.find((p) => p.id === Number(id)), ...v }));
  const totalSaving = items.reduce((sum, it) => sum + savingFor(it.product, it.qty), 0);
  const hasDetails = !!(details && details.name && details.mobile && details.address);

  const sendDirectly = () => {
    if (!hasDetails) { setScreen("details"); return; }
    const msg = buildWhatsAppMessage(cart, products, details);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    const win = window.open(url, "_blank");
    if (win) { markOrdered(); setScreen("success"); }
  };

  if (items.length === 0) {
    return (
      <div className="pb-24 px-4">
        <div className="pt-5 pb-2 flex items-center gap-3" style={{ backgroundColor: CREAM }}>
          <button onClick={() => setScreen("home")}><ArrowLeft size={20} /></button>
          <div className="font-extrabold text-lg" style={{ color: GREEN }}>माझी टोपली</div>
        </div>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <ShoppingBasket size={48} className="text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">तुमची टोपली रिकामी आहे</p>
          <button onClick={() => setScreen("daily")} className="mt-5 px-6 py-2.5 rounded-full text-white font-semibold text-sm shadow-sm" style={{ backgroundColor: GREEN }}>
            खरेदी सुरू करा
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-40">
      <div className="px-4 pt-5 pb-2 flex items-center gap-3" style={{ backgroundColor: CREAM }}>
        <button onClick={() => setScreen("home")}><ArrowLeft size={20} /></button>
        <div className="font-extrabold text-lg" style={{ color: GREEN }}>माझी टोपली</div>
      </div>
      <div className="px-4 pt-3 space-y-3">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex gap-3 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
            <VeggieImage imgKey={product.imgKey} name={product.en} className="w-16 h-16 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <div className="font-bold text-sm text-gray-900 truncate">{product.mr}</div>
                  <div className="text-xs text-gray-500 truncate">{product.en}</div>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="text-gray-300 shrink-0"><Trash2 size={16} /></button>
              </div>
              <div className="flex items-center justify-between mt-2 gap-2">
                <QtyStepper product={product} qty={qty} onChange={(q) => updateQty(product.id, q)} disabled={false} />
                <span className="text-xs font-semibold text-emerald-700 whitespace-nowrap">₹{savingFor(product, qty)}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mt-4">
          <div className="flex justify-between text-sm text-gray-700 mb-1"><span>Total Items</span><span className="font-semibold">{items.length}</span></div>
          <div className="flex justify-between text-sm text-gray-700 mb-1"><span>Total Minimum Estimated Saving</span><span className="font-bold text-emerald-700">₹{totalSaving}</span></div>
          <div className="flex justify-between text-sm text-gray-700"><span>Weekly Service / Delivery Fee</span><span className="font-semibold">{DELIVERY_FEE_TEXT}</span></div>
        </div>
        <p className="text-[11px] text-gray-400 px-1">{DISCLAIMER}</p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 p-3 space-y-2 z-40">
        <button onClick={() => setScreen("daily")} className="w-full py-2.5 rounded-full border border-emerald-200 text-emerald-800 font-semibold text-sm">
          खरेदी सुरू ठेवा
        </button>
        {hasDetails ? (
          <>
            <button onClick={sendDirectly} className="w-full py-3.5 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 bg-[#25D366] active:scale-[0.98] transition shadow-md">
              WhatsApp वर ऑर्डर पाठवा
            </button>
            <button onClick={() => setScreen("details")} className="w-full text-center text-xs text-gray-400 underline pt-1">
              माहिती बदला
            </button>
          </>
        ) : (
          <button onClick={() => setScreen("details")} className="w-full py-3 rounded-full text-white font-bold text-sm shadow-md" style={{ backgroundColor: GREEN }}>
            ग्राहक माहिती भरा
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", textarea }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none resize-none focus:border-emerald-300"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:border-emerald-300"
        />
      )}
    </div>
  );
}

function DetailsScreen({ details, setDetails, setScreen }) {
  const [form, setForm] = useState(details);
  useEffect(() => { setForm(details); }, [details]);
  const canContinue = form.name && form.mobile && form.address;

  const handleContinue = () => { setDetails(form); setScreen("confirm"); };
  const handleBack = () => { setDetails(form); setScreen("basket"); };

  return (
    <div className="pb-28 px-4">
      <div className="pt-5 pb-2 flex items-center gap-3" style={{ backgroundColor: CREAM }}>
        <button onClick={handleBack}><ArrowLeft size={20} /></button>
        <div className="font-extrabold text-lg" style={{ color: GREEN }}>ग्राहक माहिती</div>
      </div>
      <div className="pt-4 space-y-3">
        <Field label="पूर्ण नाव *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="मोबाईल नंबर *" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} type="tel" />
        <Field label="सोसायटी" value={form.society} onChange={(v) => setForm({ ...form, society: v })} />
        <Field label="फ्लॅट नंबर" value={form.flat} onChange={(v) => setForm({ ...form, flat: v })} />
        <Field label="पूर्ण पत्ता *" value={form.address} onChange={(v) => setForm({ ...form, address: v })} textarea />
        <Field label="जवळची खूण" value={form.landmark} onChange={(v) => setForm({ ...form, landmark: v })} />
        <Field label="विशेष सूचना" value={form.note} onChange={(v) => setForm({ ...form, note: v })} textarea />
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 p-3 z-40">
        <button
          disabled={!canContinue}
          onClick={handleContinue}
          className={`w-full py-3 rounded-full font-bold text-sm text-white shadow-md ${canContinue ? "" : "opacity-40"}`}
          style={{ backgroundColor: GREEN }}
        >
          पुढे जा
        </button>
      </div>
    </div>
  );
}

function buildWhatsAppMessage(cart, products, details) {
  const items = Object.entries(cart).map(([id, v]) => ({ product: products.find((p) => p.id === Number(id)), ...v }));
  const totalSaving = items.reduce((sum, it) => sum + savingFor(it.product, it.qty), 0);
  let msg = `MH24 Basket Order\n\n`;
  msg += `Customer Name: ${details.name}\n`;
  msg += `Mobile Number: ${details.mobile}\n`;
  if (details.society) msg += `Society: ${details.society}\n`;
  if (details.flat) msg += `Flat Number: ${details.flat}\n`;
  msg += `Address: ${details.address}\n`;
  if (details.landmark) msg += `Landmark: ${details.landmark}\n`;
  msg += `\nOrder Items:\n\n`;
  items.forEach((it, i) => {
    msg += `${i + 1}. ${it.product.en} / ${it.product.mr} - ${qtyLabel(it.product.type, it.qty)} (You Save ₹${savingFor(it.product, it.qty)})\n`;
  });
  msg += `\nTotal Minimum Estimated Saving: ₹${totalSaving}\n`;
  msg += `Weekly Service / Delivery Fee: ${DELIVERY_FEE_TEXT}\n`;
  if (details.note) msg += `\nSpecial Note:\n${details.note}\n`;
  msg += `\n${DISCLAIMER}`;
  return msg;
}

function ConfirmScreen({ cart, products, details, setScreen, markOrdered }) {
  const items = Object.entries(cart).map(([id, v]) => ({ product: products.find((p) => p.id === Number(id)), ...v }));
  const totalSaving = items.reduce((sum, it) => sum + savingFor(it.product, it.qty), 0);
  const sendOrder = () => {
    const msg = buildWhatsAppMessage(cart, products, details);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    const win = window.open(url, "_blank");
    if (win) { markOrdered(); setScreen("success"); }
  };
  return (
    <div className="pb-32 px-4">
      <div className="pt-5 pb-2 flex items-center gap-3" style={{ backgroundColor: CREAM }}>
        <button onClick={() => setScreen("details")}><ArrowLeft size={20} /></button>
        <div className="font-extrabold text-lg" style={{ color: GREEN }}>ऑर्डर रिव्ह्यू</div>
      </div>
      <div className="pt-3 space-y-3">
        <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
          <div className="text-xs font-bold text-gray-400 mb-2">CUSTOMER DETAILS</div>
          <div className="text-sm text-gray-800 space-y-1">
            <div className="flex items-center gap-2"><User size={14} className="text-gray-400" /> {details.name}</div>
            <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {details.mobile}</div>
            <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400" /> {details.address}{details.landmark ? `, ${details.landmark}` : ""}</div>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
          <div className="text-xs font-bold text-gray-400 mb-2">ORDER ITEMS</div>
          <div className="space-y-2">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex justify-between text-sm gap-2">
                <span className="text-gray-800">{product.mr} / {product.en} — {qtyLabel(product.type, qty)}</span>
                <span className="font-semibold text-emerald-700 whitespace-nowrap">₹{savingFor(product, qty)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-1"><span>Total Minimum Estimated Saving</span><span className="font-bold text-emerald-700">₹{totalSaving}</span></div>
          <div className="flex justify-between text-sm"><span>Weekly Service / Delivery Fee</span><span className="font-semibold">{DELIVERY_FEE_TEXT}</span></div>
        </div>
        <p className="text-[11px] text-gray-400 px-1">{DISCLAIMER}</p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 p-3 z-40">
        <button onClick={sendOrder} className="w-full py-3.5 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 bg-[#25D366] active:scale-[0.98] transition shadow-md">
          WhatsApp वर ऑर्डर पाठवा
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-2">WhatsApp Number: {DISPLAY_NUMBER}</p>
      </div>
    </div>
  );
}

function SuccessScreen({ cart, products, setScreen, clearCart }) {
  const items = Object.entries(cart).map(([id, v]) => ({ product: products.find((p) => p.id === Number(id)), ...v }));
  const totalSaving = items.reduce((sum, it) => sum + savingFor(it.product, it.qty), 0);
  return (
    <div className="px-4 pt-10 pb-10 flex flex-col items-center text-center">
      <button onClick={() => { clearCart(); setScreen("home"); }} className="self-start mb-4"><X size={22} /></button>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md" style={{ backgroundColor: GREEN }}>
        <Check size={32} color="white" />
      </div>
      <h2 className="text-xl font-extrabold text-gray-900">ऑर्डर पाठवली!</h2>
      <p className="text-gray-500 text-sm mb-1">Order Sent to WhatsApp</p>
      <p className="text-gray-400 text-xs mb-6">We'll confirm your order soon.</p>
      <div className="w-full space-y-2 text-left">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex gap-3 bg-white border border-gray-100 rounded-2xl p-3 items-center shadow-sm">
            <VeggieImage imgKey={product.imgKey} name={product.en} className="w-14 h-14 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm truncate">{product.mr}</div>
              <div className="text-xs text-gray-500 truncate">{product.en}</div>
              <div className="text-xs text-gray-400">{qtyLabel(product.type, qty)}</div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">₹{savingFor(product, qty)}</span>
          </div>
        ))}
      </div>
      <div className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mt-4">
        <div className="text-sm text-gray-700">Total Minimum Estimated Saving</div>
        <div className="text-2xl font-extrabold text-emerald-700">₹{totalSaving}</div>
        <div className="text-xs text-gray-500 mt-1">Weekly service/delivery fee: {DELIVERY_FEE_TEXT}</div>
      </div>
      <button onClick={() => { clearCart(); setScreen("home"); }} className="w-full mt-6 py-3 rounded-full border border-emerald-200 text-emerald-800 font-semibold text-sm">
        होम वर परत जा
      </button>
    </div>
  );
}

function ProfileScreen({ details, setScreen }) {
  return (
    <div className="px-4 pb-10">
      <div className="pt-5 pb-2 flex items-center gap-3" style={{ backgroundColor: CREAM }}>
        <button onClick={() => setScreen("home")}><ArrowLeft size={20} /></button>
        <div className="font-extrabold text-lg" style={{ color: GREEN }}>ग्राहक माहिती</div>
      </div>
      {details.name ? (
        <div className="pt-4 space-y-3">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-2 text-sm">
            <div><span className="text-gray-400">Name: </span>{details.name}</div>
            <div><span className="text-gray-400">Mobile: </span>{details.mobile}</div>
            <div><span className="text-gray-400">Address: </span>{details.address}</div>
            {details.society && <div><span className="text-gray-400">Society: </span>{details.society}</div>}
            {details.flat && <div><span className="text-gray-400">Flat: </span>{details.flat}</div>}
            {details.landmark && <div><span className="text-gray-400">Landmark: </span>{details.landmark}</div>}
          </div>
          <button onClick={() => setScreen("details")} className="w-full py-2.5 rounded-full border border-emerald-200 text-emerald-800 font-semibold text-sm">
            माहिती बदला
          </button>
        </div>
      ) : (
        <div className="pt-10 text-center text-gray-400 text-sm">
          अजून माहिती जतन केलेली नाही.
          <button onClick={() => setScreen("details")} className="block mx-auto mt-4 px-6 py-2.5 rounded-full text-white font-semibold text-sm shadow-sm" style={{ backgroundColor: GREEN }}>
            माहिती भरा
          </button>
        </div>
      )}
    </div>
  );
}

function AdminLoginScreen({ setScreen, setIsAdmin }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div className="px-4 pt-16 flex flex-col items-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4"><Lock size={22} className="text-gray-500" /></div>
      <h2 className="font-bold text-lg mb-1">Admin Login</h2>
      <p className="text-gray-400 text-xs mb-6">MH24 Basket Admin Panel</p>
      <input
        type="password"
        value={pass}
        onChange={(e) => { setPass(e.target.value); setErr(false); }}
        placeholder="Password"
        className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none mb-2"
      />
      {err && <p className="text-red-500 text-xs mb-2">Incorrect password</p>}
      <button
        onClick={() => { if (pass === ADMIN_PASSWORD) { setIsAdmin(true); setScreen("admin"); } else setErr(true); }}
        className="w-full py-3 rounded-full text-white font-bold text-sm mt-2 shadow-sm"
        style={{ backgroundColor: GREEN }}
      >
        Login
      </button>
      <button onClick={() => setScreen("home")} className="mt-4 text-sm text-gray-400">Cancel</button>
      <p className="text-[11px] text-gray-300 mt-6">Demo password: mh24admin</p>
    </div>
  );
}

function AdminScreen({ products, setProducts, setScreen, setIsAdmin }) {
  const toggleStock = (id) => setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)));
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? products : products.filter((p) => p.cat === filter);
  return (
    <div className="px-4 pb-10">
      <div className="pt-5 pb-2 flex items-center justify-between" style={{ backgroundColor: CREAM }}>
        <div className="flex items-center gap-3">
          <button onClick={() => { setIsAdmin(false); setScreen("home"); }}><ArrowLeft size={20} /></button>
          <div className="font-extrabold text-lg flex items-center gap-1.5" style={{ color: GREEN }}><Settings size={18} /> Admin Panel</div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2 mb-3">प्रत्येक product In Stock / Out of Stock करा.</p>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${filter === "all" ? "text-white" : "bg-gray-100 text-gray-600"}`}
          style={filter === "all" ? { backgroundColor: GREEN } : {}}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${filter === c.id ? "text-white" : "bg-gray-100 text-gray-600"}`}
            style={filter === c.id ? { backgroundColor: GREEN } : {}}
          >
            {c.mr}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {list.map((p) => (
          <div key={p.id} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-2.5 shadow-sm">
            <VeggieImage imgKey={p.imgKey} name={p.en} className="w-12 h-12 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate">{p.mr} <span className="text-gray-400 font-normal">/ {p.en}</span></div>
              <div className="text-[11px] text-gray-400">{p.type} • Save ₹{p.savingUnit}/unit</div>
            </div>
            <button
              onClick={() => toggleStock(p.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 ${p.inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}
            >
              {p.inStock ? "In Stock" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   ROOT APP
   ========================================================= */
export default function MH24BasketApp() {
  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState("daily");
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState({});
  const [pendingQty, setPendingQty] = useState({});
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [details, setDetails] = useState(loadDetails());

  const cartCount = Object.keys(cart).length;

  const addToCart = (id) => {
    const product = products.find((p) => p.id === id);
    const qty = pendingQty[id] ?? minFor(product.type);
    setCart((prev) => ({ ...prev, [id]: { qty } }));
  };
  const removeFromCart = (id) => setCart((prev) => { const next = { ...prev }; delete next[id]; return next; });
  const clearCart = () => setCart({});
  const setQty = (id, qty) => {
    setPendingQty((prev) => ({ ...prev, [id]: qty }));
    setCart((prev) => (prev[id] ? { ...prev, [id]: { qty } } : prev));
  };
  const updateDetails = (newDetails) => {
    setDetails(newDetails);
    saveDetails(newDetails);
  };

  let content;
  if (screen === "home") {
    content = <HomeScreen setScreen={setScreen} setCategory={setCategory} search={search} setSearch={setSearch} />;
  } else if (["daily", "leafy", "seasonal", "piece"].includes(screen)) {
    content = <CategoryScreen categoryId={screen} products={products} cart={cart} updateQty={setQty} addToCart={addToCart} setScreen={setScreen} />;
  } else if (screen === "category") {
    content = <CategoryScreen categoryId={category} products={products} cart={cart} updateQty={setQty} addToCart={addToCart} setScreen={setScreen} />;
  } else if (screen === "search") {
    content = <SearchScreen products={products} cart={cart} updateQty={setQty} addToCart={addToCart} setScreen={setScreen} />;
  } else if (screen === "basket") {
    content = <BasketScreen cart={cart} products={products} updateQty={setQty} removeFromCart={removeFromCart} setScreen={setScreen} details={details} markOrdered={() => {}} />;
  } else if (screen === "details") {
    content = <DetailsScreen details={details} setDetails={updateDetails} setScreen={setScreen} />;
  } else if (screen === "confirm") {
    content = <ConfirmScreen cart={cart} products={products} details={details} setScreen={setScreen} markOrdered={() => {}} />;
  } else if (screen === "success") {
    content = <SuccessScreen cart={cart} products={products} setScreen={setScreen} clearCart={clearCart} />;
  } else if (screen === "profile") {
    content = <ProfileScreen details={details} setScreen={setScreen} />;
  } else if (screen === "admin-login") {
    content = <AdminLoginScreen setScreen={setScreen} setIsAdmin={setIsAdmin} />;
  } else if (screen === "admin") {
    content = isAdmin
      ? <AdminScreen products={products} setProducts={setProducts} setScreen={setScreen} setIsAdmin={setIsAdmin} />
      : <AdminLoginScreen setScreen={setScreen} setIsAdmin={setIsAdmin} />;
  }

  const showNav = ["home", "daily", "leafy", "seasonal", "piece", "category", "basket"].includes(screen);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white relative">
      {content}
      {showNav && <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} />}
    </div>
  );
}
