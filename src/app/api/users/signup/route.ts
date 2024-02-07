import conn from "@/dbConfig/conn";
import User from "@/models/model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Establish a database connection
conn();

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Check if the user already exists in the database
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the user's password before saving it to the database
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new User instance with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Return a success response
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    // Handle any errors that occur during the process
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
