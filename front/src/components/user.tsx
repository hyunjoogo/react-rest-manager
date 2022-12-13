import React from 'react';

export interface UserProps {
  user: {
    photoURL: string | null,
    displayName: string | null
  };

}

const UserComponent = ({user: {photoURL, displayName}}: UserProps) => {
  return (
    <div className="flex items-center">
      <img className="w-10 h-10 rounded-full mr-2" src={photoURL!} alt={displayName!}/>
      <span className="hidden md:block">{displayName!}</span>
    </div>
  );
};

export default UserComponent;
