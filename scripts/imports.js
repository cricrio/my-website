const { createClient } = require('@supabase/supabase-js');

const media = require('../.data/post_1.json');



const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)


const main = async () => {
  const posts = media.map(({ media: [post] }) => ({
    created_at: new Date(post.creation_timestamp * 1000),
    uri: post.uri,
    latitude: post.media_metadata && post.media_metadata.photo_metadata.exif_data[0].latitude,
    longitude: post.media_metadata && post.media_metadata.photo_metadata.exif_data[0].longitude
  }))

  const { data, error } = await supabase
    .from('media')
    .insert(posts)

  if (error) {
    console.error(error);
  } else {
    console.log(data)
  }

}

main()
