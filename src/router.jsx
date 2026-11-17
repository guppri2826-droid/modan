import { useEffect, useState } from 'react'

// Tiny hash router: works on any static host without server rewrites.
// Routes look like  #/about  or  #/itihas/upanayan

function readPath() {
  const raw = window.location.hash.replace(/^#/, '')
  return raw.startsWith('/') ? raw : '/' + raw
}

export function useRoute() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onChange = () => {
      setPath(readPath())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const parts = path.split('/').filter(Boolean)
  return { path, parts }
}

export function Link({ to, children, className, ...rest }) {
  return (
    <a href={'#' + to} className={className} {...rest}>
      {children}
    </a>
  )
}

export function navigate(to) {
  window.location.hash = to
}
