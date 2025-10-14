// src/datafast/helpers.ts

/**
 * Track a goal/event in DataFast (Client-side)
 * @param goalName - Name of the goal/event to track
 * @param params - Optional custom parameters for richer analytics
 * 
 * @example
 * // Simple goal tracking
 * trackDataFastGoal('signup');
 * trackDataFastGoal('purchase');
 * 
 * // Advanced usage with custom parameters
 * trackDataFastGoal('checkout_initiated', {
 *   name: 'Elon Musk',
 *   email: 'elon@x.com',
 *   product_id: 'prod_123',
 * });
 */
export function trackDataFastGoal(goalName: string, params?: Record<string, any>): void {
  if (typeof window !== 'undefined' && window.datafast) {
    if (params) {
      window.datafast(goalName, params);
    } else {
      window.datafast(goalName);
    }
  }
}

type ServerTrackOptions = {
  apiKey: string;
  visitorId: string;
  goalName: string;
  metadata?: Record<string, any>;
  apiUrl?: string;
};

type ServerTrackResponse = {
  success: boolean;
  error?: string;
  response?: Response;
};

/**
 * Track a goal/event in DataFast (Server-side)
 * @param options - Configuration object for server-side tracking
 * @returns Promise with success status and response
 * 
 * @example
 * // Basic server-side tracking
 * const result = await trackDataFastGoalServer({
 *   apiKey: process.env.DATAFAST_API_KEY!,
 *   visitorId: 'visitor_123',
 *   goalName: 'newsletter_signup',
 * });
 * 
 * // With metadata
 * const result = await trackDataFastGoalServer({
 *   apiKey: process.env.DATAFAST_API_KEY!,
 *   visitorId: 'visitor_123',
 *   goalName: 'newsletter_signup',
 *   metadata: {
 *     name: 'Elon Musk',
 *     email: 'musk@x.com',
 *   },
 * });
 * 
 * // With custom API URL
 * const result = await trackDataFastGoalServer({
 *   apiKey: process.env.DATAFAST_API_KEY!,
 *   visitorId: 'visitor_123',
 *   goalName: 'purchase',
 *   metadata: { amount: 99.99 },
 *   apiUrl: 'https://custom.datafa.st/api/v1/goals',
 * });
 */
export async function trackDataFastGoalServer(
  options: ServerTrackOptions
): Promise<ServerTrackResponse> {
  const { apiKey, visitorId, goalName, metadata, apiUrl = 'https://datafa.st/api/v1/goals' } = options;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        datafast_visitor_id: visitorId,
        name: goalName,
        ...(metadata ? { metadata } : {}),
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        response,
      };
    }

    return {
      success: true,
      response,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    datafast?: (goalName: string, params?: Record<string, any>) => void;
  }
}

