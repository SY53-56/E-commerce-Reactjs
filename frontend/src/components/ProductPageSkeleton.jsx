import React from 'react'

export default function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#f5f6f7] py-10 animate-pulse">
      <div className="max-w-6xl mx-auto px-4">

        {/* PRODUCT CARD */}
        <div className="bg-white rounded-3xl shadow-md p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT IMAGE */}
          <div>
            <div className="h-[420px] bg-gray-200 rounded-2xl" />

            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 rounded-xl"
                />
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex flex-col justify-between">

            <div>
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-6" />

              <div className="space-y-3 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-4/6 bg-gray-200 rounded" />
              </div>

              <div className="h-8 w-1/4 bg-gray-200 rounded mb-6" />

              <div className="h-12 w-40 bg-gray-200 rounded-xl" />
            </div>

            {/* FEATURES */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-20 bg-gray-200 rounded-xl"
                />
              ))}
            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-16">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm p-4"
              >
                <div className="h-40 bg-gray-200 rounded-xl mb-4" />
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-4" />
                <div className="h-10 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
