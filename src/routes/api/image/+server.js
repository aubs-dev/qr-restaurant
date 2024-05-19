import { SUPABASE_URL } from "$env/static/private";
import supabase from "$lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST({ request }) {
    const formData = await request.formData();
    const file = formData.get("file");
    const fileName = `${uuidv4()}${file.name.substring(
        file.name.lastIndexOf(".")
    )}`;

    const { error_0 } = await supabase.storage
        .from("menu-images")
        .upload(fileName, file);

    let url = `${SUPABASE_URL}/storage/v1/object/public/menu-images/${fileName}`;

    return new Response(JSON.stringify({ url }), { status: 200 });
}
