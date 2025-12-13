/**
 * Jikan API Utility
 * Handles all anime data fetching from MyAnimeList via Jikan API
 * Uses CORS proxy (AllOrigins) to bypass browser restrictions
 */

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4'
const CORS_PROXY = 'https://api.allorigins.win/raw?url='

/**
 * Fetch with CORS proxy
 */
async function fetchWithProxy(url) {
  const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(url)}`
  const response = await fetch(proxiedUrl)
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }
  
  return response.json()
}

/**
 * Search anime by genre and filters
 */
export async function searchAnimeByGenres(genres = [], filters = {}) {
  try {
    // Jikan genre IDs mapping
    const genreMap = {
      'action': 1,
      'adventure': 2,
      'comedy': 4,
      'drama': 8,
      'fantasy': 10,
      'horror': 14,
      'mystery': 7,
      'psychological': 40,
      'romance': 22,
      'sci-fi': 24,
      'slice-of-life': 36,
      'sports': 30,
    }

    // Convert genre names to IDs
    const genreIds = genres.map(g => genreMap[g]).filter(Boolean)
    
    // Build query parameters
    const params = new URLSearchParams({
      genres: genreIds.join(','),
      order_by: 'score',
      sort: 'desc',
      limit: 25,
      sfw: filters.rating === 'g' || filters.rating === 'pg',
    })

    const url = `${JIKAN_BASE_URL}/anime?${params}`
    const data = await fetchWithProxy(url)
    
    return data.data || []
  } catch (error) {
    console.error('Error fetching anime by genres:', error)
    return []
  }
}

/**
 * Get top anime with filters
 */
export async function getTopAnime(filters = {}) {
  try {
    const params = new URLSearchParams({
      limit: 25,
      filter: 'bypopularity',
    })

    const url = `${JIKAN_BASE_URL}/top/anime?${params}`
    const data = await fetchWithProxy(url)
    
    return data.data || []
  } catch (error) {
    console.error('Error fetching top anime:', error)
    return []
  }
}

/**
 * Get anime by season (for variety)
 */
export async function getSeasonalAnime() {
  try {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    
    // Determine season
    let season = 'winter'
    if (month >= 4 && month <= 6) season = 'spring'
    else if (month >= 7 && month <= 9) season = 'summer'
    else if (month >= 10 && month <= 12) season = 'fall'

    const url = `${JIKAN_BASE_URL}/seasons/${year}/${season}`
    const data = await fetchWithProxy(url)
    
    return data.data || []
  } catch (error) {
    console.error('Error fetching seasonal anime:', error)
    return []
  }
}

/**
 * Get recommendations based on a specific anime ID
 */
export async function getAnimeRecommendations(animeId) {
  try {
    const url = `${JIKAN_BASE_URL}/anime/${animeId}/recommendations`
    const data = await fetchWithProxy(url)
    
    return data.data || []
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return []
  }
}

/**
 * Search anime by name
 */
export async function searchAnimeByName(query) {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: 10,
    })

    const url = `${JIKAN_BASE_URL}/anime?${params}`
    const data = await fetchWithProxy(url)
    
    return data.data || []
  } catch (error) {
    console.error('Error searching anime:', error)
    return []
  }
}

/**
 * Get anime details by ID
 */
export async function getAnimeDetails(animeId) {
  try {
    const url = `${JIKAN_BASE_URL}/anime/${animeId}/full`
    const data = await fetchWithProxy(url)
    
    return data.data || null
  } catch (error) {
    console.error('Error fetching anime details:', error)
    return null
  }
}

/**
 * Filter anime by episode count
 */
export function filterByEpisodeCount(animeList, timePreference) {
  if (timePreference === 'any') return animeList

  return animeList.filter(anime => {
    const episodes = anime.episodes || 0
    
    switch (timePreference) {
      case 'short':
        return episodes <= 13 || anime.type === 'Movie'
      case 'medium':
        return episodes >= 12 && episodes <= 26
      case 'long':
        return episodes >= 26 && episodes <= 100
      default:
        return true
    }
  })
}

/**
 * Filter by content rating
 */
export function filterByRating(animeList, ratingPreference) {
  const ratingMap = {
    'g': ['G - All Ages'],
    'pg': ['G - All Ages', 'PG - Children'],
    'pg13': ['G - All Ages', 'PG - Children', 'PG-13 - Teens 13 or older'],
    'r': ['G - All Ages', 'PG - Children', 'PG-13 - Teens 13 or older', 'R - 17+', 'R+ - Mild Nudity'],
  }

  const allowedRatings = ratingMap[ratingPreference] || ratingMap['r']
  
  return animeList.filter(anime => {
    return allowedRatings.includes(anime.rating)
  })
}

/**
 * Score anime based on user preferences
 */
export function scoreAnime(anime, userAnswers) {
  let score = anime.score || 5.0 // Base MAL score
  
  // Experience level adjustment
  const popularity = anime.popularity || 10000
  if (userAnswers.experience === 'beginner' && popularity < 500) score += 2
  if (userAnswers.experience === 'casual' && popularity < 1000) score += 1.5
  if (userAnswers.experience === 'experienced' && popularity > 500) score += 1
  if (userAnswers.experience === 'expert' && popularity > 2000) score += 2

  // Genre match bonus
  const animeGenres = anime.genres?.map(g => g.name.toLowerCase()) || []
  const userGenres = userAnswers.genres || []
  const genreMatches = userGenres.filter(ug => 
    animeGenres.some(ag => ag.includes(ug) || ug.includes(ag))
  ).length
  score += genreMatches * 1.5

  // Mood-based adjustments
  if (userAnswers.mood === 'excited' && animeGenres.some(g => ['action', 'sports'].includes(g))) {
    score += 1
  }
  if (userAnswers.mood === 'relaxed' && animeGenres.some(g => ['slice of life', 'comedy'].includes(g))) {
    score += 1
  }
  if (userAnswers.mood === 'thoughtful' && animeGenres.some(g => ['mystery', 'psychological'].includes(g))) {
    score += 1
  }
  if (userAnswers.mood === 'emotional' && animeGenres.some(g => ['drama', 'romance'].includes(g))) {
    score += 1
  }
  if (userAnswers.mood === 'dark' && animeGenres.some(g => ['horror', 'psychological', 'thriller'].includes(g))) {
    score += 1
  }

  return score
}
