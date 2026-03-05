import React, { createContext, useContext, useEffect, useState } from 'react'

// Типы тем
type Theme = 'light' | 'dark' | 'system'

// Интерфейс контекста
interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    resolvedTheme: 'light' | 'dark' // Фактическая тема (после разрешения system)
}

// Создаем контекст
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Провайдер темы
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Получаем сохраненную тему из localStorage или используем 'system'
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme') as Theme
        return saved || 'system'
    })

    // Разрешенная тема (для system определяем предпочтения системы)
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

    // Эффект для применения темы к документу
    useEffect(() => {
        const root = document.documentElement

        // Удаляем старые классы темы
        root.classList.remove('light', 'dark')

        // Определяем фактическую тему
        let actualTheme: 'light' | 'dark'

        if (theme === 'system') {
            actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        } else {
            actualTheme = theme
        }

        // Применяем тему
        root.classList.add(actualTheme)
        setResolvedTheme(actualTheme)

        // Сохраняем в localStorage
        localStorage.setItem('theme', theme)
    }, [theme])

    // Слушаем изменения системной темы
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = () => {
            if (theme === 'system') {
                const newTheme = mediaQuery.matches ? 'dark' : 'light'
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add(newTheme)
                setResolvedTheme(newTheme)
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Хук для использования темы
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}