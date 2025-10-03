export function IdeaSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-4">
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mt-3"></div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-8"></div>
            <div className="h-16 bg-gray-200 rounded px-4 py-2 w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
