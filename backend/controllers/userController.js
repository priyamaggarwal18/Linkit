import User from "../models/user.js";
import Links from "../models/links.js";
import { generateToken } from "../helpers/jwtHelper.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import NodeCache from "node-cache";

// cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// user registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken. Please choose another one." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profileImage: req.file ? req.file.path : "",
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// fetch popular profiles
export const getPopularProfiles = async (req, res) => {
  try {
    const profiles = await User.find()
      .sort({ profileClicks: -1 })
      .limit(10);

    const response = profiles.map((profile) => ({
      id: profile._id,
      username: profile.username,
      profileImage: profile.profileImage,
      profileClicks: profile.profileClicks,
    }));

    res.json(response);
  } catch (error) {
    console.error("Error fetching popular profiles:", error);
    res.status(500).json({ message: "Server error while fetching profiles" });
  }
};

// create an in-memory cache
const profileViewCache = new NodeCache({ stdTTL: 24 * 60 * 60 });

// get public profile
export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const cacheKey = `profile_${user._id}_${userIp}`;

    if (!profileViewCache.has(cacheKey)) {
      user.profileClicks = (user.profileClicks || 0) + 1;
      await user.save();
      profileViewCache.set(cacheKey, true);
    }

    const links = await Links.find({ userId: user._id }).select("-__v");

    res.json({
      username: user.username,
      profileImage: user.profileImage,
      profileClicks: user.profileClicks,
      links,
    });
  } catch (error) {
    console.error("Error fetching public profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update profile image
export const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImage = req.file.path;
    await user.save();

    res.json({ profileImage: user.profileImage });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get logged-in user profile
export const getLoggedInUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const links = await Links.find({ userId: user._id });

    res.json({
      username: user.username,
      profileImage: user.profileImage,
      email: user.email,
      profileClicks: user.profileClicks,
      links,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error while fetching user profile" });
  }
};
