export const API_BASE_URL = '/api';

export const API_ROUTES = {
  // Artículos
  articles: {
    getAll: `${API_BASE_URL}/articles`,
    getOne: (id: string) => `${API_BASE_URL}/articles/${id}`,
    create: `${API_BASE_URL}/articles`,
    update: (id: string) => `${API_BASE_URL}/articles/${id}`,
    delete: (id: string) => `${API_BASE_URL}/articles/${id}`,
  },

  // Eventos
  events: {
    getAll: `${API_BASE_URL}/events`,
    getOne: (id: string) => `${API_BASE_URL}/events/${id}`,
    create: `${API_BASE_URL}/events`,
    update: (id: string) => `${API_BASE_URL}/events/${id}`,
    delete: (id: string) => `${API_BASE_URL}/events/${id}`,
  },

  // Boletines
  bulletins: {
    getAll: `${API_BASE_URL}/bulletins`,
    getOne: (id: string) => `${API_BASE_URL}/bulletins/${id}`,
    create: `${API_BASE_URL}/bulletins`,
    update: (id: string) => `${API_BASE_URL}/bulletins/${id}`,
    delete: (id: string) => `${API_BASE_URL}/bulletins/${id}`,
  },

  // Posts Sociales
  socialPosts: {
    getAll: `${API_BASE_URL}/social-posts`,
    getOne: (id: string) => `${API_BASE_URL}/social-posts/${id}`,
    create: `${API_BASE_URL}/social-posts`,
    update: (id: string) => `${API_BASE_URL}/social-posts/${id}`,
    delete: (id: string) => `${API_BASE_URL}/social-posts/${id}`,
  },
}; 