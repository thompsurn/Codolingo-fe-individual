import axios from 'axios'
const baseApi = axios.create({
    baseURL: `https://codolingo-back-end.onrender.com/`
})

export function getAllLessons() {
    return baseApi.get('api/lessons')
}

export function getLessonsById(_id) {
    return baseApi.get(`api/lessons/${_id}`)
}

export function getAllUsers() {
    return baseApi.get('api/users')
}

export function getUserByUsername(user_name) {
    return baseApi.get(`api/users/${user_name}`)
}

export function postUser(user) {
    return baseApi.post(`api/users/`, user)
}

export function patchUserFollowing(user_name, userToFollow) {
    return baseApi.patch(`api/users/${user_name}/following`, userToFollow)
}

export function patchUserProgress(user_name, userProgress) {
    return baseApi.patch(`api/users/${user_name}/progress`, userProgress)
}

export function getQuestionsById(_id) {
    return baseApi.get(`api/questions/${_id}`)
}

export function getQuestionsByLessonId(_id){
    return baseApi.get(`api/lessons/${_id}/questions`)
}
