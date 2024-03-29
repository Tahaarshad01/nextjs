import React from "react";

const userProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>{params.id}</p>
    </div>
  );
};

export default userProfile;
