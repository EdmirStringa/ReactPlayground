import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password.');
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="py-4 px-4 md:px-8">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-slate-300 rounded-lg p-6 max-w-md mx-auto shadow-sm md:p-8 lg:mx-0 dark:border-neutral-700">

            <div className="mb-8">
              <h1 className="text-slate-900 text-3xl font-bold mb-4 dark:text-slate-50">Sign in</h1>
              <p className="text-slate-600 text-base leading-relaxed dark:text-slate-400">
                Sign in to your account to access your dashboard.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="yourusername"
                  required
                  className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Sign in
              </button>

              <div className="text-slate-900 text-sm text-center dark:text-slate-50">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500">
                  Sign up
                </a>
              </div>
            </form>
          </div>

          <div className="aspect-[71/50] max-lg:w-4/5 mx-auto">
            <img src="https://readymadeui.com/images/integration-illus.webp" className="w-full object-cover" alt="login img" />
          </div>
        </div>
      </div>
    </main>
  );
}