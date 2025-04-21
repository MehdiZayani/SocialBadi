"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useState, useEffect } from 'react'
import Link from "next/link"
import { useParams, usePathname, useRouter } from 'next/navigation'

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
]

const cn = (...classes) => classes.filter(Boolean).join(' ')

export default function NavigationMenuDemo({translations}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Récupère la langue actuelle depuis les paramètres d'URL
  const currentLang = params.lang as string

  // Mapping des langues aux drapeaux
  const languages = [
    { code: 'fr', countryCode: 'FR', name: 'Français' },
    { code: 'en', countryCode: 'US', name: 'English' },
  ]

  // Gestion du scroll pour cacher/afficher la navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt())
    return String.fromCodePoint(...codePoints)
  }

  // Génère le nouveau chemin avec la langue sélectionnée
  const getNewPath = (newLang: string) => {
    const segments = pathname.split('/')
    segments[1] = newLang
    return segments.join('/')
  }

  // Persistance de la langue dans localStorage
  useEffect(() => {
    localStorage.setItem('preferredLang', currentLang)
  }, [currentLang])

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-background transition-transform duration-300 ${
      isVisible ? 'translate-y-0 shadow-md' : '-translate-y-full'
    }`}>
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center p-4">
          {/* Logo - Left */}
          <div className="w-32 sm:w-40 flex-shrink-0">
            <Link href={`/${currentLang}`}>
              <h1 className="text-2xl">SocialBadi</h1>
            </Link>
          </div>

          {/* Navigation - Center */}
          <div className="hidden lg:flex flex-grow justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{translations.products}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link 
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" 
                            href={`/${currentLang}`}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              shadcn/ui
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components built with Radix UI and
                              Tailwind CSS.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href={`/${currentLang}/docs`} title="Introduction">
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{translations.markets}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={`/${currentLang}${component.href}`}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={`/${currentLang}/contact`} className={navigationMenuTriggerStyle()}>
                    {translations.contact}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Language Selector and Mobile Menu Button - Right */}
          <div className="flex items-center gap-4 ml-auto w-32">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 min-w-[3rem]">
                  <span className="text-2xl">
                    {getFlagEmoji(languages.find(l => l.code === currentLang)?.countryCode || 'FR')}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <React.Fragment key={lang.code}>
                    <DropdownMenuItem onClick={() => router.push(getNewPath(lang.code))}>
                      <span className="text-2xl mr-2">{getFlagEmoji(lang.countryCode)}</span>
                      {lang.name}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-t z-50">
            <nav className="flex flex-col p-4">
              <Link 
                href={`/${currentLang}/products`} 
                className="py-2 hover:bg-accent px-4 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translations.products}
              </Link>
              <Link 
                href={`/${currentLang}/markets`} 
                className="py-2 hover:bg-accent px-4 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translations.markets}
              </Link>
              <Link 
                href={`/${currentLang}/contact`} 
                className="py-2 hover:bg-accent px-4 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translations.contact}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"