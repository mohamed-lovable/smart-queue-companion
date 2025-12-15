/**
 * Footer Component
 * Simple footer with copyright
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/40 bg-background/95 py-6">
      <div className="container text-center">
        <p className="text-sm text-muted-foreground">
          {t.copyright}. {t.allRightsReserved}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
