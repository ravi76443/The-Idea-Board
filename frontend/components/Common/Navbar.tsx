import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="bg-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Idea Board</h1>
            </div>
            <Link
              href="/app"
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
