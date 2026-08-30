import asyncHandler from '../utils/asyncHandler.js';
import APIError from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import APIResponse from '../utils/apiResponse.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  console.log('user email is :', email);

  if (
    [username, email, fullName, password].some((field) => field?.trim() === '')
  ) {
    throw new APIError(400, 'all fields are compulsory and required');
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  console.log('existed user is', existedUser);

  if (existedUser) {
    throw new APIError(409, 'username or email already exists');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  console.log('avatar local path is', avatarLocalPath);
  console.log('cover image local path is', coverImageLocalPath);

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
    throw new APIError(500, 'something went wrong while registering the User');
  }

  return res
    .status(201)
    .json(new APIResponse(200, createdUser, 'user registered successfully'));
});
