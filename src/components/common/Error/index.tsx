import React from 'react'
import Button from '../Button';
import Parser from 'html-react-parser';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

interface ErrorProps {
  isJsError?: boolean;
  message?: string;
  description?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonOnClick?: () => void;
}

const ErrorComponent: React.FC<ErrorProps> = ({ isJsError, message, description, showButton = true, buttonText = "Retry", buttonOnClick }) => {

  const defaultMessage = isJsError ? "Something went wrong" : "Oops! <br/> Something went wrong";

  const title = message || defaultMessage;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <FaceFrownIcon className="w-10 h-10 text-[var(--text-primary)]" />
      <h1 className="text-xl font-bold text-[var(--text-primary)] text-center py-2">{Parser(title)}</h1>
      {description && <p className="text-sm text-gray-500 py-2 text-center">{description}</p>}
      {showButton && <Button onClick={buttonOnClick}>{buttonText}</Button>}
    </div>
  );
};

export default ErrorComponent;