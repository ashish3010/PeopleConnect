import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

const SearchBox = ({ searchQuery, setSearchQuery, showFilter = true }: { searchQuery: string, setSearchQuery: (value: string) => void, showFilter?: boolean }) => {
  return (
    <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
             <MagnifyingGlassIcon className="w-5 h-5 text-[var(--text-muted)]" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-card)] rounded-lg pl-10 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none border-0"
            />
          </div>
          {showFilter && <button className="w-10 h-10 bg-[var(--bg-card)] rounded-lg flex items-center justify-center flex-shrink-0">
           <AdjustmentsHorizontalIcon className="w-5 h-5 text-[var(--text-muted)]" />
          </button>}
        </div>
  )
}

export default SearchBox