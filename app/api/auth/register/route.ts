import { userService } from "@/app/services/user.services";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await userService.register(email, password);

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
