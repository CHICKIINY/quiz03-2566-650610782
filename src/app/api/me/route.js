import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Panithan Boonmapi",
    studentId: "650610782",
  });
};
