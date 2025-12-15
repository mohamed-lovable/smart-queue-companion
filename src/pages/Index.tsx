/**
 * Home Page Component
 * Public landing page with hero, features, roles, how it works, and CTA sections
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  Clock, 
  Bell, 
  TrendingDown,
  Users,
  Stethoscope,
  Shield,
  UserPlus,
  Building2,
  Ticket,
  BellRing,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Index: React.FC = () => {
  const { t, isRTL } = useLanguage();

  // Features data
  const features = [
    {
      icon: Zap,
      title: t.feature1Title,
      description: t.feature1Desc,
    },
    {
      icon: Clock,
      title: t.feature2Title,
      description: t.feature2Desc,
    },
    {
      icon: Bell,
      title: t.feature3Title,
      description: t.feature3Desc,
    },
    {
      icon: TrendingDown,
      title: t.feature4Title,
      description: t.feature4Desc,
    },
  ];

  // User roles data
  const roles = [
    {
      icon: Users,
      title: t.patient,
      description: t.patientRoleDesc,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Stethoscope,
      title: t.doctor,
      description: t.doctorRoleDesc,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: Shield,
      title: t.admin,
      description: t.adminRoleDesc,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
  ];

  // How it works steps
  const steps = [
    {
      icon: UserPlus,
      title: t.step1Title,
      description: t.step1Desc,
    },
    {
      icon: Building2,
      title: t.step2Title,
      description: t.step2Desc,
    },
    {
      icon: Ticket,
      title: t.step3Title,
      description: t.step3Desc,
    },
    {
      icon: BellRing,
      title: t.step4Title,
      description: t.step4Desc,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Zap className="h-4 w-4" />
              <span>Smart Healthcare Solution</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              {t.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-100">
              {t.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-200">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/signup">
                  {t.getStarted}
                  <ArrowRight className={cn('h-5 w-5', isRTL ? 'me-2 rtl-flip' : 'ms-2')} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link to="/demo">{t.viewDemo}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border animate-fade-in animation-delay-300">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">40%</p>
                <p className="text-sm text-muted-foreground mt-1">Reduced Wait Time</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground mt-1">Patients Served</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.featuresTitle}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.rolesTitle}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {roles.map((role, index) => (
              <Card 
                key={index}
                className="border-2 hover:border-primary transition-all duration-300 bg-card overflow-hidden group"
              >
                <CardContent className="p-8 text-center">
                  <div className={cn(
                    'w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110',
                    role.bgColor
                  )}>
                    <role.icon className={cn('h-10 w-10', role.color)} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {role.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {role.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.howItWorksTitle}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className={cn(
                    'hidden lg:block absolute top-12 h-0.5 bg-primary/30',
                    isRTL ? 'right-full w-full -me-4' : 'left-full w-full -ms-4'
                  )} />
                )}
                
                <div className="text-center">
                  {/* Step number */}
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -end-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground overflow-hidden relative">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <CardContent className="p-12 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t.ctaTitle}
                </h2>
                <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                  {t.ctaSubtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    asChild 
                    className="text-lg px-8 py-6"
                  >
                    <Link to="/signup">
                      {t.getStarted}
                      <ArrowRight className={cn('h-5 w-5', isRTL ? 'me-2 rtl-flip' : 'ms-2')} />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    asChild 
                    className="text-lg px-8 py-6 border-white/30 text-primary-foreground hover:bg-white/10"
                  >
                    <Link to="/demo">{t.viewDemo}</Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm">Free to Start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm">No Credit Card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
