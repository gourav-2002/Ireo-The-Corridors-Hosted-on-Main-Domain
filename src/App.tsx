/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  ClipboardCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Menu, 
  X, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Building,
  ShieldCheck,
  ParkingCircle,
  Droplets,
  Zap,
  Leaf,
  Utensils,
  Coffee,
  GlassWater,
  Trophy,
  Dumbbell,
  PartyPopper,
  Search,
  Home,
  Car,
  Maximize,
  Trees,
   Bed,
  Sofa,
  ChefHat,
  Bath,
  Snowflake,
  DoorOpen,
  Square,
  Fence,
  School,
  HeartPulse,
  ShoppingBag,
  Briefcase,
  Hotel,
  FileText,
  Download,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Updated Menu According To Your Sections
  const navLinks = [
    { name: "Floor Plans", href: "#floorplans" },
    { name: "Pricing", href: "#pricing" },
    { name: "Specifications", href: "#specifications" },
    { name: "Location", href: "#location" },
    { name: "Legal Compliance", href: "#legalcompliance" },
    { name: "Amenities", href: "#amenities" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-white/90 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

        {/* ✅ LOGO IMAGE */}
        <a href="#home">
          <img
            src="/ireo-logo.png"   // <-- Apna logo yaha daal dena
            alt="Logo"
            className="h-16 w-auto"
          />
        </a>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#333333] hover:text-gold font-medium transition-colors text-[15px] uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* ✅ Right Side Buttons */}
        <div className="hidden md:flex items-center gap-4">

          {/* Call Button */}
          <a
            href="tel:+919899888015"
            className="flex items-center gap-2 border border-gold text-gold px-5 py-2.5 rounded-sm font-medium hover:bg-gold hover:text-white transition-all"
          >
            <Phone size={18} />
            +91 98998 88015
          </a>

          {/* Schedule Button */}
          <a
  href="#contact"
  className="gold-gradient text-white px-6 py-2.5 rounded-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-gold/20 inline-block"
>
  Schedule a Visit
</a>
        </div>

        {/* ✅ Mobile Toggle */}
        <button
          className="md:hidden text-navy"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-navy"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-6 items-center">

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-serif text-navy hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}

              {/* Call Button Mobile */}
              <a
                href="tel:+919899888015"
                className="flex items-center gap-2 border border-gold text-gold px-6 py-3 rounded-sm font-medium w-full justify-center"
              >
                <Phone size={18} />
                +91 98998 88015
              </a>

              <a
  href="#contact"
  className="gold-gradient text-white px-8 py-4 rounded-sm font-medium hover:opacity-90 hover:text-navy transition-all inline-block"
>
  Schedule Consultation
</a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [openModal, setOpenModal] = useState(false);
  const [heroForm, setHeroForm] = useState({ name: '', phone: '', email: '' });
  const [heroStatus, setHeroStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [heroError, setHeroError] = useState('');

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHeroError('');

    if (!heroForm.name.trim() || !heroForm.phone.trim() || !heroForm.email.trim()) {
      setHeroError('Please fill in all fields.');
      return;
    }

    setHeroStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: heroForm.name, phone: heroForm.phone, email: heroForm.email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setHeroStatus('success');
        setHeroForm({ name: '', phone: '', email: '' });
      } else {
        setHeroStatus('error');
        setHeroError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setHeroStatus('error');
      setHeroError('Network error. Please try again.');
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-banner-2.jpg"
          alt="Luxury Property"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 navy-gradient-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold font-medium tracking-[0.3em] text-sm mb-4 block">SECTOR 67A • GOLF COURSE EXTENSION ROAD</span>
          <h1 className="text-4xl md:text-6xl text-white leading-tight mb-6">
          Ireo The Corridors<br />
            <span className="italic font-accent text-4xl md:text-5xl leading-none">Ready-to-Move Residences on Golf Course Extension Road</span>

          </h1>
          <p className="text-light-grey/80 text-xl mb-10 max-w-lg leading-relaxed">
            37.5 acres of planned living with a 2-acre operational clubhouse, low-density layout, and one of the most established residential addresses in Sector 67A.
          </p>
          <div className="flex flex-wrap gap-4">

            <a
  href="#contact"
  className="gold-gradient text-white px-8 py-4 rounded-sm font-medium hover:opacity-90 hover:text-navy transition-all inline-block"
>
  Schedule Consultation
</a>

            <button
          onClick={() => setOpenModal(true)}
          className="bg-[#132342] text-white px-8 py-4 rounded-sm font-medium flex items-center gap-2"
        >
          Download Brochure <Download size={18} />
        </button>

        <BrochureModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />






          </div>
        </motion.div>

        {/* Right Content - Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="hidden md:block"
        >
          <div className="glass-card p-8 rounded-2xl shadow-2xl border border-white/20 max-w-md ml-auto">

            {heroStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} className="text-green-600" />
                </div>
                <h3 className="text-2xl text-navy mb-2">Enquiry Submitted!</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Thank you! Our advisor will reach out to you shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl text-navy mb-2">Get in Touch</h3>
                <p className="text-muted mb-8">Share your requirements. Expect a prompt response.</p>

                <form className="space-y-4" onSubmit={handleHeroSubmit} noValidate>
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={heroForm.name}
                      onChange={handleHeroChange}
                      className="w-full bg-light-grey border-none p-3 rounded-md focus:ring-2 focus:ring-gold outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={heroForm.phone}
                      onChange={handleHeroChange}
                      className="w-full bg-light-grey border-none p-3 rounded-md focus:ring-2 focus:ring-gold outline-none"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={heroForm.email}
                      onChange={handleHeroChange}
                      className="w-full bg-light-grey border-none p-3 rounded-md focus:ring-2 focus:ring-gold outline-none"
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  {heroError && (
                    <p className="text-red-500 text-sm text-center">{heroError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={heroStatus === 'submitting'}
                    className="w-full gold-gradient text-white py-4 rounded-md font-bold text-lg mt-4 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {heroStatus === 'submitting' ? 'Sending…' : 'Get Started'}
                  </button>
                </form>
              </>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
};


const Projecthightlight = () => {
  const highlights = [
    {
      icon: <MapPin size={60} />,
      title: "1. Unbeatable Location — Heart of a Glorious City",
      desc: "Positioned at Sector 67A, Golf Course Extension Road — the most sought-after residential corridor in Gurugram. Schools, hospitals, malls, and cinemas are all within 0–500 metres of the project gate. Grand Hyatt is your neighbour."
    },
    {
      icon: <Trees size={60} />,
      title: "2. 37.5 Acres of Planned Living",
      desc: "One of the largest residential land parcels on Golf Course Extension Road, thoughtfully designed for low density and maximum green cover. You get space others can only promise."
    },
    {
      icon: <Building size={60} />,
      title: "3. 2-Acre Club — Gurugram's Finest",
      desc: "The state-of-the-art clubhouse spread over 2 acres is the largest on the entire Golf Course Extension Road stretch. From a restaurant and bar to multi-purpose sports courts, the club is a destination in itself."
    },
    {
      icon: <Maximize size={60} />,
      title: "4. Highest Carpet Area Efficiency",
      desc: "Every square foot is usable. The Corridors delivers the highest carpet area efficiency among comparable new launches — meaning you get more home for every rupee spent."
    },
    {
      icon: <Home size={60} />,
      title: "5. Loaded Apartments — Move In Ready",
      desc: "Unlike under-construction projects, every apartment at The Corridors is delivered with Hot & Cold AC, laminated wooden flooring in all bedrooms, complete sanitary fittings, and a modern modular kitchen. No additional investment needed at possession."
    },
    {
      icon: <Leaf size={60} />,
      title: "6. Lowest Density — More Privacy, More Green",
      desc: "Fewer units per acre. More breathing room. The Corridors maintains the lowest residential density among new launches on this corridor, preserving the exclusivity and serenity of the community."
    }
  ];

  return (
    <section className="relative py-32 bg-[#f5f4f0] text-[#1c2d37] overflow-hidden">

      {/* Subtle Golden Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Section Heading */}
        <div className="text-center mb-24">
          <span className="text-yellow-500 tracking-[0.4em] text-xs uppercase block mb-6">
            PROJECT HIGHLIGHTS
          </span>
          <h2 className="text-5xl md:text-6xl font-serif">
            Why Ireo The Corridors Stands Apart
          </h2>
          <div className="w-24 h-[2px] bg-yellow-500 mx-auto mt-8"></div>
        </div>

        {/* Highlights */}
        <div className="space-y-28">

          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              
              {/* Icon Side */}
              <div className="flex justify-center md:w-1/3">
                <div className="p-8 border border-yellow-500/30 rounded-2xl bg-white backdrop-blur-md text-yellow-500 hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] transition-all duration-500">
                  {item.icon}
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-2/3">
                <h3 className="text-2xl md:text-3xl text-yellow-500 mb-6">
                  {item.title}
                </h3>
                <p className="text-[#1c2d37]/70 leading-relaxed text-lg">
                  {item.desc}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};


const UnitConfigurations = () => {

  const units = [
    {
      title: "2 BHK — 1,296 sq.ft",
      price: "Starting Price: ₹1.35 Cr | BSP: ₹19,000/sq.ft",
      image: "/layout-1.jpg",
      details: [
        "Master Bedroom — 3,365 × 4,965 mm (approx. 11' × 16'3\")",
        "Bedroom — 3,065 × 3,685 mm (approx. 10' × 12'1\")",
        "Living-Dining — 3,650 × 5,455 mm (approx. 12' × 17'11\")",
        "Modern Modular Kitchen — 2,265 × 3,115 mm (approx. 7'5\" × 10'2\")",
        "Master Bathroom — 2,412 × 1,808 mm",
        "Common Bathroom — 2,110 × 1,808 mm",
        "Store Room / Multi-Purpose Area — 1,315 × 1,275 mm",
        "Balcony — 4,480 × 1,800 mm (approx. 14'8\" × 5'11\")",
        "Service Balcony — 1,500 × 1,800 mm",
        "Foyer — 2,265 × 1,690 mm",
        "Passage Width — 1,200 mm"
      ]
    },

    {
      title: "2 BHK + Study — 1,484 sq.ft",
      price: "Starting Price: ₹1.55 Cr | BSP: ₹19,000/sq.ft",
      image: "/layout-2.jpg",
      details: [
        "Master Bedroom — 3,365 × 4,965 mm (approx. 11' × 16'3\")",
        "Bedroom — 3,065 × 3,685 mm (approx. 10' × 12'1\")",
        "Dedicated Study Room — 2,710 × 3,065 mm (approx. 8'11\" × 10'1\")",
        "Living-Dining — 3,535 × 6,000 mm (approx. 11'7\" × 19'8\")",
        "Modern Modular Kitchen — 2,265 × 3,115 mm",
        "Master Bathroom — 2,412 × 1,808 mm",
        "Common Bathroom — 2,110 × 1,808 mm",
        "Store Room — 1,315 × 1,275 mm",
        "Balcony — 4,760 × 1,800 mm (approx. 15'7\" × 5'11\")",
        "Service Balcony — 1,500 × 2,150 mm",
        "Foyer — 2,395 × 2,200 mm",
        "Passage Width — 1,200 mm"
      ]
    },

    {
      title: "3 BHK — 1,727 sq.ft",
      price: "Starting Price: ₹1.80 Cr | BSP: ₹19,000/sq.ft",
      image: "/layout-3.jpg",
      details: [
        "Master Bedroom — 3,365 × 4,985 mm (approx. 11' × 16'4\")",
        "Bedroom 2 — 3,065 × 3,685 mm (approx. 10' × 12'1\")",
        "Bedroom 3 — 3,057 × 3,750 mm (approx. 10' × 12'4\")",
        "Dressing Area — 1,588 × 1,238 mm",
        "Living-Dining — 3,650 × 6,430 mm (approx. 12' × 21'1\")",
        "Modern Modular Kitchen — 2,780 × 4,310 mm (approx. 9'1\" × 14'2\")",
        "Master Bathroom — 2,412 × 1,808 mm",
        "Common Bathroom 1 — 2,110 × 1,808 mm",
        "Common Bathroom 2 — 1,588 × 2,412 mm",
        "Store Room — 1,315 × 1,275 mm",
        "Main Balcony — 4,730 × 1,800 mm (approx. 15'6\" × 5'11\")",
        "Second Balcony — 1,485 × 2,265 mm",
        "Foyer — 2,730 × 1,400 mm",
        "Passage Width — 1,200 mm"
      ]
    },

    {
      title: "3 BHK + Servant — 1,893 sq.ft",
      price: "Starting Price: ₹2.10 Cr onwards | BSP: ₹19,000/sq.ft",
      image: "/layout-4.jpg",
      details: [
        "Master Bedroom — 3,365 × 4,985 mm (approx. 11' × 16'4\")",
        "Bedroom 2 — 3,065 × 3,685 mm (approx. 10' × 12'1\")",
        "Bedroom 3 — 3,042 × 3,765 mm (approx. 10' × 12'4\")",
        "Dressing Area — 1,588 × 1,253 mm",
        "Living-Dining — 3,900 × 6,065 mm (approx. 12'10\" × 19'11\")",
        "Modern Modular Kitchen — 2,770 × 3,095 mm",
        "Master Bathroom — 2,412 × 1,808 mm",
        "Common Bathroom — 2,110 × 1,808 mm",
        "Third Bathroom — 1,588 × 2,412 mm",
        "Servant Room — 2,265 × 4,650 mm (approx. 7'5\" × 15'3\")",
        "Servant Bathroom — 1,820 × 1,212 mm",
        "Store Room — 1,315 × 1,275 mm",
        "Large Balcony — 6,365 × 1,800 mm (approx. 20'10\" × 5'11\")",
        "Service Balcony — 2,100 × 1,800 mm",
        "Foyer — 2,355 × 1,600 mm",
        "Passage Width — 1,200 mm"
      ]
    }
  ];

  return (
    <section id = "floorplans" className="py-32 bg-[#0f1c2e] text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-24">
          <span className="text-yellow-500 tracking-[0.4em] text-xs uppercase block mb-6">
            AVAILABLE CONFIGURATIONS
          </span>
          <h2 className="text-5xl md:text-6xl font-serif">
            Unit Configurations & Floor Plans
          </h2>
          <div className="w-24 h-[2px] bg-yellow-500 mx-auto mt-8"></div>
        </div>

        <div className="space-y-32">

          {units.map((unit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row gap-16 items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >

              {/* Image */}
              <div className="md:w-1/2">
                <div className="overflow-hidden rounded-2xl border border-yellow-500/20 hover:shadow-[0_0_40px_rgba(234,179,8,0.2)] transition-all duration-500">
                  <img
                    src={unit.image}
                    alt={unit.title}
                    className="w-[600px] h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="md:w-1/2">

                <h3 className="text-3xl text-yellow-500 mb-4">
                  {unit.title}
                </h3>

                <div className="inline-block mb-8 px-6 py-3 border border-yellow-500/40 bg-yellow-500/10 rounded-full text-sm">
                  {unit.price}
                </div>

                <div className="grid grid-cols-1 gap-3 text-white/70 text-sm leading-relaxed">
                  {unit.details.map((detail, i) => (
                    <p key={i}>• {detail}</p>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};


const TransparentPricing = () => {
  const pricingData = [
    {
      config: "2 BHK",
      size: "1296-1300 sq.ft",
      bsp: "₹19,000/sq.ft",
      price: "₹2.46 Cr – ₹2.47 Cr"
    },
    {
      config: "2 BHK + Study",
      size: "1484-1594 sq.ft",
      bsp: "₹19,000/sq.ft",
      price: "₹2.81 Cr – ₹3.02 Cr"
    },
    {
      config: "3 BHK",
      size: "1,727 sq.ft",
      bsp: "₹19,000/sq.ft",
      price: "₹3.28 Cr"
    },
    {
      config: "3 BHK + Servant",
      size: "1893-2650 sq.ft",
      bsp: "₹19,000/sq.ft",
      price: "₹3.59 Cr – ₹5.03 Cr"
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-white text-[#0f1c2e]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-yellow-500 tracking-[0.4em] text-xs uppercase block mb-6">
            PRICING OVERVIEW
          </span>
          <h2 className="text-5xl md:text-6xl font-serif">
            Transparent Pricing
          </h2>
          <div className="w-24 h-[2px] bg-yellow-500 mx-auto mt-8"></div>
        </div>

        {/* Disclaimer Box */}
        <div className="max-w-4xl mx-auto text-center mb-20 text-lg leading-relaxed text-[#0f1c2e]/80">
          <p>
            Prices are indicative based on current market rates. Contact Do Bigha Zamin for confirmed builder pricing and available inventory.
            Premium charges apply for park-facing and corner units. Stamp Duty & Registration charges extra.
          </p>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-[#0f1c2e]/10 shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-4 bg-[#0f1c2e] text-white font-semibold text-sm uppercase tracking-wide">
            <div className="p-6">Configuration</div>
            <div className="p-6">Size</div>
            <div className="p-6 bg-yellow-500 text-black">BSP Rate</div>
            <div className="p-6">Indicative Price</div>
          </div>

          {pricingData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 border-t border-[#0f1c2e]/10 hover:bg-yellow-50 transition-all"
            >
              <div className="p-6 font-medium">{item.config}</div>
              <div className="p-6">{item.size}</div>
              <div className="p-6 font-semibold text-yellow-600">
                {item.bsp}
              </div>
              <div className="p-6 font-medium">{item.price}</div>
            </div>
          ))}
        </motion.div>

        {/* Payment Options */}
        <div className="mt-24 grid md:grid-cols-2 gap-16">

          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Payment Options
            </h3>
            <ul className="space-y-4 text-lg text-[#0f1c2e]/80">
              <li>• Home loan assistance available through leading banks (SBI, HDFC, ICICI, Axis, and more)</li>
              <li>• Both resale and direct builder units available</li>
              <li>• Flexible payment plans — contact us for current offers</li>
            </ul>
          </div>

          <div className="flex items-center justify-center">
  <div className="p-10 bg-[#0f1c2e] text-white rounded-2xl shadow-lg text-center">
    
    <h4 className="text-2xl mb-4 text-yellow-500">
      Best-Negotiated Pricing
    </h4>

    <p className="mb-6">
      Contact Do Bigha Zamin for exclusive pricing assistance.
    </p>

    <a
      href="#contact"
      className="inline-block px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all"
    >
      Enquire Now →
    </a>

  </div>
</div>

        </div>

      </div>
    </section>
  );
};

const ClubSection = () => {
  return (
    <section className="pt-12 pb-16 bg-white text-[#0f1c2e]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-yellow-500 tracking-[0.4em] text-xs uppercase block mb-6">
            LUXURY LIFESTYLE
          </span>
          <h2 className="text-5xl md:text-6xl font-serif">
            The Club — A 2-Acre World of Its Own
          </h2>
          <div className="w-24 h-[2px] bg-yellow-500 mx-auto mt-8"></div>
        </div>

        {/* Main Layout */}
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT IMAGE SIDE */}
          <div className="relative">

            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#0f1c2e]/10">
              <img
                src="/Dining-Social.jpg"
                alt="The Corridors Club"
                className="w-full object-cover"
              />
            </div>

            {/* Floating Image */}
            <div className="hidden md:block absolute -bottom-12 -right-12 w-2/3 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/sports-fitness.jpg"
                alt="Club Interior"
                className="w-full object-cover"
              />
            </div>

          </div>

          {/* RIGHT CONTENT SIDE */}
          <div>

            <p className="text-lg leading-relaxed text-[#0f1c2e]/80 mb-12">
              The Corridors Club is the crown jewel of this project. Spread over 2 acres, it is the largest club on Golf Course Extension Road — featuring spaces that rival a five-star hotel.
            </p>

            {/* DINING */}
            <div className="mb-10">
              <h3 className="text-2xl text-yellow-600 mb-4">
                Dining & Social
              </h3>
              <ul className="space-y-3 text-[#0f1c2e]/80">
                <li>• Club Restaurant — Fine dining with al fresco terrace seating and arched interiors</li>
                <li>• Club Bar — Intimate, vintage-themed bar with chandelier and curated spirits</li>
                <li>• Deli Area — Casual café-style deli with artisanal coffee bar and social seating</li>
                <li>• Arrival Lobby — Grand, hotel-like arrival experience with floor-to-ceiling glazing and curated greenery</li>
              </ul>
            </div>

            {/* SPORTS */}
            <div className="mb-10">
              <h3 className="text-2xl text-yellow-600 mb-4">
                Sports & Fitness
              </h3>
              <ul className="space-y-3 text-[#0f1c2e]/80">
                <li>• Multi-Purpose Indoor Sports Courts — Badminton and squash courts with professional locker rooms, numbered lockers, and dedicated changing areas</li>
                <li>• Gymnasium — Fully equipped, glass-fronted fitness centre visible from the club exterior (confirmed from brochure night facade render)</li>
              </ul>
            </div>

            {/* COMMON */}
            <div>
              <h3 className="text-2xl text-yellow-600 mb-4">
                Common Facilities
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#0f1c2e]/80">
                <li>• Swimming Pool</li>
                <li>• Banquet / Party Hall</li>
                <li>• Kids' Play Area</li>
                <li>• Landscaped Gardens</li>
                <li>• 24/7 Security & CCTV Surveillance</li>
                <li>• Power Backup</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

const ApartmentSpecifications = () => {
  const specs = [
    {
      icon: <Bed size={32} className="text-yellow-600" />,
      title: "Flooring — Bedrooms",
      desc: "Laminated Wooden Flooring"
    },
    {
      icon: <Sofa size={32} className="text-yellow-600" />,
      title: "Flooring — Living/Dining",
      desc: "Premium Vitrified Tiles"
    },
    {
      icon: <ChefHat size={32} className="text-yellow-600" />,
      title: "Kitchen",
      desc: "Modern Modular Kitchen with Fittings"
    },
    {
      icon: <Bath size={32} className="text-yellow-600" />,
      title: "Bathrooms",
      desc: "Complete Sanitary Fittings (Premium Brand)"
    },
    {
      icon: <Snowflake size={32} className="text-yellow-600" />,
      title: "Air Conditioning",
      desc: "Hot & Cold AC in all Rooms (Split/Cassette Units)"
    },
    {
      icon: <Zap size={32} className="text-yellow-600" />,
      title: "Electrical",
      desc: "Concealed Copper Wiring with MCB Distribution Board"
    },
    {
      icon: <Square size={32} className="text-yellow-600" />,
      title: "Windows",
      desc: "Powder-Coated Aluminium Sliding Windows"
    },
    {
      icon: <DoorOpen size={32} className="text-yellow-600" />,
      title: "Main Door",
      desc: "Solid Wood Frame with Premium Hardware"
    },
    {
      icon: <Square size={32} className="text-yellow-600" />,
      title: "Passage",
      desc: "1,200 mm Wide (Wheelchair/Furniture Friendly)"
    },
    {
      icon: <Fence size={32} className="text-yellow-600" />,
      title: "Balcony Railing",
      desc: "MS Powder-Coated Railing"
    }
  ];

  return (
    <section id = "specifications" className="py-32 bg-white text-[#0f1c2e]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-yellow-600 tracking-[0.4em] text-xs uppercase block mb-6">
            DELIVERY SPECIFICATIONS
          </span>
          <h2 className="text-5xl md:text-6xl font-serif">
            Apartment Specifications & Interior Finishes
          </h2>
          <div className="w-24 h-[2px] bg-yellow-500 mx-auto mt-8"></div>
        </div>

        {/* Subheading */}
        <p className="text-center text-lg text-[#0f1c2e]/70 mb-20 max-w-3xl mx-auto">
          Standard Delivery Specifications (Included in Base Price)
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {specs.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#0f1c2e]/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300 border-t-4 border-yellow-500"
            >
              <div className="mb-6">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-[#0f1c2e]/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};


const LocationConnectivity = () => {

  const sections = [
    {
      icon: <School size={28} className="text-yellow-600" />,
      title: "Schools (Nearest First)",
      items: [
        "DPS Sec 67A — ~0.050 KM",
        "Beacon School — ~0.4 KM",
        "St. Xavier's School, Sec 49 — ~3 KM",
        "Shalom Presidency — ~6.5 KM",
        "G.D. Goenka — ~7.7 KM",
        "Shiv Nadar School — ~14 KM"
      ]
    },
    {
      icon: <HeartPulse size={28} className="text-yellow-600" />,
      title: "Hospitals",
      items: [
        "Marengo Asia — ~6.3 KM",
        "Artemis Hospital — ~7.5 KM",
        "Medanta The Medicity — ~11 KM",
        "Fortis Hospital — ~11 KM",
        "Paras Hospitals — ~12 KM"
      ]
    },
    {
      icon: <ShoppingBag size={28} className="text-yellow-600" />,
      title: "Commercial & Retail",
      items: [
        "AIPL Joy Street — ~1.9 KM",
        "Worldmark — ~2.1 KM",
        "AIPL Joy Central — ~2.4 KM",
        "Airia Mall — ~3.41 KM",
        "Ambience Mall — ~18 KM"
      ]
    },
    {
      icon: <Briefcase size={28} className="text-yellow-600" />,
      title: "Office Hubs",
      items: [
        "Lankmark Cybermark — ~1.8 KM",
        "Worldmark Offices — ~1.8 KM",
        "AIPL Offices — ~2.3 KM",
        "Grand View Tower — ~5.4 KM",
        "DLF Cyber City / Horizon Center — ~10 KM"
      ]
    },
    {
      icon: <Hotel size={28} className="text-yellow-600" />,
      title: "Hotels",
      items: [
        "Hilton — ~2.3 KM",
        "Radisson Sohna — ~5 KM",
        "Grand Hyatt — ~5.1 KM",
        "Double Tree Hilton — ~6.4 KM",
        "Le Meridien — ~15 KM"
      ]
    }
  ];

  return (
    <section id = "location" className="py-32 bg-white text-[#0f1c2e]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-yellow-600 tracking-[0.4em] text-xs uppercase block mb-6">
            PRIME LOCATION
          </span>
          <h2 className="text-5xl md:text-6xl font-serif">
            Location & Connectivity
          </h2>
          <div className="w-24 h-[2px] bg-yellow-500 mx-auto mt-8"></div>
          <p className="mt-8 text-lg text-[#0f1c2e]/70">
            Sector 67A, Golf Course Extension Road — Heart of a Glorious City
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* RIGHT CATEGORY CARDS */}
          <div className="space-y-10">

            {sections.map((section, index) => (
              <div
                key={index}
                className="border border-[#0f1c2e]/10 rounded-2xl p-8 shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  {section.icon}
                  <h3 className="text-xl font-semibold">
                    {section.title}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-sm text-[#0f1c2e]/75">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-yellow-50 px-4 py-2 rounded-lg"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>

          {/* LEFT MAP IMAGE */}
          <div className="space-y-8">

  {/* Image 1 */}
  <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#0f1c2e]/10">
    <img
      src="/connectivity-1.jpg"
      alt="Sector 67A Location Map"
      className="w-full object-cover"
    />
  </div>

  {/* Image 2 */}
  <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#0f1c2e]/10">
    <img
      src="/connectivity-2.jpg"
      alt="Golf Course Extension Connectivity"
      className="w-full object-cover"
    />
  </div>

</div>

          

          

        </div>

      </div>
    </section>
  );
};

const AboutIreo = () => {
  const projects = [
    {
      name: "Grand Arch",
      launch: "October 2009",
      plot: "~21 Acres",
      architect: "Sorg Architect, Washington DC",
      image: "/grand-arch.jpg"
    },
    {
      name: "Skyon",
      launch: "December 2010",
      plot: "~19 Acres",
      architect: "Sorg Architect, Washington DC",
      image: "/Skyon.jpg"
    },
    {
      name: "Victory Valley",
      launch: "May 2010",
      plot: "~26 Acres",
      architect: "WOW, Singapore",
      image: "/Victory-Valley.jpg"
    },
    {
      name: "Grand Hyatt",
      launch: "February 2014",
      plot: "~30 Acres",
      architect: "Foster + Partners",
      image: "/Grand-Hyatt.jpg"
    },
    {
      name: "Ascott",
      launch: "January 2012",
      plot: "~4 Acres",
      architect: "Interior: Wilson Associates, Singapore",
      image: "/Ascott.jpg"
    },
    {
      name: "Uptown",
      launch: "December 2009",
      plot: "~12 Acres",
      architect: "Sumit Ghosh, Delhi",
      image: "/Uptown.jpg"
    }
  ];

  return (
    <section className="relative py-32 bg-navy text-white overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-yellow-500 tracking-[0.4em] text-xs uppercase block mb-6">
            DEVELOPER PROFILE
          </span>
          <h2 className="text-5xl md:text-6xl font-serif">
            About Ireo — The Developer
          </h2>
          <div className="w-24 h-[2px] bg-yellow-500 mx-auto mt-8"></div>

          <p className="mt-10 text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
            Ireo is one of India's most trusted and celebrated real estate developers, with a proven track record of delivering iconic residential and commercial projects in the NCR. Their portfolio reads like a who's who of landmark Gurugram developments.
          </p>
        </div>

       

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-yellow-500/40 transition duration-300"
            >
              {/* Image */}
              <div className="h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h4 className="text-2xl font-semibold mb-6">
                  {project.name}
                </h4>

                <div className="space-y-3 text-white/70 text-sm">
                  <p><span className="text-white">Launch:</span> {project.launch}</p>
                  <p><span className="text-white">Land Parcel:</span> {project.plot}</p>
                  <p><span className="text-white">Architect:</span> {project.architect}</p>
                </div>

                {/* Gold Line */}
                <div className="mt-6 h-[2px] w-12 bg-yellow-500"></div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

const LegalCompliance = () => {
  const data = [
    {
      title: "RERA Registration — Phase 1",
      value: "H-Rera '378 of 2017 dated 07.12.2017"
    },
    {
      title: "RERA Registration — Phase 2",
      value: "H-Rera '377 of 2017 dated 07.12.2017"
    },
    {
      title: "Regulatory Body",
      value: "HARERA (Haryana Real Estate Regulatory Authority)"
    },
    {
      title: "Project Status",
      value: "HARERA Approved & Ready to Move"
    }
  ];

  return (
    <section id = "legalcompliance" className="py-28 bg-[#f8f9fb] text-[#0f1c2e]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-yellow-500 tracking-[0.4em] text-xs uppercase block mb-6">
            TRUST & COMPLIANCE
          </span>
          <h2 className="text-5xl md:text-6xl font-serif ">
            Legal & RERA Compliance
          </h2>
          <div className="w-24 h-[2px] bg-yellow-500 mx-auto mt-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT TRUST PANEL */}
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-[#0f1c2e]/10">

            <div className="flex items-center gap-6 mb-8">
              <ShieldCheck size={50} className="text-green-600" />
              <h3 className="text-2xl font-semibold">
                100% HARERA Registered
              </h3>
            </div>

            <p className="text-lg text-[#0f1c2e]/70 leading-relaxed">
              Both phases of The Corridors are fully HARERA registered — ensuring complete legal protection for buyers under the RERA Act.
            </p>

          </div>

          {/* RIGHT DETAILS GRID */}
          <div className="grid sm:grid-cols-2 gap-8">

            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md border border-[#0f1c2e]/10 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <FileText size={22} className="text-yellow-600" />
                  <h4 className="font-semibold text-lg">
                    {item.title}
                  </h4>
                </div>

                <p className="text-sm text-[#0f1c2e]/70 leading-relaxed">
                  {item.value}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};


const Amenities = () => {

  const images = [
    { src: "/amenity1.jpg", title: "Club - Restaurant" },
    { src: "/amenity2.jpg", title: "Club - Restaurant" },
    { src: "/amenity3.jpg", title: "CLUB - Multi Purpose Courts" },
    { src: "/amenity4.jpg", title: "CLUB- Bar" },
    { src: "/amenity5.jpg", title: "CLUB - Night Facade" },
    { src: "/amenity6.jpg", title: "CLUB - Night Facade" },
    { src: "/amenity7.jpg", title: "CLUB - Day Facade" },
    { src: "/amenity8.jpg", title: "CLUB - Multi Purpose Courts" },
    { src: "/amenity9.jpg", title: "TOWER - Lobby Entrance" },
    { src: "/amenity10.jpg", title: "TOWER - Lobby Entrance" },
  ];

  const ImageCard = ({ item }) => (
    <div className="relative overflow-hidden rounded-3xl group cursor-pointer">
      
      {/* Image */}
      <img
        src={item.src}
        alt={item.title}
        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Hover Label */}
      <div className="
        absolute bottom-0 left-0
        bg-white px-6 py-3
        rounded-tr-2xl
        translate-y-full
        opacity-0
        group-hover:translate-y-0
        group-hover:opacity-100
        transition-all duration-400 ease-out
        shadow-md
      ">
        <h3 className="text-lg font-semibold text-yellow-600">
          {item.title}
        </h3>
      </div>

    </div>
  );

  return (
    <section id = "amenities" className="py-32 bg-white text-[#0f1c2e]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-yellow-600 tracking-[0.4em] text-xs uppercase block mb-6">
            LIFESTYLE AMENITIES
          </span>
          <h2 className="text-5xl md:text-6xl font-serif">
            World-Class Amenities
          </h2>
          <div className="w-24 h-[2px] bg-yellow-500 mx-auto mt-8"></div>
        </div>

        {/* Top Block */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <ImageCard item={images[0]} />

          <div className="grid grid-cols-2 gap-6">
            {images.slice(1, 5).map((item, i) => (
              <ImageCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Bottom Block */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-6">
            {images.slice(5, 9).map((item, i) => (
              <ImageCard key={i} item={item} />
            ))}
          </div>

          <ImageCard item={images[9]} />
        </div>

      </div>
    </section>
  );
};



const DownloadBrochure = () => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-center">

            <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-xl border border-[#0f1c2e]/10">
              <img
                src="/download-brocher.jpg"
                alt="Project Brochure"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-2">

              <h2 className="text-4xl font-serif text-[#0f1c2e] mb-6">
                Download Project Brochure
              </h2>

              <p className="text-lg text-[#0f1c2e]/70 leading-relaxed mb-10">
                Get complete details including floor plans, specifications,
                amenities, and pricing — all in one document.
              </p>

              <button
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-black font-semibold rounded-xl hover:opacity-90 transition"
              >
                Download Brochure →
              </button>

            </div>
          </div>
        </div>
      </section>

      <BrochureModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};



const HowWeWork = () => {
  const steps = [
    { title: 'Understand Your Vision', desc: 'We listen to your goals, budget, and lifestyle preferences', icon: <Search size={24} /> },
    { title: 'Curate Options', desc: 'We handpick properties that match your exact criteria', icon: <Home size={24} /> },
    { title: 'Site Visit', desc: 'We personally escort you to shortlisted properties', icon: <Car size={24} /> },
    { title: 'Smooth Closure', desc: 'End-to-end support on negotiation, legal, and documentation', icon: <ClipboardCheck size={24} /> },
  ];

  return (
    <section className="py-24 bg-light-grey overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">OUR PROCESS</span>
          <h2 className="text-4xl md:text-5xl text-navy">How We Work</h2>
        </div>

        <div className="relative">
          {/* Dotted Line */}
          <div className="absolute top-12 left-0 w-full h-px border-t-2 border-dashed border-gold/30 hidden lg:block"></div>
          
          <div className="grid lg:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-gold flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gold/10 relative">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="text-gold">{step.icon}</div>
                </div>
                <h4 className="text-xl font-bold text-navy mb-4">{step.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCTA = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', budget: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please fill in your Name, Email, and Phone Number.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', budget: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="py-28 bg-navy relative overflow-hidden text-white">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Ready to Find Your <br /> Perfect Property?
            </h2>

            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Speak with our property advisors for verified pricing, availability, and complete project details. No pressure — just transparent guidance.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-lg">
                <Phone size={20} className="text-yellow-500" />
                <span>+91 98998 88015</span>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <Mail size={20} className="text-yellow-500" />
                <span>explore@corridorsireo.com</span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-white/40 text-sm leading-relaxed border-t border-white/10 pt-6">
              We are an independent channel partner for Ireo The Corridors and not the official developer website.
            </p>

          </div>

          {/* RIGHT FORM */}
          <div className="bg-white text-[#0f1c2e] rounded-3xl p-10 shadow-2xl">

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#0f1c2e] mb-3">Enquiry Submitted!</h3>
                <p className="text-[#0f1c2e]/60 text-sm leading-relaxed mb-6">
                  Thank you! We've received your enquiry and sent a confirmation to your email. Our advisor will reach out within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-yellow-600 underline underline-offset-2 hover:text-yellow-700 transition"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  className="w-full border border-[#0f1c2e]/20 rounded-full px-6 py-4 focus:outline-none focus:border-yellow-500"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  className="w-full border border-[#0f1c2e]/20 rounded-full px-6 py-4 focus:outline-none focus:border-yellow-500"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  className="w-full border border-[#0f1c2e]/20 rounded-full px-6 py-4 focus:outline-none focus:border-yellow-500"
                  required
                />

                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Your Budget (e.g. ₹50L – ₹1 Cr)"
                  className="w-full border border-[#0f1c2e]/20 rounded-full px-6 py-4 focus:outline-none focus:border-yellow-500"
                />

                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message (Optional)"
                  className="w-full border border-[#0f1c2e]/20 rounded-3xl px-6 py-4 focus:outline-none focus:border-yellow-500 resize-none"
                ></textarea>

                {errorMsg && (
                  <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full gold-gradient text-black font-semibold py-4 rounded-full hover:bg-yellow-400 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

const FloatingContact = () => {
  const phoneNumber = "919899888015";

  const whatsappMessage = encodeURIComponent(
  "Hello, I’m interested in Ireo The Corridors, Sector 67A, Golf Course Extension Road. Please share current resale availability, verified pricing, floor plans, and details for a private site visit. Thank you."
);

  return (
    <div className="fixed right-8 bottom-72 z-50 flex flex-col items-center gap-4">

      {/* Call Button */}
      <a
        href="tel:+919899888015"
        className="w-14 h-14 flex items-center justify-center rounded-full bg-gold text-black shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <Phone size={22} strokeWidth={2.5} />
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 flex items-center justify-center rounded-full bg-gold text-black shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <MessageCircle size={22} strokeWidth={2.5} />
      </a>

    </div>
  );
};


const Footer = () => {
  return (
    <footer className="bg-near-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
               <img
    src="/footer-logo.jpg"   // 👈 apni logo image public folder me daal dena
    alt="The Corridors Logo"
    className="h-24 w-auto"
  />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Premium residential project in Sector 67A, Gurgaon, offering luxury apartments and world-class amenities.
            </p>

             <p className="text-white/50 text-sm leading-relaxed">
              We are an independent channel partner for Ireo The Corridors and not the official developer website.
            </p>
            
          </div>

          {/* Col 2 */}
          <div>
  <h5 className="font-serif text-gold text-lg mb-6">Quick Links</h5>

  <ul className="space-y-4 text-sm text-white/60">
    {[
      { name: "Floor Plans", href: "#floorplans" },
      { name: "Pricing", href: "#pricing" },
      { name: "Specifications", href: "#specifications" },
      { name: "Location", href: "#location" },
      { name: "Legal Compliance", href: "#legalcompliance" },
      { name: "Amenities", href: "#amenities" },
      { name: "Contact", href: "#contact" },
    ].map((link) => (
      <li key={link.name}>
        <a
          href={link.href}
          className="hover:text-gold transition-colors"
        >
          {link.name}
        </a>
      </li>
    ))}
  </ul>
</div>  

          {/* Col 3 */}
          <div>
  <h5 className="font-serif text-gold text-lg mb-6">Location</h5>

  <ul className="space-y-4 text-sm text-white/60">
    {[
      "Sector 67A",
      "Golf Course Extension Road",
      "Gurugram (Gurgaon)",
      "State: Haryana",
    ].map((item) => (
      <li key={item}>
        <span className="hover:text-gold transition-colors cursor-default">
          {item}
        </span>
      </li>
    ))}
  </ul>
</div>

          {/* Col 4 */}
          <div>
            <h5 className="font-serif text-gold text-lg mb-6">Contact</h5>
            <div className="space-y-4 text-sm text-white/60">
              <p className="flex items-start gap-3"><Phone size={18} className="text-gold shrink-0" /> +91 98998 88015</p>
              <p className="flex items-start gap-3"><Mail size={18} className="text-gold shrink-0" /> explore@corridorsireo.com</p>
              <p className="flex items-start gap-3"><MapPin size={18} className="text-gold shrink-0" /> Gaurav Mehrotra, Quest Coworks 15th, OCUS Quantum, Sector-51, Gurgaon, India (122003)</p>
              <div className="flex gap-4 pt-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all"><Youtube size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <div className="w-full h-px bg-gold/20 mb-8"></div>
          <p className="text-white/30 text-xs tracking-widest uppercase">
            © 2025 The Corridors. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};



const BrochureModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', email: '' });
    setStatus('idle');
    setErrorMsg('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">

      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white w-[95%] max-w-xl rounded-3xl p-8 shadow-2xl z-10 animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#0f1c2e]/60 hover:text-black"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-serif text-[#0f1c2e] mb-3">Brochure Sent!</h2>
            <p className="text-[#0f1c2e]/60 text-sm leading-relaxed mb-6">
              We've sent the brochure download link to your email. Please check your inbox.
            </p>
            <button
              onClick={handleClose}
              className="text-sm text-yellow-600 underline underline-offset-2 hover:text-yellow-700 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-serif text-[#0f1c2e] mb-4">
              Download Brochure
            </h2>

            <p className="text-[#0f1c2e]/60 mb-8">
              Please share your details to receive the complete project brochure.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#0f1c2e] uppercase mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-gray-100 p-4 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-[#0f1c2e] uppercase mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  className="w-full bg-gray-100 p-4 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#0f1c2e] uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                  className="w-full bg-gray-100 p-4 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {errorMsg && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full gold-gradient text-black font-semibold py-4 rounded-xl hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending…' : 'Get Brochure'}
              </button>

            </form>
          </>
        )}
      </div>
    </div>
  );
};



// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Projecthightlight />
        <UnitConfigurations />
        <TransparentPricing />
        <ClubSection/>  
        <ApartmentSpecifications/>
        <LocationConnectivity />
        <AboutIreo />
        <LegalCompliance/>
        <Amenities />
        <DownloadBrochure />
        <HowWeWork />
        <ContactCTA />
        <FloatingContact />
      </main>
      <Footer />
     
    </div>
  );
}
