'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppContextProvider } from '@/contexts/app.context'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient())

  return (
    // <AppContextProvider>
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // {/* </AppContextProvider> */}
  )
}

export default Providers
