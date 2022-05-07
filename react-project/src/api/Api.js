import axios from 'axios'

export const endpoints = {
    "categories": "/categories/",
    "courses": "/courses/",
    "lessons": (courseId) => `/courses/${courseId}/lessons/`,
    "lesson-detail": (lessonId) => `/lessons/${lessonId}/`,
    "users": "/users/",
    "updateUsers": (id) => `/users/${id}/`,
    "deleteUsers": (id) => `/users/${id}`,
}

export default axios.create({
    baseURL: "http://localhost:8000"
})
