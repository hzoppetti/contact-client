import API from "../http-common";

class ContactDataService {
    getUsers() {
        return API.get("/users");
    }

    getUserById(id: number) {
        return API.get(`/users/${id}`);
    }

    createUser(data: any) {
        return API.post("/users", data);
    }

    updateUser(id: number, data: any) {
        return API.put(`/users/${id}`, data);
    }

    deleteUser(id: number) {
        return API.delete(`/users/${id}`);
    }

    deleteAllUsers() {
        return API.delete(`/users`);
    }
}

export default new ContactDataService();