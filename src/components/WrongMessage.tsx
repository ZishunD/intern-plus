import React from "react";

interface WrongMessageProps {
  wrongMessage?: string; // message to show
}

const WrongMessage: React.FC<WrongMessageProps> = ({ wrongMessage }) => {
  if (!wrongMessage) return null; // don't render if empty

  return (
    <div className='text-center bottom-4 right-4 text-red-600 mt-3 px-4 py-2 rounded-lg  z-50'>
      {wrongMessage}
    </div>
  );
};

export default WrongMessage;
