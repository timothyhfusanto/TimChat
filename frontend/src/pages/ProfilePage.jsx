import React, { useState } from 'react'
import { useAuthStore } from "../store/useAuthStore.js"
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async() => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  }

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <label
                htmlFor="avatar"
                className={`relative cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "pointer-events-none" : ""}`}
              >
                <div className="relative group">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    className="size-32 rounded-full object-cover border-4 transition-opacity duration-200 group-hover:opacity-60"
                    alt="Profile"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <input
                  type="file"
                  id="avatar"
                  className="hidden"
                  accept='image/*'
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? "Uploading" : "Upload new profile picture"}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className="w-4 h-4"/> Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
            </div>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className="w-4 h-4"/> Email Address
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
            </div>
          </div>

          <div className='mt-6 bg-base-300 rounded-xl p-6'>
            <h2 className='text-lg font-medium mb-4'>Account Information</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className='flex items-center justify-between py-2'>
                <span>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage