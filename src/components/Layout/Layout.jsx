import React from 'react';
import ParticlesBackground from '../UI/ParticlesBackground';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon, LanguageIcon } from '@heroicons/react/24/outline';

import LogoLight from '../../assets/images/Hollow Knight_claro.png';
import LogoDark from '../../assets/images/Hollow Knight_oscuro.png';

const Layout = ({ children }) => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    const currentLogo = theme === 'dark' ? LogoDark : LogoLight;

    React.useEffect(() => {
        const link = document.querySelector("link[rel~='icon']");
        if (!link) {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            document.head.appendChild(newLink);
        }
        document.querySelector("link[rel~='icon']").href = currentLogo;
    }, [currentLogo]);

    const toggleLang = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="app-layout">
            <ParticlesBackground />

            <header className="main-header" style={{
                height: 'var(--header-height)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                borderBottom: '1px solid var(--border-glass)',
                background: 'var(--bg-header)',
                backdropFilter: 'blur(10px)',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 50
            }}>
                <div className="logo flex items-center gap-3">
                    <img src={currentLogo} alt="CodeComparator Logo" style={{ height: '50px', width: 'auto', paddingRight: '10px', objectFit: 'contain' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-highlight)' }}>
                        CodeComparator
                    </h1>
                </div>

                <div className="actions flex gap-4">
                    <button onClick={toggleLang} className="btn-icon flex items-center gap-2" title="Change Language">
                        <LanguageIcon className="icon-sm" style={{ width: 24 }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{i18n.language.toUpperCase()}</span>
                    </button>

                    <button onClick={toggleTheme} className="btn-icon" title="Toggle Theme">
                        {theme === 'dark' ? (
                            <SunIcon className="icon-sm" style={{ width: 24 }} />
                        ) : (
                            <MoonIcon className="icon-sm" style={{ width: 24 }} />
                        )}
                    </button>
                </div>
            </header>

            <main className="main-content container" style={{
                marginTop: 'var(--header-height)',
                paddingTop: '2rem',
                position: 'relative',
                zIndex: 10
            }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
