import { Spinner } from '@nextui-org/react';

export const Loading = () => {
  return (
    <div className="flex items-center space-x-2">
      <Spinner size="sm" />
      <p>Thinking...</p>
    </div>
  );
}
