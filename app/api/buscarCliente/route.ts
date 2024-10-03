import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try{
    const body = await request.json();
    console.log(body);
    return new NextResponse(JSON.stringify({message:"asddasd"}));
  }catch(error){
    console.log(error);
    return new Response("Error", request);
  }

  return new Response("Hola ",request);
};