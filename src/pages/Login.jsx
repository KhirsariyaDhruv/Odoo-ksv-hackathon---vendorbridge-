import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex items-center justify-center relative overflow-hidden font-body-md selection:bg-primary-container selection:text-on-primary-container w-full h-full absolute inset-0 z-50">
      <div className="absolute rounded-full filter blur-[80px] opacity-15 w-[500px] h-[500px] bg-[#6C63FF] top-[-100px] left-[-100px] -z-10 animate-[float_20s_infinite_alternate_ease-in-out]"></div>
      <div className="absolute rounded-full filter blur-[80px] opacity-15 w-[400px] h-[400px] bg-[#00ffcc] bottom-[-50px] right-[-50px] -z-10 animate-[float_20s_infinite_alternate_ease-in-out]" style={{ animationDelay: '-5s' }}></div>
      
      <main className="w-full max-w-[480px] px-4 z-10">
        <div className="glass-panel rounded-[32px] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
          
          <div className="text-center mb-stack-lg relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container mb-stack-sm border border-white/5">
              <span className="material-symbols-outlined text-primary text-3xl icon-fill">
                hub
              </span>
            </div>
            <h1 className="font-display-md text-display-md text-on-surface mb-2 tracking-tight">VendorBridge</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Enterprise SaaS Portal</p>
          </div>
          
          {error && <div className="mb-4 text-error font-body-md bg-error-container text-on-error-container p-3 rounded-md">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-stack-md relative z-10">
            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  person
                </span>
                <input value={formData.email} onChange={handleChange} className="w-full bg-[#080808] border border-white/10 focus:border-primary focus:shadow-[0_0_15px_rgba(108,99,255,0.2)] outline-none rounded-xl py-3 pl-12 pr-4 text-on-surface font-body-md placeholder:text-on-surface-variant/50 transition-all duration-300" id="email" name="email" placeholder="Enter your email" required type="email" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="password">
                  Password
                </label>
                <a className="font-body-sm text-body-sm text-primary hover:text-primary-container transition-colors" href="#">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  lock
                </span>
                <input value={formData.password} onChange={handleChange} className="w-full bg-[#080808] border border-white/10 focus:border-primary focus:shadow-[0_0_15px_rgba(108,99,255,0.2)] outline-none rounded-xl py-3 pl-12 pr-12 text-on-surface font-body-md placeholder:text-on-surface-variant/50 transition-all duration-300" id="password" name="password" placeholder="••••••••" required type="password" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">
                    visibility_off
                  </span>
                </button>
              </div>
            </div>
            
            <button disabled={loading} type="submit" className="w-full py-4 rounded-full font-body-md text-body-md font-semibold text-white bg-[#6C63FF] hover:bg-[#5b54d6] hover:shadow-[0_0_20px_rgba(108,99,255,0.3)] transition-all duration-300 mt-stack-md flex justify-center items-center gap-2 block text-center disabled:opacity-70">
              {loading ? 'Authenticating...' : 'Login to Terminal'}
              {!loading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
            </button>
          </form>
          
          <div className="mt-stack-lg text-center relative z-10">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Don't have access? 
              <Link to="/register" className="text-primary font-semibold hover:text-primary-container transition-colors ml-1 border-b border-primary/30 hover:border-primary">
                Register here
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-on-surface-variant font-mono-data text-mono-data opacity-60">
          <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(154,213,148,0.6)]"></div>
          <span className="">System Status: Optimal</span>
        </div>
      </main>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
          100% { transform: translate(-30px, -50px) scale(0.9); }
        }
      `}} />
    </div>
  );
}
