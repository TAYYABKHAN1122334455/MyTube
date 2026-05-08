import asyncHandler from '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';
import { User } from '../models/user.modles.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import apiResponse from '../utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body;
  if ([fullname, username, email, password].some((field) => field?.trim() === '')) {
    throw new apiError(400, 'All Fields are required');
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) throw new apiError(409, 'User already Exist.');

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) throw new apiError(400, 'Avatar is missing.');
  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
  } catch (error) {
    throw new ApiError(500, 'Failed to upload avatar');
  }

  let coverImage;
  if (coverLocalPath) {
    try {
      coverImage = await uploadOnCloudinary(coverLocalPath);
    } catch (error) {
      throw new ApiError(500, 'Failed to upload cover image');
    }
  }
  try {
    const user = await User.create({
      fullname,
      email,
      password,
      username: username.toLowerCase(),
      avatar: avatar.url,
      coverImage: coverImage.url || '',
    });

    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if (!createdUser) throw new apiError(500, 'Something went wrong');

    return res.status(201).json(new apiResponse(200, createdUser, 'User Registered Succesfully'));
  } catch (error) {
    console.log('User creation failed');

    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }

    throw new ApiError(500, 'Registration failed, images deleted');
  }
});

export { registerUser };
