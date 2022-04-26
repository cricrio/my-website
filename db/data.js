import { supabase } from "./supabaseClient";

export const getGalleries = async () => {
  const { data: galleries } = await supabase
    .from('galleries')
    .select('id, name , medias (uri)');
  return galleries;
}

export const getMedia = async (filter = [false]) => {
  const { data: media } = await supabase
    .from('media')
    .select('id, title, uri, private')
    .in('private', filter)
    .order('created_at', { ascending: false })

  return media;
}

export const updateMedia = async (savedMedia = []) => {
  const { privateMediaIds, publicMediaIds } = savedMedia.reduce((acc, m) => {
    if (!m.changed) {
      return acc;
    }
    return (
      {
        ...acc,
        ...(m.private ? { privateMediaIds: [...acc.privateMediaIds, m.id] } : { publicMediaIds: [...acc.publicMediaIds, m.id] }),
      }
    )
  }, {
    privateMediaIds: [],
    publicMediaIds: []
  });

  await Promise.all([
    supabase
      .from('media')
      .update({ private: true })
      .in('id', privateMediaIds),
    supabase
      .from('media')
      .update({ private: false })
      .in('id', publicMediaIds)
  ])



  return getMedia([true, false]);
}