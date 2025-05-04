export const Loader = () => <div className="text-gray-500">Loading...</div>

export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-red-600">Error: {message}</div>
)
