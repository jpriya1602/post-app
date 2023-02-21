import axios from "axios";


export const getPosts = async () => {

    return axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => {
            return res.data
        })
        .catch((error) => {
            console.log(error)
            return []} )
}

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};