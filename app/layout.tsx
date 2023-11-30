import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Sidebar from './Components/sidebar/Sidebar'
import GlobalStyleProvider from './Providers/GlobalStyleProvider'
import ContextProvider from './Providers/ContextProvider'
import { ClerkProvider, auth } from '@clerk/nextjs'

import NextTopLoader from 'nextjs-toploader'

const nunito = Nunito({ 
  weight: ["400","500", "600","700","800"],
  subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskMan',
  description: 'Task manager - Make your life organized',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const {userId} = auth()
  return (

    <ClerkProvider>

    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={nunito.className}>
        {/* <NextTopLoader height={2} color='red' easing='cubic-bezier(.17,.67,0,1)'/> */}
        <ContextProvider>
          <GlobalStyleProvider>
          {userId && <Sidebar/>}
          
          <div className="w-full">{children}</div>

          </GlobalStyleProvider>

        </ContextProvider>
        
        </body>
    </html>

    </ClerkProvider>

  )
}
