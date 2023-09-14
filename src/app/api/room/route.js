import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: 2,
  });
};

export const POST = async (request) => {
  const payload = checkToken();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    roomName = payload.roomName;
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  readDB();

  const foundroom = DB.rooms.find((x) => x.roomName === roomName);
  if (foundroom) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${"replace this with room name"} already exists`,
      },
      { status: 400 }
    );
  }
  DB.rooms.push({
    roomName,
  });

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  if (role === "ADMIN" || "SUPER_ADMIN")
    return NextResponse.json({
      ok: true,
      //roomId,
      message: `Room ${"replace this with room name"} has been created`,
    });
};
