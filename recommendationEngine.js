import {
  searchAnimeByGenres,
  getTopAnime,
  getSeasonalAnime,
  filterByEpisodeCount,
  filterByRating,
  scoreAnime,
} from './jikanAPI'

/**
 * Recommendation Engine
 * Generates personalized anime recommendations based on user preferences
 */

export async function generateRecommendations(userAnswers) {
  try {
    console.log('Generating recommendations for:', userAnswers)
    
    // Fetch anime from multiple sources for variety
    let allAnime = []

    // 1. Fetch by selected genres (primary source)
    if (userAnswers.genres && userAnswers.genres.length > 0) {
      const genreAnime = await searchAnimeByGenres(userAnswers.genres, {
        rating: userAnswers.rating,
      })
      allAnime = [...allAnime, ...genreAnime]
    }

    // 2. Fetch top anime for beginners/casual viewers
    if (['beginner', 'casual'].includes(userAnswers.experience)) {
      const topAnime = await getTopAnime()
      allAnime = [...allAnime, ...topAnime]
    }

    // 3. Add seasonal anime for variety
    const seasonalAnime = await getSeasonalAnime()
    allAnime = [...allAnime, ...seasonalAnime]

    // Remove duplicates by MAL ID
    const uniqueAnime = Array.from(
      new Map(allAnime.map(anime => [anime.mal_id, anime])).values()
    )

    // Apply filters
    let filteredAnime = uniqueAnime

    // Filter by episode count
    filteredAnime = filterByEpisodeCount(filteredAnime, userAnswers.timeCommitment)

    // Filter by content rating
    filteredAnime = filterByRating(filteredAnime, userAnswers.rating)

    // Filter out anime without images or scores
    filteredAnime = filteredAnime.filter(anime => 
      anime.images?.jpg?.large_image_url && 
      anime.score > 0
    )

    // Score each anime based on user preferences
    const scoredAnime = filteredAnime.map(anime => ({
      ...anime,
      recommendationScore: scoreAnime(anime, userAnswers),
    }))

    // Sort by recommendation score
    scoredAnime.sort((a, b) => b.recommendationScore - a.recommendationScore)

    // Return top 6 recommendations
    const recommendations = scoredAnime.slice(0, 6)

    // Add explanation for each recommendation
    const recommendationsWithExplanations = recommendations.map(anime => ({
      ...anime,
      explanation: generateExplanation(anime, userAnswers),
    }))

    console.log('Generated recommendations:', recommendationsWithExplanations)
    return recommendationsWithExplanations

  } catch (error) {
    console.error('Error generating recommendations:', error)
    // Return fallback recommendations
    return getFallbackRecommendations()
  }
}

/**
 * Generate explanation for why this anime was recommended
 */
function generateExplanation(anime, userAnswers) {
  const reasons = []

  // Experience level reasoning
  const popularity = anime.popularity || 10000
  if (userAnswers.experience === 'beginner' && popularity < 500) {
    reasons.push('A beloved classic perfect for newcomers')
  } else if (userAnswers.experience === 'expert' && popularity > 2000) {
    reasons.push('An underrated gem for experienced viewers')
  }

  // Genre match reasoning
  const animeGenres = anime.genres?.map(g => g.name) || []
  const matchedGenres = userAnswers.genres?.filter(ug =>
    animeGenres.some(ag => ag.toLowerCase().includes(ug))
  ) || []
  
  if (matchedGenres.length > 0) {
    reasons.push(`Matches your ${matchedGenres.join(', ')} preferences`)
  }

  // Mood reasoning
  const moodMatch = getMoodMatch(anime, userAnswers.mood)
  if (moodMatch) {
    reasons.push(moodMatch)
  }

  // Score reasoning
  if (anime.score >= 8.5) {
    reasons.push('Critically acclaimed with exceptional ratings')
  } else if (anime.score >= 7.5) {
    reasons.push('Highly rated by the community')
  }

  // Episode count reasoning
  const episodes = anime.episodes || 0
  if (userAnswers.timeCommitment === 'short' && episodes <= 13) {
    reasons.push('Perfect length for a quick watch')
  } else if (userAnswers.timeCommitment === 'long' && episodes >= 26) {
    reasons.push('Epic journey with deep character development')
  }

  return reasons.length > 0 
    ? reasons.slice(0, 2).join(' • ') 
    : 'Recommended based on your preferences'
}

