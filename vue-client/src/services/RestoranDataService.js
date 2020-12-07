import http from "../http-common";

class RestoranDataService {
    getAll() {
        return http.get("/restorans");
      }
    
      get(id) {
        return http.get(`/restorans/${id}`);
      }
    
      create(data) {
        return http.post("/restorans", data);
      }
    
      update(id, data) {
        return http.put(`/restorans/${id}`, data);
      }
    
      delete(id) {
        return http.delete(`/restorans/${id}`);
      }
    
      deleteAll() {
        return http.delete(`/restorans`);
      }
    
      findByTitle(title) {
        return http.get(`/restorans?title=${title}`);
      }
}

export default new RestoranDataService();