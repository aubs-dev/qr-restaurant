import supabase from "$lib/db";

export async function POST({ request }) {
    const { error_0 } = await supabase.from("menu").delete().neq("img_url", "");

    const { error_1 } = await supabase.from("categories").delete().neq("id", 0);

    const { data, error_2 } = await supabase.storage
        .from("menu-images")
        .list("", {});

    let imagesToRemove = [];
    for (const item of data) {
        imagesToRemove.push(item.name);
    }

    const { error_3 } = await supabase.storage
        .from("menu-images")
        .remove(imagesToRemove);

    return new Response(null, { status: 200 });
}
