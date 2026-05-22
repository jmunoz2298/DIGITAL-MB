import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { DEFAULT_CONFIG, DEFAULT_PRODUCTS, DEFAULT_SERVICES } from './data/defaults';
import { StoreConfig, Product, Service } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Services from './components/Services';
import WhatsAppButton from './components/WhatsAppButton';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { db } from './firebase';
import { doc, setDoc, onSnapshot, collection, updateDoc } from 'firebase/firestore';

export default function App() {
  // State loader with standard local fallback
  const [config, setConfig] = useState<StoreConfig>(() => {
    const saved = localStorage.getItem('nexus_store_config');
    if (saved) {
      const parsed = JSON.parse(saved) as StoreConfig;
      if (parsed.storeName === 'TIENDA MB' || parsed.storeName === 'NEXUS KOZ' || parsed.storeName === 'DIGITAL MB') {
        parsed.storeName = 'Tienda MB DIGITAL';
      }
      return parsed;
    }
    return DEFAULT_CONFIG;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nexus_store_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('nexus_store_services');
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load and subscribe Firestore elements real-time
  useEffect(() => {
    // 1. Config listener
    const configDocRef = doc(db, 'configs', 'store');
    const unsubConfig = onSnapshot(configDocRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as StoreConfig;
        if (data.storeName === 'TIENDA MB' || data.storeName === 'NEXUS KOZ' || data.storeName === 'DIGITAL MB') {
          const updated = { ...data, storeName: 'Tienda MB DIGITAL' };
          setConfig(updated);
          try {
            await setDoc(configDocRef, updated);
            localStorage.setItem('nexus_store_config', JSON.stringify(updated));
          } catch (e) {
            console.warn("Failed to update storeName to Tienda MB DIGITAL in Firestore: ", e);
          }
        } else {
          setConfig(data);
        }
      } else {
        try {
          await setDoc(configDocRef, DEFAULT_CONFIG);
        } catch (e) {
          console.warn("Config bootstrap error: ", e);
        }
      }
    }, (error) => {
      console.warn("Firestore config listener fallback to offline", error);
    });

    // 2. Products listener
    const productsColRef = collection(db, 'products');
    const unsubProducts = onSnapshot(productsColRef, async (snapshot) => {
      if (!snapshot.empty) {
        const prodList: Product[] = [];
        snapshot.forEach(docSnap => {
          prodList.push(docSnap.data() as Product);
        });
        // Sort items naturally
        prodList.sort((a, b) => a.id.localeCompare(b.id));
        setProducts(prodList);
      } else {
        try {
          for (const prod of DEFAULT_PRODUCTS) {
            await setDoc(doc(db, 'products', prod.id), {
              ...prod,
              views: prod.views || 0
            });
          }
        } catch (e) {
          console.warn("Products bootstrap error: ", e);
        }
      }
    }, (error) => {
      console.warn("Firestore products listener fallback to offline", error);
    });

    // 3. Services listener
    const servicesColRef = collection(db, 'services');
    const unsubServices = onSnapshot(servicesColRef, async (snapshot) => {
      if (!snapshot.empty) {
        const srvList: Service[] = [];
        snapshot.forEach(docSnap => {
          srvList.push(docSnap.data() as Service);
        });
        srvList.sort((a, b) => a.id.localeCompare(b.id));
        setServices(srvList);
      } else {
        try {
          for (const srv of DEFAULT_SERVICES) {
            await setDoc(doc(db, 'services', srv.id), srv);
          }
        } catch (e) {
          console.warn("Services bootstrap error: ", e);
        }
      }
    }, (error) => {
      console.warn("Firestore services listener fallback to offline", error);
    });

    return () => {
      unsubConfig();
      unsubProducts();
      unsubServices();
    };
  }, []);

  // Track product views clicks on WhatsApp Comprar button (Firestore Increment)
  const trackProductView = async (productId: string) => {
    try {
      const prodRef = doc(db, 'products', productId);
      const product = products.find(p => p.id === productId);
      if (product) {
        const nextViews = (product.views || 0) + 1;
        await updateDoc(prodRef, { views: nextViews });
      }
    } catch (e) {
      console.warn("Could not write track event to Firestore (Offline Sandbox Mode)", e);
    }
  };

  // Handles updating current values and saving to both Firestore and localstore
  const handleSaveStoreData = async (newConfig: StoreConfig, newProducts: Product[], newServices: Service[]) => {
    setConfig(newConfig);
    setProducts(newProducts);
    setServices(newServices);
    localStorage.setItem('nexus_store_config', JSON.stringify(newConfig));
    localStorage.setItem('nexus_store_products', JSON.stringify(newProducts));
    localStorage.setItem('nexus_store_services', JSON.stringify(newServices));

    // Persist to Firestore
    try {
      await setDoc(doc(db, 'configs', 'store'), newConfig);
      
      // Save all products
      for (const p of newProducts) {
        await setDoc(doc(db, 'products', p.id), p);
      }

      // Save all services
      for (const s of newServices) {
        await setDoc(doc(db, 'services', s.id), s);
      }
    } catch (e) {
      console.warn("Failed saving state snapshot to Firestore: ", e);
    }
  };

  // Restores all products and configs to default template arrays
  const handleRestoreDefaults = async () => {
    if (window.confirm("¿Seguro que deseas restaurar la tienda a la configuración inicial por defecto? Esto borrará tus cambios actuales.")) {
      setConfig(DEFAULT_CONFIG);
      setProducts(DEFAULT_PRODUCTS);
      setServices(DEFAULT_SERVICES);
      localStorage.removeItem('nexus_store_config');
      localStorage.removeItem('nexus_store_products');
      localStorage.removeItem('nexus_store_services');
      setIsAdminOpen(false);

      // Reset items in Firestore as well in the background
      try {
        await setDoc(doc(db, 'configs', 'store'), DEFAULT_CONFIG);
        for (const p of DEFAULT_PRODUCTS) {
          await setDoc(doc(db, 'products', p.id), { ...p, views: 0 });
        }
        for (const s of DEFAULT_SERVICES) {
          await setDoc(doc(db, 'services', s.id), s);
        }
      } catch (e) {
        console.warn("Failed restoring defaults inside Firestore: ", e);
      }
    }
  };

  return (
    <div id="main-site-wrapper" className="min-h-screen bg-[#050506] relative overflow-hidden text-gray-100 font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Dynamic Glow Overlay following chosen theme color based on Immersive UI theme specs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />
        {/* Dynamic theme accent helper */}
        <div 
          className="absolute top-[20%] right-[10%] w-[40%] h-[40%] blur-[130px] rounded-full opacity-20"
          style={{
            background: config.neonColor === 'cyan' ? 'rgba(6,182,212,0.15)' :
                        config.neonColor === 'blue' ? 'rgba(59,130,246,0.15)' :
                        config.neonColor === 'purple' ? 'rgba(168,85,247,0.15)' :
                        config.neonColor === 'emerald' ? 'rgba(16,185,129,0.15)' :
                        'rgba(99,102,241,0.15)'
          }}
        />
      </div>

      {/* Primary Navigation Bar */}
      <Navbar 
        config={config} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      {/* Hero Presentation */}
      <Hero config={config} />

      {/* Digital Products Catalog with View Track trigger */}
      <Catalog 
        products={products} 
        config={config} 
        onTrackView={trackProductView}
      />

      {/* Core Services Section */}
      <Services 
        services={services} 
        config={config} 
      />

      {/* Modern Lead Capture Contact Form synced with Firestore */}
      <ContactForm config={config} />

      {/* Universal Sticky WhatsApp Button */}
      <WhatsAppButton config={config} />

      {/* Modern Sci-Fi footer */}
      <Footer config={config} />

      {/* Drawer customizer panel overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <>
            {/* Backdrop lock */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsAdminOpen(false)}
            />
            <AdminPanel
              config={config}
              products={products}
              services={services}
              onClose={() => setIsAdminOpen(false)}
              onSave={handleSaveStoreData}
              onRestore={handleRestoreDefaults}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
