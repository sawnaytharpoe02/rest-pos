import { NextRequest, NextResponse } from "next/server";
import { assetUpload } from "@/utils/assetUpload";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/utils/assetUpload";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ message: "No file found" });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const assetUrl = await assetUpload(buffer, file.name);

    return NextResponse.json(assetUrl, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "Error occured while uploading asset",
    });
  }
}
