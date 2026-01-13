import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Users, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ CORRECT API URLS
    const url = isRegistering
      ? 'http://localhost:5000/api/signup'
      : 'http://localhost:5000/api/login';

    const payload = isRegistering
      ? { name, email, password }
      : { email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        onLogin(); // dashboard-ku pogum
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error(error);
      alert('Backend not running or API error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            SkillSwap
          </h1>
          <p className="text-gray-600">
            Exchange skills with fellow students
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" fullWidth>
              {isRegistering ? 'Sign Up' : 'Sign In'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-blue-600 font-medium"
            >
              {isRegistering
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
