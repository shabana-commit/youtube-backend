import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/userModel.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerUser = asyncHandler( async (req, res) =>{
    // res.status(200).json({message:"dnsjdnjnda"});
    //get user details from frontend
    //validation - not empty
    //check if already exist:username and email
    //check for images and avatar
    //upload on cloudinary,avatar
    // create user object - entry in db
    // remove password and refresh token from response
    // check for user creation
    // return res

    const {fullName , email, username, password} = req.body
    
    if(
        [fullName, email,username,password].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required");
    }

    const userExist = await User.findOne({
        $or:[{ username },{ email }]
    })

    if(userExist){
        throw new ApiError(409, "Username or email already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverLocalPath = req.files?.coverImage[0]?.path;
    let coverLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is required");
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log('avatar:' ,avatar);
    const coverImage = await uploadOnCloudinary(coverLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar image is required");
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Registration failed, try again");
    }
    return res.status(200).json(
        new ApiResponse(200,createdUser, "Registered successfully")
    )

})

export {registerUser}