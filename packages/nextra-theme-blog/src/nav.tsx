import type { ReactElement } from 'react'
import Link from 'next/link'
import ThemeSwitch from './theme-switch'
import { useTheme } from 'next-themes'
import { useBlogContext } from './blog-context'
import { collectPostsAndNavs } from './utils/collect'

export default function Nav(): ReactElement {
  const { opts, config } = useBlogContext()
  const { navPages } = collectPostsAndNavs({ opts, config })
  const { resolvedTheme } = useTheme()
  return (
    <div className="nx-mb-8 nx-flex nx-items-center nx-gap-3">
      <div className="nx-flex nx-grow nx-flex-wrap nx-items-center nx-justify-end nx-gap-3">
        {navPages.map(page => {
          const name = page.frontMatter?.title || page.name
          if (page.active) {
            return (
              <span
                key={page.route}
                className={`nx-cursor-default ${
                  resolvedTheme === 'dark'
                    ? 'nx-text-gray-400'
                    : 'nx-text-gray-600'
                }`}
              >
                {name}
              </span>
            )
          }
          return (
            <Link key={page.route} href={page.route} passHref legacyBehavior>
              <a>{name}</a>
            </Link>
          )
        })}
        {config.navs?.map(nav => (
          <Link key={nav.url} href={nav.url} passHref legacyBehavior>
            <a>{nav.name}</a>
          </Link>
        ))}
      </div>
      {config.darkMode && <ThemeSwitch />}
    </div>
  )
}
