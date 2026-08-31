import asyncHandler from '../utils/asyncHandler.js';
import APIError from '../utils/apiError.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import APIResponse from '../utils/apiResponse.js';

import { User } from '../models/user.model.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  if (
    [username, email, fullName, password].some((field) => field?.trim() === '')
  ) {
    throw new APIError(400, 'all fields are compulsory and required');
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new APIError(409, 'username or email already exists');
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new APIError(400, 'avatar file is required');
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new APIError(500, 'cannot upload avatar file on cloudinary');
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    full_name: fullName,
    password,
    avatar: avatar.url,
    cover_image: coverImage?.url || '',
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refresh_token'
  );

  if (!createdUser) {
    throw new APIError(500, 'something went wrong while registering the user');
  }

  return res
    .status(201)
    .json(new APIResponse(201, createdUser, 'user created successfully'));
});
