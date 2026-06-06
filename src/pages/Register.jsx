import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Register() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex items-center justify-center p-gutter-grid relative overflow-hidden absolute inset-0 z-50">
      {/* Atmospheric Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-tertiary/5 blur-[100px]"></div>
      </div>
      
      {/* Registration Card (Glassmorphic) */}
      <main className="w-full max-w-5xl bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-xl p-stack-md md:p-stack-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col md:flex-row gap-stack-lg md:gap-stack-lg relative z-10">
        {/* Subtle inner glow on top left of card */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-1/2 h-1/4 bg-gradient-to-br from-white/5 to-transparent blur-2xl"></div>
        </div>
        
        {/* Left Column: Profile Photo Upload */}
        <section className="md:w-1/3 flex flex-col items-center justify-center p-stack-md bg-surface-container-low/50 rounded-lg border border-white/5 relative">
          <div className="text-center mb-stack-md">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-2">Profile Identity</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Upload a professional photo for your vendor profile.</p>
          </div>
          
          {/* Upload Component */}
          <div className={`relative group w-48 h-48 rounded-full border-2 border-dashed flex items-center justify-center bg-surface-container-lowest transition-colors duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(196,192,255,0.1)] ${selectedFile ? 'border-tertiary' : 'border-outline-variant hover:border-primary'}`}>
            <input accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" id="profile-upload" type="file" onChange={handleFileChange} />
            <div className={`flex flex-col items-center space-y-2 transition-colors duration-300 ${selectedFile ? 'text-tertiary' : 'text-outline-variant group-hover:text-primary'}`}>
              <span className="material-symbols-outlined text-[48px] font-light">
                {selectedFile ? 'check_circle' : 'add_a_photo'}
              </span>
              <span className="font-label-caps text-label-caps tracking-wider uppercase">
                {selectedFile ? 'Selected' : 'Upload Image'}
              </span>
            </div>
            {/* Circular Progress Ring (Decorative) */}
            {!selectedFile && (
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none hidden group-hover:block opacity-50" viewBox="0 0 100 100">
                <circle className="text-primary transition-all duration-1000 ease-out group-hover:stroke-dashoffset-0" cx="50" cy="50" fill="none" r="48" stroke="currentColor" strokeDasharray="300" strokeDashoffset="300" strokeWidth="1"></circle>
              </svg>
            )}
          </div>
          <p className="font-body-sm text-body-sm text-outline-variant mt-stack-md text-center">JPEG, PNG or WEBP.<br/>Max file size 5MB.</p>
        </section>
        
        {/* Right Column: Registration Form */}
        <section className="md:w-2/3 flex flex-col justify-center relative z-20">
          <div className="mb-stack-lg">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-2 h-6 bg-primary rounded-full"></div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">VendorBridge Access</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Register Vendor</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Configure your institutional access parameters to integrate with the marketplace.</p>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter-grid gap-y-stack-md">
            {/* First Name */}
            <div className="flex flex-col space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="firstName">First Name</label>
              <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner" id="firstName" placeholder="e.g. Sarah" type="text" />
            </div>
            {/* Last Name */}
            <div className="flex flex-col space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="lastName">Last Name</label>
              <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner" id="lastName" placeholder="e.g. Connor" type="text" />
            </div>
            {/* Email */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="email">Corporate Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-12 pr-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner" id="email" placeholder="sarah.connor@cyberdyne.io" type="email" />
              </div>
            </div>
            {/* Phone */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="phone">Phone Number</label>
              <div className="relative flex">
                <select className="bg-surface-container-lowest border border-outline-variant rounded-l-lg border-r-0 pl-4 pr-8 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all z-10 appearance-none">
                  <option>+1</option>
                  <option>+44</option>
                  <option>+91</option>
                </select>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-r-lg px-4 py-3 font-mono-data text-mono-data text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner" id="phone" placeholder="(555) 019-2834" type="tel" />
              </div>
            </div>
            {/* Role */}
            <div className="flex flex-col space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="role">System Role</label>
              <select defaultValue="" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner cursor-pointer appearance-none" id="role">
                <option disabled value="">Select specific role</option>
                <option value="admin">Platform Administrator</option>
                <option value="officer">Procurement Officer</option>
              </select>
            </div>
            {/* Country */}
            <div class="flex flex-col space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="country">Operating Country</label>
              <select defaultValue="" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner cursor-pointer appearance-none" id="country">
                <option disabled value="">Select jurisdiction</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="SG">Singapore</option>
                <option value="EU">European Union</option>
              </select>
            </div>
            
            {/* Submit Button */}
            <div className="md:col-span-2 mt-stack-md pt-stack-sm border-t border-white/5">
              <Link to="/" className="w-full group relative overflow-hidden bg-primary text-on-primary rounded-full py-4 font-body-lg text-body-lg font-bold transition-all hover:bg-primary-fixed hover:shadow-[0_0_24px_rgba(196,192,255,0.3)] active:scale-[0.98] block text-center">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Initialize Registration
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>
                {/* Button hover gradient sweep */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
              </Link>
              <p className="text-center font-body-sm text-body-sm text-outline mt-4">
                By registering, you agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
              </p>
            </div>
          </form>
        </section>
      </main>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
