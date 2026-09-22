// ==========================================
// FILE: src/components/Gear.jsx
// ==========================================
import React from 'react';

// ---- Replace these with your real gear / links / images ----
// Add or remove items freely — the grid picks them up automatically.
// image: put the file in public/images/gear/ and reference it as '/images/gear/filename.png'
// link: optional — where the item can be bought/viewed (button hidden if omitted)
const gearCategories = [
  {
    category: 'Desk Setup',
    items: [
      {
        name: 'Redragon Fizz RGB Wired Mechanical Gaming Keyboard',
        image: '/images/gear/keyboard.png',
        blurb: 'My daily driver for typing and coding.',
        link: 'https://ecommerce.datablitz.com.ph/collections/all/products/redragon-fizz-rgb-wired-mechanical-gaming-keyboard-black-dust-proof-red-k617-rgb',
      },
      {
        name: 'MAG 255F X24',
        image: '/images/gear/monitor.png',
        blurb: 'Main display for development and design work.',
        link: 'https://www.msi.com/Monitor/MAG-255F-X24',
      },
      {
        name: 'Nitro 5 Intel',
        image: '/images/gear/Laptop.png',
        blurb: 'The machine that powers everything I build.',
        link: 'https://www.acer.com/ph-en/laptops/nitro/nitro-5/pdp/NH.QFHSP.002',
      },
      {
        name: 'Mouse',
        image: '/images/gear/mouse.png',
        blurb: 'Comfortable and precise for long work sessions.',
        link: 'https://shopee.ph/MLOONG-MX301-PRO-Wireless-Gaming-Mouse-PAW3315-Tri-Mode-Ultra-Lightweight-57g-Ergonomic-Design-i.462016051.47760214604?extraParams=%7B%22display_model_id%22%3A262602898169%2C%22model_selection_logic%22%3A3%7D',
      },
      {
        name: 'Laptop And Monitor Stand',
        image: '/images/gear/laptop and stand.png',
        blurb: 'Keeps my setup elevated and ergonomic.',
        link: 'https://shopee.ph/True-Vision-Dual-Counterbalance-Monitor-Stand-and-Laptop-Holder-TV13-C024ENBH2-i.25356896.10586495495?extraParams=%7B%22display_model_id%22%3A142352923295%2C%22model_selection_logic%22%3A3%7D',
      },
      {
        name: 'Redragon Beryl Gaming Monitor Light',
        image: '/images/gear/Light.png',
        blurb: 'Lights up my desk during late-night sessions.',
        link: 'https://ecommerce.datablitz.com.ph/collections/all/products/redragon-beryl-gaming-monitor-light-gml-113',
      },
    ],
  },
  {
    category: 'Everyday Carry',
    items: [
      {
        name: 'Xiaomi 11T',
        image: '/images/gear/Xiaomi 11T.png',
        blurb: 'My main phone — always in my pocket.',
        link: 'https://www.mi.com/global/product/xiaomi-11t/',
      },
      {
        name: 'Iphone 8Plus',
        image: '/images/gear/8plus.png',
        blurb: 'My secondary phone for backup and other tasks.',
        link: 'https://revibe.ph/products/iphone-8-plus?variant=52959649137012',
      },
      {
        name: 'JBL Wave Beam 2 True Wireless Earbuds',
        image: '/images/gear/Airpods.png',
        blurb: 'For calls and music wherever I go.',
        link: 'https://shopee.ph/JBL-Wave-Beam-2-True-wireless-earbuds-Spoyl-Store-i.1146036267.25057908280?extraParams=%7B%22display_model_id%22%3A147511943165%2C%22model_selection_logic%22%3A3%7D',
      },
      {
        name: 'OPK Watch',
        image: '/images/gear/Watch.png',
        blurb: 'Keeps me on time and tracks my day.',
        link: 'https://shopee.ph/OPK-Watch-Man-Original-Waterproof-Silver-Black-Stainless-Steel-Quartz-Dual-Calendar-Luminous-Watches-For-Mens-Non-Tarnish-With-Box-i.82612574.10603475822?extraParams=%7B%22display_model_id%22%3A75389338380%2C%22model_selection_logic%22%3A3%7D',
      },
      {
        name: 'Coffee Mug',
        image: '/images/gear/Tumbler.png',
        blurb: 'Keeps me hydrated throughout the day.',
        link: 'https://shopee.ph/Peliflask-Stainless-Steel-Thermal-Coffee-Mug-With-Coffee-Mug-Wood-Grain-Handle-With-Lid-Straw-15oz-i.1013475336.51309547994?extraParams=%7B%22display_model_id%22%3A365843977203%2C%22model_selection_logic%22%3A3%7D',
      },
    ],
  },
  {
    category: 'Daily Essentials',
    items: [
      {
        name: 'OLD SPICE High Endurance Pure Sport',
        image: '/images/gear/Old Spice.png',
        blurb: 'Keeps me fresh throughout the day.',
        link: 'https://www.watsons.com.ph/old-spice-old-spice-high-endurance-pure-sport-45g/p/BP_10016066',
      },
      {
        name: 'X90',
        image: '/images/gear/Perfume 1.png',
        blurb: 'My go-to scent for everyday wear.',
        link: 'https://bestperfume.store/products/x90?variant=45670034866498&country=PH&currency=PHP&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gad_source=4&gad_campaignid=24252821210&gbraid=0AAAAAooUWbE0K2AKjp1aeGfUMi8EyrSlr&gclid=CjwKCAjwq8PVBhAKEiwA2i3SHbit_aNpkXoYOXLuaaJRJTiUpO9qY4zhPHcm3tchY1EqA9B0wvp-2RoC618QAvD_BwE',
      },
      {
        name: 'Andrea Secret ',
        image: '/images/gear/X90.png',
        blurb: 'My alternate scent for other occasions.',
        link: 'https://shopee.ph/Andrea-Secret-Dual-Charm-Collection-Confident-Blooms-Iron-Legacy-Sexy-Perfume-for-Men-i.1310673883.27562921391?extraParams=%7B%22display_model_id%22%3A256704648533%2C%22model_selection_logic%22%3A3%7D',
      },
    ],
  },
];

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-2">
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 text-[#263BAA] text-xs font-bold uppercase tracking-wider mb-3">
      <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
      What I Use
    </div>
    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#0A1629] tracking-tight leading-tight">
      {title}
    </h1>
    {subtitle && <p className="text-sm sm:text-base text-[#64748B] font-medium mt-1.5">{subtitle}</p>}
  </div>
);

