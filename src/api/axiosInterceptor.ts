import axios from 'axios'

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set the base URL
})

// Add interceptors for requests
api.interceptors.request.use(
  async (config) => {
    const language = navigator.language || 'en-US'

    if (config.headers) {
      config.headers['X-LanguageCode'] = language
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add interceptors for responses
api.interceptors.response.use(
  (response) => response, // Pass through the response if no errors
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Example: Redirect to login on unauthorized
      window.location.reload()
    }
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default api
