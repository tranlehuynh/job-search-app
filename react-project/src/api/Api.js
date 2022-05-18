import axios from 'axios'

export const endpoints = {
    "categories": "/categories/",
    "courses": "/courses/",
    "lessons": (courseId) => `/courses/${courseId}/lessons/`,
    "lesson-detail": (lessonId) => `/lessons/${lessonId}/`,
    "users": "/users/",
    "updateUsers": (id) => `/users/${id}/`,
    "deleteUsers": (id) => `/users/${id}/`,
    "jobs": (id) => `/jobs/${id}/`,
    "createJob": "/jobs/",
    "createCompany": "/companies/",
    "oauth2-token": "/oauth2/",
    "load-comment": "/comments/",
    "upload-cv": (id) => `/users/${id}/cv/`,
    "patch-cv": (id) => `/cv/${id}/`,
    "CV": "/cv/",
    "addComment": (id) => `/jobs/${id}/add-comment/`,
    "deleteComment": (id) => `/comments/${id}/`,
    "updateComment": (id) => `/comments/${id}/`,
    "upCV": "/CVapplyCompanies/",
    "patchCV": (id) => `/users/${id}/cv/`,
    "getRating": (companyId) => `/companies/${companyId}/get_rate/`,
    "postRating": (companyId) => `/companies/${companyId}/rating/`,
}

export default axios.create({
    baseURL: "https://tranlehuynh.pythonanywhere.com/"
})
