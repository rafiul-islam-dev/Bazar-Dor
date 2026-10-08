const tickerItems = [
  {
    emoji: "🍚",
    name: "স্বর্ণমাছি চাল",
    price: "১৪৮ টাকা/কেজি",
    change: "▲ ২.১%",
    type: "up",
  },
  {
    emoji: "🍚",
    name: "মিনিকেট চাল",
    price: "৭৫ টাকা/কেজি",
    change: "▼ ১.২%",
    type: "down",
  },
  {
    emoji: "🫘",
    name: "মসুর ডাল",
    price: "১৩৫ টাকা/কেজি",
    change: "▲ ১.৮%",
    type: "up",
  },
  {
    emoji: "🫙",
    name: "সয়াবিন তেল",
    price: "১৭৮ টাকা/লিটার",
    change: "— ০.০%",
    type: "flat",
  },
  {
    emoji: "🥔",
    name: "আলু",
    price: "৪৫ টাকা/কেজি",
    change: "▼ ২.৪%",
    type: "down",
  },
  {
    emoji: "🧅",
    name: "পেঁয়াজ",
    price: "৬৫ টাকা/কেজি",
    change: "▲ ৩.২%",
    type: "up",
  },
  {
    emoji: "🌶️",
    name: "কাঁচা মরিচ",
    price: "১২০ টাকা/কেজি",
    change: "▲ ৪.১%",
    type: "up",
  },
  {
    emoji: "🥚",
    name: "ডিম",
    price: "১৩০ টাকা/ডজন",
    change: "▼ ০.৮%",
    type: "down",
  },
];

function TickerItem({ item }) {
  const changeClass =
    item.type === "up"
      ? "text-red-500"
      : item.type === "down"
        ? "text-green-600"
        : "text-slate-400";

  return (
    <div className="flex shrink-0 items-center gap-2 border-r border-slate-200 px-5 text-xs">
      <span>{item.emoji}</span>

      <span className="font-medium text-slate-700">
        {item.name}
      </span>

      <span className="text-slate-500">
        {item.price}
      </span>

      <span className={`font-bold ${changeClass}`}>
        {item.change}
      </span>
    </div>
  );
}

export default function PriceTicker() {
  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="ticker-mask">
        <div className="ticker-track py-2">
          {/* First copy */}

          <div className="flex shrink-0">
            {tickerItems.map((item, index) => (
              <TickerItem
                key={`first-${index}`}
                item={item}
              />
            ))}
          </div>

          {/* Second copy */}

          <div className="flex shrink-0">
            {tickerItems.map((item, index) => (
              <TickerItem
                key={`second-${index}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}