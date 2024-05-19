import { SUPABASE_URL } from "$env/static/private";
import supabase from "$lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST({ request }) {
    //   try {
    const formData = await request.formData();
    const file = formData.get("file");
    const fileName = `${uuidv4()}${file.name.substring(
        file.name.lastIndexOf(".")
    )}`;

    const { data, e } = await supabase.storage
        .from("menu-images")
        .upload(fileName, file);

    let url = `${SUPABASE_URL}/storage/v1/object/public/menu-images/${fileName}`;

    // if (!file) {
    //   return new Response(
    //       JSON.stringify({error: 'No file provided'}), {status: 400});
    // }

    // // Convert the file to ArrayBuffer
    // const arrayBuffer = await file.arrayBuffer();

    // // Upload the file to Supabase storage

    // if (error) {
    //   return new Response(
    //       JSON.stringify({error: error.message}), {status: 500});
    // }

    return new Response(JSON.stringify({ url }), { status: 200 });
    // }
    // catch (error) {
    //   return new Response(JSON.stringify({error: error.message}), {status:
    //   500});
    // }
}