/**
 * Get mood-specific explanation
 */
function getMoodMatch(anime, mood) {
  const genres = anime.genres?.map(g => g.name.toLowerCase()) || []
  
  const moodMatches = {
    'excited': ['action', 'sports', 'adventure'],
    'relaxed': ['slice of life', 'comedy', 'iyashikei'],
    'thoughtful': ['mystery', 'psychological', 'drama'],
    'emotional': ['drama', 'romance', 'josei'],
    'adventurous': ['adventure', 'fantasy', 'isekai'],
    'dark': ['horror', 'psychological', 'thriller', 'seinen'],
  }

  const moodDescriptions = {
    'excited': 'High-energy action matches your pumped up mood',
    'relaxed': 'Perfect chill vibes for relaxed viewing',
    'thoughtful': 'Thought-provoking narrative for contemplation',
    'emotional': 'Heartfelt story that will make you feel',
    'adventurous': 'Epic adventure awaits',
    'dark': 'Dark and intense atmosphere',
  }

  const matchingGenres = moodMatches[mood] || []
  const hasMatch = genres.some(g => matchingGenres.some(m => g.includes(m)))

  return hasMatch ? moodDescriptions[mood] : null
}

/**
 * Fallback recommendations if API fails
 */
function getFallbackRecommendations() {
  return [
    {
      mal_id: 1,
      title: 'Cowboy Bebop',
      images: { jpg: { large_image_url: 'https://cdn.myanimelist.net/images/anime/4/19644l.jpg' } },
      score: 8.76,
      synopsis: 'In the year 2071, humanity has colonized several of the planets and moons...',
      episodes: 26,
      genres: [{ name: 'Action' }, { name: 'Sci-Fi' }],
      explanation: 'A timeless classic perfect for any mood',
    },
    {
      mal_id: 5114,
      title: 'Fullmetal Alchemist: Brotherhood',
      images: { jpg: { large_image_url: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg' } },
      score: 9.09,
      synopsis: 'After a horrific alchemy experiment goes wrong...',
      episodes: 64,
      genres: [{ name: 'Action' }, { name: 'Adventure' }],
      explanation: 'Critically acclaimed masterpiece',
    },
    {
      mal_id: 16498,
      title: 'Attack on Titan',
      images: { jpg: { large_image_url: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg' } },
      score: 8.54,
      synopsis: 'Several hundred years ago, humans were nearly exterminated...',
      episodes: 25,
      genres: [{ name: 'Action' }, { name: 'Drama' }],
      explanation: 'Intense action with gripping narrative',
    },
    {
      mal_id: 9253,
      title: 'Steins;Gate',
      images: { jpg: { large_image_url: 'https://cdn.myanimelist.net/images/anime/5/73199l.jpg' } },
      score: 9.07,
      synopsis: 'Self-proclaimed mad scientist discovers time travel...',
      episodes: 24,
      genres: [{ name: 'Sci-Fi' }, { name: 'Thriller' }],
      explanation: 'Mind-bending time travel thriller',
    },
    {
      mal_id: 1535,
      title: 'Death Note',
      images: { jpg: { large_image_url: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg' } },
      score: 8.62,
      synopsis: 'A brilliant student discovers a supernatural notebook...',
      episodes: 37,
      genres: [{ name: 'Mystery' }, { name: 'Psychological' }],
      explanation: 'Psychological thriller with brilliant storytelling',
    },
    {
      mal_id: 11757,
      title: 'Sword Art Online',
      images: { jpg: { large_image_url: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg' } },
      score: 7.21,
      synopsis: 'Players trapped in a virtual reality MMORPG...',
      episodes: 25,
      genres: [{ name: 'Action' }, { name: 'Fantasy' }],
      explanation: 'Immersive virtual world adventure',
    },
  ]
}