const GearCard = ({ item }) => {
  const Wrapper = item.link ? 'a' : 'div';
  const wrapperProps = item.link
    ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group bg-white rounded-2xl border border-slate-100 p-2.5 flex flex-col gap-2.5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center p-4">
        <img
          src={item.image}
          alt={item.name}
          className="max-w-[95%] max-h-[95%] w-auto h-auto object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#0A1629] group-hover:text-[#263BAA] transition-colors">
          {item.name}
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">{item.blurb}</p>
      </div>
    </Wrapper>
  );
};

const Gear = ({ onNavigate } = {}) => {
  return (
    <>
      <div className="relative w-full">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
        </div>

        <main className="relative z-10 w-full min-h-screen py-12 px-3 sm:px-5 lg:px-8 xl:px-10 flex flex-col">
          <section className="flex-1 bg-white rounded-[32px] main-card-shadow relative flex flex-col shadow-[0_30px_70px_-20px_rgba(15,23,42,0.08),0_10px_30px_-10px_rgba(15,23,42,0.04)]">
            <div className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col gap-10">
              <SectionHeading
                title="Gear"
                subtitle="The hardware and tools I use to build, create, and stay productive — my desk setup, everyday carry, and personal care essentials."
              />

              <div className="flex flex-col gap-9">
                {gearCategories.map((cat) => (
                  <div key={cat.category}>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#263BAA] mb-3">
                      {cat.category}
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-3">
                      {cat.items.map((item) => (
                        <GearCard key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Gear;