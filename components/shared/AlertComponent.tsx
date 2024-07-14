import { Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  title: string;
  description: string;
}

export const AlertComponent = ({ title, description }: Props) => {
  return (
    <Alert>
      <Terminal className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
