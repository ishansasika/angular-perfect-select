/**
 * Fuzzy search utility for flexible string matching
 * Supports acronym-style matching (e.g., 'fb' matches 'Facebook')
 * and partial substring matching with scoring
 */

export interface FuzzyMatchResult {
  matches: boolean;
  score: number;
  matchedIndices: number[];
}

/**
 * Performs fuzzy search matching
 * @param searchTerm The search query
 * @param targetString The string to search in
 * @param options Configuration options
 * @returns Match result with score and matched character indices
 */
export function fuzzyMatch(
  searchTerm: string,
  targetString: string,
  options: {
    caseSensitive?: boolean;
    threshold?: number;
  } = {}
): FuzzyMatchResult {
  const { caseSensitive = false, threshold = 0 } = options;

  // Normalize strings
  const search = caseSensitive ? searchTerm : searchTerm.toLowerCase();
  const target = caseSensitive ? targetString : targetString.toLowerCase();

  if (search.length === 0) {
    return { matches: true, score: 1, matchedIndices: [] };
  }

  if (target.length === 0) {
    return { matches: false, score: 0, matchedIndices: [] };
  }

  // Check for exact match first (highest score)
  if (target === search) {
    return {
      matches: true,
      score: 1.0,
      matchedIndices: Array.from({ length: search.length }, (_, i) => i)
    };
  }

  // Check for substring match (high score)
  const substringIndex = target.indexOf(search);
  if (substringIndex !== -1) {
    const score = 0.8 - (substringIndex * 0.01); // Earlier matches score higher
    return {
      matches: true,
      score: Math.max(0.5, score),
      matchedIndices: Array.from({ length: search.length }, (_, i) => substringIndex + i)
    };
  }

  // Fuzzy matching algorithm (supports acronyms and scattered matches)
  let searchIndex = 0;
  let matchedIndices: number[] = [];
  let consecutiveMatches = 0;
  let totalScore = 0;

  for (let targetIndex = 0; targetIndex < target.length; targetIndex++) {
    if (search[searchIndex] === target[targetIndex]) {
      matchedIndices.push(targetIndex);
      consecutiveMatches++;

      // Bonus points for consecutive matches
      totalScore += consecutiveMatches > 1 ? 2 : 1;

      // Bonus for matching at word boundaries
      if (targetIndex === 0 || target[targetIndex - 1] === ' ' || target[targetIndex - 1] === '-') {
        totalScore += 2;
      }

      searchIndex++;

      if (searchIndex === search.length) {
        break;
      }
    } else {
      consecutiveMatches = 0;
    }
  }

  // Check if all search characters were found
  const matches = searchIndex === search.length;

  if (!matches) {
    return { matches: false, score: 0, matchedIndices: [] };
  }

  // Calculate final score (0-1 range, excluding exact/substring matches)
  const maxPossibleScore = search.length * 4; // Max points if all chars match at word boundaries consecutively
  let normalizedScore = totalScore / maxPossibleScore;

  // Penalty for scattered matches
  const spreadPenalty = (matchedIndices[matchedIndices.length - 1] - matchedIndices[0]) / target.length;
  normalizedScore *= (1 - spreadPenalty * 0.3);

  // Cap fuzzy matches below substring matches
  normalizedScore = Math.min(0.49, normalizedScore);

  // Apply threshold
  if (normalizedScore < threshold) {
    return { matches: false, score: 0, matchedIndices: [] };
  }

  return { matches, score: normalizedScore, matchedIndices };
}

/**
 * Sorts options by fuzzy match score
 */
export function sortByFuzzyScore<T>(
  items: T[],
  searchTerm: string,
  getLabel: (item: T) => string,
  options?: { caseSensitive?: boolean; threshold?: number }
): T[] {
  if (!searchTerm) {
    return items;
  }

  const itemsWithScores = items.map(item => {
    const label = getLabel(item);
    const result = fuzzyMatch(searchTerm, label, options);
    return { item, score: result.score, matches: result.matches };
  });

  // Filter non-matches and sort by score descending
  return itemsWithScores
    .filter(({ matches }) => matches)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
