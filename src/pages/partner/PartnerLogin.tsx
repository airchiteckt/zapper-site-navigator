import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import logoVerde from '@/assets/logo-zapper-verde.svg';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'La password deve avere almeno 6 caratteri'),
});

export default function PartnerLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signIn, user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user && profile?.role === 'partner') {
      navigate('/partner/dashboard');
    } else if (user && profile && profile.role !== 'partner') {
      navigate('/admin');
    }
  }, [user, profile, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const validated = loginSchema.parse({ email, password });
      const { error } = await signIn(validated.email, validated.password);

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Errore di accesso',
            description: 'Email o password non corretti.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Errore',
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Benvenuto!',
          description: 'Accesso effettuato con successo.',
        });
        navigate('/partner/dashboard');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) {
            newErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zapper-black to-zapper-darkGray p-4">
      <Card className="w-full max-w-md border-zapper-green/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logoVerde} alt="Zapper" className="h-12" />
          </div>
          <CardTitle className="text-2xl">Area Partner</CardTitle>
          <CardDescription>
            Accedi alla tua area riservata con listini, sconti e documentazione tecnica.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partner-email">Email</Label>
              <Input
                id="partner-email"
                type="email"
                placeholder="partner@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-password">Password</Label>
              <Input
                id="partner-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-zapper-green hover:bg-zapper-green/90 text-white" disabled={isLoading}>
              {isLoading ? 'Accesso in corso...' : 'Accedi'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              L'accesso è riservato ai partner autorizzati. Per diventare partner, contattaci.
            </p>
          </form>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Torna al sito
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
