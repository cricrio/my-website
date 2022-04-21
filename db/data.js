import { supabase } from "./supabaseClient";

export const getGalleries = async () => {
  const { data: galleries } = await supabase
    .from('galleries')
    .select('id, name , medias (uri)');
  return galleries;
}

export const getMedia = async (filter = [true]) => {
  const { data: media } = await supabase
    .from('media')
    .select('id, title, uri, private')
    .in('private', filter)

  return media;
}