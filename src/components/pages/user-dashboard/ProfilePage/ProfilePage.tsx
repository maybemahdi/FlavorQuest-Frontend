"use client";
import React from "react";
import Image from "next/image";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Loading from "@/components/shared/Loading/Loading";

const ProfilePage = () => {

  const { data: getMyProfileResponse, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-gray-100">
            <Image
              src={getMyProfileResponse?.data?.profilePhoto}
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Name */}
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {getMyProfileResponse?.data?.name}
          </h2>

          {/* Email */}
          <p className="text-gray-600">{getMyProfileResponse?.data?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
