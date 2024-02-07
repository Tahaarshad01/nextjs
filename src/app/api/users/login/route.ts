import conn from "@/dbConfig/conn";
import User from "@/models/model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
conn();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "user does not match" },
        { status: 400 }
      );
    }
    console.log("User Exist");

    // check if password is correct

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "invalid Password" }, { status: 400 });
    }
    console.log(user);

    // create Token

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login sucessfuly ",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
