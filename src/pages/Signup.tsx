/**
 * Signup Page Component
 * Handles new user registration with role selection
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/data/mockData';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, User, Phone, ArrowRight, Users, Stethoscope, Shield, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

const Signup: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nameAr: '',
    phone: '',
    role: 'patient' as UserRole,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Role options with icons
  const roleOptions = [
    { value: 'patient', label: t.patient, icon: Users },
    { value: 'doctor', label: t.doctor, icon: Stethoscope },
    { value: 'receptionist', label: t.receptionist, icon: ClipboardList },
    { value: 'admin', label: t.admin, icon: Shield },
  ];

  // Update form data
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form inputs
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        nameAr: formData.nameAr || formData.name,
        role: formData.role,
        phone: formData.phone,
      });

      if (result.success) {
        toast({
          title: t.success,
          description: t.signupSuccess,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: t.error,
          description: result.error || 'Registration failed',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t.error,
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center pb-2">
              {/* Logo */}
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">SQ</span>
              </div>
              <CardTitle className="text-2xl">{t.signupTitle}</CardTitle>
              <CardDescription>
                {t.hasAccount}{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  {t.login}
                </Link>
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>{t.selectRole}</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => updateField('role', value)}
                    className="grid grid-cols-2 gap-3"
                  >
                    {roleOptions.map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={option.value}
                          className={cn(
                            'flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 cursor-pointer transition-all',
                            'hover:bg-muted/50 hover:border-primary/50',
                            'peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5'
                          )}
                        >
                          <option.icon className="h-6 w-6 mb-2 text-primary" />
                          <span className="text-sm font-medium">{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">{t.name}</Label>
                  <div className="relative">
                    <User className={cn(
                      'absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground',
                      isRTL ? 'right-3' : 'left-3'
                    )} />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={cn(isRTL ? 'pr-10' : 'pl-10', errors.name && 'border-destructive')}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <div className="relative">
                    <Mail className={cn(
                      'absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground',
                      isRTL ? 'right-3' : 'left-3'
                    )} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={cn(isRTL ? 'pr-10' : 'pl-10', errors.email && 'border-destructive')}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone} (Optional)</Label>
                  <div className="relative">
                    <Phone className={cn(
                      'absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground',
                      isRTL ? 'right-3' : 'left-3'
                    )} />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+966 5xx xxx xxxx"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className={cn(isRTL ? 'pr-10' : 'pl-10')}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <div className="relative">
                      <Lock className={cn(
                        'absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground',
                        isRTL ? 'right-3' : 'left-3'
                      )} />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => updateField('password', e.target.value)}
                        className={cn(isRTL ? 'pr-10' : 'pl-10', errors.password && 'border-destructive')}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                    <div className="relative">
                      <Lock className={cn(
                        'absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground',
                        isRTL ? 'right-3' : 'left-3'
                      )} />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                        className={cn(isRTL ? 'pr-10' : 'pl-10', errors.confirmPassword && 'border-destructive')}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 me-2 animate-spin" />
                      {t.loading}
                    </>
                  ) : (
                    <>
                      {t.signup}
                      <ArrowRight className={cn('h-4 w-4', isRTL ? 'me-2 rtl-flip' : 'ms-2')} />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
