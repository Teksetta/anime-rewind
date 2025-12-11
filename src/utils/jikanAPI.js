const CORS_PROXY = 'https://cors.allorigins.win/raw/'
const JIKAN_API = 'https://api.jikan.moe/v4'

export async function getAnimeRecommendations() {
  try {
    // Fetch top anime
    const response = await fetch(`${CORS_PROXY}${JIKAN_API}/top/anime?limit=25`)
    const data = await response.json()
    
    if (data.data && Array.isArray(data.data)) {
      return data.data
    }
    
    return []
  } catch (error) {
    console.error('Error fetching anime:', error)
    return getDefaultAnime()
  }
}

export function getDefaultAnime() {
  return [
    {
      mal_id: 1,
      title: 'Cowboy Bebop',
      type: 'TV',
      episodes: 26,
      status: 'Finished Airing',
      year: 1998,
      score: 8.78,
      synopsis: 'Cowboy Bebop is the best series',
      genres: [{ name: 'Action' }, { name: 'Sci-Fi' }],
      images: {
        jpg: {
          image_url: 'https://via.placeholder.com/225x300?text=Cowboy+Bebop'
        }
      }
    }
  ]
}

export async function searchAnime(query) {
  try {
    const response = await fetch(
      `${CORS_PROXY}${JIKAN_API}/anime?query=${encodeURIComponent(query)}&limit=10`
    )
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error searching anime:', error)
    return []
  }
}
