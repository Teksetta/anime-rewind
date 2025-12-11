export function generateRecommendations(preferences, animeList) {
  if (!animeList || animeList.length === 0) {
    return []
  }

  const scored = animeList.map(anime => {
    let score = 0
    let reasons = []

    // Genre matching
    if (preferences.genres && preferences.genres.length > 0) {
      const animeGenres = anime.genres?.map(g => typeof g === 'string' ? g : g.name) || []
      const matchedGenres = preferences.genres.filter(g => 
        animeGenres.some(ag => ag.toLowerCase() === g.toLowerCase())
      )
      score += matchedGenres.length * 25
      if (matchedGenres.length > 0) {
        reasons.push(`Features your favorite genre: ${matchedGenres[0]}`)
      }
    }

    // Score matching
    const animeScore = anime.score || 0
    if (animeScore >= 8) {
      score += 20
      reasons.push(`Highly rated (${animeScore}/10)`)
    } else if (animeScore >= 7) {
      score += 15
    } else if (animeScore >= 6) {
      score += 10
    }

    // Experience level matching
    if (preferences.experience === 'beginner') {
      if (anime.episodes && anime.episodes <= 13) {
        score += 15
      }
    } else if (preferences.experience === 'casual') {
      if (anime.episodes && anime.episodes <= 25) {
        score += 15
      }
    } else if (preferences.experience === 'enthusiast') {
      score += 10
    } else if (preferences.experience === 'hardcore') {
      if (anime.episodes && anime.episodes > 50) {
        score += 15
      }
    }

    // Time commitment matching
    if (preferences.time === 'short' && anime.episodes && anime.episodes <= 13) {
      score += 15
      reasons.push('Perfect for short viewing sessions')
    } else if (preferences.time === 'medium' && anime.episodes && anime.episodes >= 12 && anime.episodes <= 26) {
      score += 15
      reasons.push('Just the right length')
    } else if (preferences.time === 'long' && anime.episodes && anime.episodes > 50) {
      score += 15
      reasons.push('Great for long-term viewing')
    }

    // Popularity bonus
    if (anime.popularity && anime.popularity <= 100) {
      score += (100 - anime.popularity) * 0.1
    }

    return {
      ...anime,
      matchScore: Math.min(Math.round(score), 100),
      matchReason: reasons[0] || 'Matches your preferences'
    }
  })

  return scored
    .filter(anime => anime.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 12)
}
